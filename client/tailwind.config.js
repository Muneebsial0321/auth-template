/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#262624',
          darker: "#1f1e1d",
          lighter: "#c96442",
          light_text:"#c4c2b8",
          light_bg:"#30302e",
          border:"#4b4a47"
        },
        accent: '#1f1e1d',
        secondary: '#1f1e1d',
      },
      fontFamily: {
        dyslexic: ['OpenDyslexic', 'monospace'],
          inter: ['Inter', 'mongospace'],
      },

    },
  },
  plugins: [],
};