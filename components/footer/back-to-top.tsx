"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        // Move focus to the top of the page for keyboard and screen reader users.
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group inline-flex h-10 items-center gap-2 rounded-full border-2 border-edge bg-surface px-4 text-sm font-bold text-ink shadow-hard-sm transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-marigold hover:text-sticker-ink hover:shadow-hard"
    >
      Back to top
      <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
    </button>
  );
}
