/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--color-bg-primary, #0A0A0F)',
        'bg-card': 'var(--color-bg-card, #12121A)',
        'bg-elevated': 'var(--color-bg-elevated, #1A1A28)',
        accent: '#7C3AED',
        'accent-light': '#A78BFA',
        'text-primary': '#F0F0FF',
        'text-muted': '#6B6B8A',
        success: '#10B981',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
};
