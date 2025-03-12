import type { Config } from "tailwindcss"
import { createPreset } from "fumadocs-ui/tailwind-plugin"

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      colors: {
        "bg-default": "var(--color-bg-default)",
        "bg-primary": "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        "bg-tertiary": "var(--color-bg-tertiary)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        "border-primary": "var(--color-border-primary)",
        "border-secondary": "var(--color-border-secondary)",
        "border-tertiary": "var(--color-border-tertiary)",
        "fill-primary": "var(--color-fill-primary)",
        "fill-secondary": "var(--color-fill-secondary)",
        "fill-tertiary": "var(--color-fill-tertiary)",
      },
      backgroundColor: {
        default: "var(--color-bg-default)",
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
      },
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        tertiary: "var(--color-text-tertiary)",
      },
      borderColor: {
        primary: "var(--color-border-primary)",
        secondary: "var(--color-border-secondary)",
        tertiary: "var(--color-border-tertiary)",
      },
      fill: {
        primary: "var(--color-fill-primary)",
        secondary: "var(--color-fill-secondary)",
        tertiary: "var(--color-fill-tertiary)",
      },
      fontFamily: {
        WorkSans: ["WorkSans", "sans-serif"],
        FiraMonoRegular: ["FiraMonoRegular", "sans-serif"],
        EuroStyle: ["EuroStyle", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        BrutalRegular: ["BrutalRegular", "Open Sans", "a"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        loader: "loader 1500ms infinite ease",
        "loader-inner": "loader-inner 1500ms infinite ease-in",
        wave: "wave-animation 1s",
        "wave-custom": "wave-animation-custom 0.5s",
        grid: "grid 15s linear infinite",
        spinLinear: "spinLinear 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        in: "in .6s both",
        fadeIn: "fadeIn 1s ease-in forwards",
        openMenu: "openmenu ease-in",
        closeMenu: "closemenu ease-in",
        tilt: "tilt 10s infinite linear",
        roll: "roll 5s infinite",
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(180deg)" },
          "50%": { transform: "rotate(180deg)" },
          "75%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "loader-inner": {
          "0%": { height: "0%" },
          "25%": { height: "0%" },
          "50%": { height: "100%" },
          "75%": { height: "100%" },
          "100%": { height: "0%" },
        },
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.5deg)",
          },
          "75%": {
            transform: "rotate(-0.5deg)",
          },
        },
        "wave-animation": {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14.0deg)" },
          "20%": { transform: "rotate(-8.0deg)" },
          "30%": { transform: "rotate(14.0deg)" },
          "40%": { transform: "rotate(-4.0deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        "wave-animation-custom": {
          "0%": { transform: "rotate(-6.0deg)" },
          "20%": { transform: "rotate(12.0deg)" },
          "40%": { transform: "rotate(-10.0deg)" },
          "60%": { transform: "rotate(6.0deg)" },
          "80%": { transform: "rotate(-8.0deg)" },
          "100%": { transform: "rotate(-6.0deg)" },
        },
        roll: {
          "0%": { transform: "rotateX(45deg) rotateY(-45deg)" },
          "25%": { transform: "rotateX(-45deg) rotateY(-45deg)" },
          "50%": { transform: "rotateX(45deg) rotateY(45deg)" },
          "75%": { transform: "rotateX(-45deg) rotateY(45deg)" },
          "100%": { transform: "rotateX(45deg) rotateY(-45deg)" },
        },
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        in: {
          "0%": {
            transform: "translateY(18px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        openmenu: {
          // initial position
          "0%": { height: "0px" },
          // final position
          "100%": { height: "100%" },
        },
        closemenu: {
          // initial position
          "0%": { height: "100%" },
          // final position
          "100%": { height: "0px" },
        },
        spinLinear: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated"), require("@tailwindcss/typography")],
  presets: [createPreset({ preset: "neutral" })],
} satisfies Config
