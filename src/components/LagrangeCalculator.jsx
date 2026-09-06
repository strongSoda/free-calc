// src/components/LagrangeCalculator.jsx
// Solves ∇f = λ∇g subject to g = c (optionally with a second constraint
// h = d and a second multiplier μ) by running Newton's method from a spread
// of starting points and collecting the distinct stationary points.
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Field, TextInput, Select, ErrorNote, ResultBanner, CopyButton, Presets } from "./calc/ui.jsx";
import { compile, parse, variablesUsed } from "../utils/expression.js";
import { gradient, newtonSolve, roundNice, recognizeClosedForm } from "../utils/numeric.js";

const PRESETS = [
  { label: "max xy s.t. x+y=10", f: "x*y", g: "x+y", c: "10", vars: "xy" },
  { label: "extremes of x²+y² on xy=1", f: "x^2+y^2", g: "x*y", c: "1", vars: "xy" },
  { label: "max x+y on x²+y²=1", f: "x+y", g: "x^2+y^2", c: "1", vars: "xy" },
  { label: "box volume, surface area 24", f: "x*y*z", g: "2*(x*y+y*z+x*z)", c: "24", vars: "xyz" },
  { label: "min x²+y²+z² on x+y+z=3", f: "x^2+y^2+z^2", g: "x+y+z", c: "3", vars: "xyz" },
  { label: "max 2x+3y on x²+y²=13", f: "2*x+3*y", g: "x^2+y^2", c: "13", vars: "xy" },
];

const START_GRID_2D = [];
for (const a of [-4, -2, -0.7, 0.7, 2, 4]) for (const b of [-4, -2, -0.7, 0.7, 2, 4]) START_GRID_2D.push([a, b]);
const START_GRID_3D = [];
for (const a of [-3, -1, 1, 3]) for (const b of [-3, -1, 1, 3]) for (const c of [-3, -1, 1, 3]) START_GRID_3D.push([a, b, c]);

