/**
 * The public URL of the site, used for metadata, the sitemap and share images.
 * Set NEXT_PUBLIC_SITE_URL once you have a domain. On Vercel the production
 * URL is picked up automatically if it isn't set.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  const render = process.env.RENDER_EXTERNAL_URL;
  if (render) return render.replace(/\/$/, "");

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** When the content was last reviewed. Update it when you change the data files. */
export const contentUpdated = "2026-10-21";
