import { Briefcase, MapPin } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Star } from "@/components/motion/marquee";
import { ChipList } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

const tileColors = ["bg-lilac", "bg-mint", "bg-pink"];

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-20 sm:py-28">
      <div className="page">
        <SectionHeading
          id="experience-title"
          title="Experience"
          kicker={{ icon: Briefcase, label: "where I've worked", color: "marigold", tilt: 2 }}
          intro="Two remote internships: one on the frontend of a large course platform, one across backend APIs, LLM features and deployment."
        />

        <ol className="relative space-y-10 md:pl-14">
          {/* A dashed track linking the roles, oldest at the bottom. */}
          <span
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-[18px] hidden w-0 border-l-[3px] border-dashed border-line-strong md:block"
          />
          {experience.map((job, index) => (
            <Reveal as="li" key={job.id} className="relative" delay={60}>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-8 -left-14 hidden size-10 place-items-center rounded-full border-2 border-sticker-ink shadow-hard-sm md:grid",
                  index === 0 ? "bg-marigold" : "bg-lilac",
                )}
              >
                <span className="size-2.5 rounded-full bg-sticker-ink" />
              </span>

              <article className="rounded-[26px] border-2 border-edge bg-surface p-6 shadow-hard-lg sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="display-3 text-[2.1rem] uppercase text-ink sm:text-[2.6rem]">{job.role}</h3>
                    <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.0625rem] font-semibold text-ink-2">
                      {job.company}
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-muted">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {job.type}, {job.location}
                      </span>
                    </p>
                  </div>
                  <p
                    className="sticker bg-marigold text-sm"
                    style={{ ["--tilt" as string]: index % 2 === 0 ? "3deg" : "-3deg" }}
                  >
                    <time dateTime={job.startISO}>{job.start}</time>
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">to</span>
                    <time dateTime={job.endISO}>{job.end}</time>
                  </p>
                </div>

                <p className="mt-5 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">{job.summary}</p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                  {job.metrics.map((m, i) => (
                    <Reveal
                      key={m.label}
                      variant="pop"
                      delay={150 + i * 110}
                      tilt="-2deg"
                      className={cn(
                        "lift flex flex-col-reverse justify-end gap-2 rounded-[18px] border-2 border-sticker-ink p-5 text-sticker-ink shadow-hard dark:border-edge",
                        tileColors[i % tileColors.length],
                      )}
                    >
                      <dt className="text-[0.875rem] font-semibold leading-snug opacity-85">{m.label}</dt>
                      <dd className="display-3 text-[2.6rem] leading-none">
                        <CountUp value={m.value} />
                      </dd>
                    </Reveal>
                  ))}
                </dl>

                <ul className="mt-8 max-w-[66ch] space-y-3">
                  {job.points.map((point) => (
                    <li key={point} className="relative pl-7 leading-relaxed text-ink-2">
                      <Star className="absolute top-[0.4em] left-0 size-3.5 text-marigold" />
                      {point}
                    </li>
                  ))}
                </ul>

                <ChipList items={job.stack} className="mt-7" />
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
