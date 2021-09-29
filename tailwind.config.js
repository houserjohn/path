module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { transform: 'scale(0)', rounded: "rounded-none" },
          '100%': { transform: 'scale(1.0)', rounded: "rounded-full" },
        }
      },
      animation: {
        appear: 'appear 2s ease-out infinite'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
