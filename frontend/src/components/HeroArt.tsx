export default function HeroArt() {
  return (
    <svg
      className="heroart"
      viewBox="0 0 420 320"
      role="img"
      aria-label="Illustration of a rising performance chart"
    >
      <defs>
        <linearGradient id="g-bars" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id="g-gold" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--gold)" />
        </linearGradient>
      </defs>

      <circle cx="330" cy="80" r="110" fill="var(--accent)" opacity="0.05" />
      <circle cx="80"  cy="260" r="70"  fill="var(--gold)"   opacity="0.06" />

      <g>
        <rect x="60"  y="200" width="44" height="70"  rx="6" fill="url(#g-bars)" opacity="0.45" />
        <rect x="124" y="158" width="44" height="112" rx="6" fill="url(#g-bars)" opacity="0.6"  />
        <rect x="188" y="116" width="44" height="154" rx="6" fill="url(#g-bars)" opacity="0.78" />
        <rect x="252" y="74"  width="44" height="196" rx="6" fill="url(#g-bars)" opacity="0.92" />
      </g>

      <polyline
        points="82,188 146,148 210,106 274,64 338,42"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0"
      />

      {[
        [82, 188],
        [146, 148],
        [210, 106],
        [274, 64],
        [338, 42],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}`}
          cx={cx}
          cy={cy}
          r="5"
          fill="var(--card)"
          stroke="var(--gold)"
          strokeWidth="2.5"
        />
      ))}

      <g transform="translate(300 205)" opacity="0.7">
        <path d="M0 12L34 0 68 12 34 24z" fill="var(--accent)" />
        <path
          d="M14 18v12c0 3.5 9 6 20 6s20-2.5 20-6V18"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
