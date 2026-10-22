import { ExternalLink, Search, Star } from "lucide-react";
import { PreviewFrame, PreviewWindow } from "./preview-frame";

/**
 * Shows the fields the app renders for each offer (image, title, price,
 * source, rating, links). Prices are fetched live at search time, so none
 * are invented here: the price slots are left as placeholders.
 */
export function PricePreview({ alt }: { alt: string }) {
  return (
    <PreviewFrame
      alt={alt}
      accent="#4aa8f0"
      backdrop="radial-gradient(70% 90% at 100% 100%, rgb(74 168 240 / 0.22), transparent 70%)"
    >
      <PreviewWindow
        title={
          <>
            <span className="grid size-[1.3em] place-items-center rounded-[0.35em] bg-[var(--pa)] text-[0.65em] font-bold text-white">
              ₹
            </span>
            Price comparison
          </>
        }
      >
        <div className="flex h-full flex-col gap-[0.65em] p-[0.9em]">
          <div className="flex h-[2.2em] items-center gap-[0.5em] rounded-[0.55em] border border-line bg-raised px-[0.7em] text-[0.7em] text-ink">
            <Search className="size-[1em] text-muted" />
            wireless earbuds
            <span className="caret ml-[-0.2em] h-[1em] w-px bg-ink" />
          </div>
          <p className="text-[0.58em] text-faint">Offers from Google Shopping, fetched when you search</p>
          <ul className="space-y-[0.45em]">
            {[0, 1, 2].map((i) => (
              <li key={i} className="flex items-center gap-[0.7em] rounded-[0.6em] border border-line bg-raised p-[0.55em]">
                <span className="relative size-[2.6em] shrink-0 overflow-hidden rounded-[0.45em] bg-surface-2">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--pa)_18%,transparent)] to-transparent transition-transform duration-1000 group-hover/card:translate-x-full" />
                </span>
                <div className="min-w-0 flex-1 space-y-[0.35em]">
                  <span className="block h-[0.55em] rounded-full bg-line-strong/70" style={{ width: `${[78, 64, 70][i]}%` }} />
                  <span className="flex items-center gap-[0.6em] text-[0.56em] text-muted">
                    <span>Source: seller {["A", "B", "C"][i]}</span>
                    <span className="flex items-center gap-[0.2em]">
                      <Star className="size-[1em] fill-[#f5b301] text-[#f5b301]" />
                      Rating
                    </span>
                  </span>
                </div>
                <div className="flex flex-col items-end gap-[0.3em]">
                  <span className="text-[0.7em] font-semibold text-ink">₹ —</span>
                  <span className="flex items-center gap-[0.25em] text-[0.55em] text-[var(--pa)]">
                    Compare <ExternalLink className="size-[0.95em]" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PreviewWindow>
    </PreviewFrame>
  );
}
