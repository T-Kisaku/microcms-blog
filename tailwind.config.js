module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        c: {
          'card': "rgb(255 255 255)",
          'card-text': '#000000d1',
          'body': "#edf2f7",
        },
      },
    },
  },
  plugins: [],
};
