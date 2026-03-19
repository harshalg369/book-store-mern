/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-bg': '#0b0b0b',
        'netflix-surface': '#111111',
        'netflix-red': '#E50914',
        'netflix-teal': '#1DBF7E',
        'netflix-text-primary': '#FFFFFF',
        'netflix-text-secondary': '#cfcfcf',
      },
      backgroundImage: {
        'netflix-gradient': 'linear-gradient(180deg, #0b0b0b 0%, #0f0f0f 60%)',
      },
      boxShadow: {
        'netflix-glow': '0 8px 30px rgba(229, 9, 20, 0.12)',
      },
    },
  },
  plugins: [],
}

