/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
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
  			'light-outline-variant': '#E3DED1',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			headline: ['"Space Grotesk"', 'sans-serif'],
  			body: ['"Space Grotesk"', 'sans-serif'],
  			'mono-tech': ['"Space Grotesk"', 'sans-serif'],
  			sans: ['"Space Grotesk"', 'sans-serif'],
  			mono: ['"Space Grotesk"', 'monospace']
  		}
  	}
  },
  plugins: [],
}
