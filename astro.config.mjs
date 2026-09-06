import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Languages whose homepage is a translated duplicate of "/" — they are
// noindexed, so they must not be advertised in the sitemap either.
const TRANSLATED_HOME = /^https:\/\/rref-calculator\.com\/[a-z]{2}\/$/;

export default defineConfig({
  site: 'https://rref-calculator.com',
  integrations: [react(), tailwind(), 
    sitemap({
      // The mortgage calculator used to inject ?homePrice=… URLs here. Those
      // are parameter duplicates of a single page and were removed.
      filter: (page) => !TRANSLATED_HOME.test(page) && !page.includes("?") && !page.includes("/404"),
    })
  ],  
  build: {
    assets: 'assets' // This will put assets in /calculators/assets instead of /_astro
  }
});
