/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primary: '#3B82F6', // Define your primary color
        foreground: '#1F2937', // Define your foreground color
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

