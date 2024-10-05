/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary50: '#eff6ff',
        primary100: '#dbeafe',
        primary200: '#bfdbfe',
        primary300: '#93c5fd',
        primary400: '#60a5fa',
        primary500: "#B23850",
        primary600: '#2563eb',
        primary700: ' #1d4ed8',
        primary800: '#1e40af',
        primary900: '#1e3a8a',
        grey50: '#f0f4f8',
        grey100: '#d9e2ec',
        grey200: '#bcccdc',
        grey300: '#9fb3c8',
        grey400: '#829ab1',
        grey500: '#627d98',
        grey600: '#486581',
        grey700: '#334e68',
        grey800: '#243b53',
        grey900: '#102a43',
        black: '#222',
        white: '#fff',
        light: '#f8d7da',
        redDark: '#842029',
        greenLight: '#d1e7dd',
        greenDark: '#0f5132',
        headingFont: `"Roboto Condensed", Sans-Serif`,
        bodyFont: `"Cabin", 'Sans-Serif'`
      },
      backgroundColor: {
        grey50: '#f0f4f8',
      },

    },
  },
  plugins: [],
}
