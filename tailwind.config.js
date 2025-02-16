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
        "base-color": "#E6F3F7",
        "highlight-color": "#FF991C",
        "highlight-light-color": "#FFF5ED",
        "text-color": "#000000",
        "text-light-color": "#667085",
      },
    },
  },
  plugins: [],
};
