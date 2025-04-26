/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f9fafb',
          dark: '#111827',
        },
        primary: {
          light: '#3b82f6',
          dark: '#60a5fa',
        },
      },
    },
  },
  plugins: [],
}