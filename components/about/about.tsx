import { Briefcase, GraduationCap, Hammer, Smile, Sparkles, Trophy } from "lucide-react";
import { Kicker } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/** Visual treatment for each highlight, in the order they appear in data/profile.ts. */
const looks = [
  { icon: GraduationCap, card: "bg-marigold text-sticker-ink sm:col-span-2", tilt: "-1deg" },
  { icon: Briefcase, card: "bg-surface text-ink", tilt: "1deg" },
  { icon: Hammer, card: "bg-lilac text-sticker-ink", tilt: "-1.5deg" },
  { icon: Sparkles, card: "bg-mint text-sticker-ink", tilt: "1.5deg" },
  { icon: Trophy, card: "bg-pink text-sticker-ink", tilt: "-1deg" },
];

export function About() {
  const [first, ...rest] = profile.about;

  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className="page grid gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <Kicker icon={Smile} color="lilac" tilt={-3} className="mb-5">
            the human behind it
          </Kicker>
          <h2 id="about-title" className="display-2 text-ink">
            About me
          </h2>
          <p className="lede mt-8 max-w-[32ch] font-semibold text-ink">{first}</p>
          {rest.map((para) => (
            <p key={para} className="mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed text-muted">
              {para}
            </p>
          ))}
          <div className="mt-8">
            <p className="text-sm font-bold text-ink-2">Into</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.interests.map((interest, i) => (
                <li
                  key={interest}
                  className="rounded-full border-2 border-edge bg-surface px-3 py-1 text-sm font-semibold text-ink transition-transform duration-200 hover:-rotate-3 hover:bg-marigold hover:text-sticker-ink"
                  style={{ rotate: `${i % 2 === 0 ? -1 : 1}deg` }}
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-6 lg:pt-14" aria-label="Highlights">
          {profile.highlights.map((h, i) => {
            const look = looks[i % looks.length];
            const Icon = look.icon;
            return (
              <Reveal
                as="li"
                key={h.term}
                variant="pop"
                delay={i * 90}
                tilt={look.tilt}
                className={cn("lift rounded-[20px] border-2 border-sticker-ink p-5 shadow-hard dark:border-edge", look.card)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-full border-2 border-current/80 bg-white/40">
                    <Icon className="size-4" aria-hidden="true" strokeWidth={2.5} />
                  </span>
                  <p className="display-3 text-[1.35rem] uppercase">{h.term}</p>
                </div>
                <p className="mt-3 text-[0.98rem] font-medium leading-snug opacity-90">{h.detail}</p>
              </Reveal>
            );
          })}
          <Reveal
            as="li"
            variant="pop"
            delay={looks.length * 90}
            className="lift flex flex-wrap items-center justify-between gap-3 rounded-[20px] border-2 border-sticker-ink bg-sticker-ink p-5 text-[#f4f2ff] shadow-hard sm:col-span-2 dark:border-edge"
          >
            <span className="display-3 text-[1.35rem] uppercase">Status</span>
            <span className="flex items-center gap-2 font-bold text-mint">
              <span className="pulse-dot size-2 rounded-full bg-mint text-mint" aria-hidden="true" />
              {profile.availability.label}
            </span>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
