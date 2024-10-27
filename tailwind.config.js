/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        headerBrand: "#003049",
        headerBackground: "#f0f0f0",
      },
    },
  },
  plugins: [],
};
