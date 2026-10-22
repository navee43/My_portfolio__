import { cn } from "@/lib/utils";

/**
 * Wraps an illustrative project preview. Everything inside is decorative
 * (aria-hidden); the frame itself carries a description for screen readers
 * and a visible label so no one mistakes it for a screenshot.
 */
export function PreviewFrame({
  alt,
  accent,
  backdrop,
  children,
  className,
}: {
  alt: string;
  /** The project's own accent colour, exposed to children as var(--pa). */
  accent: string;
  /** Background behind the app window. */
  backdrop: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Illustrative preview. ${alt}`}
      className={cn(
        "preview-root relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border-2 border-edge bg-surface-2",
        className,
      )}
      style={{ ["--pa" as string]: accent }}
    >
      <div aria-hidden="true" className="absolute inset-0" style={{ background: backdrop }} />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [background-size:2.2em_2.2em]"
      />
      <div aria-hidden="true" className="preview-em absolute inset-0 select-none">
        {children}
      </div>
      <span className="absolute top-[1.8%] left-[5%] rounded-full px-1 py-0.5 text-[0.6875rem] font-bold text-muted">
        Illustrative preview
      </span>
    </div>
  );
}

/** The floating app window used by every preview. */
export function PreviewWindow({
  title,
  right,
  className,
  children,
}: {
  title: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute top-[9%] right-[5%] bottom-[-5%] left-[5%] flex flex-col overflow-hidden rounded-[0.9em] border-2 border-edge bg-surface shadow-[0.25em_0.25em_0_0_var(--hard)]",
        "transition-transform duration-500 ease-[cubic-bezier(0.3,1.4,0.5,1)] group-hover/card:-translate-y-[0.5em] group-hover/card:-rotate-1",
        className,
      )}
    >
      <div className="flex h-[2.4em] shrink-0 items-center justify-between border-b-2 border-edge bg-raised px-[0.9em]">
        <div className="flex min-w-0 items-center gap-[0.5em] text-[0.82em] font-semibold text-ink">{title}</div>
        {right}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
