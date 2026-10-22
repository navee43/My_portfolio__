import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame, PreviewWindow } from "./preview-frame";

const tasks = [
  { name: "Average salary by department", active: true },
  { name: "Monthly sales totals", active: false },
  { name: "Flag overdue loans", active: false },
];

const timeline: { label: string; state: "ok" | "fail" | "pass" }[] = [
  { label: "Plan", state: "ok" },
  { label: "Inspect files", state: "ok" },
  { label: "Generate code", state: "ok" },
  { label: "Execute", state: "fail" },
  { label: "Analyze error", state: "ok" },
  { label: "Repair", state: "ok" },
  { label: "Execute", state: "ok" },
  { label: "Verify", state: "pass" },
];

/** Modelled on the real app's RunWorkspace, ExecutionTimeline and AttemptHistory views. */
export function AgentPreview({ alt }: { alt: string }) {
  return (
    <PreviewFrame
      alt={alt}
      accent="var(--accent)"
      backdrop="radial-gradient(70% 90% at 85% 0%, var(--glow-a), transparent 70%), radial-gradient(60% 80% at 0% 100%, var(--glow-b), transparent 70%)"
    >
      <PreviewWindow
        title={
          <>
            <span className="grid size-[1.3em] place-items-center rounded-[0.35em] bg-[var(--pa)] text-[0.7em] text-white">
              ✦
            </span>
            Autonomous Coding Agent
          </>
        }
        right={
          <span className="flex items-center gap-[0.35em] text-[0.7em] text-pass">
            <span className="size-[0.5em] rounded-full bg-current" /> Connected
          </span>
        }
      >
        <div className="grid h-full grid-cols-[8.6em_1fr]">
          <aside className="border-r border-line bg-raised/60 p-[0.7em]">
            <p className="mb-[0.6em] text-[0.68em] text-faint">Tasks</p>
            <ul className="space-y-[0.35em]">
              {tasks.map((t) => (
                <li
                  key={t.name}
                  className={cn(
                    "flex items-center gap-[0.45em] rounded-[0.45em] px-[0.5em] py-[0.45em] text-[0.68em]",
                    t.active ? "bg-accent-soft text-ink" : "text-muted",
                  )}
                >
                  <span className="size-[0.55em] shrink-0 rounded-full bg-pass" />
                  <span className="truncate">{t.name}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex min-w-0 flex-col gap-[0.7em] p-[0.8em]">
            <div className="rounded-[0.55em] border border-line bg-raised p-[0.65em]">
              <p className="text-[0.68em] leading-[1.45] text-ink-2">
                Calculate the average annual salary for each department and create a CSV containing department and
                average_salary.
              </p>
              <span className="mt-[0.5em] inline-block rounded-[0.35em] border border-line px-[0.45em] py-[0.1em] font-mono text-[0.6em] text-muted">
                employees.csv
              </span>
            </div>

            <div className="grid grid-cols-[auto_1fr] items-start gap-[0.8em]">
              <div className="relative">
                <p className="mb-[0.5em] text-[0.62em] text-faint">Execution timeline</p>
                <span className="absolute top-[1.9em] bottom-[0.6em] left-[0.42em] w-px bg-line" />
                <span className="absolute top-[1.9em] left-[0.42em] h-[60%] w-px origin-top bg-[var(--pa)] transition-[height] duration-700 ease-out group-hover/card:h-[calc(100%-2.5em)]" />
                <ul className="relative space-y-[0.32em]">
                  {timeline.map((s, i) => (
                    <li key={i} className="flex items-center gap-[0.5em] whitespace-nowrap text-[0.62em]">
                      <span
                        className={cn(
                          "grid size-[1.35em] shrink-0 place-items-center rounded-full border bg-surface",
                          s.state === "ok" && "border-line-strong text-ink-2",
                          s.state === "fail" && "border-fail text-fail",
                          s.state === "pass" && "border-pass text-pass",
                        )}
                      >
                        {s.state === "fail" ? <X className="size-[0.8em]" /> : <Check className="size-[0.8em]" />}
                      </span>
                      <span className={s.state === "fail" ? "text-fail" : "text-ink-2"}>{s.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex min-w-0 flex-col overflow-hidden rounded-[0.55em] border border-line bg-raised">
                <div className="flex border-b border-line text-[0.6em] whitespace-nowrap">
                  <span className="flex items-center gap-[0.3em] border-r border-line px-[0.8em] py-[0.5em] text-fail">
                    <X className="size-[0.9em]" /> Attempt 1
                  </span>
                  <span className="flex items-center gap-[0.3em] bg-surface px-[0.8em] py-[0.5em] text-pass">
                    <Check className="size-[0.9em]" /> Attempt 2
                  </span>
                </div>
                <div className="space-y-[0.25em] p-[0.6em] font-mono text-[0.5em] leading-[1.55] whitespace-pre [&>p]:truncate">
                  <p className="text-faint">df.groupby(&quot;department&quot;)</p>
                  <p className="rounded-[0.3em] bg-fail-soft px-[0.3em] text-ink-2 line-through decoration-fail/60">
                    − [&quot;salary&quot;].mean()
                  </p>
                  <p className="rounded-[0.3em] bg-pass-soft px-[0.3em] text-ink">
                    + [&quot;annual_salary&quot;].mean()
                  </p>
                  <p className="text-faint">.to_csv(&quot;result.csv&quot;)</p>
                </div>
                <div className="flex items-center gap-[0.4em] border-t border-line bg-pass-soft px-[0.7em] py-[0.5em] text-[0.6em] text-pass">
                  <Check className="size-[1em]" /> Task completed successfully
                </div>
              </div>
            </div>
          </div>
        </div>
      </PreviewWindow>
    </PreviewFrame>
  );
}
