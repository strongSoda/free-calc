// src/components/AffiliateSection.jsx
import { useState, useEffect } from 'react';
import AffiliateProduct from './AffiliateProduct';
import AdUnit from './AdUnit';

const affiliateProducts = [
  {
    id: 1,
    name: "Keychron V1 QMK Custom Mechanical Keyboard",
    description: "A versatile 75% layout wireless mechanical keyboard. Perfect for programming with Mac/Windows compatibility and exceptional build quality.",
    price: 79,
    originalPrice: 94,
    discount: 16,
    image: "https://www.keychron.com/cdn/shop/products/Keychron-V1-Custom-Mechanical-Keyboard-frosted-black-knob-K-Pro-red.jpg?v=1657878904",
    link: "https://www.keychron.com/products/keychron-v1-qmk-via-custom-mechanical-keyboard?ref=imtaewse&variant=40026442367065",
    tags: ["Mechanical", "Wireless", "RGB"]
  },
  {
    id: 2,
    name: "Screen Studio",
    description: "Beautiful Screen Recordings in Minutes. Screen Recorder producing high-impact videos automatically. Designed for macOS.",
    price: 229,
    originalPrice: 279,
    discount: 18,
    image: "https://screen.studio/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-transparent.681d19be.png&w=256&q=75",
    link: "https://screen.studio/@Xenr1",
    tags: ["macOS", "Recording", "Video"]
  }
];

export default function AffiliateSection() {
  const [randomProduct, setRandomProduct] = useState(affiliateProducts[0]); // Start with first product

  useEffect(() => {
    // Generate random product after component mounts
    const randomIndex = Math.floor(Math.random() * affiliateProducts.length);
    setRandomProduct(affiliateProducts[randomIndex]);
  }, []); // Empty dependency array means this runs once after mount

  return (
    <div className="my-16" 
      aria-label="Affiliate"
      data-nosnippet
      role="complementary"
    >
      <div className="space-y-6">        
        <AffiliateProduct key={randomProduct.id} product={randomProduct} />
      </div>

      {/* Square ad for mobile - before calculator */}
      <aside 
        className="xl:hidden my-8" 
        aria-label="Advertisement"
        data-nosnippet
        role="complementary"
      >
        <AdUnit type="horizontal" client:load />
      </aside>
    </div>
  );
}