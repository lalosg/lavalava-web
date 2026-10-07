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
        // Text-only teals. The brand teal (#5E7F84) is 3.95:1 on bone and 3.62:1 on
        // navy — both below the 4.5:1 WCAG AA floor for normal text. These two are the
        // same hue and saturation at different lightness, used ONLY for small text.
        // Borders, icons and fills keep the brand teal unchanged.
        'teal-deep': '#557478',   // 4.60:1 on bone      — text on light surfaces
        'teal-soft': '#799AA0',   // 5.19:1 on navy      — text on navy surfaces
      },
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:     ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.20em',
      },
      animation: {
        'ken-burns': 'ken-burns 22s ease-out forwards',
        'fade-up':   'fade-up 0.7s ease-out forwards',
      },
      keyframes: {
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
