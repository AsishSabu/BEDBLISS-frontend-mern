import flowbite from "flowbite-react/tailwind";
import daisyui from "daisyui"
import withMT from "@material-tailwind/react/utils/withMT"

/** @type {import('tailwindcss').Config} */
export default  withMT({
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
        varCream2:"#FEFAF6",
        varGrey:"#EEEEEE",
        varBlueGray:"#DAEAF1",
        varLight:"#F9F9F9",
        Marine_blue: "hsl(213, 96%, 18%)",
        Purplish_blue: "hsl(243, 100%, 62%)",
        Pastel_blue: "hsl(228, 100%, 84%)",
        Light_blue: "hsl(206, 94%, 87%)",
        Strawberry_red: "hsl(354, 84%, 57%)",
        Cool_gray: "hsl(231, 11%, 63%)",
        Light_gray: "hsl(229, 24%, 87%)",
        Magnolia: "hsl(217, 100%, 97%)",
        Alabaster: "hsl(231, 100%, 99%)",
        White: "hsl(0, 0%, 100%)"

      },
    },

  },
  plugins: [
    
    flowbite.plugin(),
    daisyui,
 
  ],
});
