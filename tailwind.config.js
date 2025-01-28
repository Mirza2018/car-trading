/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#FDFDFD ",
        "secondary-color": "#9BC1CD",
        "base-color": "#ADD8E6",
        "highlight-color": "#FF991C",
        "input-color": "##1E1E1E",
        "text-color": "#000000",
      },
    },
  },
  plugins: [],
};
