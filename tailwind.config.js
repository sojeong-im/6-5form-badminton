/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        court: {
          light: '#f6fcee',
          border: '#e2f2cc',
          green: '#74c407',
          lime: '#88d900',
          darkgreen: '#457a03',
        },
        brand: {
          blue: '#0d3278',
          navy: '#081d47',
          orange: '#ff5722',
          yellow: '#ffcc00'
        }
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
