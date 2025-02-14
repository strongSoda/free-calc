import React, { useState, useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const TipCalculator = ({ defaultBill = "", defaultTip = 15, showAffiliate=true }) => {
  const [billAmount, setBillAmount] = useState(defaultBill);
  const [tipPercentage, setTipPercentage] = useState(defaultTip);
  const [splitCount, setSplitCount] = useState(1);
  const [customTip, setCustomTip] = useState(false);

  const tipAmount = billAmount ? (parseFloat(billAmount) * (tipPercentage / 100)) : 0;
  const totalAmount = billAmount ? (parseFloat(billAmount) + tipAmount) : 0;
  const perPersonAmount = splitCount > 0 ? (tipAmount / splitCount) : 0;

  const commonTips = [10, 15, 18, 20, 25];

  return (
    <div className="space-y-6">
      {/* Bill Amount Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Bill Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-light-dimmed">$</span>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Tip Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Tip Percentage</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {commonTips.map((tip) => (
            <button
              key={tip}
              onClick={() => {
                setTipPercentage(tip);
                setCustomTip(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tipPercentage === tip && !customTip
                  ? 'bg-accent-primary text-white'
                  : 'bg-surface-light-hover dark:bg-surface-dark-hover hover:bg-accent-primary/10'
              }`}
            >
              {tip}%
            </button>
          ))}
        </div>
        <div className="relative mt-2">
          <input
            type="number"
            value={customTip ? tipPercentage : ''}
            onChange={(e) => {
              setTipPercentage(parseFloat(e.target.value) || 0);
              setCustomTip(true);
            }}
            className="w-full pl-4 pr-8 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            placeholder="Custom tip %"
            min="0"
            max="100"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-content-light-dimmed">%</span>
        </div>
      </div>

      {/* Split Count */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Split Between</label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
            className="p-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark-hover hover:bg-accent-primary/10"
          >
            -
          </button>
          <input
            type="number"
            value={splitCount}
            onChange={(e) => setSplitCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 text-center py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            min="1"
          />
          <button
            onClick={() => setSplitCount(splitCount + 1)}
            className="p-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark-hover hover:bg-accent-primary/10"
          >
            +
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10">
        <div className="grid gap-4">
          <div className="flex justify-between">
            <span className="text-content-light-dimmed dark:text-content-dark-dimmed">Tip Amount:</span>
            <span className="font-semibold">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-content-light-dimmed dark:text-content-dark-dimmed">Total Amount:</span>
            <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200/10 dark:border-gray-800/10">
            <span className="text-content-light-dimmed dark:text-content-dark-dimmed">Per Person:</span>
            <span className="font-semibold">${perPersonAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Add Affiliate Section before Continue Learning */}
      {showAffiliate && <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
        <AffiliateSection client:load />
      </div>}
      
    </div>
  );
};

export default TipCalculator;