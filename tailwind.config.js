/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      fontFamily: {
        sans: ['Neue Montreal', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['8rem', { lineHeight: '1' }],
        '11xl': ['9rem', { lineHeight: '1' }],
        '12xl': ['10rem', { lineHeight: '1' }],
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-2px, -1px)' },
          '40%': { transform: 'translate(2px, 1px)' },
          '60%': { transform: 'translate(-1px, 0px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0, 0)' }
        }
      },
      animation: {
        shake: 'shake 0.7s ease-in-out',
      }
    },
  },
  plugins: [],
}