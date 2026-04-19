/** practisEN — Tailwind preset
 *
 *  Usage (tailwind.config.js in your app):
 *
 *    const practisen = require('./brand-kit/tokens/tailwind.config.js');
 *    module.exports = {
 *      presets: [practisen],
 *      content: ['./src/**/*.{html,js,ts,jsx,tsx}']
 *    };
 *
 *  Then use classes like:
 *    bg-brand  text-ink  font-display  rounded-lg  shadow-brand
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7030E0',
          dark:    '#5B23BE',
          light:   '#A78BFA',
        },
        violet: {
          50:  '#F4EFFF',
          100: '#E7DBFF',
          200: '#CDB4FF',
          300: '#A78BFA',
          400: '#8B5FF0',
          500: '#7030E0',
          600: '#5B23BE',
          700: '#461A94',
          800: '#35126E',
          900: '#240B4B',
        },
        navy: {
          50:  '#F1F2F8',
          100: '#DFE1EF',
          200: '#BFC2DE',
          300: '#8C92C1',
          400: '#5962A0',
          500: '#2F3984',
          600: '#1F2971',
          700: '#17205C',
          800: '#0F1847',
          900: '#0A1035',
        },
        ink: {
          DEFAULT: '#0B0B1E',
          1: '#0B0B1E',
          2: '#3A3A55',
          3: '#6B6B85',
          4: '#9C9CB3',
        },
        surface: {
          bg:    '#FAFAFC',
          bg2:   '#F3F2F8',
          card:  '#FFFFFF',
          line:  '#E5E4EE',
          line2: '#EFEEF4',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error:   '#EF4444',
      },

      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body:    ['Nunito',   'system-ui', 'sans-serif'],
        sans:    ['Nunito',   'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        'xs':   ['12px',   { lineHeight: '1.4' }],
        'sm':   ['13.5px', { lineHeight: '1.5' }],
        'base': ['15px',   { lineHeight: '1.55' }],
        'md':   ['17px',   { lineHeight: '1.5' }],
        'lg':   ['19px',   { lineHeight: '1.4' }],
        'xl':   ['24px',   { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        '2xl':  ['32px',   { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '3xl':  ['44px',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        '4xl':  ['56px',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '5xl':  ['72px',   { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        '6xl':  ['96px',   { lineHeight: '1',    letterSpacing: '-0.03em' }],
      },

      letterSpacing: {
        'tightest': '-0.02em',
        'tight':    '-0.01em',
        'wider':     '0.08em',
        'widest':    '0.15em',
      },

      borderRadius: {
        'sm':   '6px',
        'md':   '10px',
        'lg':   '14px',
        'xl':   '20px',
        '2xl':  '28px',
        'pill': '999px',
      },

      boxShadow: {
        sm:    '0 1px 2px rgba(15, 24, 71, 0.06)',
        md:    '0 4px 12px rgba(15, 24, 71, 0.08)',
        lg:    '0 12px 32px rgba(15, 24, 71, 0.10)',
        xl:    '0 24px 56px rgba(15, 24, 71, 0.14)',
        brand: '0 8px 32px rgba(112, 48, 224, 0.25)',
      },

      transitionTimingFunction: {
        'standard': 'cubic-bezier(.2, .8, .2, 1)',
        'out-soft': 'cubic-bezier(0, 0, .2, 1)',
      },
      transitionDuration: {
        'fast': '160ms',
        'base': '240ms',
        'slow': '320ms',
      },
    },
  },
};
