import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const GpaLayout = ({ children, title, description, keywords }) => {
  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark text-content-light dark:text-content-dark">
      <Navbar client:load />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
            {title}
          </h1>
          <p className="text-content-light-dimmed dark:text-content-dark-dimmed mb-8">
            {description}
          </p>
          
          <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl shadow-lg p-2 md:p-6 mb-8">
            {children}
          </div>
          
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold mb-4">About this Calculator</h2>
            <div className="text-content-light-dimmed dark:text-content-dark-dimmed">
              <p>{description}</p>
              <div className="mt-4">
                <h3 className="font-display text-lg font-medium mb-2">Related Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.split(',').map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-surface-light-hover dark:bg-surface-dark-hover rounded-full text-sm"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GpaLayout;