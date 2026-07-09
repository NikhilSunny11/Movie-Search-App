# Branding & White-Label Guide

This app is designed for easy brand customization. All visual branding is controlled from **3 locations**.

---

## 1. Change Colors, Fonts & Spacing

**File:** `client/src/config/theme.js`

This is the single source of truth for the entire design system.

### Colors
```js
colors: {
  primary:       '#7c3aed',  // ← Change this to your brand color
  primaryHover:  '#9055ff',  // ← A lighter shade for hover states
  primaryGlow:   'rgba(124, 58, 237, 0.25)',  // ← Same color, 25% opacity
  accent:        '#06b6d4',  // ← Secondary accent color
  rating:        '#f59e0b',  // ← Star rating color (amber)
}
```

### Fonts
```js
fonts: {
  primary: "'Inter', sans-serif",  // ← Replace with your brand font
  heading: "'Inter', sans-serif",  // ← Can be different from body text
}
```

> **Tip:** If using a custom font, add the `@import` URL in `client/src/styles/global.css`.

---

## 2. Change Site Title & Text

**File:** `client/src/config/constants.js`

```js
export const SITE_TITLE = 'CineSearch';           // ← Your app name
export const SITE_TAGLINE = 'Discover your next favorite movie';  // ← Your tagline
```

---

## 3. Change Logo & Favicon

**Directory:** `client/public/brand/`

| File | What It Is | Format |
|------|-----------|--------|
| `logo.svg` | Header logo | SVG (recommended) or PNG |
| `favicon.ico` | Browser tab icon | ICO or PNG |

Simply replace these files with your own. The filenames must stay the same.

---

## 4. Update HTML Meta Tags

**File:** `client/index.html`

Update the `<title>` and `<meta name="description">` tags:

```html
<title>YourBrand — Movie Search App</title>
<meta name="description" content="Your custom description here." />
```

---

## Summary

| What to Change | Where |
|---|---|
| Colors, fonts, spacing | `client/src/config/theme.js` |
| Site name, tagline | `client/src/config/constants.js` |
| Logo, favicon | `client/public/brand/` |
| Page title, SEO | `client/index.html` |

**That's it.** No component files need to be touched for a basic rebrand.
