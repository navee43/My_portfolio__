import { cn } from "@/lib/utils";

/** A small technology label. Plain text, no icon, no rating. */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-[1.5px] border-line-strong bg-surface px-2.5 py-0.5 text-[0.8125rem] font-semibold leading-5 text-ink-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ChipList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
