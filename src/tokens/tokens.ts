/**
 * Tide Design System — Design Tokens (TypeScript)
 * Single source of truth. Mirrors the CSS custom properties in globals.css.
 * Use these in JS/TS contexts (tests, scripts, style-in-JS).
 */

export const colors = {
  // ── Core palette ────────────────────────────────────────────────────────
  primary: {
    50:  '#EFF1FF',
    100: '#D0D5FC',
    500: '#1929D6',
    700: '#0C169A',
    900: '#040966',
  },
  neutral: {
    200: '#ECECEE',
    500: '#5F606D',
  },
  ink: {
    950: '#0C0C0E',
  },
  yellow: {
    400: '#FFC142',
  },
  // ── Semantic — background ────────────────────────────────────────────────
  bg: {
    page:        '#FFFFFF',
    surface:     '#FFFFFF',
    subtle:      '#EFF1FF',
    brand:       '#1929D6',
    brandStrong: '#040966',
    accentWarm:  '#FFC142',
  },
  // ── Semantic — text ─────────────────────────────────────────────────────
  text: {
    primary:   '#040966',
    secondary: '#5F606D',
    strong:    '#0C0C0E',
    inverse:   '#FFFFFF',
    brand:     '#1929D6',
  },
  // ── Semantic — border ────────────────────────────────────────────────────
  border: {
    subtle:  '#D0D5FC',
    brand:   '#1929D6',
    inverse: '#FFFFFF',
  },
  // ── Controls ────────────────────────────────────────────────────────────
  control: {
    disabledBackground: '#D8DAE3',
    disabledForeground: '#D8DAE3',
  },
  // ── Status ──────────────────────────────────────────────────────────────
  status: {
    success: { background: '#DDF7E5', foreground: '#1B9C5A' },
    warning: { background: '#FFF1CF', foreground: '#C77A00' },
    error:   { background: '#FDE2E1', foreground: '#D14343' },
    info:    { background: '#EFF1FF', foreground: '#1929D6' },
  },
} as const

export const spacing = {
  0:  '0px',
  8:  '8px',
  16: '16px',
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px',
  56: '56px',
  64: '64px',
  72: '72px',
  80: '80px',
  96: '96px',
} as const

export const radius = {
  8:    '8px',
  16:   '16px',
  24:   '24px',
  full: '999px',
} as const

export const shadow = {
  card:  '0px 8px 24px 0px rgba(4, 9, 102, 0.12)',
  modal: '0px 16px 40px 0px rgba(12, 12, 14, 0.16)',
} as const

export const typography = {
  fontFamily: {
    display: '"Plus Jakarta Sans", sans-serif',
    body:    'Figtree, sans-serif',
  },
  scale: {
    'display-xl': { fontSize: '52px', lineHeight: '68px', letterSpacing: '0.5px',  fontWeight: 600, family: 'display' },
    'display-l':  { fontSize: '40px', lineHeight: '52px', letterSpacing: '0.5px',  fontWeight: 600, family: 'display' },
    'heading-l':  { fontSize: '32px', lineHeight: '40px', letterSpacing: '0.5px',  fontWeight: 600, family: 'display' },
    'heading-m':  { fontSize: '24px', lineHeight: '32px', letterSpacing: '0.4px',  fontWeight: 600, family: 'display' },
    'heading-s':  { fontSize: '20px', lineHeight: '32px', letterSpacing: '0.25px', fontWeight: 700, family: 'body'    },
    'title-m':    { fontSize: '16px', lineHeight: '24px', letterSpacing: '0.25px', fontWeight: 600, family: 'body'    },
    'body-l':     { fontSize: '18px', lineHeight: '28px', letterSpacing: '0.25px', fontWeight: 400, family: 'body'    },
    'body-m':     { fontSize: '16px', lineHeight: '24px', letterSpacing: '0.25px', fontWeight: 400, family: 'body'    },
    'body-s':     { fontSize: '14px', lineHeight: '20px', letterSpacing: '0.2px',  fontWeight: 400, family: 'body'    },
    'label-btn':  { fontSize: '16px', lineHeight: '24px', letterSpacing: '0.25px', fontWeight: 500, family: 'body'    },
    'caption':    { fontSize: '12px', lineHeight: '16px', letterSpacing: '0.25px', fontWeight: 500, family: 'body'    },
  },
} as const

export const tokens = { colors, spacing, radius, shadow, typography } as const
export type Tokens = typeof tokens
