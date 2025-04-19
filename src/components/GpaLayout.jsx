import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AdUnit from './AdUnit';
import MobileBottomAd from './MobileBottomAd';

const GpaLayout = ({ children, title, description, keywords = "", about="Calculator" }) => {
  // Safely handle keywords splitting
  const keywordsList = keywords && typeof keywords === 'string' 
    ? keywords.split(',').filter(k => k.trim()) 
    : [];

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark text-content-light dark:text-content-dark">
      <Navbar client:load />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">

          <div className="relative flex justify-center gap-8">
            
            {/* Left ad - only visible on large screens */}
            {/* <div className="hidden xl:block w-[160px] h-fit sticky top-24 flex-shrink-0">
              <AdUnit type="vertical" client:load />
            </div> */}

            {/* main content */}
            <div className="w-full max-w-4xl flex-shrink min-w-0 flex-1 order-2">
              <main>
                <div className="w-full">
                    <h1 className="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text break-words whitespace-normal">
                      {title || "Calculator"}
                    </h1>
                    <p className="text-content-light-dimmed dark:text-content-dark-dimmed mb-8">
                      {description || ""}
                    </p>          
                    <div className="bg-surface-light dark:bg-surface-dark-hover rounded-xl shadow-lg p-2 md:p-6 mb-8">
                      {children}
                    </div>

                    <div className="mt-12">
                      <h2 className="font-display text-2xl font-semibold mb-4">About this {about}
                      </h2>
                      <div className="text-content-light-dimmed dark:text-content-dark-dimmed">
                        <p>{description || ""}</p>

                        {keywordsList.length > 0 && (
                          <div className="mt-4">
                            <h3 className="font-display text-lg font-medium mb-2">Related Searches</h3>
                            <div className="flex flex-wrap gap-2">
                              {keywordsList.map((keyword, index) => (
                                <span 
                                  key={index}
                                  className="px-3 py-1 bg-surface-light-hover dark:bg-surface-dark-hover rounded-full text-sm"
                                >
                                  {keyword.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                </div>            
              </main>
            </div>   

            {/* Left ad */}
            <aside 
              className="hidden xl:block w-[160px] h-[600px] sticky top-24 self-start flex-shrink-0" 
              aria-label="Advertisement" 
              data-nosnippet
              role="complementary"
            >
              {/* Wrap in error boundary */}
              <ErrorBoundary fallback={<div className="w-full h-full"></div>}>
                <AdUnit type="vertical" client:load />
              </ErrorBoundary>
            </aside>         

            {/* Right ad */}
            <aside 
              className="hidden xl:block w-[160px] h-[600px] sticky top-24 self-start flex-shrink-0 order-3" 
              aria-label="Advertisement"
              data-nosnippet
              role="complementary"
            >
              {/* Wrap in error boundary */}
              <ErrorBoundary fallback={<div className="w-full h-full"></div>}>
                <AdUnit type="vertical" client:load />
              </ErrorBoundary>
            </aside>
          </div>
        </div>
      </div>

      <div 
        aria-label="Advertisement"
        data-nosnippet
        role="complementary"
      >
        {/* Wrap in error boundary */}
        <ErrorBoundary fallback={<div className="w-full h-full"></div>}>
          <MobileBottomAd client:load />
        </ErrorBoundary>
      </div>

      <Footer />
    </div>
  );
};

// Simple error boundary component to prevent ad errors from crashing the page
const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);
  
  React.useEffect(() => {
    const errorHandler = () => {
      setHasError(true);
    };
    
    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);
  
  if (hasError) {
    return fallback;
  }
  
  return children;
};

export default GpaLayout;