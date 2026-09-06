// src/utils/fraction.js
// Exact rational arithmetic so matrix calculators can show clean answers
// like 3/4 instead of 0.7500000000000001.

const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

export class Frac {
  constructor(n, d = 1) {
    if (d === 0) throw new Error("Division by zero");
    if (!Number.isFinite(n) || !Number.isFinite(d)) throw new Error("Invalid number");
    if (d < 0) {
      n = -n;
      d = -d;
    }
    const g = gcd(n, d) || 1;
    this.n = n / g;
    this.d = d / g;
  }

  static from(value) {
    if (value instanceof Frac) return value;
    if (typeof value === "string") return Frac.parse(value);
    return Frac.fromNumber(value);
  }

  // Turns a decimal into an exact fraction (0.75 -> 3/4) without drifting
  // into monsters like 3602879701896397/4503599627370496.
  static fromNumber(x) {
    if (!Number.isFinite(x)) throw new Error("Invalid number");
    if (Number.isInteger(x)) return new Frac(x, 1);
    const sign = x < 0 ? -1 : 1;
    let [h1, h2, k1, k2] = [1, 0, 0, 1];
    let b = Math.abs(x);
    do {
      const a = Math.floor(b);
      [h1, h2] = [a * h1 + h2, h1];
      [k1, k2] = [a * k1 + k2, k1];
      if (b === a) break;
      b = 1 / (b - a);
    } while (Math.abs(Math.abs(x) - h1 / k1) > Math.abs(x) * 1e-12 && k1 < 1e9);
    return new Frac(sign * h1, k1);
  }

  // Nearest simple rational within a tolerance — used to clean up
  // coefficients that came back from a numerical root finder.
  static approximate(x, tol = 1e-9) {
    if (!Number.isFinite(x)) throw new Error("Invalid number");
    if (Math.abs(x - Math.round(x)) < tol) return new Frac(Math.round(x), 1);
    const sign = x < 0 ? -1 : 1;
    const target = Math.abs(x);
    let [h1, h2, k1, k2] = [1, 0, 0, 1];
    let b = target;
    for (let i = 0; i < 40; i++) {
      const a = Math.floor(b);
      [h1, h2] = [a * h1 + h2, h1];
      [k1, k2] = [a * k1 + k2, k1];
      if (Math.abs(target - h1 / k1) < tol * Math.max(1, target) || k1 > 100000) break;
      if (b === a) break;
      b = 1 / (b - a);
    }
    return new Frac(sign * h1, k1);
  }

  // Accepts "3", "-2.5", "3/4", "-7/8"
  static parse(str) {
    const s = String(str).trim();
    if (s === "" || s === "-") return new Frac(0, 1);
    if (s.includes("/")) {
      const [a, b] = s.split("/");
      const num = Number(a.trim());
      const den = Number(b.trim());
      if (!Number.isFinite(num) || !Number.isFinite(den)) throw new Error(`Invalid fraction: ${str}`);
      return Frac.fromNumber(num).div(Frac.fromNumber(den));
    }
    const v = Number(s);
    if (!Number.isFinite(v)) throw new Error(`Invalid number: ${str}`);
    return Frac.fromNumber(v);
  }

  add(o) { o = Frac.from(o); return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Frac.from(o); return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Frac.from(o); return new Frac(this.n * o.n, this.d * o.d); }
  div(o) {
    o = Frac.from(o);
    if (o.n === 0) throw new Error("Division by zero");
    return new Frac(this.n * o.d, this.d * o.n);
  }
  neg() { return new Frac(-this.n, this.d); }
  abs() { return new Frac(Math.abs(this.n), this.d); }
  isZero() { return this.n === 0; }
  isOne() { return this.n === 1 && this.d === 1; }
  isInt() { return this.d === 1; }
  equals(o) { o = Frac.from(o); return this.n === o.n && this.d === o.d; }
  cmp(o) { o = Frac.from(o); return this.n * o.d - o.n * this.d; }
  valueOf() { return this.n / this.d; }
  toNumber() { return this.n / this.d; }

  toString() {
    return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`;
  }

  // Signed string that reads well inside expressions: "+ 3/4" / "- 3/4"
  toSignedString() {
    return this.n < 0 ? `- ${this.abs().toString()}` : `+ ${this.toString()}`;
  }

  toLatex() {
    if (this.d === 1) return String(this.n);
    const sign = this.n < 0 ? "-" : "";
    return `${sign}\\frac{${Math.abs(this.n)}}{${this.d}}`;
  }

  // Decimal view, trimmed of trailing zeros
  toDecimal(places = 6) {
    if (this.d === 1) return String(this.n);
    const v = this.toNumber();
    return String(parseFloat(v.toFixed(places)));
  }
}

export const frac = (n, d = 1) => new Frac(n, d);
export const ZERO = new Frac(0, 1);
export const ONE = new Frac(1, 1);
