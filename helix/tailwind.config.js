/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'domaine': ['"Domaine Sans"', 'serif'],      // ✅ Quotes for space + correct name
        'druk': ['"Druk Wide"', 'sans-serif'],       // ✅ Updated to match your font file
        'italy': ['Italy', 'serif'],                 // ✅ Matches Italy.ttf
        'calibri': ['Calibri', 'sans-serif'],
      },
      colors: {
        'dark-blue': {
          950: '#0a0e27',
          900: '#0f1538',
          800: '#141b4a',
          700: '#1a235c',
          600: '#1f2a6e',
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0a0e27 0%, #1a235c 50%, #0f1538 100%)',
        'gradient-animated': 'linear-gradient(45deg, #0a0e27, #1f2a6e, #141b4a, #0f1538)',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
}
