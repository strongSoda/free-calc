import React from 'react';

const WidgetLayout = ({ children, calculatorName, calculatorPath }) => {
  return (
    <div className="w-full min-h-screen bg-surface-light dark:bg-surface-dark">
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Calculator Component */}
        <div className="mb-4">
          {children}
        </div>
        
        {/* Attribution Footer - Cannot be removed */}
        <div className="mt-4 py-2 px-4 bg-surface-light-hover dark:bg-surface-dark-hover rounded-lg text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
          <p>
            Calculator by{" "}
            <a 
              href={`https://rref-calculator.com${calculatorPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:text-accent-secondary"
            >
              {calculatorName}
            </a>
            {" "}|{" "}
            <a 
              href="https://rref-calculator.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:text-accent-secondary"
            >
              Free Calculators
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WidgetLayout;