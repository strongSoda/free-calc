import React, { useState, useEffect, useRef } from 'react';
import { X, Share2, Copy, Twitter, Facebook, Check, Linkedin } from 'lucide-react';

const MobileBottomAd = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [adState, setAdState] = useState('failed');
  const [copied, setCopied] = useState(false);
  const adContainerRef = useRef(null);
  const adAttempted = useRef(false);
  const isDevelopment = false;

  // Constants for dimensions
  const CONTAINER_HEIGHT = 60;
  const CONTAINER_PADDING = 8;

  useEffect(() => {
    setIsClient(true);
  }, []);

  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  // Don't render on desktop or when dismissed
  if (isClient && window.innerWidth >= 1280) return null;
  if (isDismissed) return null;

  const renderAdContent = () => {
    if (isDevelopment) {
      return (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-sm text-gray-500">Ad Placeholder</span>
        </div>
      );
    }

    if (adState === 'loading') {
      return (
        <div className="w-full h-full bg-surface-light-hover dark:bg-surface-dark-hover animate-pulse rounded" />
      );
    }

    if (adState === 'failed' || adState === 'empty') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-surface-light-hover dark:bg-surface-dark-hover rounded p-4">
          {/* <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-3">
            Share this calculator
          </div> */}
          <div className="flex items-center gap-4">
            {(
              <button 
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 text-accent-primary" />
              </button>
            )}
            
            <button 
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              aria-label="Copy link"
            >
              {copied ? (
                <Check className="w-5 h-5 text-accent-success" />
              ) : (
                <Copy className="w-5 h-5 text-accent-primary" />
              )}
            </button>
            
            <button 
              onClick={() => handleSocialShare('twitter')}
              className="p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5 text-accent-primary" />
            </button>
            
            <button 
              onClick={() => handleSocialShare('facebook')}
              className="p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5 text-accent-primary" />
            </button>
            
            <button 
              onClick={() => handleSocialShare('linkedin')}
              className="p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-accent-primary" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div 
        ref={adContainerRef}
        className="w-full h-full"
        style={{ minWidth: '300px', minHeight: '116px' }}
      >
        <ins
          className="adsbygoogle min-w-[300px] h-[116px]"
          style={{
            display: 'block',            
          }}
          data-ad-client="ca-pub-9779862910631944"
          data-ad-slot="2571315295"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  };

  return (
    <div 
      className="xl:hidden fixed bottom-0 left-0 right-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-200/10 dark:border-gray-800/10 z-50"
      style={{ 
        height: `${CONTAINER_HEIGHT}px`,
        minWidth: '300px'
      }}
    >
      <div className="relative w-full h-full px-2">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 p-2 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-accent-primary/10 transition-colors z-10 border border-accent-primary dark:border-accent-primary/50"
          aria-label="Dismiss ad"
        >
          <X className="w-5 h-5 text-content-light-dimmed dark:text-content-dark-dimmed" />
        </button>
        
        <div className="w-full h-full p-2">
          {renderAdContent()}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomAd;