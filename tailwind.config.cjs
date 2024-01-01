/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'hidden-visible': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        resizeToHidden: {
          from: {
            transform: 'scale(1.0)',
          },
          to: {
            transform: 'scale(0)',
          },
        },
      },
      animation: {
        'hidden-visible': 'hidden-visible 1s ease-in-out infinite',
        resizeToHidden: 'resizeToHidden 9s forwards',
      },
      fontFamily: {
        arges: ['Arges', 'sans-serif'],
        mori: ['Mori', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
