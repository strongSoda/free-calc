import React from 'react';

const BMIResults = ({ 
  bmi, 
  weight,
  height,
  age,
  unit = 'metric',
  showDetails = true 
}) => {
  const getBMIPrime = (bmi) => (bmi / 25).toFixed(2);
  const getPonderalIndex = (weight, height, unit) => {
    if (unit === 'metric') {
      return (weight / Math.pow(height / 100, 3)).toFixed(1);
    }
    return ((weight * 703) / Math.pow(height, 3)).toFixed(1);
  };

  if (!bmi) return null;

  return (
    <div className="space-y-8">
      {/* Primary Results */}
      <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl">
        <div className="text-center space-y-3">
          <div className="text-4xl font-bold font-display">
            {bmi} kg/m²
          </div>
          <div className="text-xl text-content-light-dimmed dark:text-content-dark-dimmed">
            BMI Prime: {getBMIPrime(bmi)} | Ponderal Index: {getPonderalIndex(weight, height, unit)}
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          {/* Detailed Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Adult BMI Table */}
            <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl">
              <h3 className="text-xl font-display font-bold mb-4">BMI Classifications for Adults</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2">Classification</th>
                      <th className="text-right py-2">BMI Range (kg/m²)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { class: 'Severe Thinness', range: '< 16' },
                      { class: 'Moderate Thinness', range: '16 - 17' },
                      { class: 'Mild Thinness', range: '17 - 18.5' },
                      { class: 'Normal', range: '18.5 - 25' },
                      { class: 'Overweight', range: '25 - 30' },
                      { class: 'Obese Class I', range: '30 - 35' },
                      { class: 'Obese Class II', range: '35 - 40' },
                      { class: 'Obese Class III', range: '> 40' }
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="py-2">{row.class}</td>
                        <td className="text-right">{row.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Children BMI Table */}
            <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl">
              <h3 className="text-xl font-display font-bold mb-4">BMI for Children and Teens (2-20 years)</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2">Category</th>
                      <th className="text-right py-2">Percentile Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { category: 'Underweight', range: '< 5%' },
                      { category: 'Healthy weight', range: '5% - 85%' },
                      { category: 'At risk of overweight', range: '85% - 95%' },
                      { category: 'Overweight', range: '> 95%' }
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="py-2">{row.category}</td>
                        <td className="text-right">{row.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* BMI Formula Section */}
          <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl">
            <h3 className="text-xl font-display font-bold mb-4">BMI Formulas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Metric Formula</h4>
                <div className="p-3 bg-surface-light dark:bg-surface-dark-hover rounded-lg font-mono">
                  BMI = weight(kg) / height(m)²
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Imperial Formula</h4>
                <div className="p-3 bg-surface-light dark:bg-surface-dark-hover rounded-lg font-mono">
                  BMI = 703 × weight(lb) / height(in)²
                </div>
              </div>
            </div>
          </div>

          {/* BMI Prime Section */}
          <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl">
            <h3 className="text-xl font-display font-bold mb-4">BMI Prime Classifications</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2">Classification</th>
                    <th className="text-right py-2">BMI</th>
                    <th className="text-right py-2">BMI Prime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { class: 'Severe Thinness', bmi: '< 16', prime: '< 0.64' },
                    { class: 'Moderate Thinness', bmi: '16 - 17', prime: '0.64 - 0.68' },
                    { class: 'Mild Thinness', bmi: '17 - 18.5', prime: '0.68 - 0.74' },
                    { class: 'Normal', bmi: '18.5 - 25', prime: '0.74 - 1' },
                    { class: 'Overweight', bmi: '25 - 30', prime: '1 - 1.2' },
                    { class: 'Obese Class I', bmi: '30 - 35', prime: '1.2 - 1.4' },
                    { class: 'Obese Class II', bmi: '35 - 40', prime: '1.4 - 1.6' },
                    { class: 'Obese Class III', bmi: '> 40', prime: '> 1.6' }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-2">{row.class}</td>
                      <td className="text-right">{row.bmi}</td>
                      <td className="text-right">{row.prime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BMIResults;