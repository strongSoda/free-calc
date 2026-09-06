// src/components/calc/ui.jsx
// Small shared building blocks so every new calculator looks like the rest
// of the site without each component re-inventing the same Tailwind strings.
import React, { useState } from "react";

export const Card = ({ title, subtitle, children, className = "", tone = "default" }) => {
  const tones = {
    default: "bg-surface-light dark:bg-surface-dark-hover border-gray-200/10 dark:border-gray-800/10",
    accent: "bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border-accent-primary/20",
    success: "bg-accent-success/10 border-accent-success/20",
    warning: "bg-accent-warning/10 border-accent-warning/20",
  };
  return (
    <div className={`rounded-xl border p-4 md:p-6 ${tones[tone] || tones.default} ${className}`}>
      {title && <h3 className="font-display text-lg font-bold mb-1">{title}</h3>}
      {subtitle && (
        <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-4">{subtitle}</p>
      )}
      {children}
    </div>
  );
};

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:opacity-90 shadow-md",
    secondary:
      "bg-surface-light-hover dark:bg-surface-dark border border-gray-200/20 dark:border-gray-800/40 hover:border-accent-primary/40",
    ghost: "hover:bg-surface-light-hover dark:hover:bg-surface-dark",
  };
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Field = ({ label, hint, children, className = "" }) => (
  <div className={className}>
    <label className="block text-sm font-medium mb-1.5">{label}</label>
    {children}
    {hint && (
      <p className="mt-1 text-xs text-content-light-dimmed dark:text-content-dark-dimmed">{hint}</p>
    )}
  </div>
);

export const TextInput = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 rounded-lg border border-gray-200/40 dark:border-gray-700/60 bg-surface-light dark:bg-surface-dark text-content-light dark:text-content-dark focus:outline-none focus:ring-2 focus:ring-accent-primary/50 font-mono ${className}`}
    {...props}
  />
);

export const Select = ({ className = "", children, ...props }) => (
  <select
    className={`w-full px-3 py-2 rounded-lg border border-gray-200/40 dark:border-gray-700/60 bg-surface-light dark:bg-surface-dark text-content-light dark:text-content-dark focus:outline-none focus:ring-2 focus:ring-accent-primary/50 ${className}`}
    {...props}
  >
    {children}
  </select>
);

export const ErrorNote = ({ children }) =>
  children ? (
    <div className="rounded-lg border border-accent-error/30 bg-accent-error/10 px-4 py-3 text-sm text-accent-error">
      {children}
    </div>
  ) : null;

/** A matrix rendered with real square brackets, no MathJax required. */
export const MatrixDisplay = ({ matrix, label, highlight, className = "" }) => {
  if (!matrix || !matrix.length) return null;
  const cell = (v) => (typeof v === "object" && v !== null && "toString" in v ? v.toString() : String(v));
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {label && <span className="font-display font-semibold">{label} =</span>}
      <div className="relative inline-flex py-1">
        <span className="w-2 border-y-2 border-l-2 border-content-light-dimmed dark:border-content-dark-dimmed rounded-l-sm" />
        <div className="px-2 py-1">
          <table className="border-separate border-spacing-x-3 border-spacing-y-1">
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((v, j) => (
                    <td
                      key={j}
                      className={`text-center font-mono text-sm tabular-nums ${
                        highlight && highlight(i, j) ? "text-accent-primary font-bold" : ""
                      }`}
                    >
                      {cell(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <span className="w-2 border-y-2 border-r-2 border-content-light-dimmed dark:border-content-dark-dimmed rounded-r-sm" />
      </div>
    </div>
  );
};

/** Numbered, expandable list of worked steps. */
export const StepList = ({ steps, renderStep, title = "Step-by-step solution", defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  if (!steps || !steps.length) return null;
  return (
    <div className="rounded-xl border border-gray-200/10 dark:border-gray-800/10 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 md:px-6 py-4 bg-surface-light-hover dark:bg-surface-dark text-left"
      >
        <span className="font-display text-lg font-bold">
          {title} <span className="text-sm font-normal opacity-60">({steps.length} steps)</span>
        </span>
        <span className="text-accent-primary text-sm">{open ? "Hide" : "Show"}</span>
      </button>
      {open && (
        <ol className="divide-y divide-gray-200/10 dark:divide-gray-800/10">
          {steps.map((step, i) => (
            <li key={i} className="p-4 md:p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-primary/15 text-accent-primary text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 overflow-x-auto">{renderStep(step, i)}</div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export const ResultBanner = ({ label, value, note, children }) => (
  <div className="rounded-xl border border-accent-primary/20 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 p-5 md:p-6">
    <div className="text-sm uppercase tracking-wide text-content-light-dimmed dark:text-content-dark-dimmed mb-2">
      {label}
    </div>
    {value !== undefined && (
      <div className="font-display text-2xl md:text-3xl font-bold break-words bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
        {value}
      </div>
    )}
    {children}
    {note && (
      <p className="mt-3 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">{note}</p>
    )}
  </div>
);

export const CopyButton = ({ text, label = "Copy result" }) => {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="secondary"
      className="text-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? "Copied" : label}
    </Button>
  );
};

export const Presets = ({ items, onPick, label = "Try an example" }) => (
  <div>
    <div className="text-sm font-medium mb-2">{label}</div>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onPick(item)}
          className="px-3 py-1.5 rounded-full text-sm bg-surface-light-hover dark:bg-surface-dark border border-gray-200/20 dark:border-gray-800/40 hover:border-accent-primary/50 hover:text-accent-primary transition-colors font-mono"
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);
