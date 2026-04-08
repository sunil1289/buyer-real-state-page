/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        sun: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        shaft: {
          50:  '#f5f4f2',
          100: '#e8e5e1',
          200: '#d1ccc5',
          300: '#b0a89e',
          400: '#8c8178',
          500: '#6b6059',
          600: '#4a4039',
          700: '#2e261f',
          800: '#1e1812',
          900: '#120e09',
        },
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        fadeUp:  'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 1.4s infinite',
      },
      boxShadow: {
        warm: '0 2px 8px rgba(30,24,18,0.08), 0 8px 32px rgba(30,24,18,0.08)',
        card: '0 1px 2px rgba(30,24,18,0.05), 0 4px 16px rgba(30,24,18,0.07)',
        sun:  '0 4px 20px rgba(245,158,11,0.25)',
      },
    },
  },
  plugins: [],
}