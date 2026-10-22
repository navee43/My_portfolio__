"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { links } from "@/data/social-links";

/**
 * Loads Google Drive's embedded viewer only when asked, so the page
 * doesn't pay for a heavy iframe nobody opened.
 */
export function ResumePreviewToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="resume-embed"
        className={buttonClass({ variant: "quiet", size: "sm", className: "-ml-2 px-2" })}
      >
        {open ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
        {open ? "Hide preview" : "Preview here"}
      </button>
      <div id="resume-embed" hidden={!open}>
        {open && (
          <iframe
            src={links.resumeDrivePreview}
            title="Naveen Yadav's resume in Google Drive's viewer"
            loading="lazy"
            className="mt-4 aspect-[8.5/11] w-full rounded-xl border border-line bg-white"
            allow="autoplay"
          />
        )}
      </div>
    </div>
  );
}
