import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        phone: '480px',
        tablet: '770px',
        laptop: '1024px',
        desktop: '1280px',
        '3xl': '1600px',
      },
      fontFamily: {
        republica: ['var(--font-republica)', 'sans-serif'],
        comic: ['var(--font-comic)', 'sans-serif'],
        archivo: ['var(--font-archivo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
