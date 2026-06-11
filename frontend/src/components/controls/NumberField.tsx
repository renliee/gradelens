import type { NumericRange } from "../../types";

interface Props {
  label: string;
  unit: string;
  value: number;
  step: number;
  range?: NumericRange;
  onChange: (v: number) => void;
}

export default function NumberField({
  label,
  unit,
  value,
  step,
  range,
  onChange,
}: Props) {
  const outside =
    range !== undefined && (value < range.min || value > range.max);

  const clampFloor = (v: number) => (Number.isFinite(v) ? Math.max(0, v) : 0);

  return (
    <div className={`numfield${outside ? " numfield--outside" : ""}`}>
      <label className="numfield__label">
        {label}
        <span className="numfield__unit">{unit}</span>
      </label>

      <div className="numfield__control">
        <button
          type="button"
          className="numfield__step"
          aria-label={`decrease ${label}`}
          onClick={() => onChange(clampFloor(value - step))}
        >
          −
        </button>
        <input
          type="number"
          className="numfield__input"
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(clampFloor(Number(e.target.value)))}
        />
        <button
          type="button"
          className="numfield__step"
          aria-label={`increase ${label}`}
          onClick={() => onChange(clampFloor(value + step))}
        >
          +
        </button>
      </div>

      {range && (
        <div className="numfield__hint">
          {outside ? (
            <span className="numfield__warn">
              outside training data ({range.min} to {range.max})
            </span>
          ) : (
            <span>
              dataset {range.min} to {range.max}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
