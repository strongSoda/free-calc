import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AffiliateSection from './AffiliateSection';

const StandardDeviationCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [showFormulas, setShowFormulas] = useState(true);

  const calculateStats = () => {
    setError('');
    try {
      // Parse input string into array of numbers
      const data = numbers.split(/[,\s]+/).map(num => {
        const parsed = parseFloat(num.trim());
        if (isNaN(parsed)) throw new Error('Invalid number found');
        return parsed;
      });

      if (data.length < 2) {
        setError('Please enter at least two numbers');
        return;
      }

      // Calculate mean
      const mean = data.reduce((sum, num) => sum + num, 0) / data.length;

      // Calculate variance and standard deviation
      const squaredDiffs = data.map(num => Math.pow(num - mean, 2));
      const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / (data.length - 1); // Sample variance
      const standardDeviation = Math.sqrt(variance);

      // Calculate frequency distribution for histogram
      const min = Math.min(...data);
      const max = Math.max(...data);
      const range = max - min;
      const binCount = Math.min(10, data.length);
      const binWidth = range / binCount;

      const bins = Array(binCount).fill(0);
      data.forEach(num => {
        const binIndex = Math.min(Math.floor((num - min) / binWidth), binCount - 1);
        bins[binIndex]++;
      });

      const chartData = bins.map((count, i) => ({
        value: min + (i + 0.5) * binWidth,
        frequency: count
      }));

      // Z-scores for each data point
      const zScores = data.map(num => (num - mean) / standardDeviation);

      setResults({
        mean: mean.toFixed(4),
        variance: variance.toFixed(4),
        standardDeviation: standardDeviation.toFixed(4),
        sampleSize: data.length,
        chartData,
        min: min.toFixed(4),
        max: max.toFixed(4),
        zScores: zScores.map(z => z.toFixed(4))
      });
    } catch (err) {
      setError('Please enter valid numbers separated by commas or spaces');
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
        <div className="space-y-4">
          <label className="block text-lg font-display font-medium">
            Enter Numbers
          </label>
          <textarea
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            className="w-full h-32 bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
            placeholder="Enter numbers separated by commas or spaces (e.g., 1, 2, 3, 4, 5)"
          />
          {error && (
            <div className="text-accent-error text-sm">{error}</div>
          )}
          <button
            onClick={calculateStats}
            className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Calculate
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Main Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Mean (μ)', value: results.mean },
              { label: 'Standard Deviation (σ)', value: results.standardDeviation },
              { label: 'Variance (σ²)', value: results.variance },
              { label: 'Sample Size (n)', value: results.sampleSize }
            ].map((stat, index) => (
              <div key={index} className="bg-surface-light dark:bg-surface-dark-hover rounded-lg p-4 text-center">
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-1">
                  {stat.label}
                </div>
                <div className="text-2xl font-bold font-display text-accent-primary">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Distribution Chart */}
          <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
            <h3 className="text-lg font-display font-medium mb-4">Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="value" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="frequency" 
                    stroke="#0ea5e9" 
                    strokeWidth={2}
                    dot={{ fill: '#0ea5e9' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Z-Scores */}
          <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
            <h3 className="text-lg font-display font-medium mb-4">Z-Scores</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {results.zScores.map((score, index) => (
                <div key={index} className="bg-surface-light-hover dark:bg-surface-dark p-2 rounded text-center">
                  {score}
                </div>
              ))}
            </div>
          </div>

          {/* Formulas Section */}
          <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
            <button
              onClick={() => setShowFormulas(!showFormulas)}
              className="flex items-center justify-between w-full text-lg font-display font-medium"
            >
              <span>Formulas Used</span>
              <span>{showFormulas ? '−' : '+'}</span>
            </button>
            {showFormulas && (
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Mean (μ)</h4>
                  <div className="bg-surface-light-hover dark:bg-surface-dark p-3 rounded font-mono">
                    μ = (Σx) / n
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Variance (σ²)</h4>
                  <div className="bg-surface-light-hover dark:bg-surface-dark p-3 rounded font-mono">
                    σ² = Σ(x - μ)² / (n-1)
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Standard Deviation (σ)</h4>
                  <div className="bg-surface-light-hover dark:bg-surface-dark p-3 rounded font-mono">
                    σ = √(σ²)
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Z-Score</h4>
                  <div className="bg-surface-light-hover dark:bg-surface-dark p-3 rounded font-mono">
                    z = (x - μ) / σ
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Affiliate Section */}
      <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
        <AffiliateSection client:load />
      </div>
    </div>
  );
};

export default StandardDeviationCalculator;