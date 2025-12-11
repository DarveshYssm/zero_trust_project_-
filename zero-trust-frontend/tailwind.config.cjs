module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#ff00ff",
          rose: "#ff1493",
        },
      },
      boxShadow: {
        neon: "0 0 20px rgba(255, 0, 255, 0.9)",
        neonSoft: "0 0 12px rgba(255, 0, 255, 0.6)",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px #ff00ff" },
          "50%": { boxShadow: "0 0 35px #ff1493" },
        },
      },
    },
  },
  plugins: [],
};
