// src/components/HalfLifeCalculator.jsx
import React, { useState, useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const HalfLifeCalculator = ({ 
  defaultInitialQuantity = '', 
  defaultRemainingQuantity = '',
  defaultTime = '',
  defaultHalfLife = '',
  mode = 'calculate-half-life'  // or 'calculate-remaining'
}) => {
  const [values, setValues] = useState({
    initialQuantity: defaultInitialQuantity,
    remainingQuantity: defaultRemainingQuantity,
    time: defaultTime,
    halfLife: defaultHalfLife
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const calculateResults = () => {
    setError('');
    const { initialQuantity, remainingQuantity, time, halfLife } = values;
    
    try {
      let calculatedHalfLife, calculatedRemaining, decayConstant, meanLifetime;
      
      if (mode === 'calculate-half-life' && initialQuantity && remainingQuantity && time) {
        // Calculate half-life using N(t) = N₀(1/2)^(t/t₁/₂)
        calculatedHalfLife = (time * Math.log(2)) / Math.log(initialQuantity / remainingQuantity);
        decayConstant = Math.log(2) / calculatedHalfLife;
        meanLifetime = 1 / decayConstant;
        
        setResults({
          halfLife: calculatedHalfLife,
          decayConstant,
          meanLifetime,
          equation: `t₁/₂ = ${time} × ln(2) / ln(${initialQuantity}/${remainingQuantity})`
        });
      } else if (mode === 'calculate-remaining' && initialQuantity && halfLife && time) {
        // Calculate remaining quantity
        calculatedRemaining = initialQuantity * Math.pow(0.5, time / halfLife);
        decayConstant = Math.log(2) / halfLife;
        meanLifetime = 1 / decayConstant;
        
        setResults({
          remainingQuantity: calculatedRemaining,
          decayConstant,
          meanLifetime,
          equation: `N(t) = ${initialQuantity} × (1/2)^(${time}/${halfLife})`
        });
      } else {
        setError('Please fill in all required fields');
      }
    } catch (err) {
      setError('Invalid input values');
    }
  };

  useEffect(() => {
    if ((mode === 'calculate-half-life' && defaultInitialQuantity && defaultRemainingQuantity && defaultTime) ||
        (mode === 'calculate-remaining' && defaultInitialQuantity && defaultHalfLife && defaultTime)) {
      calculateResults();
    }
  }, [defaultInitialQuantity, defaultRemainingQuantity, defaultTime, defaultHalfLife]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <div>
          <label className="block text-lg font-medium mb-2">Initial Quantity (N₀)</label>
          <input
            type="number"
            value={values.initialQuantity}
            onChange={(e) => setValues({ ...values, initialQuantity: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            placeholder="Enter initial quantity"
            step="any"
          />
        </div>

        {mode === 'calculate-half-life' ? (
          <div>
            <label className="block text-lg font-medium mb-2">Remaining Quantity (N(t))</label>
            <input
              type="number"
              value={values.remainingQuantity}
              onChange={(e) => setValues({ ...values, remainingQuantity: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
              placeholder="Enter remaining quantity"
              step="any"
            />
          </div>
        ) : (
          <div>
            <label className="block text-lg font-medium mb-2">Half-Life (t₁/₂)</label>
            <input
              type="number"
              value={values.halfLife}
              onChange={(e) => setValues({ ...values, halfLife: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
              placeholder="Enter half-life"
              step="any"
            />
          </div>
        )}

        <div>
          <label className="block text-lg font-medium mb-2">Time (t)</label>
          <input
            type="number"
            value={values.time}
            onChange={(e) => setValues({ ...values, time: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            placeholder="Enter time"
            step="any"
          />
        </div>

        <button
          onClick={calculateResults}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Calculate
        </button>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg">
            {error}
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Results:</h3>
              {mode === 'calculate-half-life' ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-accent-primary">
                    Half-Life: {results.halfLife.toFixed(4)} units
                  </p>
                  <p>Decay Constant (λ): {results.decayConstant.toFixed(4)}</p>
                  <p>Mean Lifetime (τ): {results.meanLifetime.toFixed(4)} units</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-accent-primary">
                    Remaining Quantity: {results.remainingQuantity.toFixed(4)}
                  </p>
                  <p>Decay Constant (λ): {results.decayConstant.toFixed(4)}</p>
                  <p>Mean Lifetime (τ): {results.meanLifetime.toFixed(4)} units</p>
                </div>
              )}
            </div>

            <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
              <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                Equation used: {results.equation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Affiliate Section */}
      <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
        <AffiliateSection client:load />
      </div>
    </div>
  );
};

export default HalfLifeCalculator;