"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Switches between light and dark. Icons swap with CSS (the .dark class that
 * next-themes sets before paint), so there's no hydration flash. Where the
 * browser supports it, the switch cross-fades with a View Transition.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Apply the class directly so the new theme is in the DOM before the
    // transition takes its "after" snapshot; next-themes then stores the choice.
    const apply = () => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
      setTheme(next);
    };
    if (!reduce && typeof document.startViewTransition === "function") {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-full border-2 border-transparent text-ink",
        "transition-[transform,background-color,border-color] duration-300 hover:rotate-[20deg] hover:border-edge hover:bg-marigold hover:text-sticker-ink",
        className,
      )}
    >
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
      <Moon className="size-[18px] dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-[18px] dark:block" aria-hidden="true" />
    </button>
  );
}
