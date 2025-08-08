/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6eef6',
          500: '#91278f',
          600: '#822380',
          700: '#731f71',
        },
        secondary: {
          50: '#e6f3f3',
          500: '#008080',
          600: '#006666',
          700: '#004c4c',
        },
        accent: {
          50: '#fff4e6',
          500: '#f7931e',
          600: '#de841b',
          700: '#c57518',
        },
        'content-bg': '#f6eef6',
      },
    },
  },
  plugins: [],
}