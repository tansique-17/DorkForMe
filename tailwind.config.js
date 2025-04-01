/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      colors: {
        gold: '#FFD700',
        'gold-600': '#B8860B',
      },
      maxWidth: {
        '1920': '1920px',
      },
    },
  },
  plugins: [],
};