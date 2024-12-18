// src/components/CuboidCalculator.jsx
import React, { useState , useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const units = {
  metric: [
    { value: 'm³', baseUnit: 'm', label: 'Cubic Meters (m³)', toM3: 1, fromM3: 1 },
    { value: 'cm³', baseUnit: 'cm', label: 'Cubic Centimeters (cm³)', toM3: 0.000001, fromM3: 1000000 },
    { value: 'mm³', baseUnit: 'mm', label: 'Cubic Millimeters (mm³)', toM3: 1e-9, fromM3: 1000000000 },
    { value: 'L', baseUnit: 'dm', label: 'Liters (L)', toM3: 0.001, fromM3: 1000 }
  ],
  imperial: [
    { value: 'ft³', baseUnit: 'ft', label: 'Cubic Feet (ft³)', toM3: 0.0283168, fromM3: 35.3147 },
    { value: 'in³', baseUnit: 'in', label: 'Cubic Inches (in³)', toM3: 0.0000163871, fromM3: 61023.7 },
    { value: 'yd³', baseUnit: 'yd', label: 'Cubic Yards (yd³)', toM3: 0.764555, fromM3: 1.30795 }
  ]
};

const CuboidCalculator = ({ 
  defaultLength = '', 
  defaultWidth = '', 
  defaultHeight = '',
  defaultUnit = 'm³'
}) => {
  const [dimensions, setDimensions] = useState({
    length: defaultLength,
    width: defaultWidth,
    height: defaultHeight
  });
  const [unit, setUnit] = useState(defaultUnit);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateVolume = () => {
    setError('');
    const { length, width, height } = dimensions;
    
    if (!length || !width || !height) {
      setError('Please enter all dimensions');
      return;
    }

    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
      setError('Please enter valid positive numbers');
      return;
    }

    // Calculate volume in input unit
    const volumeInInputUnit = l * w * h;
    
    // Find the current unit's conversion factors
    const selectedUnit = [...units.metric, ...units.imperial].find(u => u.value === unit);
    
    // Convert to cubic meters
    const volumeInCubicMeters = volumeInInputUnit * selectedUnit.toM3;

    // Calculate conversions to all units
    const conversions = [...units.metric, ...units.imperial].map(u => ({
      unit: u.value,
      value: volumeInCubicMeters * u.fromM3
    }));

    setResult({
      value: volumeInInputUnit,
      unit: unit,
      conversions,
      dimensions: { length: l, width: w, height: h }
    });
  };

    // Initial calculation with default values
    useEffect(() => {
      if (defaultHeight && defaultLength &&defaultWidth && defaultUnit) {
        calculateVolume()
      }
    }, [defaultLength, defaultHeight, defaultWidth, defaultUnit]);

  return (
    <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
      <div className="space-y-6">
        {/* Dimensions Inputs */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-lg font-display font-medium mb-2">Length</label>
            <input
              type="number"
              value={dimensions.length}
              onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
              className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
              placeholder="Enter length"
              step="any"
            />
          </div>
          <div>
            <label className="block text-lg font-display font-medium mb-2">Width</label>
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
              className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
              placeholder="Enter width"
              step="any"
            />
          </div>
          <div>
            <label className="block text-lg font-display font-medium mb-2">Height</label>
            <input
              type="number"
              value={dimensions.height}
              onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
              className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
              placeholder="Enter height"
              step="any"
            />
          </div>
        </div>

        {/* Unit Selection */}
        <div>
          <label className="block text-lg font-display font-medium mb-2">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
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

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
              <h3 className="text-xl font-display font-bold mb-4">Results</h3>
              <p className="text-2xl font-bold text-accent-primary">
                {result.value.toLocaleString(undefined, { maximumFractionDigits: 4 })} {result.unit}
              </p>
              
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Other Units:</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  {result.conversions
                    .filter(conv => conv.unit !== unit)
                    .map(conv => (
                      <div key={conv.unit}>
                        {conv.value.toLocaleString(undefined, { maximumFractionDigits: 4 })} {conv.unit}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
              <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                Formula: Volume = length × width × height
              </p>
              <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                Calculation: {result.dimensions.length} × {result.dimensions.width} × {result.dimensions.height} = {result.value.toLocaleString()} {result.unit}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Affiliate Section before Continue Learning */}
      <div class="w-full md:max-w-4xl mx-auto px-1 md:px-4">
        <AffiliateSection client:load />
      </div>
    </div>
  );
};

export default CuboidCalculator;