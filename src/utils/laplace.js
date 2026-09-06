// src/utils/laplace.js
// Forward and inverse Laplace transforms.
//
// The forward direction normalises f(t) into a sum of canonical terms
//   c · t^n · e^(at) · {1 | sin(bt) | cos(bt) | sinh(bt) | cosh(bt)}
// which covers the standard transform table, then applies the matching rule.
// The inverse direction runs partial fractions and inverts term by term.
import { Frac, ONE, ZERO } from "./fraction.js";
import { parse as parseExpr } from "./expression.js";
import { parsePolyExpression, polyToLatex, polyToString, degree, trim, isZeroPoly } from "./polynomial.js";
import { partialFractions } from "./partialFractions.js";

const factorial = (n) => {
  let out = 1;
  for (let i = 2; i <= n; i++) out *= i;
  return out;
};

/** Render a plain number the way a textbook would (2, 1/2, √2 ≈ 1.414…). */
export const num = (x) => {
  if (Math.abs(x - Math.round(x)) < 1e-12) return String(Math.round(x));
  try {
    const f = Frac.approximate(x, 1e-10);
    if (Math.abs(f.d) <= 1000) return f.toString();
  } catch { /* fall through */ }
  return String(parseFloat(x.toFixed(6)));
};

export const numLatex = (x) => {
  if (Math.abs(x - Math.round(x)) < 1e-12) return String(Math.round(x));
  try {
    const f = Frac.approximate(x, 1e-10);
    if (Math.abs(f.d) <= 1000) return f.toLatex();
  } catch { /* fall through */ }
  return String(parseFloat(x.toFixed(6)));
};

/** Coefficient shown in front of a symbol: 1 -> "", -1 -> "-", else the number. */
export const coef = (x) => (Math.abs(x - 1) < 1e-12 ? "" : Math.abs(x + 1) < 1e-12 ? "-" : num(x));
/** Same idea for an exact Frac coefficient standing in front of a symbol. */
export const fracCoef = (f) => (f.isOne() ? "" : f.equals(-1) ? "-" : `${f.toString()}·`);
export const fracCoefLatex = (f) => (f.isOne() ? "" : f.equals(-1) ? "-" : f.toLatex());

export const coefLatex = (x) => (Math.abs(x - 1) < 1e-12 ? "" : Math.abs(x + 1) < 1e-12 ? "-" : numLatex(x));

const emptyTerm = () => ({ coeff: 1, n: 0, a: 0, trig: null, b: 0, dirac: false });

const mulTerms = (x, y) => {
  if (x.dirac && (y.n || y.trig || y.a)) throw new Error("Products with δ(t) are not supported");
  if (x.trig && y.trig) throw new Error("Products of two trigonometric factors are not supported — expand them first");
  return {
    coeff: x.coeff * y.coeff,
    n: x.n + y.n,
    a: x.a + y.a,
    trig: x.trig || y.trig,
    b: x.trig ? x.b : y.b,
    dirac: x.dirac || y.dirac,
  };
};

const scaleTerms = (terms, k) => terms.map((t) => ({ ...t, coeff: t.coeff * k }));

