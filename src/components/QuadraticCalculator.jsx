import React, { useState, useEffect } from 'react';
import SponsorsSection from './SponsorCard';

const QuadraticCalculator = ({ defaultA = '', defaultB = '', defaultC = '', showAffiliate = true }) => {
  const [coefficients, setCoefficients] = useState({ 
    a: defaultA, 
    b: defaultB, 
    c: defaultC 
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const calculateRoots = () => {
    setError('');
    const { a, b, c } = coefficients;
    
    if (!a || !b || !c) {
      setError('Please enter all coefficients');
      return;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (numA === 0) {
      setError('Coefficient "a" cannot be zero');
      return;
    }

    // Calculate discriminant
    const discriminant = Math.pow(numB, 2) - (4 * numA * numC);
    
    // Calculate vertex
    const vertexX = -numB / (2 * numA);
    const vertexY = numA * Math.pow(vertexX, 2) + numB * vertexX + numC;
    
    // Calculate axis of symmetry
    const axisOfSymmetry = -numB / (2 * numA);
    
    // Calculate roots
    let roots = [];
    if (discriminant >= 0) {
      const root1 = (-numB + Math.sqrt(discriminant)) / (2 * numA);
      const root2 = (-numB - Math.sqrt(discriminant)) / (2 * numA);
      roots = [root1, root2];
    } else {
      // Complex roots
      const realPart = -numB / (2 * numA);
      const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * numA);
      roots = [
        { real: realPart, imaginary: imaginaryPart },
        { real: realPart, imaginary: -imaginaryPart }
      ];
    }

    setResults({
      discriminant,
      roots,
      vertex: { x: vertexX, y: vertexY },
      axisOfSymmetry,
      nature: discriminant > 0 ? 'Real and Distinct' : discriminant === 0 ? 'Real and Equal' : 'Complex'
    });
  };

  useEffect(() => {
    if (defaultA && defaultB && defaultC) {
      calculateRoots();
    }
  }, [defaultA, defaultB, defaultC]);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-lg font-display font-medium mb-2">
            Coefficient a
          </label>
          <input
            type="number"
            value={coefficients.a}
            onChange={(e) => setCoefficients({ ...coefficients, a: e.target.value })}
            className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:ring-2 focus:ring-accent-primary outline-none"
            placeholder="Enter a"
            step="any"
          />
        </div>
        <div>
          <label className="block text-lg font-display font-medium mb-2">
            Coefficient b
          </label>
          <input
            type="number"
            value={coefficients.b}
            onChange={(e) => setCoefficients({ ...coefficients, b: e.target.value })}
            className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:ring-2 focus:ring-accent-primary outline-none"
            placeholder="Enter b"
            step="any"
          />
        </div>
        <div>
          <label className="block text-lg font-display font-medium mb-2">
            Coefficient c
          </label>
          <input
            type="number"
            value={coefficients.c}
            onChange={(e) => setCoefficients({ ...coefficients, c: e.target.value })}
            className="w-full bg-surface-light-hover dark:bg-surface-dark rounded-lg p-3 border border-gray-200/20 dark:border-gray-800/20 focus:ring-2 focus:ring-accent-primary outline-none"
            placeholder="Enter c"
            step="any"
          />
        </div>
      </div>

      <button
        onClick={calculateRoots}
        className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
      >
        Calculate Roots
      </button>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg">
          {error}
        </div>
      )}

      {results && (
        <div className="space-y-6">
          {/* Main Results Card */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
            <h3 className="text-xl font-display font-bold mb-4">Results</h3>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 p-4 rounded-lg">
                <div className="font-medium mb-2">Equation:</div>
                <div className="font-mono">
                  {coefficients.a}x² + {coefficients.b}x + {coefficients.c} = 0
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-light dark:bg-surface-dark-hover rounded-lg">
                  <div className="font-medium mb-2">Nature of Roots:</div>
                  <div className="text-accent-primary">{results.nature}</div>
                </div>

                <div className="p-4 bg-surface-light dark:bg-surface-dark-hover rounded-lg">
                  <div className="font-medium mb-2">Discriminant:</div>
                  <div>{results.discriminant.toFixed(4)}</div>
                </div>
              </div>

              {results.roots.length > 0 && (
                <div className="p-4 bg-surface-light dark:bg-surface-dark-hover rounded-lg">
                  <div className="font-medium mb-2">Roots:</div>
                  <div className="space-y-1">
                    {typeof results.roots[0] === 'number' ? (
                      <>
                        <div>x₁ = {results.roots[0].toFixed(4)}</div>
                        <div>x₂ = {results.roots[1].toFixed(4)}</div>
                      </>
                    ) : (
                      <>
                        <div>x₁ = {results.roots[0].real.toFixed(4)} + {results.roots[0].imaginary.toFixed(4)}i</div>
                        <div>x₂ = {results.roots[1].real.toFixed(4)} {results.roots[1].imaginary.toFixed(4) >= 0 ? '+' : '-'} {Math.abs(results.roots[1].imaginary).toFixed(4)}i</div>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-light dark:bg-surface-dark-hover rounded-lg">
                  <div className="font-medium mb-2">Vertex:</div>
                  <div>
                    ({results.vertex.x.toFixed(4)}, {results.vertex.y.toFixed(4)})
                  </div>
                </div>

                <div className="p-4 bg-surface-light dark:bg-surface-dark-hover rounded-lg">
                  <div className="font-medium mb-2">Axis of Symmetry:</div>
                  <div>x = {results.axisOfSymmetry.toFixed(4)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formula Card */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-4">
            <div className="text-sm space-y-2">
              <div>Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)</div>
              <div>
                Calculation: x = (-{coefficients.b} ± √({coefficients.b}² - 4×{coefficients.a}×{coefficients.c})) / (2×{coefficients.a})
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Affiliate Section */}
      {
          showAffiliate && (
          <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
            {/* <AffiliateSection client:load /> */}
            <SponsorsSection client:load />
          </div>
          )
        }
    </div>
  );
};

export default QuadraticCalculator;