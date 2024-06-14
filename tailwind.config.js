/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(245,197,24)",
        secondary: "#5799ef",
        lightblack: "rgb(31, 31, 31)",
        extralightblack: "rgb(52, 52, 52)",
        tealgrey: "#e0f2f1",
        backdropcolor: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        orbitron: `"Orbitron", sans-serif`,
      },
      fontSize: {
        70: "70%",
        80: "80%",
        90: "90%",
        100: "100%",
        110: "110%",
        120: "120%",
        130: "130%",
      },
      aspectRatio: {
        "2/3": "2 / 3",
        "4/3": "4 / 3",
      },
      screens: {
        xxs: "300px",
        xs: "500px",
      },
      gridTemplateColumns: {
        "grid-cols-2-fixed": "500px 1fr",
      },
      keyframes: {
        movein: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        moveout: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        movein: "movein 0.3s linear forwards",
        moveout: "moveout 0.3s linear forwards",
      },
    },
  },

  plugins: [],
};
