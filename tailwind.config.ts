import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#061B33",
          900: "#082545",
          850: "#0B2C50",
          800: "#0E355D",
        },
        amber: {
          brand: "#F5A623",
          soft: "#FFE3A6",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Sora", "Inter", "ui-sans-serif"],
        price: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 12px 28px rgba(6, 27, 51, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
