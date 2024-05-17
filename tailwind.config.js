const flowbite = require("flowbite-react/tailwind");
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
        varGreen: "#22c55e",
        adminDash:"rgb(36, 48, 63)"
      },
    },
    fontFamily: {
      head: ["Jersey 15", "sans-serif"],
    },
  },
  plugins: [
    flowbite.plugin()
  ],
};
