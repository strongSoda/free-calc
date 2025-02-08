import React from 'react';

const WidgetLayout = ({ children, calculatorName, calculatorPath }) => {
  return (
    <div className="w-full min-h-screen bg-surface-light dark:bg-surface-dark">
      <div className="w-full mx-auto p-4">
        {/* Calculator Component */}
        <div className="mb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WidgetLayout;