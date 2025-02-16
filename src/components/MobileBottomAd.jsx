import React, { useState, useEffect, useRef } from 'react';
import { X, Share2, Copy, Twitter, Facebook, Check, Linkedin } from 'lucide-react';

const MobileBottomAd = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [adState, setAdState] = useState('loading');
  const [copied, setCopied] = useState(false);
  const adContainerRef = useRef(null);
  const observerRef = useRef(null);
  const isDevelopment = false;

  // Constants for dimensions
  const CONTAINER_HEIGHT = 116; // Including padding
  const CONTAINER_PADDING = 8;

  useEffect(() => {
    setIsClient(true);
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!isClient || isDevelopment) return;

    try {
      observerRef.current = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            const adFrame = adContainerRef.current?.querySelector('iframe');
            if (adFrame) {
              adFrame.style.maxHeight = `${CONTAINER_HEIGHT - (CONTAINER_PADDING * 2)}px`;
              adFrame.style.height = `${CONTAINER_HEIGHT - (CONTAINER_PADDING * 2)}px`;
              adFrame.style.overflow = 'hidden';

              setTimeout(() => {
                const rect = adFrame.getBoundingClientRect();
                if (rect.height < 20) {
                  setAdState('empty');
                  return;
                }
                setAdState('loaded');
              }, 1000);
            }
          }
        });
      });

      if (adContainerRef.current) {
        observerRef.current.observe(adContainerRef.current, { 
          childList: true, 
          subtree: true,
          attributes: true 
        });

        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }

      const timeout = setTimeout(() => {
        if (adState === 'loading') {
          setAdState('failed');
        }
      }, 2000);

      return () => clearTimeout(timeout);
    } catch (err) {
      console.error('Error initializing ad:', err);
      setAdState('failed');
    }
  }, [isClient]);

  // Share handlers
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
  if (typeof window !== 'undefined' && window.innerWidth >= 1280) return null;
  if (isDismissed) return null;

  const renderAdContent = () => {
    if (isDevelopment) {
      return (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-sm text-gray-500">Ad Placeholder</span>
        </div>
      );
    }

    if (!isClient || adState === 'loading') {
      return (
        <div className="w-full h-full bg-surface-light-hover dark:bg-surface-dark-hover animate-pulse rounded" />
      );
    }

    if (adState === 'failed' || adState === 'empty') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-surface-light-hover dark:bg-surface-dark-hover rounded p-4">
          <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-3">
            Share this calculator
          </div>
          <div className="flex items-center gap-4">
            {navigator?.share && (
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
        className="w-full h-full overflow-hidden"
      >
        <ins
          className="adsbygoogle w-full h-full"
          style={{
            display: 'block',
            overflow: 'hidden'
          }}
          data-ad-client="ca-pub-9779862910631944"
          data-ad-slot="2571315295"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    );
  };

  return (
    <div 
      className="xl:hidden fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-gray-200/10 dark:border-gray-800/10 z-50 overflow-hidden"
      style={{ 
        height: `${CONTAINER_HEIGHT}px`,
        maxHeight: `${CONTAINER_HEIGHT}px`
      }}
    >
      <div className="relative w-full h-full px-2">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 p-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark-hover hover:bg-accent-primary/10 transition-colors z-10"
          aria-label="Dismiss ad"
        >
          <X className="w-5 h-5 text-content-light-dimmed dark:text-content-dark-dimmed" />
        </button>
        
        <div 
          className="w-full h-full overflow-hidden"
          style={{ 
            padding: `${CONTAINER_PADDING}px`
          }}
        >
          {renderAdContent()}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomAd;