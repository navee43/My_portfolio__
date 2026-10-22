import { ArrowLeft, ArrowRight, Star as StarIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectPreview } from "@/components/projects/previews";
import { Chip } from "@/components/ui/chip";
import { getProject, projects, type Project } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: `${project.name}, a project by Naveen Yadav`,
      description: project.tagline,
    },
  };
}

const rowColors = ["bg-marigold", "bg-lilac", "bg-mint", "bg-pink", "bg-marigold", "bg-lilac"];

function Row({ title, index, children }: { title: string; index: number; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-5 border-t-2 border-dashed border-line-strong py-12 lg:grid-cols-12 lg:gap-10">
      <h2 className="lg:col-span-4">
        <span
          className={`sticker display-3 text-[1.6rem] uppercase ${rowColors[index % rowColors.length]}`}
          style={{ ["--tilt" as string]: index % 2 === 0 ? "-2deg" : "2deg" }}
        >
          {title}
        </span>
      </h2>
      <div className="lg:col-span-8">{children}</div>
    </Reveal>
  );
}

function Bullets({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="max-w-[64ch] space-y-3.5">
      {items.map((item) => (
        <li key={item} className="relative pl-7 leading-relaxed text-ink-2">
          <Star className={`absolute top-[0.4em] left-0 size-3.5 ${color}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  let row = 0;

  return (
    <article className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="page">
        <Link
          href="/#projects"
          className="group inline-flex h-10 items-center gap-2 rounded-full border-2 border-edge bg-surface px-4 text-sm font-bold text-ink shadow-hard-sm transition-transform hover:-rotate-2"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="inline-flex rounded-full border-2 border-line-strong px-3 py-0.5 text-[0.8125rem] font-bold text-muted">
              {project.category}
            </p>
            <h1 className="display-1 mt-4 uppercase text-ink">{project.name}</h1>
            <p className="lede mt-6 max-w-[40ch] text-ink-2">{project.tagline}</p>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4">
            <ProjectLinks project={project} showCaseStudy={false} />
          </div>
        </header>

        <div className="group/card relative mx-auto mt-14 max-w-[64rem] sm:mt-16">
          <div className="rounded-[20px] shadow-hard-lg">
            <ProjectPreview kind={project.preview} alt={project.previewAlt} />
          </div>
          {project.featured && (
            <span className="sticker absolute -top-4 right-6 z-10 bg-marigold text-sm" style={{ ["--tilt" as string]: "5deg" }}>
              <StarIcon className="size-3.5 fill-current" aria-hidden="true" />
              Featured
            </span>
          )}
        </div>

        <div className="mt-16 sm:mt-20">
          <Row title="Overview" index={row++}>
            <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-2">{project.summary}</p>
          </Row>

          <Row title="The problem" index={row++}>
            <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-2">{project.problem}</p>
          </Row>

          <Row title="What it does" index={row++}>
            <Bullets items={project.features} color="text-marigold" />
          </Row>

          <Row title="How it's built" index={row++}>
            {project.architecture && (
              <p className="mb-8 max-w-[62ch] leading-relaxed text-ink-2">{project.architecture}</p>
            )}
            <dl className="grid gap-4 sm:grid-cols-2">
              {project.stack.map((group) => (
                <div key={group.group} className="rounded-[20px] border-2 border-edge bg-surface p-5 shadow-hard-sm">
                  <dt className="display-3 text-[1.3rem] uppercase text-ink">{group.group}</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Chip>{item}</Chip>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Row>

          {project.contribution && (
            <Row title="My role" index={row++}>
              <Bullets items={project.contribution} color="text-accent" />
            </Row>
          )}

          <Row title="Good to know" index={row++}>
            <ul className="max-w-[64ch] space-y-3">
              {project.notes.map((n) => (
                <li key={n} className="rounded-2xl border-2 border-line-strong bg-surface px-4 py-3 leading-relaxed text-muted">
                  {n}
                </li>
              ))}
            </ul>
            <ProjectLinks project={project} showCaseStudy={false} className="mt-8" />
          </Row>
        </div>

        <nav aria-label="More projects" className="mt-10 grid gap-5 border-t-2 border-dashed border-line-strong pt-10 sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            className="group lift rounded-[24px] border-2 border-edge bg-surface p-5 shadow-hard sm:p-6"
          >
            <span className="flex items-center gap-2 text-sm font-bold text-faint">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Previous project
            </span>
            <span className="display-3 mt-2 block text-[1.8rem] uppercase text-ink">{prev.name}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group lift rounded-[24px] border-2 border-sticker-ink bg-marigold p-5 text-right text-sticker-ink shadow-hard sm:p-6 dark:border-edge"
          >
            <span className="flex items-center justify-end gap-2 text-sm font-bold opacity-80">
              Next project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="display-3 mt-2 block text-[1.8rem] uppercase">{next.name}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}

/**
 * Every project is listed in generateStaticParams, so each case study is
 * prerendered in full. The slug is resolved before rendering so an unknown
 * one returns a real 404 status.
 */
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
