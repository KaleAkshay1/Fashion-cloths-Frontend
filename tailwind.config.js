// /** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
// export default withMT({
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
//     "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [],
// });

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};
