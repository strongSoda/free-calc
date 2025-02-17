import React, { useState } from 'react';
import SponsorsSection from './SponsorCard';

const RomanCalculator = ({ mode = 'both', defaultValue = '', showAffiliate = true }) => {
  const [number, setNumber] = useState(defaultValue);
  const [romanNumeral, setRomanNumeral] = useState('');
  const [conversionMode, setConversionMode] = useState(mode === 'both' ? 'toRoman' : mode);
  const [error, setError] = useState('');

  const romanNumeralMap = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  const toRoman = (num) => {
    if (num < 1 || num > 3999) return '';
    
    let result = '';
    let remaining = num;
    
    for (const { value, numeral } of romanNumeralMap) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }
    
    return result;
  };

  const fromRoman = (str) => {
    if (!str) return 0;
    
    let result = 0;
    let i = 0;
    
    while (i < str.length) {
      const current = romanNumeralMap.find(r => str.startsWith(r.numeral, i));
      if (!current) return 0;
      result += current.value;
      i += current.numeral.length;
    }
    
    return result;
  };

  const handleConvert = () => {
    setError('');
    if (conversionMode === 'toRoman') {
      const num = parseInt(number);
      if (isNaN(num) || num < 1 || num > 3999) {
        setError('Please enter a number between 1 and 3999');
        return;
      }
      setRomanNumeral(toRoman(num));
    } else {
      const roman = number.toUpperCase();
      if (!/^[MDCLXVI]+$/.test(roman)) {
        setError('Please enter valid Roman numerals (I, V, X, L, C, D, M)');
        return;
      }
      const num = fromRoman(roman);
      if (num === 0) {
        setError('Invalid Roman numeral');
        return;
      }
      setRomanNumeral(num.toString());
    }
  };

  return (
    <div className="space-y-8">
      {mode === 'both' && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setConversionMode('toRoman')}
            className={`px-4 py-2 rounded-lg font-medium ${
              conversionMode === 'toRoman'
                ? 'bg-accent-primary text-white'
                : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
            }`}
          >
            Number to Roman
          </button>
          <button
            onClick={() => setConversionMode('fromRoman')}
            className={`px-4 py-2 rounded-lg font-medium ${
              conversionMode === 'fromRoman'
                ? 'bg-accent-primary text-white'
                : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed'
            }`}
          >
            Roman to Number
          </button>
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder={conversionMode === 'toRoman' ? 'Enter number (1-3999)' : 'Enter Roman numeral'}
          className="w-full px-4 py-3 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
        />

        <button
          onClick={handleConvert}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Convert
        </button>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {romanNumeral && !error && (
          <div className="p-6 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Result:</h3>
            <p className="text-3xl font-bold font-display">{romanNumeral}</p>
          </div>
        )}

        <div className="mt-8 p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
          <h3 className="font-semibold mb-2">Roman Numeral Table</h3>
          <div className="grid grid-cols-4 gap-2 text-sm">
            {romanNumeralMap.map(({ value, numeral }) => (
              <div key={numeral} className="flex justify-between p-2 bg-surface-light dark:bg-surface-dark-hover rounded">
                <span>{numeral}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

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

export default RomanCalculator;