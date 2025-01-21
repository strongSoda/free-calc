import React from 'react';
import { getComplementary, getTriadic, getAnalogous, getMonochromatic } from '../utils/colorUtils';

const ColorSwatch = ({ color, label }) => (
  <div className="text-center">
    <div 
      className="h-20 rounded-lg mb-2 border border-gray-200/10 dark:border-gray-800/10"
      style={{ backgroundColor: color }}
    />
    <div className="font-mono text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
      {label || color}
    </div>
  </div>
);

const ColorHarmonies = ({ color }) => {
  const complementary = getComplementary(color);
  const triadic = getTriadic(color);
  const analogous = getAnalogous(color);
  const monochromatic = getMonochromatic(color);

  const harmonyGroups = [
    {
      title: 'Complementary Colors',
      description: 'High contrast, vibrant combinations',
      colors: [color, complementary],
      explanation: 'Complementary colors are directly opposite each other on the color wheel. They create a strong, vibrant contrast that\'s perfect for creating visual impact and drawing attention to key elements. Common applications include call-to-action buttons, logos, and sports team branding.',
      bestUses: ['Highlighting important elements', 'Creating visual tension', 'Sports and entertainment branding', 'Call-to-action buttons']
    },
    {
      title: 'Triadic Harmony',
      description: 'Three colors evenly spaced on the color wheel',
      colors: triadic,
      explanation: "Triadic color schemes use three colors equally spaced around the color wheel. This arrangement creates a balanced and vibrant look while offering more variety than complementary schemes. It's popular in web design and children's branding.",
      bestUses: ['Web design', 'Children\'s products', 'Educational materials', 'Creative and artistic projects']
    },
    {
      title: 'Analogous Colors',
      description: 'Adjacent colors that flow naturally',
      colors: analogous,
      explanation: 'Analogous colors sit next to each other on the color wheel, creating a smooth, cohesive look. This harmony is found abundantly in nature and creates a serene, comfortable feeling. Perfect for designs that need to feel unified and peaceful.',
      bestUses: ['Nature-themed designs', 'Professional websites', 'Healthcare branding', 'Relaxing environments']
    },
    {
      title: 'Monochromatic Scheme',
      description: 'Variations of a single color',
      colors: [color, ...monochromatic],
      explanation: "Monochromatic color schemes use different tones, shades, and tints of a single color. This creates a sophisticated, cohesive look that's easy on the eyes. It's excellent for creating depth while maintaining simplicity.",
      bestUses: ['Minimalist design', 'Corporate branding', 'User interfaces', 'Professional presentations']
    }
  ];

  return (
    <div className="space-y-12">
      {/* Educational Introduction */}
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <h2 className="font-display text-2xl font-bold mb-4">Understanding Color Harmonies</h2>
        <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
          Color harmonies are systematic ways to combine colors that create pleasing visual experiences. 
          These scientifically-based combinations help designers create balanced, professional-looking color schemes 
          that work across different applications and contexts.
        </p>
      </div>

      {/* Color Harmony Groups */}
      {harmonyGroups.map((group, index) => (
        <div key={index} className="space-y-6">
          <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
            <h3 className="font-display text-xl font-semibold mb-2">{group.title}</h3>
            <p className="text-content-light-dimmed dark:text-content-dark-dimmed mb-4">
              {group.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {group.colors.map((color, i) => (
                <ColorSwatch key={i} color={color} />
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
                {group.explanation}
              </p>
              <div>
                <h4 className="font-medium mb-2">Best Uses:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {group.bestUses.map((use, i) => (
                    <li key={i} className="text-content-light-dimmed dark:text-content-dark-dimmed">
                      • {use}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Additional Resources */}
      <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
        <h3 className="font-display text-xl font-semibold mb-4">Tips for Using Color Harmonies</h3>
        <ul className="space-y-3 text-content-light-dimmed dark:text-content-dark-dimmed">
          <li>• Use the 60-30-10 rule: primary color 60%, secondary 30%, accent 10%</li>
          <li>• Consider your target audience and industry standards</li>
          <li>• Test your color combinations for accessibility and contrast</li>
          <li>• Remember that cultural associations with colors can vary</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorHarmonies;