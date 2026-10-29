/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Montserrat', 'Segoe UI', 'system-ui', 'sans-serif'] },
      colors: {
        unec: {
          950: '#0a1f35',
          900: '#0d2944',
          800: '#113251',
          700: '#17436c',
          600: '#1f5a8f',
          500: '#2b70b3',
          400: '#5b93cc',
          200: '#c4d7ec',
          100: '#e4eef8',
          50: '#f3f7fc',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,41,68,.06), 0 4px 14px rgba(13,41,68,.06)',
        lift: '0 2px 4px rgba(13,41,68,.08), 0 12px 28px rgba(13,41,68,.10)',
      },
    },
  },
  plugins: [],
};
