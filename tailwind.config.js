/** @type {import('tailwindcss').Config} */
module.exports = {
  // Without this Tailwind will generate almost no utilities and you'll see the
  // warning: "The `content` option ... is missing or empty".
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        blob: 'blob 7s infinite',
        shimmer: 'shimmer 2s linear infinite',
        'loading-bar': 'loading-bar 1.5s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'loading-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animationDelay: {
        2000: '2000ms',
        4000: '4000ms',
      },
    },
  },
  plugins: [],
}
