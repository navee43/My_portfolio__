import { Rocket, Star as StarIcon } from "lucide-react";
import Link from "next/link";
import { ChipList } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectLinks } from "./project-links";
import { ProjectPreview } from "./previews";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";

function CategoryPill({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex rounded-full border-2 border-line-strong px-3 py-0.5 text-[0.8125rem] font-bold text-muted">
      {children}
    </p>
  );
}

function FeaturedProject({ project, reverse, index }: { project: Project; reverse: boolean; index: number }) {
  const headingId = `project-${project.slug}`;
  return (
    <article aria-labelledby={headingId} className="group/card grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={cn("relative min-w-0 lg:col-span-7", reverse && "lg:order-2")} variant={reverse ? "left" : "up"}>
        <Tilt>
          <Link
            href={`/projects/${project.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="block rounded-[20px] shadow-hard-lg transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/card:-translate-x-1 group-hover/card:-translate-y-1 group-hover/card:shadow-[11px_11px_0_0_var(--hard)]"
          >
            <ProjectPreview kind={project.preview} alt={project.previewAlt} />
          </Link>
        </Tilt>
        <span
          className="sticker absolute -top-4 right-6 z-10 bg-marigold text-sm transition-transform duration-300 group-hover/card:rotate-[8deg]"
          style={{ ["--tilt" as string]: index % 2 === 0 ? "5deg" : "-5deg" }}
        >
          <StarIcon className="size-3.5 fill-current" aria-hidden="true" />
          Featured
        </span>
      </Reveal>

      <Reveal className="min-w-0 lg:col-span-5" delay={120}>
        <CategoryPill>{project.category}</CategoryPill>
        <h3 id={headingId} className="display-3 mt-4 text-[2.6rem] uppercase text-ink sm:text-[3.2rem]">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-md bg-[linear-gradient(var(--marigold),var(--marigold))] bg-[length:0%_0.18em] bg-[position:0_95%] bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_0.18em]"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-4 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink-2">{project.tagline}</p>
        <ul className="mt-6 space-y-2.5">
          {project.features.slice(1, 4).map((f) => (
            <li key={f} className="relative max-w-[52ch] pl-6 text-[0.9375rem] leading-relaxed text-muted">
              <span aria-hidden="true" className="absolute top-[0.55em] left-0 size-2.5 rotate-45 rounded-[2px] bg-marigold" />
              {f}
            </li>
          ))}
        </ul>
        <ChipList items={project.cardStack} className="mt-6" />
        <ProjectLinks project={project} className="mt-8" />
      </Reveal>
    </article>
  );
}

function ProjectTile({ project, className, index }: { project: Project; className?: string; index: number }) {
  const headingId = `project-${project.slug}`;
  return (
    <Reveal
      as="article"
      aria-labelledby={headingId}
      variant="pop"
      delay={(index % 2) * 120}
      className={cn(
        "group/card flex min-w-0 flex-col rounded-[26px] border-2 border-edge bg-surface p-3 shadow-hard",
        "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--hard)]",
        className,
      )}
    >
      <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true" className="block">
        <ProjectPreview kind={project.preview} alt={project.previewAlt} />
      </Link>
      <div className="flex flex-1 flex-col px-3 pt-6 pb-4">
        <CategoryPill>{project.category}</CategoryPill>
        <h4 id={headingId} className="display-3 mt-3 text-[2rem] uppercase text-ink">
          <Link href={`/projects/${project.slug}`} className="rounded-md hover:text-accent">
            {project.name}
          </Link>
        </h4>
        <p className="mt-3 max-w-[54ch] leading-relaxed text-ink-2">{project.tagline}</p>
        <ChipList items={project.cardStack} className="mt-5" />
        <ProjectLinks project={project} className="mt-auto pt-7" />
      </div>
    </Reveal>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  // Alternate wide and narrow tiles so the grid never reads as a uniform card wall.
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 sm:py-28">
      <div className="page">
        <SectionHeading
          id="projects-title"
          title="Selected projects"
          kicker={{ icon: Rocket, label: "stuff I've shipped", color: "mint", tilt: -2 }}
          intro="From an agent that debugs its own code to real-time apps for hiring and chat. The previews are illustrations of each product; every case study links to the source and, where there is one, the live app."
        />

        <div className="space-y-24 sm:space-y-32">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} reverse={i % 2 === 1} index={i} />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-28 sm:mt-36">
            <Reveal as="h3" className="display-3 mb-10 flex items-center gap-3 text-[2.2rem] uppercase text-ink">
              More projects
              <span className="sticker bg-pink text-sm normal-case" style={{ ["--tilt" as string]: "4deg" }}>
                {rest.length} more
              </span>
            </Reveal>
            <div className="grid gap-8 md:grid-cols-12">
              {rest.map((p, i) => (
                <ProjectTile key={p.slug} project={p} index={i} className={spans[i % spans.length]} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
