import React from 'react';

const PostalPatterns = ({ country }) => {
  const patterns = {
    us: {
      format: '#####-####',
      examples: [
        { code: '90210', area: 'Beverly Hills, CA', type: 'Urban' },
        { code: '00501', area: 'Internal Revenue Service, NY', type: 'Special' },
        { code: '20500', area: 'White House, DC', type: 'Government' }
      ],
      structure: [
        { digits: '1st', meaning: 'Certain group of states' },
        { digits: '2nd+3rd', meaning: 'Sectional center or region' },
        { digits: '4th+5th', meaning: 'Specific post office or delivery area' },
        { digits: 'Last 4', meaning: 'Optional: specific segment of address' }
      ]
    },
    ca: {
      format: 'A#A #A#',
      examples: [
        { code: 'M5V 2T6', area: 'Toronto Downtown', type: 'Urban' },
        { code: 'K1A 0A6', area: 'Parliament Hill', type: 'Government' },
        { code: 'H0H 0H0', area: "Santa Claus's Address", type: 'Special' }
      ],
      structure: [
        { digits: '1st', meaning: 'Province or region' },
        { digits: '2nd', meaning: 'Rural (0) or urban (1-9)' },
        { digits: '3rd', meaning: 'Specific district' },
        { digits: 'Last 3', meaning: 'Specific block or building' }
      ]
    },
    jp: {
      format: '###-####',
      examples: [
        { code: '100-0001', area: 'Chiyoda, Tokyo', type: 'Urban' },
        { code: '100-8994', area: 'Tokyo Central Post Office', type: 'Postal' },
        { code: '000-0000', area: 'Example/Test', type: 'Special' }
      ],
      structure: [
        { digits: 'First 3', meaning: 'City or region' },
        { digits: 'Last 4', meaning: 'Area or building block' }
      ]
    },
    ph: {
      format: '####',
      examples: [
        { code: '1000', area: 'Manila', type: 'Urban' },
        { code: '1050', area: 'Ermita', type: 'District' },
        { code: '6000', area: 'Cebu City', type: 'Provincial' }
      ],
      structure: [
        { digits: '1st', meaning: 'Region or major city' },
        { digits: 'Last 3', meaning: 'District or zone' }
      ]
    }
  };

  const selectedPattern = patterns[country];
  if (!selectedPattern) return null;

  return (
    <div className="space-y-6">
      {/* Format Guide */}
      <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
        <h3 className="text-lg font-display font-semibold mb-4">Format Pattern</h3>
        <div className="font-mono text-2xl text-center text-accent-primary">
          {selectedPattern.format}
        </div>
      </div>

      {/* Structure Breakdown */}
      <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
        <h3 className="text-lg font-display font-semibold mb-4">Code Structure</h3>
        <div className="grid gap-3">
          {selectedPattern.structure.map((part, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-content-light-dimmed dark:text-content-dark-dimmed">
                {part.digits}:
              </span>
              <span className="text-right">{part.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div className="p-6 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
        <h3 className="text-lg font-display font-semibold mb-4">Notable Examples</h3>
        <div className="grid gap-4">
          {selectedPattern.examples.map((example, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-mono font-medium text-accent-primary">
                  {example.code}
                </div>
                <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  {example.area}
                </div>
              </div>
              <span className="text-sm px-3 py-1 bg-accent-primary/10 rounded-full">
                {example.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostalPatterns;