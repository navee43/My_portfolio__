import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import type { Project } from "@/data/projects";
import { newTab } from "@/lib/links";
import { cn } from "@/lib/utils";

export function ProjectLinks({
  project,
  showCaseStudy = true,
  className,
}: {
  project: Project;
  showCaseStudy?: boolean;
  className?: string;
}) {
  const { repo, live, liveLabel, liveNote } = project.links;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {showCaseStudy && (
        <Link href={`/projects/${project.slug}`} className={buttonClass({ variant: "primary", size: "sm" })}>
          <BookOpen className="size-4" aria-hidden="true" />
          Case study
          <span className="sr-only">: {project.name}</span>
        </Link>
      )}
      {repo && (
        <a href={repo} {...newTab} className={buttonClass({ variant: "secondary", size: "sm" })}>
          <GitHubIcon className="size-4" />
          Source
          <span className="sr-only"> code for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      )}
      {live && (
        <a href={live} {...newTab} className={buttonClass({ variant: "secondary", size: "sm" })}>
          <span className="pulse-dot size-2 rounded-full bg-pass text-pass" aria-hidden="true" />
          {liveLabel ?? "Live demo"}
          <ArrowUpRight
            className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
            aria-hidden="true"
          />
          <span className="sr-only">
            {" "}
            for {project.name}
            {liveNote ? `, ${liveNote.toLowerCase()}` : ""} (opens in a new tab)
          </span>
        </a>
      )}
      {live && liveNote && (
        <span className="text-[0.8125rem] font-semibold text-faint" aria-hidden="true">
          {liveNote}
        </span>
      )}
      {!live && <span className="text-[0.8125rem] font-semibold text-faint">No hosted demo</span>}
    </div>
  );
}
