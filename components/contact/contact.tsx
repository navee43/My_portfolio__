import { MapPin, Phone } from "lucide-react";
import { Marquee } from "@/components/motion/marquee";
import { socialIcons } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import { socials } from "@/data/social-links";
import { newTab } from "@/lib/links";
import { CopyEmail } from "./copy-email";
import { Reveal } from "@/components/motion/reveal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden pt-16 pb-28 sm:pt-20 sm:pb-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="grid-field absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_60%,black_20%,transparent_75%)]" />
        <div className="absolute bottom-[-30%] left-[-10%] size-[40rem] rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)]" />
        <div className="absolute top-[20%] right-[-10%] size-[30rem] rounded-full bg-[radial-gradient(closest-side,var(--glow-b),transparent)]" />
      </div>

      {/* Giant outlined ticker. Decorative: the heading below says the same thing. */}
      <div aria-hidden="true" className="mb-16 sm:mb-20">
        <Marquee
          items={["let's build something", "say hi", "open to opportunities", "let's talk"]}
          speed={34}
          label="Contact"
          className="display-1 stroke-text text-[clamp(3.5rem,2rem+7vw,8rem)] uppercase leading-none"
        />
      </div>

      <Reveal className="page">
        {profile.availability.open && (
          <p
            className="sticker bg-mint text-[0.8125rem]"
            style={{ ["--tilt" as string]: "-3deg" }}
          >
            <span className="pulse-dot size-2 rounded-full bg-[#0b7a50] text-[#0b7a50]" aria-hidden="true" />
            {profile.availability.label}
          </p>
        )}
        <h2 id="contact-title" className="display-1 mt-7 max-w-[13em] text-ink">
          Have an interesting problem to solve? Let&apos;s build{" "}
          <span className="marker-reveal">something meaningful.</span>
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <div className="rounded-[26px] border-2 border-edge bg-surface p-6 shadow-hard-lg sm:p-8">
              <p className="text-sm font-bold text-faint">Email is the fastest way to reach me</p>
              <a
                href={`mailto:${profile.email}`}
                className="display-3 mt-3 inline-block max-w-full break-all bg-[linear-gradient(var(--marigold),var(--marigold))] bg-[length:100%_0.14em] bg-[position:0_100%] bg-no-repeat text-[clamp(1.9rem,1.2rem+2.6vw,3.2rem)] text-ink transition-[background-size] duration-300 hover:bg-[length:100%_100%] hover:text-sticker-ink"
              >
                {profile.email}
              </a>
              <CopyEmail email={profile.email} className="mt-6 flex" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <dl className="space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-2xl border-2 border-line-strong bg-surface px-5 py-4">
                <dt className="flex items-center gap-2.5 text-sm font-bold text-faint">
                  <Phone className="size-4" aria-hidden="true" /> Phone
                </dt>
                <dd>
                  <a href={profile.phoneHref} className="font-semibold text-ink tabular-nums transition-colors hover:text-accent">
                    {profile.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl border-2 border-line-strong bg-surface px-5 py-4">
                <dt className="flex items-center gap-2.5 text-sm font-bold text-faint">
                  <MapPin className="size-4" aria-hidden="true" /> Location
                </dt>
                <dd className="text-right font-semibold text-ink">{profile.location}</dd>
              </div>
              {socials.map((s, i) => {
                const Icon = socialIcons[s.key];
                return (
                  <div
                    key={s.key}
                    className="flex items-center justify-between gap-4 rounded-2xl border-2 border-line-strong bg-surface px-5 py-4 transition-[transform,border-color] duration-200 hover:border-edge"
                    style={{ rotate: i === 1 ? "0.4deg" : "-0.4deg" }}
                  >
                    <dt className="flex items-center gap-2.5 text-sm font-bold text-faint">
                      <Icon className="size-4" /> {s.label}
                    </dt>
                    <dd className="min-w-0">
                      <a
                        href={s.href}
                        {...newTab}
                        className="block truncate font-mono text-sm font-semibold text-ink transition-colors hover:text-accent"
                      >
                        {s.handle}
                        <span className="sr-only"> on {s.label} (opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
