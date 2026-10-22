"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Piece = { x: number; y: number; r: number; color: string; shape: string; delay: number };

const colors = ["var(--marigold)", "var(--lilac)", "var(--mint)", "var(--pink)", "var(--accent)"];

function makeBurst(): Piece[] {
  return Array.from({ length: 18 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.4;
    const dist = 60 + Math.random() * 70;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 20,
      r: Math.random() * 540 - 270,
      color: colors[i % colors.length],
      shape: i % 3 === 0 ? "rounded-full" : i % 3 === 1 ? "rounded-[2px]" : "rounded-[1px] w-1",
      delay: Math.random() * 60,
    };
  });
}

/** Copies the email address, confirms it visibly and to screen readers, and throws a little confetti. */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const [burst, setBurst] = useState<{ id: number; pieces: Piece[] } | null>(null);

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2200);
    return () => window.clearTimeout(t);
  }, [state]);

  useEffect(() => {
    if (!burst) return;
    const t = window.setTimeout(() => setBurst(null), 1000);
    return () => window.clearTimeout(t);
  }, [burst]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setBurst({ id: Date.now(), pieces: makeBurst() });
      }
    } catch {
      setState("failed");
    }
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative inline-flex">
        <button
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-[12px] border-2 px-4 text-sm font-bold shadow-hard transition-[transform,box-shadow,background-color,color] duration-200",
            "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--hard)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
            state === "copied"
              ? "border-sticker-ink bg-mint text-sticker-ink"
              : "border-sticker-ink bg-marigold text-sticker-ink",
          )}
        >
          <span key={state === "copied" ? "check" : "copy"} className="pop-in inline-flex">
            {state === "copied" ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          </span>
          {state === "copied" ? "Copied!" : "Copy email"}
        </button>
        {burst && (
          <span key={burst.id} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2">
            {burst.pieces.map((p, i) => (
              <span
                key={i}
                className={cn("absolute size-2 border border-sticker-ink", p.shape)}
                style={{
                  background: p.color,
                  ["--x" as string]: `${p.x}px`,
                  ["--y" as string]: `${p.y}px`,
                  ["--r" as string]: `${p.r}deg`,
                  animation: `confetti 0.85s cubic-bezier(0.2, 0.7, 0.3, 1) ${p.delay}ms both`,
                }}
              />
            ))}
          </span>
        )}
      </span>
      <span role="status" aria-live="polite" className="text-sm font-semibold text-muted">
        {state === "copied" && <span className="sr-only">Email address copied to clipboard</span>}
        {state === "failed" && "Couldn't copy. Select the address instead."}
      </span>
    </span>
  );
}
