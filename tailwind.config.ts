import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F2F1EC",
        card: "#FBFAF7",
        ink: "#26332E",
        "ink-soft": "#5C6B63",
        "ink-faint": "#8A968F",
        ledger: "#3E6B54",
        "ledger-deep": "#33593F",
        "ledger-soft": "#E4EBE6",
        brass: "#A8823F",
        line: "#DAD8CF",
        "line-soft": "#E8E6DE",
      },
      fontFamily: {
        serif: [
          "Iowan Old Style",
          "Palatino Linotype",
          "Palatino",
          "Georgia",
          "serif",
        ],
        sans: [
          "Seravek",
          "Avenir Next",
          "Segoe UI",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      maxWidth: {
        wrap: "1080px",
      },
      boxShadow: {
        hero: "0 28px 70px rgba(38,51,46,.22)",
        card: "0 16px 40px rgba(38,51,46,.14)",
        demo: "0 24px 60px rgba(38,51,46,.16)",
      },
    },
  },
  plugins: [],
};

export default config;
