// src/utils/eigen.js
// Characteristic polynomial, eigenvalues, eigenvectors and diagonalisation.
import { Frac, frac, ZERO, ONE } from "./fraction.js";
import { identity, multiply, cloneMatrix, eliminate, inverse, matrixToLatex } from "./matrixMath.js";
import { polyToString, polyToLatex, solveRoots, trim } from "./polynomial.js";

const trace = (m) => m.reduce((s, row, i) => s.add(row[i]), ZERO);
const scale = (m, k) => m.map((row) => row.map((v) => v.mul(k)));
const subtract = (a, b) => a.map((row, i) => row.map((v, j) => v.sub(b[i][j])));

/**
 * Faddeev–LeVerrier: exact characteristic polynomial det(A − λI) with no
 * symbolic expansion needed. Returns ascending Frac coefficients in λ.
 */
export const characteristicPolynomial = (A) => {
  const n = A.length;
  let M = identity(n);
  const c = Array.from({ length: n + 1 }, () => ZERO);
  c[n] = ONE; // coefficient of λ^n before sign correction
  let Mk = identity(n);
  const coeffs = [ONE];
  for (let k = 1; k <= n; k++) {
    Mk = multiply(A, k === 1 ? identity(n) : Mk);
    const ck = trace(Mk).mul(new Frac(-1, k));
    coeffs.push(ck);
    Mk = Mk.map((row, i) => row.map((v, j) => (i === j ? v.add(ck) : v)));
  }
  // coeffs are for det(λI − A) = λ^n + c1 λ^(n-1) + ... + cn, descending.
  const ascending = coeffs.slice().reverse();
  // det(A − λI) = (−1)^n det(λI − A); use det(λI − A) for nicer monic output.
  return trim(ascending);
};

/** Null space of M as a list of exact basis vectors (arrays of Frac). */
export const nullSpace = (M) => {
  const { result, pivots } = eliminate(M, { reduced: true });
  const cols = M[0].length;
  const pivotCols = pivots.map((p) => p.col);
  const freeCols = [];
  for (let c = 0; c < cols; c++) if (!pivotCols.includes(c)) freeCols.push(c);

  return freeCols.map((free) => {
    const v = Array.from({ length: cols }, () => ZERO);
    v[free] = ONE;
    pivots.forEach(({ row, col }) => {
      v[col] = result[row][free].neg();
    });
    return clearDenominators(v);
  });
};

/** Scales a rational vector to the smallest integer entries (nicer to read). */
export const clearDenominators = (v) => {
  const gcd2 = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  let lcm = 1;
  v.forEach((x) => { lcm = (lcm * x.d) / (gcd2(lcm, x.d) || 1); });
  const ints = v.map((x) => x.mul(new Frac(lcm, 1)));
  let g = 0;
  ints.forEach((x) => { g = gcd2(g, x.n); });
  if (!g) return ints;
  let out = ints.map((x) => x.div(new Frac(g, 1)));
  const firstNonZero = out.find((x) => !x.isZero());
  if (firstNonZero && firstNonZero.n < 0) out = out.map((x) => x.neg());
  return out;
};

/** Float null space, used when an eigenvalue is irrational. */
const nullSpaceNumeric = (M, tol = 1e-9) => {
  const rows = M.length;
  const cols = M[0].length;
  const a = M.map((r) => r.slice());
  const pivots = [];
  let row = 0;
  for (let col = 0; col < cols && row < rows; col++) {
    let best = row;
    for (let r = row; r < rows; r++) if (Math.abs(a[r][col]) > Math.abs(a[best][col])) best = r;
    if (Math.abs(a[best][col]) < tol) continue;
    [a[row], a[best]] = [a[best], a[row]];
    const p = a[row][col];
    for (let c = 0; c < cols; c++) a[row][c] /= p;
    for (let r = 0; r < rows; r++) {
      if (r === row) continue;
      const f = a[r][col];
      if (Math.abs(f) < tol) continue;
      for (let c = 0; c < cols; c++) a[r][c] -= f * a[row][c];
    }
    pivots.push({ row, col });
    row++;
  }
  const pivotCols = pivots.map((p) => p.col);
  const free = [];
  for (let c = 0; c < cols; c++) if (!pivotCols.includes(c)) free.push(c);
  return free.map((f) => {
    const v = Array.from({ length: cols }, () => 0);
    v[f] = 1;
    pivots.forEach(({ row: r, col: c }) => { v[c] = -a[r][f]; });
    const norm = Math.hypot(...v) || 1;
    return v.map((x) => x / norm);
  });
};

