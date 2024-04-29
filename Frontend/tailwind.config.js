/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily:{
      'inter':['Inter','sans-serif'],
    },
      spacing:{
        '0.1':'1px',
      },
      width:{
        '85':'340px',
      },
      screens:{
        '3xl':'1720px',
      },
      fontSize:{
        '10xl':'140px',
        '12xl':'180px',
      }
    },
  },
  plugins: [],
}

