/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '5px 5px 10px rgba(0, 0, 0, 0.6)',
        '4xl': [
          '5px 5px 10px rgba(0, 0, 0, 0.6)',
          '10px 10px 30px rgba(0, 0, 0, 0.3)'
        ]
      },
      
      

      colors: {
        normal: "rgba(115, 82, 89, 1)"
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        'waving-hand': 'wave 1s linear infinite',
      },
    },
  },
  plugins: [],
}

