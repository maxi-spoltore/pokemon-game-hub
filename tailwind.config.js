module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      height: {
        'screen-vertical': 'calc(100vh - 64px)'
      },
      colors: {
        'counter-grey': '#2e2e2e'
      },
      animation: {
        'blink-custom': 'blink .5s alternate 7',
        'pokeball': 'fall .25s ease-in-out, shake 1.25s cubic-bezier(.36,.07,.19,.97) 3',
        'text-blink': 'textBlink 1.5s infinite',
        'letter': 'letterScale .2s ease-in-out',
        'letter-error': 'shake 1s cubic-bezier(.36,.07,.19,.97) infinite',
        'fade': 'fade 1s cubic-bezier(.36,.07,.19,.97) infinite',
        'bounce': 'bounce 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in': 'slideIn 0.5s both',
        'card-slide-in': 'slideIn 0.5s 0.2s both',
        'btn-slide-in': 'slideIn 0.5s 1.5s both',
        'typing-title': 'typing .5s 0.5s forwards',
        'tracking': 'tracking 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1.5s both',
        'slide-in-bottom-blur': 'slideInBottomBlur 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) 1s both',
        'slide-in-title': 'slideInBottomBlur 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) .2s both'
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
        },
        typing: {
          '0': { witdh: '0px' },
          '100%': { width: '100%' }
        },
        tracking: {
          '0%': {
            letterSpacing: '-0.5em',
            opacity: '0'
          },
          '40%': {
            opacity: '0.6'
          },
          '100%': {
            opacity: '1'
          }
        },
        slideInBottomBlur: {
          '0%': {
            transform: 'translateY(1000px) scaleY(2.5) scaleX(0.2)',
            transformOrigin: '50% 100%',
            filter: 'blur(40px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0) scaleY(1) scaleX(1)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: '1'
          }
        }
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))'
      },
      backgroundImage: {
        'safari': "url('/images/safari_zone.png')",
        'safari-texture': "url('/images/safari_texture.png')",
        'opening': "url('/images/pokemon-opening.webp')",
        'pokedex': "url('/images/pokedex.jpg')"
      }
    },
  },
  plugins: [],
}