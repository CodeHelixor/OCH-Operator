/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        bottom: "0 4px 6px -1px rgba(0, 0, 0, 0.2)",
        top: "0 -4px 6px -1px rgba(0, 0, 0, 0.2)",
        left: "-4px 0 6px -1px rgba(0, 0, 0, 0.2)",
        right: "4px 0 6px -1px rgba(0, 0, 0, 0.2)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "button-hover": "0 4px 12px -2px rgba(79, 70, 229, 0.25), 0 2px 6px -2px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
      },
      colors: {
        buttonColor: "rgb(13,106,165)",
        primary: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          light: "#818cf8",
        },
        surface: {
          DEFAULT: "#f8fafc",
          card: "#ffffff",
        },
        danger: {
          DEFAULT: "#dc2626",
          hover: "#b91c1c",
        },
      },
      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0.32, 0.72, 0, 1)",
        "smooth-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        "gentle": "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      keyframes: {
        "modal-backdrop-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "modal-backdrop-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "modal-content-in": {
          "0%": { opacity: "0", transform: "scale(0.97) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "modal-content-out": {
          "0%": { opacity: "1", transform: "scale(1) translateY(0)" },
          "100%": { opacity: "0", transform: "scale(0.97) translateY(8px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "modal-backdrop-in": "modal-backdrop-in 0.28s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "modal-backdrop-out": "modal-backdrop-out 0.24s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "modal-content-in": "modal-content-in 0.32s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "modal-content-out": "modal-content-out 0.24s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in": "fade-in 0.4s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards",
      },
      transitionDuration: {
        150: "150ms",
        200: "200ms",
        220: "220ms",
        280: "280ms",
        320: "320ms",
      },
    },
  },
  plugins: [],
};
