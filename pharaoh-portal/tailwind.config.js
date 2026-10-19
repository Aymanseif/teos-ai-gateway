/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        coal: '#0A0A0A',
        gold: {
          DEFAULT: '#D4AF37',
          bright: '#FFD700',
          deep: '#B8860B',
          dim: '#8A6E1F',
        },
        emerald: {
          DEFAULT: '#10B981',
          deep: '#047857',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 40px rgba(212,175,55,0.18)',
        'gold-glow-lg': '0 0 80px rgba(212,175,55,0.28)',
        'gold-ring': 'inset 0 0 0 1px rgba(212,175,55,0.35)',
        'emerald-glow': '0 0 40px rgba(16,185,129,0.18)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B8860B 0%, #D4AF37 35%, #FFD700 55%, #D4AF37 75%, #B8860B 100%)',
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 3.5s ease-in-out infinite',
        'shimmer': 'shimmer 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
