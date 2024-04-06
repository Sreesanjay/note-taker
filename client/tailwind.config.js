/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#070f2b",
        "secondary-bg": "#222030",
        "secondary": "#F12856",
        "tertiary": "#ba7aeb",
      }
    },
  },
  plugins: [],
}

