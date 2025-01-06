// src/components/PowerCalculator.jsx
import React, { useState, useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const powerUnits = {
  standard: [
    { value: 'W', label: 'Watts (W)', toW: 1, fromW: 1 },
    { value: 'kW', label: 'Kilowatts (kW)', toW: 1000, fromW: 0.001 },
    { value: 'MW', label: 'Megawatts (MW)', toW: 1000000, fromW: 0.000001 },
    { value: 'GW', label: 'Gigawatts (GW)', toW: 1000000000, fromW: 1e-9 }
  ],
  mechanical: [
    { value: 'hp', label: 'Horsepower (hp)', toW: 745.7, fromW: 0.00134102 },
    { value: 'PS', label: 'Metric Horsepower (PS)', toW: 735.49875, fromW: 0.00135962 }
  ],
  energy: [
    { value: 'BTUh', label: 'BTU/hour', toW: 0.29307107, fromW: 3.41214163 },
    { value: 'kcal/s', label: 'Kilocalories/second', toW: 4184, fromW: 0.000239 },
    { value: 'ft⋅lbf/s', label: 'Foot-pound force/second', toW: 1.355818, fromW: 0.737562 }
  ]
};

const PowerCalculator = ({ 
  defaultValue = '', 
  defaultFromUnit = 'W',
  defaultToUnit = 'kW'
}) => {
  const [value, setValue] = useState(defaultValue);
  const [fromUnit, setFromUnit] = useState(defaultFromUnit);
  const [toUnit, setToUnit] = useState(defaultToUnit);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const allUnits = [...powerUnits.standard, ...powerUnits.mechanical, ...powerUnits.energy];

  const convert = () => {
    setError('');
    if (!value) {
      setError('Please enter a value');
      return;
    }

    const inputValue = parseFloat(value);
    if (isNaN(inputValue) || inputValue < 0) {
      setError('Please enter a valid positive number');
      return;
    }

    const fromUnitData = allUnits.find(u => u.value === fromUnit);
    const toUnitData = allUnits.find(u => u.value === toUnit);
    
    // Convert to watts first, then to target unit
    const watts = inputValue * fromUnitData.toW;
    const converted = watts * toUnitData.fromW;

    // Calculate all conversions
    const conversions = allUnits.map(unit => ({
      unit: unit.value,
      label: unit.label,
      value: watts * unit.fromW
    }));

    setResult({
      value: converted,
      from: { unit: fromUnit, value: inputValue },
      to: { unit: toUnit },
      conversions
    });
  };

  useEffect(() => {
    if (defaultValue && defaultFromUnit && defaultToUnit) {
      convert();
    }
  }, [defaultValue, defaultFromUnit, defaultToUnit]);

  return (
    <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
      <div className="space-y-6">
        {/* Input Section */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-lg font-display font-medium mb-2">
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
              placeholder="Enter value"
              step="any"
            />
          </div>
          <div>
            <label className="block text-lg font-display font-medium mb-2">
              From Unit
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
            >
              <optgroup label="Standard Units">
                {powerUnits.standard.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Mechanical Units">
                {powerUnits.mechanical.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Energy Rate Units">
                {powerUnits.energy.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-lg font-display font-medium mb-2">
              To Unit
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
            >
              <optgroup label="Standard Units">
                {powerUnits.standard.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Mechanical Units">
                {powerUnits.mechanical.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Energy Rate Units">
                {powerUnits.energy.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <button
          onClick={convert}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Convert Power
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
              <h3 className="text-xl font-display font-bold mb-4">Result</h3>
              <p className="text-2xl font-bold text-accent-primary">
                {result.value.toLocaleString(undefined, { maximumFractionDigits: 6 })} {result.to.unit}
              </p>
              
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">All Conversions:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {result.conversions.map(conv => (
                    <div key={conv.unit} className="bg-surface-light dark:bg-surface-dark-hover p-3 rounded-lg">
                      <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                        {conv.label}
                      </div>
                      <div className="font-medium">
                        {conv.value.toLocaleString(undefined, { maximumFractionDigits: 6 })} {conv.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
              <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                Formula: Value × (FromUnit to Watts) × (Watts to ToUnit)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Affiliate Section */}
      <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4 mt-8">
        <AffiliateSection client:load />
      </div>
    </div>
  );
};

export default PowerCalculator;