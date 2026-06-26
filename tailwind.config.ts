import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1a1a1a",
            a: {
              color: "#1a1a1a",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              "&:hover": { opacity: "0.7" },
            },
            "h1,h2,h3,h4": {
              fontWeight: "600",
              letterSpacing: "-0.02em",
            },
            code: {
              backgroundColor: "#f4f4f4",
              borderRadius: "0.25rem",
              padding: "0.1em 0.3em",
              fontWeight: "400",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
