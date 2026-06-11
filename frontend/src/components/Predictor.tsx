import { useState } from "react";
import { predict } from "../api";
import { DEFAULT_INPUT, SECTIONS } from "../fields";
import type { FeatureSchema, Prediction, StudentInput } from "../types";
import NumberField from "./controls/NumberField";
import PillGroup from "./controls/PillGroup";
import ResultCard from "./result/ResultCard";

export default function Predictor({ schema }: { schema: FeatureSchema | null }) {
  const [input, setInput] = useState<StudentInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<Prediction | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = (key: keyof StudentInput, value: number | string) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await predict(input);
      setResult(res);
      requestAnimationFrame(() =>
        document
          .getElementById("result")
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setInput(DEFAULT_INPUT);
    setResult(null);
    setError(null);
  };

  return (
    <div className="predictor" id="predict">
      <div className="section-head">
        <h2 className="section-title">Predict a score</h2>
        <p className="section-sub">
          Fill in the factors below. The model returns a predicted exam score
          and shows what pushed it up or down.
        </p>
      </div>

      <form className="predict-grid" onSubmit={onSubmit}>
        <div className="form-cards">
          {SECTIONS.map((section) => (
            <fieldset key={section.title} className="card form-card">
              <legend className="form-card__title">{section.title}</legend>

              {section.numeric.length > 0 && (
                <div className="numgrid">
                  {section.numeric.map((f) => (
                    <NumberField
                      key={f.key}
                      label={f.label}
                      unit={f.unit}
                      step={f.step}
                      value={input[f.key] as number}
                      range={schema?.numeric[f.key]}
                      onChange={(v) => setField(f.key, v)}
                    />
                  ))}
                </div>
              )}

              {section.choice.map((f) => (
                <PillGroup
                  key={f.key}
                  label={f.label}
                  options={f.options}
                  value={input[f.key] as string}
                  onChange={(v) => setField(f.key, v)}
                />
              ))}
            </fieldset>
          ))}
        </div>

        <div className="predict-actions">
          <button type="submit" className="btn btn--primary" disabled={busy}>
            {busy ? "Predicting…" : "Predict score"}
          </button>
          <button type="button" className="btn btn--ghost" onClick={reset}>
            Reset
          </button>
        </div>
      </form>

      {error && <div className="banner banner--error">{error}</div>}

      <div id="result">{result && <ResultCard result={result} />}</div>
    </div>
  );
}
