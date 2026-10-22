import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ink" | "quiet";
type Size = "md" | "sm";

/**
 * Chunky buttons with a hard offset shadow: they lift on hover and press
 * flat on click. As a class helper, the same look works on <a>, <Link>
 * and <button>.
 */
export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[12px] font-bold tracking-[-0.005em]",
    "transition-[transform,box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
    "disabled:pointer-events-none disabled:opacity-50",
    size === "md" && "h-12 px-5 text-[0.9375rem]",
    size === "sm" && "h-10 px-3.5 text-sm",
    variant !== "quiet" &&
      "border-2 shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--hard)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
    variant === "primary" && "border-sticker-ink bg-marigold text-sticker-ink",
    variant === "ink" && "border-sticker-ink bg-sticker-ink text-[#f4f2ff] dark:border-marigold",
    variant === "secondary" && "border-edge bg-surface text-ink",
    variant === "quiet" && "px-2 text-ink-2 underline-offset-[6px] hover:text-ink hover:underline",
    className,
  );
}
