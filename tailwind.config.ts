import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-dark': '#0A0A0A',
                'brand-primary': '#FFD700',
                'brand-gray': '#1A1A1A',
            },
            fontFamily: {
                display: ['var(--font-display)', 'system-ui', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
            },
        },
    },
    plugins: [],
};

export default config;
