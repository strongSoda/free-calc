// src/components/RREFCalculator.jsx
import React, { useState, useEffect } from 'react';
import SponsorsSection from './SponsorCard';

const RREFCalculator = ({ labels, showAffiliate = true }) => {
  const [dimensions, setDimensions] = useState({ rows: 2, cols: 3 });
  const [matrixInputs, setMatrixInputs] = useState([]);
  const [result, setResult] = useState(null);
  const [sizeWarning, setSizeWarning] = useState('');

  // Create matrix inputs array
  const createMatrix = (rows, cols) => {
    const newMatrix = Array(rows).fill(0).map(() => Array(cols).fill(''));
    setMatrixInputs(newMatrix);
    checkMatrixSize(rows, cols);
  };

  // Initialize matrix on mount and dimension changes
  useEffect(() => {
    createMatrix(dimensions.rows, dimensions.cols);
  }, [dimensions.rows, dimensions.cols]);

  // Check matrix size
  const checkMatrixSize = (rows, cols) => {
    setSizeWarning(rows * cols > 100 
      ? "Large matrices may take longer to compute and might require scrolling. Please be patient."
      : "");
  };

  // Handle matrix input changes
  const handleInputChange = (rowIndex, colIndex, value) => {
    const newMatrix = matrixInputs.map((row, r) =>
      row.map((cell, c) => 
        r === rowIndex && c === colIndex ? value : cell
      )
    );
    setMatrixInputs(newMatrix);
  };

  // Calculate RREF
  const calculateRREF = () => {
    // Convert input strings to numbers
    let matrix = matrixInputs.map(row => 
      row.map(val => val === '' ? 0 : parseFloat(val))
    );
    const steps = [];
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let r = 0; r < rows; r++) {
      if (cols <= r) break;

      // Find pivot
      let pivot = r;
      for (let i = r + 1; i < rows; i++) {
        if (Math.abs(matrix[i][r]) > Math.abs(matrix[pivot][r])) {
          pivot = i;
        }
      }

      if (matrix[pivot][r] === 0) continue;

      // Swap rows if needed
      if (pivot !== r) {
        [matrix[pivot], matrix[r]] = [matrix[r], matrix[pivot]];
        steps.push({
          desc: `R${r + 1} ↔ R${pivot + 1}`,
          matrix: matrix.map(row => [...row]),
          explanation:  `Swap row ${r + 1} with row ${pivot + 1} to bring the largest value to the pivot position.`
        });
      }

      // Scale pivot row
      const pivotValue = matrix[r][r];
      if (pivotValue !== 1) {
        for (let j = r; j < cols; j++) {
          matrix[r][j] /= pivotValue;
        }
        steps.push({
          desc: `R${r + 1} = R${r + 1} ÷ ${pivotValue}`,
          matrix: matrix.map(row => [...row]),
          explanation: `Divide row ${r + 1} by ${pivotValue} to make the leading coefficient 1.`
        });
      }

      // Eliminate in other rows
      for (let i = 0; i < rows; i++) {
        if (i !== r && matrix[i][r] !== 0) {
          const factor = matrix[i][r];
          for (let j = r; j < cols; j++) {
            matrix[i][j] -= factor * matrix[r][j];
          }
          steps.push({
            desc: `R${i + 1} = R${i + 1} - ${factor}R${r + 1}`,
            matrix: matrix.map(row => [...row]),
            explanation: `Subtract ${factor} times row ${r + 1} from row ${i + 1}.`
          });
        }
      }
    }

    setResult({ steps, finalMatrix: matrix });
  };

  // Format matrix for MathJax
  const formatMatrixForDisplay = (matrix) => {
    return `\\begin{bmatrix}${
      matrix.map(row => 
        row.map(val => 
          Math.abs(val) < 1e-10 ? '0' : val.toFixed(4)
        ).join(' & ')
      ).join(' \\\\ ')
    }\\end{bmatrix}`;
  };

  // Effect to render math when result changes
  useEffect(() => {
    if (result && window.MathJax) {
      window.MathJax.typesetPromise?.();
    }
  }, [result]);

  return (
    <div className="space-y-8">
           {/* Matrix Size Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-lg font-medium mb-2">{labels.rows}:</label>
          <input
            type="number"
            value={dimensions.rows}
            onChange={(e) => setDimensions(prev => ({ ...prev, rows: parseInt(e.target.value) || 1 }))}
            min="1"
            max="10"
            className="w-full p-2 border rounded text-gray-600"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">{labels.columns}:</label>
          <input
            type="number"
            value={dimensions.cols}
            onChange={(e) => setDimensions(prev => ({ ...prev, cols: parseInt(e.target.value) || 1 }))}
            min="1"
            max="10"
            className="w-full p-2 border rounded text-gray-600"
          />
        </div>
      </div>

      {/* Matrix Input Grid */}
      <div className="overflow-x-auto">
        <div 
          className="grid gap-2" 
          style={{ 
            gridTemplateColumns: `repeat(${dimensions.cols}, minmax(80px, 1fr))`,
            width: 'fit-content'
          }}
        >
          {matrixInputs.map((row, i) => (
            row.map((value, j) => (
              <input
                key={`${i}-${j}`}
                type="number"
                value={value}
                onChange={(e) => handleInputChange(i, j, e.target.value)}
                className="w-20 p-2 border rounded text-center text-gray-600"
                step="any"
              />
            ))
          ))}
        </div>
      </div>

       {sizeWarning && (
        <div className="text-orange-500 text-sm">{labels.sizeWarning}</div>
      )}

      <button
        onClick={calculateRREF}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        {labels.calculate}
      </button>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">{labels.stepByStep}:</h2>
          {result.steps.map((step, index) => (
            <div key={index} className="border rounded p-4">
              <h3 className="font-bold">Step {index + 1}: {step.desc}</h3>
              <p className="text-gray-600 dark:text-gray-200 mb-2">{step.explanation}</p>
              <div>{`$$${formatMatrixForDisplay(step.matrix)}$$`}</div>
            </div>
          ))}
          
          <div className="border rounded p-4">
            <h2 className="text-xl font-bold mb-2">{labels.finalMatrix}:</h2>
            <div>{`$$${formatMatrixForDisplay(result.finalMatrix)}$$`}</div>
          </div>
        </div>
      )}

      {/* Add Affiliate Section before Continue Learning */}
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

export default RREFCalculator;