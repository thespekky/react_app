/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {},
    screens: {
      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }
    },
  },
  plugins: [],
};
