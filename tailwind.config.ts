import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Screenshot exact colors
        brand: {
          purple: "#5244E3", // Outer wrapper background and donut chart
          orange: "#FE6B52", // Total sales bar chart
          green:  "#21B76B", // Green text
          dark:   "#0A1128", // Text color
          gray: {
            50: "#F4F7FB", // Main app wrapper background
            100: "#E2E8F0", // Borders
            200: "#CBD5E1",
            400: "#94A3B8",
            500: "#64748B",
            800: "#1E293B",
          }
        },
        dark: "#12141D",
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body:    ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "ai-card": "linear-gradient(135deg, #101625 0%, #1a2235 100%)",
      },
      boxShadow: {
        "soft": "0px 10px 40px -10px rgba(0,0,0,0.05)",
        "card": "0px 2px 12px rgba(0,0,0,0.03)",
        "button": "0px 4px 12px rgba(82,68,227,0.3)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
