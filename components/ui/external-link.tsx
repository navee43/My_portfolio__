import { newTab } from "@/lib/links";

/** A link to another site. Opens in a new tab and says so to screen readers. */
export function ExternalLink({
  href,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel ? `${ariaLabel} (opens in a new tab)` : undefined}
      {...newTab}
    >
      {children}
      {!ariaLabel && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
