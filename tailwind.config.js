/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#8DAA91',
          light:   '#A8C4AE',
          dark:    '#6B8A6F',
        },
        sand: {
          DEFAULT: '#F5F5DC',
          light:   '#FDFDF8',
          dark:    '#E8E8CD',
        },
        slate: {
          DEFAULT: '#4A4E69',
          light:   '#6B6F8A',
          dark:    '#363A4F',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '5xl': ['3rem',   { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
        '7xl': ['4.5rem',  { lineHeight: '1' }],
      },
      lineHeight: {
        'relaxed-plus': '1.8',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '28': '7rem',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
        'pill': '9999px',
      },
      animation: {
        'fade-in':     'fadeIn 0.6s ease-out both',
        'slide-up':    'slideUp 0.6s ease-out both',
        'slide-down':  'slideDown 0.6s ease-out both',
        'pulse-gentle': 'gentlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '0.75' },
          '50%':      { opacity: '1' },
        },
      },
      boxShadow: {
        'sage-glow': '0 0 30px rgba(141, 170, 145, 0.45)',
        'card':      '0 4px 24px rgba(74, 78, 105, 0.08)',
        'card-hover':'0 16px 48px rgba(74, 78, 105, 0.14)',
        'featured':  '0 8px 40px rgba(141, 170, 145, 0.3)',
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(135deg, rgba(245,245,220,0.6) 0%, rgba(255,255,255,0.8) 50%, rgba(141,170,145,0.06) 100%)',
        'footer-gradient': 'linear-gradient(135deg, #363A4F 0%, #2a2d3e 100%)',
      },
    },
  },
  plugins: [],
};
