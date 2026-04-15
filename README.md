# ShopWow — Beauty & Wellness E-Commerce Store

> A fully responsive, feature-rich frontend e-commerce storefront for beauty, skincare, makeup, wellness, and lifestyle products — with integrated **Stripe** and **PayPal** payment checkout.

---

## 📸 Preview

| Homepage | Product Grid | Cart & Checkout |
|----------|-------------|-----------------|
| Hero section with CTA | Category filtering & live search | Stripe & PayPal payment flow |

---

## ✨ Features

- **Full Product Catalog** — 16+ beauty & wellness products with categories: Skincare, Makeup, Eye Care, Lip Care, Serums, and Gift Sets
- **Live Search** — Instant product filtering as the user types
- **Category Filtering** — Filter by product category via the sticky navigation strip
- **Product Cards** — Ratings, reviews, shade swatches, stock indicators, badges (New / Sale / Best)
- **Wishlist** — Save products with a heart toggle; badge count updates in real time
- **Shopping Cart Drawer** — Slide-in cart with quantity controls, item removal, and running total
- **Flash Sale Modal** — Timed sale deals with a live countdown timer
- **Announcement Bar** — Dismissable promo bar (free shipping threshold + discount code)
- **Newsletter Subscription** — Email capture with inline confirmation feedback
- **User Authentication** — Sign-in / Register modal with session persistence via `localStorage`
- **Order History** — Authenticated users can view their recent orders
- **Scroll-to-Top Button** — Appears after scrolling 400px
- **Sticky Header** — Shrinks on scroll for a cleaner reading experience
- **Responsive Design** — Hamburger menu, mobile search toggle, and fluid grid layouts for all screen sizes
- **Accessibility** — ARIA labels, keyboard navigation (ESC closes modals), and semantic HTML throughout
- **Payment Success / Cancel Pages** — Dedicated confirmation and cancellation screens shown via URL parameter (`?status=success` / `?status=cancel`)

---

## 💳 Payment Integration

ShopWow supports **two payment providers** at checkout. Users can select their preferred method directly in the cart drawer before proceeding.

### Stripe

Checkout is initiated by calling the backend endpoint:

```
POST /api/create-checkout-session
```

**Request body:**
```json
{
  "items": [{ "id": "p1", "qty": 2 }],
  "address": "John Doe · 123 Main St, New York"
}
```

The server returns a `{ url }` and the browser redirects to the hosted Stripe Checkout page. On completion, Stripe redirects back to the storefront with `?status=success` or `?status=cancel`.

---

### PayPal

Checkout is initiated by calling:

```
POST /api/create-paypal-order
```

**Request body:**
```json
{
  "items": [{ "id": "p1", "qty": 2 }],
  "address": "John Doe · 123 Main St, New York"
}
```

The server returns a `{ url }` pointing to the PayPal approval page. After the user approves, PayPal redirects back to the storefront.

---

### Payment Flow (Both Providers)

```
User fills shipping details
        ↓
Selects Stripe or PayPal
        ↓
Clicks "Proceed to Checkout"
        ↓
POST to /api/create-checkout-session  OR  /api/create-paypal-order
        ↓
Redirect to payment provider
        ↓
Provider redirects to /?status=success or /?status=cancel
        ↓
Storefront shows confirmation or cancellation screen
```

> **Note:** The frontend passes a `Bearer <authToken>` in the `Authorization` header for all checkout requests. Users must be signed in before checkout is allowed.

---

### Supported Payment Methods (Displayed in Footer)

| VISA | Mastercard | American Express | PayPal |
|------|------------|-----------------|--------|

---

## 🗂️ Project Structure

```
shopwow/
├── index.html      # Main HTML — layout, modals, cart drawer, payment pages
├── style.css       # All styling — design tokens, components, responsive rules
└── script.js       # All interactivity — products, cart, wishlist, auth, payments
```

This is a **pure frontend** project (HTML + CSS + JS). No build tools or frameworks are required to run it. Backend API endpoints for authentication and payment processing are expected to be provided separately.

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A backend server exposing the following API endpoints:
  - `POST /api/register`
  - `POST /api/login`
  - `GET /api/orders`
  - `POST /api/create-checkout-session` *(Stripe)*
  - `POST /api/create-paypal-order` *(PayPal)*

### Running Locally

1. **Clone the repository**

```bash
git clone https://github.com/hashirkhanhashi3-create/shopwow.git
cd shopwow
```

2. **Serve the files**

Use any local static server. For example, with the VS Code Live Server extension, or:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (npx)
npx serve .
```

3. **Open in browser**

```
http://localhost:8080
```

> For full checkout functionality, connect a backend that handles the Stripe and PayPal API endpoints listed above.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, flexbox, CSS grid |
| Scripting | Vanilla JavaScript (ES2020+) |
| Icons | [Font Awesome 6.5](https://fontawesome.com/) |
| Fonts | [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) · [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts |
| Images | [Unsplash](https://unsplash.com/) (CDN) |
| Payments | Stripe Checkout · PayPal Orders API |

---

## 🎨 Design System

The project uses a CSS custom-properties based design token system defined in `:root`:

| Token | Value | Usage |
|-------|-------|-------|
| `--c2` | `#c2185b` | Deep rose-pink (primary brand) |
| `--c3` | `#e91e8c` | Vivid hot pink (accent) |
| `--c4` | `#fce4ec` | Soft blush (backgrounds) |
| `--font-head` | Cormorant Garamond | Display / headings |
| `--font-body` | DM Sans | Body text / UI |

---

## 📱 Responsive Behaviour

| Breakpoint | Behaviour |
|------------|-----------|
| Desktop (`> 900px`) | Full horizontal navigation, expanded search bar |
| Tablet (`≤ 900px`) | Hamburger menu, condensed header |
| Mobile (`≤ 480px`) | Single-column grid, mobile search toggle, touch-friendly controls |

---

## ♿ Accessibility

- All interactive elements have `aria-label` attributes
- Modals use `role="dialog"` and `aria-hidden` state management
- Keyboard navigation: `Escape` closes open modals and drawers
- Focus management on modal open/close
- Semantic HTML5 elements (`<header>`, `<nav>`, `<section>`, `<footer>`)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📬 Contact

Have a question or suggestion? Reach out via the [Issues](https://github.com/hashirkhanhashi3-create/shopwow/issues) tab.

---

<p align="center">Made with ❤️ for beauty lovers everywhere</p>
