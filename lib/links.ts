/**
 * Every external URL on the site goes through `ext()`.
 * It fails the build early if a link is malformed or not HTTPS,
 * so a typo in the data files never ships as a broken link.
 */
export function ext(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Invalid external URL in site data: "${url}"`);
  }
  if (parsed.protocol !== "https:") {
    throw new Error(`External URLs must use https: "${url}"`);
  }
  return parsed.toString();
}

/** Props for links that open another site in a new tab. */
export const newTab = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
