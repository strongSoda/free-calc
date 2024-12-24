// src/components/FractionCalculator.jsx
import React, { useState, useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const FractionCalculator = ({ 
  defaultDecimal = '', 
  defaultNumerator = '',
  defaultDenominator = '',
  mode = 'decimal-to-fraction',
  onCalculate = () => {} 
}) => {
  const [decimal, setDecimal] = useState(defaultDecimal);
  const [fraction, setFraction] = useState({ 
    numerator: defaultNumerator, 
    denominator: defaultDenominator 
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
  };

  const decimalToFraction = (decimal) => {
    if (!decimal || isNaN(decimal)) {
      setError('Please enter a valid decimal number');
      return;
    }

    const precision = 1000000; // Handle up to 6 decimal places
    let numerator = Math.round(parseFloat(decimal) * precision);
    let denominator = precision;
    
    const divisor = gcd(numerator, denominator);
    numerator = numerator / divisor;
    denominator = denominator / divisor;

    return { numerator, denominator };
  };

  const fractionToDecimal = (numerator, denominator) => {
    if (!numerator || !denominator || isNaN(numerator) || isNaN(denominator)) {
      setError('Please enter valid numbers for numerator and denominator');
      return;
    }

    if (denominator === '0') {
      setError('Denominator cannot be zero');
      return;
    }

    return parseFloat(numerator) / parseFloat(denominator);
  };

  const handleCalculate = () => {
    setError('');
    let result;

    if (mode === 'decimal-to-fraction') {
      result = decimalToFraction(decimal);
      if (result) {
        setResult({
          decimal: parseFloat(decimal),
          fraction: result,
          simplified: true
        });
      }
    } else {
      const decimalResult = fractionToDecimal(fraction.numerator, fraction.denominator);
      if (decimalResult !== undefined) {
        setResult({
          decimal: decimalResult,
          fraction: {
            numerator: parseInt(fraction.numerator),
            denominator: parseInt(fraction.denominator)
          },
          simplified: false
        });
      }
    }

    if (result && onCalculate) {
      onCalculate(result);
    }
  };

  useEffect(() => {
    if ((mode === 'decimal-to-fraction' && defaultDecimal) || 
        (mode === 'fraction-to-decimal' && defaultNumerator && defaultDenominator)) {
      handleCalculate();
    }
  }, [defaultDecimal, defaultNumerator, defaultDenominator]);

  return (
    <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-3 border border-gray-200/10 dark:border-gray-800/10">
      <div className="space-y-6">
        {mode === 'decimal-to-fraction' ? (
          <div className="space-y-2">
            <label className="block text-lg font-display font-medium">Decimal Number</label>
            <input
              type="number"
              value={decimal}
              onChange={(e) => setDecimal(e.target.value)}
              className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
              placeholder="Enter decimal (e.g. 0.75)"
              step="any"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-lg font-display font-medium">Numerator</label>
              <input
                type="number"
                value={fraction.numerator}
                onChange={(e) => setFraction({ ...fraction, numerator: e.target.value })}
                className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
                placeholder="Enter numerator"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-display font-medium">Denominator</label>
              <input
                type="number"
                value={fraction.denominator}
                onChange={(e) => setFraction({ ...fraction, denominator: e.target.value })}
                className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
                placeholder="Enter denominator"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Calculate
        </button>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
              <h3 className="text-xl font-display font-bold mb-4">Result</h3>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Decimal:</p>
                  <p className="text-2xl font-bold text-accent-primary">
                    {result.decimal.toFixed(6)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Fraction:</p>
                  <p className="text-2xl font-bold text-accent-primary">
                    {result.fraction.numerator}/{result.fraction.denominator}
                  </p>
                </div>
                {result.simplified && (
                  <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                    This is the simplified fraction
                  </p>
                )}
              </div>
            </div>

            <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
              <h4 className="font-medium mb-2">Common Equivalent Forms:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                <div>Percentage: {(result.decimal * 100).toFixed(2)}%</div>
                <div>Ratio: {result.fraction.numerator}:{result.fraction.denominator}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4 mt-8">
        <AffiliateSection client:load />
      </div>
    </div>
  );
};

export default FractionCalculator;