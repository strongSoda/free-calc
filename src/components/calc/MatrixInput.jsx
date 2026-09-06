// src/components/calc/MatrixInput.jsx
// Reusable matrix entry grid: size controls, quick fills, and text cells so
// users can type fractions ("3/4") as well as decimals.
import React from "react";
import { Button, Field } from "./ui.jsx";

export const emptyGrid = (rows, cols, fill = "") =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));

export const resizeGrid = (grid, rows, cols) =>
  Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => (grid[i] && grid[i][j] !== undefined ? grid[i][j] : ""))
  );

const MatrixInput = ({
  grid,
  onChange,
  rows,
  cols,
  onResize,
  square = false,
  minSize = 1,
  maxSize = 8,
  label = "Matrix A",
  augmented = false,
  columnLabels = null,
  showFills = true,
}) => {
  const setCell = (i, j, value) => {
    const next = grid.map((row, r) => row.map((c, cIdx) => (r === i && cIdx === j ? value : c)));
    onChange(next);
  };

  const fill = (fn) => onChange(grid.map((row, i) => row.map((_, j) => fn(i, j))));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 max-w-xs">
        <Field label={square ? "Size (n × n)" : "Rows"}>
          <input
            type="number"
            min={minSize}
            max={maxSize}
            value={rows}
            onChange={(e) => {
              const n = Math.min(maxSize, Math.max(minSize, parseInt(e.target.value, 10) || minSize));
              onResize(n, square ? n : cols);
            }}
            className="w-full px-3 py-2 rounded-lg border border-gray-200/40 dark:border-gray-700/60 bg-surface-light dark:bg-surface-dark"
          />
        </Field>
        {!square && (
          <Field label={augmented ? "Columns (incl. constants)" : "Columns"}>
            <input
              type="number"
              min={minSize}
              max={maxSize}
              value={cols}
              onChange={(e) => {
                const n = Math.min(maxSize, Math.max(minSize, parseInt(e.target.value, 10) || minSize));
                onResize(rows, n);
              }}
              className="w-full px-3 py-2 rounded-lg border border-gray-200/40 dark:border-gray-700/60 bg-surface-light dark:bg-surface-dark"
            />
          </Field>
        )}
      </div>

      <div>
        <div className="text-sm font-medium mb-2">
          {label} <span className="opacity-60 font-normal">— fractions like 3/4 are fine</span>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="inline-flex items-stretch gap-2">
            <span className="w-2 border-y-2 border-l-2 border-content-light-dimmed/50 dark:border-content-dark-dimmed/50 rounded-l" />
            <div>
              {columnLabels && (
                <div className="flex gap-2 mb-1">
                  {columnLabels.map((c, j) => (
                    <span
                      key={j}
                      className="w-[4.5rem] text-center text-xs text-content-light-dimmed dark:text-content-dark-dimmed"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                {grid.map((row, i) => (
                  <div key={i} className="flex gap-2">
                    {row.map((value, j) => (
                      <React.Fragment key={j}>
                        {augmented && j === cols - 1 && (
                          <span className="self-stretch w-px bg-content-light-dimmed/40 dark:bg-content-dark-dimmed/40 mx-1" />
                        )}
                        <input
                          type="text"
                          inputMode="text"
                          value={value}
                          placeholder="0"
                          aria-label={`Row ${i + 1}, column ${j + 1}`}
                          onChange={(e) => setCell(i, j, e.target.value)}
                          className="w-[4.5rem] px-2 py-2 rounded-lg border border-gray-200/40 dark:border-gray-700/60 bg-surface-light dark:bg-surface-dark text-center font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                        />
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <span className="w-2 border-y-2 border-r-2 border-content-light-dimmed/50 dark:border-content-dark-dimmed/50 rounded-r" />
          </div>
        </div>
      </div>

      {showFills && (
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="text-sm py-1.5" onClick={() => fill(() => "")}>
            Clear
          </Button>
          {square && (
            <Button variant="secondary" className="text-sm py-1.5" onClick={() => fill((i, j) => (i === j ? "1" : "0"))}>
              Identity
            </Button>
          )}
          <Button
            variant="secondary"
            className="text-sm py-1.5"
            onClick={() => fill(() => String(Math.floor(Math.random() * 19) - 9))}
          >
            Random
          </Button>
        </div>
      )}
    </div>
  );
};

export default MatrixInput;
