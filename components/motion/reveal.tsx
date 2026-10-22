"use client";

import { useEffect, useRef, useState } from "react";

type Tag = "div" | "li" | "header" | "article" | "h3" | "section";
type Variant = "up" | "pop" | "left";

/* One shared observer for every Reveal on the page. */
const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function observe(el: Element, onEnter: () => void) {
  if (!("IntersectionObserver" in window)) {
    onEnter();
    return () => {};
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  callbacks.set(el, onEnter);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}

/**
 * Fades, slides or pops its content in the first time it scrolls into view.
 * React owns the data-in attribute, so there's no hydration mismatch. CSS
 * keeps content visible when JavaScript or motion is off (see globals.css).
 */
export function Reveal({
  as = "div",
  variant = "up",
  delay = 0,
  tilt,
  className,
  style,
  children,
  ...rest
}: {
  as?: Tag;
  variant?: Variant;
  /** Milliseconds before this element starts, for staggering. */
  delay?: number;
  /** Starting rotation, e.g. "-2deg". */
  tilt?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "style" | "className" | "children">) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Tells the failsafe in the layout that reveals are working.
    (window as unknown as { __reveal?: boolean }).__reveal = true;
    const el = ref.current;
    if (!el) return;
    return observe(el, () => setInView(true));
  }, []);

  // All allowed tags share the same props, so one JSX element covers them.
  const Tag = as as "div";
  return (
    <Tag
      {...rest}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      data-reveal={variant}
      data-in={inView ? "" : undefined}
      style={{
        ...style,
        ...(delay ? { ["--d" as string]: `${delay}ms` } : null),
        ...(tilt ? { ["--reveal-tilt" as string]: tilt } : null),
      }}
    >
      {children}
    </Tag>
  );
}
