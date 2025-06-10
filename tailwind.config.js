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
        primary: {
          DEFAULT: '#FF6B00', // Orange
          dark: '#E65C00',
          light: '#FF8533',
        },
        secondary: {
          DEFAULT: '#0066CC', // Blue
          dark: '#0052A3',
          light: '#3385D6',
        },
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'sans-serif'],
        'iran-sans': ['Iran Sans', 'sans-serif'],
        'iran-sans-dastnevis': ['Iran Sans Dastnevis', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 