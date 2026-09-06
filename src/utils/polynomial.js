// src/utils/polynomial.js
// Polynomials stored as arrays of Frac coefficients in ASCENDING power order:
// [c0, c1, c2] means c0 + c1·x + c2·x².
import { Frac, ZERO, ONE } from "./fraction.js";

export const trim = (p) => {
  const out = p.slice();
  while (out.length > 1 && out[out.length - 1].isZero()) out.pop();
  return out;
};

export const degree = (p) => trim(p).length - 1;
export const isZeroPoly = (p) => trim(p).every((c) => c.isZero());

export const polyAdd = (a, b) => {
  const n = Math.max(a.length, b.length);
  return trim(Array.from({ length: n }, (_, i) => (a[i] || ZERO).add(b[i] || ZERO)));
};

export const polySub = (a, b) => {
  const n = Math.max(a.length, b.length);
  return trim(Array.from({ length: n }, (_, i) => (a[i] || ZERO).sub(b[i] || ZERO)));
};

export const polyMul = (a, b) => {
  const out = Array.from({ length: a.length + b.length - 1 }, () => ZERO);
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < b.length; j++) out[i + j] = out[i + j].add(a[i].mul(b[j]));
  return trim(out);
};

export const polyScale = (p, k) => trim(p.map((c) => c.mul(k)));

// Long division: returns { quotient, remainder }
export const polyDivide = (num, den) => {
  const d = trim(den);
  if (isZeroPoly(d)) throw new Error("Division by the zero polynomial");
  let r = trim(num).slice();
  const dDeg = degree(d);
  const lead = d[dDeg];
  const qDeg = degree(r) - dDeg;
  if (qDeg < 0) return { quotient: [ZERO], remainder: trim(r) };
  const q = Array.from({ length: qDeg + 1 }, () => ZERO);
  while (degree(r) >= dDeg && !isZeroPoly(r)) {
    const rDeg = degree(r);
    const shift = rDeg - dDeg;
    const factor = r[rDeg].div(lead);
    q[shift] = factor;
    for (let i = 0; i <= dDeg; i++) r[i + shift] = r[i + shift].sub(factor.mul(d[i]));
    r = trim(r);
    if (rDeg === degree(r) && !isZeroPoly(r)) break; // safety
  }
  return { quotient: trim(q), remainder: trim(r) };
};

export const polyEval = (p, x) => {
  let out = ZERO;
  for (let i = p.length - 1; i >= 0; i--) out = out.mul(x).add(p[i]);
  return out;
};

export const polyEvalNumber = (p, x) => {
  let out = 0;
  for (let i = p.length - 1; i >= 0; i--) out = out * x + p[i].toNumber();
  return out;
};

export const polyDerivative = (p) => {
  if (p.length <= 1) return [ZERO];
  return trim(p.slice(1).map((c, i) => c.mul(new Frac(i + 1, 1))));
};

// Clears denominators and divides out the content, giving an integer
// primitive polynomial — the form rational-root search needs.
export const primitive = (p) => {
  const t = trim(p);
  let lcm = 1;
  const gcd2 = (a, b) => {
    a = Math.abs(a); b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a;
  };
  t.forEach((c) => { lcm = (lcm * c.d) / (gcd2(lcm, c.d) || 1); });
  const ints = t.map((c) => (c.n * lcm) / c.d);
  let content = 0;
  ints.forEach((v) => { content = gcd2(content, v); });
  if (!content) content = 1;
  return ints.map((v) => v / content);
};

const divisors = (n) => {
  n = Math.abs(n);
  const out = [];
  if (n === 0) return [1];
  for (let i = 1; i <= Math.min(n, 10000); i++) if (n % i === 0) out.push(i);
  return out;
};

// Rational Root Theorem: every rational root p/q has p | a0 and q | an.
export const rationalRoots = (poly) => {
  const p = trim(poly);
  if (degree(p) < 1) return [];
  const ints = primitive(p);
  const roots = [];
  let work = p.slice();

  // Peel off x = 0 roots first
  while (trim(work).length > 1 && trim(work)[0].isZero()) {
    roots.push(ZERO);
    work = trim(work).slice(1);
  }

  const a0 = ints.find((v) => v !== 0) ?? 1;
  const an = ints[ints.length - 1];
  const ps = divisors(a0);
  const qs = divisors(an);
  const candidates = [];
  ps.forEach((pp) => qs.forEach((qq) => {
    candidates.push(new Frac(pp, qq));
    candidates.push(new Frac(-pp, qq));
  }));

  for (const cand of candidates) {
    let guard = 0;
    while (degree(work) >= 1 && polyEval(work, cand).isZero() && guard++ < 20) {
      roots.push(cand);
      work = polyDivide(work, [cand.neg(), ONE]).quotient;
    }
  }
  return { roots, remaining: trim(work) };
};

