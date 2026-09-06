// src/components/PartialFractionCalculator.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Card, Field, TextInput, ErrorNote, ResultBanner, StepList, CopyButton, Presets } from "./calc/ui.jsx";
import { partialFractions, decompositionToString, factorToString } from "../utils/partialFractions.js";
import { parsePolyExpression, isZeroPoly } from "../utils/polynomial.js";

const PRESETS = [
  { label: "1/(x^2-1)", numerator: "1", denominator: "x^2-1" },
  { label: "(3x+11)/(x^2-x-6)", numerator: "3x+11", denominator: "x^2-x-6" },
  { label: "1/(x(x+1)(x+2))", numerator: "1", denominator: "x(x+1)(x+2)" },
  { label: "x^2/(x-1)^3", numerator: "x^2", denominator: "(x-1)^3" },
  { label: "1/(x^3-1)", numerator: "1", denominator: "x^3-1" },
  { label: "(x^3+1)/(x^2+4)^2", numerator: "x^3+1", denominator: "(x^2+4)^2" },
  { label: "x^3/(x^2-1)", numerator: "x^3", denominator: "x^2-1" },
  { label: "1/(x^4-1)", numerator: "1", denominator: "x^4-1" },
];

const PartialFractionCalculator = ({
  defaultNumerator = "1",
  defaultDenominator = "x^2-1",
  variable = "x",
}) => {
  const [numerator, setNumerator] = useState(defaultNumerator);
  const [denominator, setDenominator] = useState(defaultDenominator);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const compute = useCallback(() => {
    setError("");
    try {
      if (!numerator.trim() || !denominator.trim()) { setResult(null); return; }
      const num = parsePolyExpression(numerator, variable);
      const den = parsePolyExpression(denominator, variable);
      setResult(partialFractions(num, den, variable));
    } catch (e) {
      setResult(null);
      setError(e.message || "That fraction could not be decomposed.");
    }
  }, [numerator, denominator, variable]);

  useEffect(() => { compute(); }, [compute]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label={`Numerator N(${variable})`} hint="e.g. 3x+11">
          <TextInput value={numerator} onChange={(e) => setNumerator(e.target.value)} placeholder="1" />
        </Field>
        <Field label={`Denominator D(${variable})`} hint="Expanded or factored, e.g. (x-2)(x+3) or x^2+x-6">
          <TextInput value={denominator} onChange={(e) => setDenominator(e.target.value)} placeholder="x^2-1" />
        </Field>
      </div>

      <Presets items={PRESETS} onPick={(p) => { setNumerator(p.numerator); setDenominator(p.denominator); }} />

      <ErrorNote>{error}</ErrorNote>

      {result && (
        <>
          <ResultBanner
            label="Partial fraction decomposition"
            value={`${decompositionToString(result)}`}
            note={
              result.polynomialPart && !isZeroPoly(result.polynomialPart)
                ? "The fraction was improper, so a polynomial part came out of the long division."
                : null
            }
          />

          <Card title="Denominator factors">
            <div className="flex flex-wrap gap-2">
              {result.factors.map((f, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-light-hover dark:bg-surface-dark font-mono text-sm">
                  {factorToString(f, variable)}
                  <span className="ml-2 text-xs text-content-light-dimmed dark:text-content-dark-dimmed">
                    {f.type === "linear" ? "linear" : "irreducible quadratic"}
                    {f.multiplicity > 1 ? `, repeated ${f.multiplicity}×` : ""}
                  </span>
                </span>
              ))}
            </div>
          </Card>

          <StepList
            steps={result.steps}
            renderStep={(step) => (
              <div>
                <div className="font-semibold mb-1">{step.title}</div>
                <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed whitespace-pre-line font-mono">
                  {step.detail}
                </p>
                {step.solution && (
                  <ul className="mt-2 font-mono text-sm space-y-0.5 text-accent-primary">
                    {step.solution.map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                )}
              </div>
            )}
          />

          <div className="flex justify-end">
            <CopyButton text={`(${numerator})/(${denominator}) = ${decompositionToString(result)}`} />
          </div>
        </>
      )}
    </div>
  );
};

export default PartialFractionCalculator;
