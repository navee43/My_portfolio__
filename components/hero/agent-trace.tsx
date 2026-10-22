"use client";

import { RotateCcw, Workflow } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import {
  codeLines,
  traceEdges,
  traceNodes,
  traceSteps,
  type NodeId,
  type StepStatus,
} from "./trace-script";

const LAST = traceSteps.length - 1;
const STEP_MS = 1150;

/* useLayoutEffect warns on the server; this keeps measurement flicker-free on the client. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const statusText: Record<StepStatus, string> = {
  run: "text-accent",
  error: "text-fail",
  pass: "text-pass",
};

/** Latest step index (≤ current) at which a node ran, or -1. */
function lastVisit(node: NodeId, upTo: number) {
  for (let i = upTo; i >= 0; i--) if (traceSteps[i].node === node) return i;
  return -1;
}

function nodeCenter(col: number, row: 0 | 1, w: number, h: number) {
  return { x: ((col + 0.5) / 5) * w, y: row === 0 ? h * 0.27 : h * 0.77 };
}

/** Minimal Python highlighting: strings and two keywords. */
function Code({ text }: { text: string }) {
  const parts = text.split(/("[^"]*")|\b(import|as)\b/g).filter((p) => p !== undefined && p !== "");
  return (
    <span className="whitespace-pre">
      {parts.map((part, i) =>
        part.startsWith('"') ? (
          <span key={i} className="text-accent">
            {part}
          </span>
        ) : part === "import" || part === "as" ? (
          <span key={i} className="text-violet">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

export function AgentTrace() {
  const rootRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, 0.3);
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Measure the graph so edges are drawn in real pixels (keeps dashes even).
  useIsoLayoutEffect(() => {
    const el = graphRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Start once the panel is on screen. With reduced motion, show the finished run.
  useEffect(() => {
    // Reduced motion: show the finished run straight away, wherever the panel is.
    if (reduceMotion) {
      const t = window.setTimeout(() => setStep(LAST), 0);
      return () => window.clearTimeout(t);
    }
    if (!inView) return;
    const t = window.setTimeout(() => setPlaying(true), 650);
    return () => window.clearTimeout(t);
  }, [inView, reduceMotion]);

  useEffect(() => {
    if (!playing) return;
    if (step >= LAST) {
      const t = window.setTimeout(() => setPlaying(false), 0);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setStep((s) => Math.min(s + 1, LAST)), STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, step]);

  const replay = useCallback(() => {
    setStep(0);
    setPlaying(!reduceMotion);
    if (reduceMotion) setStep(LAST);
  }, [reduceMotion]);

  const jumpTo = useCallback((node: NodeId) => {
    const idx = lastVisit(node, LAST);
    if (idx >= 0) {
      setPlaying(false);
      setStep(idx);
    }
  }, []);

  const current = traceSteps[step];
  const prev = step > 0 ? traceSteps[step - 1] : null;
  const attempt = current.attempt;
  const failedRun = attempt === 1 && step >= 3;

  const edges = useMemo(() => {
    return traceEdges.map((e) => {
      let traversed = false;
      for (let i = 1; i <= step; i++) {
        if (traceSteps[i - 1].node === e.from && traceSteps[i].node === e.to) traversed = true;
      }
      const active = !!prev && prev.node === e.from && current.node === e.to;
      return { ...e, traversed, active };
    });
  }, [step, prev, current]);

  const nodeById = useMemo(() => Object.fromEntries(traceNodes.map((n) => [n.id, n])), []);

  return (
    <figure ref={rootRef} className="relative" aria-labelledby="trace-caption">
      <div className="overflow-hidden rounded-[22px] border-2 border-edge bg-surface shadow-hard-lg">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b-2 border-edge bg-raised px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border-2 border-sticker-ink bg-marigold text-sticker-ink">
              <Workflow className="size-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.875rem] font-bold text-ink">Average salary by department</p>
              <p className="truncate font-mono text-[0.6875rem] text-faint">employees.csv</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-1 text-[0.75rem] font-bold",
                current.status === "run" && "border-accent/30 bg-accent-soft text-accent",
                current.status === "error" && "border-fail/30 bg-fail-soft text-fail",
                current.status === "pass" && "border-pass/30 bg-pass-soft text-pass",
              )}
            >
              <span
                className={cn("size-1.5 rounded-full bg-current", playing && step < LAST && "pulse-dot")}
                aria-hidden="true"
              />
              <span className="min-w-[4.6rem]">{current.phase}</span>
            </span>
            <button
              type="button"
              onClick={replay}
              className="inline-flex size-8 items-center justify-center rounded-full border-2 border-transparent text-muted transition-[transform,color,border-color] duration-300 hover:-rotate-180 hover:border-edge hover:text-ink"
              aria-label="Replay the run"
              title="Replay"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Graph */}
        <div className="dots border-b-2 border-edge bg-raised px-3 py-2 sm:px-4 [--sticker-ink:var(--line-strong)]">
          <div ref={graphRef} className="relative h-[118px] sm:h-[132px]">
            {size.w > 0 && (
              <svg
                className="absolute inset-0 size-full overflow-visible"
                viewBox={`0 0 ${size.w} ${size.h}`}
                aria-hidden="true"
              >
                {edges.map((e) => {
                  const a = nodeById[e.from];
                  const b = nodeById[e.to];
                  const p1 = nodeCenter(a.col, a.row, size.w, size.h);
                  const p2 = nodeCenter(b.col, b.row, size.w, size.h);
                  const color = e.active
                    ? e.kind === "error"
                      ? "var(--fail)"
                      : current.status === "pass"
                        ? "var(--pass)"
                        : "var(--accent)"
                    : e.traversed
                      ? "var(--line-strong)"
                      : "var(--line)";
                  return (
                    <line
                      key={`${e.from}-${e.to}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke={color}
                      strokeWidth={e.active ? 1.75 : 1.25}
                      strokeDasharray={!e.active && e.kind === "fail" ? "3 5" : undefined}
                      className={cn("transition-[stroke] duration-500", e.active && "edge-flow")}
                    />
                  );
                })}
              </svg>
            )}

            {traceNodes.map((n) => {
              const visit = lastVisit(n.id, step);
              const isActive = visit === step;
              const status = visit >= 0 ? traceSteps[visit].status : null;
              const left = `${((n.col + 0.5) / 5) * 100}%`;
              const top = n.row === 0 ? "27%" : "77%";
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => jumpTo(n.id)}
                  title={n.fn}
                  aria-label={`${n.label} step (${n.fn})`}
                  aria-pressed={isActive}
                  style={{ left, top }}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border-[1.5px] bg-surface px-1.5 py-1 text-[0.65625rem] font-bold leading-4 sm:px-2.5 sm:text-[0.75rem]",
                    "transition-[border-color,color,background-color,box-shadow] duration-300",
                    visit < 0 && "border-line text-faint",
                    visit >= 0 && !isActive && "border-line-strong text-ink-2",
                    isActive && status === "run" && "border-accent bg-accent-soft text-ink shadow-[0_0_0_4px_var(--accent-soft)]",
                    isActive && status === "error" && "border-fail bg-fail-soft text-fail shadow-[0_0_0_4px_var(--fail-soft)]",
                    isActive && status === "pass" && "border-pass bg-pass-soft text-pass shadow-[0_0_0_4px_var(--pass-soft)]",
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "hidden size-1.5 rounded-full sm:block",
                        visit < 0 && "bg-line-strong",
                        status === "run" && (isActive ? "bg-accent" : "bg-ink-2/60"),
                        status === "error" && "bg-fail",
                        status === "pass" && "bg-pass",
                      )}
                    />
                    {n.label}
                  </span>
                </button>
              );
            })}

            <p className="pointer-events-none absolute bottom-1 left-0 hidden max-w-[36%] text-[0.6875rem] leading-snug text-faint sm:block">
              Failures loop through analyze and repair, at most 3 attempts.
            </p>
          </div>
        </div>

        {/* Code + log */}
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          {/* Code */}
          <div className="min-w-0 border-b-2 border-edge md:border-r-2 md:border-b-0">
            <div className="flex items-center justify-between px-4 pt-3 pb-1.5 sm:px-5">
              <span className="font-mono text-[0.6875rem] text-faint">solution.py</span>
              <span className="font-mono text-[0.6875rem] text-faint">
                {attempt === 0 ? "waiting for plan" : `attempt ${attempt} of 3`}
              </span>
            </div>
            <div className="h-[168px] overflow-x-auto px-2 pb-3 font-mono text-[0.6875rem] leading-[1.65] sm:h-[176px] sm:text-[0.75rem]">
              {attempt === 0 ? (
                <div className="space-y-2.5 px-2 pt-2" aria-hidden="true">
                  {[62, 84, 70, 92, 48].map((w, i) => (
                    <div key={i} className="h-2 rounded-full bg-surface-2" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : (
                <ol
                  key={attempt}
                  className="enter-up min-w-max"
                  aria-label={`Generated code, attempt ${attempt}`}
                >
                    {codeLines.before.map((line, i) => {
                      const changed = i === codeLines.changedIndex;
                      if (changed && attempt === 2) {
                        return (
                          <li key={i}>
                            <div className="flex rounded bg-fail-soft/80 pr-3 text-ink-2/70 line-through decoration-fail/50">
                              <span className="w-7 shrink-0 select-none pr-2 text-right text-fail">−</span>
                              <Code text={line} />
                            </div>
                            <div className="flex rounded bg-pass-soft pr-3 text-ink">
                              <span className="w-7 shrink-0 select-none pr-2 text-right text-pass">+</span>
                              <Code text={codeLines.fixedLine} />
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li
                          key={i}
                          className={cn(
                            "flex rounded pr-3 text-ink-2",
                            changed && failedRun && "bg-fail-soft text-ink",
                          )}
                        >
                          {changed && failedRun ? (
                            <span
                              className="w-7 shrink-0 select-none pr-2 text-right font-semibold text-fail"
                              title="KeyError raised on this line"
                            >
                              !<span className="sr-only">KeyError raised on this line:</span>
                            </span>
                          ) : (
                            <span className="w-7 shrink-0 select-none pr-2 text-right text-faint">{i + 1}</span>
                          )}
                          {line === "" ? <span>&nbsp;</span> : <Code text={line} />}
                        </li>
                      );
                    })}
                </ol>
              )}
            </div>
          </div>

          {/* Log */}
          <div className="min-w-0">
            <div className="flex items-center justify-between px-4 pt-3 pb-1.5 sm:px-5">
              <span className="font-mono text-[0.6875rem] text-faint">run log</span>
              <span className="font-mono text-[0.6875rem] text-faint">
                {step + 1}/{traceSteps.length}
              </span>
            </div>
            <div className="relative h-[168px] overflow-hidden px-4 pb-3 sm:h-[176px] sm:px-5 [mask-image:linear-gradient(to_bottom,transparent,black_22%)]">
              <ol className="absolute inset-x-4 bottom-3 flex flex-col gap-1 font-mono text-[0.6875rem] leading-[1.55] sm:inset-x-5 sm:text-[0.71875rem]">
                {traceSteps.slice(0, step + 1).map((s, i) => (
                  <li key={`${i}-${s.node}`} className="enter-left text-ink-2">
                    <span className="text-faint">[{s.time}]</span>{" "}
                    <span className={statusText[s.status]}>{traceNodes.find((n) => n.id === s.node)?.fn}</span>{" "}
                    <span className="font-sans text-[0.75rem] text-ink-2">{s.message}</span>
                    {i === step && step < LAST && playing && (
                      <span className="caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-ink-2/70" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <figcaption id="trace-caption" className="mt-3 px-1 text-[0.8125rem] leading-relaxed text-faint lg:max-w-[64%]">
        An illustrative replay of the example run in the{" "}
        <Link
          href="/projects/autonomous-coding-agent"
          className="text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
        >
          Autonomous Coding Agent
        </Link>{" "}
        README, using the agent&apos;s real graph. Not connected to the live app. Select a step to inspect it.
      </figcaption>
    </figure>
  );
}
