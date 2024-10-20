/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        headerBrand: "#003049",
        headerBackground: "#fdf0d5",
      },
      borderRadius: {
        "custom-xs": "4px",
        "custom-sm": "8px",
        "custom-md": "16px",
        "custom-lg": "24px",
        "custom-xl": "32px",
        "custom-2xl": "40px",
        "custom-3xl": "48px",
        "custom-full": "9999px", // For fully rounded/circular corners
        "custom-circle": "50%", // For a perfect circle
      },
    },
  },
  plugins: [],
};
