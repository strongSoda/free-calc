(function() {
  // Calculator configurations remain the same
  const CALCULATORS = {
    'subnet-ipv4': {
      title: 'IPv4 Subnet Calculator',
      description: 'Calculate IPv4 subnets, CIDR notation, network addresses and more.',
      path: '/calculators/subnet/ipv4',
      defaultHeight: '550px'
    },
    'subnet-ipv6': {
      title: 'IPv6 Subnet Calculator',
      description: 'Calculate IPv6 subnets, CIDR notation, network addresses and more.',
      path: '/calculators/subnet/ipv6',
      defaultHeight: '450px'
    },
    'bmi': {
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index using metric units (kg/cm).',
      path: '/calculators/bmi',
      defaultHeight: '450px'
    },
    'body-fat': {
      title: 'Body Fat Calculator',
      description: 'Calculate your body fat percentage using the U.S. Navy formula. Supports both metric and imperial units.',
      path: '/calculators/body-fat',
      defaultHeight: '100vh'
    },
    'color-picker': {
      title: 'Color Picker',
      description: 'Pick colors, get codes in HEX, RGB, HSL formats, and generate color schemes.',
      path: '/calculators/color-picker',
      defaultHeight: '100vh'
    },
    'mortgage': {
      title: 'Mortgage Calculator',
      description: 'Calculate mortgage payments, amortization schedules, and total costs including taxes and insurance.',
      path: '/calculators/mortgage',
    },
  };

  function createCalculator(type, containerId, iHeight='100vh') {
    const container = document.getElementById(containerId);
    if (!container || !CALCULATORS[type]) return;

    const calculator = CALCULATORS[type];
    const baseUrl = 'https://rref-calculator.com';

    // Create wrapper for loading state
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      position: relative;
      width: 100%;
      min-height: 400px;
    `;

    // Create loading spinner
    const spinner = document.createElement('div');
    spinner.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #0ea5e9;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 1;
    `;

    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }';
    document.head.appendChild(style);

    // Create iframe with proper height handling
    const iframe = document.createElement('iframe');
    iframe.src = `${baseUrl}${calculator.path}/widget`;
    iframe.style.cssText = `
      width: 100%;
      min-height: 450px;
      border: none;
      border-radius: 8px;
      margin-top: 8px;
      background: white;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    iframe.title = calculator.title;

    // Rest of the code remains the same...
    // Create attribution
    const attribution = document.createElement('div');
    attribution.style.cssText = `
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #64748b;
      line-height: 1.5;
    `;
    attribution.innerHTML = `
  <div style="margin-bottom: 4px;">
    Powered by 
    <a href="${baseUrl}${calculator.path}" 
       target="_blank" 
       rel="noopener" 
       style="color: #0ea5e9; text-decoration: none; font-weight: 500;"
    >${calculator.title}</a>
    from
    <a href="${baseUrl}/calculators" 
       target="_blank" 
       rel="noopener"
       style="color: #0ea5e9; text-decoration: none; font-weight: 500;"
    >Free Calculators</a>
  </div>
  <div style="font-size: 13px; color:rgb(85, 91, 99);">
    ${calculator.description}
  </div>
`;


    // Add elements to container
    wrapper.appendChild(spinner);
    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
    container.appendChild(attribution);

    // Handle dark mode
    function updateDarkMode(isDark) {
      iframe.style.background = isDark ? '#1e293b' : 'white';
      spinner.style.borderColor = isDark ? '#2d3748' : '#f3f3f3';
      spinner.style.borderTopColor = '#0ea5e9';
      
      if (isDark) {
        attribution.style.backgroundColor = '#1e293b';
        attribution.style.borderColor = '#334155';
        attribution.style.color = '#94a3b8';
      } else {
        attribution.style.backgroundColor = '#f8fafc';
        attribution.style.borderColor = '#e2e8f0';
        attribution.style.color = '#64748b';
      }
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      updateDarkMode(true);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      updateDarkMode(e.matches);
    });

    // Hide spinner and show iframe when loaded
    iframe.addEventListener('load', function() {
      iframe.style.opacity = '1';
      spinner.style.display = 'none';

      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const affiliateSections = iframeDoc.querySelectorAll('[id*="affiliate-section"], [id*="AffiliateSection"]');
        affiliateSections.forEach(section => {
          section.style.display = 'none';
        });
      } catch (err) {
        console.warn('Could not modify iframe content due to same-origin policy');
      }
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