/** @type {import('tailwindcss').Config} */

// Design tokens follow DESIGN.md (Geist system): one near-black ink on a near-white canvas,
// 1px hairlines instead of shadows, and a single accent. The accent is the brand green from
// the favicon; `brand-ink` is the darker step that passes WCAG AA for text and focus rings.
const ink = '#171717';
const body = '#4d4d4d';
const mute = '#666666';
const faint = '#8f8f8f';
const hairline = '#ebebeb';
const hairlineSoft = '#f2f2f2';
const canvas = '#fafafa';
const elevated = '#ffffff';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink,
        body,
        mute,
        faint,
        hairline,
        'hairline-soft': hairlineSoft,
        canvas,
        elevated,
        brand: {
          DEFAULT: '#00bf63',
          ink: '#007a3d',
          soft: '#ebfaf2',
        },
        warning: { DEFAULT: '#f5a623', soft: '#ffefcf', deep: '#ab570a' },

        // Legacy token names still referenced in markup, remapped onto the Geist palette.
        'ink-muted': body,
        paper: elevated,
        mist: hairlineSoft,
        line: hairline,
        accent: '#00bf63',
        'accent-soft': '#ebfaf2',
        primary: ink,
        'on-primary': '#ffffff',
        secondary: '#007a3d',
        'on-secondary': '#ffffff',
        tertiary: ink,
        'on-tertiary': '#ffffff',
        background: canvas,
        'on-background': ink,
        surface: canvas,
        'surface-bright': canvas,
        'surface-dim': hairline,
        'surface-variant': hairlineSoft,
        'surface-container-lowest': elevated,
        'surface-container-low': canvas,
        'surface-container': hairlineSoft,
        'surface-container-high': hairline,
        'surface-container-highest': hairline,
        'on-surface': ink,
        'on-surface-variant': body,
        outline: faint,
        'outline-variant': hairline,
        error: '#c50000',
        'error-container': '#fff0f0',
        'on-error': '#ffffff',
        'on-error-container': '#c50000',
      },
      fontFamily: {
        sans: ['Geist', 'Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        data: ['"Geist Mono"', 'ui-monospace', 'monospace'],
        'data-tabular': ['"Geist Mono"', 'ui-monospace', 'monospace'],
        'body-md': ['Geist', 'Arial', 'sans-serif'],
        'body-lg': ['Geist', 'Arial', 'sans-serif'],
        'headline-lg': ['Geist', 'Arial', 'sans-serif'],
        'headline-md': ['Geist', 'Arial', 'sans-serif'],
        'headline-sm': ['Geist', 'Arial', 'sans-serif'],
        'display-lg': ['Geist', 'Arial', 'sans-serif'],
        'label-sm': ['Geist', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['48px', { lineHeight: '52px', letterSpacing: '-2.4px', fontWeight: '600' }],
        'display-lg': ['40px', { lineHeight: '44px', letterSpacing: '-1.8px', fontWeight: '600' }],
        'heading-lg': ['32px', { lineHeight: '40px', letterSpacing: '-1.28px', fontWeight: '600' }],
        'heading-md': ['20px', { lineHeight: '28px', letterSpacing: '-0.4px', fontWeight: '600' }],
        'label-sm': ['14px', { lineHeight: '20px', letterSpacing: '-0.28px', fontWeight: '500' }],
        'mono-eyebrow': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'body-lg': ['16px', { lineHeight: '24px' }],
        'body-md': ['14px', { lineHeight: '20px' }],
        'body-sm': ['12px', { lineHeight: '16px' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-1.28px', fontWeight: '600' }],
        'headline-md': ['20px', { lineHeight: '28px', letterSpacing: '-0.4px', fontWeight: '600' }],
        'data-tabular': ['14px', { lineHeight: '20px' }],
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
        pill: '100px',
        full: '9999px',
      },
      boxShadow: {
        // Depth is a hairline plus, at most, a finely layered low-alpha stack.
        '2xs': '0 1px 1px rgba(0,0,0,0.03)',
        xs: '0 1px 1px rgba(0,0,0,0.04)',
        sm: '0 1px 1px rgba(0,0,0,0.04)',
        DEFAULT: '0 1px 1px rgba(0,0,0,0.04)',
        md: '0 2px 2px rgba(0,0,0,0.03), 0 8px 16px -4px rgba(0,0,0,0.04)',
        lg: '0 2px 2px rgba(0,0,0,0.03), 0 8px 16px -4px rgba(0,0,0,0.05)',
        xl: '0 2px 2px rgba(0,0,0,0.04), 0 12px 24px -8px rgba(0,0,0,0.08)',
        '2xl': '0 2px 2px rgba(0,0,0,0.04), 0 16px 32px -8px rgba(0,0,0,0.10)',
        inner: 'inset 0 1px 2px rgba(0,0,0,0.04)',
      },
      spacing: {
        'container-max': '1200px',
        base: '8px',
        'margin-desktop': '32px',
        'margin-mobile': '16px',
        'stack-sm': '12px',
        'stack-md': '24px',
        'stack-lg': '64px',
        gutter: '24px',
      },
      maxWidth: {
        'container-max': '1200px',
        prose: '72ch',
      },
    },
  },
  plugins: [],
};
