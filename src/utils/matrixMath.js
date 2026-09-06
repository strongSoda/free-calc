// src/utils/matrixMath.js
// Exact (fraction-based) matrix routines that also record the steps, so every
// matrix calculator on the site can show a worked solution rather than a number.
import { Frac, frac, ZERO, ONE } from "./fraction.js";

export const parseMatrix = (grid) =>
  grid.map((row) => row.map((cell) => Frac.parse(cell === "" || cell == null ? "0" : cell)));

export const cloneMatrix = (m) => m.map((row) => row.slice());

export const identity = (n) =>
  Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? ONE : ZERO)));

export const zeros = (rows, cols) =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => ZERO));

export const matrixToStrings = (m) => m.map((row) => row.map((v) => v.toString()));

export const matrixToLatex = (m) =>
  `\\begin{bmatrix}${m.map((row) => row.map((v) => v.toLatex()).join(" & ")).join(" \\\\ ")}\\end{bmatrix}`;

export const multiply = (a, b) => {
  const rows = a.length;
  const inner = b.length;
  const cols = b[0].length;
  const out = zeros(rows, cols);
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++) {
      let sum = ZERO;
      for (let k = 0; k < inner; k++) sum = sum.add(a[i][k].mul(b[k][j]));
      out[i][j] = sum;
    }
  return out;
};

/* ------------------------------------------------------------------ *
 * Transpose
 * ------------------------------------------------------------------ */
export const transpose = (m) => m[0].map((_, j) => m.map((row) => row[j]));

export const transposeWithSteps = (m) => {
  const result = transpose(m);
  const steps = result.map((row, i) => ({
    desc: `Row ${i + 1} of Aᵀ = column ${i + 1} of A`,
    detail: `Column ${i + 1} of A is (${m.map((r) => r[i].toString()).join(", ")}), which becomes row ${i + 1} of the transpose.`,
  }));
  return { result, steps };
};

/* ------------------------------------------------------------------ *
 * Determinant — cofactor expansion for small matrices (readable steps),
 * row reduction for larger ones (fast + still exact).
 * ------------------------------------------------------------------ */
export const minorMatrix = (m, row, col) =>
  m.filter((_, i) => i !== row).map((r) => r.filter((_, j) => j !== col));

export const determinant = (m) => {
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0].mul(m[1][1]).sub(m[0][1].mul(m[1][0]));
  let det = ZERO;
  for (let j = 0; j < n; j++) {
    if (m[0][j].isZero()) continue;
    const sign = j % 2 === 0 ? ONE : ONE.neg();
    det = det.add(sign.mul(m[0][j]).mul(determinant(minorMatrix(m, 0, j))));
  }
  return det;
};

