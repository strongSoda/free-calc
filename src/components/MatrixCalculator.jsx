// src/components/MatrixCalculator.jsx
// One matrix engine, six calculators. The `mode` prop picks which routine
// runs and how the result is presented; everything else (input grid, steps,
// error handling, copy) is shared.
import React, { useState, useEffect, useMemo, useCallback } from "react";
import MatrixInput, { resizeGrid } from "./calc/MatrixInput.jsx";
import {
  Button, Card, MatrixDisplay, StepList, ResultBanner, ErrorNote, CopyButton, Presets,
} from "./calc/ui.jsx";
import {
  parseMatrix, determinantWithSteps, transposeWithSteps, eliminate, luDecompose,
  inverse, multiply, matrixToStrings, formatSolution, solveSystem, varName,
} from "../utils/matrixMath.js";
import { eigenAnalysis, formatEigenvalue, formatVector } from "../utils/eigen.js";

const MODES = {
  determinant: {
    label: "Determinant",
    square: true,
    action: "Calculate determinant",
    blurb: "Enter a square matrix to get |A| with every cofactor or row operation shown.",
  },
  transpose: {
    label: "Transpose",
    square: false,
    action: "Transpose matrix",
    blurb: "Enter any matrix — rows become columns in Aᵀ.",
  },
  rref: {
    label: "Reduced row echelon form",
    square: false,
    action: "Calculate RREF",
    blurb: "Gauss-Jordan elimination all the way to reduced row echelon form.",
  },
  gaussian: {
    label: "Gaussian elimination",
    square: false,
    action: "Run Gaussian elimination",
    blurb: "Forward elimination to row echelon form, then back-substitution for the solution.",
  },
  lu: {
    label: "LU decomposition",
    square: true,
    action: "Factor into LU",
    blurb: "Doolittle factorisation A = LU (or PA = LU when a row swap is needed).",
  },
  diagonalize: {
    label: "Diagonalize",
    square: true,
    action: "Diagonalize matrix",
    blurb: "Eigenvalues, eigenvectors, and the factorisation A = PDP⁻¹.",
  },
  inverse: {
    label: "Inverse",
    square: true,
    action: "Calculate inverse",
    blurb: "Gauss-Jordan on [A | I] to produce A⁻¹.",
  },
};

const toGrid = (matrix) => matrix.map((row) => row.map((v) => String(v)));

