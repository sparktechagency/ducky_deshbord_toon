/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8b0000",
        secondary: "#ffe7e7",
        base: "#4E4E4E",
      },
    },
  },
  plugins: [],
};
