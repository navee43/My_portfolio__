/**
 * Where a skill shows up. Each skill must point to at least one piece of
 * evidence: a project in data/projects.ts, a role in data/experience.ts,
 * or the resume itself. No ratings or percentages, by design.
 */
export type Evidence =
  | { kind: "project"; slug: string }
  | { kind: "experience"; id: string }
  | { kind: "resume" };

export type Skill = { name: string; evidence: Evidence[] };
export type SkillCategory = { id: string; name: string; skills: Skill[] };

const p = (slug: string): Evidence => ({ kind: "project", slug });
const x = (id: string): Evidence => ({ kind: "experience", id });
const resume: Evidence = { kind: "resume" };

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    skills: [
      { name: "Python", evidence: [p("autonomous-coding-agent"), resume] },
      { name: "TypeScript", evidence: [p("autonomous-coding-agent"), p("kaamsetu"), p("educompare-ai"), p("food-delivery-website"), resume] },
      { name: "JavaScript", evidence: [x("codewithjay"), p("chat-app"), p("price-comparison-website"), resume] },
      { name: "Java", evidence: [resume] },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      { name: "React", evidence: [x("codewithjay"), p("autonomous-coding-agent"), p("kaamsetu"), p("educompare-ai"), p("chat-app")] },
      { name: "Next.js", evidence: [p("food-delivery-website"), resume] },
      { name: "Redux Toolkit", evidence: [x("codewithjay"), p("chat-app")] },
      { name: "Tailwind CSS", evidence: [p("autonomous-coding-agent"), p("kaamsetu"), p("educompare-ai"), p("food-delivery-website"), p("chat-app")] },
      { name: "shadcn/ui", evidence: [p("educompare-ai"), p("food-delivery-website")] },
      { name: "HTML and CSS", evidence: [p("price-comparison-website"), resume] },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    skills: [
      { name: "Node.js", evidence: [x("infrawave"), p("autonomous-coding-agent"), p("kaamsetu"), p("chat-app"), p("price-comparison-website")] },
      { name: "Express", evidence: [x("infrawave"), p("autonomous-coding-agent"), p("kaamsetu"), p("chat-app"), p("price-comparison-website")] },
      { name: "REST APIs", evidence: [x("infrawave"), p("kaamsetu"), p("chat-app")] },
      { name: "FastAPI", evidence: [p("autonomous-coding-agent")] },
      { name: "Socket.IO", evidence: [p("autonomous-coding-agent"), p("kaamsetu"), p("chat-app")] },
      { name: "JWT authentication", evidence: [p("autonomous-coding-agent"), p("kaamsetu"), p("chat-app")] },
    ],
  },
  {
    id: "data",
    name: "Data and storage",
    skills: [
      { name: "MongoDB", evidence: [p("autonomous-coding-agent"), p("kaamsetu"), p("food-delivery-website"), p("chat-app")] },
      { name: "MySQL", evidence: [resume] },
      { name: "Cloudinary", evidence: [p("food-delivery-website"), p("chat-app")] },
    ],
  },
  {
    id: "ai",
    name: "AI and agents",
    skills: [
      { name: "LLM APIs", evidence: [x("infrawave"), p("autonomous-coding-agent"), p("educompare-ai")] },
      { name: "LangGraph", evidence: [p("autonomous-coding-agent")] },
      { name: "LangChain", evidence: [p("autonomous-coding-agent")] },
      { name: "Tool calling", evidence: [p("autonomous-coding-agent")] },
      { name: "Agentic workflows", evidence: [p("autonomous-coding-agent")] },
      { name: "RAG and embeddings", evidence: [resume] },
      { name: "Model Context Protocol", evidence: [resume] },
    ],
  },
  {
    id: "tools",
    name: "Cloud, DevOps and tools",
    skills: [
      { name: "Git and GitHub", evidence: [p("autonomous-coding-agent"), p("kaamsetu"), resume] },
      { name: "GitHub Actions", evidence: [x("infrawave"), p("autonomous-coding-agent")] },
      { name: "Docker", evidence: [p("autonomous-coding-agent")] },
      { name: "AWS EC2", evidence: [p("autonomous-coding-agent")] },
      { name: "LangSmith", evidence: [p("autonomous-coding-agent")] },
      { name: "Vercel", evidence: [p("food-delivery-website")] },
      { name: "Render", evidence: [p("kaamsetu"), p("educompare-ai"), p("chat-app")] },
      { name: "pytest, Vitest and Playwright", evidence: [p("autonomous-coding-agent")] },
    ],
  },
];
