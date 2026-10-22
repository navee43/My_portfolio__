import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Naveen Yadav, software engineer building full-stack applications and AI agents";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({
    eyebrow: "Software engineer",
    title: "I build intelligent systems and digital experiences.",
    subtitle: "Internships in full-stack and frontend development. Projects from an autonomous coding agent to real-time hiring platforms.",
  });
}
