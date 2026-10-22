import { cacheLife } from "next/cache";

export type RepoSummary = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  updated: string;
};

export type GitHubSummary = {
  publicRepos: number;
  languages: { name: string; count: number }[];
  recent: RepoSummary[];
};

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

/**
 * Public repository data from the GitHub REST API. No token is needed;
 * set GITHUB_TOKEN only if you hit the anonymous rate limit.
 * Results are cached for a few hours. Returns null on any failure so the
 * page can fall back to the project list instead of showing an error.
 */
export async function getGitHubSummary(username: string): Promise<GitHubSummary | null> {
  "use cache";
  cacheLife("hours");

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "naveen-portfolio",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, signal: AbortSignal.timeout(5000) }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
        headers,
        signal: AbortSignal.timeout(5000),
      }),
    ]);
    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as { public_repos?: number };
    const repos = (await reposRes.json()) as ApiRepo[];
    if (!Array.isArray(repos) || typeof user.public_repos !== "number") return null;

    const own = repos.filter((r) => !r.fork && !r.archived);

    const counts = new Map<string, number>();
    for (const r of own) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    const languages = [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const fmt = new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric" });
    const recent = own.slice(0, 4).map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      url: r.html_url,
      updated: fmt.format(new Date(r.pushed_at)),
    }));

    return { publicRepos: user.public_repos, languages, recent };
  } catch {
    return null;
  }
}
