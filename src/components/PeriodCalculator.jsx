import React, { useState, useEffect } from 'react';
import AffiliateSection from './AffiliateSection';

const PeriodCalculator = ({ 
  defaultStartDate = '', 
  defaultCycleLength = 28,
  defaultPeriodLength = 5,
  showMonths = 3 
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate || new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState(defaultCycleLength);
  const [periodLength, setPeriodLength] = useState(defaultPeriodLength);
  const [results, setResults] = useState(null);

  const calculateDates = () => {
    const start = new Date(startDate);
    const cycles = [];
    let currentDate = new Date(start);

    // Calculate next 6 cycles
    for (let i = 0; i < 6; i++) {
      const periodStart = new Date(currentDate);
      const periodEnd = new Date(currentDate);
      periodEnd.setDate(periodEnd.getDate() + periodLength - 1);

      // Calculate ovulation (typically 14 days before next period)
      const ovulationStart = new Date(currentDate);
      ovulationStart.setDate(ovulationStart.getDate() + cycleLength - 14);
      const ovulationEnd = new Date(ovulationStart);
      ovulationEnd.setDate(ovulationEnd.getDate() + 4);

      cycles.push({
        periodStart: periodStart.toISOString().split('T')[0],
        periodEnd: periodEnd.toISOString().split('T')[0],
        ovulationStart: ovulationStart.toISOString().split('T')[0],
        ovulationEnd: ovulationEnd.toISOString().split('T')[0]
      });

      currentDate.setDate(currentDate.getDate() + cycleLength);
    }

    setResults(cycles);
  };

  useEffect(() => {
    if (startDate && cycleLength && periodLength) {
      calculateDates();
    }
  }, [startDate, cycleLength, periodLength]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Start Date Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">First Day of Last Period</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
          />
        </div>

        {/* Cycle Length Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Average Cycle Length (days)</label>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
            min="21"
            max="35"
            className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
          />
        </div>

        {/* Period Length Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Period Length (days)</label>
          <input
            type="number"
            value={periodLength}
            onChange={(e) => setPeriodLength(parseInt(e.target.value))}
            min="2"
            max="8"
            className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
          />
        </div>
      </div>

      {results && (
        <div className="space-y-8">
          {/* Results Table */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
            <h3 className="text-xl font-display font-bold mb-4">Next 6 Cycles</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200/50 dark:border-gray-800/50">
                  <tr>
                    <th className="text-left py-2">Period Days</th>
                    <th className="text-left py-2">Ovulation Window</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-gray-800/50">
                  {results.map((cycle, index) => (
                    <tr key={index}>
                      <td className="py-3">
                        {formatDate(cycle.periodStart)} – {formatDate(cycle.periodEnd)}
                      </td>
                      <td className="py-3 text-accent-primary">
                        {formatDate(cycle.ovulationStart)} – {formatDate(cycle.ovulationEnd)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Affiliate Section before Continue Learning */}
          <div class="w-full md:max-w-4xl mx-auto px-1 md:px-4">
            <AffiliateSection client:load />
          </div>

          {/* Additional Info */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
            <h3 className="text-xl font-display font-bold mb-4">Cycle Information</h3>
            <div className="space-y-2 text-content-light-dimmed dark:text-content-dark-dimmed">
              <p>Your average cycle length: {cycleLength} days</p>
              <p>Period duration: {periodLength} days</p>
              <p>Fertility window: Typically 5 days before ovulation</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodCalculator;