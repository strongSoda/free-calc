// src/data/ogPages.js
// One entry per page that gets a generated Open Graph card.
// Everything is derived from the same data modules and solvers the pages use,
// so a share card can never disagree with the page it points at.
import {
  CALCULATORS, MATRIX_SIZES, DETERMINANT_EXAMPLES, DIAGONALIZE_EXAMPLES, sizeLabel, article,
} from "./mathCalculators.js";
import { LAPLACE_FUNCTIONS, INVERSE_LAPLACE_EXPRESSIONS } from "./laplaceExamples.js";
import { PARTIAL_FRACTION_EXAMPLES } from "./algebraExamples.js";
import { TRIPLE_INTEGRAL_EXAMPLES, LINE_INTEGRAL_EXAMPLES, LAGRANGE_EXAMPLES } from "./calculusExamples.js";
import { FOC_SETUPS } from "./focExamples.js";
import { laplaceTransform, inverseLaplace } from "../utils/laplace.js";
import { partialFractions, decompositionToString } from "../utils/partialFractions.js";
import { parsePolyExpression } from "../utils/polynomial.js";
import { solveTripleIntegral, solveLineIntegral, solveLagrange, lineIntegralNotation } from "../utils/exampleSolvers.js";
import { buildFromComponents, bandFor, round } from "../utils/foc.js";

const LINEAR_ALGEBRA = "Linear algebra";
const TRANSFORMS = "Transforms";
const ALGEBRA = "Algebra";
const CALCULUS = "Multivariable calculus";
const ARCHERY = "Archery";

/** Never let a failed computation break the build — fall back to prose. */
const safely = (fn, fallback) => {
  try {
    const value = fn();
    return value || fallback;
  } catch {
    return fallback;
  }
};

const hub = (key, eyebrow) => {
  const calc = CALCULATORS[key];
  return { path: calc.url, eyebrow, title: calc.title, subtitle: calc.description };
};

