// GpaCalculator.jsx
import { useState, useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const GpaCalculator = ({ 
  defaultMode = 'gpa-to-percent',
  defaultScale = '4.0',
  defaultGpa = '',
  defaultPercentage = '',
  onValuesChange = () => {}
}) => {
  const [scale, setScale] = useState(defaultScale);
  const [percentage, setPercentage] = useState('');
  const [gpa, setGpa] = useState('');
  const [mode, setMode] = useState(defaultMode);

  useEffect(() => {
    if (defaultMode === 'gpa-to-percent' && defaultGpa) {
      setGpa(defaultGpa);
      const calculatedPercentage = ((parseFloat(defaultGpa) / parseFloat(defaultScale)) * 100).toFixed(1);
      setPercentage(calculatedPercentage);
    } else if (defaultMode === 'percent-to-gpa' && defaultPercentage) {
      setPercentage(defaultPercentage);
      const calculatedGpa = ((parseFloat(defaultPercentage) / 100) * parseFloat(defaultScale)).toFixed(1);
      setGpa(calculatedGpa);
    }
  }, [defaultMode, defaultScale, defaultGpa, defaultPercentage]);

  const handleCalculate = () => {
    if (mode === 'gpa-to-percent') {
      const gpaNum = parseFloat(gpa);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > parseFloat(scale)) {
        setPercentage('Invalid GPA');
        return;
      }
      const newPercentage = ((gpaNum / parseFloat(scale)) * 100).toFixed(1);
      setPercentage(newPercentage);
      onValuesChange(gpa, scale, newPercentage);
    } else {
      const percentNum = parseFloat(percentage);
      if (isNaN(percentNum) || percentNum < 0 || percentNum > 100) {
        setGpa('Invalid percentage');
        return;
      }
      setGpa(((percentNum / 100) * parseFloat(scale)).toFixed(1));
    }
  };

  return (
    <div className="w-full bg-surface-light dark:bg-surface-dark-hover rounded-xl p-2 md:p-6 shadow-lg">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="font-display text-lg font-medium text-content-light dark:text-content-dark">Scale</label>
          <select 
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            className="bg-surface-light-hover dark:bg-surface-dark rounded p-2 border border-gray-200/50 dark:border-gray-800/50 text-content-light dark:text-content-dark focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
          >
            <option value="4.0">0-4.0 Scale</option>
            <option value="5.0">0-5.0 Scale</option>
            <option value="10.0">0-10.0 Scale</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-display text-lg font-medium text-content-light dark:text-content-dark">Conversion Type</label>
          <select 
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="bg-surface-light-hover dark:bg-surface-dark rounded p-2 border border-gray-200/50 dark:border-gray-800/50 text-content-light dark:text-content-dark focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
          >
            <option value="gpa-to-percent">GPA to Percentage</option>
            <option value="percent-to-gpa">Percentage to GPA</option>
          </select>
        </div>

        {mode === 'gpa-to-percent' ? (
          <div className="flex flex-col space-y-2">
            <label className="font-display text-lg font-medium text-content-light dark:text-content-dark">GPA</label>
            <input
              type="number"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              step="0.1"
              placeholder={`Enter GPA (0-${scale})`}
              className="bg-surface-light-hover dark:bg-surface-dark rounded p-2 border border-gray-200/50 dark:border-gray-800/50 text-content-light dark:text-content-dark focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
            />
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <label className="font-display text-lg font-medium text-content-light dark:text-content-dark">Percentage</label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              step="0.1"
              placeholder="Enter percentage (0-100)"
              className="bg-surface-light-hover dark:bg-surface-dark rounded p-2 border border-gray-200/50 dark:border-gray-800/50 text-content-light dark:text-content-dark focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none"
            />
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary/90 hover:to-accent-secondary/90 text-content-dark font-bold py-3 px-4 rounded-lg transition-all duration-200 font-display"
        >
          Calculate
        </button>

        <div className="mt-4 p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
          <h3 className="font-display text-xl font-semibold mb-2 text-content-light dark:text-content-dark">Result:</h3>
          <p className="text-2xl font-bold font-display bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
            {mode === 'gpa-to-percent' ? `${percentage}%` : `${gpa} GPA`}
          </p>
        </div>
      </div>

    {/* Add Affiliate Section before Continue Learning */}
    <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
      <AffiliateSection client:load />
    </div>

    </div>
  );
};

export default GpaCalculator;