/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },

        paper: "#FAFAF9",
        ink: "#0F172A",
        "ink-soft": "#1E293B",

        fresh: "#22C55E",
        soon: "#F59E0B",
        expired: "#EF4444",

        "fresh-light": "#DCFCE7",
        "soon-light": "#FEF3C7",
        "expired-light": "#FEE2E2",
      },

      fontFamily: {
        display: ["Poppins", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },

      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.08)",
        "card-dark": "0 8px 30px rgba(0,0,0,0.35)",
      },

      animation: {
        "pulse-ring": "pulseRing 2s infinite",
      },

      keyframes: {
        pulseRing: {
          "0%": {
            transform: "scale(.8)",
            opacity: ".8",
          },
          "70%": {
            transform: "scale(2)",
            opacity: "0",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },

  plugins: [],
};