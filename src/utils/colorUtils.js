// src/utils/colorUtils.js

// Convert hex to RGB
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Convert RGB to HSL
export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
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

// Convert HSL to RGB
export const hslToRgb = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

// Convert RGB to Hex
export const rgbToHex = (r, g, b) => {
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
};

// Generate complementary color
export const getComplementary = (hex) => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.h = (hsl.h + 180) % 360;
  const complementRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(complementRgb.r, complementRgb.g, complementRgb.b);
};

// Generate triadic colors
export const getTriadic = (hex) => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [
    hex,
    rgbToHex(...Object.values(hslToRgb((hsl.h + 120) % 360, hsl.s, hsl.l))),
    rgbToHex(...Object.values(hslToRgb((hsl.h + 240) % 360, hsl.s, hsl.l)))
  ];
};

// Generate analogous colors
export const getAnalogous = (hex) => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [
    rgbToHex(...Object.values(hslToRgb((hsl.h - 30 + 360) % 360, hsl.s, hsl.l))),
    hex,
    rgbToHex(...Object.values(hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l)))
  ];
};

// Generate monochromatic colors
export const getMonochromatic = (hex) => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [40, 60, 80].map(l => 
    rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, l)))
  );
};

// Generate tints (lighter variations)
export const getTints = (hex, count = 5) => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return Array.from({ length: count }, (_, i) => {
    const l = Math.min(100, hsl.l + ((100 - hsl.l) * (i + 1) / count));
    return rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, l)));
  });
};

// Generate shades (darker variations)
export const getShades = (hex, count = 5) => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return Array.from({ length: count }, (_, i) => {
    const l = Math.max(0, hsl.l * (1 - (i + 1) / count));
    return rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, l)));
  });
};

// Helper functions for hex-alpha conversion
export const rgbaToHex8 = (r, g, b, a) => {
  const toHex = (value) => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const alphaHex = Math.round(a * 255);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alphaHex)}`;
};

export const hex8ToRgba = (hex8) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex8);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: parseInt(result[4], 16) / 255
  } : null;
};