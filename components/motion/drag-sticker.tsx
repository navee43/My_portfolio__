"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A sticker you can drag around with the mouse, purely for fun.
 * Touch and pen are ignored so it never fights with page scrolling.
 * The outer element pops in once; the inner sticker wiggles on hover,
 * so the two animations never replace each other.
 */
export function DragSticker({
  children,
  className,
  tilt = -3,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: offset.current.x, oy: offset.current.y };
    ref.current?.setAttribute("data-dragging", "true");
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !ref.current) return;
    offset.current = {
      x: drag.current.ox + e.clientX - drag.current.sx,
      y: drag.current.oy + e.clientY - drag.current.sy,
    };
    ref.current.style.translate = `${offset.current.x}px ${offset.current.y}px`;
  };
  const onPointerUp = () => {
    drag.current = null;
    ref.current?.removeAttribute("data-dragging");
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      data-cursor
      title="Drag me"
      style={{ ["--delay" as string]: `${delay}ms` }}
      className="group/drag sticker-in select-none [@media(pointer:fine)]:cursor-grab data-[dragging=true]:cursor-grabbing"
    >
      <span
        style={{ ["--tilt" as string]: `${tilt}deg` }}
        className={cn(
          "sticker wiggle-hover text-sm transition-shadow",
          "group-data-[dragging=true]/drag:shadow-[5px_5px_0_0_var(--sticker-ink)]",
          className,
        )}
      >
        {children}
      </span>
    </div>
  );
}
