// src/components/TripleIntegralCalculator.jsx
// Numerical triple integration in Cartesian, cylindrical or spherical
// coordinates. Inner limits may depend on the outer variables.
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Field, TextInput, Select, ErrorNote, ResultBanner, CopyButton, Presets } from "./calc/ui.jsx";
import { compile } from "../utils/expression.js";
import { integrate3D, recognizeClosedForm, roundNice } from "../utils/numeric.js";

const SYSTEMS = {
  cartesian: {
    label: "Cartesian (dz dy dx)",
    vars: ["x", "y", "z"],
    note: "dV = dz dy dx",
  },
  cylindrical: {
    label: "Cylindrical (dz dr dθ)",
    vars: ["theta", "r", "z"],
    note: "dV = r dz dr dθ — the extra r is added for you",
  },
  spherical: {
    label: "Spherical (dρ dφ dθ)",
    vars: ["theta", "phi", "rho"],
    note: "dV = ρ² sin φ dρ dφ dθ — the Jacobian is added for you",
  },
};

const PRESETS = [
  {
    label: "Unit cube: xyz",
    system: "cartesian", f: "x*y*z",
    outer: ["0", "1"], middle: ["0", "1"], inner: ["0", "1"],
  },
  {
    label: "Volume of a sphere (r=2)",
    system: "spherical", f: "1",
    outer: ["0", "2*pi"], middle: ["0", "pi"], inner: ["0", "2"],
  },
  {
    label: "Cylinder volume (r=1, h=3)",
    system: "cylindrical", f: "1",
    outer: ["0", "2*pi"], middle: ["0", "1"], inner: ["0", "3"],
  },
  {
    label: "Tetrahedron x+y+z≤1",
    system: "cartesian", f: "1",
    outer: ["0", "1"], middle: ["0", "1-x"], inner: ["0", "1-x-y"],
  },
  {
    label: "x²+y²+z² over unit cube",
    system: "cartesian", f: "x^2+y^2+z^2",
    outer: ["0", "1"], middle: ["0", "1"], inner: ["0", "1"],
  },
];

const TripleIntegralCalculator = ({
  defaultSystem = "cartesian",
  defaultFunction = "x*y*z",
  defaultLimits = null,
}) => {
  const [system, setSystem] = useState(defaultSystem);
  const [fn, setFn] = useState(defaultFunction);
  const [limits, setLimits] = useState(
    defaultLimits || { outer: ["0", "1"], middle: ["0", "1"], inner: ["0", "1"] }
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const config = SYSTEMS[system];
  const [v1, v2, v3] = config.vars;
  const display = { theta: "θ", phi: "φ", rho: "ρ" };
  const show = (v) => display[v] || v;

  const setLimit = (level, index, value) =>
    setLimits((prev) => ({ ...prev, [level]: prev[level].map((v, i) => (i === index ? value : v)) }));

  const compute = useCallback(() => {
    setError("");
    try {
      const f = compile(fn);
      const outerA = compile(limits.outer[0])({});
      const outerB = compile(limits.outer[1])({});
      if (!Number.isFinite(outerA) || !Number.isFinite(outerB))
        throw new Error("The outermost limits must be plain numbers (they cannot depend on a variable)");

      const midA = compile(limits.middle[0]);
      const midB = compile(limits.middle[1]);
      const innerA = compile(limits.inner[0]);
      const innerB = compile(limits.inner[1]);

      const scope = (a, b, c) => ({ [v1]: a, [v2]: b, [v3]: c });
      // Cylindrical order is θ (outer), r (middle), z (inner), so the Jacobian
      // r is the middle variable. Spherical order is θ, φ, ρ -> ρ² sin φ.
      const integrandFixed = (a, b, c) => {
        const base = f(scope(a, b, c));
        if (system === "cylindrical") return base * b;
        if (system === "spherical") return base * c * c * Math.sin(b);
        return base;
      };

      const value = integrate3D(
        integrandFixed,
        [outerA, outerB],
        [(a) => midA({ [v1]: a }), (a) => midB({ [v1]: a })],
        [(a, b) => innerA({ [v1]: a, [v2]: b }), (a, b) => innerB({ [v1]: a, [v2]: b })],
        40
      );

      if (!Number.isFinite(value)) throw new Error("The integral did not converge — check the limits and the integrand");
      setResult({ value, closed: recognizeClosedForm(value, 1e-6) });
    } catch (e) {
      setResult(null);
      setError(e.message || "Could not evaluate that integral.");
    }
  }, [fn, limits, system, v1, v2, v3, config]);

  useEffect(() => { compute(); }, [compute]);

  const integralString = useMemo(
    () =>
      `∫[${limits.outer[0]}→${limits.outer[1]}] ∫[${limits.middle[0]}→${limits.middle[1]}] ∫[${limits.inner[0]}→${limits.inner[1]}] (${fn}) d${show(v3)} d${show(v2)} d${show(v1)}`,
    [limits, fn, v1, v2, v3]
  );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Coordinate system" hint={config.note}>
          <Select value={system} onChange={(e) => setSystem(e.target.value)}>
            {Object.entries(SYSTEMS).map(([id, s]) => (
              <option key={id} value={id}>{s.label}</option>
            ))}
          </Select>
        </Field>
        <Field label="Integrand f" hint={`In terms of ${config.vars.map(show).join(", ")}`}>
          <TextInput value={fn} onChange={(e) => setFn(e.target.value)} placeholder="x*y*z" />
        </Field>
      </div>

      <Card title="Limits of integration" subtitle="Inner limits may use the outer variables — e.g. 1-x, sqrt(1-x^2)">
        <div className="space-y-3">
          {[
            { level: "outer", v: v1, hint: "constants only" },
            { level: "middle", v: v2, hint: `may depend on ${show(v1)}` },
            { level: "inner", v: v3, hint: `may depend on ${show(v1)}, ${show(v2)}` },
          ].map(({ level, v, hint }) => (
            <div key={level} className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-2">
              <span className="font-mono text-sm w-20">{show(v)} from</span>
              <TextInput value={limits[level][0]} onChange={(e) => setLimit(level, 0, e.target.value)} className="text-sm" />
              <span className="text-sm">to</span>
              <TextInput value={limits[level][1]} onChange={(e) => setLimit(level, 1, e.target.value)} className="text-sm" />
              <span className="col-span-4 text-xs text-content-light-dimmed dark:text-content-dark-dimmed -mt-1">{hint}</span>
            </div>
          ))}
        </div>
      </Card>

      <Presets
        items={PRESETS}
        onPick={(p) => {
          setSystem(p.system);
          setFn(p.f);
          setLimits({ outer: p.outer, middle: p.middle, inner: p.inner });
        }}
      />

      <ErrorNote>{error}</ErrorNote>

      {result && (
        <>
          <ResultBanner
            label="Value of the triple integral"
            value={result.closed ? `${result.closed}  ≈  ${roundNice(result.value, 8)}` : String(roundNice(result.value, 10))}
            note={`${integralString}${result.closed ? "" : " — evaluated numerically with 40-point Gauss–Legendre quadrature in each direction."}`}
          />
          <div className="flex justify-end">
            <CopyButton text={`${integralString} = ${roundNice(result.value, 10)}`} />
          </div>
        </>
      )}
    </div>
  );
};

export default TripleIntegralCalculator;
