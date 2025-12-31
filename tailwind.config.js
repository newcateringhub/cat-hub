// We remove the "import type..." line

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
      }
    },
  },
  plugins: [],
};
// We also remove the "satisfies Config" at the end