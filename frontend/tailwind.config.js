/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0a0f',
          panel: '#151520',
          border: '#2a2a40',
          cyan: '#00f0ff',
          neon: '#00ff9d',
          red: '#ff2a55',
          text: '#a0a0b8',
          white: '#ffffff'
        }
      }
    },
  },
  plugins: [],
}
