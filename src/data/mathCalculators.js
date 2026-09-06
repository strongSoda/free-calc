// src/data/mathCalculators.js
// Registry + example data behind the linear algebra and calculus calculators.
// Kept in one place so pages, cross-links and sitemaps stay in sync.

export const CALCULATORS = {
  rref: {
    title: "RREF Calculator",
    url: "/",
    description: "Reduced row echelon form with every row operation shown",
  },
  determinant: {
    title: "Matrix Determinant Calculator",
    url: "/calculators/matrix-determinant",
    description: "Determinants by cofactor expansion or row reduction",
  },
  transpose: {
    title: "Matrix Transpose Calculator",
    url: "/calculators/matrix-transpose",
    description: "Swap rows and columns to get Aᵀ",
  },
  gaussian: {
    title: "Gaussian Elimination Calculator",
    url: "/calculators/gaussian-elimination",
    description: "Row echelon form and back-substitution for linear systems",
  },
  lu: {
    title: "LU Decomposition Calculator",
    url: "/calculators/lu-decomposition",
    description: "Factor A into lower and upper triangular matrices",
  },
  luFactorization: {
    title: "LU Factorization Calculator",
    url: "/calculators/lu-factorization",
    description: "Doolittle LU factorisation with pivoting",
  },
  diagonalize: {
    title: "Diagonalize Matrix Calculator",
    url: "/calculators/diagonalize-matrix",
    description: "Eigenvalues, eigenvectors and A = PDP⁻¹",
  },
  inverse: {
    title: "Matrix Inverse Calculator",
    url: "/calculators/matrix-inverse",
    description: "Invert a matrix with Gauss-Jordan elimination",
  },
  laplace: {
    title: "Laplace Transform Calculator",
    url: "/calculators/laplace-transform",
    description: "Transform f(t) into F(s) using the standard table",
  },
  inverseLaplace: {
    title: "Inverse Laplace Transform Calculator",
    url: "/calculators/inverse-laplace-transform",
    description: "Recover f(t) from F(s) via partial fractions",
  },
  partialFractions: {
    title: "Partial Fraction Decomposition Calculator",
    url: "/calculators/partial-fraction-decomposition",
    description: "Split a rational function into simple fractions",
  },
  tripleIntegral: {
    title: "Triple Integral Calculator",
    url: "/calculators/triple-integral",
    description: "Cartesian, cylindrical and spherical triple integrals",
  },
  lineIntegral: {
    title: "Line Integral Calculator",
    url: "/calculators/line-integral",
    description: "Scalar ∫f ds and vector ∫F·dr along a curve",
  },
  lagrange: {
    title: "Lagrange Multiplier Calculator",
    url: "/calculators/lagrange-multiplier",
    description: "Constrained maxima and minima with ∇f = λ∇g",
  },
  quadratic: {
    title: "Quadratic Equation Calculator",
    url: "/calculators/quadratic-equation",
    description: "Roots, discriminant and vertex",
  },
  standardDeviation: {
    title: "Standard Deviation Calculator",
    url: "/calculators/standard-deviation",
    description: "Mean, variance, standard deviation and z-scores",
  },
  foc: {
    title: "FOC Calculator",
    url: "/calculators/foc-calculator",
    description: "Arrow front-of-center percentage and build weight",
  },
};

export const relatedTo = (...keys) => keys.map((k) => CALCULATORS[k]).filter(Boolean);

/* ------------------------------------------------------------------ *
 * Matrix size variants for the programmatic pages
 * ------------------------------------------------------------------ */
const M = (rows) => rows;

