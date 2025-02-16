import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Generate home prices programmatically
const generateHomePrices = () => {
  const prices = [];
  
  // $200k to $500k in $50k increments
  for (let price = 200000; price <= 500000; price += 50000) {
    prices.push(price);
  }
  
  // $500k to $1M in $100k increments
  for (let price = 500000; price <= 1000000; price += 100000) {
    if (!prices.includes(price)) { // Avoid duplicating $500k
      prices.push(price);
    }
  }
  
  // $1M to $2M in $250k increments
  for (let price = 1000000; price <= 2000000; price += 250000) {
    if (!prices.includes(price)) { // Avoid duplicating $1M
      prices.push(price);
    }
  }
  
  return prices;
};

const homePrices = generateHomePrices();

// Generate additional URLs for sitemap (as simple strings)
const additionalPages = homePrices.map(price => 
  `https://rref-calculator.com/calculators/mortgage/?homePrice=${price}`
);

export default defineConfig({
  site: 'https://rref-calculator.com',
  integrations: [react(), tailwind(), 
    sitemap({
      customPages: additionalPages
    })
  ],  
  build: {
    inlineStylesheets: 'auto',  // Keep this for critical CSS
    assets: 'assets'            // Keep custom asset directory
  },
  vite: {
    build: {
      cssMinify: true,          // Keep CSS minification
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'chart-vendor': ['recharts'],
            'ui-vendor': ['lucide-react']
          }
        }
      }
    },
    // Add optimization settings here
    optimizeDeps: {
      include: ['react', 'react-dom', 'recharts', 'lucide-react']
    }
  },
  compressHTML: true
});
