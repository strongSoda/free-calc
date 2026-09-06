// src/utils/foc.js
// Arrow front-of-center maths, kept out of the React component so Astro pages
// can compute FOC at build time too.

export const FOC_BANDS = [
  { min: -Infinity, max: 7, name: "Low FOC", tone: "warning", advice: "Flatter trajectory but less forgiving in flight. Common on target setups shooting light points." },
  { min: 7, max: 10, name: "Normal FOC", tone: "default", advice: "The range most factory arrows land in. A good all-round balance of trajectory and stability." },
  { min: 10, max: 15, name: "High FOC", tone: "success", advice: "Popular for hunting: better arrow flight stability and forgiveness, with only a modest drop in trajectory." },
  { min: 15, max: 19, name: "Extreme FOC", tone: "success", advice: "Ashby-style setup. Strong penetration and stability; expect a noticeably more arcing trajectory past 30 yards." },
  { min: 19, max: Infinity, name: "Ultra-extreme FOC", tone: "warning", advice: "Maximum penetration territory. Trajectory drops off quickly, and arrow tuning gets fussy." },
];

export const bandFor = (foc) => FOC_BANDS.find((b) => foc >= b.min && foc < b.max) || FOC_BANDS[1];

/** AMO formula: FOC% = 100 x (balance point - arrow length / 2) / arrow length */
export const calculateFOC = (arrowLength, balancePoint) =>
  (100 * (balancePoint - arrowLength / 2)) / arrowLength;

/**
 * Estimated balance point and weight for a build, treating the shaft as a
 * uniform rod with the front components at the tip and the rear ones at the nock.
 */
export const buildFromComponents = ({ shaftLength, gpi, point, insert, collar = 0, nock, fletching, wrap = 0 }) => {
  const num = (v) => {
    const x = parseFloat(v);
    return Number.isFinite(x) ? x : 0;
  };
  const L = num(shaftLength);
  const shaftWeight = num(gpi) * L;
  const front = num(point) + num(insert) + num(collar);
  const rear = num(nock) + num(fletching) + num(wrap);
  const total = shaftWeight + front + rear;
  if (L <= 0 || total <= 0) return null;
  const balance = (shaftWeight * (L / 2) + front * L + rear * 0.5) / total;
  return { L, shaftWeight, front, rear, total, balance, foc: calculateFOC(L, balance) };
};

/** Round to a given factor: round(1.234, 100) -> 1.23 */
export const round = (value, factor) => Math.round(value * factor) / factor;
