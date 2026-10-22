"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure like "70%", "~15%", "15,000+" or "50+" up from zero the
 * first time it scrolls into view. Anything that isn't a single number
 * (for example "15 min → <45 s") is shown as-is. The server renders the
 * final value, so it reads correctly without JavaScript.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^([^\d]*)([\d,]+)([^\d]*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const end = Number(digits.replace(/,/g, ""));
    const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-IN")}${suffix}`;
    let frame = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(format(end * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
          else setDisplay(value);
        };
        setDisplay(format(0));
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
