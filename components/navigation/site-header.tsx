"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Monogram } from "@/components/brand/monogram";
import { buttonClass } from "@/components/ui/button";
import { socialIcons } from "@/components/ui/icons";
import { navItems, type NavId } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socials } from "@/data/social-links";
import { newTab } from "@/lib/links";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

/** Tracks which section is in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<NavId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as NavId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    // Clear the highlight when scrolled back to the hero.
    const onScroll = () => {
      const first = sections[0];
      if (first && window.scrollY + window.innerHeight * 0.5 < first.offsetTop) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return enabled ? active : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  // Position the marigold indicator under the current link.
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  useEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const el = active ? list?.querySelector<HTMLElement>(`[data-nav="${active}"]`) : null;
      if (!list || !el) return setPill(null);
      const a = el.getBoundingClientRect();
      const b = list.getBoundingClientRect();
      setPill({ left: a.left - b.left, width: a.width });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      <div className="page">
        <div
          className={cn(
            "flex h-14 items-center justify-between gap-3 rounded-full border-2 border-edge bg-surface/85 pr-2 pl-4 backdrop-blur-xl backdrop-saturate-150",
            "transition-[box-shadow] duration-300",
            scrolled ? "shadow-hard" : "shadow-hard-sm",
          )}
        >
          <Link
            href={onHome ? "#top" : "/"}
            className="group flex items-center gap-2.5 rounded-full text-ink"
            aria-label={`${profile.name}, back to top`}
          >
            <Monogram className="h-[22px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
            <span className="display-3 text-[1.25rem] tracking-[0.005em] uppercase">{profile.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul ref={listRef} className="relative flex items-center gap-0.5">
              {/* One indicator that glides between links. */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-full rounded-full border-2 border-sticker-ink bg-marigold transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.3,1.4,0.5,1)]"
                style={{
                  width: pill?.width ?? 0,
                  transform: `translateX(${pill?.left ?? 0}px)`,
                  opacity: pill ? 1 : 0,
                }}
              />
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={hrefFor(item.id)}
                      data-nav={item.id}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative z-10 block rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200",
                        isActive ? "text-sticker-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a
              href={profile.resume.localPdf}
              {...newTab}
              className={cn(
                buttonClass({ variant: "primary", size: "sm" }),
                "hidden h-9 rounded-full shadow-hard-sm sm:inline-flex",
              )}
            >
              <FileText className="size-4" aria-hidden="true" />
              Resume
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>

            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger
                className="inline-flex size-10 items-center justify-center rounded-full border-2 border-edge bg-surface text-ink transition-transform hover:-rotate-6 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Dialog.Trigger>
              <Dialog.Portal>
                {/* Radix waits for these CSS animations before unmounting, so closing animates too. */}
                <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/70 backdrop-blur-sm data-[state=closed]:animate-[fade-out_0.2s_ease_both] data-[state=open]:animate-[fade-in_0.2s_ease_both] lg:hidden" />
                <Dialog.Content className="fixed inset-x-2 top-2 z-50 rounded-[28px] border-2 border-edge bg-surface shadow-hard-lg data-[state=closed]:animate-[menu-out_0.25s_ease-in_both] data-[state=open]:animate-[menu-in_0.45s_cubic-bezier(0.3,1.3,0.5,1)_both] lg:hidden">
                  <div className="flex h-16 items-center justify-between px-5">
                    <Dialog.Title className="flex items-center gap-2.5 text-ink">
                      <Monogram className="h-[22px]" />
                      <span className="display-3 text-[1.25rem] uppercase">Menu</span>
                    </Dialog.Title>
                    <Dialog.Close
                      className="inline-flex size-10 items-center justify-center rounded-full border-2 border-edge bg-surface text-ink transition-transform hover:rotate-90"
                      aria-label="Close menu"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </Dialog.Close>
                  </div>
                  <Dialog.Description className="sr-only">Site sections and links</Dialog.Description>
                  <nav aria-label="Mobile" className="px-4 pb-6">
                    <ul className="space-y-1">
                      {navItems.map((item, i) => (
                        <li
                          key={item.id}
                          className="animate-[item-in_0.4s_cubic-bezier(0.3,1.4,0.5,1)_both]"
                          style={{ animationDelay: `${90 + i * 45}ms` }}
                        >
                          <a
                            href={hrefFor(item.id)}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "display-3 flex items-center justify-between rounded-2xl border-2 px-4 py-2 text-[2.1rem] uppercase transition-[background-color,transform,color] duration-200 hover:-rotate-1 hover:bg-marigold hover:text-sticker-ink",
                              active === item.id
                                ? "border-sticker-ink bg-marigold text-sticker-ink"
                                : "border-transparent text-ink",
                            )}
                          >
                            {item.label}
                            <ArrowUpRight className="size-6" aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-1">
                      <a href={profile.resume.localPdf} {...newTab} className={buttonClass({ variant: "primary", size: "sm" })}>
                        <FileText className="size-4" aria-hidden="true" />
                        Resume
                        <span className="sr-only"> (PDF, opens in a new tab)</span>
                      </a>
                      <ul className="flex items-center gap-2">
                        {socials.map((s) => {
                          const Icon = socialIcons[s.key];
                          return (
                            <li key={s.key}>
                              <a
                                href={s.href}
                                {...newTab}
                                aria-label={`${s.label} (opens in a new tab)`}
                                className="inline-flex size-10 items-center justify-center rounded-full border-2 border-edge bg-surface text-ink transition-transform hover:-rotate-6"
                              >
                                <Icon className="size-[18px]" />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