/* ------------------------------------------------------------------ *
 * Numeric roots (Durand–Kerner) — handles irrational and complex roots
 * ------------------------------------------------------------------ */
const cAdd = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const cSub = (a, b) => ({ re: a.re - b.re, im: a.im - b.im });
const cMul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const cDiv = (a, b) => {
  const den = b.re * b.re + b.im * b.im;
  return { re: (a.re * b.re + a.im * b.im) / den, im: (a.im * b.re - a.re * b.im) / den };
};
const cAbs = (a) => Math.hypot(a.re, a.im);

export const numericRoots = (poly) => {
  const p = trim(poly).map((c) => c.toNumber());
  const n = p.length - 1;
  if (n < 1) return [];
  if (n === 1) return [{ re: -p[0] / p[1], im: 0 }];
  if (n === 2) {
    const [c, b, a] = p;
    const disc = b * b - 4 * a * c;
    if (disc >= 0) {
      const s = Math.sqrt(disc);
      return [{ re: (-b + s) / (2 * a), im: 0 }, { re: (-b - s) / (2 * a), im: 0 }];
    }
    const s = Math.sqrt(-disc);
    return [{ re: -b / (2 * a), im: s / (2 * a) }, { re: -b / (2 * a), im: -s / (2 * a) }];
  }

  const monic = p.map((c) => c / p[n]);
  let z = Array.from({ length: n }, (_, i) => ({
    re: 0.4 * Math.cos((2 * Math.PI * i) / n + 0.5),
    im: 0.9 * Math.sin((2 * Math.PI * i) / n + 0.5),
  })).map((v, i) => ({ re: v.re + 0.9 * Math.cos(i), im: v.im + 0.4 }));

  const evalAt = (x) => {
    let out = { re: 0, im: 0 };
    for (let i = n; i >= 0; i--) out = cAdd(cMul(out, x), { re: monic[i], im: 0 });
    return out;
  };

  for (let iter = 0; iter < 500; iter++) {
    let maxDelta = 0;
    for (let i = 0; i < n; i++) {
      let den = { re: 1, im: 0 };
      for (let j = 0; j < n; j++) if (i !== j) den = cMul(den, cSub(z[i], z[j]));
      if (cAbs(den) < 1e-300) continue;
      const delta = cDiv(evalAt(z[i]), den);
      z[i] = cSub(z[i], delta);
      maxDelta = Math.max(maxDelta, cAbs(delta));
    }
    if (maxDelta < 1e-14) break;
  }

  return z
    .map((r) => ({ re: Math.abs(r.re) < 1e-10 ? 0 : r.re, im: Math.abs(r.im) < 1e-9 ? 0 : r.im }))
    .sort((a, b) => a.re - b.re || a.im - b.im);
};

// Exact rational roots where possible, numeric otherwise. Each entry is
// { value: Frac|null, re, im, multiplicity, exact }
export const solveRoots = (poly) => {
  const { roots: rats, remaining } = rationalRoots(poly);
  const out = [];
  const push = (entry) => {
    const match = out.find(
      (o) => Math.abs(o.re - entry.re) < 1e-9 && Math.abs(o.im - entry.im) < 1e-9
    );
    if (match) match.multiplicity += 1;
    else out.push({ ...entry, multiplicity: 1 });
  };
  rats.forEach((r) => push({ value: r, re: r.toNumber(), im: 0, exact: true }));
  if (degree(remaining) >= 1) {
    numericRoots(remaining).forEach((r) => push({ value: null, re: r.re, im: r.im, exact: false }));
  }
  return out.sort((a, b) => a.re - b.re || a.im - b.im);
};

/* ------------------------------------------------------------------ *
 * Formatting
 * ------------------------------------------------------------------ */
export const polyToString = (p, variable = "x") => {
  const t = trim(p);
  if (isZeroPoly(t)) return "0";
  const parts = [];
  for (let i = t.length - 1; i >= 0; i--) {
    const c = t[i];
    if (c.isZero()) continue;
    const abs = c.abs();
    const sign = c.n < 0 ? "-" : "+";
    let body;
    const power = i === 0 ? "" : i === 1 ? variable : `${variable}^${i}`;
    if (i === 0) body = abs.toString();
    else if (abs.isOne()) body = power;
    else body = abs.isInt() ? `${abs.toString()}${power}` : `(${abs.toString()})${power}`;
    parts.push(parts.length === 0 ? (sign === "-" ? `-${body}` : body) : ` ${sign} ${body}`);
  }
  return parts.join("");
};

