import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { isLive } from './src/data/liveRoutes.js';

// Languages whose homepage is a translated duplicate of "/" — they are
// noindexed, so they must not be advertised in the sitemap either.
const TRANSLATED_HOME = /^https:\/\/rref-calculator\.com\/[a-z]{2}\/$/;

// Deletes every built page that src/data/liveRoutes.js does not publish,
// along with its Open Graph card. The source pages are left untouched.
const pruneUnpublished = () => ({
  name: 'prune-unpublished',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const root = fileURLToPath(dir);
      let removed = 0;

      const walk = (folder) => {
        for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
          const full = path.join(folder, entry.name);
          if (entry.isDirectory()) {
            walk(full);
            if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
            continue;
          }
          const rel = '/' + path.relative(root, full).split(path.sep).join('/');
          // /og/calculators/rref/3x3.png is the card for /calculators/rref/3x3/
          const route = rel.endsWith('.html')
            ? rel
            : rel.startsWith('/og/') && rel.endsWith('.png')
              ? rel.slice(3, -4) || '/'
              : null;
          if (route && !isLive(route)) {
            fs.rmSync(full);
            removed++;
          }
        }
      };

      walk(root);
      logger.info(`Removed ${removed} unpublished pages and images from ${root}`);
    },
  },
});

export default defineConfig({
  site: 'https://rref-calculator.com',
  integrations: [react(), tailwind(),
    sitemap({
      // The mortgage calculator used to inject ?homePrice=… URLs here. Those
      // are parameter duplicates of a single page and were removed.
      filter: (page) =>
        isLive(new URL(page).pathname) &&
        !TRANSLATED_HOME.test(page) && !page.includes("?") && !page.includes("/404"),
    }),
    pruneUnpublished(),
  ],
  build: {
    assets: 'assets' // This will put assets in /calculators/assets instead of /_astro
  }
});
