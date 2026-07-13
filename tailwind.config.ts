import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bone:        '#F7F4EE',
        'bone-alt':  '#FAF8F3',
        ink:         '#1B2536',
        navy:        '#16233B',
        sand:        '#E4D8C4',
        teal:        '#5E7F84',
      },
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:     ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.20em',
      },
      animation: {
        'wave':      'wave-oscillate 4s ease-in-out infinite',
        'ken-burns': 'ken-burns 22s ease-out forwards',
        'fade-up':   'fade-up 0.7s ease-out forwards',
      },
      keyframes: {
        'wave-oscillate': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-5px)' },
        },
        'ken-burns': {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
