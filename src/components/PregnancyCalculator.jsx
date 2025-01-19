import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import AffiliateSection from './AffiliateSection';

const PregnancyCalculator = ({ 
  defaultMethod = 'last_period',
  defaultDate = '',
  showDetails = true
}) => {
  const [method, setMethod] = useState(defaultMethod);
  const [inputDate, setInputDate] = useState(defaultDate);
  const [results, setResults] = useState(null);

  const calculateDates = () => {
    if (!inputDate) return;

    const date = new Date(inputDate);
    let conceptionDate, dueDate;

    switch (method) {
      case 'last_period':
        conceptionDate = new Date(date);
        conceptionDate.setDate(conceptionDate.getDate() + 14);
        dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 280);
        break;
      case 'conception':
        conceptionDate = date;
        dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 266);
        break;
      case 'ivf':
        conceptionDate = date;
        dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 266);
        break;
      case 'ultrasound':
        // Assuming ultrasound date is provided with gestational age
        conceptionDate = new Date(date);
        conceptionDate.setDate(conceptionDate.getDate() - 14);
        dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 280 - 14);
        break;
    }

    // Calculate current week
    const today = new Date();
    const gestationalAge = Math.floor((today - conceptionDate) / (7 * 24 * 60 * 60 * 1000));
    const days = Math.floor((today - conceptionDate) / (24 * 60 * 60 * 1000)) % 7;
    
    // Calculate progress percentage
    const totalDays = 280;
    const daysPassed = Math.floor((today - conceptionDate) / (24 * 60 * 60 * 1000));
    const progress = Math.min(100, Math.max(0, Math.round((daysPassed / totalDays) * 100)));

    // Generate weekly milestones
    const milestones = [];
    let currentWeekStart = new Date(conceptionDate);
    currentWeekStart.setDate(currentWeekStart.getDate() - 14); // Start from LMP

    for (let week = 1; week <= 42; week++) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const milestone = getMilestone(week);
      const trimester = getTrimester(week);

      milestones.push({
        week,
        startDate: currentWeekStart.toLocaleDateString(),
        endDate: weekEnd.toLocaleDateString(),
        trimester,
        milestone
      });

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    setResults({
      dueDate,
      conceptionDate,
      currentWeek: gestationalAge,
      daysInWeek: days,
      progress,
      milestones,
      trimester: getTrimester(gestationalAge)
    });
  };

  useEffect(() => {
    if (defaultDate) {
      calculateDates();
    }
  }, [defaultDate, method]);

  return (
    <div className="space-y-8">
      {/* Calculator Inputs */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Calculation Method</label>
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
          >
            <option value="last_period">Last Menstrual Period</option>
            <option value="conception">Conception Date</option>
            <option value="ivf">IVF Transfer Date</option>
            <option value="ultrasound">Ultrasound Date</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
          />
        </div>
      </div>

      <button
        onClick={calculateDates}
        className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Calculate Due Date
      </button>

      {/* Results */}
      {results && (
        <div className="space-y-8">
          {/* Summary Card */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-xl p-6 space-y-4">
            <h3 className="text-2xl font-semibold font-display">Results</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">Due Date</div>
                <div className="text-xl font-semibold">{results.dueDate.toLocaleDateString()}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">Current Week</div>
                <div className="text-xl font-semibold">Week {results.currentWeek} ({results.daysInWeek} days)</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">Trimester</div>
                <div className="text-xl font-semibold">{results.trimester}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">Progress</div>
                <div className="text-xl font-semibold">{results.progress}%</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-surface-light dark:bg-surface-dark rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-accent-primary to-accent-secondary h-4 rounded-full"
                style={{ width: `${results.progress}%` }}
              />
            </div>
          </div>

                  {/* Add Affiliate Section before Continue Learning */}
                  <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
                    <AffiliateSection client:load />
                  </div>
                  
          {/* Milestones Table */}
          {showDetails && (
            <div className="bg-surface-light-hover dark:bg-surface-dark rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200/10 dark:border-gray-800/10">
                <h3 className="text-2xl font-semibold font-display">Weekly Milestones</h3>
              </div>            

              <div className="overflow-x-auto overflow-y-scroll">
                <table className="w-full h-1/2">
                  <thead className="bg-surface-light dark:bg-surface-dark">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Week</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Dates</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Trimester</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Milestones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/10 dark:divide-gray-800/10">
                    {results.milestones.map((milestone, index) => (
                      <tr 
                        key={index}
                        className={
                          index + 1 === results.currentWeek 
                            ? 'bg-accent-primary/10' 
                            : 'hover:bg-surface-light dark:hover:bg-surface-dark'
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          Week {milestone.week}
                        </td>
                        <td className="px-6 py-4">
                          {milestone.startDate} - {milestone.endDate}
                        </td>
                        <td className="px-6 py-4">
                          {milestone.trimester}
                        </td>
                        <td className="px-6 py-4">
                          {milestone.milestone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper functions
const getTrimester = (week) => {
  if (week <= 13) return 'First Trimester';
  if (week <= 26) return 'Second Trimester';
  return 'Third Trimester';
};

const getMilestone = (week) => {
  const milestones = {
    3: 'Baby conceived',
    4: 'Pregnancy test positive',
    6: 'Heartbeat detectable by ultrasound',
    13: 'Miscarriage risk decreases',
    18: 'Baby begins making movements, can hear sounds',
    23: 'Premature baby may survive',
    28: 'Baby can breathe',
    38: 'Full Term',
  };
  return milestones[week] || '';
};

export default PregnancyCalculator;