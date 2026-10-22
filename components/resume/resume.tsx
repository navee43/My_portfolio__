import { Download, ExternalLink as ExternalIcon, FileText, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { buttonClass } from "@/components/ui/button";
import { Kicker } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";
import { links } from "@/data/social-links";
import { newTab } from "@/lib/links";
import { ResumePreviewToggle } from "./resume-preview-toggle";
import { Reveal } from "@/components/motion/reveal";

export function Resume() {
  const { resume } = profile;

  return (
    <section id="resume" aria-labelledby="resume-title" className="py-20 sm:py-28">
      <div className="page">
        <Reveal className="overflow-hidden rounded-[30px] border-2 border-edge bg-surface shadow-hard-lg">
          <div className="grid lg:grid-cols-12">
            {/* The real first page of the resume, taped to a marigold board. */}
            <div className="dots relative overflow-hidden border-b-2 border-edge bg-marigold lg:col-span-5 lg:border-r-2 lg:border-b-0">
              <a
                href={resume.localPdf}
                {...newTab}
                data-cursor
                className="group relative block px-10 pt-12 pb-0 sm:px-16 sm:pt-16 lg:px-12"
              >
                <span className="relative mx-auto block max-w-[23rem] -rotate-3 transition-transform duration-500 ease-[cubic-bezier(0.3,1.4,0.5,1)] group-hover:rotate-0 group-hover:-translate-y-2">
                  {/* Tape strips. */}
                  <span aria-hidden="true" className="absolute -top-3 left-6 z-10 h-7 w-20 -rotate-6 bg-white/60 backdrop-blur-[1px]" />
                  <span aria-hidden="true" className="absolute -top-3 right-6 z-10 h-7 w-20 rotate-6 bg-white/60 backdrop-blur-[1px]" />
                  <Image
                    src={resume.previewImage}
                    width={resume.previewImageSize.width}
                    height={resume.previewImageSize.height}
                    alt="First page of Naveen Yadav's resume"
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 60vw, 85vw"
                    className="w-full rounded-t-lg border-2 border-b-0 border-sticker-ink shadow-[8px_8px_0_0_var(--sticker-ink)]"
                  />
                  <span
                    className="sticker absolute top-[38%] -right-4 bg-pink text-sm transition-transform duration-300 group-hover:rotate-[14deg] sm:-right-8"
                    style={{ ["--tilt" as string]: "9deg" }}
                    aria-hidden="true"
                  >
                    <FileText className="size-4" strokeWidth={2.5} />
                    open me
                  </span>
                </span>
                <span className="sr-only">Open the resume PDF (opens in a new tab)</span>
              </a>
            </div>

            <div className="flex flex-col p-7 sm:p-10 lg:col-span-7 lg:p-14">
              <Kicker icon={Sparkles} color="mint" tilt={-3} className="mb-5 self-start">
                the one-pager
              </Kicker>
              <h2 id="resume-title" className="display-2 text-ink">
                Resume
              </h2>
              <p className="mt-5 max-w-[50ch] text-[1.0625rem] leading-relaxed text-muted">
                One page covering education, both internships, projects, skills and achievements. Updated {resume.updated}.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={resume.localPdf} download={resume.downloadName} className={buttonClass({ variant: "primary" })}>
                  <Download className="size-4" aria-hidden="true" />
                  Download PDF
                </a>
                <a href={links.resumeDrive} {...newTab} className={buttonClass({ variant: "secondary" })}>
                  <ExternalIcon className="size-4" aria-hidden="true" />
                  Open in Google Drive
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>

              <div className="mt-5">
                <ResumePreviewToggle />
              </div>

              <div className="mt-auto pt-10">
                <div className="lift rounded-[22px] border-2 border-sticker-ink bg-lilac p-5 text-sticker-ink shadow-hard sm:p-6 dark:border-edge">
                  <p className="display-3 text-[1.6rem] uppercase">Hiring for software, full-stack or AI?</p>
                  <p className="mt-2 text-[0.98rem] font-medium leading-relaxed opacity-85">
                    I&apos;m open to internships and full-time opportunities, and happy to talk through any project here in depth.
                  </p>
                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent("Opportunity for Naveen Yadav")}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-sticker-ink bg-white px-4 py-2 text-[0.9375rem] font-bold shadow-[3px_3px_0_0_var(--sticker-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--sticker-ink)]"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