/** AST → list of canonical terms (a sum). */
const termsFromAst = (node, variable) => {
  switch (node.type) {
    case "number":
      return [{ ...emptyTerm(), coeff: node.value }];
    case "variable": {
      if (node.name === variable) return [{ ...emptyTerm(), n: 1 }];
      throw new Error(`Unknown symbol "${node.name}" — the function must be written in terms of ${variable}`);
    }
    case "unary":
      return scaleTerms(termsFromAst(node.operand, variable), -1);
    case "binary": {
      if (node.op === "+") return [...termsFromAst(node.left, variable), ...termsFromAst(node.right, variable)];
      if (node.op === "-") return [...termsFromAst(node.left, variable), ...scaleTerms(termsFromAst(node.right, variable), -1)];
      if (node.op === "*") {
        const left = termsFromAst(node.left, variable);
        const right = termsFromAst(node.right, variable);
        const out = [];
        left.forEach((l) => right.forEach((r) => out.push(mulTerms(l, r))));
        return out;
      }
      if (node.op === "/") {
        const right = termsFromAst(node.right, variable);
        if (right.length !== 1 || right[0].n || right[0].a || right[0].trig)
          throw new Error("Division is only supported by a constant");
        return scaleTerms(termsFromAst(node.left, variable), 1 / right[0].coeff);
      }
      if (node.op === "^") {
        // t^n, e^(at), or (constant)^(constant)
        const exponentTerms = termsFromAst(node.right, variable);
        const baseTerms = termsFromAst(node.left, variable);
        const isConst = (ts) => ts.length === 1 && !ts[0].n && !ts[0].a && !ts[0].trig && !ts[0].dirac;
        if (isConst(exponentTerms)) {
          const p = exponentTerms[0].coeff;
          if (!Number.isInteger(p) || p < 0 || p > 12) throw new Error("Powers of t must be whole numbers from 0 to 12");
          let out = [emptyTerm()];
          for (let i = 0; i < p; i++) {
            const next = [];
            out.forEach((o) => baseTerms.forEach((bt) => next.push(mulTerms(o, bt))));
            out = next;
          }
          return out.length ? out : [emptyTerm()];
        }
        // e^(at): base must be the constant e (or any positive constant)
        if (isConst(baseTerms)) {
          const base = baseTerms[0].coeff;
          if (base <= 0) throw new Error("Exponential bases must be positive");
          const rate = exponentTerms;
          if (rate.length !== 1 || rate[0].n !== 1 || rate[0].trig || rate[0].a)
            throw new Error("Exponents must be linear in t, like e^(3t)");
          return [{ ...emptyTerm(), a: rate[0].coeff * Math.log(base) }];
        }
        throw new Error("Unsupported power in the expression");
      }
      throw new Error(`Unsupported operator "${node.op}"`);
    }
    case "call": {
      const arg = termsFromAst(node.args[0], variable);
      const linear = (ts) => {
        if (ts.length !== 1 || ts[0].trig || ts[0].a || ts[0].dirac) return null;
        if (ts[0].n === 1) return ts[0].coeff;
        if (ts[0].n === 0) return 0;
        return null;
      };
      const k = linear(arg);
      switch (node.name) {
        case "exp": {
          if (k === null) throw new Error("exp() must contain a linear function of t, like exp(-2t)");
          return [{ ...emptyTerm(), a: k }];
        }
        case "sin":
        case "cos":
        case "sinh":
        case "cosh": {
          if (k === null) throw new Error(`${node.name}() must contain a linear function of t, like ${node.name}(3t)`);
          if (k === 0) return [{ ...emptyTerm(), coeff: node.name === "cos" || node.name === "cosh" ? 1 : 0 }];
          return [{ ...emptyTerm(), trig: node.name, b: k }];
        }
        case "sqrt":
          throw new Error("√t transforms involve the gamma function, which this calculator does not cover yet");
        default:
          throw new Error(`Function "${node.name}" is not supported by the Laplace transform calculator`);
      }
    }
    default:
      throw new Error("Could not read the function");
  }
};

const shifted = (a, sVar) => (a === 0 ? sVar : `${sVar} ${a < 0 ? "+" : "-"} ${num(Math.abs(a))}`);
const shiftedLatex = (a, sVar) => (a === 0 ? sVar : `${sVar} ${a < 0 ? "+" : "-"} ${numLatex(Math.abs(a))}`);
const wrap = (a, sVar) => (a === 0 ? sVar : `(${shifted(a, sVar)})`);
const wrapLatex = (a, sVar) => (a === 0 ? sVar : `\\left(${shiftedLatex(a, sVar)}\\right)`);

