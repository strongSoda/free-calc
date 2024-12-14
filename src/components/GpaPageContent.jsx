// src/components/GpaPageContent.jsx
import { useState, useEffect } from 'react';
import GpaCalculator from './GpaCalculator';

const GpaPageContent = ({ initialScale, initialGpa }) => {
  const [currentGpa, setCurrentGpa] = useState(initialGpa);
  const [currentScale, setCurrentScale] = useState(initialScale);
  const [currentPercentage, setCurrentPercentage] = useState(
    ((parseFloat(initialGpa) / parseFloat(initialScale)) * 100).toFixed(1)
  );

  const updateValues = (gpa, scale, percentage) => {
    setCurrentGpa(gpa);
    setCurrentScale(scale);
    setCurrentPercentage(percentage);
  };

  return (
    <div>
      {/* Quick Result Section - Now updates with calculator */}
      <div className="text-center mb-12 p-2 md:p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl">
        <h2 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
          {currentGpa} GPA = {currentPercentage}%
        </h2>
        <p className="text-xl text-content-light-dimmed dark:text-content-dark-dimmed">
          on {currentScale} scale
        </p>
      </div>
      
      {/* Calculator Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold mb-6 text-content-light dark:text-content-dark">
          Try Other Conversions:
        </h2>
        <GpaCalculator 
          defaultMode="gpa-to-percent"
          defaultScale={currentScale}
          defaultGpa={currentGpa}
          onValuesChange={updateValues}
        />
      </div>
      
      {/* Explanation Section - Updates dynamically */}
      <div className="mt-12 space-y-6 x-hidden">
        <h2 className="text-2xl font-display font-bold mb-4 text-content-light dark:text-content-dark">
          How is this calculated?
        </h2>
        <div className="bg-surface-light dark:bg-surface-dark-hover rounded-lg p-6 border border-gray-200/10 dark:border-gray-800/10">
          <p className="mb-4 text-content-light-dimmed dark:text-content-dark-dimmed">
            The conversion from GPA to percentage on a {currentScale} scale follows this formula:
          </p>
<div className="bg-surface-light-hover dark:bg-surface-dark p-4 rounded-lg font-mono text-content-light dark:text-content-dark">
  <div>Percentage = (GPA / {currentScale}) × 100</div>
  <div>Percentage = ({currentGpa} / {currentScale}) × 100 = {currentPercentage}%</div>
</div>
        </div>
        
        <div className="bg-surface-light dark:bg-surface-dark-hover rounded-lg p-6 border border-gray-200/10 dark:border-gray-800/10">
          <h3 className="text-xl font-display font-bold mb-4 text-content-light dark:text-content-dark">
            Common GPA Ranges on {currentScale} Scale:
          </h3>
          <ul className="space-y-3 text-content-light-dimmed dark:text-content-dark-dimmed">
            <li className="flex items-center space-x-2">
              <span className="w-24 font-semibold">Excellent:</span>
              <span>{(parseFloat(currentScale) * 0.9).toFixed(1)} - {currentScale} GPA (90% - 100%)</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-24 font-semibold">Good:</span>
              <span>{(parseFloat(currentScale) * 0.8).toFixed(1)} - {(parseFloat(currentScale) * 0.89).toFixed(1)} GPA (80% - 89%)</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-24 font-semibold">Average:</span>
              <span>{(parseFloat(currentScale) * 0.7).toFixed(1)} - {(parseFloat(currentScale) * 0.79).toFixed(1)} GPA (70% - 79%)</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-24 font-semibold">Below Average:</span>
              <span>{(parseFloat(currentScale) * 0.6).toFixed(1)} - {(parseFloat(currentScale) * 0.69).toFixed(1)} GPA (60% - 69%)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GpaPageContent;