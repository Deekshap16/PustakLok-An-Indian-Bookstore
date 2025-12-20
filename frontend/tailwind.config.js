/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bookstore-beige': '#f5f1eb',
        'bookstore-brown': '#8b6f47',
        'bookstore-dark': '#5a4a3a',
        'bookstore-light': '#faf8f4',
      },
    },
  },
  plugins: [],
}



