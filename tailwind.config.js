/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#098BE7",
        "muted-background": "#F8F8F8",
      },
    },
  },
  plugins: [],
}
