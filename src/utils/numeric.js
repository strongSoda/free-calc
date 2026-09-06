// src/utils/numeric.js
// Numerical integration and root-finding shared by the calculus calculators.

/** Gauss–Legendre nodes/weights on [-1, 1], computed with Newton on Legendre P_n. */
const gaussCache = new Map();
export const gaussLegendre = (n) => {
  if (gaussCache.has(n)) return gaussCache.get(n);
  const nodes = new Array(n);
  const weights = new Array(n);
  for (let i = 0; i < n; i++) {
    let x = Math.cos((Math.PI * (i + 0.75)) / (n + 0.5));
    let dp = 0;
    for (let iter = 0; iter < 100; iter++) {
      let p0 = 1;
      let p1 = 0;
      for (let j = 0; j < n; j++) {
        const p2 = p1;
        p1 = p0;
        p0 = ((2 * j + 1) * x * p1 - j * p2) / (j + 1);
      }
      dp = (n * (x * p0 - p1)) / (x * x - 1);
      const dx = -p0 / dp;
      x += dx;
      if (Math.abs(dx) < 1e-15) break;
    }
    nodes[i] = x;
    weights[i] = 2 / ((1 - x * x) * dp * dp);
  }
  const out = { nodes, weights };
  gaussCache.set(n, out);
  return out;
};

/** ∫ f(x) dx over [a, b] with n-point Gauss–Legendre. */
export const integrate1D = (f, a, b, n = 60) => {
  if (a === b) return 0;
  const { nodes, weights } = gaussLegendre(n);
  const half = (b - a) / 2;
  const mid = (a + b) / 2;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const v = f(mid + half * nodes[i]);
    if (!Number.isFinite(v)) continue;
    sum += weights[i] * v;
  }
  return sum * half;
};

/** Adaptive Simpson — better on integrands with kinks or mild singularities. */
export const adaptiveSimpson = (f, a, b, tol = 1e-10, maxDepth = 22) => {
  const simpson = (lo, hi, flo, fmid, fhi) => ((hi - lo) / 6) * (flo + 4 * fmid + fhi);
  const safe = (x) => {
    const v = f(x);
    return Number.isFinite(v) ? v : 0;
  };
  const recurse = (lo, hi, flo, fmid, fhi, whole, depth) => {
    const mid = (lo + hi) / 2;
    const lmid = (lo + mid) / 2;
    const rmid = (mid + hi) / 2;
    const flmid = safe(lmid);
    const frmid = safe(rmid);
    const left = simpson(lo, mid, flo, flmid, fmid);
    const right = simpson(mid, hi, fmid, frmid, fhi);
    if (depth <= 0 || Math.abs(left + right - whole) <= 15 * tol) {
      return left + right + (left + right - whole) / 15;
    }
    return (
      recurse(lo, mid, flo, flmid, fmid, left, depth - 1) +
      recurse(mid, hi, fmid, frmid, fhi, right, depth - 1)
    );
  };
  if (a === b) return 0;
  const fa = safe(a);
  const fb = safe(b);
  const fm = safe((a + b) / 2);
  return recurse(a, b, fa, fm, fb, simpson(a, b, fa, fm, fb), maxDepth);
};

/**
 * Triple integral ∫∫∫ f dz dy dx where inner limits may depend on the
 * outer variables:
 *   xLimits: [a, b]                 (numbers)
 *   yLimits: [g1(x), g2(x)]         (functions of x)
 *   zLimits: [h1(x,y), h2(x,y)]     (functions of x, y)
 */
export const integrate3D = (f, xLimits, yLimits, zLimits, n = 32) => {
  const { nodes, weights } = gaussLegendre(n);
  const [xa, xb] = xLimits;
  const xHalf = (xb - xa) / 2;
  const xMid = (xb + xa) / 2;
  let total = 0;
  for (let i = 0; i < n; i++) {
    const x = xMid + xHalf * nodes[i];
    const ya = yLimits[0](x);
    const yb = yLimits[1](x);
    const yHalf = (yb - ya) / 2;
    const yMid = (yb + ya) / 2;
    let inner = 0;
    for (let j = 0; j < n; j++) {
      const y = yMid + yHalf * nodes[j];
      const za = zLimits[0](x, y);
      const zb = zLimits[1](x, y);
      const zHalf = (zb - za) / 2;
      const zMid = (zb + za) / 2;
      let innermost = 0;
      for (let k = 0; k < n; k++) {
        const z = zMid + zHalf * nodes[k];
        const v = f(x, y, z);
        if (!Number.isFinite(v)) continue;
        innermost += weights[k] * v;
      }
      inner += weights[j] * innermost * zHalf;
    }
    total += weights[i] * inner * yHalf;
  }
  return total * xHalf;
};

