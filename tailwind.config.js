/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'paper': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 32%, rgba(0,0,0,0) 34%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0) 67%, rgba(0,0,0,0) 100%), url("/paper.png")'
      }
    },
  },
  plugins: [],
}
