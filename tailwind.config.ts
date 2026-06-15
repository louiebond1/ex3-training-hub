import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cloud: '#E0E0E2',
        carbon: '#161617',
        'indigo-deep': '#1A0E36',
        'mid-gray': '#8C8C8E',
        scarlet: '#FF2E00',
        'violet-ex3': '#412288',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
