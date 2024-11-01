import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fonts: {
        clarendon: ["Clarendon", "serif"],
      },
      colors: {
        background: "var(--background)",
        backgroundAlt: "var(--background-alt)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {},
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;

/*
color: "var(--text)",
            a: {
              color: "#3182ce",
              "&:hover": {
                color: "#2c5282",
              },
            },
            h1: {
              color: "var(--text)",
            },
             */
