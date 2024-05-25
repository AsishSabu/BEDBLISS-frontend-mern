import flowbite from "flowbite-react/tailwind";
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        varBlue: "#003B95",
        varWhite:"#fdfffc",
        varGreen: "#22c55e",
        varRed:"#dd1c1a",
        varCream:"#fff1d0",
        varGray:"#e9ecef",
      },
    },

  },
  plugins: [
    
    flowbite.plugin(),
    daisyui,
 
  ],
};
