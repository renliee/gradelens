import { useEffect, useState } from "react";
import { getModelComparison, getReports, reportURL } from "../../api";
import type { Metadata, ModelComparison, ReportImage } from "../../types";
import Icon from "../Icon";

const STEPS = [
  {
    icon: "database",
    title: "Clean the data",
    text: "Start from 6,607 student records. Fill in a few missing entries and drop rows that cannot be used.",
  },
  {
    icon: "layers",
    title: "Prepare the factors",
    text: "Scale the number factors and turn words like Low, Medium, High into values the model can read.",
  },
  {
    icon: "chart",
    title: "Train several models",
    text: "Fit Linear Regression, Ridge, Random Forest, and others, then score each one with cross-validation.",
  },
  {
    icon: "target",
    title: "Pick the best",
    text: "Linear Regression gave the most accurate and stable results, so it is the model used here.",
  },
  {
    icon: "gauge",
    title: "Check accuracy",
    text: "Test the chosen model on data it never saw during training to confirm it holds up.",
  },
];

export default function HowItWorksTab({ meta }: { meta: Metadata | null }) {
  const [reports, setReports] = useState<ReportImage[]>([]);
  const [comparison, setComparison] = useState<ModelComparison | null>(null);

  useEffect(() => {
    getReports().then(setReports).catch(() => setReports([]));
    getModelComparison().then(setComparison).catch(() => setComparison(null));
  }, []);

  const metrics = [
    {
      short: "Mean Absolute Error",
      value: meta ? meta.metrics.MAE.toFixed(2) : "0.41",
      plain: "On average the prediction is off by about this many points.",
    },
    {
      short: "Root Mean Squared Error",
      value: meta ? meta.metrics.RMSE.toFixed(2) : "1.52",
      plain: "Like the average error, but large misses count more. Still small here.",
    },
    {
      short: "R-squared",
      value: meta ? meta.metrics.R2.toFixed(2) : "0.83",
      plain: "Share of the differences in scores the model can explain. 1.00 is perfect.",
    },
    {
      short: "Adjusted R-squared",
      value: meta ? meta.metrics.Adjusted_R2.toFixed(2) : "0.82",
      plain: "Same idea as R-squared, adjusted for the number of factors used.",
    },
  ];

  return (
    <div className="tabpane">
      <div className="section-head">
        <h2 className="section-title">How the model works</h2>
        <p className="section-sub">
          A short tour of the steps behind the prediction, from raw data to the
          finished model.
        </p>
      </div>

      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="step card">
            <span className="step__num">{i + 1}</span>
            <span className="step__icon">
              <Icon name={s.icon} size={22} />
            </span>
            <h3 className="step__title">{s.title}</h3>
            <p className="step__text">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="section-head">
        <h3 className="section-title section-title--sm">How accurate is it</h3>
        <p className="section-sub">
          Measured on test data the model never saw during training. Plain
          meaning under each number.
        </p>
      </div>
      <div className="metricgrid">
        {metrics.map((m) => (
          <div key={m.short} className="card metric">
            <div className="metric__value">{m.value}</div>
            <div className="metric__name">{m.short}</div>
            <p className="metric__plain">{m.plain}</p>
          </div>
        ))}
      </div>

      {comparison && comparison.test_results.length > 0 && (
        <>
          <div className="section-head">
            <h3 className="section-title section-title--sm">Models we compared</h3>
            <p className="section-sub">
              Lower error and higher R-squared is better. Linear Regression won.
            </p>
          </div>
          <div className="card tablewrap">
            <table className="cmptable">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Mean Absolute Error</th>
                  <th>Root Mean Squared Error</th>
                  <th>R-squared</th>
                </tr>
              </thead>
              <tbody>
                {comparison.test_results.map((r) => {
                  const best = r.Model === (meta?.best_model ?? "Linear Regression");
                  return (
                    <tr key={String(r.Model)} className={best ? "cmptable__best" : ""}>
                      <td>
                        {String(r.Model)}
                        {best && <span className="tag">best</span>}
                      </td>
                      <td>{fmt(r.MAE)}</td>
                      <td>{fmt(r.RMSE)}</td>
                      <td>{fmt(r.R2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="section-head">
        <h3 className="section-title section-title--sm">Charts from the analysis</h3>
        <p className="section-sub">
          The plots produced while exploring the data and checking the model.
        </p>
      </div>
      <div className="gallery">
        {reports.map((r) => (
          <figure key={r.file} className="card shot">
            <img src={reportURL(r.file)} alt={r.caption} loading="lazy" />
            <figcaption className="shot__cap">{r.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function fmt(v: string | number): string {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : String(v);
}