export const determinantWithSteps = (m) => {
  const n = m.length;
  if (n !== m[0].length) throw new Error("Determinant requires a square matrix");
  const steps = [];

  if (n === 1) {
    steps.push({
      desc: "1×1 determinant",
      detail: `The determinant of a 1×1 matrix is its only entry: ${m[0][0].toString()}.`,
      formula: `\\det(A) = ${m[0][0].toLatex()}`,
    });
    return { value: m[0][0], steps, method: "direct" };
  }

  if (n === 2) {
    const [[a, b], [c, d]] = m;
    const ad = a.mul(d);
    const bc = b.mul(c);
    steps.push({
      desc: "Apply the 2×2 rule",
      detail: `For a 2×2 matrix, det = ad − bc.`,
      formula: `\\det(A) = (${a.toLatex()})(${d.toLatex()}) - (${b.toLatex()})(${c.toLatex()})`,
    });
    steps.push({
      desc: "Multiply the diagonals",
      detail: `Main diagonal product ad = ${ad.toString()}; anti-diagonal product bc = ${bc.toString()}.`,
      formula: `\\det(A) = ${ad.toLatex()} - (${bc.toLatex()}) = ${ad.sub(bc).toLatex()}`,
    });
    return { value: ad.sub(bc), steps, method: "rule-of-two" };
  }

  if (n === 3) {
    // Cofactor expansion along the first row, showing each 2×2 minor.
    const terms = [];
    let det = ZERO;
    for (let j = 0; j < 3; j++) {
      const minor = minorMatrix(m, 0, j);
      const minorDet = determinant(minor);
      const sign = j % 2 === 0 ? ONE : ONE.neg();
      const term = sign.mul(m[0][j]).mul(minorDet);
      det = det.add(term);
      terms.push({ j, minor, minorDet, term });
      steps.push({
        desc: `Minor M₁${j + 1}`,
        detail: `Delete row 1 and column ${j + 1}, then take the 2×2 determinant: ${minorDet.toString()}. Cofactor sign is ${j % 2 === 0 ? "+" : "−"}, and a₁${j + 1} = ${m[0][j].toString()}, giving the term ${term.toString()}.`,
        formula: `${matrixToLatex(minor)} \\Rightarrow ${minorDet.toLatex()}`,
      });
    }
    steps.unshift({
      desc: "Expand along the first row",
      detail: "Each entry of row 1 is multiplied by its 2×2 minor, with alternating + − + signs.",
      formula: `\\det(A) = a_{11}M_{11} - a_{12}M_{12} + a_{13}M_{13}`,
    });
    steps.push({
      desc: "Add the cofactor terms",
      detail: `${terms.map((t) => t.term.toString()).join(" + ")} = ${det.toString()}`,
      formula: `\\det(A) = ${det.toLatex()}`,
    });
    return { value: det, steps, method: "cofactor" };
  }

  // n >= 4: row reduce to upper triangular, determinant is the product of
  // pivots corrected by the number of row swaps.
  const a = cloneMatrix(m);
  let sign = ONE;
  let swaps = 0;
  for (let col = 0; col < n; col++) {
    let pivot = -1;
    for (let r = col; r < n; r++) {
      if (!a[r][col].isZero()) {
        pivot = r;
        break;
      }
    }
    if (pivot === -1) {
      steps.push({
        desc: `Column ${col + 1} has no pivot`,
        detail: "An all-zero column below the diagonal means the rows are linearly dependent, so the determinant is 0.",
        matrix: cloneMatrix(a),
      });
      return { value: ZERO, steps, method: "row-reduction" };
    }
    if (pivot !== col) {
      [a[pivot], a[col]] = [a[col], a[pivot]];
      sign = sign.neg();
      swaps++;
      steps.push({
        desc: `R${col + 1} ↔ R${pivot + 1}`,
        detail: "Each row swap flips the sign of the determinant.",
        matrix: cloneMatrix(a),
      });
    }
    for (let r = col + 1; r < n; r++) {
      if (a[r][col].isZero()) continue;
      const factor = a[r][col].div(a[col][col]);
      for (let c = col; c < n; c++) a[r][c] = a[r][c].sub(factor.mul(a[col][c]));
      steps.push({
        desc: `R${r + 1} = R${r + 1} − (${factor.toString()})R${col + 1}`,
        detail: "Adding a multiple of one row to another leaves the determinant unchanged.",
        matrix: cloneMatrix(a),
      });
    }
  }
  let det = sign;
  for (let i = 0; i < n; i++) det = det.mul(a[i][i]);
  steps.push({
    desc: "Multiply the diagonal",
    detail: `The determinant of a triangular matrix is the product of its diagonal entries, times (−1) for each of the ${swaps} row swap${swaps === 1 ? "" : "s"}.`,
    formula: `\\det(A) = ${swaps % 2 ? "-" : ""}${a.map((row, i) => `(${row[i].toLatex()})`).join(" \\cdot ")} = ${det.toLatex()}`,
  });
  return { value: det, steps, method: "row-reduction" };
};

/* ------------------------------------------------------------------ *
 * Gaussian elimination (row echelon) and Gauss-Jordan (RREF)
 * ------------------------------------------------------------------ */
export const eliminate = (m, { reduced = false } = {}) => {
  const a = cloneMatrix(m);
  const rows = a.length;
  const cols = a[0].length;
  const steps = [];
  const pivots = [];
  let row = 0;

  for (let col = 0; col < cols && row < rows; col++) {
    let pivot = -1;
    for (let r = row; r < rows; r++) {
      if (!a[r][col].isZero()) {
        pivot = r;
        break;
      }
    }
    if (pivot === -1) continue;

    if (pivot !== row) {
      [a[pivot], a[row]] = [a[row], a[pivot]];
      steps.push({
        desc: `R${row + 1} ↔ R${pivot + 1}`,
        detail: `Swap in a row with a non-zero entry in column ${col + 1} so we have a usable pivot.`,
        matrix: cloneMatrix(a),
      });
    }

    const pivotValue = a[row][col];
    if (!pivotValue.isOne()) {
      for (let c = 0; c < cols; c++) a[row][c] = a[row][c].div(pivotValue);
      steps.push({
        desc: `R${row + 1} = R${row + 1} ÷ ${pivotValue.toString()}`,
        detail: `Scale row ${row + 1} so the pivot in column ${col + 1} becomes 1.`,
        matrix: cloneMatrix(a),
      });
    }

    for (let r = reduced ? 0 : row + 1; r < rows; r++) {
      if (r === row || a[r][col].isZero()) continue;
      const factor = a[r][col];
      for (let c = 0; c < cols; c++) a[r][c] = a[r][c].sub(factor.mul(a[row][c]));
      steps.push({
        desc: `R${r + 1} = R${r + 1} − (${factor.toString()})R${row + 1}`,
        detail: `Clear the entry in row ${r + 1}, column ${col + 1}.`,
        matrix: cloneMatrix(a),
      });
    }

    pivots.push({ row, col });
    row++;
  }

  return { result: a, steps, pivots, rank: pivots.length };
};

export const rref = (m) => eliminate(m, { reduced: true });
export const ref = (m) => eliminate(m, { reduced: false });

