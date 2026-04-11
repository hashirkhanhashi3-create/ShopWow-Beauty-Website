const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const Stripe = require('stripe');

const app = express();
const PORT = process.env.PORT || 3000;
const stripeKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeKey ? Stripe(stripeKey) : null;
if (!stripeKey) {
  console.warn('Stripe secret key is not set. Stripe checkout will be disabled.');
}

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || '';
const PAYPAL_ENV = process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox';
const PAYPAL_BASE = PAYPAL_ENV === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';
const paypalConfigured = Boolean(PAYPAL_CLIENT_ID && PAYPAL_SECRET);
if (!paypalConfigured) {
  console.warn('PayPal credentials are not set. PayPal checkout will be disabled.');
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DEFAULT_PRODUCTS = [
  { id: 'p1',  name: 'Luminous Skincare Set',    brand: 'ShopWow', price: 19.99, oldPrice: null,  cat: 'skincare', badge: 'new',  rating: 4.8, reviews: 312,  shades: ['#f5d0b0','#e8a070','#c07040'], img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=480&q=80',  emoji: '🧴', isNew: true,  stock: 22 },
  { id: 'p2',  name: 'Hydrating Face Serum',     brand: 'ShopWow', price: 29.99, oldPrice: 39.99, cat: 'serum',    badge: 'sale', rating: 4.9, reviews: 874,  shades: ['#f0e8e0'],                     img: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=480&q=80', emoji: '💧', isNew: false, stock: 16 },
  { id: 'p3',  name: 'Lip Care Kit',             brand: 'ShopWow', price: 39.99, oldPrice: null,  cat: 'lip',      badge: 'best', rating: 4.7, reviews: 541,  shades: ['#e8a0a0','#c06060','#902020'], img: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2177?w=480&q=80', emoji: '💋', isNew: false, stock: 12 },
  { id: 'p4',  name: 'Revive Eye Cream',         brand: 'ShopWow', price: 49.99, oldPrice: 64.99, cat: 'eye',      badge: 'sale', rating: 4.6, reviews: 228,  shades: [],                              img: 'https://images.unsplash.com/photo-1631214524020-3c69a0e3e2c8?w=480&q=80', emoji: '👁️', isNew: false, stock: 10 },
  { id: 'p5',  name: 'Pro Makeup Bundle',        brand: 'ShopWow', price: 49.99, oldPrice: null,  cat: 'makeup',   badge: 'best', rating: 4.8, reviews: 1023, shades: ['#f0c0a0','#d09060','#a06030','#704020'], img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=480&q=80', emoji: '💄', isNew: false, stock: 18 },
  { id: 'p6',  name: 'Velvet Matte Lipstick',    brand: 'ShopWow', price: 24.99, oldPrice: 34.99, cat: 'makeup',   badge: 'sale', rating: 4.5, reviews: 763,  shades: ['#e8a0a0','#c06080','#8b3050','#5a1a30'], img: 'https://images.unsplash.com/photo-1512869764274-4ae72e14b4f4?w=480&q=80', emoji: '💄', isNew: false, stock: 9 },
  { id: 'p7',  name: 'Glow Highlighter Duo',     brand: 'ShopWow', price: 34.99, oldPrice: null,  cat: 'makeup',   badge: 'new',  rating: 4.9, reviews: 446,  shades: ['#f8e8c0','#e8c890','#c0a060'], img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=480&q=80', emoji: '✨', isNew: true,  stock: 14 },
  { id: 'p8',  name: 'Vitamin C Brightening',    brand: 'ShopWow', price: 44.99, oldPrice: 59.99, cat: 'serum',    badge: 'sale', rating: 4.7, reviews: 589,  shades: [],                              img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=480&q=80', emoji: '🍋', isNew: false, stock: 11 },
  { id: 'p9',  name: 'Rose Blush Palette',       brand: 'ShopWow', price: 22.99, oldPrice: null,  cat: 'makeup',   badge: 'new',  rating: 4.6, reviews: 192,  shades: ['#f0a0a0','#e08080','#c06060'], img: 'https://images.unsplash.com/photo-1583241475880-083f84372725?w=480&q=80', emoji: '🌸', isNew: true,  stock: 20 },
  { id: 'p10', name: 'Precision Eye Liner Set',  brand: 'ShopWow', price: 18.99, oldPrice: null,  cat: 'eye',      badge: 'best', rating: 4.8, reviews: 334,  shades: ['#1a1a1a','#2a1a40','#0a3050'], img: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=480&q=80', emoji: '✏️', isNew: false, stock: 16 },
  { id: 'p11', name: 'Nourishing Night Cream',   brand: 'ShopWow', price: 38.99, oldPrice: 52.99, cat: 'skincare', badge: 'sale', rating: 4.7, reviews: 421,  shades: [],                              img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=480&q=80', emoji: '🌙', isNew: false, stock: 8 },
  { id: 'p12', name: 'SPF 50 Daily Moisturiser', brand: 'ShopWow', price: 31.99, oldPrice: null,  cat: 'skincare', badge: 'new',  rating: 4.8, reviews: 670,  shades: [],                              img: 'https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=480&q=80', emoji: '☀️', isNew: true,  stock: 24 },
  { id: 'p13', name: 'Volume Mascara',           brand: 'ShopWow', price: 21.99, oldPrice: 28.99, cat: 'eye',      badge: 'sale', rating: 4.6, reviews: 897,  shades: ['#1a1a1a','#2a2060'],           img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=480&q=80', emoji: '🪄', isNew: false, stock: 14 },
  { id: 'p14', name: 'Tinted Lip Balm',          brand: 'ShopWow', price: 14.99, oldPrice: null,  cat: 'lip',      badge: 'new',  rating: 4.5, reviews: 288,  shades: ['#f0b0a0','#e09080','#c07060'], img: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=480&q=80', emoji: '💋', isNew: true,  stock: 21 },
  { id: 'p15', name: 'Retinol Repair Serum',     brand: 'ShopWow', price: 54.99, oldPrice: 74.99, cat: 'serum',    badge: 'sale', rating: 4.9, reviews: 512,  shades: [],                              img: 'https://images.unsplash.com/photo-1629360728449-f6a2eb7c3f4e?w=480&q=80', emoji: '🔬', isNew: false, stock: 7 },
  { id: 'p16', name: 'Luxury Gift Set',          brand: 'ShopWow', price: 89.99, oldPrice: 110.0, cat: 'gift',     badge: 'best', rating: 4.9, reviews: 143,  shades: [],                              img: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=480&q=80', emoji: '🎁', isNew: false, stock: 6 },
];

let products = [...DEFAULT_PRODUCTS];
const users = [];
const sessions = {};

const AUTH_STORAGE = 'shopwow_auth';

function createHash(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex');
  return `${salt}:${hash}`;
}

function verifyHash(password, stored) {
  const [salt, hash] = stored.split(':');
  const verify = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex');
  return verify === hash;
}

function sanitizeUser(user) {
  return { id: user.id, email: user.email, orders: user.orders.map(order => ({ id: order.id, total: order.total, createdAt: order.createdAt })) };
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const user = users.find(u => u.id === sessions[token]);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }
  req.user = user;
  req.token = token;
  next();
}

app.get('/api/products', (req, res) => {
  const response = products.map(product => ({
    ...product,
    inStock: product.stock > 0,
  }));
  res.json(response);
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  const id = crypto.randomBytes(12).toString('hex');
  const passwordHash = createHash(password);
  const user = { id, email, name, passwordHash, orders: [] };
  users.push(user);
  const token = crypto.randomBytes(24).toString('hex');
  sessions[token] = id;
  res.json({ token, user: sanitizeUser(user) });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !verifyHash(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = crypto.randomBytes(24).toString('hex');
  sessions[token] = user.id;
  res.json({ token, user: sanitizeUser(user) });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

app.get('/api/orders', requireAuth, (req, res) => {
  res.json({ orders: req.user.orders });
});

app.post('/api/checkout', requireAuth, (req, res) => {
  const { items, address, payment } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart items are required' });
  }
  if (!address || !address.trim()) {
    return res.status(400).json({ error: 'Shipping address is required' });
  }
  if (!payment || !/^\d{13,19}$/.test(payment.cardNumber?.replace(/\s+/g, '')) || !/^\d{2}\/\d{2}$/.test(payment.expiry || '') || !/^\d{3,4}$/.test(payment.cvv || '')) {
    return res.status(400).json({ error: 'Valid payment information is required' });
  }

  const orderItems = [];
  let total = 0;

  for (const item of items) {
    const product = products.find(p => p.id === item.id);
    if (!product) {
      return res.status(400).json({ error: `Product ${item.id} not found` });
    }
    if (item.qty < 1 || item.qty > product.stock) {
      return res.status(400).json({ error: `Invalid quantity for ${product.name}` });
    }
    product.stock -= item.qty;
    const subtotal = product.price * item.qty;
    total += subtotal;
    orderItems.push({ id: product.id, name: product.name, price: product.price, qty: item.qty, subtotal });
  }

  const order = {
    id: crypto.randomBytes(10).toString('hex'),
    createdAt: new Date().toISOString(),
    items: orderItems,
    address,
    total: Number(total.toFixed(2)),
    paymentMethod: 'Card ending ' + payment.cardNumber.replace(/\s+/g, '').slice(-4)
  };
  req.user.orders.unshift(order);

  res.json({ success: true, order });
});

app.post('/api/create-checkout-session', requireAuth, async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured on the server.' });
  }

  const { items, address } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart items are required' });
  }
  if (!address || !address.trim()) {
    return res.status(400).json({ error: 'Shipping address is required' });
  }

  const lineItems = [];
  const orderItems = [];
  let total = 0;

  for (const item of items) {
    const product = products.find(p => p.id === item.id);
    if (!product) {
      return res.status(400).json({ error: `Product ${item.id} not found` });
    }
    if (item.qty < 1 || item.qty > product.stock) {
      return res.status(400).json({ error: `Invalid quantity for ${product.name}` });
    }

    product.stock -= item.qty;
    const subtotal = product.price * item.qty;
    total += subtotal;

    orderItems.push({ id: product.id, name: product.name, price: product.price, qty: item.qty, subtotal });
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.img]
        },
        unit_amount: Math.round(product.price * 100)
      },
      quantity: item.qty
    });
  }

  const order = {
    id: crypto.randomBytes(10).toString('hex'),
    createdAt: new Date().toISOString(),
    items: orderItems,
    address,
    total: Number(total.toFixed(2)),
    status: 'pending',
    paymentMethod: 'Stripe Checkout'
  };
  req.user.orders.unshift(order);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: req.user.email,
      success_url: `${req.protocol}://${req.get('host')}/index.html?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/index.html?status=cancel`,
      metadata: {
        orderId: order.id,
        userId: req.user.id
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error', error);
    res.status(500).json({ error: 'Unable to create Stripe checkout session.' });
  }
});

async function getPayPalToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const tokenRes = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error(tokenData.error_description || 'Unable to fetch PayPal access token');
  }
  return tokenData.access_token;
}

app.post('/api/create-paypal-order', requireAuth, async (req, res) => {
  if (!paypalConfigured) {
    return res.status(500).json({ error: 'PayPal is not configured on the server.' });
  }

  const { items, address } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart items are required' });
  }
  if (!address || !address.trim()) {
    return res.status(400).json({ error: 'Shipping address is required' });
  }

  const orderItems = [];
  let total = 0;
  const paypalItems = [];

  for (const item of items) {
    const product = products.find(p => p.id === item.id);
    if (!product) {
      return res.status(400).json({ error: `Product ${item.id} not found` });
    }
    if (item.qty < 1 || item.qty > product.stock) {
      return res.status(400).json({ error: `Invalid quantity for ${product.name}` });
    }

    const subtotal = product.price * item.qty;
    total += subtotal;
    orderItems.push({ id: product.id, name: product.name, price: product.price, qty: item.qty, subtotal });
    paypalItems.push({
      name: product.name,
      unit_amount: { currency_code: 'USD', value: product.price.toFixed(2) },
      quantity: String(item.qty)
    });
  }

  try {
    const accessToken = await getPayPalToken();
    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
            breakdown: {
              item_total: { currency_code: 'USD', value: total.toFixed(2) }
            }
          },
          items: paypalItems,
          description: `ShopWow order by ${req.user.email}`
        }],
        application_context: {
          brand_name: 'ShopWow',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
          return_url: `${req.protocol}://${req.get('host')}/index.html?status=success&paypal=true`,
          cancel_url: `${req.protocol}://${req.get('host')}/index.html?status=cancel`
        }
      })
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok) {
      console.error('PayPal checkout error', orderData);
      return res.status(500).json({ error: orderData.message || 'Unable to create PayPal order.' });
    }

    const approvalLink = orderData.links?.find(link => link.rel === 'approve');
    if (!approvalLink) {
      return res.status(500).json({ error: 'PayPal approval link not found.' });
    }

    // Reserve stock and save pending order after PayPal order creation
    for (const item of items) {
      const product = products.find(p => p.id === item.id);
      if (product) product.stock -= item.qty;
    }

    const order = {
      id: crypto.randomBytes(10).toString('hex'),
      createdAt: new Date().toISOString(),
      items: orderItems,
      address,
      total: Number(total.toFixed(2)),
      status: 'pending',
      paymentMethod: 'PayPal',
      paypalOrderId: orderData.id
    };
    req.user.orders.unshift(order);

    res.json({ url: approvalLink.href });
  } catch (error) {
    console.error('PayPal checkout error', error);
    res.status(500).json({ error: 'Unable to create PayPal checkout order.' });
  }
});

app.listen(PORT, () => {
  console.log(`ShopWow backend running on http://localhost:${PORT}`);
});
