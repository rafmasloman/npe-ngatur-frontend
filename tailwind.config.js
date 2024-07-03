/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: require('./src/constant/colors').COLORS,
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};
