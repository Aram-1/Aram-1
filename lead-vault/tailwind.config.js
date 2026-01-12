/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          bg: '#09090b',
          surface: '#18181b',
          border: '#27272a',
          text: '#fafafa',
          muted: '#71717a',
          danger: '#ef4444',
          gold: '#eab308',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}
