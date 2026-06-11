import type { FeatureSchema, Metadata } from "../../types";
import HeroArt from "../HeroArt";
import Icon from "../Icon";
import Predictor from "../Predictor";

interface Stat {
  icon: string;
  value: string;
  label: string;
  tone: string;
}

export default function DashboardTab({
  meta,
  schema,
}: {
  meta: Metadata | null;
  schema: FeatureSchema | null;
}) {
  const stats: Stat[] = [
    {
      icon: "database",
      value: meta ? meta.training_records.toLocaleString() : "6,607",
      label: "students in the dataset",
      tone: "a",
    },
    {
      icon: "gauge",
      value: meta ? meta.metrics.R2.toFixed(2) : "0.83",
      label: "R-squared, share of score explained",
      tone: "b",
    },
    {
      icon: "target",
      value: meta ? meta.metrics.MAE.toFixed(2) : "0.41",
      label: "typical error in points",
      tone: "c",
    },
    {
      icon: "layers",
      value: "19",
      label: "factors considered",
      tone: "d",
    },
  ];

  const scrollToPredict = () =>
    document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="tabpane">
      <section className="hero">
        <div className="hero__text">
          <span className="hero__eyebrow">{meta?.best_model ?? "Linear Regression"} model</span>
          <h1 className="hero__title">
            See what shapes a student's <span className="hero__hl">exam score</span>
          </h1>
          <p className="hero__lead">
            Enter a student's study habits and background. The model predicts the
            final exam score and breaks down which factors helped or held it back.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary" onClick={scrollToPredict}>
              <Icon name="arrowDown" size={18} />
              Predict a score
            </button>
          </div>
        </div>
        <div className="hero__art">
          <HeroArt />
        </div>
      </section>

      <section className="statstrip">
        {stats.map((s) => (
          <div key={s.label} className={`stat stat--${s.tone}`}>
            <span className="stat__icon">
              <Icon name={s.icon} size={22} />
            </span>
            <div className="stat__body">
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          </div>
        ))}
      </section>

      <Predictor schema={schema} />
    </div>
  );
}
