/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_violet: '#6f4083', // Custom color added to the color palette
      },
      fontFamily: {
        'nunito-sans': ['Nunito Sans', 'sans-serif'],  // Adding a fallback font
        'open-sans': ['Open Sans', 'sans-serif'],
        'nova-mono': ['Nova Mono', 'monospace'],       // Adding a fallback for monospace fonts
      },
    },
  },
  plugins: [],
}
