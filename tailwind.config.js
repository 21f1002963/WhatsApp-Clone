/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#04a784",
        primaryDense: "#006837",
        background: "#cdd0d2",
        "chat-bg": "#F2EFE9",
        "primary-light": "#D9FDD2"
      },
    },
  },
  plugins: [],
}

