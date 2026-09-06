// src/utils/partialFractions.js
// Exact partial fraction decomposition over the rationals:
//   1. proper/improper split by long division
//   2. factor the denominator (rational roots exactly, quadratics numerically)
//   3. solve for the unknown numerators by equating coefficients
import { Frac, ZERO, ONE } from "./fraction.js";
import {
  polyAdd, polyMul, polySub, polyDivide, polyScale, polyToString, polyToLatex,
  degree, trim, isZeroPoly, rationalRoots, numericRoots, polyEval, polyDerivative,
} from "./polynomial.js";
import { eliminate } from "./matrixMath.js";

/** Monic gcd of two polynomials over ℚ (Euclid). */
export const polyGcd = (a, b) => {
  let x = trim(a);
  let y = trim(b);
  while (!isZeroPoly(y)) {
    const { remainder } = polyDivide(x, y);
    x = y;
    y = trim(remainder);
  }
  const lead = x[degree(x)];
  return lead.isZero() ? x : polyScale(x, ONE.div(lead));
};

const monic = (p) => {
  const t = trim(p);
  const lead = t[degree(t)];
  return { poly: polyScale(t, ONE.div(lead)), leading: lead };
};

/** Yun's square-free decomposition: p = ∏ aᵢ^i with each aᵢ square-free. */
export const squareFreeDecomposition = (p) => {
  const out = [];
  const fPrime = polyDerivative(p);
  if (isZeroPoly(fPrime)) return [{ poly: p, multiplicity: 1 }];
  let a = polyGcd(p, fPrime);
  let b = polyDivide(p, a).quotient;
  let c = polyDivide(fPrime, a).quotient;
  let d = polySub(c, polyDerivative(b));
  let i = 1;
  let guard = 0;
  while (degree(b) > 0 && guard++ < 40) {
    const ai = polyGcd(b, d);
    if (degree(ai) > 0) out.push({ poly: monic(ai).poly, multiplicity: i });
    b = polyDivide(b, ai).quotient;
    c = polyDivide(d, ai).quotient;
    d = polySub(c, polyDerivative(b));
    i++;
  }
  return out;
};

/**
 * Factor a polynomial into linear factors (s - r)^m and irreducible
 * quadratic factors (s^2 + bs + c)^m, with a leading constant.
 * Repeated factors are found first (square-free decomposition) so the
 * numeric fallback only ever sees distinct roots.
 */
export const factorPolynomial = (poly) => {
  const { poly: p, leading } = monic(poly);
  const factors = [];
  let fullyFactored = true;

  squareFreeDecomposition(p).forEach(({ poly: part, multiplicity }) => {
    const { roots, remaining } = rationalRoots(part);
    roots.forEach((r) => {
      const existing = factors.find((f) => f.type === "linear" && f.root.equals(r));
      if (existing) existing.multiplicity += multiplicity;
      else factors.push({ type: "linear", root: r, multiplicity });
    });

    // What is left is square-free, so its roots are distinct.
    let rest = trim(remaining);
    let guard = 0;
    while (degree(rest) >= 2 && guard++ < 12) {
      if (degree(rest) === 2) {
        addQuadratic(factors, monic(rest).poly, multiplicity);
        rest = [ONE];
        break;
      }
      const rts = numericRoots(rest);
      const complexRoot = rts.find((r) => Math.abs(r.im) > 1e-9);
      let q;
      if (complexRoot) {
        q = [
          Frac.approximate(complexRoot.re * complexRoot.re + complexRoot.im * complexRoot.im),
          Frac.approximate(-2 * complexRoot.re),
          ONE,
        ];
      } else {
        const [r1, r2] = rts;
        q = [Frac.approximate(r1.re * r2.re), Frac.approximate(-(r1.re + r2.re)), ONE];
      }
      const { quotient, remainder } = polyDivide(rest, q);
      if (!isZeroPoly(remainder) && maxCoeff(remainder) > 1e-6) break;
      addQuadratic(factors, q, multiplicity);
      rest = trim(quotient);
    }

    if (degree(rest) === 1) {
      const root = rest[0].neg().div(rest[1]);
      const existing = factors.find((f) => f.type === "linear" && f.root.equals(root));
      if (existing) existing.multiplicity += multiplicity;
      else factors.push({ type: "linear", root, multiplicity });
      rest = [ONE];
    }
    if (degree(rest) > 0) fullyFactored = false;
  });

  return { factors, leading, fullyFactored, remainder: [ONE] };
};

const round12 = (x) => parseFloat(x.toPrecision(12));
const maxCoeff = (p) => Math.max(...trim(p).map((c) => Math.abs(c.toNumber())), 0);

