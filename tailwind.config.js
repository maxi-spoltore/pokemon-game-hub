module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blink-custom': 'blink .5s alternate 7',
        'pokeball': 'fall .25s ease-in-out, shake 1.25s cubic-bezier(.36,.07,.19,.97) 3',
        'text-blink': 'textBlink 1.5s infinite'
      },
      keyframes: {
        textBlink: {
          '0%, 50%, 100%': { opacity: '.4' },
          '25%, 75%': { opacity: '1' }
        },
        blink: {
          '0%': { background: '#eee' },
          '100%': { background: '#e74c3c' }
        },
        fall: {
          '0%': { top: '-200px' },
          '60%': { top: '0' },
          '80%': { top: '-20px' },
          '100%': { top: '0' }
        },
        shake: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0)' },
          '20%': { transform: 'translate(-10px, 0) rotate(-20deg)' },
          '30%': { transform: 'translate(10px, 0) rotate(20deg)' },
          '50%': { transform: 'translate(-10px, 0) rotate(-10deg)' },
          '60%': { transform: 'translate(10px, 0) rotate(10deg)' }
        }
      }
    },
  },
  plugins: [],
}