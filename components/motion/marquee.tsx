import { Fragment } from "react";
import { cn } from "@/lib/utils";

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-[0.7em] shrink-0", className)}>
      <path d="M12 0c.7 6.4 5.6 11.3 12 12-6.4.7-11.3 5.6-12 12-.7-6.4-5.6-11.3-12-12C6.4 11.3 11.3 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

/**
 * A ticker tape that scrolls forever and pauses on hover. The list is
 * rendered twice for a seamless loop; the copy is hidden from screen
 * readers, which get the list once.
 */
export function Marquee({
  items,
  className,
  speed = 38,
  reverse = false,
  label,
}: {
  items: readonly string[];
  className?: string;
  speed?: number;
  reverse?: boolean;
  label: string;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center" aria-label={hidden ? undefined : label}>
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <li className="whitespace-nowrap px-5">{item}</li>
          <li aria-hidden="true" className="flex items-center">
            <Star />
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee overflow-hidden", reverse && "marquee-reverse", className)}>
      <div className="marquee-track" style={{ ["--marquee-speed" as string]: `${speed}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export { Star };
