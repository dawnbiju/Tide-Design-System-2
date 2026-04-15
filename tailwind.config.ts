import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Figtree', 'sans-serif'],
      },
      colors: {
        // ── Core palette ──────────────────────────────────────────
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
        // ── Status ────────────────────────────────────────────────
        success: {
          bg:   '#DDF7E5',
          fg:   '#1B9C5A',
        },
        warning: {
          bg:   '#FFF1CF',
          fg:   '#C77A00',
        },
        error: {
          bg:   '#FDE2E1',
          fg:   '#D14343',
        },
        info: {
          bg:   '#EFF1FF',
          fg:   '#1929D6',
        },
      },
      borderRadius: {
        '8':   '8px',
        '16':  '16px',
        '24':  '24px',
        'full': '999px',
      },
      spacing: {
        '0':  '0px',
        '8':  '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '56': '56px',
        '64': '64px',
        '72': '72px',
        '80': '80px',
        '96': '96px',
      },
      boxShadow: {
        'card':  '0px 8px 24px 0px rgba(4, 9, 102, 0.12)',
        'modal': '0px 16px 40px 0px rgba(12, 12, 14, 0.16)',
      },
      fontSize: {
        'display-xl': ['52px', { lineHeight: '68px', letterSpacing: '0.5px' }],
        'display-l':  ['40px', { lineHeight: '52px', letterSpacing: '0.5px' }],
        'heading-l':  ['32px', { lineHeight: '40px',  letterSpacing: '0.5px' }],
        'heading-m':  ['24px', { lineHeight: '32px',  letterSpacing: '0.4px' }],
        'heading-s':  ['20px', { lineHeight: '32px',  letterSpacing: '0.25px' }],
        'title-m':    ['16px', { lineHeight: '24px',  letterSpacing: '0.25px' }],
        'body-l':     ['18px', { lineHeight: '28px',  letterSpacing: '0.25px' }],
        'body-m':     ['16px', { lineHeight: '24px',  letterSpacing: '0.25px' }],
        'body-s':     ['14px', { lineHeight: '20px',  letterSpacing: '0.2px' }],
        'label-btn':  ['16px', { lineHeight: '24px',  letterSpacing: '0.25px' }],
        'caption':    ['12px', { lineHeight: '16px',  letterSpacing: '0.25px' }],
      },
    },
  },
  plugins: [],
}

export default config