/** Apply the transform table to a single canonical term. */
const transformTerm = (term, sVar) => {
  const { coeff, n, a, trig, b, dirac } = term;
  if (coeff === 0) return null;

  if (dirac) {
    return { latex: numLatex(coeff), string: num(coeff), rule: "L{δ(t)} = 1" };
  }

  if (!trig) {
    const k = coeff * factorial(n);
    const den = n === 0 ? wrap(a, sVar) : `${wrap(a, sVar)}^${n + 1}`;
    const denLatex = n === 0 ? wrapLatex(a, sVar) : `${wrapLatex(a, sVar)}^{${n + 1}}`;
    return {
      latex: `\\frac{${numLatex(k)}}{${denLatex}}`,
      string: `${num(k)}/${den}`,
      rule:
        n === 0 && a === 0 ? "L{1} = 1/s"
        : a === 0 ? `L{t^${n}} = ${n}!/s^${n + 1}`
        : n === 0 ? `L{e^(at)} = 1/(s − a)`
        : `L{t^${n}e^(at)} = ${n}!/(s − a)^${n + 1}`,
    };
  }

  const hyper = trig === "sinh" || trig === "cosh";
  const sign = hyper ? "-" : "+";
  const b2 = numLatex(b * b);
  const core = `${wrapLatex(a, sVar)}^{2} ${sign} ${b2}`;
  const coreString = `${wrap(a, sVar)}^2 ${sign} ${num(b * b)}`;

  if (n === 0) {
    const isSine = trig === "sin" || trig === "sinh";
    const topLatex = isSine ? numLatex(coeff * b) : `${coeff === 1 ? "" : numLatex(coeff)}${wrapLatex(a, sVar)}`;
    const topString = isSine ? num(coeff * b) : `${coeff === 1 ? "" : num(coeff)}${wrap(a, sVar)}`;
    return {
      latex: `\\frac{${topLatex}}{${core}}`,
      string: `${topString}/(${coreString})`,
      rule: `L{e^(at)${trig}(bt)} = ${isSine ? "b" : "(s − a)"}/((s − a)² ${sign} b²)`,
    };
  }

  if (n === 1) {
    // t·sin(bt) and t·cos(bt), optionally with the e^(at) shift applied
    if (trig === "sin") {
      return {
        latex: `\\frac{${numLatex(2 * coeff * b)}${wrapLatex(a, sVar)}}{\\left(${core}\\right)^{2}}`,
        string: `${num(2 * coeff * b)}${wrap(a, sVar)}/(${coreString})^2`,
        rule: "L{t·sin(bt)} = 2bs/(s² + b²)²",
      };
    }
    if (trig === "cos") {
      return {
        latex: `\\frac{${coeff === 1 ? "" : numLatex(coeff)}\\left(${wrapLatex(a, sVar)}^{2} - ${b2}\\right)}{\\left(${core}\\right)^{2}}`,
        string: `${coeff === 1 ? "" : num(coeff)}(${wrap(a, sVar)}^2 - ${num(b * b)})/(${coreString})^2`,
        rule: "L{t·cos(bt)} = (s² − b²)/(s² + b²)²",
      };
    }
  }

  throw new Error(
    `L{t^${n}·${trig}(${num(b)}t)} is beyond the standard table this calculator uses. Try a lower power of t.`
  );
};

export const describeTerm = (term, tVar = "t") => {
  const parts = [];
  if (term.dirac) return `${num(term.coeff)}·δ(${tVar})`;
  if (term.coeff !== 1 || (term.n === 0 && term.a === 0 && !term.trig)) parts.push(num(term.coeff));
  if (term.n === 1) parts.push(tVar);
  else if (term.n > 1) parts.push(`${tVar}^${term.n}`);
  if (term.a !== 0) parts.push(`e^(${coef(term.a)}${tVar})`);
  if (term.trig) parts.push(`${term.trig}(${coef(term.b)}${tVar})`);
  return parts.join("·") || "1";
};

