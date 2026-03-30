import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0c1510',
          800: '#111d13',
        },
        accent: '#4a2878',
        gold: {
          from: '#c9a84c',
          to: '#f0d080',
        },
        parchment: '#f5f0e8',
        muted: '#a89f8c',
      },
      fontFamily: {
        display: ['EB Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
}

export default config
