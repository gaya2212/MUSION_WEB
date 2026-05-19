/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#05070d',
        'bg-card': '#0e1118',
        'accent-cyan': '#38b6cc',
        'accent-magenta': '#d4935a',
        'text-primary': '#ededf0',
        'text-dim': '#7a7a8c',
      },
      fontFamily: {
        display: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        body: ['"IBM Plex Sans"', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
      },
      backgroundImage: {
        'gradient-musion': 'linear-gradient(135deg, #1a0a3a 0%, #2d1b4e 50%, #1a0a3a 100%)',
      },
    },
  },
  plugins: [],
};