const LagrangeCalculator = ({
  defaultF = "x*y",
  defaultG = "x+y",
  defaultC = "10",
  defaultVars = "xy",
}) => {
  const [f, setF] = useState(defaultF);
  const [g, setG] = useState(defaultG);
  const [c, setC] = useState(defaultC);
  const [varMode, setVarMode] = useState(defaultVars);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const vars = useMemo(() => (varMode === "xyz" ? ["x", "y", "z"] : ["x", "y"]), [varMode]);

  const compute = useCallback(() => {
    setError("");
    try {
      const fFn = compile(f);
      const gFn = compile(g);
      const cVal = compile(c)({});
      if (!Number.isFinite(cVal)) throw new Error("The constraint value must be a number");

      const used = new Set([...variablesUsed(parse(f)), ...variablesUsed(parse(g))]);
      const unknown = [...used].filter((v) => !vars.includes(v));
      if (unknown.length) throw new Error(`"${unknown[0]}" is not one of the variables — switch to the ${unknown[0] === "z" ? "three" : "two"}-variable mode or rename it`);

      const scope = (p) => Object.fromEntries(vars.map((v, i) => [v, p[i]]));
      const F = (p) => fFn(scope(p));
      const G = (p) => gFn(scope(p));

      // System: ∇f − λ∇g = 0 and g − c = 0, unknowns are [..vars, λ]
      const system = (u) => {
        const point = u.slice(0, vars.length);
        const lambda = u[vars.length];
        const gf = gradient(F, point);
        const gg = gradient(G, point);
        return [...gf.map((v, i) => v - lambda * gg[i]), G(point) - cVal];
      };

      const starts = vars.length === 3 ? START_GRID_3D : START_GRID_2D;
      const solutions = [];
      starts.forEach((start) => {
        [0.5, 2, -1].forEach((lambda0) => {
          const sol = newtonSolve(system, [...start, lambda0]);
          if (!sol) return;
          const point = sol.slice(0, vars.length).map((v) => roundNice(v, 8));
          const lambda = roundNice(sol[vars.length], 8);
          if (point.some((v) => !Number.isFinite(v) || Math.abs(v) > 1e6)) return;
          if (Math.abs(G(point) - cVal) > 1e-6) return;
          const value = F(point);
          if (!Number.isFinite(value)) return;
          const duplicate = solutions.some((s) => s.point.every((v, i) => Math.abs(v - point[i]) < 1e-5));
          if (!duplicate) solutions.push({ point, lambda, value: roundNice(value, 8) });
        });
      });

      if (!solutions.length) {
        throw new Error(
          "No stationary point was found. Check that the constraint can actually be satisfied, or try a different constraint value."
        );
      }

      solutions.sort((a, b) => b.value - a.value);
      const maxValue = solutions[0].value;
      const minValue = solutions[solutions.length - 1].value;
      solutions.forEach((s) => {
        s.classification =
          Math.abs(s.value - maxValue) < 1e-7
            ? solutions.length === 1 ? "stationary point" : "maximum"
            : Math.abs(s.value - minValue) < 1e-7 ? "minimum" : "saddle / neither";
      });

      setResult({ solutions, maxValue, minValue, vars });
    } catch (e) {
      setResult(null);
      setError(e.message || "Could not solve that system.");
    }
  }, [f, g, c, varMode, vars]);

  useEffect(() => { compute(); }, [compute]);

  const fmt = (v) => {
    const closed = recognizeClosedForm(v, 1e-7);
    return closed && closed.length <= 8 ? closed : String(roundNice(v, 6));
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Objective f" hint="The quantity to maximise or minimise">
          <TextInput value={f} onChange={(e) => setF(e.target.value)} placeholder="x*y" />
        </Field>
        <Field label="Constraint g" hint="Left-hand side of g = c">
          <TextInput value={g} onChange={(e) => setG(e.target.value)} placeholder="x+y" />
        </Field>
        <Field label="Constraint value c" hint="Right-hand side">
          <TextInput value={c} onChange={(e) => setC(e.target.value)} placeholder="10" />
        </Field>
      </div>

      <Field label="Variables" className="max-w-xs">
        <Select value={varMode} onChange={(e) => setVarMode(e.target.value)}>
          <option value="xy">Two variables (x, y)</option>
          <option value="xyz">Three variables (x, y, z)</option>
        </Select>
      </Field>

      <Presets
        items={PRESETS}
        onPick={(p) => { setF(p.f); setG(p.g); setC(p.c); setVarMode(p.vars); }}
      />

      <ErrorNote>{error}</ErrorNote>

      {result && (
        <>
          <ResultBanner label="Lagrange system">
            <div className="font-mono text-sm md:text-base space-y-1 mt-1">
              <div>∇f = λ∇g</div>
              {vars.map((v) => (
                <div key={v}>∂f/∂{v} = λ · ∂g/∂{v}</div>
              ))}
              <div>{g} = {c}</div>
            </div>
          </ResultBanner>

          <Card title="Critical points found">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200/20 dark:border-gray-800/40">
                    {vars.map((v) => <th key={v} className="py-2 pr-6 font-display">{v}</th>)}
                    <th className="py-2 pr-6 font-display">λ</th>
                    <th className="py-2 pr-6 font-display">f</th>
                    <th className="py-2 font-display">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {result.solutions.map((s, i) => (
                    <tr key={i} className="border-b border-gray-200/10 dark:border-gray-800/20 font-mono">
                      {s.point.map((v, j) => <td key={j} className="py-2 pr-6">{fmt(v)}</td>)}
                      <td className="py-2 pr-6">{fmt(s.lambda)}</td>
                      <td className="py-2 pr-6 text-accent-primary font-bold">{fmt(s.value)}</td>
                      <td className={`py-2 ${s.classification === "maximum" ? "text-accent-success" : s.classification === "minimum" ? "text-accent-warning" : ""}`}>
                        {s.classification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card title="Maximum value" tone="success">
              <p className="font-mono text-xl">{fmt(result.maxValue)}</p>
              <p className="mt-1 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                at ({result.solutions[0].point.map(fmt).join(", ")})
              </p>
            </Card>
            <Card title="Minimum value" tone="warning">
              <p className="font-mono text-xl">{fmt(result.minValue)}</p>
              <p className="mt-1 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                at ({result.solutions[result.solutions.length - 1].point.map(fmt).join(", ")})
              </p>
            </Card>
          </div>

          <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
            The multiplier λ is the shadow price: increasing c by one unit changes the optimal value of f by about λ.
            Note that on an unbounded constraint set the largest value found here may be a local extreme rather than a global one.
          </p>

          <div className="flex justify-end">
            <CopyButton
              text={result.solutions
                .map((s) => `(${s.point.join(", ")}) λ=${s.lambda} f=${s.value} [${s.classification}]`)
                .join("\n")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LagrangeCalculator;
