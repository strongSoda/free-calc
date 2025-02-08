(function() {
  // Calculator configurations
  const CALCULATORS = {
    'subnet-ipv4': {
      title: 'IPv4 Subnet Calculator',
      description: 'Calculate IPv4 subnets, CIDR notation, network addresses and more.',
      path: '/calculators/subnet/ipv4'
    },
    'subnet-ipv6': {
      title: 'IPv6 Subnet Calculator',
      description: 'Calculate IPv6 subnets, CIDR notation, network addresses and more.',
      path: '/calculators/subnet/ipv6'
    },
    'gpa': {
      title: 'GPA Calculator',
      description: 'Convert between GPA and percentage grades with support for different scales.',
      path: '/calculators/gpa-to-percentage'
    },
    'volume': {
      title: 'Volume Calculator',
      description: 'Calculate volumes of different 3D shapes with unit conversion.',
      path: '/calculators/volume'
    },
    // Add other calculators here
  };

  function createCalculator(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !CALCULATORS[type]) return;

    const calculator = CALCULATORS[type];
    const baseUrl = 'https://rref-calculator.com';

    // Create SEO-friendly attribution div with links
    const attribution = document.createElement('div');
    attribution.style.cssText = 'font-family: system-ui, -apple-system, sans-serif; font-size: 14px; margin-bottom: 8px; color: #666;';
    attribution.innerHTML = `
      <div>
        Powered by 
        <a href="${baseUrl}${calculator.path}" 
           target="_blank" 
           rel="noopener" 
           style="color: #0ea5e9; text-decoration: none;"
        >${calculator.title}</a>
        from
        <a href="${baseUrl}" 
           target="_blank" 
           rel="noopener"
           style="color: #0ea5e9; text-decoration: none;"
        >Free Calculators</a>
      </div>
      <div style="font-size: 12px; color: #888; margin-top: 4px;">
        ${calculator.description}
      </div>
    `;

    // Create iframe for the calculator
    const iframe = document.createElement('iframe');
    iframe.src = `${baseUrl}${calculator.path}/widget`;
    iframe.style.cssText = `
      width: 100%;
      height: 800px;
      border: none;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-top: 8px;
      background: white;
    `;
    iframe.title = calculator.title;

    // Add both elements to container
    container.appendChild(iframe);
    container.appendChild(attribution);

    // Handle dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      attribution.style.color = '#94a3b8';
      iframe.style.background = '#1e293b';
    }

    // Listen for dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      attribution.style.color = e.matches ? '#94a3b8' : '#666';
      iframe.style.background = e.matches ? '#1e293b' : 'white';
    });

    // Adjust iframe height based on content
    window.addEventListener('message', function(e) {
      if (e.origin === baseUrl && e.data.type === 'resize') {
        iframe.style.height = `${e.data.height}px`;
      }
    });
  }

  // Expose to global scope
  window.createCalculator = createCalculator;
})();