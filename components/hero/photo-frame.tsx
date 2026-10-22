import { Camera, Sparkles } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * A tilted, taped photo frame for the hero.
 *
 * To add a photo: put it at public/images/profile.jpg (portrait, roughly 4:5,
 * at least 800 px wide) and set `photo.src` in data/profile.ts to
 * "/images/profile.jpg". Until then a placeholder is shown.
 */
export function PhotoFrame({ className }: { className?: string }) {
  const { photo } = profile;

  return (
    <figure
      className={cn(
        "sticker-in group relative mx-auto w-full max-w-[14.5rem] [--tilt:3deg] sm:max-w-[17rem] lg:max-w-none",
        className,
      )}
      style={{ ["--delay" as string]: "250ms" }}
    >
      {/* Tape strips */}
      <span
        aria-hidden="true"
        className="absolute -top-3 left-6 z-20 h-7 w-20 -rotate-[8deg] border border-sticker-ink/15 bg-marigold/80 shadow-sm"
      />
      <span
        aria-hidden="true"
        className="absolute -top-3 right-6 z-20 h-7 w-20 rotate-[10deg] border border-sticker-ink/15 bg-lilac/90 shadow-sm"
      />

      <div className="rotate-[3deg] rounded-[22px] border-2 border-sticker-ink bg-surface p-3 pb-4 shadow-hard-lg transition-transform duration-500 ease-[cubic-bezier(0.3,1.5,0.5,1)] group-hover:rotate-0 group-hover:-translate-y-1 dark:border-edge">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border-2 border-sticker-ink bg-lilac dark:border-edge">
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 320px, 300px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="dots absolute inset-0 grid place-items-center text-center text-sticker-ink">
              <div className="px-6">
                <span className="mx-auto grid size-16 place-items-center rounded-full border-2 border-sticker-ink bg-white shadow-hard-sm">
                  <Camera className="size-7" aria-hidden="true" strokeWidth={2.2} />
                </span>
                <p className="display-3 mt-4 text-2xl uppercase">Your photo here</p>
                <p className="mt-1 text-xs font-semibold opacity-75">public/images/profile.jpg</p>
              </div>
            </div>
          )}
        </div>
        <figcaption className="mt-3 flex items-center justify-between px-1">
          <span className="display-3 text-xl uppercase text-ink">{profile.name}</span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-muted">
            <Sparkles className="size-3.5 text-marigold" aria-hidden="true" />
            IIIT Una
          </span>
        </figcaption>
      </div>

      {/* A small sticker on the corner of the frame */}
      <span
        aria-hidden="true"
        className="sticker sticker-in absolute -bottom-4 -left-5 z-20 bg-pink text-sm [--tilt:-8deg]"
        style={{ ["--delay" as string]: "650ms" }}
      >
        that&apos;s me ✦
      </span>
    </figure>
  );
}
