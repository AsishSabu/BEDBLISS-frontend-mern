/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        varBlue:"#003B95"
      }
    },
    fontFamily:{
      head:["Jersey 15", "sans-serif"]
    }
    
  },
  plugins: [],
};
