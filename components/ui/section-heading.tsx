import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

const stickerColors = {
  marigold: "bg-marigold",
  lilac: "bg-lilac",
  mint: "bg-mint",
  pink: "bg-pink",
} as const;

export type StickerColor = keyof typeof stickerColors;

/** A small tilted paper sticker with an icon, used as a playful section label. */
export function Kicker({
  icon: Icon,
  children,
  color = "marigold",
  tilt = -3,
  className,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
  color?: StickerColor;
  tilt?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("sticker wiggle-hover text-[0.8125rem]", stickerColors[color], className)}
      style={{ ["--tilt" as string]: `${tilt}deg` }}
    >
      {Icon && <Icon className="size-3.5" aria-hidden="true" strokeWidth={2.5} />}
      {children}
    </span>
  );
}

export function SectionHeading({
  id,
  title,
  intro,
  kicker,
  className,
}: {
  /** id of the <h2>, used by the section's aria-labelledby. */
  id: string;
  title: string;
  intro?: React.ReactNode;
  kicker?: { icon?: LucideIcon; label: string; color?: StickerColor; tilt?: number };
  className?: string;
}) {
  return (
    <Reveal as="header" className={cn("mb-12 max-w-3xl sm:mb-16", className)}>
      {kicker && (
        <Kicker icon={kicker.icon} color={kicker.color} tilt={kicker.tilt} className="mb-5">
          {kicker.label}
        </Kicker>
      )}
      <h2 id={id} className="display-2 text-ink">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-pretty text-muted">{intro}</p>}
    </Reveal>
  );
}
