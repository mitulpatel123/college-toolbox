/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1A1A2E',
          DEFAULT: '#16213E',
          light: '#0F3460',
        },
        accent: {
          blue: '#00B4D8',
          red: '#E94560',
        },
      },
    },
  },
  plugins: [],
};