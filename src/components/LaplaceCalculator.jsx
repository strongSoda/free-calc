// src/components/LaplaceCalculator.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Field, TextInput, ErrorNote, ResultBanner, StepList, CopyButton, Presets } from "./calc/ui.jsx";
import { laplaceTransform, inverseLaplace } from "../utils/laplace.js";

const FORWARD_PRESETS = [
  { label: "t^2", expression: "t^2" },
  { label: "e^(3t)", expression: "e^(3t)" },
  { label: "sin(2t)", expression: "sin(2t)" },
  { label: "cos(5t)", expression: "cos(5t)" },
  { label: "t·e^(-2t)", expression: "t*e^(-2t)" },
  { label: "e^(2t)sin(3t)", expression: "e^(2t)*sin(3t)" },
  { label: "t·cos(4t)", expression: "t*cos(4t)" },
  { label: "3t^2 + 2t - 5", expression: "3t^2+2t-5" },
  { label: "δ(t)", expression: "delta(t)" },
];

const INVERSE_PRESETS = [
  { label: "1/(s-3)", numerator: "1", denominator: "s-3" },
  { label: "1/s^2", numerator: "1", denominator: "s^2" },
  { label: "1/(s^2+4)", numerator: "1", denominator: "s^2+4" },
  { label: "s/(s^2+9)", numerator: "s", denominator: "s^2+9" },
  { label: "1/(s(s+1))", numerator: "1", denominator: "s(s+1)" },
  { label: "(2s+3)/((s+1)(s^2+4))", numerator: "2s+3", denominator: "(s+1)(s^2+4)" },
  { label: "1/(s+1)^2", numerator: "1", denominator: "(s+1)^2" },
  { label: "(s+5)/(s^2+2s+10)", numerator: "s+5", denominator: "s^2+2s+10" },
];

const LaplaceCalculator = ({
  defaultMode = "forward",
  defaultExpression = "sin(2t)",
  defaultNumerator = "1",
  defaultDenominator = "s^2+4",
  lockMode = false,
}) => {
  const [mode, setMode] = useState(defaultMode);
  const [expression, setExpression] = useState(defaultExpression);
  const [numerator, setNumerator] = useState(defaultNumerator);
  const [denominator, setDenominator] = useState(defaultDenominator);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const compute = useCallback(() => {
    setError("");
    try {
      if (mode === "forward") {
        if (!expression.trim()) { setResult(null); return; }
        setResult({ kind: "forward", ...laplaceTransform(expression) });
      } else {
        if (!numerator.trim() || !denominator.trim()) { setResult(null); return; }
        setResult({ kind: "inverse", ...inverseLaplace(numerator, denominator) });
      }
    } catch (e) {
      setResult(null);
      setError(e.message || "That expression could not be transformed.");
    }
  }, [mode, expression, numerator, denominator]);

  useEffect(() => { compute(); }, [compute]);

  return (
    <div className="space-y-6">
      {!lockMode && (
        <div className="inline-flex rounded-lg border border-gray-200/20 dark:border-gray-800/40 p-1 bg-surface-light-hover dark:bg-surface-dark">
          {[
            { id: "forward", label: "Laplace transform" },
            { id: "inverse", label: "Inverse transform" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === tab.id
                  ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white"
                  : "text-content-light-dimmed dark:text-content-dark-dimmed"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {mode === "forward" ? (
        <>
          <Field
            label="f(t) — the function to transform"
            hint="Use t as the variable. Examples: t^3, e^(-2t), sin(3t), t*cos(2t), 4t^2+3. Write δ(t) as delta(t)."
          >
            <TextInput value={expression} onChange={(e) => setExpression(e.target.value)} placeholder="sin(2t)" />
          </Field>
          <Presets items={FORWARD_PRESETS} onPick={(p) => setExpression(p.expression)} />
        </>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Numerator N(s)" hint="e.g. 2s+3">
              <TextInput value={numerator} onChange={(e) => setNumerator(e.target.value)} placeholder="1" />
            </Field>
            <Field label="Denominator D(s)" hint="Expanded or factored, e.g. (s+1)(s^2+4)">
              <TextInput value={denominator} onChange={(e) => setDenominator(e.target.value)} placeholder="s^2+4" />
            </Field>
          </div>
          <Presets
            items={INVERSE_PRESETS}
            onPick={(p) => { setNumerator(p.numerator); setDenominator(p.denominator); }}
          />
        </>
      )}

      <ErrorNote>{error}</ErrorNote>

      {result && result.kind === "forward" && (
        <>
          <ResultBanner label={`Laplace transform of ${expression}`} value={`F(s) = ${result.string}`} note={result.linearityNote} />
          <StepList
            title="How each term transforms"
            steps={result.steps}
            renderStep={(step) => (
              <div>
                <div className="font-mono font-semibold mb-1">
                  L{"{"}{step.term}{"}"} = {step.result}
                </div>
                <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  Table rule: {step.rule}
                </p>
              </div>
            )}
          />
          <div className="flex justify-end">
            <CopyButton text={`L{${expression}} = ${result.string}`} />
          </div>
        </>
      )}

      {result && result.kind === "inverse" && (
        <>
          <ResultBanner
            label={`Inverse Laplace transform of (${numerator})/(${denominator})`}
            value={`f(t) = ${result.string}`}
            note="Every term of the partial fraction expansion is inverted with the standard transform pairs."
          />
          <Card title="Partial fraction expansion">
            <p className="font-mono break-words">
              F(s) = {result.partialFractions.terms.map((t) => t.string).join(" + ") || "0"}
            </p>
          </Card>
          <StepList
            title="Worked solution"
            steps={result.steps}
            renderStep={(step) => (
              <div>
                <div className="font-semibold mb-1">{step.title || "Step"}</div>
                {step.detail && (
                  <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed whitespace-pre-line">
                    {step.detail}
                  </p>
                )}
                {step.solution && (
                  <ul className="mt-2 font-mono text-sm space-y-0.5">
                    {step.solution.map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                )}
              </div>
            )}
          />
          <div className="flex justify-end">
            <CopyButton text={`L⁻¹{(${numerator})/(${denominator})} = ${result.string}`} />
          </div>
        </>
      )}
    </div>
  );
};

export default LaplaceCalculator;
