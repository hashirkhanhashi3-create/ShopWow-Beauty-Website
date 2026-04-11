/* ════════════════════════════════════════════════
   ShopWow — main.js
   All interactive behaviour + responsive enhancements
   ════════════════════════════════════════════════ */

/* ── Product & Sale Data ── */
const DEFAULT_PRODUCTS = [
  {id:'p1',  name:'Luminous Skincare Set',    brand:'ShopWow', price:19.99, oldPrice:null,  cat:'skincare', badge:'new',  rating:4.8, reviews:312,  shades:['#f5d0b0','#e8a070','#c07040'], img:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=480&q=80',  emoji:'🧴', isNew:true, stock:22},
  {id:'p2',  name:'Hydrating Face Serum',     brand:'ShopWow', price:29.99, oldPrice:39.99, cat:'serum',    badge:'sale', rating:4.9, reviews:874,  shades:['#f0e8e0'],                     img:'https://images.unsplash.com/photo-1617897903246-719242758050?w=480&q=80', emoji:'💧', isNew:false, stock:16},
  {id:'p3',  name:'Lip Care Kit',             brand:'ShopWow', price:39.99, oldPrice:null,  cat:'lip',      badge:'best', rating:4.7, reviews:541,  shades:['#e8a0a0','#c06060','#902020'], img:'https://images.unsplash.com/photo-1586495777744-4e6232bf2177?w=480&q=80', emoji:'💋', isNew:false, stock:12},
  {id:'p4',  name:'Revive Eye Cream',         brand:'ShopWow', price:49.99, oldPrice:64.99, cat:'eye',      badge:'sale', rating:4.6, reviews:228,  shades:[],                              img:'https://images.unsplash.com/photo-1631214524020-3c69a0e3e2c8?w=480&q=80', emoji:'👁️', isNew:false, stock:10},
  {id:'p5',  name:'Pro Makeup Bundle',        brand:'ShopWow', price:49.99, oldPrice:null,  cat:'makeup',   badge:'best', rating:4.8, reviews:1023, shades:['#f0c0a0','#d09060','#a06030','#704020'], img:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=480&q=80', emoji:'💄', isNew:false, stock:18},
  {id:'p6',  name:'Velvet Matte Lipstick',    brand:'ShopWow', price:24.99, oldPrice:34.99, cat:'makeup',   badge:'sale', rating:4.5, reviews:763,  shades:['#e8a0a0','#c06080','#8b3050','#5a1a30'], img:'https://images.unsplash.com/photo-1512869764274-4ae72e14b4f4?w=480&q=80', emoji:'💄', isNew:false, stock:9},
  {id:'p7',  name:'Glow Highlighter Duo',     brand:'ShopWow', price:34.99, oldPrice:null,  cat:'makeup',   badge:'new',  rating:4.9, reviews:446,  shades:['#f8e8c0','#e8c890','#c0a060'], img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=480&q=80', emoji:'✨', isNew:true, stock:14},
  {id:'p8',  name:'Vitamin C Brightening',    brand:'ShopWow', price:44.99, oldPrice:59.99, cat:'serum',    badge:'sale', rating:4.7, reviews:589,  shades:[],                              img:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=480&q=80', emoji:'🍋', isNew:false, stock:11},
  {id:'p9',  name:'Rose Blush Palette',       brand:'ShopWow', price:22.99, oldPrice:null,  cat:'makeup',   badge:'new',  rating:4.6, reviews:192,  shades:['#f0a0a0','#e08080','#c06060'], img:'https://images.unsplash.com/photo-1583241475880-083f84372725?w=480&q=80', emoji:'🌸', isNew:true, stock:20},
  {id:'p10', name:'Precision Eye Liner Set',  brand:'ShopWow', price:18.99, oldPrice:null,  cat:'eye',      badge:'best', rating:4.8, reviews:334,  shades:['#1a1a1a','#2a1a40','#0a3050'], img:'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=480&q=80', emoji:'✏️', isNew:false, stock:16},
  {id:'p11', name:'Nourishing Night Cream',   brand:'ShopWow', price:38.99, oldPrice:52.99, cat:'skincare', badge:'sale', rating:4.7, reviews:421,  shades:[],                              img:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=480&q=80', emoji:'🌙', isNew:false, stock:8},
  {id:'p12', name:'SPF 50 Daily Moisturiser', brand:'ShopWow', price:31.99, oldPrice:null,  cat:'skincare', badge:'new',  rating:4.8, reviews:670,  shades:[],                              img:'https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=480&q=80', emoji:'☀️', isNew:true, stock:24},
  {id:'p13', name:'Volume Mascara',           brand:'ShopWow', price:21.99, oldPrice:28.99, cat:'eye',      badge:'sale', rating:4.6, reviews:897,  shades:['#1a1a1a','#2a2060'],           img:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=480&q=80', emoji:'🪄', isNew:false, stock:14},
  {id:'p14', name:'Tinted Lip Balm',          brand:'ShopWow', price:14.99, oldPrice:null,  cat:'lip',      badge:'new',  rating:4.5, reviews:288,  shades:['#f0b0a0','#e09080','#c07060'], img:'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=480&q=80', emoji:'💋', isNew:true, stock:21},
  {id:'p15', name:'Retinol Repair Serum',     brand:'ShopWow', price:54.99, oldPrice:74.99, cat:'serum',    badge:'sale', rating:4.9, reviews:512,  shades:[],                              img:'https://images.unsplash.com/photo-1629360728449-f6a2eb7c3f4e?w=480&q=80', emoji:'🔬', isNew:false, stock:7},
  {id:'p16', name:'Luxury Gift Set',          brand:'ShopWow', price:89.99, oldPrice:110.0, cat:'gift',     badge:'best', rating:4.9, reviews:143,  shades:[],                              img:'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=480&q=80', emoji:'🎁', isNew:false, stock:6},
];

const SALE = [
  {name:'Rose Hip Oil Serum', cat:'skincare', now:16.99, was:28.99, disc:'42%', img:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&q=75'},
  {name:'Matte Lipstick',     cat:'makeup',   now:12.99, was:24.99, disc:'48%', img:'https://images.unsplash.com/photo-1512869764274-4ae72e14b4f4?w=300&q=75'},
  {name:'Eye Cream Pro',      cat:'eye',      now:22.99, was:39.99, disc:'43%', img:'https://images.unsplash.com/photo-1631214524020-3c69a0e3e2c8?w=300&q=75'},
  {name:'Glow Foundation',    cat:'makeup',   now:18.99, was:32.99, disc:'42%', img:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=75'},
  {name:'Night Repair Cream', cat:'skincare', now:19.99, was:34.99, disc:'43%', img:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&q=75'},
  {name:'Volumising Mascara', cat:'makeup',   now:10.99, was:18.99, disc:'42%', img:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=75'},
];

let PRODUCTS = [...DEFAULT_PRODUCTS];
let cart = [];
let wishlist = [];
let curFilter = 'all';
let visible = 8;
let currentUser = null;
let authToken = null;
let authTab = 'login';
let paymentMethod = 'stripe';
const PAGE = 4;
const AUTH_STORAGE = 'shopwow_auth';


/* ════════════════════════════════════════════════
   RESPONSIVE — Hamburger Menu
   ════════════════════════════════════════════════ */
function initHamburger() {
  const hdr = document.querySelector('.hdr');
  const nav = document.querySelector('.nav');
  if (!hdr || !nav) return;

  // Inject hamburger button into header
  const ham = document.createElement('button');
  ham.className = 'ham-btn';
  ham.setAttribute('aria-label', 'Toggle navigation');
  ham.setAttribute('aria-expanded', 'false');
  ham.innerHTML = `
    <span class="ham-line"></span>
    <span class="ham-line"></span>
    <span class="ham-line"></span>
  `;
  hdr.insertBefore(ham, hdr.querySelector('.hdr-right'));

  // Overlay for mobile menu close-on-click
  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';
  document.body.appendChild(overlay);

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !nav.classList.contains('nav-open');
    nav.classList.toggle('nav-open', isOpen);
    ham.classList.toggle('active', isOpen);
    ham.setAttribute('aria-expanded', String(isOpen));
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  ham.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));

  // Close menu when a nav link is clicked
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
}


/* ════════════════════════════════════════════════
   RESPONSIVE — Mobile Search Toggle
   ════════════════════════════════════════════════ */
function initMobileSearch() {
  const hdrRight = document.querySelector('.hdr-right');
  const srch     = document.querySelector('.srch');
  const input    = document.getElementById('srch-in');
  if (!hdrRight || !srch || !input) return;

  // Search toggle button (visible only on tiny screens via CSS)
  const srchBtn = document.createElement('button');
  srchBtn.className = 'ibtn srch-toggle';
  srchBtn.setAttribute('aria-label', 'Search');
  srchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i><span class="tip">Search</span>`;
  hdrRight.insertBefore(srchBtn, hdrRight.firstChild);

  let srchOpen = false;
  srchBtn.addEventListener('click', () => {
    srchOpen = !srchOpen;
    srch.classList.toggle('srch-mobile-open', srchOpen);
    if (srchOpen) input.focus();
  });

  // Close search when clicking outside
  document.addEventListener('click', e => {
    if (srchOpen && !srch.contains(e.target) && !srchBtn.contains(e.target)) {
      srchOpen = false;
      srch.classList.remove('srch-mobile-open');
    }
  });
}


/* ════════════════════════════════════════════════
   RESPONSIVE — Scroll-To-Top Button
   ════════════════════════════════════════════════ */
function initScrollTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ════════════════════════════════════════════════
   RESPONSIVE — Sticky Header Shrink on Scroll
   ════════════════════════════════════════════════ */
function initHeaderScroll() {
  const hdr = document.querySelector('.hdr');
  if (!hdr) return;
  window.addEventListener('scroll', () => {
    hdr.classList.toggle('hdr-scrolled', window.scrollY > 60);
  }, { passive: true });
}


/* ════════════════════════════════════════════════
   RESPONSIVE — Keyboard: Close Modals on ESC
   ════════════════════════════════════════════════ */
function initKeyboardNav() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    // Cart drawer
    const cdraw = document.getElementById('cdraw');
    if (cdraw && cdraw.classList.contains('open')) { closeCart(); return; }
    // Sale modal
    const sov = document.getElementById('sov');
    if (sov && sov.classList.contains('open')) { closeSale(); return; }
  });
}


/* ════════════════════════════════════════════════
   RESPONSIVE — Trending tag search on click
   ════════════════════════════════════════════════ */
function initTrendingTags() {
  document.querySelectorAll('.ttag').forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', () => {
      const query = tag.textContent.trim();
      const input = document.getElementById('srch-in');
      if (input) {
        input.value = query;
        liveSearch(query);
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        showToast(`🔍 Showing results for "${query}"`);
      }
    });
  });
}


/* ════════════════════════════════════════════════
   PRODUCTS — helpers
   ════════════════════════════════════════════════ */
function getFiltered(f) {
  if (f === 'all')  return PRODUCTS;
  if (f === 'sale') return PRODUCTS.filter(p => p.badge === 'sale');
  return PRODUCTS.filter(p => p.cat === f);
}

function sorted(arr, s) {
  const a = [...arr];
  if (s === 'price-asc')  a.sort((x,y) => x.price - y.price);
  if (s === 'price-desc') a.sort((x,y) => y.price - x.price);
  if (s === 'rating')     a.sort((x,y) => y.rating - x.rating);
  if (s === 'newest')     a.sort((x,y) => y.isNew - x.isNew);
  return a;
}

function card(p) {
  const inW = wishlist.includes(p.id);
  const soldOut = p.stock <= 0;
  const st  = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  const sh  = p.shades.length
    ? `<div class="cshades">${p.shades.slice(0,4).map(s=>`<div class="sdot" style="background:${s}" title="${s}"></div>`).join('')}${p.shades.length>4?`<span class="smore">+${p.shades.length-4}</span>`:''}</div>`
    : '<div style="height:22px;margin-bottom:9px"></div>';
  const bl  = p.badge
    ? `<span class="cbadge-card b-${p.badge==='sale'?'sale':p.badge==='new'?'new':'best'}">${p.badge==='sale'?'Sale':p.badge==='new'?'New':'⭐ Best'}</span>` : '';
  return `<div class="pcard" data-id="${p.id}">
    <div class="cimgw">
      <img src="${p.img}" alt="${p.name}" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="img-fb">${p.emoji}</div>
      ${bl}
      <button class="cwish${inW?' active':''}" onclick="toggleWish('${p.id}',this,event)" aria-label="Wishlist">
        <i class="fa-${inW?'solid':'regular'} fa-heart"></i>
      </button>
      <div class="cquick" onclick="addCart('${p.id}')">⚡ Quick Add to Bag</div>
      ${soldOut ? '<div class="sold-out">Sold Out</div>' : ''}
    </div>
    <div class="cbody">
      <div class="cbrand">${p.brand}</div>
      <div class="cname">${p.name}</div>
      ${sh}
      <div class="cstars"><span class="stars">${st}</span><span class="rct">(${p.reviews.toLocaleString()})</span></div>
      <div class="cfooter">
        <div class="cprice">$${p.price.toFixed(2)}${p.oldPrice?` <del>$${p.oldPrice.toFixed(2)}</del>`:''}</div>
        <button class="atc" onclick="addCart('${p.id}')" ${soldOut ? 'disabled' : ''}>${soldOut ? 'Sold Out' : '+ Add'}</button>
      </div>
    </div>
  </div>`;
}

function renderProds(f='all', s='', reset=true) {
  if (reset) { curFilter = f; visible = 8; }
  const items  = sorted(getFiltered(f), s);
  const g      = document.getElementById('pgrid');
  const w      = document.getElementById('vmwrap');
  const shown  = items.slice(0, visible);
  g.innerHTML  = shown.length
    ? shown.map(card).join('')
    : '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:48px">No products found.</p>';
  const rem    = items.length - visible;
  if (rem > 0) { w.style.display = 'block'; document.getElementById('vmcount').textContent = `+${rem} more`; }
  else          { w.style.display = 'none'; }
}

function loadMore() {
  const btn = document.getElementById('vmbtn');
  btn.classList.add('loading');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading…';
  setTimeout(() => {
    visible += PAGE;
    renderProds(curFilter, document.getElementById('ssort').value, false);
    btn.classList.remove('loading');
    btn.innerHTML = `<i class="fa-solid fa-chevron-down"></i> View More Products <span class="vm-count" id="vmcount"></span>`;
    const rem = sorted(getFiltered(curFilter), document.getElementById('ssort').value).length - visible;
    const vc  = document.getElementById('vmcount');
    if (vc) vc.textContent = rem > 0 ? `+${rem} more` : '';
  }, 700);
}

function filterProducts(f, el) {
  curFilter = f;
  document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProds(f, document.getElementById('ssort').value);
}

function sortProducts(v) { renderProds(curFilter, v); }

function filterAndScroll(f) {
  filterProducts(f);
  document.querySelectorAll('.fpill').forEach(p => {
    p.classList.toggle('active', p.textContent.trim().toLowerCase().replace(/\s/g,'').startsWith(f.substring(0,3)));
  });
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function setStrip(el) {
  document.querySelectorAll('.cstrip a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
}

function liveSearch(q) {
  if (!q.trim()) { renderProds(curFilter); return; }
  const m = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.cat.toLowerCase().includes(q.toLowerCase())  ||
    p.brand.toLowerCase().includes(q.toLowerCase())
  );
  document.getElementById('vmwrap').style.display = 'none';
  document.getElementById('pgrid').innerHTML = m.length
    ? m.map(card).join('')
    : '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:48px">No products match your search.</p>';
}


/* ════════════════════════════════════════════════
   CART
   ════════════════════════════════════════════════ */
function addCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const ex = cart.find(x => x.id === id);
  if (ex) {
    if (p.stock && ex.qty + 1 > p.stock) {
      showToast('Not enough stock available for this item.');
      return;
    }
    ex.qty++;
  } else {
    if (p.stock && p.stock < 1) {
      showToast('This item is sold out.');
      return;
    }
    cart.push({...p, qty: 1});
  }
  updateCartUI();
  showToast(`🛍 ${p.name} added to your bag!`);
  const btn = document.getElementById('cart-ibtn');
  if (btn) {
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => btn.style.transform = '', 220);
  }
}

function removeCart(id)  { cart = cart.filter(x => x.id !== id); updateCartUI(); renderCartItems(); }

function chgQty(id, d) {
  const i = cart.find(x => x.id === id); if (!i) return;
  i.qty += d;
  if (i.qty < 1) { removeCart(id); return; }
  updateCartUI(); renderCartItems();
}

function updateCartUI() {
  const tot = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const cnt = cart.reduce((s,i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = cnt;
  document.getElementById('ctotal').textContent     = '$' + tot.toFixed(2);
  document.getElementById('clbl').textContent       = cnt ? `(${cnt} item${cnt>1?'s':''})` : '';
}

function renderCartItems() {
  const el = document.getElementById('citems');
  if (!cart.length) {
    el.innerHTML = '<div class="cempty"><i class="fa-solid fa-bag-shopping"></i><p>Your bag is empty</p><p style="font-size:12px;margin-top:6px">Add some products to get started!</p></div>';
    return;
  }
  el.innerHTML = cart.map(i => `<div class="citem">
    <div class="ciimg"><img src="${i.img}" alt="${i.name}" onerror="this.style.display='none'"></div>
    <div class="cinfo">
      <div class="cinm">${i.name}</div>
      <div class="cipr">$${(i.price * i.qty).toFixed(2)}</div>
      <div class="ciqty">
        <button onclick="chgQty('${i.id}',-1)">−</button>
        <span>${i.qty}</span>
        <button onclick="chgQty('${i.id}',1)">+</button>
        <span class="cirm" onclick="removeCart('${i.id}')">Remove</span>
      </div>
    </div>
  </div>`).join('');
}

function openCart()  { document.getElementById('cov').classList.add('open'); document.getElementById('cdraw').classList.add('open'); renderCartItems(); }
function closeCart() { document.getElementById('cov').classList.remove('open'); document.getElementById('cdraw').classList.remove('open'); }


/* ════════════════════════════════════════════════
   WISHLIST
   ════════════════════════════════════════════════ */
function toggleWish(id, btn, e) {
  e.stopPropagation();
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    btn.classList.add('active');
    btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    showToast('💚 Added to wishlist!');
  } else {
    wishlist.splice(idx,1);
    btn.classList.remove('active');
    btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    showToast('Removed from wishlist');
  }
  const wb = document.getElementById('wbadge');
  wb.textContent = wishlist.length;
  wb.classList.toggle('show', wishlist.length > 0);
}

function openWishlist() {
  showToast(wishlist.length
    ? `💚 You have ${wishlist.length} item${wishlist.length>1?'s':''} saved`
    : '💚 Your wishlist is empty — add some products!');
}


/* ════════════════════════════════════════════════
   SALE MODAL
   ════════════════════════════════════════════════ */
function renderSale(cat = 'all') {
  const items = cat === 'all' ? SALE : SALE.filter(i => i.cat === cat);
  document.getElementById('spgrid').innerHTML = items.map(i => `<div class="scard" onclick="showToast('🛍 ${i.name} added!')">
    <div class="scard-img"><img src="${i.img}" alt="${i.name}" loading="lazy" onerror="this.style.display='none'"></div>
    <div class="scard-b">
      <h3>${i.name}</h3>
      <div class="sprs"><span class="snow">$${i.now}</span><span class="swas">$${i.was}</span><span class="sdisc">-${i.disc}</span></div>
    </div>
  </div>`).join('');
}

function filterSale(cat, el) {
  document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderSale(cat);
}

function openSale()  { renderSale(); document.getElementById('sov').classList.add('open'); }
function closeSale() { document.getElementById('sov').classList.remove('open'); }


/* ════════════════════════════════════════════════
   TOAST
   ════════════════════════════════════════════════ */
let _toastTimer;
function showToast(msg) {
  const t  = document.getElementById('toast');
  document.getElementById('tmsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Could not load products');
    PRODUCTS = await res.json();
  } catch (error) {
    console.warn('Product API unavailable, using fallback data', error);
    if (!PRODUCTS.length) PRODUCTS = [...DEFAULT_PRODUCTS];
  }
  renderProds(curFilter, document.getElementById('ssort')?.value || '', true);
}

function saveAuth(token, user) {
  authToken = token;
  currentUser = user;
  localStorage.setItem(AUTH_STORAGE, JSON.stringify({ token, user }));
  updateAccountUI();
}

function clearAuth() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem(AUTH_STORAGE);
  updateAccountUI();
}

function updateAccountUI() {
  const tip = document.getElementById('account-tip');
  const btn = document.getElementById('account-btn');
  if (currentUser) {
    if (tip) tip.textContent = currentUser.email;
    btn.classList.add('active');
  } else {
    if (tip) tip.textContent = 'Account';
    btn.classList.remove('active');
  }
}

function openAuth() {
  document.getElementById('auth-ov').classList.add('active');
  document.getElementById('auth-modal').classList.add('active');
  if (currentUser) {
    displayAccountPanel();
  } else {
    document.getElementById('auth-form').style.display = 'block';
    document.getElementById('auth-info').style.display = 'none';
    setAuthTab('login');
  }
}

function closeAuth() {
  document.getElementById('auth-ov').classList.remove('active');
  document.getElementById('auth-modal').classList.remove('active');
  showAuthMessage('');
}

function setAuthTab(type) {
  authTab = type;
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const nameRow = document.querySelector('.auth-name-row');
  if (loginTab && registerTab) {
    loginTab.classList.toggle('active', type === 'login');
    registerTab.classList.toggle('active', type === 'register');
  }
  if (nameRow) nameRow.style.display = type === 'register' ? 'block' : 'none';
  if (document.getElementById('auth-submit')) {
    document.getElementById('auth-submit').textContent = type === 'login' ? 'Sign In' : 'Create Account';
  }
  showAuthMessage('');
}

function showAuthMessage(message, isError = false) {
  const msg = document.getElementById('auth-msg');
  if (!msg) return;
  msg.textContent = message;
  msg.style.color = isError ? '#c2185b' : '#1f7a3e';
}

async function authSubmit() {
  const email = document.getElementById('auth-email')?.value.trim();
  const password = document.getElementById('auth-password')?.value.trim();
  if (!email || !password) {
    showAuthMessage('Email and password are required', true);
    return;
  }

  if (authTab === 'register') {
    const name = document.getElementById('auth-name')?.value.trim();
    if (!name) {
      showAuthMessage('Please provide your name', true);
      return;
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      saveAuth(data.token, data.user);
      showToast('Welcome! You are signed in.');
      closeAuth();
    } catch (error) {
      showAuthMessage(error.message, true);
    }
    return;
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    saveAuth(data.token, data.user);
    showToast('Signed in successfully.');
    closeAuth();
  } catch (error) {
    showAuthMessage(error.message, true);
  }
}

async function loadAuth() {
  const saved = localStorage.getItem(AUTH_STORAGE);
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    if (!data?.token) return;
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${data.token}` }
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || 'Authentication expired');
    saveAuth(data.token, body.user);
  } catch (error) {
    console.warn('Authentication could not be restored', error);
    clearAuth();
  }
}

function displayAccountPanel() {
  document.getElementById('auth-form').style.display = 'none';
  document.getElementById('auth-info').style.display = 'block';
  document.getElementById('auth-user-email').textContent = currentUser?.email || '';
  showAuthMessage('');
  fetchOrders();
}

async function fetchOrders() {
  if (!authToken) return;
  try {
    const res = await fetch('/api/orders', {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Unable to load orders');
    const list = document.getElementById('auth-orders');
    if (!list) return;
    list.innerHTML = '<h4>Recent orders</h4>' + (data.orders.length
      ? data.orders.map(o => `<div class="auth-order"><strong>Order #${o.id}</strong><p>${o.items.length} item(s) · $${o.total.toFixed(2)}</p><p>${new Date(o.createdAt).toLocaleString()}</p></div>`).join('')
      : '<p style="font-size:13px;color:var(--text-muted)">No orders yet.</p>');
  } catch (error) {
    console.warn(error);
  }
}

function logoutUser() {
  clearAuth();
  closeAuth();
  showToast('Signed out successfully.');
}

function setPaymentMethod(method) {
  paymentMethod = method;
  document.querySelectorAll('.pmethod').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === method);
  });
  const actionBtn = document.getElementById('checkout-action');
  if (actionBtn) {
    actionBtn.textContent = method === 'paypal'
      ? 'Proceed to PayPal Checkout →'
      : 'Proceed to Stripe Checkout →';
  }
}

async function checkoutPayPal(name, address) {
  try {
    const res = await fetch('/api/create-paypal-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        items: cart.map(item => ({ id: item.id, qty: item.qty })),
        address: `${name} · ${address}`
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'PayPal checkout failed');
    window.location.href = data.url;
  } catch (error) {
    showToast(error.message);
  }
}

async function checkoutOrder() {
  if (!cart.length) {
    showToast('Your bag is empty.');
    return;
  }
  if (!currentUser) {
    openAuth();
    showToast('Please sign in to complete checkout.');
    return;
  }

  const name = document.getElementById('pay-name')?.value.trim();
  const address = document.getElementById('pay-address')?.value.trim();

  if (!name || !address) {
    showToast('Please enter your shipping details.');
    return;
  }

  if (paymentMethod === 'paypal') {
    await checkoutPayPal(name, address);
    return;
  }

  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        items: cart.map(item => ({ id: item.id, qty: item.qty })),
        address: `${name} · ${address}`
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Checkout failed');
    window.location.href = data.url;
  } catch (error) {
    showToast(error.message);
  }
}


/* ════════════════════════════════════════════════
   NEWSLETTER
   ════════════════════════════════════════════════ */
function subscribe(id = 'nl-in') {
  const el = document.getElementById(id);
  if (!el || !el.value.trim().includes('@')) { showToast('⚠️ Please enter a valid email'); return; }
  el.value = '';
  const fb = document.getElementById('nlfb');
  if (fb) fb.textContent = "✓ You're subscribed! A welcome gift is on its way.";
  showToast('🎉 Subscribed! Check your inbox.');
}


/* ════════════════════════════════════════════════
   COUNTDOWN
   ════════════════════════════════════════════════ */
function startCd(secs, ...ids) {
  function tick() {
    if (secs < 0) secs = 8 * 3600;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    [h, m, s].forEach((v, i) => {
      const el = document.getElementById(ids[i]);
      if (el) el.textContent = String(v).padStart(2, '0');
    });
    secs--;
  }
  tick();
  setInterval(tick, 1000);
}


/* ════════════════════════════════════════════════
   INIT — runs after DOM is ready
   ════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* Check URL parameters for payment status */
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get('status');
  if (status === 'success') {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('success-page').style.display = 'flex';
  } else if (status === 'cancel') {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('cancel-page').style.display = 'flex';
  }

  /* Sale modal — close on backdrop click */
  document.getElementById('sov').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSale();
  });

  /* Product grid skeleton → real grid */
  setTimeout(() => {
    document.getElementById('skel-grid').style.display = 'none';
    document.getElementById('pgrid').style.display     = 'grid';
    fetchProducts();
  }, 900);

  /* Countdown timers */
  const S0 = 8 * 3600 + 24 * 60;
  startCd(S0, 'fh', 'fm', 'fs');
  startCd(S0, 'sfh', 'sfm', 'sfs');

  loadAuth();

  /* ── Responsive enhancements ── */
  initHamburger();
  initMobileSearch();
  initScrollTop();
  initHeaderScroll();
  initKeyboardNav();
  initTrendingTags();
});
