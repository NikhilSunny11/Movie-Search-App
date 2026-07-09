/**
 * Theme Configuration — Single Source of Truth
 *
 * WHITE-LABELING: Change ALL app colors, fonts, and spacing by editing ONLY this file.
 * See docs/BRANDING.md for a step-by-step guide.
 */

const theme = {
  colors: {
    // Base
    background:       '#000000',
    surface:          '#0a0a0a',
    surfaceHover:     '#141414',
    surfaceElevated:  '#1a1a1a',

    // Text
    textPrimary:      '#f0f0f5',
    textSecondary:    '#8888a0',
    textMuted:        '#55556a',

    // Brand accent (Burgundy)
    primary:          '#800020',
    primaryHover:     '#a30029',
    primaryGlow:      'rgba(128, 0, 32, 0.25)',

    // Semantic
    accent:           '#06b6d4',
    warning:          '#f59e0b',
    error:            '#ef4444',
    success:          '#10b981',

    // Rating star color
    rating:           '#f59e0b',

    // Glass effect
    glassBg:          'rgba(10, 10, 10, 0.6)',
    glassBorder:      'rgba(255, 255, 255, 0.08)',
  },

  fonts: {
    primary:    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading:    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono:       "'JetBrains Mono', 'Fira Code', monospace",
    brand:      "'Frijole', cursive",
  },

  fontSizes: {
    xs:   '0.75rem',
    sm:   '0.875rem',
    base: '1rem',
    lg:   '1.125rem',
    xl:   '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
  },

  spacing: {
    xs:   '0.25rem',
    sm:   '0.5rem',
    md:   '1rem',
    lg:   '1.5rem',
    xl:   '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  borderRadius: {
    sm:   '0.375rem',
    md:   '0.75rem',
    lg:   '1rem',
    xl:   '1.5rem',
    full: '9999px',
  },

  shadows: {
    sm:    '0 2px 8px rgba(0, 0, 0, 0.3)',
    md:    '0 4px 16px rgba(0, 0, 0, 0.4)',
    lg:    '0 8px 32px rgba(0, 0, 0, 0.5)',
    glow:  '0 0 20px rgba(124, 58, 237, 0.3)',
  },

  transitions: {
    fast:     '150ms ease',
    default:  '250ms ease',
    slow:     '400ms ease',
    spring:   '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

/**
 * Injects the theme as CSS custom properties on :root.
 * Call this once in main.jsx to sync JS theme with CSS.
 */
export function injectThemeCSS() {
  const root = document.documentElement;

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${camelToKebab(key)}`, value);
  });

  // Fonts
  Object.entries(theme.fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value);
  });

  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });
}

function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export default theme;
