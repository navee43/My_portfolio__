import { ArrowUpRight } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import { projects } from "@/data/projects";
import { links, socials } from "@/data/social-links";
import { getGitHubSummary } from "@/lib/github";
import { newTab } from "@/lib/links";
import { Reveal } from "@/components/motion/reveal";

const handle = socials.find((s) => s.key === "github")!.handle;

function RepoRow({ name, meta, href, description }: { name: string; meta: string; href: string; description?: string | null }) {
  return (
    <li>
      <a
        href={href}
        {...newTab}
        className="group flex items-start justify-between gap-4 rounded-2xl border-2 border-transparent px-3 py-3 transition-[transform,background-color,border-color] duration-200 hover:-rotate-[0.6deg] hover:border-edge hover:bg-marigold-soft"
      >
        <span className="min-w-0">
          <span className="block truncate font-mono text-[0.875rem] font-semibold text-ink">{name}</span>
          {description && <span className="mt-0.5 block truncate text-[0.8125rem] text-muted">{description}</span>}
        </span>
        <span className="flex shrink-0 items-center gap-2 text-[0.8125rem] text-faint">
          {meta}
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </li>
  );
}

export async function GitHubCard() {
  const data = await getGitHubSummary(handle);

  return (
    <Reveal variant="pop" className="lift flex h-full flex-col rounded-[26px] border-2 border-edge bg-surface p-6 shadow-hard sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl border-2 border-sticker-ink bg-sticker-ink text-white shadow-hard-sm">
            <GitHubIcon className="size-6" />
          </span>
          <div>
            <h3 className="display-3 text-[1.75rem] uppercase text-ink">GitHub</h3>
            <p className="font-mono text-sm text-muted">@{handle}</p>
          </div>
        </div>
        {data && (
          <p className="text-right text-sm text-muted">
            <span className="display-3 block text-[2.4rem] leading-none text-ink tabular-nums">
              {data.publicRepos}
            </span>
            public repositories
          </p>
        )}
      </div>

      {data ? (
        <>
          {data.languages.length > 0 && (
            <div className="mt-6">
              <p className="text-[0.8125rem] text-faint">Main language by repository</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {data.languages.map((l) => (
                  <li key={l.name} className="rounded-full border-2 border-line-strong px-2.5 py-0.5 text-[0.8125rem] font-semibold text-ink-2">
                    {l.name} <span className="text-faint tabular-nums">{l.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-6 text-[0.8125rem] text-faint">Recently updated</p>
          <ul className="-mx-3 mt-1.5">
            {data.recent.map((r) => (
              <RepoRow
                key={r.name}
                name={r.name}
                href={r.url}
                description={r.description}
                meta={[r.language, r.updated].filter(Boolean).join(", ")}
              />
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="mt-6 text-[0.8125rem] text-faint">
            Repositories from the projects above. Live activity from GitHub will show here when it&apos;s available.
          </p>
          <ul className="-mx-3 mt-1.5">
            {projects
              .filter((p) => p.links.repo)
              .slice(0, 4)
              .map((p) => (
                <RepoRow key={p.slug} name={p.links.repo!.split("/").pop()!} href={p.links.repo!} meta={p.cardStack[0]} />
              ))}
          </ul>
        </>
      )}

      <div className="mt-auto pt-6">
        <a href={links.github} {...newTab} className={buttonClass({ variant: "secondary", size: "sm" })}>
          Explore repositories
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only"> on GitHub (opens in a new tab)</span>
        </a>
      </div>
    </Reveal>
  );
}

export function GitHubCardSkeleton() {
  return (
    <div className="h-full min-h-[22rem] rounded-[26px] border-2 border-edge bg-surface p-7 shadow-hard" aria-busy="true" aria-label="Loading GitHub activity">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-surface-2" />
        <div className="space-y-2">
          <div className="h-3 w-20 rounded-full bg-surface-2" />
          <div className="h-3 w-28 rounded-full bg-surface-2" />
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {[80, 65, 72, 58].map((w) => (
          <div key={w} className="h-3 rounded-full bg-surface-2" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