// Back-substitution report for an augmented system [A | b]
export const solveSystem = (m) => {
  const { result, steps, pivots, rank } = eliminate(m, { reduced: true });
  const cols = result[0].length;
  const varCount = cols - 1;
  const pivotCols = pivots.map((p) => p.col);

  // Inconsistent when a pivot lands in the augmented column
  if (pivotCols.includes(varCount)) {
    return { type: "none", result, steps, rank, pivots, solution: null, freeVars: [] };
  }

  const freeVars = [];
  for (let c = 0; c < varCount; c++) if (!pivotCols.includes(c)) freeVars.push(c);

  const solution = Array.from({ length: varCount }, () => null);
  pivots.forEach(({ row, col }) => {
    solution[col] = {
      constant: result[row][varCount],
      free: freeVars.map((f) => ({ index: f, coeff: result[row][f].neg() })).filter((t) => !t.coeff.isZero()),
    };
  });

  return {
    type: freeVars.length ? "infinite" : "unique",
    result,
    steps,
    rank,
    pivots,
    solution,
    freeVars,
  };
};

export const varName = (i) => {
  const names = ["x", "y", "z", "w", "v", "u"];
  return names[i] || `x_${i + 1}`;
};

export const formatSolution = (solve) => {
  if (solve.type === "none") return ["The system is inconsistent — no solution exists."];
  return solve.solution.map((s, i) => {
    if (!s) return `${varName(i)} is free`;
    const terms = s.free.map((t) => `${t.coeff.toString()}·${varName(t.index)}`);
    const rhs = [s.constant.toString(), ...terms].filter((t, idx) => idx === 0 || t).join(" + ");
    return `${varName(i)} = ${rhs}`;
  });
};

/* ------------------------------------------------------------------ *
 * LU decomposition (Doolittle, with partial pivoting when needed)
 * ------------------------------------------------------------------ */
export const luDecompose = (m) => {
  const n = m.length;
  if (n !== m[0].length) throw new Error("LU decomposition requires a square matrix");
  const U = cloneMatrix(m);
  const L = identity(n);
  const P = identity(n);
  const steps = [];
  let permuted = false;
  let swapCount = 0;

  for (let col = 0; col < n; col++) {
    if (U[col][col].isZero()) {
      let pivot = -1;
      for (let r = col + 1; r < n; r++) {
        if (!U[r][col].isZero()) {
          pivot = r;
          break;
        }
      }
      if (pivot === -1) continue; // singular; leave the zero column alone
      [U[pivot], U[col]] = [U[col], U[pivot]];
      [P[pivot], P[col]] = [P[col], P[pivot]];
      for (let c = 0; c < col; c++) [L[pivot][c], L[col][c]] = [L[col][c], L[pivot][c]];
      permuted = true;
      swapCount++;
      steps.push({
        desc: `R${col + 1} ↔ R${pivot + 1} (pivoting)`,
        detail: `The pivot in column ${col + 1} was zero, so rows are swapped. This is recorded in the permutation matrix P, giving PA = LU.`,
        matrix: cloneMatrix(U),
      });
    }

    for (let r = col + 1; r < n; r++) {
      if (U[r][col].isZero()) continue;
      const factor = U[r][col].div(U[col][col]);
      L[r][col] = factor;
      for (let c = col; c < n; c++) U[r][c] = U[r][c].sub(factor.mul(U[col][c]));
      steps.push({
        desc: `R${r + 1} = R${r + 1} − (${factor.toString()})R${col + 1}`,
        detail: `The multiplier ${factor.toString()} is stored at L[${r + 1}][${col + 1}]; the elimination happens in U.`,
        matrix: cloneMatrix(U),
        multiplier: factor.toString(),
      });
    }
  }

  let det = ONE;
  for (let i = 0; i < n; i++) det = det.mul(U[i][i]);
  if (swapCount % 2) det = det.neg();

  return { L, U, P, steps, permuted, determinant: det };
};

// Solve Ax = b using an existing LU factorisation
export const luSolve = ({ L, U, P }, b) => {
  const n = L.length;
  const pb = multiply(P, b.map((v) => [v]));
  const y = Array.from({ length: n }, () => ZERO);
  for (let i = 0; i < n; i++) {
    let sum = pb[i][0];
    for (let j = 0; j < i; j++) sum = sum.sub(L[i][j].mul(y[j]));
    y[i] = sum;
  }
  const x = Array.from({ length: n }, () => ZERO);
  for (let i = n - 1; i >= 0; i--) {
    if (U[i][i].isZero()) return null;
    let sum = y[i];
    for (let j = i + 1; j < n; j++) sum = sum.sub(U[i][j].mul(x[j]));
    x[i] = sum.div(U[i][i]);
  }
  return { x, y };
};

/* ------------------------------------------------------------------ *
 * Inverse via Gauss-Jordan
 * ------------------------------------------------------------------ */
export const inverse = (m) => {
  const n = m.length;
  const aug = m.map((row, i) => [...row, ...identity(n)[i]]);
  const { result, pivots } = eliminate(aug, { reduced: true });
  if (pivots.length < n || pivots.some((p) => p.col >= n)) return null;
  return result.map((row) => row.slice(n));
};
