"use client";

import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories, type Evidence, type Skill } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

function evidenceLabel(e: Evidence) {
  if (e.kind === "project") {
    const p = projects.find((x) => x.slug === e.slug);
    return { label: p?.name ?? e.slug, detail: "Project", href: `/projects/${e.slug}` };
  }
  if (e.kind === "experience") {
    const job = experience.find((x) => x.id === e.id);
    return { label: job?.company ?? e.id, detail: job?.role ?? "Experience", href: "#experience" };
  }
  return { label: "Resume", detail: "Listed under skills", href: "#resume" };
}

/** Dot colour for each category card, so the groups are easy to tell apart. */
const categoryDots = ["bg-marigold", "bg-lilac", "bg-mint", "bg-pink", "bg-marigold", "bg-lilac"];

function EvidencePanel({ skill, className }: { skill: Skill; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[24px] border-2 border-sticker-ink bg-sticker-ink p-6 text-[#f4f2ff] shadow-hard-lg dark:border-edge",
        className,
      )}
    >
      <div key={skill.name} className="enter-up">
        <p className="text-sm font-semibold text-[#c9c4ee]">Where it shows up</p>
        <p className="display-3 mt-1 text-[2.4rem] uppercase text-marigold">{skill.name}</p>
        <ul className="mt-4 space-y-2">
          {skill.evidence.map((e, i) => {
            const ev = evidenceLabel(e);
            const isResume = e.kind === "resume";
            return (
              <li key={i}>
                <Link
                  href={ev.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-white/15 px-4 py-3 text-[0.9375rem] font-semibold transition-[transform,background-color,border-color] duration-200 hover:-rotate-1 hover:border-marigold hover:bg-white/5"
                >
                  <span className="flex items-center gap-2.5">
                    {isResume ? (
                      <FileText className="size-4 text-[#c9c4ee]" aria-hidden="true" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className={cn("size-2.5 rounded-full", e.kind === "experience" ? "bg-lilac" : "bg-mint")}
                      />
                    )}
                    {ev.label}
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-[0.8125rem] font-medium text-[#c9c4ee]">
                    {ev.detail}
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/**
 * Skills grouped by area. Choosing a skill shows the projects and roles that
 * use it, so every item on the list can be checked. No ratings, by design.
 */
export function Skills() {
  const [selected, setSelected] = useState<{ category: string; skill: Skill }>({
    category: "ai",
    skill: skillCategories.find((c) => c.id === "ai")!.skills[1],
  });

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
        {skillCategories.map((cat, ci) => (
          <Reveal
            key={cat.id}
            variant="pop"
            delay={(ci % 2) * 100}
            className={cn(
              "rounded-[22px] border-2 border-edge bg-surface p-5 shadow-hard",
              cat.skills.length > 6 && "sm:col-span-2",
            )}
          >
            <h3 className="display-3 flex items-center gap-2.5 text-[1.5rem] uppercase text-ink">
              <span
                aria-hidden="true"
                className={cn("size-3.5 rounded-full border-2 border-sticker-ink", categoryDots[ci % categoryDots.length])}
              />
              {cat.name}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={cat.name}>
              {cat.skills.map((skill) => {
                const isSelected = selected.skill.name === skill.name;
                return (
                  <li key={skill.name}>
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelected({ category: cat.id, skill })}
                      onMouseEnter={() => setSelected({ category: cat.id, skill })}
                      className={cn(
                        "rounded-full border-2 px-3.5 py-1.5 text-[0.9375rem] font-semibold transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.3,1.5,0.5,1)]",
                        isSelected
                          ? "-rotate-2 border-sticker-ink bg-marigold text-sticker-ink shadow-[2px_2px_0_0_var(--sticker-ink)]"
                          : "border-line-strong bg-surface text-ink-2 hover:-rotate-1 hover:border-edge hover:text-ink",
                      )}
                    >
                      {skill.name}
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* On small screens the evidence opens under its own group. */}
            {selected.category === cat.id && (
              <div className="mt-5 lg:hidden" aria-live="polite">
                <EvidencePanel skill={selected.skill} />
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28" aria-live="polite">
          <EvidencePanel skill={selected.skill} />
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 px-1 text-[0.8125rem] font-semibold text-faint">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border border-sticker-ink bg-mint" aria-hidden="true" /> Project
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border border-sticker-ink bg-lilac" aria-hidden="true" /> Internship
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="size-3.5" aria-hidden="true" /> Resume
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
