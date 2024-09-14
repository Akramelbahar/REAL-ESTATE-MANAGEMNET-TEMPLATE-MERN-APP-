/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
    {
  "primary": "#2C3E50",
  "secondary": "#18BC9C",
  "accent": "#E74C3C",
  "neutral": "#0f1a06",
  "base-100": "#25222d",
  "info": "#00a2c6",
  "success": "#86cb00",
  "warning": "#b92f00",
  "error": "#ff7776"
}
      
    ]
  },
  plugins: [require('daisyui'),],
}
