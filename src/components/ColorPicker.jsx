import React, { useState, useEffect } from 'react';
import ChromePickerModule from 'react-color/lib/components/chrome/Chrome';
const ChromePicker = ChromePickerModule.default || ChromePickerModule;
import { Copy, Check, ChevronRight } from 'lucide-react';
import ColorContrast from './ColorContrast';
import ColorVariations from './ColorVariations';
import ColorHarmonies from './ColorHarmonies';
import { hexToRgb } from '../utils/colorUtils';
import ShareURL from './ShareURL';

const ColorPicker = ({ defaultColor = '#0ea5e9', share="", onChange }) => {
  const initialRgb = hexToRgb(defaultColor);

  const [colorState, setColorState] = useState({
    hex: defaultColor,
    rgb: { ...initialRgb, a: 1 }, // Assuming alpha = 1 for defaultColor
  });
  const [copiedState, setCopiedState] = useState({});
  const [swatchesVisible, setSwatchesVisible] = useState(false);

  const presetColors = [
    '#0ea5e9', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6',
    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
  ];

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const codeParam = params.get('code');
  
  // If URL has a color parameter, use it; otherwise use defaultColor
  const colorToUse = codeParam ? '#' + codeParam : defaultColor;
  const rgb = hexToRgb(colorToUse);
  
  if (rgb) {
    setColorState({
      hex: colorToUse,
      rgb: { ...rgb, a: 1 }
    });
  }
}, [defaultColor]); // Include defaultColor in dependencies


  useEffect(() => {
    if (onChange) onChange(colorState.hex);
  }, [colorState]);


  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState({ [key]: true });
      setTimeout(() => setCopiedState({ [key]: false }), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Convert hex to HSL
  const hexToHsl = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleColorChange = (newColor) => {          
    setColorState({
      hex: newColor.hex,
      rgb: newColor.rgb
    });
    
    // Update URL if we're not in a static environment
    if (typeof window !== 'undefined') {
      const newPath = `/calculators/color-picker?code=${newColor.hex.substring(1)}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, '', newPath);
      }
    }
  };

  const ColorBox = ({ label, value, copyKey }) => (
    <div className="flex items-center justify-between p-3 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
      <div>
        <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
          {label}
        </div>
        <div className="font-mono">{value}</div>
      </div>
      <button
        onClick={() => copyToClipboard(value, copyKey)}
        className="p-2 hover:bg-surface-light dark:hover:bg-surface-dark-hover rounded-full transition-colors"
      >
        {copiedState[copyKey] ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );

  // Create background pattern for transparency visualization
  const checkerboardStyle = {
    backgroundImage: 
      `linear-gradient(45deg, #808080 25%, transparent 25%),
      linear-gradient(-45deg, #808080 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #808080 75%),
      linear-gradient(-45deg, transparent 75%, #808080 75%)`
    ,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  };

  return (
    <div className="space-y-8">
      {/* Main Color Picker */}
      <ShareURL url={`https://rref-calculator.com/calculators/color-picker?code=${colorState.hex.substring(1)}`} />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-auto">
          <ChromePicker
            color={colorState.hex}
            alpha={colorState.rgb.a}
            onChange={handleColorChange}
            disableAlpha={false}
          />
        </div>
        

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorBox label="HEX" value={colorState.hex} copyKey="hex" />
            <ColorBox 
              label="RGBA" 
              value={`rgba(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b}, ${colorState.rgb.a})`}
              copyKey="rgba" 
            />
            {hexToHsl(colorState.hex) && (
              <ColorBox 
                label="HSLA" 
                value={`hsla(${hexToHsl(colorState.hex).h}, ${hexToHsl(colorState.hex).s}%, ${hexToHsl(colorState.hex).l}%, ${colorState.rgb.a})`}
                copyKey="hsla" 
              />
            )}
            <ColorBox 
              label="CSS Variable" 
              value={`var(--color-primary: ${colorState.hex})`}
              copyKey="css" 
            />
          </div>

          {/* Color Preview */}
          <div className="space-y-2">
            <div 
              className="h-24 rounded-lg relative"
              style={checkerboardStyle}
            >
              <div
                className="absolute inset-0 rounded-lg"
                style={{ 
                  backgroundColor: `rgba(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b}, ${colorState.rgb.a})`
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div 
                className="h-12 rounded-lg border border-gray-200/10 dark:border-gray-800/10"
                style={{ 
                  background: `linear-gradient(to right, rgba(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b}, 0), rgba(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b}, ${colorState.rgb.a}))`
                }}
              />
              <div 
                className="h-12 rounded-lg border border-gray-200/10 dark:border-gray-800/10"
                style={{ 
                  background: `linear-gradient(to right, rgba(${colorState.rgb.r}, ${colorState.rgb.g}, ${colorState.rgb.b}, ${colorState.rgb.a}), rgba(0, 0, 0, ${colorState.rgb.a}))`
                }}
              />
            </div>
          </div>
        </div>
      </div>      

      {/* Color Swatches */}
      <div>
        <button
          onClick={() => setSwatchesVisible(!swatchesVisible)}
          className="flex items-center gap-2 text-content-light-dimmed dark:text-content-dark-dimmed hover:text-content-light dark:hover:text-content-dark"
        >
          <ChevronRight 
            size={16}
            className={`transform transition-transform ${swatchesVisible ? 'rotate-90' : ''}`}
          />
          Preset Colors
        </button>
        
        {swatchesVisible && (
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mt-4">
            {presetColors.map((presetColor) => {
              const rgb = hexToRgb(presetColor);
              return (
                <button
                  key={presetColor}
                  onClick={() => handleColorChange({ 
                    hex: presetColor, 
                    rgb: { ...rgb, a: colorState.rgb.a }
                  })}
                  className="w-full aspect-square rounded-lg border border-gray-200/10 dark:border-gray-800/10 hover:scale-110 transition-transform"
                  style={{ backgroundColor: presetColor }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Components */}
      <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6">
        <h2 className="text-2xl font-display font-bold mb-6">Contrast Checker</h2>
        <ColorContrast initialColor={colorState.hex} />
      </div>

      <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6">
        <ColorVariations color={colorState.hex} />
      </div>

      <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6">
        <ColorHarmonies color={colorState.hex} />
      </div>
    </div>
  );
};

export default ColorPicker;