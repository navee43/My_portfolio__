import { MessageCircle, Search, SlidersHorizontal, Star } from "lucide-react";
import { PreviewFrame, PreviewWindow } from "./preview-frame";

/** Entries taken from the app's own course dataset (src/lib/courseData.ts). */
const courses = [
  { name: "Arjuna JEE 2026 (Main + Advanced)", platform: "Physics Wallah", color: "hsl(243 75% 59%)", price: "₹5,499", was: "₹12,999", rating: "4.4" },
  { name: "Allen DLP JEE Main + Advanced", platform: "Allen", color: "hsl(0 72% 51%)", price: "₹28,000", was: "₹35,000", rating: "4.3" },
  { name: "Unacademy JEE Nexus Elite 2026", platform: "Unacademy", color: "hsl(142 71% 45%)", price: "₹29,999", was: "₹49,999", rating: "4.2" },
];

export function EduComparePreview({ alt }: { alt: string }) {
  return (
    <PreviewFrame
      alt={alt}
      accent="#6f6cf6"
      backdrop="radial-gradient(70% 90% at 90% 0%, rgb(111 108 246 / 0.24), transparent 70%)"
    >
      <PreviewWindow
        title={
          <>
            <span className="grid size-[1.3em] place-items-center rounded-[0.35em] bg-[var(--pa)] text-[0.65em] font-bold text-white">
              E
            </span>
            EduCompare AI
          </>
        }
        right={
          <span className="flex items-center gap-[0.4em] rounded-full bg-[var(--pa)] px-[0.8em] py-[0.25em] text-[0.62em] font-medium text-white transition-transform duration-500 ease-out group-hover/card:scale-105">
            <MessageCircle className="size-[1.1em]" /> Ask EduCompare AI
          </span>
        }
      >
        <div className="flex h-full flex-col gap-[0.65em] p-[0.9em]">
          <div className="flex items-center gap-[0.5em]">
            <div className="flex h-[2.2em] flex-1 items-center gap-[0.5em] rounded-[0.55em] border border-line bg-raised px-[0.7em] text-[0.7em] text-ink">
              <Search className="size-[1em] text-muted" />
              JEE
            </div>
            <span className="grid size-[2.2em] place-items-center rounded-[0.55em] border border-line text-muted">
              <SlidersHorizontal className="size-[1em]" />
            </span>
          </div>
          <div className="flex flex-wrap gap-[0.4em] text-[0.6em]">
            {["Competitive", "Online", "Under ₹30k", "Sort: rating"].map((f, i) => (
              <span
                key={f}
                className={
                  i === 1
                    ? "rounded-full bg-[var(--pa)] px-[0.8em] py-[0.2em] text-white"
                    : "rounded-full border border-line px-[0.8em] py-[0.2em] text-muted"
                }
              >
                {f}
              </span>
            ))}
          </div>
          <ul className="space-y-[0.45em]">
            {courses.map((c) => (
              <li key={c.name} className="flex items-center gap-[0.7em] rounded-[0.6em] border border-line bg-raised px-[0.7em] py-[0.55em]">
                <span className="h-[2.2em] w-[0.3em] shrink-0 rounded-full" style={{ background: c.color }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.68em] font-medium text-ink">{c.name}</p>
                  <p className="text-[0.58em] text-muted">{c.platform}</p>
                </div>
                <span className="flex items-center gap-[0.2em] text-[0.6em] text-ink-2">
                  <Star className="size-[0.95em] fill-[#f5b301] text-[#f5b301]" />
                  {c.rating}
                </span>
                <div className="w-[5.2em] text-right">
                  <p className="text-[0.7em] font-semibold text-ink">{c.price}</p>
                  <p className="text-[0.55em] text-faint line-through">{c.was}</p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </PreviewWindow>
    </PreviewFrame>
  );
}
