/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        coloroftext: "rgba(var(--text-color))",
        backgroundcolor: "rgba(var(--background-color))",
        navhovercolor: "rgba(var(--nav-hover-color))",
      },
    },
    screens: {
      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }
    },
  },
  plugins: [],
};
