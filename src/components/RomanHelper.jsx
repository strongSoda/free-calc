import React from 'react';

const RomanHelper = () => {
  const table = [
    { symbol: 'I', value: 1, usage: 'Can be repeated (III = 3)', subtractive: 'Before V and X' },
    { symbol: 'V', value: 5, usage: 'Never repeated', subtractive: 'No subtractive pairs' },
    { symbol: 'X', value: 10, usage: 'Can be repeated (XXX = 30)', subtractive: 'Before L and C' },
    { symbol: 'L', value: 50, usage: 'Never repeated', subtractive: 'No subtractive pairs' },
    { symbol: 'C', value: 100, usage: 'Can be repeated (CCC = 300)', subtractive: 'Before D and M' },
    { symbol: 'D', value: 500, usage: 'Never repeated', subtractive: 'No subtractive pairs' },
    { symbol: 'M', value: 1000, usage: 'Can be repeated (MMM = 3000)', subtractive: 'No subtractive pairs' }
  ];

  return (
    <div className="bg-surface-light dark:bg-surface-dark-hover rounded-lg p-6">
      <h3 className="text-xl font-display font-bold mb-4">
        Roman Numeral Reference Guide
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200/10 dark:border-gray-800/10">
              <th className="text-left py-2 px-4">Symbol</th>
              <th className="text-left py-2 px-4">Value</th>
              <th className="text-left py-2 px-4">Usage</th>
              <th className="text-left py-2 px-4">Subtractive Rules</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/10 dark:divide-gray-800/10">
            {table.map(row => (
              <tr key={row.symbol}>
                <td className="py-2 px-4 font-mono font-bold">{row.symbol}</td>
                <td className="py-2 px-4">{row.value}</td>
                <td className="py-2 px-4 text-content-light-dimmed dark:text-content-dark-dimmed">
                  {row.usage}
                </td>
                <td className="py-2 px-4 text-content-light-dimmed dark:text-content-dark-dimmed">
                  {row.subtractive}
                </td>
              </tr>
            )
)}
          </tbody>
        </table>
      </div>

      {/* Common Combinations */}
      <div className="mt-6">
        <h4 className="font-semibold mb-4">Common Combinations</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { numeral: 'IV', value: '4', note: 'I before V' },
            { numeral: 'IX', value: '9', note: 'I before X' },
            { numeral: 'XL', value: '40', note: 'X before L' },
            { numeral: 'XC', value: '90', note: 'X before C' },
            { numeral: 'CD', value: '400', note: 'C before D' },
            { numeral: 'CM', value: '900', note: 'C before M' }
          ].map(combo => (
            <div key={combo.numeral} className="p-3 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
              <div className="font-mono font-bold mb-1">{combo.numeral} = {combo.value}</div>
              <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                {combo.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules Summary */}
      <div className="mt-6">
        <h4 className="font-semibold mb-4">Key Rules</h4>
        <div className="space-y-2">
          <div className="p-3 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
            <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
              1. Only use subtractive notation with I, X, and C
            </p>
          </div>
          <div className="p-3 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
            <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
              2. Never repeat V, L, or D
            </p>
          </div>
          <div className="p-3 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
            <p className="text-content-light-dimmed dark:text-content-dark-dimmed">
              3. Can repeat I, X, C, and M up to three times
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RomanHelper;