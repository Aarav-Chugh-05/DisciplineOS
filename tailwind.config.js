/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neutral surfaces / text
        base: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        // Aliases that read naturally with utilities
        'bg-base': 'var(--color-bg)',
        'bg-surface': 'var(--color-surface)',
        'text-primary': 'var(--color-text-primary)',
        'text-muted': 'var(--color-text-muted)',
        // Accent + tint
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          tint: 'var(--color-accent-tint)',
        },
      },
      borderColor: {
        default: 'var(--color-border)',
      },
      ringColor: {
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
