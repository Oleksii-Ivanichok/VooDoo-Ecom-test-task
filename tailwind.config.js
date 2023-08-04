/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light-sand': '#FCF7E6',
        black: '#000000',
        white: '#FFFFFF',
        'light-black': '#1E1E1E',
      },
      fontFamily: {
        'font-main': ['Space Grotesk', 'sans-serif'],
        'font-action': ['Inter', 'sans-serif'],
        'font-secondary': ['Space Mono', 'monospace'],                
      },
      'width':{
        '1272px': '1272px',
        '101px': '101px',
      },
      'maxWidth':{
        '1272px': '1272px',
        '101px': '101px',
        'mobile-container': '342px',
      },
      'inset':{
        
      },
      screens:{
        'medium-s': '900px',
      }
    },
  },
  plugins: [],
}

