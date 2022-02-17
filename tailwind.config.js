module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    screens: {
      'sm': {'max': '767px'},
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },
    extend: {
      colors: {
        c: {
          'card': "rgb(255 255 255)",
          'card-text': '#000000d1',
          'body': "#edf2f7",
        },
      },
      width: {
        'article': 'calc(100% - 330px)',
        'table-of-content': '300px'
      }

    },
  },
  plugins: [],
};
