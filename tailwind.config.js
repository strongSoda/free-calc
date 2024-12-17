/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      colors: {
        // Light theme
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        // Custom background colors
        surface: {
          light: '#ffffff',
          'light-hover': '#f8fafc',
          dark: '#0f172a',
          'dark-hover': '#1e293b',
        },
        // Text colors
        content: {
          light: '#1e293b',
          'light-dimmed': '#64748b',
          dark: '#f8fafc',
          'dark-dimmed': '#94a3b8',
        },
        // Accent colors for both themes
        accent: {
          primary: '#0ea5e9',
          secondary: '#8b5cf6',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.content.light'),
            'h1, h2, h3, h4': {
              color: theme('colors.content.light'),
            },
            'ul > li': {
              color: theme('colors.content.light'),
            },
            'a': {
              color: theme('colors.accent.primary'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.content.dark'),
            'h1, h2, h3, h4': {
              color: theme('colors.content.dark'),
            },
            'ul > li': {
              color: theme('colors.content.dark'),
            },
            'a': {
              color: theme('colors.accent.primary'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}