/** Central-difference derivative of a single-variable function. */
export const derivative = (f, x, h = 1e-6) => {
  const step = h * Math.max(1, Math.abs(x));
  return (f(x + step) - f(x - step)) / (2 * step);
};

/** Numerical gradient of f(vector) -> number. */
export const gradient = (f, point, h = 1e-6) =>
  point.map((_, i) => {
    const step = h * Math.max(1, Math.abs(point[i]));
    const up = point.slice();
    const down = point.slice();
    up[i] += step;
    down[i] -= step;
    return (f(up) - f(down)) / (2 * step);
  });

/** Numerical Jacobian of F(vector) -> vector. */
export const jacobian = (F, point, h = 1e-6) => {
  const base = F(point);
  return base.map((_, r) =>
    point.map((_, c) => {
      const step = h * Math.max(1, Math.abs(point[c]));
      const up = point.slice();
      const down = point.slice();
      up[c] += step;
      down[c] -= step;
      return (F(up)[r] - F(down)[r]) / (2 * step);
    })
  );
};

/** Dense linear solve with partial pivoting (plain floats). */
export const solveLinear = (A, b) => {
  const n = A.length;
  const m = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let best = col;
    for (let r = col; r < n; r++) if (Math.abs(m[r][col]) > Math.abs(m[best][col])) best = r;
    if (Math.abs(m[best][col]) < 1e-14) return null;
    [m[col], m[best]] = [m[best], m[col]];
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = m[r][col] / m[col][col];
      for (let c = col; c <= n; c++) m[r][c] -= f * m[col][c];
    }
  }
  return m.map((row, i) => row[n] / row[i]);
};

/** Newton's method for F(x) = 0 with a numerical Jacobian. */
export const newtonSolve = (F, start, { tol = 1e-11, maxIter = 200 } = {}) => {
  let x = start.slice();
  for (let iter = 0; iter < maxIter; iter++) {
    let fx;
    try {
      fx = F(x);
    } catch {
      return null;
    }
    if (fx.some((v) => !Number.isFinite(v))) return null;
    const norm = Math.hypot(...fx);
    if (norm < tol) return x;
    const J = jacobian(F, x);
    if (J.some((row) => row.some((v) => !Number.isFinite(v)))) return null;
    const delta = solveLinear(J, fx.map((v) => -v));
    if (!delta) return null;
    // Damped step keeps wild starting guesses from diverging.
    let lambda = 1;
    let next = x.map((v, i) => v + delta[i]);
    for (let t = 0; t < 20; t++) {
      try {
        const trial = F(next);
        if (trial.every(Number.isFinite) && Math.hypot(...trial) < norm) break;
      } catch { /* fall through and shrink the step */ }
      lambda /= 2;
      next = x.map((v, i) => v + lambda * delta[i]);
    }
    if (next.every((v, i) => Math.abs(v - x[i]) < 1e-14)) return F(next).every((v) => Math.abs(v) < 1e-7) ? next : null;
    x = next;
    if (x.some((v) => !Number.isFinite(v) || Math.abs(v) > 1e8)) return null;
  }
  const fx = F(x);
  return fx.every((v) => Math.abs(v) < 1e-6) ? x : null;
};

export const roundNice = (x, places = 6) => {
  if (!Number.isFinite(x)) return x;
  const r = parseFloat(x.toFixed(places));
  return Object.is(r, -0) ? 0 : r;
};

/** Recognises common closed forms so results read like textbook answers. */
export const recognizeClosedForm = (value, tol = 1e-7) => {
  if (!Number.isFinite(value)) return null;
  if (Math.abs(value) < tol) return "0";
  const named = [
    { v: Math.PI, s: "π" },
    { v: Math.E, s: "e" },
    { v: Math.sqrt(2), s: "√2" },
    { v: Math.sqrt(3), s: "√3" },
    { v: Math.log(2), s: "ln 2" },
  ];
  for (const { v, s } of named) {
    for (let num = 1; num <= 64; num++) {
      for (let den = 1; den <= 48; den++) {
        for (const sign of [1, -1]) {
          const candidate = (sign * num * v) / den;
          if (Math.abs(candidate - value) < tol * Math.max(1, Math.abs(value))) {
            const coeff = num === 1 && den === 1 ? "" : num === 1 ? "" : String(num);
            const body = den === 1 ? `${coeff}${s}` : `${coeff}${s}/${den}`;
            return `${sign < 0 ? "-" : ""}${body}`;
          }
        }
      }
    }
  }
  // Simple rationals
  for (let den = 1; den <= 64; den++) {
    const num = value * den;
    if (Math.abs(num - Math.round(num)) < tol * Math.max(1, Math.abs(num))) {
      const n = Math.round(num);
      if (den === 1) return String(n);
      return `${n}/${den}`;
    }
  }
  return null;
};
