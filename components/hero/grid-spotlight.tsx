"use client";

import { useEffect, useRef } from "react";

/**
 * Brightens the hero grid around the pointer. Desktop pointers only,
 * and off entirely when the visitor prefers reduced motion.
 */
export function GridSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--line-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--line-strong) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), black, transparent 72%)",
        WebkitMaskImage:
          "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), black, transparent 72%)",
      }}
    />
  );
}
