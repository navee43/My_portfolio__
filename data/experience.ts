export type Metric = {
  /** The figure, e.g. "70%". */
  value: string;
  /** What the figure measures, in plain words. */
  label: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  type: string;
  location: string;
  start: string;
  end: string;
  /** ISO-ish dates for <time> elements. */
  startISO: string;
  endISO: string;
  summary: string;
  metrics: Metric[];
  points: string[];
  stack: string[];
};

/**
 * Most recent first. Dates, figures and responsibilities come from the resume
 * (updated October 2026). Wording keeps team outcomes as team outcomes.
 */
export const experience: Experience[] = [
  {
    id: "codewithjay",
    role: "Frontend Developer Intern",
    company: "CodeWithJay",
    type: "Internship",
    location: "Remote",
    start: "Mar 2026",
    end: "May 2026",
    startISO: "2026-03",
    endISO: "2026-05",
    summary:
      "Frontend work on a course platform with 15,000+ users, focused on state management and load performance.",
    metrics: [
      { value: "70%", label: "fewer redundant API calls after the state migration" },
      { value: "~15%", label: "faster page loads from lazy loading and code splitting" },
      { value: "15,000+", label: "people using the course platform" },
    ],
    points: [
      "Led the migration from Context API to Redux Toolkit, which cut redundant API calls by 70% and made state easier to reason about.",
      "Built video bookmarking and progress tracking for the platform's interactive courses.",
      "Added lazy loading and code splitting, improving page load speed by about 15%.",
    ],
    stack: ["React", "Redux Toolkit", "JavaScript", "Performance"],
  },
  {
    id: "infrawave",
    role: "Full Stack Developer Intern",
    company: "Infrawave Solutions",
    type: "Internship",
    location: "Remote",
    start: "Jan 2025",
    end: "Jul 2025",
    startISO: "2025-01",
    endISO: "2025-07",
    summary:
      "Backend APIs, an LLM-powered resume feature and deployment automation for production applications.",
    metrics: [
      { value: "50+", label: "REST API endpoints built with Node.js and Express" },
      { value: "40%", label: "lower API response time" },
      { value: "15 min → <45 s", label: "deployment time after CI/CD automation" },
    ],
    points: [
      "Built 50+ REST APIs with Node.js and Express, reducing response time by 40%.",
      "Integrated LLM APIs into a resume intelligence feature that scores resumes against ATS criteria and generates tailored interview questions.",
      "Automated CI/CD with GitHub Actions, cutting deployments from 15 minutes to under 45 seconds, and took part in code reviews and sprint planning.",
    ],
    stack: ["Node.js", "Express", "REST APIs", "LLM APIs", "GitHub Actions"],
  },
];
