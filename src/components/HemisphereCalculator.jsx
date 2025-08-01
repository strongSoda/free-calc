// src/components/HemisphereCalculator.jsx
import React, { useState, useEffect } from 'react';
import SponsorsSection from './SponsorCard';

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

const HemisphereCalculator = ({ 
  defaultRadius = '', 
  defaultUnit = 'm³',
  showAffiliate = true
}) => {
  const [radius, setRadius] = useState(defaultRadius);
  const [unit, setUnit] = useState(defaultUnit);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateVolume = () => {
    setError('');
    
    if (!radius) {
      setError('Please enter the radius');
      return;
    }

    const r = parseFloat(radius);

    if (isNaN(r) || r <= 0) {
      setError('Please enter a valid positive number');
      return;
    }

    // Calculate volume: (2/3)πr³
    const volumeInInputUnit = (2/3) * Math.PI * Math.pow(r, 3);
    
    // Calculate surface areas
    const curvedSurfaceArea = 2 * Math.PI * Math.pow(r, 2); // 2πr²
    const flatSurfaceArea = Math.PI * Math.pow(r, 2);      // πr²
    const totalSurfaceArea = curvedSurfaceArea + flatSurfaceArea;
    
    // Calculate circumference of base
    const circumference = 2 * Math.PI * r;

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
      unit,
      conversions,
      radius: r,
      curvedSurfaceArea,
      flatSurfaceArea,
      totalSurfaceArea,
      circumference,
      diameter: 2 * r
    });
  };

    useEffect(() => {
      if(defaultRadius && defaultUnit) {
        calculateVolume()
      }
    }, [defaultRadius, defaultUnit])

  return (
    <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
      <div className="space-y-6">
        {/* Radius Input */}
        <div>
          <label className="block text-lg font-display font-medium mb-2">Radius</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
            placeholder="Enter radius"
            step="any"
          />
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
              
              {/* Volume */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Volume:</p>
                <p className="text-2xl font-bold text-accent-primary">
                  {result.value.toLocaleString(undefined, { maximumFractionDigits: 4 })} {result.unit}
                </p>
              </div>

              {/* Other Measurements */}
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">Other Measurements:</p>
                <ul className="space-y-1 text-content-light-dimmed dark:text-content-dark-dimmed">
                  <li>Radius: {result.radius} {unit.replace('³', '')}</li>
                  <li>Diameter: {result.diameter} {unit.replace('³', '')}</li>
                  <li>Base Circumference: {result.circumference.toFixed(4)} {unit.replace('³', '')}</li>
                  <li>Curved Surface Area: {result.curvedSurfaceArea.toFixed(4)} {unit.replace('³', '²')}</li>
                  <li>Flat Surface Area: {result.flatSurfaceArea.toFixed(4)} {unit.replace('³', '²')}</li>
                  <li>Total Surface Area: {result.totalSurfaceArea.toFixed(4)} {unit.replace('³', '²')}</li>
                </ul>
              </div>
              
              {/* Volume in Other Units */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Volume in Other Units:</p>
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
                Formula: Volume = (2/3) × π × radius³
              </p>
              <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                Calculation: (2/3) × π × {result.radius}³ = {result.value.toLocaleString()} {result.unit}
              </p>
            </div>
          </div>
        )}
      </div>

            {/* Add Affiliate Section before Continue Learning */}
           {
          showAffiliate && (
          <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
            {/* <AffiliateSection client:load /> */}
            <SponsorsSection client:load />
          </div>
          )
        }
    </div>
  );
};

export default HemisphereCalculator;