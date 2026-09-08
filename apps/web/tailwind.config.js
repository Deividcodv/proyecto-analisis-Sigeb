/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SIGEB Brand Colors
        sigeb: {
          blue: '#0057B8',
          'blue-dark': '#003B73',
          light: '#4DA3D9',
          white: '#FFFFFF',
          gray: '#F4F7FA',
          gold: '#D4A72C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
