module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
       'hero-pattern': "url('https://i.imgur.com/awAs2Ct.jpg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
