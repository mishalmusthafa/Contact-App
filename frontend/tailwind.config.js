/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        '128': '36rem',
      }
    },
  },

  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: [{
      mytheme: {

        "primary": "#9b00ff",

        "secondary": "#ff0000",

        "accent": "#917400",

        "neutral": "#020600",

        "base-100": "#fff",

        "info": "#0077e8",

        "success": "#008c00",

        "warning": "#cf9100",

        "error": "#c1002e",
      },
    }],
  },


}

