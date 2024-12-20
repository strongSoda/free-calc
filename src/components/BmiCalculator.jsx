import React, { useState, useEffect } from 'react';
import BMIResults from './BMIResults';
import AffiliateSection from './AffiliateSection';

const BMICalculator = ({ 
  defaultGender = 'all', 
  defaultUnit = 'metric',
  defaultWeight = '',
  defaultHeight = '',
  defaultAge = '',
  autoCalculate = false
}) => {
  const [unit, setUnit] = useState(defaultUnit);
  const [weight, setWeight] = useState(defaultWeight);
  const [height, setHeight] = useState(defaultHeight);
  const [age, setAge] = useState(defaultAge);
  const [gender, setGender] = useState(defaultGender);
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (autoCalculate && defaultWeight && defaultHeight) {
      calculateBMI();
    }
  }, [defaultWeight, defaultHeight, defaultUnit]);

  const calculateBMI = () => {
    if (!weight || !height) return;

    let bmiValue;
    if (unit === 'metric') {
      bmiValue = (weight / Math.pow(height / 100, 2)).toFixed(1);
    } else {
      bmiValue = ((703 * weight) / Math.pow(height, 2)).toFixed(1);
    }
    
    setBmi(bmiValue);
    setCategory(getBMICategory(bmiValue, age, gender));

    // Set results for BMIResults component
    setResults({
      bmi: bmiValue,
      weight,
      height,
      age,
      unit
    });
  };

  const getBMICategory = (bmi, age, gender) => {
    // Adjust thresholds slightly based on gender
    const thresholds = gender === 'female' 
      ? { underweight: 18.5, normal: 24.9, overweight: 29.9 }
      : { underweight: 18.5, normal: 25.9, overweight: 30.9 };
    
    if (age && parseInt(age) > 65) {
      // Slightly higher thresholds for elderly
      thresholds.underweight += 1;
      thresholds.normal += 1;
      thresholds.overweight += 1;
    }

    if (bmi < thresholds.underweight) return 'Underweight';
    if (bmi < thresholds.normal) return 'Normal weight';
    if (bmi < thresholds.overweight) return 'Overweight';
    return 'Obese';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Underweight': 'text-accent-warning',
      'Normal weight': 'text-accent-success',
      'Overweight': 'text-accent-warning',
      'Obese': 'text-accent-error'
    };
    return colors[category] || 'text-content-light dark:text-content-dark';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-6">
        {/* Unit Selection */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setUnit('metric')}
            className={`px-4 py-2 rounded-lg font-medium ${
              unit === 'metric' 
                ? 'bg-accent-primary text-white' 
                : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
            }`}
          >
            Metric
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-4 py-2 rounded-lg font-medium ${
              unit === 'imperial' 
                ? 'bg-accent-primary text-white' 
                : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
            }`}
          >
            Imperial
          </button>
        </div>

        {/* Gender Selection */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setGender('male')}
            className={`px-4 py-2 rounded-lg font-medium ${
              gender === 'male' 
                ? 'bg-accent-primary text-white' 
                : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
            }`}
          >
            Male
          </button>
          <button
            onClick={() => setGender('female')}
            className={`px-4 py-2 rounded-lg font-medium ${
              gender === 'female' 
                ? 'bg-accent-primary text-white' 
                : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
            }`}
          >
            Female
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-accent-primary"
              placeholder={unit === 'metric' ? '70' : '154'}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-accent-primary"
              placeholder={unit === 'metric' ? '170' : '67'}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Age (years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-accent-primary"
              placeholder="25"
              min="18"
              max="120"
            />
          </div>
        </div>

        <button
          onClick={calculateBMI}
          className="w-full py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Calculate BMI
        </button>
      </div>

      {bmi && (
        <div className="text-center space-y-4 p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl">
          <div className="text-4xl font-bold font-display">{bmi}</div>
          <div className={`text-xl font-medium ${getCategoryColor(category)}`}>
            {category}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { range: '< 18.5', category: 'Underweight' },
          { range: '18.5 - 24.9', category: 'Normal weight' },
          { range: '25.0 - 29.9', category: 'Overweight' },
          { range: '≥ 30.0', category: 'Obese' }
        ].map((item) => (
          <div 
            key={item.category}
            className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg text-center"
          >
            <div className="font-medium text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
              {item.range}
            </div>
            <div className={`font-medium ${getCategoryColor(item.category)}`}>
              {item.category}
            </div>
          </div>
        ))}
      </div>

      {/* Add Affiliate Section before Continue Learning */}
      <div class="w-full md:max-w-4xl mx-auto px-1 md:px-4">
        <AffiliateSection client:load />
      </div>

      {results && (
        <div class="mt-8">
          <BMIResults
            {...results}
            showDetails={true}
          />
        </div>
      )}
    </div>
  );
};

export default BMICalculator;