const MatrixCalculator = ({
  mode = "rref",
  defaultMatrix = null,
  defaultRows = 3,
  defaultCols = 3,
  augmented = false,
  presets = [],
  autoCalculate = true,
}) => {
  const config = MODES[mode] || MODES.rref;
  const initialGrid = defaultMatrix ? toGrid(defaultMatrix) : null;
  const initialRows = initialGrid ? initialGrid.length : defaultRows;
  const initialCols = initialGrid ? initialGrid[0].length : config.square ? initialRows : defaultCols;

  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(config.square ? initialRows : initialCols);
  const [grid, setGrid] = useState(
    initialGrid || Array.from({ length: initialRows }, () => Array.from({ length: initialCols }, () => ""))
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [solveSystemToo, setSolveSystemToo] = useState(augmented);

  const handleResize = (r, c) => {
    setRows(r);
    setCols(c);
    setGrid((g) => resizeGrid(g, r, c));
  };

  const compute = useCallback(() => {
    setError("");
    try {
      const A = parseMatrix(grid);
      switch (mode) {
        case "determinant": {
          const res = determinantWithSteps(A);
          setResult({ kind: "determinant", ...res, A });
          break;
        }
        case "transpose": {
          const res = transposeWithSteps(A);
          setResult({ kind: "transpose", ...res, A });
          break;
        }
        case "rref":
        case "gaussian": {
          const reduced = mode === "rref";
          const res = eliminate(A, { reduced });
          const solved = solveSystemToo && cols > 1 ? solveSystem(A) : null;
          setResult({ kind: "elimination", ...res, solved, reduced, A });
          break;
        }
        case "lu": {
          const res = luDecompose(A);
          setResult({ kind: "lu", ...res, A, product: multiply(res.L, res.U) });
          break;
        }
        case "diagonalize": {
          const res = eigenAnalysis(A);
          setResult({ kind: "diagonalize", ...res, A });
          break;
        }
        case "inverse": {
          const inv = inverse(A);
          setResult({ kind: "inverse", inverse: inv, A, check: inv ? multiply(A, inv) : null });
          break;
        }
        default:
          throw new Error("Unknown calculator mode");
      }
    } catch (e) {
      setResult(null);
      setError(e.message || "Something went wrong with that matrix.");
    }
  }, [grid, mode, solveSystemToo, cols]);

  useEffect(() => {
    if (!autoCalculate) return;
    const filled = grid.some((row) => row.some((v) => String(v).trim() !== ""));
    if (filled) compute();
    else setResult(null);
  }, [grid, solveSystemToo, autoCalculate, compute]);

  const copyText = useMemo(() => {
    if (!result) return "";
    switch (result.kind) {
      case "determinant": return `det(A) = ${result.value.toString()}`;
      case "transpose": return result.result.map((r) => r.map((v) => v.toString()).join("\t")).join("\n");
      case "elimination": return result.result.map((r) => r.map((v) => v.toString()).join("\t")).join("\n");
      case "lu":
        return `L =\n${matrixToStrings(result.L).map((r) => r.join("\t")).join("\n")}\n\nU =\n${matrixToStrings(result.U).map((r) => r.join("\t")).join("\n")}`;
      case "diagonalize":
        return result.P
          ? `P =\n${matrixToStrings(result.P).map((r) => r.join("\t")).join("\n")}\n\nD =\n${matrixToStrings(result.D).map((r) => r.join("\t")).join("\n")}`
          : `Eigenvalues: ${result.eigen.map((e) => formatEigenvalue(e)).join(", ")}`;
      case "inverse":
        return result.inverse ? matrixToStrings(result.inverse).map((r) => r.join("\t")).join("\n") : "Not invertible";
      default: return "";
    }
  }, [result]);

  return (
    <div className="space-y-6">
      <MatrixInput
        grid={grid}
        onChange={setGrid}
        rows={rows}
        cols={cols}
        onResize={handleResize}
        square={config.square}
        augmented={augmented && solveSystemToo}
        label={augmented && solveSystemToo ? "Augmented matrix [A | b]" : "Matrix A"}
        maxSize={mode === "diagonalize" ? 5 : 8}
      />

      {mode === "gaussian" && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={solveSystemToo}
            onChange={(e) => setSolveSystemToo(e.target.checked)}
            className="rounded"
          />
          Treat the last column as the constants of a linear system and solve for the variables
        </label>
      )}

      {presets.length > 0 && (
        <Presets
          items={presets}
          onPick={(item) => {
            const g = toGrid(item.matrix);
            setRows(g.length);
            setCols(g[0].length);
            setGrid(g);
          }}
        />
      )}

      {!autoCalculate && (
        <Button onClick={compute} className="w-full">
          {config.action}
        </Button>
      )}

      <ErrorNote>{error}</ErrorNote>

      {result && <MatrixResult result={result} copyText={copyText} mode={mode} />}
    </div>
  );
};

/* ------------------------------------------------------------------ */

