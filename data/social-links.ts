import { ext } from "@/lib/links";

/**
 * All profile links live here. Every other file imports from this one,
 * so changing a URL here updates the whole site.
 */
export const links = {
  github: ext("https://github.com/navee43"),
  linkedin: ext("https://www.linkedin.com/in/naveen-yadav-36122b29a/"),
  leetcode: ext("https://leetcode.com/u/_Naveen11k/"),
  resumeDrive: ext(
    "https://drive.google.com/file/d/1XWp0R__ttGt5ALjbTNwVNbcOJ12ib_J5/view?usp=sharing",
  ),
  resumeDrivePreview: ext(
    "https://drive.google.com/file/d/1XWp0R__ttGt5ALjbTNwVNbcOJ12ib_J5/preview",
  ),
} as const;

export type SocialKey = "github" | "linkedin" | "leetcode";

export const socials: { key: SocialKey; label: string; href: string; handle: string }[] = [
  { key: "github", label: "GitHub", href: links.github, handle: "navee43" },
  { key: "linkedin", label: "LinkedIn", href: links.linkedin, handle: "naveen-yadav-36122b29a" },
  { key: "leetcode", label: "LeetCode", href: links.leetcode, handle: "_Naveen11k" },
];
