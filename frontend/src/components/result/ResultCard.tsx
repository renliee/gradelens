import type { Prediction } from "../../types";
import Icon from "../Icon";
import AnimatedNumber from "./AnimatedNumber";

export default function ResultCard({ result }: { result: Prediction }) {
  return (
    <div className={`result result--${result.band.level}`}>
      <div className="result__top">
        <div className="result__scoreblock">
          <div className="result__score">
            <AnimatedNumber value={result.score} />
            <span className="result__outof">out of 100</span>
          </div>
          <span className={`result__band result__band--${result.band.level}`}>
            {result.band.label}
          </span>
        </div>
        <p className="result__interp">{result.interpretation}</p>
      </div>

      <div className="result__grid">
        <section className="result__panel">
          <h4 className="result__panel-title">Suggestions</h4>
          <ul className="tips">
            {result.suggestions.map((s, i) => (
              <li key={i} className="tip">
                <span className="tip__icon">
                  <Icon name={s.icon} size={18} />
                </span>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
