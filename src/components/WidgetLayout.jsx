import React from 'react';

const WidgetLayout = ({ children, calculatorName, calculatorPath }) => {
  return (
    <div className="w-full min-h-screen bg-surface-light dark:bg-surface-dark">
      {/* <div className="w-full max-w-4xl mx-auto p-4"> */}
        {/* Calculator Component */}
        <div className="mb-4">
          {children}
        </div>      
    </div>
  );
};

export default WidgetLayout;