/** Forward Laplace transform of f(t). */
export const laplaceTransform = (input, { tVar = "t", sVar = "s" } = {}) => {
  const cleaned = String(input)
    .replace(/δ\s*\(\s*t\s*\)/gi, "dirac(t)")
    .replace(/\bdelta\s*\(\s*t\s*\)/gi, "dirac(t)")
    .replace(/\bdirac\s*\(\s*t\s*\)/gi, "(DIRAC)")
    .replace(/\bu\s*\(\s*t\s*\)/gi, "1")
    .replace(/\bheaviside\s*\(\s*t\s*\)/gi, "1")
    .replace(/\bstep\s*\(\s*t\s*\)/gi, "1");

  const isDirac = cleaned.includes("(DIRAC)");
  const ast = parseExpr(cleaned.replace(/\(DIRAC\)/g, "1"));
  let terms = termsFromAst(ast, tVar);
  if (isDirac) terms = terms.map((t) => ({ ...t, dirac: true }));

  // Merge like terms so 2t + 3t shows up once.
  const merged = [];
  terms.forEach((t) => {
    const match = merged.find(
      (m) => m.n === t.n && m.a === t.a && m.trig === t.trig && m.b === t.b && m.dirac === t.dirac
    );
    if (match) match.coeff += t.coeff;
    else merged.push({ ...t });
  });
  const active = merged.filter((t) => Math.abs(t.coeff) > 1e-15);
  if (!active.length) return { latex: "0", string: "0", steps: [], terms: [] };

  const steps = [];
  const pieces = active.map((t) => {
    const res = transformTerm(t, sVar);
    steps.push({
      term: describeTerm(t, tVar),
      rule: res.rule,
      result: res.string,
      latex: res.latex,
    });
    return res;
  });

  const joinPieces = (key) =>
    pieces
      .map((p, i) => {
        const body = p[key];
        if (i === 0) return body;
        return body.trimStart().startsWith("-") ? ` - ${body.trimStart().slice(1)}` : ` + ${body}`;
      })
      .join("");

  return {
    latex: joinPieces("latex"),
    string: joinPieces("string"),
    steps,
    terms: active,
    linearityNote:
      active.length > 1
        ? "The Laplace transform is linear, so each term is transformed separately and the results are added."
        : null,
  };
};

/* ------------------------------------------------------------------ *
 * Inverse Laplace transform
 * ------------------------------------------------------------------ */
const inverseLinearTerm = (term, tVar) => {
  const { coefficient: coeff, root, power } = term;
  const k = power - 1;
  const c = coeff.div(new Frac(factorial(k), 1));
  const tPart = k === 0 ? "" : k === 1 ? `${tVar}` : `${tVar}^${k}`;
  const ePart = root.isZero() ? "" : `e^(${root.isOne() ? "" : root.equals(-1) ? "-" : root.toString()}${tVar})`;
  const body = [tPart, ePart].filter(Boolean).join("·");
  const tLatex = k === 0 ? "" : k === 1 ? tVar : `${tVar}^{${k}}`;
  const eLatex = root.isZero() ? "" : `e^{${root.isOne() ? "" : root.equals(-1) ? "-" : root.toLatex()}${tVar}}`;
  const bodyLatex = `${tLatex}${eLatex}`;
  return {
    string: body ? `${fracCoef(c)}${body}` : c.toString(),
    latex: bodyLatex ? `${fracCoefLatex(c)}${bodyLatex}` : c.toLatex(),
    rule: `L⁻¹{A/(s − a)^${power}} = A·t^${k}e^(at)/${k}!`,
  };
};

