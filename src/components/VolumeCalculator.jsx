// src/components/VolumeCalculator.jsx
import React, { useState, useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const units = {
  metric: [
    { value: 'm³', label: 'Cubic Meters (m³)', toM3: 1, fromM3: 1 },
    { value: 'cm³', label: 'Cubic Centimeters (cm³)', toM3: 0.000001, fromM3: 1000000 },
    { value: 'mm³', label: 'Cubic Millimeters (mm³)', toM3: 1e-9, fromM3: 1000000000 },
    { value: 'L', label: 'Liters (L)', toM3: 0.001, fromM3: 1000 },
    { value: 'mL', label: 'Milliliters (mL)', toM3: 0.000001, fromM3: 1000000 }
  ],
  imperial: [
    { value: 'ft³', label: 'Cubic Feet (ft³)', toM3: 0.0283168, fromM3: 35.3147 },
    { value: 'in³', label: 'Cubic Inches (in³)', toM3: 0.0000163871, fromM3: 61023.7 },
    { value: 'yd³', label: 'Cubic Yards (yd³)', toM3: 0.764555, fromM3: 1.30795 },
    { value: 'gal', label: 'Gallons (gal)', toM3: 0.00378541, fromM3: 264.172 }
  ]
};

const VolumeCalculator = ({ shape = 'cube',
  defaultValue = '',
  defaultUnit = 'm³' }) => {
  const [dimensions, setDimensions] = useState({ side: defaultValue });
  const [unit, setUnit] = useState(defaultUnit);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateVolume = () => {
    setError('');
    if (!dimensions.side) {
      setError('Please enter the side length');
      return;
    }

    const side = parseFloat(dimensions.side);
    if (isNaN(side) || side <= 0) {
      setError('Please enter a valid positive number');
      return;
    }

    // Calculate volume in input unit
    const volumeInInputUnit = Math.pow(side, 3);
    
    // Convert results to all units
    const selectedUnit = [...units.metric, ...units.imperial].find(u => u.value === unit);
    
    // First convert to cubic meters
    const volumeInCubicMeters = volumeInInputUnit * selectedUnit.toM3;

    // Then convert to all other units
    const conversions = [...units.metric, ...units.imperial].map(u => ({
      unit: u.value,
      value: volumeInCubicMeters * u.fromM3
    }));

    setResult({
      value: volumeInInputUnit,
      unit: unit,
      conversions: conversions,
      volumeInCubicMeters
    });
  };

  // Initial calculation with default values
  useEffect(() => {
    if (defaultValue && defaultUnit) {
      calculateVolume(defaultValue, defaultUnit);
    }
  }, [defaultValue, defaultUnit]);

  return (
    <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
      {/* Input Section */}
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-display font-medium mb-2">
            Side Length
          </label>
          <div className="flex flex-wrap gap-4">
            <input
              type="number"
              value={dimensions.side}
              onChange={(e) => setDimensions({ side: e.target.value })}
              className="flex-1 bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
              placeholder="Enter side length"
              step="any"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
            >
              <optgroup label="Metric">
                {units.metric.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Imperial">
                {units.imperial.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <button
          onClick={calculateVolume}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Calculate Volume
        </button>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg">
            {error}
          </div>
        )}

{/* Results Section */}
{result && (
  <div className="mt-6 space-y-4 overflow-auto">
    <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
      <h3 className="text-xl font-display font-bold mb-4">Results</h3>
      <div className="space-y-2">
        {/* Main Result */}
<div 
  className="text-2xl font-bold text-accent-primary overflow-auto break-words"
  style={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'normal' }} // Add word breaking and normal wrapping
>
  {result.value.toLocaleString(undefined, { maximumFractionDigits: 4 })} {result.unit}
</div>

{/* Alternate Units */}
<div className="mt-4">
  <p className="text-sm font-medium mb-2">Other Units:</p>
  <div 
    className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-content-light-dimmed dark:text-content-dark-dimmed overflow-y-auto"
    style={{ maxWidth: '100%', maxHeight: '200px', wordBreak: 'break-word', overflowY: 'auto' }} // Scroll vertically if necessary
  >
    {result.conversions
      .filter(conv => conv.unit !== unit)
      .map(conv => (
        <div key={conv.unit} className="break-words">
          {conv.value.toLocaleString(undefined, { maximumFractionDigits: 4 })} {conv.unit}
        </div>
      ))}
  </div>
</div>

      </div>
    </div>

    {/* Formula Used */}
    <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
      <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
        Formula: Volume = side³
      </p>
      <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
        Calculation: {dimensions.side} × {dimensions.side} × {dimensions.side} = {result.value.toLocaleString()} {result.unit}
      </p>
    </div>
  </div>
)}

      </div>

      {/* Add Affiliate Section before Continue Learning */}
      <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
        <AffiliateSection client:load />
      </div>
    </div>
  );
};

export default VolumeCalculator;