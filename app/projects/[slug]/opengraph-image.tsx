import { getProject, projects } from "@/data/projects";
import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "A project by Naveen Yadav";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project?.category ?? "Project",
    title: project?.name ?? "Project",
    subtitle: project?.tagline ?? "",
    stickers: project ? project.cardStack.slice(0, 4) : undefined,
  });
}
