import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  // base: '/calculators', // This makes all assets load from /calculators path
  // outDir: './dist/calculators', // Output to a calculators subdirectory
  build: {
    assets: 'assets' // This will put assets in /calculators/assets instead of /_astro
  }
});