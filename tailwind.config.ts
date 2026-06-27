import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // San Francisco on Apple devices via the system stack; native
        // fallbacks (Segoe UI / Roboto) elsewhere.
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          "system-ui",
          '"Segoe UI"',
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          '"SF Mono"',
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              "&:hover": { opacity: "0.7" },
            },
            "h1,h2,h3,h4": {
              fontWeight: "600",
              letterSpacing: "-0.02em",
            },
            code: {
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
