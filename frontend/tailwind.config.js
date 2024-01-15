/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'listBg':"#333333",
        "navText":"#1A1A1A",
        "premiere":"#2B3149",
        "loginBtn":"#F84464",
        "hoverBg":"#F1F1F1",
        "genreStyle":"#666666"
      },
      fontFamily:{
        "Roboto": 'Roboto'
      }
    },
  },
  plugins: [],
}

