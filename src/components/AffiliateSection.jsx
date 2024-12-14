// src/components/AffiliateSection.jsx
import AffiliateProduct from './AffiliateProduct';

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
  }
];

export default function AffiliateSection() {
  return (
    <div className="my-16">
      <h2 className="font-display text-2xl font-semibold text-surface-900 dark:text-surface-50 mb-8">
        Recommended Gear
      </h2>
      <div className="space-y-6">
        {affiliateProducts.map(product => (
          <AffiliateProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}