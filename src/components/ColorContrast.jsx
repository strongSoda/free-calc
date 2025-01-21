import React, { useState, useEffect } from 'react';
import ChromePickerModule from 'react-color/lib/components/chrome/Chrome';
const ChromePicker = ChromePickerModule.default || ChromePickerModule;

const ColorContrast = ({ initialColor = '#FFFFFF' }) => {
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState(initialColor);
  const [activeColorPicker, setActiveColorPicker] = useState(null);

  // Calculate relative luminance
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const getContrastRatio = (color1, color2) => {
    const lum1 = getLuminance(color1.r, color1.g, color1.b);
    const lum2 = getLuminance(color2.r, color2.g, color2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const getWCAGLevel = (ratio) => {
    if (ratio >= 7) return { level: 'AAA', description: 'Excellent' };
    if (ratio >= 4.5) return { level: 'AA', description: 'Good' };
    if (ratio >= 3) return { level: 'AA Large', description: 'Large Text Only' };
    return { level: 'Fail', description: 'Poor Contrast' };
  };

  const handleColorChange = (color, type) => {
    if (type === 'foreground') setForegroundColor(color.hex);
    else setBackgroundColor(color.hex);
  };

  const ratio = getContrastRatio(
    hexToRgb(foregroundColor),
    hexToRgb(backgroundColor)
  );

  const wcagResult = getWCAGLevel(ratio);

  // Helper function to convert hex to RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  useEffect(() => {
    setBackgroundColor(initialColor)
  }, [initialColor])

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Color Pickers */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <div 
              className="h-12 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 relative"
              style={{ backgroundColor: foregroundColor }}
              onClick={() => setActiveColorPicker('foreground')}
            />
            {activeColorPicker === 'foreground' && (
              <div className="absolute z-10 mt-2">
                <div 
                  className="fixed inset-0"
                  onClick={() => setActiveColorPicker(null)}
                />
                <ChromePicker
                  color={foregroundColor}
                  onChange={(color) => handleColorChange(color, 'foreground')}
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <div 
              className="h-12 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 relative"
              style={{ backgroundColor }}
              onClick={() => setActiveColorPicker('background')}
            />
            {activeColorPicker === 'background' && (
              <div className="absolute z-10 mt-2">
                <div 
                  className="fixed inset-0" 
                  onClick={() => setActiveColorPicker(null)}
                />
                <ChromePicker
                  color={backgroundColor}
                  onChange={(color) => handleColorChange(color, 'background')}
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1">
          <div 
            className="rounded-lg p-6 h-full"
            style={{ backgroundColor }}
          >
            <div style={{ color: foregroundColor }}>
              <p className="text-4xl font-bold mb-4">Large Text</p>
              <p className="text-base mb-2">Normal paragraph text</p>
              <p className="text-sm">Small text for testing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
          <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-1">
            Contrast Ratio
          </div>
          <div className="text-2xl font-bold">{ratio.toFixed(2)}:1</div>
        </div>
        <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
          <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-1">
            WCAG Level
          </div>
          <div className="text-2xl font-bold">{wcagResult.level}</div>
        </div>
        <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
          <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-1">
            Rating
          </div>
          <div className="text-2xl font-bold">{wcagResult.description}</div>
        </div>
      </div>

      {/* WCAG Guidelines */}
      <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
        <h3 className="font-bold mb-2">WCAG 2.1 Guidelines</h3>
        <div className="space-y-2 text-sm">
          <p>• Level AAA: 7:1 or higher - Best for all text</p>
          <p>• Level AA: 4.5:1 or higher - Good for normal text</p>
          <p>• Level AA Large: 3:1 or higher - Acceptable for large text</p>
        </div>
      </div>
    </div>
  );
};

export default ColorContrast;