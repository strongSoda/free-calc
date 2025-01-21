import React from 'react';
import { getShades, getTints } from '../utils/colorUtils';

const ColorVariations = ({ color }) => {
  const tints = getTints(color);
  const shades = getShades(color);

  const variationTypes = [
    {
      type: "Tints",
      description: "Tints are created by adding white to a base color, making it lighter while maintaining its basic character. They're often used to create hierarchy and depth in design.",
      examples: [
        "Background variations in user interfaces",
        "Subtle hover states for buttons",
        "Layered card designs",
        "Progressive data visualization"
      ]
    },
    {
      type: "Shades",
      description: "Shades are created by adding black to a base color, creating darker variations. They help establish visual hierarchy and create depth in designs.",
      examples: [
        "Text and typography",
        "Shadows and depth effects",
        "Active states for interactive elements",
        "Data visualization gradients"
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Educational Introduction */}
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <h2 className="font-display text-2xl font-bold mb-4">Color Variations and Their Uses</h2>
        <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
          Understanding color variations is crucial for creating professional designs. Tints and shades 
          help create visual hierarchy, improve accessibility, and add depth to your designs while 
          maintaining color harmony.
        </p>
      </div>

      {/* Tints Section */}
      <div className="space-y-6">
        <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
          <h3 className="font-display text-xl font-semibold mb-4">Tints</h3>
          <p className="text-content-light-dimmed dark:text-content-dark-dimmed mb-6">
            {variationTypes[0].description}
          </p>
          <div className="grid grid-cols-5 gap-4">
            {tints.map((tint, index) => (
              <div key={index} className="text-center">
                <div className="text-[10px] md:text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  {tint}
                </div>
                <div 
                  className="h-16 rounded-lg mb-2 border border-gray-200/10 dark:border-gray-800/10"
                  style={{ backgroundColor: tint }}
                />
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  +{(index + 1) * 20}%
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="font-medium mb-2">Common Applications:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {variationTypes[0].examples.map((example, i) => (
                <li key={i} className="text-content-light-dimmed dark:text-content-dark-dimmed">
                  • {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Shades Section */}
      <div className="space-y-6">
        <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
          <h3 className="font-display text-xl font-semibold mb-4">Shades</h3>
          <p className="text-content-light-dimmed dark:text-content-dark-dimmed mb-6">
            {variationTypes[1].description}
          </p>
          <div className="grid grid-cols-5 gap-4">
            {shades.map((shade, index) => (
              <div key={index} className="text-center">
                <div className="text-[10px] md:text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  {shade}
                </div>
                <div 
                  className="h-16 rounded-lg mb-2 border border-gray-200/10 dark:border-gray-800/10"
                  style={{ backgroundColor: shade }}
                />
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  -{(index + 1) * 20}%
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="font-medium mb-2">Common Applications:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {variationTypes[1].examples.map((example, i) => (
                <li key={i} className="text-content-light-dimmed dark:text-content-dark-dimmed">
                  • {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

            {/* Original Color */}
      <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
        <h3 className="font-display text-xl font-semibold mb-4">Base Color</h3>
        <div className="text-center mb-4">
          <div 
            className="h-20 rounded-lg mb-2 border border-gray-200/10 dark:border-gray-800/10"
            style={{ backgroundColor: color }}
          />
          <div className="font-mono text-sm mb-4">{color}</div>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
            The base color serves as the foundation for creating tints and shades. When choosing a base color, 
            consider factors like brand identity, target audience, and the emotional response you want to evoke.
          </p>
        </div>
      </div>

      {/* Design Tips */}
      <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
        <h3 className="font-display text-xl font-semibold mb-4">Design Tips</h3>
        <ul className="space-y-3 text-content-light-dimmed dark:text-content-dark-dimmed">
          <li>• Use lighter tints for large background areas to maintain readability</li>
          <li>• Darker shades work well for text to ensure good contrast</li>
          <li>• Maintain consistent intervals between variations for professional results</li>
          <li>• Consider accessibility when using color variations for text and interactive elements</li>
          <li>• Test your color variations across different devices and lighting conditions</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorVariations;