// src/components/LineIntegralCalculator.jsx
// Scalar line integrals ∫f ds and vector line integrals (work) ∫F·dr along a
// parametrised curve r(t) = (x(t), y(t), z(t)).
import React, { useState, useEffect, useCallback } from "react";
import { Card, Field, TextInput, ErrorNote, ResultBanner, CopyButton, Presets } from "./calc/ui.jsx";
import { compile } from "../utils/expression.js";
import { integrate1D, derivative, recognizeClosedForm, roundNice } from "../utils/numeric.js";

const PRESETS = [
  {
    label: "Work of F=(y, x) on the unit circle",
    type: "vector", P: "y", Q: "x", R: "0",
    x: "cos(t)", y: "sin(t)", z: "0", a: "0", b: "2*pi",
  },
  {
    label: "Arc length of a helix",
    type: "scalar", f: "1",
    x: "cos(t)", y: "sin(t)", z: "t", a: "0", b: "2*pi",
  },
  {
    label: "∫(x+y) ds on a line segment",
    type: "scalar", f: "x+y",
    x: "t", y: "2*t", z: "0", a: "0", b: "1",
  },
  {
    label: "Circulation of F=(-y, x) around a circle",
    type: "vector", P: "-y", Q: "x", R: "0",
    x: "3*cos(t)", y: "3*sin(t)", z: "0", a: "0", b: "2*pi",
  },
  {
    label: "∫ x²  ds on a parabola",
    type: "scalar", f: "x^2",
    x: "t", y: "t^2", z: "0", a: "0", b: "1",
  },
];

const LineIntegralCalculator = ({
  defaultType = "scalar",
  defaultValues = null,
  lockType = false,
}) => {
  const [type, setType] = useState(defaultType);
  const [state, setState] = useState({
    f: "x+y",
    P: "y", Q: "x", R: "0",
    x: "cos(t)", y: "sin(t)", z: "0",
    a: "0", b: "2*pi",
    ...(defaultValues || {}),
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const set = (key, value) => setState((s) => ({ ...s, [key]: value }));

  const compute = useCallback(() => {
    setError("");
    try {
      const X = compile(state.x);
      const Y = compile(state.y);
      const Z = compile(state.z || "0");
      const a = compile(state.a)({});
      const b = compile(state.b)({});
      if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error("The parameter limits must be numbers");

      const at = (t) => ({ t });
      const xt = (t) => X(at(t));
      const yt = (t) => Y(at(t));
      const zt = (t) => Z(at(t));
      const point = (t) => ({ x: xt(t), y: yt(t), z: zt(t), t });

      let value;
      let arcLength = integrate1D(
        (t) => Math.hypot(derivative(xt, t), derivative(yt, t), derivative(zt, t)),
        a, b, 80
      );

      if (type === "scalar") {
        const F = compile(state.f);
        value = integrate1D((t) => {
          const speed = Math.hypot(derivative(xt, t), derivative(yt, t), derivative(zt, t));
          return F(point(t)) * speed;
        }, a, b, 120);
      } else {
        const P = compile(state.P);
        const Q = compile(state.Q);
        const R = compile(state.R || "0");
        value = integrate1D((t) => {
          const p = point(t);
          return (
            P(p) * derivative(xt, t) + Q(p) * derivative(yt, t) + R(p) * derivative(zt, t)
          );
        }, a, b, 120);
      }

      if (!Number.isFinite(value)) throw new Error("The integral did not converge — check the curve and the field");
      setResult({ value, arcLength, closed: recognizeClosedForm(value, 1e-6) });
    } catch (e) {
      setResult(null);
      setError(e.message || "Could not evaluate that line integral.");
    }
  }, [state, type]);

  useEffect(() => { compute(); }, [compute]);

  const notation =
    type === "scalar"
      ? `∫C (${state.f}) ds`
      : `∫C F·dr with F = (${state.P}, ${state.Q}, ${state.R})`;

  return (
    <div className="space-y-6">
      {!lockType && (
        <div className="inline-flex rounded-lg border border-gray-200/20 dark:border-gray-800/40 p-1 bg-surface-light-hover dark:bg-surface-dark">
          {[
            { id: "scalar", label: "Scalar field  ∫f ds" },
            { id: "vector", label: "Vector field  ∫F·dr" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setType(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                type === tab.id
                  ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white"
                  : "text-content-light-dimmed dark:text-content-dark-dimmed"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {type === "scalar" ? (
        <Field label="Scalar field f(x, y, z)" hint="Example: x+y, x^2*y, sqrt(x^2+y^2). Use f = 1 to get arc length.">
          <TextInput value={state.f} onChange={(e) => set("f", e.target.value)} />
        </Field>
      ) : (
        <Card title="Vector field F = (P, Q, R)" subtitle="Each component in terms of x, y and z">
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="P (i component)"><TextInput value={state.P} onChange={(e) => set("P", e.target.value)} /></Field>
            <Field label="Q (j component)"><TextInput value={state.Q} onChange={(e) => set("Q", e.target.value)} /></Field>
            <Field label="R (k component)"><TextInput value={state.R} onChange={(e) => set("R", e.target.value)} /></Field>
          </div>
        </Card>
      )}

      <Card title="Curve C: r(t) = (x(t), y(t), z(t))" subtitle="Leave z(t) as 0 for a plane curve">
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="x(t)"><TextInput value={state.x} onChange={(e) => set("x", e.target.value)} /></Field>
          <Field label="y(t)"><TextInput value={state.y} onChange={(e) => set("y", e.target.value)} /></Field>
          <Field label="z(t)"><TextInput value={state.z} onChange={(e) => set("z", e.target.value)} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 max-w-sm">
          <Field label="t from"><TextInput value={state.a} onChange={(e) => set("a", e.target.value)} /></Field>
          <Field label="t to"><TextInput value={state.b} onChange={(e) => set("b", e.target.value)} /></Field>
        </div>
      </Card>

      <Presets
        items={PRESETS}
        onPick={(p) => {
          setType(p.type);
          setState((s) => ({ ...s, ...p }));
        }}
      />

      <ErrorNote>{error}</ErrorNote>

      {result && (
        <>
          <ResultBanner
            label={type === "scalar" ? "Line integral (scalar field)" : "Line integral (work done by F)"}
            value={result.closed ? `${result.closed}  ≈  ${roundNice(result.value, 8)}` : String(roundNice(result.value, 10))}
            note={`${notation} along r(t) = (${state.x}, ${state.y}, ${state.z}) for t ∈ [${state.a}, ${state.b}]. Arc length of the curve: ${roundNice(result.arcLength, 6)}.`}
          />
          <div className="flex justify-end">
            <CopyButton text={`${notation} = ${roundNice(result.value, 10)}`} />
          </div>
        </>
      )}
    </div>
  );
};

export default LineIntegralCalculator;