const inverseQuadraticTerm = (term, tVar) => {
  const [q0, q1] = [term.quadratic[0], term.quadratic[1]];
  const a = q1.neg().div(new Frac(2, 1)); // completing the square: (s − a)² + b²
  const b2 = q0.sub(a.mul(a));
  const B = term.B;
  const C = term.C;

  if (term.power !== 1) {
    // Two standard second-power cases with no shift
    if (term.power === 2 && a.isZero() && b2.toNumber() > 0) {
      const b = Math.sqrt(b2.toNumber());
      if (B.isZero()) {
        const k = C.toNumber() / (2 * Math.pow(b, 3));
        return {
          string: `${coef(k)}(sin(${coef(b)}${tVar}) − ${coef(b)}${tVar}·cos(${coef(b)}${tVar}))`,
          latex: `${coefLatex(k)}\\left(\\sin(${coefLatex(b)}${tVar}) - ${coefLatex(b)}${tVar}\\cos(${coefLatex(b)}${tVar})\\right)`,
          rule: "L⁻¹{1/(s² + b²)²} = (sin bt − bt·cos bt)/(2b³)",
        };
      }
      if (C.isZero()) {
        const k = B.toNumber() / (2 * b);
        return {
          string: `${coef(k)}${tVar}·sin(${coef(b)}${tVar})`,
          latex: `${coefLatex(k)}${tVar}\\sin(${coefLatex(b)}${tVar})`,
          rule: "L⁻¹{s/(s² + b²)²} = t·sin(bt)/(2b)",
        };
      }
    }
    throw new Error(
      "Repeated irreducible quadratic factors beyond the two standard cases are not supported yet."
    );
  }

  const bSquared = b2.toNumber();
  const ePart = a.isZero() ? "" : `e^(${a.isOne() ? "" : a.equals(-1) ? "-" : a.toString()}${tVar})`;
  const eLatex = a.isZero() ? "" : `e^{${a.isOne() ? "" : a.equals(-1) ? "-" : a.toLatex()}${tVar}}`;

  if (bSquared > 0) {
    const b = Math.sqrt(bSquared);
    // (Bs + C)/((s−a)² + b²) = B·e^(at)cos(bt) + ((C + aB)/b)·e^(at)sin(bt)
    const sinCoeff = C.toNumber() + a.toNumber() * B.toNumber();
    const sc = sinCoeff / b;
    const pieces = [];
    const piecesLatex = [];
    if (!B.isZero()) {
      pieces.push(`${fracCoef(B)}${ePart}${ePart ? "·" : ""}cos(${coef(b)}${tVar})`);
      piecesLatex.push(`${fracCoefLatex(B)}${eLatex}\\cos(${coefLatex(b)}${tVar})`);
    }
    if (Math.abs(sc) > 1e-14) {
      pieces.push(`${coef(sc)}${coef(sc) && coef(sc) !== "-" ? "·" : ""}${ePart}${ePart ? "·" : ""}sin(${coef(b)}${tVar})`);
      piecesLatex.push(`${coefLatex(sc)}${eLatex}\\sin(${coefLatex(b)}${tVar})`);
    }
    return {
      string: pieces.join(" + ") || "0",
      latex: piecesLatex.join(" + ") || "0",
      rule: "L⁻¹{(Bs + C)/((s − a)² + b²)} = e^(at)[B·cos bt + ((C + aB)/b)·sin bt]",
    };
  }

  // b² < 0 -> hyperbolic form
  const b = Math.sqrt(-bSquared);
  const sinhCoeff = (C.toNumber() + a.toNumber() * B.toNumber()) / b;
  const pieces = [];
  if (!B.isZero()) pieces.push(`${fracCoef(B)}${ePart}${ePart ? "·" : ""}cosh(${coef(b)}${tVar})`);
  if (Math.abs(sinhCoeff) > 1e-14) pieces.push(`${coef(sinhCoeff)}${coef(sinhCoeff) && coef(sinhCoeff) !== "-" ? "·" : ""}${ePart}${ePart ? "·" : ""}sinh(${coef(b)}${tVar})`);
  return {
    string: pieces.join(" + ") || "0",
    latex: pieces.join(" + ") || "0",
    rule: "L⁻¹{(Bs + C)/((s − a)² − b²)} = e^(at)[B·cosh bt + ((C + aB)/b)·sinh bt]",
  };
};

/**
 * Inverse Laplace transform of a rational F(s) = numerator/denominator.
 * Both arguments are strings; factored or expanded form both work.
 */
export const inverseLaplace = (numerator, denominator, { sVar = "s", tVar = "t" } = {}) => {
  const numPoly = parsePolyExpression(numerator, sVar);
  const denPoly = parsePolyExpression(denominator, sVar);
  if (isZeroPoly(denPoly)) throw new Error("The denominator cannot be zero");
  if (degree(numPoly) >= degree(denPoly)) {
    throw new Error(
      "For an inverse transform the numerator's degree must be lower than the denominator's (otherwise the result contains δ(t) and its derivatives)."
    );
  }

  const pf = partialFractions(numPoly, denPoly, sVar);
  const steps = [...pf.steps];
  const pieces = [];

  pf.terms.forEach((term) => {
    const inv = term.type === "linear" ? inverseLinearTerm(term, tVar) : inverseQuadraticTerm(term, tVar);
    steps.push({
      title: `Invert ${term.string}`,
      detail: inv.rule,
      latex: `\\mathcal{L}^{-1}\\left\\{${term.latex}\\right\\} = ${inv.latex}`,
    });
    pieces.push(inv);
  });

  const join = (key) =>
    pieces
      .map((p, i) => {
        const body = p[key];
        if (i === 0) return body;
        return body.trimStart().startsWith("-") ? ` - ${body.trimStart().slice(1)}` : ` + ${body}`;
      })
      .join("");

  return {
    partialFractions: pf,
    steps,
    string: join("string") || "0",
    latex: join("latex") || "0",
  };
};
