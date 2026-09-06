// src/components/FOCCalculator.jsx
// Arrow front-of-center calculator.
// AMO formula:  FOC% = 100 × (balance point − arrow length ÷ 2) ÷ arrow length
import React, { useState, useMemo } from "react";
import { Card, Field, TextInput, ResultBanner, ErrorNote, CopyButton } from "./calc/ui.jsx";
import { FOC_BANDS, bandFor, calculateFOC, buildFromComponents } from "../utils/foc.js";

const FOCCalculator = ({
  defaultMode = "measured",
  defaultArrowLength = 29,
  defaultBalancePoint = 17,
  defaultComponents = null,
}) => {
  const [mode, setMode] = useState(defaultMode);
  const [arrowLength, setArrowLength] = useState(String(defaultArrowLength));
  const [balancePoint, setBalancePoint] = useState(String(defaultBalancePoint));
  const [drawWeight, setDrawWeight] = useState("60");
  const [build, setBuild] = useState({
    shaftLength: "29",
    gpi: "8.5",
    point: "125",
    insert: "20",
    collar: "0",
    nock: "10",
    fletching: "24",
    wrap: "0",
    ...(defaultComponents || {}),
  });

  const setBuildField = (key, value) => setBuild((b) => ({ ...b, [key]: value }));
  const n = (v) => {
    const x = parseFloat(v);
    return Number.isFinite(x) ? x : 0;
  };

  const measured = useMemo(() => {
    const L = n(arrowLength);
    const A = n(balancePoint);
    if (L <= 0) return { error: "Enter an arrow length greater than zero." };
    if (A <= 0 || A >= L) return { error: "The balance point must sit between the nock throat and the end of the arrow." };
    const foc = calculateFOC(L, A);
    return { foc, L, A, forward: A - L / 2 };
  }, [arrowLength, balancePoint]);

  const built = useMemo(() => {
    if (n(build.shaftLength) <= 0) return { error: "Enter a shaft length greater than zero." };
    const result = buildFromComponents(build);
    if (!result) return { error: "Enter at least one component weight." };
    return { ...result, gpp: n(drawWeight) > 0 ? result.total / n(drawWeight) : null };
  }, [build, drawWeight]);

  const active = mode === "measured" ? measured : built;
  const band = active.error ? null : bandFor(active.foc);

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-lg border border-gray-200/20 dark:border-gray-800/40 p-1 bg-surface-light-hover dark:bg-surface-dark">
        {[
          { id: "measured", label: "I measured the balance point" },
          { id: "build", label: "Estimate from components" },
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

      {mode === "measured" ? (
        <Card
          title="Measurements"
          subtitle="Measure from the throat of the nock to the end of the shaft (do not include the point), then balance the finished arrow on a straight edge."
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Arrow length (inches)" hint="Nock throat to end of shaft">
              <TextInput type="number" step="0.125" value={arrowLength} onChange={(e) => setArrowLength(e.target.value)} />
            </Field>
            <Field label="Balance point (inches from nock throat)" hint="Where the complete arrow balances">
              <TextInput type="number" step="0.125" value={balancePoint} onChange={(e) => setBalancePoint(e.target.value)} />
            </Field>
          </div>
        </Card>
      ) : (
        <Card title="Arrow build" subtitle="Component weights in grains; shaft weight comes from GPI × length.">
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Shaft length (in)"><TextInput type="number" step="0.25" value={build.shaftLength} onChange={(e) => setBuildField("shaftLength", e.target.value)} /></Field>
            <Field label="Shaft GPI"><TextInput type="number" step="0.1" value={build.gpi} onChange={(e) => setBuildField("gpi", e.target.value)} /></Field>
            <Field label="Point / broadhead (gr)"><TextInput type="number" value={build.point} onChange={(e) => setBuildField("point", e.target.value)} /></Field>
            <Field label="Insert (gr)"><TextInput type="number" value={build.insert} onChange={(e) => setBuildField("insert", e.target.value)} /></Field>
            <Field label="Outsert / collar (gr)"><TextInput type="number" value={build.collar} onChange={(e) => setBuildField("collar", e.target.value)} /></Field>
            <Field label="Nock (gr)"><TextInput type="number" value={build.nock} onChange={(e) => setBuildField("nock", e.target.value)} /></Field>
            <Field label="Fletching, all vanes (gr)"><TextInput type="number" value={build.fletching} onChange={(e) => setBuildField("fletching", e.target.value)} /></Field>
            <Field label="Wrap (gr)"><TextInput type="number" value={build.wrap} onChange={(e) => setBuildField("wrap", e.target.value)} /></Field>
            <Field label="Draw weight (lb)" hint="For grains per pound"><TextInput type="number" value={drawWeight} onChange={(e) => setDrawWeight(e.target.value)} /></Field>
          </div>
        </Card>
      )}

      <ErrorNote>{active.error}</ErrorNote>

      {!active.error && (
        <>
          <ResultBanner
            label="Front of center"
            value={`${active.foc.toFixed(2)}%`}
            note={`${band.name} — ${band.advice}`}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Card title="How this was calculated">
              <div className="font-mono text-sm space-y-1">
                <div>FOC = 100 × (A − L ÷ 2) ÷ L</div>
                <div>L = {(mode === "measured" ? measured.L : built.L).toFixed(2)} in (arrow length)</div>
                <div>A = {(mode === "measured" ? measured.A : built.balance).toFixed(2)} in (balance point)</div>
                <div>
                  A − L ÷ 2 = {((mode === "measured" ? measured.A : built.balance) - (mode === "measured" ? measured.L : built.L) / 2).toFixed(2)} in forward of centre
                </div>
                <div className="text-accent-primary font-bold">FOC = {active.foc.toFixed(2)}%</div>
              </div>
            </Card>

            {mode === "build" && (
              <Card title="Arrow weight">
                <ul className="text-sm space-y-1">
                  <li>Shaft: {built.shaftWeight.toFixed(1)} gr</li>
                  <li>Front end (point + insert + collar): {built.front.toFixed(1)} gr</li>
                  <li>Back end (nock + fletching + wrap): {built.rear.toFixed(1)} gr</li>
                  <li className="font-bold pt-1 border-t border-gray-200/20 dark:border-gray-800/40">
                    Total: {built.total.toFixed(1)} grains
                  </li>
                  {built.gpp && (
                    <li>
                      {built.gpp.toFixed(2)} grains per pound of draw weight
                      {built.gpp < 5 && " — below the 5 gpp minimum most compound manufacturers specify"}
                    </li>
                  )}
                </ul>
                <p className="mt-3 text-xs text-content-light-dimmed dark:text-content-dark-dimmed">
                  The balance point is estimated by treating the shaft as a uniform rod. Weigh and balance the finished
                  arrow for an exact figure.
                </p>
              </Card>
            )}
          </div>

          <Card title="What the number means">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200/20 dark:border-gray-800/40">
                    <th className="py-2 pr-6 font-display">FOC range</th>
                    <th className="py-2 font-display">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {FOC_BANDS.map((b) => (
                    <tr
                      key={b.name}
                      className={`border-b border-gray-200/10 dark:border-gray-800/20 ${
                        b.name === band.name ? "bg-accent-primary/10" : ""
                      }`}
                    >
                      <td className="py-2 pr-6 font-mono whitespace-nowrap">
                        {b.min === -Infinity ? `under ${b.max}%` : b.max === Infinity ? `${b.min}%+` : `${b.min}–${b.max}%`}
                      </td>
                      <td className="py-2">
                        <span className="font-semibold">{b.name}</span> — {b.advice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex justify-end">
            <CopyButton text={`FOC = ${active.foc.toFixed(2)}% (${band.name})`} />
          </div>
        </>
      )}
    </div>
  );
};

export default FOCCalculator;