export const polyToLatex = (p, variable = "x") => {
  const t = trim(p);
  if (isZeroPoly(t)) return "0";
  const parts = [];
  for (let i = t.length - 1; i >= 0; i--) {
    const c = t[i];
    if (c.isZero()) continue;
    const abs = c.abs();
    const sign = c.n < 0 ? "-" : "+";
    const power = i === 0 ? "" : i === 1 ? variable : `${variable}^{${i}}`;
    let body;
    if (i === 0) body = abs.toLatex();
    else if (abs.isOne()) body = power;
    else body = `${abs.toLatex()}${power}`;
    parts.push(parts.length === 0 ? (sign === "-" ? `-${body}` : body) : ` ${sign} ${body}`);
  }
  return parts.join("");
};

// Parse "x^3 - 2x + 1" or "2x^2+3x-5" into ascending Frac coefficients.
export const parsePolynomial = (input, variable = "x") => {
  let s = String(input).replace(/\s+/g, "").replace(/\*\*/g, "^").replace(/\*/g, "");
  if (!s) return [ZERO];
  s = s.replace(new RegExp(`${variable}`, "g"), "x");
  if (!/^[-+0-9x^./]*$/.test(s)) throw new Error(`Could not read the polynomial "${input}"`);
  const coeffs = [];
  const setCoeff = (power, value) => {
    while (coeffs.length <= power) coeffs.push(ZERO);
    coeffs[power] = coeffs[power].add(value);
  };
  // Split on + / - that start a new term
  const terms = s.match(/[+-]?[^+-]+/g) || [];
  for (const raw of terms) {
    const term = raw.trim();
    if (!term || term === "+" || term === "-") continue;
    if (!term.includes("x")) {
      setCoeff(0, Frac.parse(term));
      continue;
    }
    const [coefPart, powPart] = term.split("x");
    let coef;
    if (coefPart === "" || coefPart === "+") coef = ONE;
    else if (coefPart === "-") coef = ONE.neg();
    else coef = Frac.parse(coefPart);
    let power = 1;
    if (powPart && powPart.startsWith("^")) power = parseInt(powPart.slice(1), 10);
    else if (powPart) throw new Error(`Could not read the term "${term}"`);
    if (!Number.isFinite(power) || power < 0 || power > 20) throw new Error(`Unsupported power in "${term}"`);
    setCoeff(power, coef);
  }
  return trim(coeffs.length ? coeffs : [ZERO]);
};

/* ------------------------------------------------------------------ *
 * Factored-form parsing: builds a polynomial by evaluating a parsed
 * expression symbolically, so "(x+1)^2(x-3)" and "2s(s^2+4)" work.
 * ------------------------------------------------------------------ */
import { parse as parseExpr } from "./expression.js";

const polyFromAst = (node, variable) => {
  switch (node.type) {
    case "number":
      return [Frac.fromNumber(node.value)];
    case "variable":
      if (node.name !== variable) throw new Error(`Expected the variable "${variable}" but found "${node.name}"`);
      return [ZERO, ONE];
    case "unary":
      return polyScale(polyFromAst(node.operand, variable), ONE.neg());
    case "binary": {
      const a = polyFromAst(node.left, variable);
      if (node.op === "^") {
        if (node.right.type !== "number" || !Number.isInteger(node.right.value) || node.right.value < 0 || node.right.value > 20)
          throw new Error("Exponents must be whole numbers from 0 to 20");
        let out = [ONE];
        for (let i = 0; i < node.right.value; i++) out = polyMul(out, a);
        return out;
      }
      const b = polyFromAst(node.right, variable);
      if (node.op === "+") return polyAdd(a, b);
      if (node.op === "-") return polySub(a, b);
      if (node.op === "*") return polyMul(a, b);
      if (node.op === "/") {
        if (degree(b) > 0) throw new Error("Division by a non-constant is not allowed here — enter it as a numerator over a denominator");
        return polyScale(a, ONE.div(b[0]));
      }
      throw new Error(`Unsupported operator "${node.op}"`);
    }
    default:
      throw new Error("Only polynomials are supported here");
  }
};

/** Accepts expanded ("x^2-4") or factored ("(x-2)(x+2)") input. */
export const parsePolyExpression = (input, variable = "x") => {
  const s = String(input).trim();
  if (!s) return [ZERO];
  return trim(polyFromAst(parseExpr(s), variable));
};
