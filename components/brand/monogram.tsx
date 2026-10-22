import { cn } from "@/lib/utils";

/**
 * The NY monogram, drawn as a tiny node graph: the strokes are edges and the
 * joints are nodes. The Y's junction is the "active" node, in the accent colour,
 * echoing the agent graph in the hero.
 */
export function Monogram({ className, title }: { className?: string; title?: string }) {
  const nodes: [number, number][] = [
    [4, 26],
    [4, 4],
    [17, 26],
    [17, 4],
    [23, 4],
    [37, 4],
    [30, 26],
  ];
  return (
    <svg
      viewBox="0 0 41 30"
      className={cn("h-6 w-auto", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 26V4l13 22V4" />
        <path d="M23 4l7 10.5L37 4M30 14.5V26" />
      </g>
      {nodes.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.6} fill="var(--bg)" stroke="currentColor" strokeWidth={1.8} />
      ))}
      <circle cx={30} cy={14.5} r={3.6} fill="var(--marigold)" stroke="var(--sticker-ink)" strokeWidth={1.2} />
    </svg>
  );
}
