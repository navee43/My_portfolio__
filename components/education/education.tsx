import { BookOpen, GraduationCap, School } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/data/education";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="py-20 sm:py-28">
      <div className="page">
        <SectionHeading
          id="education-title"
          title="Education"
          kicker={{ icon: BookOpen, label: "school stuff", color: "pink", tilt: -2 }}
        />

        <ol className="grid gap-6 lg:grid-cols-12">
          {education.map((item, i) => {
            const Icon = i === 0 ? GraduationCap : School;
            return (
              <Reveal
                as="li"
                key={item.id}
                variant="pop"
                delay={i * 120}
                className={cn(
                  "lift relative rounded-[26px] border-2 border-edge p-6 shadow-hard sm:p-8",
                  i === 0 ? "bg-surface lg:col-span-8" : "dots bg-lilac text-sticker-ink lg:col-span-4 dark:border-edge",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl border-2 border-sticker-ink shadow-hard-sm",
                      i === 0 ? "bg-marigold text-sticker-ink" : "bg-white text-sticker-ink",
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" strokeWidth={2.2} />
                  </span>
                  <p
                    className={cn("sticker text-sm", i === 0 ? "bg-mint" : "bg-white")}
                    style={{ ["--tilt" as string]: i === 0 ? "3deg" : "-3deg" }}
                  >
                    {item.startISO ? (
                      <>
                        <time dateTime={item.startISO}>{item.period.split(" – ")[0]}</time>
                        <span aria-hidden="true">→</span>
                        <span className="sr-only">to</span>
                        <time dateTime={item.endISO}>{item.period.split(" – ")[1]}</time>
                      </>
                    ) : (
                      <time dateTime={item.endISO}>{item.period}</time>
                    )}
                    {item.status && <span className="font-semibold opacity-80">· {item.status.toLowerCase()}</span>}
                  </p>
                </div>

                <h3
                  className={cn(
                    "display-3 mt-6 text-[2rem] uppercase sm:text-[2.4rem]",
                    i === 0 ? "text-ink" : "text-sticker-ink",
                  )}
                >
                  {item.institution}
                </h3>
                <p className={cn("mt-2 text-[1.0625rem] font-semibold", i === 0 ? "text-ink-2" : "text-sticker-ink")}>
                  {item.qualification}
                </p>
                <p className={cn("mt-1 text-sm font-medium", i === 0 ? "text-faint" : "text-sticker-ink/75")}>{item.place}</p>

                {item.details && (
                  <dl className="mt-7 grid gap-5 border-t-2 border-dashed border-line-strong pt-6 sm:grid-cols-2">
                    {item.details.map((d) => (
                      <div key={d.label}>
                        <dt className="text-sm font-bold text-ink">{d.label}</dt>
                        <dd className="mt-1.5 max-w-[52ch] leading-relaxed text-muted">{d.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {!item.details && (
                  <p
                    aria-hidden="true"
                    className="display-1 stroke-text pointer-events-none mt-10 text-right text-[clamp(4.5rem,3rem+5vw,7.5rem)] leading-none [-webkit-text-stroke-color:var(--sticker-ink)] lg:absolute lg:right-7 lg:bottom-5"
                  >
                    {item.period}
                  </p>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
