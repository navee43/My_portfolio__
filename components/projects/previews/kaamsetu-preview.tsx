import { BadgeCheck, Bell, MapPin, Star } from "lucide-react";
import { PreviewFrame, PreviewWindow } from "./preview-frame";

const workers = [
  { initials: "RK", name: "Ramesh K.", skill: "Electrician", km: "1.2", rating: "4.8" },
  { initials: "SD", name: "Sunita D.", skill: "Painter", km: "2.6", rating: "4.9" },
  { initials: "AM", name: "Arif M.", skill: "Plumber", km: "3.9", rating: "4.6" },
];

/** Modelled on the employer dashboard: nearby workers, a posted job, a live notification. */
export function KaamSetuPreview({ alt }: { alt: string }) {
  return (
    <PreviewFrame
      alt={alt}
      accent="#e3a14f"
      backdrop="radial-gradient(70% 90% at 100% 0%, rgb(227 161 79 / 0.22), transparent 70%), radial-gradient(60% 70% at 0% 100%, rgb(227 161 79 / 0.08), transparent 70%)"
    >
      <PreviewWindow
        title={
          <>
            <span className="grid size-[1.3em] place-items-center rounded-[0.35em] bg-[var(--pa)] text-[0.65em] font-bold text-[#1a1206]">
              K
            </span>
            KaamSetu
            <span className="rounded-full border border-line px-[0.6em] py-[0.05em] text-[0.8em] font-medium text-muted">
              Employer
            </span>
          </>
        }
        right={<Bell className="size-[0.95em] text-muted" />}
      >
        <div className="grid h-full grid-cols-[1.25fr_1fr] gap-[0.8em] p-[0.9em]">
          <div className="min-w-0">
            <div className="mb-[0.6em] flex items-center justify-between">
              <p className="text-[0.75em] font-semibold text-ink">Nearby workers</p>
              <span className="flex items-center gap-[0.3em] rounded-full bg-surface-2 px-[0.6em] py-[0.15em] text-[0.6em] text-muted">
                <MapPin className="size-[1em]" /> within 5 km
              </span>
            </div>
            <ul className="space-y-[0.45em]">
              {workers.map((w) => (
                <li
                  key={w.name}
                  className="flex items-center gap-[0.6em] rounded-[0.6em] border border-line bg-raised p-[0.55em] transition-colors duration-300 group-hover/card:first:border-[var(--pa)]"
                >
                  <span className="grid size-[2.1em] shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--pa)_22%,transparent)] text-[0.62em] font-semibold text-ink">
                    {w.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-[0.3em] text-[0.68em] font-medium text-ink">
                      {w.name}
                      <BadgeCheck className="size-[1.05em] text-pass" />
                    </p>
                    <p className="text-[0.6em] text-muted">
                      {w.skill}, {w.km} km away
                    </p>
                  </div>
                  <span className="flex items-center gap-[0.2em] text-[0.62em] text-ink-2">
                    <Star className="size-[0.95em] fill-[var(--pa)] text-[var(--pa)]" />
                    {w.rating}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0 flex-col gap-[0.6em]">
            <div className="rounded-[0.6em] border border-line bg-raised p-[0.7em]">
              <div className="flex items-center justify-between">
                <p className="text-[0.7em] font-semibold text-ink">Rewire 2BHK flat</p>
                <span className="rounded-full bg-pass-soft px-[0.55em] py-[0.05em] text-[0.56em] text-pass">Open</span>
              </div>
              <p className="mt-[0.3em] text-[0.6em] text-muted">Electrician, 2 days</p>
              <div className="mt-[0.7em] flex items-center justify-between text-[0.6em]">
                <span className="text-ink-2">2 requests</span>
                <span className="rounded-[0.4em] bg-[var(--pa)] px-[0.7em] py-[0.25em] font-medium text-[#1a1206]">Review</span>
              </div>
            </div>
            {/* Real-time notification (Socket.IO). */}
            <div className="flex items-start gap-[0.5em] rounded-[0.6em] border border-[color-mix(in_srgb,var(--pa)_45%,transparent)] bg-surface p-[0.6em] shadow-soft transition-transform duration-500 ease-out group-hover/card:-translate-y-[0.3em]">
              <span className="relative mt-[0.15em] flex size-[0.6em] shrink-0">
                <span className="pulse-dot absolute inset-0 rounded-full bg-[var(--pa)] text-[var(--pa)]" />
              </span>
              <p className="text-[0.6em] leading-[1.4] text-ink-2">
                <span className="font-semibold text-ink">Sunita D.</span> accepted your job request
              </p>
            </div>
            <div className="rounded-[0.6em] border border-line bg-raised p-[0.7em]">
              <p className="text-[0.6em] text-muted">Aadhaar verification</p>
              <div className="mt-[0.45em] h-[0.4em] overflow-hidden rounded-full bg-surface-2">
                <div className="h-full w-[82%] rounded-full bg-pass" />
              </div>
              <p className="mt-[0.4em] text-[0.56em] text-faint">Workers verified via OCR</p>
            </div>
                    </div>
        </div>
      </PreviewWindow>
    </PreviewFrame>
  );
}
