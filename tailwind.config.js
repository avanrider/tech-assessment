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
        'content-bg': '#f6eef6',
      },
    },
  },
  plugins: [],
}