const MatrixResult = ({ result, copyText, mode }) => (
  <div className="space-y-6">
    {result.kind === "determinant" && (
      <>
        <ResultBanner label="Determinant" value={`det(A) = ${result.value.toString()}`}
          note={
            result.value.isZero()
              ? "The determinant is zero, so this matrix is singular: it has no inverse and its rows are linearly dependent."
              : `Non-zero determinant, so the matrix is invertible.${result.value.isInt() ? "" : ` As a decimal: ${result.value.toDecimal()}.`}`
          }
        />
        <StepList
          steps={result.steps}
          renderStep={(step) => (
            <div>
              <div className="font-semibold mb-1">{step.desc}</div>
              <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">{step.detail}</p>
              {step.matrix && <MatrixDisplay matrix={step.matrix} />}
            </div>
          )}
        />
      </>
    )}

    {result.kind === "transpose" && (
      <>
        <div className="flex flex-wrap items-center gap-6">
          <MatrixDisplay matrix={result.A} label="A" />
          <span className="text-2xl text-accent-primary">→</span>
          <MatrixDisplay matrix={result.result} label="Aᵀ" />
        </div>
        <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
          The {result.A.length}×{result.A[0].length} matrix becomes {result.result.length}×{result.result[0].length}: entry
          a<sub>ij</sub> moves to position (j, i).
        </p>
        <StepList
          steps={result.steps}
          renderStep={(step) => (
            <div>
              <div className="font-semibold mb-1">{step.desc}</div>
              <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">{step.detail}</p>
            </div>
          )}
        />
      </>
    )}

    {result.kind === "elimination" && (
      <>
        <Card title={result.reduced ? "Reduced row echelon form" : "Row echelon form"}>
          <MatrixDisplay matrix={result.result} highlight={(i, j) => result.pivots.some((p) => p.row === i && p.col === j)} />
          <p className="mt-3 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
            Rank = {result.rank} (pivot positions are highlighted).
          </p>
        </Card>

        {result.solved && (
          <Card title="Solution of the system" tone={result.solved.type === "none" ? "warning" : "success"}>
            {result.solved.type === "none" ? (
              <p>The system is inconsistent — one row reduces to 0 = 1, so there is no solution.</p>
            ) : (
              <>
                <ul className="space-y-1 font-mono">
                  {formatSolution(result.solved).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
                {result.solved.type === "infinite" && (
                  <p className="mt-3 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                    There are {result.solved.freeVars.length} free variable
                    {result.solved.freeVars.length === 1 ? "" : "s"} ({result.solved.freeVars.map((f) => varName(f)).join(", ")}),
                    so the system has infinitely many solutions.
                  </p>
                )}
              </>
            )}
          </Card>
        )}

        <StepList
          steps={result.steps}
          renderStep={(step) => (
            <div>
              <div className="font-semibold mb-1 font-mono text-sm">{step.desc}</div>
              <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">{step.detail}</p>
              <MatrixDisplay matrix={step.matrix} />
            </div>
          )}
        />
      </>
    )}

    {result.kind === "lu" && (
      <>
        <Card title={result.permuted ? "PA = LU" : "A = LU"}>
          <div className="flex flex-wrap items-center gap-6">
            <MatrixDisplay matrix={result.L} label="L" />
            <MatrixDisplay matrix={result.U} label="U" />
            {result.permuted && <MatrixDisplay matrix={result.P} label="P" />}
          </div>
          <p className="mt-4 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
            L is unit lower triangular (1s on the diagonal, the elimination multipliers below);
            U is the upper triangular result of forward elimination.
            {result.permuted && " A zero pivot forced a row swap, recorded in the permutation matrix P."}
          </p>
        </Card>

        <Card title="Check" tone="success">
          <div className="flex flex-wrap items-center gap-4">
            <MatrixDisplay matrix={result.product} label="LU" />
          </div>
          <p className="mt-3 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
            Multiplying L by U returns {result.permuted ? "PA" : "the original matrix A"} — the factorisation checks out.
            det(A) = product of U's diagonal = {result.determinant.toString()}.
          </p>
        </Card>

        <StepList
          steps={result.steps}
          renderStep={(step) => (
            <div>
              <div className="font-semibold mb-1 font-mono text-sm">{step.desc}</div>
              <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">{step.detail}</p>
              <MatrixDisplay matrix={step.matrix} />
            </div>
          )}
        />
      </>
    )}

    {result.kind === "diagonalize" && <DiagonalizeResult result={result} />}

    {result.kind === "inverse" && (
      <>
        {result.inverse ? (
          <>
            <div className="flex flex-wrap items-center gap-6">
              <MatrixDisplay matrix={result.A} label="A" />
              <span className="text-2xl text-accent-primary">→</span>
              <MatrixDisplay matrix={result.inverse} label="A⁻¹" />
            </div>
            <Card title="Check" tone="success">
              <MatrixDisplay matrix={result.check} label="A · A⁻¹" />
            </Card>
          </>
        ) : (
          <Card tone="warning" title="This matrix has no inverse">
            <p>The determinant is zero, so the matrix is singular and cannot be inverted.</p>
          </Card>
        )}
      </>
    )}

    {copyText && (
      <div className="flex justify-end">
        <CopyButton text={copyText} />
      </div>
    )}
  </div>
);

const DiagonalizeResult = ({ result }) => (
  <div className="space-y-6">
    <Card title="Characteristic polynomial">
      <p className="font-mono text-lg">det(A − λI) = {result.charPolyString} = 0</p>
      <p className="mt-2 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
        Trace = {result.trace.toString()} (sum of eigenvalues), and the constant term gives the determinant.
      </p>
    </Card>

    <Card title="Eigenvalues and eigenvectors">
      <div className="space-y-4">
        {result.eigen.map((e, i) => (
          <div key={i} className="rounded-lg bg-surface-light-hover dark:bg-surface-dark p-4">
            <div className="font-display font-semibold">
              λ{i + 1} = {formatEigenvalue(e)}
              <span className="ml-2 text-sm font-normal text-content-light-dimmed dark:text-content-dark-dimmed">
                algebraic multiplicity {e.algebraic}
                {e.geometric !== undefined && `, geometric multiplicity ${e.geometric}`}
              </span>
            </div>
            {e.complex ? (
              <p className="mt-2 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                Complex eigenvalue — the matrix is not diagonalizable over the real numbers (it is over ℂ).
              </p>
            ) : (
              <div className="mt-2 space-y-1 font-mono text-sm">
                {(e.vectors.length ? e.vectors : e.numericVectors).map((v, k) => (
                  <div key={k}>v{i + 1}{e.vectors.length + e.numericVectors.length > 1 ? `,${k + 1}` : ""} = {formatVector(v)}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>

    {result.diagonalizable && result.P ? (
      <>
        <Card title="Diagonalization A = PDP⁻¹" tone="accent">
          <div className="flex flex-wrap items-center gap-6">
            <MatrixDisplay matrix={result.P} label="P" />
            <MatrixDisplay matrix={result.D} label="D" />
            {result.Pinv && <MatrixDisplay matrix={result.Pinv} label="P⁻¹" />}
          </div>
          <p className="mt-4 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
            P's columns are the eigenvectors, in the same order as the eigenvalues on D's diagonal.
          </p>
        </Card>
        {result.verification && (
          <Card title="Check" tone="success">
            <MatrixDisplay matrix={result.verification} label="PDP⁻¹" />
            <p className="mt-3 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
              This returns the original matrix A, confirming the diagonalization.
            </p>
          </Card>
        )}
      </>
    ) : (
      <Card tone="warning" title="Not diagonalizable over ℝ">
        <p className="text-sm">
          {result.hasComplex
            ? "The characteristic polynomial has complex roots, so no real matrix P diagonalizes this matrix. It can still be diagonalized over the complex numbers."
            : "At least one eigenvalue has fewer independent eigenvectors than its multiplicity (a defective eigenvalue), so there is no basis of eigenvectors. The closest you can get is Jordan normal form."}
        </p>
      </Card>
    )}
  </div>
);

export default MatrixCalculator;
