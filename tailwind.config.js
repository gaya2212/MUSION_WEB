/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#1a0a3a',
        'bg-card': '#2d1b4e',
        'accent-cyan': '#00d9ff',
        'accent-magenta': '#ff1199',
        'text-primary': '#ffffff',
        'text-dim': '#c8b6db',
      },
      fontFamily: {
        body: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Helvetica Neue"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-musion': 'linear-gradient(135deg, #1a0a3a 0%, #2d1b4e 50%, #1a0a3a 100%)',
      },
    },
  },
  plugins: [],
};
