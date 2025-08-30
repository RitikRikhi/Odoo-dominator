/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        cyan:{
          700:"#0F2027",
          600:"#203A43",
          400:"#2C5364"
        }
      }
    },
  },
  plugins: [],
}

