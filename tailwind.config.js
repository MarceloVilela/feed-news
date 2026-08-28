/** @type {import('tailwindcss').Config} */
const { colors } = require("./src/styles/colors");

module.exports = {
  darkMode: "class",
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        body: ["Roboto_400Regular"],
        heading: ["BaiJamjuree_700Bold"],
      },
    },
  },
  plugins: [],
};