const addQuadratic = (factors, q, mult) => {
  const existing = factors.find(
    (f) => f.type === "quadratic" && f.poly.length === q.length && f.poly.every((c, i) => c.equals(q[i]))
  );
  if (existing) existing.multiplicity += mult;
  else factors.push({ type: "quadratic", poly: q, multiplicity: mult });
};

export const factorToString = (f, variable = "s") => {
  if (f.type === "linear") {
    const r = f.root;
    const body = r.isZero() ? variable : `${variable} ${r.n < 0 ? "+" : "-"} ${r.abs().toString()}`;
    const wrapped = r.isZero() ? body : `(${body})`;
    return f.multiplicity > 1 ? `${wrapped}^${f.multiplicity}` : wrapped;
  }
  const body = `(${polyToString(f.poly, variable)})`;
  return f.multiplicity > 1 ? `${body}^${f.multiplicity}` : body;
};

export const factorToLatex = (f, variable = "s") => {
  if (f.type === "linear") {
    const r = f.root;
    const body = r.isZero() ? variable : `${variable} ${r.n < 0 ? "+" : "-"} ${r.abs().toLatex()}`;
    const wrapped = r.isZero() ? body : `\\left(${body}\\right)`;
    return f.multiplicity > 1 ? `${wrapped}^{${f.multiplicity}}` : wrapped;
  }
  const body = `\\left(${polyToLatex(f.poly, variable)}\\right)`;
  return f.multiplicity > 1 ? `${body}^{${f.multiplicity}}` : body;
};

const powPoly = (p, k) => {
  let out = [ONE];
  for (let i = 0; i < k; i++) out = polyMul(out, p);
  return out;
};

/**
 * Decompose numerator/denominator. Returns polynomial part, the list of
 * terms, and the worked steps.
 */
