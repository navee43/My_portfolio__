import { ArrowDown, Bot, Download, Hand, Mail, MapPin, Trophy, Zap } from "lucide-react";
import { DragSticker } from "@/components/motion/drag-sticker";
import { Marquee } from "@/components/motion/marquee";
import { buttonClass } from "@/components/ui/button";
import { socialIcons } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import { socials } from "@/data/social-links";
import { newTab } from "@/lib/links";
import { AgentTrace } from "./agent-trace";
import { GridSpotlight } from "./grid-spotlight";
import { PhotoFrame } from "./photo-frame";

/** A hand-drawn loop around a phrase, drawn in after the page loads. */
function Scribble() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 100"
      preserveAspectRatio="none"
      className="scribble pointer-events-none absolute -top-[30%] -left-[6%] h-[160%] w-[112%] overflow-visible"
    >
      <path
        d="M24 54C18 22 104 8 162 9s130 14 128 44-70 42-140 41S10 86 12 54 74 14 128 12"
        pathLength={1}
        fill="none"
        stroke="var(--marigold)"
        strokeWidth={5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Facts from the resume, as stickers. Draggable with a mouse, static elsewhere. */
const stickers = [
  { icon: Trophy, label: "Progathon winner", color: "bg-marigold", tilt: -7, pos: "-top-6 -left-5" },
  { icon: Zap, label: "2 internships", color: "bg-lilac", tilt: 6, pos: "-top-8 right-12" },
  { icon: Bot, label: "builds AI agents", color: "bg-mint", tilt: -4, pos: "-bottom-4 right-2" },
];

export function Hero() {
  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="grid-field absolute inset-0" />
          {/* Fixed offsets so the glow never moves when the hero's height settles. */}
          <div className="absolute -top-24 right-[-18%] size-[46rem] rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)] sm:right-[-6%] sm:drift" />
          <div className="absolute top-[26rem] left-[-12%] hidden size-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--glow-b),transparent)] [animation-delay:-9s] sm:block sm:drift" />
        </div>
        <div className="absolute inset-0 -z-10">
          <GridSpotlight />
        </div>

        <div className="page">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {profile.availability.open && (
                  <span
                    className="sticker sticker-in bg-mint text-[0.8125rem]"
                    style={{ ["--tilt" as string]: "-3deg", ["--delay" as string]: "60ms" }}
                  >
                    <span className="pulse-dot size-2 rounded-full bg-[#0b7a50] text-[#0b7a50]" aria-hidden="true" />
                    {profile.availability.label}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-line-strong px-3 py-1 font-semibold text-muted">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  Based in {profile.shortLocation}
                </span>
              </div>

              <p className="mt-8 flex items-center gap-2 text-[1.0625rem] font-semibold text-ink-2 sm:text-lg">
                <span>hey, I&apos;m {profile.name}</span>
                <Hand className="wave size-5 text-marigold" aria-hidden="true" strokeWidth={2.5} />
              </p>

              {/* Rendered immediately with no fade: it's the first thing people read. */}
              <h1 id="hero-title" className="display-1 mt-3 max-w-[13.5em] text-ink lg:text-[clamp(4rem,1rem+4.6vw,5.9rem)]">
                {profile.headlineParts.map((part, i) =>
                  part.mark === "marker" ? (
                    <span key={i} className="marker">
                      {part.text}
                    </span>
                  ) : part.mark === "scribble" ? (
                    <span key={i} className="relative inline-block whitespace-nowrap">
                      <Scribble />
                      <span className="relative">{part.text}</span>
                    </span>
                  ) : (
                    <span key={i}>{part.text}</span>
                  ),
                )}
              </h1>
            </div>
            <div className="min-w-0 lg:col-span-4 lg:pl-4">
              <PhotoFrame />
            </div>
          </div>

          <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-12">
            <div className="fade-in min-w-0 lg:col-span-5 lg:pt-2" style={{ ["--delay" as string]: "300ms" }}>
              <p className="text-lg font-semibold leading-snug text-ink">{profile.roleLine}</p>
              <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">{profile.intro}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className={buttonClass({ variant: "primary" })}>
                  Explore my work
                  <ArrowDown
                    className="size-4 transition-transform duration-300 group-hover/button:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={profile.resume.localPdf}
                  download={profile.resume.downloadName}
                  className={buttonClass({ variant: "secondary" })}
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download resume
                </a>
              </div>

              <ul className="mt-7 flex flex-wrap items-center gap-2" aria-label="Contact and profiles">
                <li>
                  <a
                    href="#contact"
                    className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-edge bg-surface px-4 text-sm font-semibold text-ink transition-transform duration-200 hover:-rotate-2 hover:bg-marigold hover:text-sticker-ink"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    Contact me
                  </a>
                </li>
                {socials.map((s) => {
                  const Icon = socialIcons[s.key];
                  return (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        {...newTab}
                        className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-line-strong px-4 text-sm font-semibold text-ink-2 transition-[transform,border-color,color] duration-200 hover:rotate-2 hover:border-edge hover:text-ink"
                      >
                        <Icon className="size-4" />
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="fade-in min-w-0 lg:col-span-7" style={{ ["--delay" as string]: "200ms" }}>
              {/* On small screens the stickers sit in a row above the replay. */}
              <ul className="mb-6 flex flex-wrap gap-3 lg:hidden" aria-label="Highlights">
                {stickers.map((s, i) => (
                  <li key={s.label}>
                    <span
                      className={`sticker sticker-in text-sm ${s.color}`}
                      style={{ ["--tilt" as string]: `${s.tilt / 2}deg`, ["--delay" as string]: `${400 + i * 120}ms` }}
                    >
                      <s.icon className="size-4" aria-hidden="true" strokeWidth={2.5} />
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="relative">
                <AgentTrace />
                <ul className="hidden lg:block" aria-label="Highlights">
                  {stickers.map((s, i) => (
                    <li key={s.label} className={`absolute z-10 ${s.pos}`}>
                      <DragSticker tilt={s.tilt} delay={700 + i * 150} className={s.color}>
                        <s.icon className="size-4" aria-hidden="true" strokeWidth={2.5} />
                        {s.label}
                      </DragSticker>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-2 hidden px-1 text-[0.8125rem] font-semibold text-faint lg:block">
                psst, the stickers are draggable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two crossing ticker tapes. */}
      <div className="relative isolate overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2deg] border-y-2 border-sticker-ink bg-lilac py-3 text-sticker-ink">
          <Marquee
            items={profile.interests.map((s) => s.toLowerCase())}
            reverse
            speed={46}
            label="Interests"
            className="display-3 text-[1.35rem] uppercase sm:text-[1.6rem]"
          />
        </div>
        <div className="relative mx-[-5%] -rotate-[2deg] border-y-2 border-sticker-ink bg-marigold py-3 text-sticker-ink shadow-[0_6px_0_0_var(--hard)]">
          <Marquee
            items={profile.ticker}
            speed={40}
            label="Technologies"
            className="display-3 text-[1.35rem] uppercase sm:text-[1.6rem]"
          />
        </div>
      </div>
    </>
  );
}
