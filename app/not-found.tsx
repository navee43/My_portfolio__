import type { Metadata } from "next";
import Link from "next/link";
import { Monogram } from "@/components/brand/monogram";
import { buttonClass } from "@/components/ui/button";
import { RequestPath } from "@/components/ui/request-path";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden="true" className="grid-field absolute inset-0 -z-10" />
      <div className="page">
        <span
          className="sticker bg-pink text-sm"
          style={{ ["--tilt" as string]: "-4deg" }}
        >
          <Monogram className="h-4" /> oops
        </span>
        <div className="mt-8">
          <RequestPath />
        </div>
        <h1 className="display-1 mt-4 max-w-[12em] uppercase text-ink">
          This page <span className="marker">doesn&apos;t exist.</span>
        </h1>
        <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-muted">
          The link may be old or mistyped. Everything on the site is one click from the homepage.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className={buttonClass({ variant: "primary" })}>
            Go to the homepage
          </Link>
          <Link href="/#projects" className={buttonClass({ variant: "secondary" })}>
            See projects
          </Link>
        </div>
      </div>
    </section>
  );
}