export const partialFractions = (numerator, denominator, variable = "s") => {
  const num = trim(numerator);
  const den = trim(denominator);
  if (isZeroPoly(den)) throw new Error("The denominator cannot be zero");
  const steps = [];

  // Step 1 — improper fraction?
  let properNum = num;
  let polynomialPart = null;
  if (degree(num) >= degree(den)) {
    const { quotient, remainder } = polyDivide(num, den);
    polynomialPart = quotient;
    properNum = remainder;
    steps.push({
      title: "Divide first — the fraction is improper",
      detail: `The numerator's degree (${degree(num)}) is at least the denominator's (${degree(den)}), so long division comes first: ${polyToString(num, variable)} ÷ ${polyToString(den, variable)} = ${polyToString(quotient, variable)} remainder ${polyToString(remainder, variable)}.`,
      latex: `\\frac{${polyToLatex(num, variable)}}{${polyToLatex(den, variable)}} = ${polyToLatex(quotient, variable)} + \\frac{${polyToLatex(remainder, variable)}}{${polyToLatex(den, variable)}}`,
    });
  }

  // Step 2 — factor the denominator
  const { factors, leading, fullyFactored } = factorPolynomial(den);
  if (!fullyFactored) {
    throw new Error(
      "This denominator could not be factored into linear and quadratic pieces. Try a denominator whose factors have rational or complex-conjugate roots."
    );
  }
  const factorString = factors.map((f) => factorToString(f, variable)).join("");
  steps.push({
    title: "Factor the denominator",
    detail: `${polyToString(den, variable)} factors as ${leading.isOne() ? "" : leading.toString() + "·"}${factorString}.`,
    latex: `${polyToLatex(den, variable)} = ${leading.isOne() ? "" : leading.toLatex()}${factors.map((f) => factorToLatex(f, variable)).join("")}`,
  });

  if (isZeroPoly(properNum)) {
    return { polynomialPart, terms: [], steps, factors, leading, variable };
  }

  // Step 3 — write the template with unknown coefficients
  const unknowns = [];
  factors.forEach((f, fi) => {
    for (let power = 1; power <= f.multiplicity; power++) {
      if (f.type === "linear") {
        unknowns.push({ factorIndex: fi, power, kind: "const", label: letterFor(unknowns.length) });
      } else {
        unknowns.push({ factorIndex: fi, power, kind: "linearNum", label: letterFor(unknowns.length), label2: letterFor(unknowns.length + 1) });
      }
    }
  });

  const templateParts = unknowns.map((u) => {
    const f = factors[u.factorIndex];
    const base = f.type === "linear" ? factorToLatex({ ...f, multiplicity: u.power }, variable)
                                     : factorToLatex({ ...f, multiplicity: u.power }, variable);
    const top = f.type === "linear" ? u.label : `${u.label}${variable} + ${u.label2}`;
    return `\\frac{${top}}{${base}}`;
  });
  steps.push({
    title: "Set up the decomposition",
    detail: "Every linear factor contributes one constant per power; every irreducible quadratic contributes a linear numerator per power.",
    latex: `\\frac{${polyToLatex(properNum, variable)}}{${polyToLatex(den, variable)}} = ${templateParts.join(" + ")}`,
  });

  // Step 4 — build and solve the linear system by equating coefficients
  const basis = [];
  unknowns.forEach((u) => {
    const f = factors[u.factorIndex];
    const factorPoly = f.type === "linear" ? [f.root.neg(), ONE] : f.poly;
    // D divided by factor^power, times the numerator shape
    let rest = [ONE];
    factors.forEach((g, gi) => {
      const gPoly = g.type === "linear" ? [g.root.neg(), ONE] : g.poly;
      const exponent = gi === u.factorIndex ? g.multiplicity - u.power : g.multiplicity;
      rest = polyMul(rest, powPoly(gPoly, exponent));
    });
    rest = polyScale(rest, leading);
    if (f.type === "linear") {
      basis.push(rest);
    } else {
      basis.push(polyMul(rest, [ZERO, ONE])); // coefficient of B (times s)
      basis.push(rest); // coefficient of C
    }
  });

  const size = basis.length;
  const maxDeg = Math.max(...basis.map(degree), degree(properNum));
  const rows = [];
  for (let power = 0; power <= maxDeg; power++) {
    rows.push([...basis.map((b) => b[power] || ZERO), properNum[power] || ZERO]);
  }
  const { result, pivots } = eliminate(rows, { reduced: true });
  if (pivots.length < size || pivots.some((p) => p.col >= size)) {
    throw new Error("Could not solve for the partial fraction coefficients.");
  }
  const values = Array.from({ length: size }, () => ZERO);
  pivots.forEach(({ row, col }) => {
    values[col] = result[row][size];
  });

  const systemLines = rows.map((row, power) => {
    const lhs = row
      .slice(0, size)
      .map((c, i) => (c.isZero() ? null : `${c.toString()}·${coefficientName(unknowns, i)}`))
      .filter(Boolean)
      .join(" + ");
    return `${variable}^${power}:  ${lhs || "0"} = ${row[size].toString()}`;
  });
  steps.push({
    title: "Match coefficients and solve",
    detail: `Multiplying through by the denominator and comparing powers of ${variable} gives a linear system:\n${systemLines.join("\n")}`,
    solution: coefficientNames(unknowns).map((name, i) => `${name} = ${values[i].toString()}`),
  });

  // Step 5 — assemble the answer
  const terms = [];
  let vi = 0;
  unknowns.forEach((u) => {
    const f = factors[u.factorIndex];
    if (f.type === "linear") {
      const A = values[vi++];
      if (A.isZero()) return;
      terms.push({
        type: "linear",
        coefficient: A,
        root: f.root,
        power: u.power,
        string: `${A.isInt() ? A.toString() : `(${A.toString()})`}/${factorToString({ ...f, multiplicity: u.power }, variable)}`,
        latex: `\\frac{${A.toLatex()}}{${factorToLatex({ ...f, multiplicity: u.power }, variable)}}`,
      });
    } else {
      const B = values[vi++];
      const C = values[vi++];
      if (B.isZero() && C.isZero()) return;
      const topPoly = trim([C, B]);
      const topString = polyToString(topPoly, variable);
      const nonZero = trim(topPoly).filter((c) => !c.isZero()).length;
      const needsParens = nonZero > 1 || C.n < 0 || B.n < 0 || !C.isInt() || !B.isInt();
      terms.push({
        type: "quadratic",
        B,
        C,
        quadratic: f.poly,
        power: u.power,
        string: `${needsParens ? `(${topString})` : topString}/${factorToString({ ...f, multiplicity: u.power }, variable)}`,
        latex: `\\frac{${polyToLatex(topPoly, variable)}}{${factorToLatex({ ...f, multiplicity: u.power }, variable)}}`,
      });
    }
  });

  return { polynomialPart, terms, steps, factors, leading, variable, unknowns, values };
};

const letterFor = (i) => String.fromCharCode(65 + (i % 26)) + (i >= 26 ? Math.floor(i / 26) : "");
const coefficientNames = (unknowns) => {
  const names = [];
  unknowns.forEach((u) => {
    names.push(u.label);
    if (u.kind === "linearNum") names.push(u.label2);
  });
  return names;
};
const coefficientName = (unknowns, index) => coefficientNames(unknowns)[index];

export const decompositionToString = (res) => {
  const parts = [];
  if (res.polynomialPart && !isZeroPoly(res.polynomialPart)) parts.push(polyToString(res.polynomialPart, res.variable));
  res.terms.forEach((t) => parts.push(t.string));
  return parts.join(" + ") || "0";
};

export const decompositionToLatex = (res) => {
  const parts = [];
  if (res.polynomialPart && !isZeroPoly(res.polynomialPart)) parts.push(polyToLatex(res.polynomialPart, res.variable));
  res.terms.forEach((t) => parts.push(t.latex));
  return parts.join(" + ") || "0";
};
