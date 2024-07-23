/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["sans", "Poppins"],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
