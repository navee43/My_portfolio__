import { Plus, ShoppingBag } from "lucide-react";
import { PreviewFrame, PreviewWindow } from "./preview-frame";

/** Items and prices as they appear on the live Gomino site. */
const items = [
  { name: "Classic Cheeseburger", price: "₹199" },
  { name: "BBQ Bacon Burger", price: "₹249" },
  { name: "Mushroom Swiss Burger", price: "₹229" },
];

/** A simple burger drawn with stacked shapes. */
function Burger() {
  return (
    <div className="flex w-[3.4em] flex-col items-center gap-[0.12em]">
      <span className="h-[1.1em] w-full rounded-t-[1.4em] rounded-b-[0.3em] bg-[#e8a34a]" />
      <span className="h-[0.3em] w-[105%] rounded-full bg-[#7cc04b]" />
      <span className="h-[0.3em] w-[95%] rounded-full bg-[#f2c14e]" />
      <span className="h-[0.55em] w-full rounded-[0.3em] bg-[#6b3b24]" />
      <span className="h-[0.6em] w-full rounded-t-[0.25em] rounded-b-[0.8em] bg-[#e09a42]" />
    </div>
  );
}

export function FoodPreview({ alt }: { alt: string }) {
  return (
    <PreviewFrame
      alt={alt}
      accent="#f06a43"
      backdrop="radial-gradient(70% 90% at 10% 0%, rgb(240 106 67 / 0.22), transparent 70%), radial-gradient(50% 60% at 100% 100%, rgb(242 193 78 / 0.12), transparent 70%)"
    >
      <PreviewWindow
        title={
          <>
            <span className="text-[1.05em] font-bold tracking-[-0.02em] text-[var(--pa)]">Gomino</span>
          </>
        }
        right={
          <span className="relative flex items-center text-ink-2">
            <ShoppingBag className="size-[1.05em]" />
            <span className="absolute -top-[0.55em] -right-[0.75em] grid size-[1.25em] place-items-center overflow-hidden rounded-full bg-[var(--pa)] text-[0.58em] font-semibold text-white">
              <span className="col-start-1 row-start-1 transition-transform duration-300 group-hover/card:-translate-y-[1.3em]">2</span>
              <span className="col-start-1 row-start-1 translate-y-[1.3em] transition-transform duration-300 group-hover/card:translate-y-0">3</span>
            </span>
          </span>
        }
      >
        <div className="flex h-full flex-col gap-[0.7em] p-[0.9em]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[0.6em] text-muted">Our menu</p>
              <p className="text-[1em] font-semibold tracking-[-0.02em] text-ink">Bestsellers</p>
            </div>
            <div className="flex gap-[0.35em] text-[0.58em]">
              <span className="rounded-full bg-[var(--pa)] px-[0.8em] py-[0.2em] text-white">Burgers</span>
              <span className="rounded-full border border-line px-[0.8em] py-[0.2em] text-muted">Sides</span>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-[0.6em]">
            {items.map((item, i) => (
              <li key={item.name} className="flex flex-col items-center rounded-[0.7em] border border-line bg-raised p-[0.6em] text-center">
                <div className="grid h-[4.4em] w-full place-items-center rounded-[0.5em] bg-[color-mix(in_srgb,var(--pa)_10%,transparent)]">
                  <Burger />
                </div>
                <p className="mt-[0.55em] text-[0.62em] font-medium leading-tight text-ink">{item.name}</p>
                <p className="mt-[0.2em] text-[0.55em] text-faint">220 g</p>
                <div className="flex w-full items-center justify-between pt-[0.6em]">
                  <span className="text-[0.7em] font-semibold text-ink">{item.price}</span>
                  <span
                    className={
                      i === 1
                        ? "grid size-[1.6em] place-items-center rounded-full bg-[var(--pa)] text-white transition-transform duration-300 group-hover/card:scale-110"
                        : "grid size-[1.6em] place-items-center rounded-full border border-line text-ink-2"
                    }
                  >
                    <Plus className="size-[0.9em]" />
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
