// src/components/AffiliateProduct.jsx
import { ShoppingBag, ArrowRight, Percent } from 'lucide-react';

export default function AffiliateProduct({ product }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-surface-dark dark:to-surface-dark-hover rounded-2xl border border-primary-200 dark:border-surface-dark shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 pt-14 md:pt-6"> {/* Added pt-14 for mobile */}
        {/* Discount Badge - Repositioned for mobile */}
        {product.discount && (
          <div className="absolute top-4 left-4 md:left-auto md:right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">            
            {product.discount}<Percent size={14} /> OFF
          </div>
        )}

        {/* Product Image */}
        <div className="w-full md:w-1/3 aspect-square relative rounded-xl overflow-hidden bg-white dark:bg-surface-800">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4 w-full"> {/* Added w-full for mobile */}
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags?.map(tag => (
              <span key={tag} className="px-2 py-1 bg-primary-200/50 dark:bg-primary-700/50 rounded-full text-xs font-medium text-primary-700 dark:text-primary-300">
                {tag}
              </span>
            ))}
          </div>

          {/* Title and Description */}
          <div>
            <h3 className="text-xl font-display font-semibold text-primary-900 dark:text-primary-50">
              {product.name}
            </h3>
            <p className="mt-2 text-surface-600 dark:text-surface-300">
              {product.description}
            </p>
          </div>

          {/* Price and CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between pt-4">
            <div className="flex items-baseline">
              {product.originalPrice && (
                <span className="text-surface-500 dark:text-surface-400 line-through mr-2">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-2xl font-display font-bold text-primary-900 dark:text-primary-50">
                ${product.price}
              </span>
            </div>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-secondary hover:bg-brand-700 text-white rounded-lg font-medium transition-all hover:gap-3 w-full sm:w-auto"
            >
              <ShoppingBag size={18} />
                Learn More
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}