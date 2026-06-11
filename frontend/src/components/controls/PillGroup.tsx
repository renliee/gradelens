interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

export default function PillGroup({ label, options, value, onChange }: Props) {
  return (
    <div className="pillgroup">
      <span className="pillgroup__label">{label}</span>
      <div className="pillgroup__track" role="group" aria-label={label}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`pill${opt === value ? " pill--on" : ""}`}
            aria-pressed={opt === value}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
