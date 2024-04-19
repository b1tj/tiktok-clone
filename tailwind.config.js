import tailwindAnimated from 'tailwindcss-animated'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        primary: '#fe2c55',
        'primary-hover': '#fe2c5514',
        ghost: '#16182308',
        input: '#1618230f',
        'ghost-border': '#1618231f',
        'text-fade': '#161823bf',
        'text-fader': '#16182380',
        'gold-fade': '#fff5c9',
        text: '#161823',
        hashtag: '#2b5db9',
        divider: '#16182333',
        'snack-bar': '#545454eb',
      },
      animation: {
        'fade-jump-in': 'fade-jump-in 3s ease-out forwards',
        'fade-jump-out':
          'fade-jump-out 1s cubic-bezier(0.08, 0.82, 0.17, 1) forwards',
        clockwise: 'clockwise 1s infinite linear',
        'counter-clockwise': 'counter-clockwise 1s infinite linear',
      },
      keyframes: {
        'fade-jump-in': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0)', opacity: 0 },
        },
        'fade-jump-out': {
          '0%': { transform: 'scale(0.3)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        clockwise: {
          '0%': {
            transform: 'translateX(0)',
            width: '20px',
          },

          '25%': {
            width: '25px',
          },

          '50%': {
            transform: 'translateX(100%)',
            width: '20px',
          },
        },

        'counter-clockwise': {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(-100%)',
          },
        },
      },
    },
  },
  plugins: [tailwindAnimated],
}
