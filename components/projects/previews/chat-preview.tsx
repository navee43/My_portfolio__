import { Send, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame, PreviewWindow } from "./preview-frame";

const chats = [
  { name: "Project team", group: true, last: "Socket fix is live", active: true },
  { name: "Aman", group: false, last: "See you tomorrow", active: false },
  { name: "Priya", group: false, last: "Sent the file", active: false },
];

export function ChatPreview({ alt }: { alt: string }) {
  return (
    <PreviewFrame
      alt={alt}
      accent="#9d7bff"
      backdrop="radial-gradient(70% 90% at 0% 0%, rgb(157 123 255 / 0.24), transparent 70%)"
    >
      <PreviewWindow
        title={
          <>
            <span className="grid size-[1.3em] place-items-center rounded-[0.35em] bg-[var(--pa)] text-[0.65em] font-bold text-white">
              C
            </span>
            Chat
          </>
        }
      >
        <div className="grid h-full grid-cols-[11em_1fr]">
          <aside className="border-r border-line bg-raised/60 p-[0.6em]">
            <ul className="space-y-[0.3em]">
              {chats.map((c) => (
                <li
                  key={c.name}
                  className={cn(
                    "flex items-center gap-[0.5em] rounded-[0.5em] p-[0.45em]",
                    c.active && "bg-[color-mix(in_srgb,var(--pa)_14%,transparent)]",
                  )}
                >
                  <span className="grid size-[1.9em] shrink-0 place-items-center rounded-full bg-surface-2 text-[0.62em] text-ink-2">
                    {c.group ? <Users className="size-[1.05em]" /> : c.name[0]}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.64em] font-medium text-ink">{c.name}</span>
                    <span className="block truncate text-[0.56em] text-muted">{c.last}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-[0.5em] border-b border-line px-[0.8em] py-[0.55em]">
              <span className="text-[0.68em] font-semibold text-ink">Project team</span>
              <span className="text-[0.56em] text-muted">4 members</span>
            </div>
            <div className="flex flex-1 flex-col gap-[0.45em] overflow-hidden px-[0.8em] py-[0.6em] text-[0.62em]">
              <span className="self-center rounded-full bg-surface-2 px-[0.8em] py-[0.1em] text-[0.9em] text-faint">Today</span>
              <p className="max-w-[78%] self-start rounded-[0.9em] rounded-bl-[0.3em] bg-surface-2 px-[0.8em] py-[0.45em] text-ink-2">
                Pushed the socket fix, can you test?
              </p>
              <p className="max-w-[78%] self-end rounded-[0.9em] rounded-br-[0.3em] bg-[var(--pa)] px-[0.8em] py-[0.45em] text-white">
                Testing now
              </p>
              <p className="max-w-[78%] self-start rounded-[0.9em] rounded-bl-[0.3em] bg-surface-2 px-[0.8em] py-[0.45em] text-ink-2">
                Messages show up instantly on my side
              </p>
              <div className="grid self-end">
                <span className="col-start-1 row-start-1 flex items-center gap-[0.25em] justify-self-end rounded-[0.9em] bg-surface-2 px-[0.8em] py-[0.6em] transition-opacity duration-300 group-hover/card:opacity-0">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="pulse-dot size-[0.4em] rounded-full bg-muted text-muted" style={{ animationDelay: `${d * 0.2}s` }} />
                  ))}
                </span>
                <p className="col-start-1 row-start-1 translate-y-[0.4em] rounded-[0.9em] rounded-br-[0.3em] bg-[var(--pa)] px-[0.8em] py-[0.45em] text-white opacity-0 transition-[opacity,transform] duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                  Same here. Shipping it.
                </p>
              </div>
            </div>
            <div className="absolute right-0 bottom-[2.2em] left-[11em] m-[0.6em] flex items-center justify-between rounded-[0.6em] border border-line bg-raised px-[0.7em] py-[0.45em] text-[0.6em] text-faint">
              Type a message
              <Send className="size-[1.1em] text-[var(--pa)]" />
            </div>
          </div>
        </div>
      </PreviewWindow>
    </PreviewFrame>
  );
}
