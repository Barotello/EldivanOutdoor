/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1B3B2B',
        'forest-dark': '#14201A',
        sand: '#F5F2EA',
        'sand-light': '#FBF9F4',
        'sand-dark': '#EFECE2',
        accent: '#C25E2E',
        'accent-hover': '#D96B36',
        ink: '#1B1B18',
        'ink-muted': '#4A483E',
        muted: '#7A7566',
        'light-outline-variant': '#E3DED1'
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', '"Space Grotesk"', 'sans-serif'],
        'mono-tech': ['"Space Grotesk"', '"JetBrains Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
