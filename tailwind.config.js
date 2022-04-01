module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'blink-custom': 'blink .5s alternate 7',
        'pokeball': 'fall .25s ease-in-out, shake 1.25s cubic-bezier(.36,.07,.19,.97) 3',
        'text-blink': 'textBlink 1.5s infinite',
        'letter': 'letterScale .2s ease-in-out',
        'letter-error': 'shake 1s cubic-bezier(.36,.07,.19,.97) infinite',
        'fade': 'fade 1s cubic-bezier(.36,.07,.19,.97) infinite',
        'bounce': 'bounce 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in': 'slideIn 0.5s both',
        'btn-slide-in': 'slideIn 0.5s 1.5s both',
      },
      keyframes: {
        textBlink: {
          '0%, 50%, 100%': { opacity: '.4' },
          '25%, 75%': { opacity: '1' }
        },
        letterScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' }
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
        },
        fade: {
          '0%, 25%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        bounce: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateY(200px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))'
      },
      backgroundImage: {
        'safari': "url('/images/safari_zone.png')",
        'safari-texture': "url('/images/safari_texture.png')"
      }
    },
  },
  plugins: [],
}