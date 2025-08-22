import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // Machine_Touched Laboratory Colors
        "barn-wood": "var(--barn-wood)",
        "barn-light": "var(--barn-light)",
        "mystic-amber": "var(--mystic-amber)",
        "mystic-gold": "var(--mystic-gold)",
        "forest-dark": "var(--forest-dark)",
        "forest-med": "var(--forest-med)",
        "forest-light": "var(--forest-light)",
        "digital-blue": "var(--digital-blue)",
        "digital-light": "var(--digital-light)",
        "cream": "var(--cream)",
        "cream-light": "var(--cream-light)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        mystical: ["Cinzel", "serif"],
        code: ["Source Code Pro", "monospace"],
      },
      zIndex: {
        barn: "1000000000",
        nursery: "2000000000",
        specimen: "3000000000",
        louse: "4000000000",
        spell: "5000000000",
        auth: "6000000000",
        crumbs: "7000000000",
        romance: "8000000000",
        whisper: "9000000000",
        divine: "9999999999",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "louse-crawl": {
          "0%": { transform: "translateX(-100px) translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateX(200px) translateY(-50px) rotate(90deg)" },
          "50%": { transform: "translateX(400px) translateY(20px) rotate(180deg)" },
          "75%": { transform: "translateX(600px) translateY(-30px) rotate(270deg)" },
          "100%": { transform: "translateX(800px) translateY(10px) rotate(360deg)" },
        },
        "binary-trace": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.5)" },
        },
        "spell-shimmer": {
          "0%, 100%": { textShadow: "0 0 5px rgba(255, 215, 0, 0.5)" },
          "50%": { textShadow: "0 0 15px rgba(255, 215, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "louse-crawl": "louse-crawl 15s infinite linear",
        "binary-trace": "binary-trace 2s ease-out forwards",
        "spell-shimmer": "spell-shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
