/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        normal: "rgba(115, 82, 89, 1)"
      }
    },
  },
  plugins: [],
}

