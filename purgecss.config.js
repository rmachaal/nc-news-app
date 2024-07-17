module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  css: ["./src/**/*.css"],
  safelist: {
    standard: ["html", "body", "a", "img", "h1", "h2", "h3", "h4", "h5", "h6"],
  },
  output: "./src/purged.css", 
  rejected: true, 
};