export const formatEigenvalue = (e, places = 6) => {
  if (e.value) return e.value.toString();
  if (Math.abs(e.im) > 1e-9) {
    const re = parseFloat(e.re.toFixed(places));
    const im = parseFloat(Math.abs(e.im).toFixed(places));
    return `${re} ${e.im < 0 ? "−" : "+"} ${im}i`;
  }
  return String(parseFloat(e.re.toFixed(places)));
};

export const formatVector = (v) =>
  `(${v.map((x) => (x instanceof Frac ? x.toString() : String(parseFloat(x.toFixed(6))))).join(", ")})`;

/**
 * Full eigen analysis. Returns eigenvalues with algebraic + geometric
 * multiplicity, eigenvectors, and — when possible — P and D with A = PDP⁻¹.
 */
export const eigenAnalysis = (A) => {
  const n = A.length;
  if (n !== A[0].length) throw new Error("Eigenvalues require a square matrix");

  const charPoly = characteristicPolynomial(A);
  const roots = solveRoots(charPoly);
  const hasComplex = roots.some((r) => Math.abs(r.im) > 1e-9);

  const eigen = roots.map((r) => {
    const entry = {
      value: r.value || null,
      re: r.re,
      im: r.im,
      exact: r.exact,
      algebraic: r.multiplicity,
      vectors: [],
      numericVectors: [],
      complex: Math.abs(r.im) > 1e-9,
    };
    if (entry.complex) return entry;

    if (r.value) {
      const shifted = A.map((row, i) => row.map((v, j) => (i === j ? v.sub(r.value) : v)));
      entry.shifted = shifted;
      entry.vectors = nullSpace(shifted);
      entry.geometric = entry.vectors.length;
    } else {
      const shifted = A.map((row, i) => row.map((v, j) => v.toNumber() - (i === j ? r.re : 0)));
      entry.shiftedNumeric = shifted;
      entry.numericVectors = nullSpaceNumeric(shifted);
      entry.geometric = entry.numericVectors.length;
    }
    return entry;
  });

  const totalGeometric = eigen.reduce((s, e) => s + (e.geometric || 0), 0);
  const allExact = eigen.every((e) => e.exact && !e.complex);
  const diagonalizable = !hasComplex && totalGeometric === n;

  let P = null;
  let D = null;
  let Pinv = null;
  let verification = null;

  if (diagonalizable && allExact) {
    const columns = [];
    const diag = [];
    eigen.forEach((e) => {
      e.vectors.forEach((v) => {
        columns.push(v);
        diag.push(e.value);
      });
    });
    P = Array.from({ length: n }, (_, i) => columns.map((col) => col[i]));
    D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? diag[i] : ZERO)));
    Pinv = inverse(P);
    if (Pinv) verification = multiply(multiply(P, D), Pinv);
  }

  return {
    charPoly,
    charPolyString: polyToString(charPoly, "λ"),
    charPolyLatex: polyToLatex(charPoly, "\\lambda"),
    eigen,
    diagonalizable,
    exact: allExact,
    hasComplex,
    P,
    D,
    Pinv,
    verification,
    trace: trace(A),
    determinantFromEigen: eigen.reduce((prod, e) => prod * Math.pow(e.re, e.algebraic), 1),
  };
};
