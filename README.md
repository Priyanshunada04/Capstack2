# Capstack

> **Find. Verify. Apply.**

The only funding aggregator built around trust. 2,400+ verified opportunities for founders.

![Capstack Screenshot](https://via.placeholder.com/800x400/0a0a0a/00c853?text=Capstack)

## 🚀 Features

- **🔍 Browse 2,400+ Verified Opportunities** — Every listing is hand-verified and up-to-date
- **✦ Personalized Match Scores** — See how well each opportunity fits your startup
- **📊 Application Tracker** — Kanban board to track all your applications in one place
- **🏦 Investor Dashboard** — Submit and manage funding opportunities
- **⚡ Admin Panel** — Review submissions, manage users, monitor activity

## 🎨 Design

Green & Black money theme with:
- Dark backgrounds (`#0a0a0a`, `#141414`)
- Primary accent: `#00c853` (money green)
- Glass morphism effects
- Smooth animations and transitions

## 📁 Project Structure

```
capstack/
├── index.html                  ← Entry point
├── README.md
├── .gitignore
└── assets/
    ├── css/
    │   ├── main.css            ← CSS variables, reset, global styles, nav
    │   ├── components.css      ← Auth modal, Google picker, onboarding, tracker cards
    │   ├── views.css           ← Landing, directory, detail, profile, admin layouts
    │   └── responsive.css      ← Mobile breakpoints (900px, 600px, 380px)
    └── js/
        ├── data.js             ← DB layer (localStorage) + 18 opportunity records
        ├── app.js              ← View router, modal manager, app init
        ├── auth.js             ← Sign-in, sign-up, logout, nav state
        ├── google.js           ← Google OAuth (demo picker + real GSI flow)
        ├── onboarding.js       ← 4-step founder onboarding + match score recalc
        ├── directory.js        ← Browse, filter, sort, detail view, match pills
        ├── tracker.js          ← Kanban board, per-user localStorage
        ├── investor.js         ← Submit opportunities, investor dashboard
        ├── admin.js            ← Submission queue, user table, activity log
        ├── mobile.js           ← Hamburger drawer, bottom tab bar
        └── ui.js               ← Toast, progress bar, skeleton loaders, dates
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/capstack.git
   cd capstack
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

   Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve

   # PHP
   php -S localhost:8000
   ```

3. **Access the app**
   Navigate to `http://localhost:8000`

## 🔑 Demo Accounts

### Admin Login
- **Email:** `admin@capstack.io`
- **Password:** `admin2026`

### Demo Google Accounts
- Alex Johnson (`alex.johnson@gmail.com`)
- Priya Sharma (`priya.sharma@gmail.com`)

## 📱 Mobile Support

Fully responsive with breakpoints at:
- **900px** — Tablet layout
- **600px** — Mobile layout
- **380px** — Small mobile layout

Touch-optimized with:
- Hamburger menu
- Bottom tab bar (mobile app-like experience)
- Swipe gestures
- Larger touch targets

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** — No frameworks, pure JS
- **localStorage** — Client-side data persistence
- **Google Identity Services** — OAuth (optional)

## 📝 Data Storage

All data is stored in the browser's localStorage:

| Key | Description |
|-----|-------------|
| `capstack_users` | Registered users |
| `capstack_current_user` | Currently logged in user |
| `capstack_submissions` | Investor submissions |
| `capstack_activity` | Admin activity log |
| `capstack_tracker_{userId}` | Per-user tracker items |

## 🎨 Customization

### Change Primary Color

Edit `assets/css/main.css`:

```css
:root {
  --money-green: #00c853;  /* Change this */
  --money-green-dark: #00a344;
  --money-green-light: #69f0ae;
}
```

### Add New Opportunities

Edit `assets/js/data.js` and add to the `OPPORTUNITIES` array:

```javascript
{
  id: 19,
  logo: '🚀',
  name: 'Your Programme',
  org: 'Your Organisation',
  type: 'Accelerator',
  stage: ['Pre-seed', 'Seed'],
  geo: 'Global',
  amount: '$100K',
  deadline: '2026-12-31',
  // ... more fields
}
```

## 🔒 Production Setup

### Enable Real Google OAuth

1. Get a Google Client ID from [Google Cloud Console](https://console.cloud.google.com/)
2. Update `assets/js/google.js`:

```javascript
const GoogleAuth = {
  clientId: 'YOUR_GOOGLE_CLIENT_ID',
  // ...
};
```

3. Initialize in `app.js`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  GoogleAuth.init('YOUR_GOOGLE_CLIENT_ID');
  // ...
});
```

## 🧪 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

MIT License — feel free to use for personal or commercial projects.

## 🙏 Credits

- Design inspiration: Modern fintech dashboards
- Icons: [Lucide](https://lucide.dev/)
- Fonts: [Inter](https://fonts.google.com/specimen/Inter)

---

Built with 💚 by the Capstack team
