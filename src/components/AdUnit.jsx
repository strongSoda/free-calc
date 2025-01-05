import { useEffect, useRef, useState } from 'react';

const AdUnit = ({ type = 'square' }) => {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const adConfigs = {
    square: {
      slot: '6825010839',
      format: 'auto',
      style: 'display:block',
      className: 'mb-8 text-center',
      maxWidth: 336,
      height: 280,
      aspectRatio: '336/280'
    },
    horizontal: {
      slot: '6255031166',
      format: 'auto',
      style: 'display:block',
      className: 'my-8 text-center',
      maxWidth: 728,
      height: 90,
      aspectRatio: '728/90'
    },
    vertical: {
      slot: '3025366622',
      format: 'auto',
      style: 'display:block',
      className: 'my-8 text-center',
      maxWidth: 160,
      height: 600,
      aspectRatio: '160/600'
    },
    inFeed: {
      slot: '1572684155',
      format: 'fluid',
      layoutKey: '-ef+6k-30-ac+ty',
      style: 'display:block',
      className: 'my-8',
      maxWidth: 728,
      height: 90,
      aspectRatio: '728/90'
    },
    inArticle: {
      slot: '7439254358',
      format: 'fluid',
      layout: 'in-article',
      style: 'display:block; text-align:center;',
      className: 'my-8',
      maxWidth: 336,
      height: 280,
      aspectRatio: '336/280'
    },
    multiplex: {
      slot: '9873846001',
      format: 'autorelaxed',
      style: 'display:block',
      className: 'my-8 text-center',
      maxWidth: 728,
      height: 300,
      aspectRatio: '728/300'
    }
  };

  const config = adConfigs[type];
  const isDevelopment = false;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isDevelopment && containerRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('Error loading ad:', err);
      }
    }
  }, [isClient]);

  if (!config) return null;

  const AdContainer = ({ children }) => (
    <div 
      ref={containerRef}
      className={`${config.className} max-w-full overflow-hidden relative`}
      style={{
        maxWidth: config.maxWidth,
        margin: '0 auto',
        minHeight: type === 'vertical' ? '600px' : 'auto',
        aspectRatio: config.aspectRatio
      }}
    >
      {children}
    </div>
  );

  if (isDevelopment) {
    return (
      <AdContainer>
        <div
          className="bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center w-full h-full"
          style={{
            aspectRatio: config.aspectRatio,
            maxWidth: '100%'
          }}
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center p-2">
            <div>Ad Placeholder ({type})</div>
            <div>{config.maxWidth}x{config.height}</div>
          </div>
        </div>
      </AdContainer>
    );
  }

  if (!isClient) {
    return (
      <AdContainer>
        <div
          style={{
            aspectRatio: config.aspectRatio,
            maxWidth: '100%'
          }}
        />
      </AdContainer>
    );
  }

  return (
    <AdContainer>
      <div className="relative w-full h-full">
        <ins
          className="adsbygoogle w-full h-full"
          style={{
            display: 'block',
            position: type === 'vertical' ? 'absolute' : 'relative',
            top: type === 'vertical' ? 0 : 'auto',
            left: type === 'vertical' ? 0 : 'auto'
          }}
          data-ad-client="ca-pub-9779862910631944"
          data-ad-slot={config.slot}
          data-ad-format={config.format}
          {...(config.layoutKey && { 'data-ad-layout-key': config.layoutKey })}
          {...(config.layout && { 'data-ad-layout': config.layout })}
          data-full-width-responsive="true"
        />
      </div>
    </AdContainer>
  );
};

export default AdUnit;