import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({
  value,
  decimals = 1,
}: {
  value: number;
  decimals?: number;
}) {
  const [shown, setShown] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setShown(value);
      return;
    }
    const start = performance.now();
    const duration = 700;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(value * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value]);

  return <>{shown.toFixed(decimals)}</>;
}
