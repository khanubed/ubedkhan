/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'bg1': "url('./src/assets/transitionBlocks/bg1.jpg')",
        'bg2': "url('./src/assets/transitionBlocks/bg2.jpg')",
        'bg3': "url('./src/assets/transitionBlocks/bg3.jpg')",
        'bg4': "url('./src/assets/transitionBlocks/bg4.jpg')",
        'bg5': "url('./src/assets/transitionBlocks/bg5.jpg')",
        'bg6': "url('./src/assets/transitionBlocks/bg6.jpg')",
        'bg7': "url('./src/assets/transitionBlocks/bg7.jpg')",
        'bg8': "url('./src/assets/transitionBlocks/bg8.jpg')",
        'bg9': "url('./src/assets/transitionBlocks/bg9.jpg')",
        'bg10': "url('./src/assets/transitionBlocks/bg10.jpg')",
      },
      screens: {
      'phone': '480px',
      'tablet': '770px',
      'laptop': '1024px',
      'desktop': '1280px',
      '3xl': '1600px'
      }
    },
  },
  plugins: [],
}