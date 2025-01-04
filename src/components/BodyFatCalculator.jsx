import React, { useState, useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const BodyFatCalculator = ({ 
  defaultGender = 'male',
  defaultAge = '',
  defaultWeight = '',
  defaultHeight = '',
  defaultNeck = '',
  defaultWaist = '',
  defaultHip = '',
  defaultUnit = 'metric'
}) => {
  const [gender, setGender] = useState(defaultGender);
  const [age, setAge] = useState(defaultAge);
  const [measurements, setMeasurements] = useState({
    weight: defaultWeight,
    height: defaultHeight,
    neck: defaultNeck,
    waist: defaultWaist,
    hip: defaultHip
  });
  const [unit, setUnit] = useState(defaultUnit);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const categories = {
    male: [
      { range: 'Essential Fat', min: 2, max: 5, color: 'bg-blue-500' },
      { range: 'Athletes', min: 6, max: 13, color: 'bg-green-500' },
      { range: 'Fitness', min: 14, max: 17, color: 'bg-yellow-500' },
      { range: 'Average', min: 18, max: 24, color: 'bg-orange-500' },
      { range: 'Obese', min: 25, max: 100, color: 'bg-red-500' }
    ],
    female: [
      { range: 'Essential Fat', min: 10, max: 13, color: 'bg-blue-500' },
      { range: 'Athletes', min: 14, max: 20, color: 'bg-green-500' },
      { range: 'Fitness', min: 21, max: 24, color: 'bg-yellow-500' },
      { range: 'Average', min: 25, max: 31, color: 'bg-orange-500' },
      { range: 'Obese', min: 32, max: 100, color: 'bg-red-500' }
    ]
  };

  const calculateBodyFat = () => {
    setError('');
    const { weight, height, neck, waist, hip } = measurements;
    
    if (!weight || !height || !neck || !waist || (gender === 'female' && !hip)) {
      setError('Please fill in all required measurements');
      return;
    }

    let bodyFat;
    if (gender === 'male') {
      bodyFat = unit === 'metric' 
        ? 495 / (1.0324 - 0.19077 * Math.log10(parseFloat(waist) - parseFloat(neck)) + 0.15456 * Math.log10(parseFloat(height))) - 450
        : 86.010 * Math.log10(parseFloat(waist) - parseFloat(neck)) - 70.041 * Math.log10(parseFloat(height)) + 36.76;
    } else {
      bodyFat = unit === 'metric'
        ? 495 / (1.29579 - 0.35004 * Math.log10(parseFloat(waist) + parseFloat(hip) - parseFloat(neck)) + 0.22100 * Math.log10(parseFloat(height))) - 450
        : 163.205 * Math.log10(parseFloat(waist) + parseFloat(hip) - parseFloat(neck)) - 97.684 * Math.log10(parseFloat(height)) - 78.387;
    }

    const category = categories[gender].find(cat => bodyFat >= cat.min && bodyFat <= cat.max);

    setResult({
      bodyFat: Math.max(0, Math.min(100, bodyFat)).toFixed(1),
      category: category?.range || 'Unknown',
      color: category?.color || 'bg-gray-500'
    });
  };

  useEffect(() => {
    if (defaultAge && defaultWeight && defaultHeight && defaultNeck && defaultWaist) {
      calculateBodyFat();
    }
  }, [defaultAge, defaultWeight, defaultHeight, defaultNeck, defaultWaist, defaultHip]);

  return (
    <div className="space-y-8">
      {/* Gender Selection */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setGender('male')}
          className={`px-6 py-2 rounded-lg font-medium ${
            gender === 'male' 
              ? 'bg-accent-primary text-white' 
              : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
          }`}
        >
          Male
        </button>
        <button
          onClick={() => setGender('female')}
          className={`px-6 py-2 rounded-lg font-medium ${
            gender === 'female' 
              ? 'bg-accent-primary text-white' 
              : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
          }`}
        >
          Female
        </button>
      </div>

      {/* Unit Selection */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setUnit('metric')}
          className={`px-6 py-2 rounded-lg font-medium ${
            unit === 'metric' 
              ? 'bg-accent-primary text-white' 
              : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
          }`}
        >
          Metric (cm, kg)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`px-6 py-2 rounded-lg font-medium ${
            unit === 'imperial' 
              ? 'bg-accent-primary text-white' 
              : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
          }`}
        >
          Imperial (in, lbs)
        </button>
      </div>

      {/* Measurements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Age (years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
            placeholder="Enter age"
            min="18"
            max="100"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={measurements.weight}
            onChange={(e) => setMeasurements({ ...measurements, weight: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
            placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Height ({unit === 'metric' ? 'cm' : 'in'})
          </label>
          <input
            type="number"
            value={measurements.height}
            onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
            placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Neck ({unit === 'metric' ? 'cm' : 'in'})
          </label>
          <input
            type="number"
            value={measurements.neck}
            onChange={(e) => setMeasurements({ ...measurements, neck: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
            placeholder={`Enter neck circumference`}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Waist ({unit === 'metric' ? 'cm' : 'in'})
          </label>
          <input
            type="number"
            value={measurements.waist}
            onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
            placeholder={`Enter waist circumference`}
          />
        </div>
        {gender === 'female' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Hip ({unit === 'metric' ? 'cm' : 'in'})
            </label>
            <input
              type="number"
              value={measurements.hip}
              onChange={(e) => setMeasurements({ ...measurements, hip: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
              placeholder={`Enter hip circumference`}
            />
          </div>
        )}
      </div>

      <button
        onClick={calculateBodyFat}
        className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
      >
        Calculate Body Fat
      </button>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-6">
          {/* Result Card */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Your Body Fat Percentage</h3>
              <div className="text-4xl font-bold text-accent-primary">
                {result.bodyFat}%
              </div>
              <div className={`mt-2 px-4 py-1 rounded-full inline-block ${result.color} text-white`}>
                {result.category}
              </div>
            </div>
          </div>

          {/* Categories Table */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Body Fat Categories</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2">Category</th>
                    <th className="text-right py-2">Range</th>
                  </tr>
                </thead>
                <tbody>
                  {categories[gender].map((cat, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2">{cat.range}</td>
                      <td className="text-right">{cat.min}-{cat.max}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Formula Used */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
            <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
              Formula Used: {gender === 'male' ? 'U.S. Navy Male Formula' : 'U.S. Navy Female Formula'}
            </p>
          </div>
        </div>
      )}

      {/* Add Affiliate Section */}
      <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
        <AffiliateSection client:load />
      </div>
    </div>
  );
};

export default BodyFatCalculator;