import { Monogram } from "@/components/brand/monogram";
import { socialIcons } from "@/components/ui/icons";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socials } from "@/data/social-links";
import { newTab } from "@/lib/links";
import { BackToTop } from "./back-to-top";
import { CurrentYear } from "./current-year";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t-2 border-edge bg-surface">
      <div className="page pt-14 sm:pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-ink">
              <Monogram className="h-8" />
              <span className="display-3 text-[1.6rem] uppercase">{profile.name}</span>
            </div>
            <p className="mt-4 max-w-[34ch] font-medium text-muted">
              Building useful software. Exploring intelligent systems.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-block font-semibold text-ink underline decoration-marigold decoration-[3px] underline-offset-[6px] transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className="font-semibold text-muted transition-[color,padding] duration-200 hover:pl-1 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <ul className="flex flex-wrap gap-2" aria-label="Profiles">
              {socials.map((s) => {
                const Icon = socialIcons[s.key];
                return (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      {...newTab}
                      className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-edge px-4 text-sm font-semibold text-ink transition-[transform,background-color,color] duration-200 hover:-rotate-3 hover:bg-marigold hover:text-sticker-ink"
                    >
                      <Icon className="size-4" />
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-line-strong pt-6 text-sm font-semibold text-faint">
          <p>
            © <CurrentYear /> {profile.name}
          </p>
          <BackToTop />
        </div>
      </div>

      {/* Giant wordmark along the bottom edge. Purely decorative, so it's drawn
          as generated content: screen readers and contrast checks skip it. */}
      <p
        aria-hidden="true"
        data-text={profile.name}
        className="display-1 stroke-text group mt-8 cursor-default text-center text-[clamp(3.5rem,0.5rem+13vw,15rem)] leading-[0.78] whitespace-nowrap uppercase select-none [-webkit-text-stroke-color:var(--line-strong)] transition-colors duration-500 before:content-[attr(data-text)] hover:text-marigold hover:[-webkit-text-stroke-color:var(--sticker-ink)]"
      />
    </footer>
  );
}
