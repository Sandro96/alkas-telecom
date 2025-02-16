/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2e4053", 
        accent: "#00FF99",   
        contrast: "#FF3300", 
      },
      fontFamily: {
        sans: ["Gilroy", "sans-serif"],
      },
      width: {
        container: "1280px",
        "container-md": "750px",
        "container-sm": "360px",
      },
      fontSize: {
        h1: ["35px", { fontWeight: "normal" }],
        h2: ["32px", { fontWeight: "normal" }],
        h3: ["24px", { fontWeight: "normal" }],
        h4: ["20px", { fontWeight: "normal" }],
        h5: ["14px", { fontWeight: "normal", color: "#00FF99" }],
        h6: ["12px", { fontWeight: "normal" }],
        p: ["15px", { fontWeight: "normal" }],
      },
      backgroundImage: {
        'banner-pc': "url('src/assets/jpg/banner-pc.jpg')",
        'banner-tablet': "url('src/assets/jpg/banner-tablet.jpg')",
        'banner-cel': "url('src/assets/jpg/banner-cel.jpg')",
      },
    },
  },
  plugins: [],
};

