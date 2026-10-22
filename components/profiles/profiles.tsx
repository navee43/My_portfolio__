import { ArrowUpRight, AtSign } from "lucide-react";
import { Suspense } from "react";
import { LeetCodeIcon, LinkedInIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";
import { links, socials } from "@/data/social-links";
import { newTab } from "@/lib/links";
import { cn } from "@/lib/utils";
import { GitHubCard, GitHubCardSkeleton } from "./github-card";
import { Reveal } from "@/components/motion/reveal";

const tones = {
  indigo: { card: "bg-[#3a2fd3] text-white", sub: "text-white/80", tilt: "-1deg" },
  marigold: { card: "bg-marigold text-sticker-ink", sub: "text-sticker-ink/80", tilt: "1deg" },
} as const;

function ProfileCard({
  icon,
  title,
  handle,
  body,
  action,
  href,
  tone,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  handle: string;
  body: React.ReactNode;
  action: string;
  href: string;
  tone: keyof typeof tones;
  delay?: number;
}) {
  const t = tones[tone];
  return (
    <Reveal
      variant="pop"
      delay={delay}
      tilt={t.tilt}
      className={cn("lift flex h-full flex-col rounded-[26px] border-2 border-sticker-ink p-6 shadow-hard sm:p-7 dark:border-edge", t.card)}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl border-2 border-sticker-ink bg-white text-sticker-ink shadow-hard-sm">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="display-3 text-[1.75rem] uppercase">{title}</h3>
          <p className={cn("truncate font-mono text-sm", t.sub)}>{handle}</p>
        </div>
      </div>
      <div className={cn("mt-5 text-[0.98rem] font-medium leading-relaxed", t.sub)}>{body}</div>
      <div className="mt-auto pt-6">
        <a
          href={href}
          {...newTab}
          className="group/button inline-flex h-10 items-center gap-2 rounded-[12px] border-2 border-sticker-ink bg-white px-3.5 text-sm font-bold text-sticker-ink shadow-[3px_3px_0_0_var(--sticker-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--sticker-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          {action}
          <ArrowUpRight className="size-4 transition-transform group-hover/button:rotate-45" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </Reveal>
  );
}

export function Profiles() {
  const leetcodeHandle = socials.find((s) => s.key === "leetcode")!.handle;
  const cp = profile.competitiveProgramming;

  return (
    <section id="profiles" aria-labelledby="profiles-title" className="py-20 sm:py-28">
      <div className="page">
        <SectionHeading
          id="profiles-title"
          title="Code and profiles"
          kicker={{ icon: AtSign, label: "find me online", color: "marigold", tilt: -3 }}
          intro="Source code for the projects above lives on GitHub. For everything else, LinkedIn and LeetCode."
        />
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:row-span-2">
            <Suspense fallback={<GitHubCardSkeleton />}>
              <GitHubCard />
            </Suspense>
          </div>
          <div className="lg:col-span-5">
            <ProfileCard
              icon={<LinkedInIcon className="size-[18px]" />}
              title="LinkedIn"
              handle={socials.find((s) => s.key === "linkedin")!.handle}
              body="Internships, projects and updates. Recruiters are welcome to reach out there too."
              action="Connect on LinkedIn"
              href={links.linkedin}
              tone="indigo"
            />
          </div>
          <div className="lg:col-span-5">
            <ProfileCard
              icon={<LeetCodeIcon className="size-[18px]" />}
              title="LeetCode"
              handle={`@${leetcodeHandle}`}
              body={
                cp.show ? (
                  <>
                    {cp.leetcode}. On Codeforces: {cp.codeforces}.
                  </>
                ) : (
                  "Data structures and algorithms practice, from dynamic programming to graphs."
                )
              }
              action="View LeetCode profile"
              href={links.leetcode}
              tone="marigold"
              delay={120}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