const buildPages = () => {
  const pages = [];

  /* ---------------- hub pages ---------------- */
  ["determinant", "transpose", "gaussian", "lu", "luFactorization", "diagonalize", "inverse"]
    .forEach((key) => pages.push(hub(key, LINEAR_ALGEBRA)));
  ["laplace", "inverseLaplace"].forEach((key) => pages.push(hub(key, TRANSFORMS)));
  pages.push(hub("partialFractions", ALGEBRA));
  ["tripleIntegral", "lineIntegral", "lagrange"].forEach((key) => pages.push(hub(key, CALCULUS)));
  pages.push(hub("foc", ARCHERY));

  /* ---------------- matrices ---------------- */
  MATRIX_SIZES.determinant.forEach((v) => {
    const label = sizeLabel(v);
    pages.push({
      path: `/calculators/matrix-determinant/${v.slug}`,
      eyebrow: LINEAR_ALGEBRA,
      title: `${label} Determinant Calculator`,
      subtitle: `Worked ${label} example with det(A) = ${v.answer}`,
    });
  });

  DETERMINANT_EXAMPLES.forEach((e) => {
    pages.push({
      path: `/calculators/matrix-determinant/examples/${e.slug}`,
      eyebrow: LINEAR_ALGEBRA,
      title: `Determinant of ${article(e.name)} ${e.name}`,
      subtitle: `det(A) = ${e.answer}`,
    });
  });

  MATRIX_SIZES.transpose.forEach((v) => {
    pages.push({
      path: `/calculators/matrix-transpose/${v.slug}`,
      eyebrow: LINEAR_ALGEBRA,
      title: `${sizeLabel(v)} Matrix Transpose Calculator`,
      subtitle: `A ${sizeLabel(v)} matrix transposes to ${v.cols}×${v.rows}`,
    });
  });

  MATRIX_SIZES.rref.forEach((v) => {
    pages.push({
      path: `/calculators/rref/${v.slug}`,
      eyebrow: LINEAR_ALGEBRA,
      title: `${sizeLabel(v)} RREF Calculator`,
      subtitle: `Reduced row echelon form, every row operation shown`,
    });
  });

  MATRIX_SIZES.gaussian.forEach((v) => {
    pages.push({
      path: `/calculators/gaussian-elimination/${v.slug}`,
      eyebrow: LINEAR_ALGEBRA,
      title: `${v.unknowns}×${v.unknowns} System Solver`,
      subtitle: `Gaussian elimination for ${v.unknowns} equations in ${v.unknowns} unknowns`,
    });
  });

  MATRIX_SIZES.lu.forEach((v) => {
    const label = sizeLabel(v);
    pages.push({
      path: `/calculators/lu-decomposition/${v.slug}`,
      eyebrow: LINEAR_ALGEBRA,
      title: `${label} LU Decomposition Calculator`,
      subtitle: `A = LU with ${(v.rows * (v.rows - 1)) / 2} elimination multipliers`,
    });
  });

  MATRIX_SIZES.diagonalize.forEach((v) => {
    pages.push({
      path: `/calculators/diagonalize-matrix/${v.slug}`,
      eyebrow: LINEAR_ALGEBRA,
      title: `Diagonalize a ${sizeLabel(v)} Matrix`,
      subtitle: "Eigenvalues, eigenvectors and A = PDP⁻¹",
    });
  });

  DIAGONALIZE_EXAMPLES.forEach((e) => {
    pages.push({
      path: `/calculators/diagonalize-matrix/examples/${e.slug}`,
      eyebrow: LINEAR_ALGEBRA,
      title: `Diagonalizing ${article(e.name)} ${e.name}`,
      subtitle: e.insight,
    });
  });

  /* ---------------- transforms ---------------- */
  LAPLACE_FUNCTIONS.forEach((f) => {
    // f.general is set when the display is a general form such as sin(at).
    const result = f.general || safely(() => laplaceTransform(f.expression).string, null);
    pages.push({
      path: `/calculators/laplace-transform/${f.slug}`,
      eyebrow: TRANSFORMS,
      title: `Laplace Transform of ${f.display}`,
      subtitle: result ? `L{${f.display}} = ${result}` : f.note,
    });
  });

  INVERSE_LAPLACE_EXPRESSIONS.forEach((f) => {
    const result = safely(() => inverseLaplace(f.numerator, f.denominator).string, null);
    pages.push({
      path: `/calculators/inverse-laplace-transform/${f.slug}`,
      eyebrow: TRANSFORMS,
      title: `Inverse Laplace Transform of ${f.display}`,
      subtitle: result ? `L⁻¹{${f.display}} = ${result}` : f.note,
    });
  });

  /* ---------------- partial fractions ---------------- */
  PARTIAL_FRACTION_EXAMPLES.forEach((e) => {
    const result = safely(
      () => decompositionToString(
        partialFractions(parsePolyExpression(e.numerator, "x"), parsePolyExpression(e.denominator, "x"), "x")
      ),
      null
    );
    pages.push({
      path: `/calculators/partial-fraction-decomposition/${e.slug}`,
      eyebrow: ALGEBRA,
      title: `Partial Fractions: ${e.display}`,
      subtitle: result ? `${e.display} = ${result}` : e.note,
    });
  });

  /* ---------------- calculus ---------------- */
  TRIPLE_INTEGRAL_EXAMPLES.forEach((e) => {
    const solved = solveTripleIntegral(e);
    pages.push({
      path: `/calculators/triple-integral/${e.slug}`,
      eyebrow: CALCULUS,
      title: e.name,
      subtitle: solved ? `${e.display} = ${solved.answer}` : e.display,
    });
  });

  LINE_INTEGRAL_EXAMPLES.forEach((e) => {
    const solved = solveLineIntegral(e);
    pages.push({
      path: `/calculators/line-integral/${e.slug}`,
      eyebrow: CALCULUS,
      title: e.name,
      subtitle: solved ? `${lineIntegralNotation(e)} = ${solved.answer}` : e.note,
    });
  });

  LAGRANGE_EXAMPLES.forEach((e) => {
    const solved = solveLagrange(e);
    const best = solved.best;
    pages.push({
      path: `/calculators/lagrange-multiplier/${e.slug}`,
      eyebrow: CALCULUS,
      title: e.name,
      subtitle: best
        ? `f = ${best.value} at (${best.point.join(", ")}) with λ = ${best.lambda}`
        : e.note,
    });
  });

  /* ---------------- archery ---------------- */
  FOC_SETUPS.forEach((setup) => {
    const built = safely(() => buildFromComponents(setup), null);
    const foc = built ? round(built.foc, 100) : null;
    pages.push({
      path: `/calculators/foc-calculator/${setup.slug}`,
      eyebrow: ARCHERY,
      title: `${setup.name} FOC`,
      subtitle: built
        ? `${foc}% front of center · ${round(built.total, 10)} grain arrow · ${bandFor(built.foc).name}`
        : setup.note,
    });
  });

  /* ---------------- existing calculators that had no working card ---------------- */
  // The subnet pages pointed at /subnet-calculator-og.png, which does not
  // exist; they all share this generated card instead.
  pages.push({
    path: "/calculators/subnet",
    eyebrow: "Networking",
    title: "Subnet Calculator",
    subtitle: "IPv4 and IPv6 network addresses, ranges, masks and host counts",
  });

  return pages;
};

export const OG_PAGES = buildPages();

/** "/calculators/laplace-transform" -> "calculators/laplace-transform" */
export const ogSlugForPath = (pathname) => {
  const clean = String(pathname || "/").replace(/\/+$/, "");
  return clean.replace(/^\//, "");
};

const OG_PATHS = new Set(OG_PAGES.map((p) => ogSlugForPath(p.path)));

/**
 * The image URL for a page, or null when that page has no generated card
 * (callers then fall back to the site-wide default).
 */
export const ogImageForPath = (pathname) => {
  const slug = ogSlugForPath(pathname);
  return OG_PATHS.has(slug) ? `/og/${slug}.png` : null;
};
