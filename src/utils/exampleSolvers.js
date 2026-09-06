// src/utils/exampleSolvers.js
// Build-time solvers for the worked calculus examples. Both the pages and the
// OG image registry read from here so a page and its share card can never
// disagree about the answer.
import { compile } from "./expression.js";
import {
  integrate1D, integrate3D, derivative, gradient, newtonSolve,
  recognizeClosedForm, roundNice,
} from "./numeric.js";

const VARS_BY_SYSTEM = {
  cartesian: ["x", "y", "z"],
  cylindrical: ["theta", "r", "z"],
  spherical: ["theta", "phi", "rho"],
};

/** Evaluates one TRIPLE_INTEGRAL_EXAMPLES entry. */
export const solveTripleIntegral = (item) => {
  const [v1, v2, v3] = VARS_BY_SYSTEM[item.system] || VARS_BY_SYSTEM.cartesian;
  try {
    const f = compile(item.f);
    const midA = compile(item.middle[0]);
    const midB = compile(item.middle[1]);
    const inA = compile(item.inner[0]);
    const inB = compile(item.inner[1]);
    const integrand = (a, b, c) => {
      const base = f({ [v1]: a, [v2]: b, [v3]: c });
      // The Jacobian for the chosen coordinate system.
      if (item.system === "cylindrical") return base * b;
      if (item.system === "spherical") return base * c * c * Math.sin(b);
      return base;
    };
    const value = integrate3D(
      integrand,
      [compile(item.outer[0])({}), compile(item.outer[1])({})],
      [(a) => midA({ [v1]: a }), (a) => midB({ [v1]: a })],
      [(a, b) => inA({ [v1]: a, [v2]: b }), (a, b) => inB({ [v1]: a, [v2]: b })],
      40
    );
    if (!Number.isFinite(value)) return null;
    const rounded = roundNice(value, 8);
    const closed = recognizeClosedForm(value, 1e-6);
    return { value: rounded, closed, answer: closed ? `${closed} ≈ ${rounded}` : String(rounded) };
  } catch {
    return null;
  }
};

/** Evaluates one LINE_INTEGRAL_EXAMPLES entry. */
export const solveLineIntegral = (item) => {
  try {
    const X = compile(item.x);
    const Y = compile(item.y);
    const Z = compile(item.z || "0");
    const a = compile(item.a)({});
    const b = compile(item.b)({});
    const xt = (t) => X({ t });
    const yt = (t) => Y({ t });
    const zt = (t) => Z({ t });
    const point = (t) => ({ x: xt(t), y: yt(t), z: zt(t), t });
    const speed = (t) => Math.hypot(derivative(xt, t), derivative(yt, t), derivative(zt, t));
    const arcLength = integrate1D(speed, a, b, 80);

    let value;
    if (item.type === "scalar") {
      const f = compile(item.f);
      value = integrate1D((t) => f(point(t)) * speed(t), a, b, 120);
    } else {
      const P = compile(item.P);
      const Q = compile(item.Q);
      const R = compile(item.R || "0");
      value = integrate1D((t) => {
        const p = point(t);
        return P(p) * derivative(xt, t) + Q(p) * derivative(yt, t) + R(p) * derivative(zt, t);
      }, a, b, 120);
    }
    if (!Number.isFinite(value)) return null;
    const rounded = roundNice(value, 8);
    const closed = recognizeClosedForm(value, 1e-6);
    return {
      value: rounded,
      closed,
      arcLength: roundNice(arcLength, 6),
      answer: closed ? `${closed} ≈ ${rounded}` : String(rounded),
    };
  } catch {
    return null;
  }
};

export const lineIntegralNotation = (item) =>
  item.type === "scalar"
    ? `∫C (${item.f}) ds`
    : `∫C F·dr where F = (${item.P}, ${item.Q}, ${item.R})`;

// Starting points for the Newton search. A spread of signs and magnitudes is
// enough to find every stationary point in the textbook problems we ship.
const START_2D = [];
for (const a of [-4, -2, -0.7, 0.7, 2, 4]) for (const b of [-4, -2, -0.7, 0.7, 2, 4]) START_2D.push([a, b]);
const START_3D = [];
for (const a of [-3, -1, 1, 3]) for (const b of [-3, -1, 1, 3]) for (const c of [-3, -1, 1, 3]) START_3D.push([a, b, c]);

/** Solves one LAGRANGE_EXAMPLES entry, returning every distinct critical point. */
export const solveLagrange = (item) => {
  const vars = item.vars === "xyz" ? ["x", "y", "z"] : ["x", "y"];
  const solutions = [];
  try {
    const fFn = compile(item.f);
    const gFn = compile(item.g);
    const cVal = compile(item.c)({});
    const scope = (p) => Object.fromEntries(vars.map((v, i) => [v, p[i]]));
    const F = (p) => fFn(scope(p));
    const G = (p) => gFn(scope(p));
    const system = (u) => {
      const point = u.slice(0, vars.length);
      const lambda = u[vars.length];
      const gf = gradient(F, point);
      const gg = gradient(G, point);
      return [...gf.map((v, i) => v - lambda * gg[i]), G(point) - cVal];
    };

    (vars.length === 3 ? START_3D : START_2D).forEach((start) => {
      [0.5, 2, -1].forEach((lambda0) => {
        const sol = newtonSolve(system, [...start, lambda0]);
        if (!sol) return;
        const point = sol.slice(0, vars.length).map((v) => roundNice(v, 6));
        if (point.some((v) => !Number.isFinite(v) || Math.abs(v) > 1e6)) return;
        if (Math.abs(G(point) - cVal) > 1e-6) return;
        const value = F(point);
        if (!Number.isFinite(value)) return;
        if (solutions.some((s) => s.point.every((v, i) => Math.abs(v - point[i]) < 1e-5))) return;
        solutions.push({ point, lambda: roundNice(sol[vars.length], 6), value: roundNice(value, 6) });
      });
    });
    solutions.sort((a, b) => b.value - a.value);
  } catch {
    return { vars, solutions: [], best: null, worst: null };
  }

  return {
    vars,
    solutions,
    best: solutions[0] || null,
    worst: solutions[solutions.length - 1] || null,
  };
};

export const classifyLagrange = (solution, solutions) => {
  if (solutions.length === 1) return "stationary point";
  if (solution.value === solutions[0].value) return "maximum";
  if (solution.value === solutions[solutions.length - 1].value) return "minimum";
  return "neither";
};
