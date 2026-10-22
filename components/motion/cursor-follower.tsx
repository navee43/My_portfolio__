"use client";

import { useEffect, useRef } from "react";

/**
 * A soft ring that trails the mouse and swells over links and buttons.
 * The real cursor stays visible; this is decoration only. Mouse users
 * only, and off when the visitor prefers reduced motion.
 */
export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let scale = 1;
    let target = 1;
    let frame = 0;
    let visible = false;

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      scale += (target - scale) * 0.2;
      el.style.transform = `translate3d(${cx - 18}px, ${cy - 18}px, 0) scale(${scale})`;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        cx = x;
        cy = y;
        el.style.opacity = "1";
      }
      const hit = (e.target as Element | null)?.closest?.("a, button, [data-cursor]");
      target = hit ? 1.9 : 1;
      el.dataset.active = hit ? "true" : "false";
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden size-9 rounded-full border-2 border-accent opacity-0 transition-[opacity,background-color,border-color] duration-200 data-[active=true]:border-marigold data-[active=true]:bg-marigold/15 [@media(pointer:fine)]:block"
    />
  );
}
