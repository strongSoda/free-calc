// src/components/PercentageGpaContent.jsx
import { useState } from 'react';
import GpaCalculator from './GpaCalculator';

const PercentageGpaContent = ({ initialScale, initialPercentage }) => {
  const [currentGpa, setCurrentGpa] = useState(((parseFloat(initialPercentage) / 100) * parseFloat(initialScale)).toFixed(1));
  const [currentScale, setCurrentScale] = useState(initialScale);
  const [currentPercentage, setCurrentPercentage] = useState(initialPercentage);

  const updateValues = (gpa, scale, percentage) => {
    setCurrentGpa(gpa);
    setCurrentScale(scale);
    setCurrentPercentage(percentage);
  };

  return (
    <div className="space-y-12">
      {/* Hero Result Section */}
      <div className="bg-surface-light dark:bg-surface-dark-hover rounded-2xl border border-gray-200/10 dark:border-gray-800/10 overflow-hidden">
        <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 p-2 md:p-8 text-center">
          <h2 className="text-5xl font-display font-bold bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
            {currentPercentage}% = {currentGpa} GPA
          </h2>
          <p className="mt-3 text-xl text-content-light-dimmed dark:text-content-dark-dimmed">
            on {currentScale} scale
          </p>
        </div>
        
        {/* Quick Reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 md:p-6 bg-surface-light-hover/50 dark:bg-surface-dark/50">
          <div className="text-center p-3">
            <div className="font-semibold text-content-light dark:text-content-dark">A Grade</div>
            <div className="text-content-light-dimmed dark:text-content-dark-dimmed">90-100%</div>
          </div>
          <div className="text-center p-3">
            <div className="font-semibold text-content-light dark:text-content-dark">B Grade</div>
            <div className="text-content-light-dimmed dark:text-content-dark-dimmed">80-89%</div>
          </div>
          <div className="text-center p-3">
            <div className="font-semibold text-content-light dark:text-content-dark">C Grade</div>
            <div className="text-content-light-dimmed dark:text-content-dark-dimmed">70-79%</div>
          </div>
          <div className="text-center p-3">
            <div className="font-semibold text-content-light dark:text-content-dark">D Grade</div>
            <div className="text-content-light-dimmed dark:text-content-dark-dimmed">60-69%</div>
          </div>
        </div>
      </div>
      
      {/* Calculator Section */}
      <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
        <h2 className="text-2xl font-display font-bold mb-6 text-content-light dark:text-content-dark">
          Try Other Conversions
        </h2>
        <GpaCalculator 
          defaultMode="percent-to-gpa"
          defaultScale={currentScale}
          defaultPercentage={currentPercentage}
          onValuesChange={updateValues}
        />
      </div>
      
      {/* Formula Section */}
      <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl overflow-hidden border border-gray-200/10 dark:border-gray-800/10">
        <div className="p-6 border-b border-gray-200/10 dark:border-gray-800/10">
          <h2 className="text-2xl font-display font-bold text-content-light dark:text-content-dark">
            How is this calculated?
          </h2>
        </div>
        
        <div className="p-6">
          <p className="text-content-light-dimmed dark:text-content-dark-dimmed mb-4">
            The conversion from percentage to GPA on a {currentScale} scale follows this formula:
          </p>
          <div className="bg-surface-light-hover dark:bg-surface-dark p-6 rounded-lg font-mono text-content-light dark:text-content-dark">
            <div className="mb-2">GPA = (Percentage / 100) × {currentScale}</div>
            <div className="text-accent-primary">
              GPA = ({currentPercentage} / 100) × {currentScale} = {currentGpa}
            </div>
          </div>
        </div>
      </div>
      
      {/* Grade Ranges Table */}
      <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl overflow-hidden border border-gray-200/10 dark:border-gray-800/10">
        <div className="p-6 border-b border-gray-200/10 dark:border-gray-800/10">
          <h3 className="text-2xl font-display font-bold text-content-light dark:text-content-dark">
            Grade Ranges on {currentScale} Scale
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200/10 dark:divide-gray-800/10">
          {[
            { grade: 'A', range: '90-100%', description: 'Excellent' },
            { grade: 'B', range: '80-89%', description: 'Good' },
            { grade: 'C', range: '70-79%', description: 'Average' },
            { grade: 'D', range: '60-69%', description: 'Below Average' }
          ].map(({ grade, range, description }) => (
            <div key={grade} className="flex items-center p-4 hover:bg-surface-light-hover dark:hover:bg-surface-dark">
              <div className="w-16 h-16 rounded-lg bg-accent-primary/10 flex items-center justify-center mr-4">
                <span className="text-2xl font-display font-bold text-accent-primary">{grade}</span>
              </div>
              <div>
                <div className="font-semibold text-content-light dark:text-content-dark">
                  {(parseFloat(currentScale) * (parseInt(range) / 100)).toFixed(1)} - 
                  {(parseFloat(currentScale) * (parseInt(range.split('-')[1]) / 100)).toFixed(1)} GPA
                </div>
                <div className="text-content-light-dimmed dark:text-content-dark-dimmed">
                  {range} • {description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PercentageGpaContent;