export const MATRIX_SIZES = {
  determinant: [
    {
      slug: "2x2",
      rows: 2, cols: 2,
      matrix: M([[4, 7], [2, 6]]),
      answer: "10",
      note: "The 2×2 case is the one worth memorising: det = ad − bc.",
    },
    {
      slug: "3x3",
      rows: 3, cols: 3,
      matrix: M([[6, 1, 1], [4, -2, 5], [2, 8, 7]]),
      answer: "-306",
      note: "A 3×3 determinant is usually done by cofactor expansion along a row, or with the Rule of Sarrus.",
    },
    {
      slug: "4x4",
      rows: 4, cols: 4,
      matrix: M([[1, 0, 2, -1], [3, 0, 0, 5], [2, 1, 4, -3], [1, 0, 5, 0]]),
      answer: "30",
      note: "From 4×4 upward, row reduction to triangular form is far quicker than expanding 24 cofactor terms.",
    },
    {
      slug: "5x5",
      rows: 5, cols: 5,
      matrix: M([[2, 1, 0, 0, 1], [1, 3, 1, 0, 0], [0, 1, 2, 1, 0], [0, 0, 1, 4, 1], [1, 0, 0, 1, 2]]),
      answer: "31",
      note: "A 5×5 cofactor expansion has 120 terms, so the calculator switches to row reduction automatically.",
    },
  ],
  transpose: [
    { slug: "2x2", rows: 2, cols: 2, matrix: M([[1, 2], [3, 4]]) },
    { slug: "2x3", rows: 2, cols: 3, matrix: M([[1, 2, 3], [4, 5, 6]]) },
    { slug: "3x2", rows: 3, cols: 2, matrix: M([[1, 2], [3, 4], [5, 6]]) },
    { slug: "3x3", rows: 3, cols: 3, matrix: M([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) },
    { slug: "3x4", rows: 3, cols: 4, matrix: M([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) },
    { slug: "4x4", rows: 4, cols: 4, matrix: M([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]) },
  ],
  rref: [
    { slug: "2x2", rows: 2, cols: 2, matrix: M([[1, 2], [3, 4]]) },
    { slug: "2x3", rows: 2, cols: 3, matrix: M([[1, 2, 3], [4, 5, 6]]) },
    { slug: "3x3", rows: 3, cols: 3, matrix: M([[2, 1, -1], [-3, -1, 2], [-2, 1, 2]]) },
    { slug: "3x4", rows: 3, cols: 4, matrix: M([[2, 1, -1, 8], [-3, -1, 2, -11], [-2, 1, 2, -3]]) },
    { slug: "4x4", rows: 4, cols: 4, matrix: M([[1, 2, 3, 4], [2, 4, 6, 8], [1, 1, 1, 1], [0, 1, 2, 3]]) },
    { slug: "4x5", rows: 4, cols: 5, matrix: M([[1, 1, 1, 1, 4], [2, 1, -1, 0, 1], [0, 1, 2, 1, 5], [1, 0, 0, 1, 2]]) },
  ],
  gaussian: [
    { slug: "2x2", rows: 2, cols: 3, matrix: M([[2, 3, 8], [1, -1, -1]]), unknowns: 2 },
    { slug: "3x3", rows: 3, cols: 4, matrix: M([[2, 1, -1, 8], [-3, -1, 2, -11], [-2, 1, 2, -3]]), unknowns: 3 },
    { slug: "4x4", rows: 4, cols: 5, matrix: M([[1, 1, 1, 1, 10], [2, -1, 1, 0, 3], [0, 1, -1, 2, 3], [1, 0, 2, -1, 2]]), unknowns: 4 },
  ],
  lu: [
    { slug: "2x2", rows: 2, cols: 2, matrix: M([[4, 3], [6, 3]]) },
    { slug: "3x3", rows: 3, cols: 3, matrix: M([[1, 2, 3], [4, 5, 6], [7, 8, 10]]) },
    { slug: "4x4", rows: 4, cols: 4, matrix: M([[2, 1, 1, 0], [4, 3, 3, 1], [8, 7, 9, 5], [6, 7, 9, 8]]) },
  ],
  diagonalize: [
    { slug: "2x2", rows: 2, cols: 2, matrix: M([[4, 1], [2, 3]]) },
    { slug: "3x3", rows: 3, cols: 3, matrix: M([[2, 0, 0], [1, 3, 0], [0, 0, 5]]) },
  ],
};

/** Indefinite article for a phrase, so example names read correctly. */
export const article = (phrase) => (/^[aeiou]/i.test(String(phrase).trim()) ? "an" : "a");

export const sizeLabel = (variant) => `${variant.rows}×${variant.cols}`;

/* ------------------------------------------------------------------ *
 * Named example matrices (deeper long-tail pages)
 * ------------------------------------------------------------------ */
export const DETERMINANT_EXAMPLES = [
  { slug: "identity-3x3", name: "3×3 identity matrix", matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], answer: "1", insight: "The determinant of any identity matrix is 1 — it scales nothing." },
  { slug: "singular-3x3", name: "singular 3×3 matrix", matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], answer: "0", insight: "Row 3 minus row 2 equals row 2 minus row 1, so the rows are dependent and the determinant vanishes." },
  { slug: "upper-triangular-3x3", name: "upper triangular matrix", matrix: [[2, 5, 9], [0, 3, 7], [0, 0, 4]], answer: "24", insight: "For a triangular matrix the determinant is just the product of the diagonal: 2 × 3 × 4." },
  { slug: "rotation-2x2", name: "2×2 rotation-style matrix", matrix: [[0, -1], [1, 0]], answer: "1", insight: "Rotations preserve area, so their determinant is 1." },
  { slug: "negative-determinant", name: "matrix with a negative determinant", matrix: [[1, 2], [3, 4]], answer: "-2", insight: "A negative determinant means the transformation flips orientation." },
];

export const DIAGONALIZE_EXAMPLES = [
  { slug: "2x2-distinct-eigenvalues", name: "2×2 matrix with distinct eigenvalues", matrix: [[4, 1], [2, 3]], insight: "Distinct eigenvalues always give independent eigenvectors, so this matrix is diagonalizable." },
  { slug: "symmetric-3x3", name: "symmetric 3×3 matrix", matrix: [[2, 1, 0], [1, 2, 0], [0, 0, 3]], insight: "Every real symmetric matrix is diagonalizable, and its eigenvectors can be chosen orthogonal." },
  { slug: "defective-matrix", name: "defective (non-diagonalizable) matrix", matrix: [[2, 1], [0, 2]], insight: "A repeated eigenvalue with only one eigenvector means no basis of eigenvectors exists — this matrix is defective." },
  { slug: "diagonal-matrix", name: "already diagonal matrix", matrix: [[5, 0], [0, -2]], insight: "A diagonal matrix is trivially diagonalizable: P is the identity and D is the matrix itself." },
  { slug: "complex-eigenvalues", name: "matrix with complex eigenvalues", matrix: [[0, -1], [1, 0]], insight: "A rotation has no real eigenvectors, so it cannot be diagonalized over the reals." },
];
