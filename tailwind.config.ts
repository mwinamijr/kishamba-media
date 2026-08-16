import type { Config } from "tailwindcss";

// Single source of truth for brand colors — resolves the #FFCC00 vs #F37028
// conflict documented in frontend/README.md §2 and settled in ROADMAP.md §5.
// #F37028 (orange) is primary everywhere; #FFCC00 (yellow) is demoted to a
// narrow "breaking news" accent only.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F37028",
          50: "#FEF3EC",
          100: "#FCE3D0",
          200: "#F9C7A1",
          300: "#F6AB72",
          400: "#F48F4A",
          500: "#F37028", // brand primary
          600: "#D6551A",
          700: "#A84315",
          800: "#7A3110",
          900: "#4C1F0A",
        },
        secondary: {
          DEFAULT: "#31404B", // dark neutral, kept from the old App.css set — pairs well with orange
          50: "#EEF1F2",
          500: "#31404B",
          900: "#151B1F",
        },
        breaking: "#FFCC00", // demoted accent — Breaking News ticker only, nowhere else
        ink: "#1A1A1A",
        paper: "#FAFAF9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"], // headlines/body — a news-editorial serif pairing
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
