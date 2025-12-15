/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./dist/**/*.html"
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'fade-in-delay': 'fadeIn 0.8s ease-in 0.2s both',
        'fade-in-delay-2': 'fadeIn 1s ease-in 0.4s both',
        'fade-in-delay-3': 'fadeIn 1.2s ease-in 0.6s both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

