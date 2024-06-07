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

        "primary": "#008eff",

        "secondary": "#00c6ff",

        "accent": "#00e38e",

        "neutral": "#1d1d1d",

        "base-100": "#fff5ff",

        "info": "#0072de",

        "success": "#42d242",

        "warning": "#ff8600",

        "error": "#ff8d8c",
      },
    }],
  },


};

// "base-100": "#fff",

//         "base-200": "#F0F2F5",

//         "base-300": "#bebebe",

//         "base-content": "#161616",