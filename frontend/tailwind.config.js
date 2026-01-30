/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        bottom: "0 4px 6px -1px rgba(0, 0, 0, 0.2)", // bottom shadow
        top: "0 -4px 6px -1px rgba(0, 0, 0, 0.2)", // top shadow
        left: "-4px 0 6px -1px rgba(0, 0, 0, 0.2)", // left shadow
        right: "4px 0 6px -1px rgba(0, 0, 0, 0.2)", // right shadow
      },
      colors: {
        buttonColor: "rgb(13,106,165)",
      },
    },
  },
  plugins: [],
};
