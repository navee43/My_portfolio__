import { ext } from "@/lib/links";

/** Which custom preview component illustrates the project. */
export type PreviewKind = "agent" | "kaamsetu" | "educompare" | "food" | "price" | "chat";

export type StackGroup = { group: string; items: string[] };

export type ProjectLinks = {
  /** Public source code. Leave undefined if there's no public repo. */
  repo?: string;
  /** A deployed version. Leave undefined if there's no verified deployment. */
  live?: string;
  /** Button text for the live link. */
  liveLabel?: string;
  /** A short honest note shown next to the live link, e.g. "Sign-in required". */
  liveNote?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** One sentence for cards. */
  tagline: string;
  /** Two or three sentences for the detail page header. */
  summary: string;
  problem: string;
  features: string[];
  stack: StackGroup[];
  /** A short list for cards. Every item also appears in `stack`. */
  cardStack: string[];
  /** How the system fits together, in plain words. */
  architecture?: string;
  /** First-person contribution, only where it's documented. */
  contribution?: string[];
  /** Honest notes: limitations, access, hosting. */
  notes: string[];
  links: ProjectLinks;
  preview: PreviewKind;
  /** Describes the illustrative preview for screen readers. */
  previewAlt: string;
  featured: boolean;
};

/**
 * Sources: the public GitHub repositories (inspected October 2026), the resume,
 * and the live deployments. Anything that couldn't be verified is left out.
 * Add, remove or reorder projects here and the whole site follows.
 */
export const projects: Project[] = [
  {
    slug: "autonomous-coding-agent",
    name: "Autonomous Coding Agent",
    category: "AI engineering and developer tools",
    tagline:
      "An agent that turns plain-English tasks into Python, runs it in a sandbox, checks the result and repairs its own mistakes.",
    summary:
      "Describe a programming or data-analysis task and attach your files. The agent plans, inspects the inputs, writes Python and runs it in an isolated Docker sandbox. When something fails it diagnoses the error and repairs the code, up to three attempts, then verifies the result independently before reporting success.",
    problem:
      "A typical coding assistant stops once it has generated code. That code might reference a column that doesn't exist, return the wrong number of rows or never finish. This project closes the loop: the agent runs its own code, reads the result, questions it and fixes it, and it never reports success when verification fails.",
    features: [
      "Natural-language tasks with uploaded CSV, JSON, text or Markdown files.",
      "A LangGraph state graph with eight nodes: plan, inspect files, generate, execute, verify, analyze error, repair and finalize.",
      "Errors are classified into 12 categories before a targeted repair. Retries stop at three, enforced by code rather than the model.",
      "Independent verification: deterministic checks, an LLM verdict and a sandboxed assertion script must all pass.",
      "A fresh Docker sandbox for every run, with no network, CPU, memory and process limits, a non-root user and a 10-second timeout.",
      "One provider layer for Gemini, OpenAI and Anthropic, with a separate model for each role.",
      "Live progress over Socket.IO: a timeline, logs, attempt history and side-by-side diffs between attempts in a Monaco viewer.",
      "JWT authentication, task history in MongoDB and optional LangSmith tracing with sanitised payloads.",
      "A 50-task benchmark with human-written ground-truth checks, run in CI alongside unit, security and browser tests.",
    ],
    stack: [
      { group: "Agent service", items: ["Python", "FastAPI", "LangGraph", "LangChain", "Pydantic", "Docker SDK"] },
      { group: "Application API", items: ["Node.js", "Express", "TypeScript", "MongoDB", "JWT", "Socket.IO"] },
      { group: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Monaco Editor"] },
      { group: "Infrastructure", items: ["Docker Compose", "Nginx", "AWS EC2", "GitHub Actions", "LangSmith"] },
      { group: "Testing", items: ["pytest", "Vitest", "Playwright"] },
    ],
    cardStack: ["LangGraph", "FastAPI", "React", "Docker", "MongoDB"],
    architecture:
      "Two backends with separate jobs. A Node.js API handles accounts, tasks, uploads and websockets, and is the only part that talks to MongoDB. A FastAPI service runs the LangGraph agent and is the only part allowed to control Docker. Each execution gets a fresh sandbox container, and files are copied in and out rather than mounted.",
    contribution: [
      "Designed the multi-agent LangGraph and LangChain workflow and the FastAPI service that runs it.",
      "Built the Docker sandbox for untrusted, LLM-generated code, and the multi-provider LLM layer with tool calling, token and cost tracking, and LangSmith observability.",
      "Built the React, TypeScript and Node.js platform with JWT authentication, MongoDB and real-time streaming, and deployed the containerised services on AWS EC2 behind Nginx with HTTPS.",
    ],
    notes: [
      "The benchmark suite and its checks are in the repository. Agent success rates will be published once the full run against a live model is complete.",
      "The live app needs an account, so the link opens the sign-in page.",
    ],
    links: {
      repo: ext("https://github.com/navee43/Autonomous_coding_agent"),
      live: ext("https://autonomous-coding-agent.duckdns.org/login"),
      liveLabel: "Open live app",
      liveNote: "Sign-in required",
    },
    preview: "agent",
    previewAlt:
      "Illustration of the agent's workspace: a task prompt, an execution timeline where attempt 1 fails with a KeyError and attempt 2 passes verification, and the repaired code.",
    featured: true,
  },
  {
    slug: "kaamsetu",
    name: "KaamSetu",
    category: "Full-stack development and social impact",
    tagline:
      "A hiring platform that connects local workers, like electricians and plumbers, with employers nearby.",
    summary:
      "Workers build a verified profile and find jobs close to them. Employers post jobs, search for workers within a chosen radius, and manage each job from request to completion, payment and rating. Both sides get updates in real time.",
    problem:
      "Electricians, plumbers, masons, painters and other local workers often find work by word of mouth, and employers have little way to check who they're hiring. KaamSetu gives both sides one place to find each other, with identity verification built in.",
    features: [
      "Separate worker and employer dashboards with role-based access.",
      "Sign-up with a phone one-time password, plus Google sign-in.",
      "Aadhaar card verification with Tesseract.js OCR in English and Hindi, which fills in profile details automatically.",
      "Location-based search for workers within a chosen distance, backed by a MongoDB 2dsphere index.",
      "The full job lifecycle: post, request, accept, complete, record payment and rate.",
      "Real-time notifications for workers and employers over Socket.IO.",
      "Reward points for completed jobs and verification, redeemable for vouchers such as skill certificates.",
      "A complaints flow for reporting problems, and Hindi voice input in the worker dashboard.",
    ],
    stack: [
      { group: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Socket.IO client"] },
      { group: "Backend", items: ["Node.js", "Express", "MongoDB", "Socket.IO", "JWT", "Passport (Google OAuth)", "Nodemailer"] },
      { group: "Verification", items: ["Tesseract.js OCR"] },
    ],
    cardStack: ["React", "Node.js", "MongoDB", "Socket.IO", "Tesseract.js"],
    architecture:
      "A React and TypeScript client talks to an Express REST API over JWT-authenticated routes split by role. MongoDB stores users, worker and employer profiles, jobs and complaints, with a geospatial index on worker locations. A Socket.IO server keeps track of connected workers and employers so job events reach the right person instantly.",
    contribution: [
      "Built the marketplace end to end on the MERN stack: REST APIs, role-based workflows, job management and real-time communication.",
      "Implemented the document verification pipeline with Tesseract.js OCR.",
      "Implemented JWT authentication, role-based access control, location-based job discovery and Socket.IO updates.",
    ],
    notes: [
      "Using the live app requires creating an account.",
      "It's hosted on Render, so the first load can take a moment if the app has been idle.",
    ],
    links: {
      repo: ext("https://github.com/navee43/local_worker"),
      live: ext("https://local-worker-1.onrender.com/"),
      liveLabel: "Try live app",
      liveNote: "Account required",
    },
    preview: "kaamsetu",
    previewAlt:
      "Illustration of the KaamSetu employer dashboard: nearby verified workers sorted by distance, an open job, and a real-time notification that a worker accepted.",
    featured: true,
  },
  {
    slug: "educompare-ai",
    name: "EduCompare AI",
    category: "Education technology",
    tagline: "Search and compare courses from 20 Indian ed-tech platforms in one place.",
    summary:
      "Browse a catalogue of courses from platforms such as Physics Wallah, Allen, Unacademy and Khan Academy. Filter by exam, level, price, mode and language, sort the results, and ask a Gemini-powered assistant for help while you browse.",
    problem:
      "Students choosing a course for JEE, NEET, UPSC or programming have to jump between dozens of platforms, each with its own pricing and format. EduCompare brings them into one searchable view.",
    features: [
      "Search across 20 platforms, with filters for category, subcategory, platform, level, price range, mode and language, plus sorting.",
      "Platform pages and course pages with duration, features, pricing and sample reviews.",
      "A deals bar that highlights offers from the dataset.",
      "Google sign-in with Firebase Authentication.",
      "An assistant chat built on Google's Gemini API.",
    ],
    stack: [
      {
        group: "Frontend",
        items: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "React Router", "TanStack Query"],
      },
      { group: "Services", items: ["Firebase Authentication", "Gemini API"] },
    ],
    cardStack: ["React", "TypeScript", "shadcn/ui", "Firebase", "Gemini API"],
    notes: [
      "Course information comes from a curated dataset bundled with the app, not a live feed from each platform.",
      "It's hosted on Render, so the first load can take a moment if the app has been idle.",
    ],
    links: {
      repo: ext("https://github.com/navee43/Educompare_ai"),
      live: ext("https://educompare-ai-1.onrender.com/"),
      liveLabel: "Live demo",
    },
    preview: "educompare",
    previewAlt:
      "Illustration of EduCompare search results for JEE courses, with platform, price and rating for each course and filters for mode and price.",
    featured: false,
  },
  {
    slug: "food-delivery-website",
    name: "Food Delivery Website",
    category: "Web development and e-commerce",
    tagline: "Gomino, a burger ordering site with accounts, a cart, checkout and an admin side.",
    summary:
      "Gomino is a food-ordering site built with Next.js. Customers browse the menu, add items to their cart and check out. Admins manage menu items, users and orders from their own tabs.",
    problem:
      "A small restaurant needs an online storefront that customers can order from and staff can update without touching code. This project covers both sides in one Next.js app.",
    features: [
      "Menu browsing with bestsellers and item detail pages.",
      "A cart with a checkout flow built on Razorpay's order API.",
      "Accounts with NextAuth (email and password, or Google), and email verification codes sent with Resend.",
      "Profile and order history pages.",
      "Admin tabs for menu items, users and orders, with image uploads to Cloudinary.",
      "Form validation with Zod and React Hook Form.",
    ],
    stack: [
      { group: "App", items: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zod"] },
      { group: "Data and auth", items: ["MongoDB", "NextAuth"] },
      { group: "Services", items: ["Razorpay", "Resend", "Cloudinary"] },
    ],
    cardStack: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "Razorpay"],
    notes: [
      "The live site is a portfolio showcase, so please don't enter real payment details.",
    ],
    links: {
      repo: ext("https://github.com/navee43/food_del_website"),
      live: ext("https://food-del-website-sable.vercel.app/"),
      liveLabel: "Live demo",
    },
    preview: "food",
    previewAlt:
      "Illustration of the Gomino menu: burger cards with prices in rupees and an add-to-cart button, with a cart counter in the header.",
    featured: false,
  },
  {
    slug: "price-comparison-website",
    name: "Price Comparison Website",
    category: "E-commerce and API integration",
    tagline: "Search for a product and see Google Shopping offers from different sellers side by side.",
    summary:
      "A small Express server fetches Google Shopping results for India through SerpAPI. A plain HTML, CSS and JavaScript frontend lists each offer with its price, seller and rating, and links out to compare further.",
    problem:
      "The same product is often priced differently across stores, and checking each one by hand is slow. This project gathers the offers into a single results page.",
    features: [
      "Search by product name.",
      "Results with the product image, title, price, seller and rating.",
      "Links to each product page and to Google's own comparison page.",
      "An Express proxy that keeps the API key on the server, away from the browser.",
      "Landing, about and contact pages.",
    ],
    stack: [
      { group: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
      { group: "Backend", items: ["Node.js", "Express", "Axios"] },
      { group: "Data", items: ["SerpAPI (Google Shopping)"] },
    ],
    cardStack: ["JavaScript", "Node.js", "Express", "SerpAPI"],
    notes: [
      "There's no hosted demo. Running it locally needs a SerpAPI key.",
      "Prices are fetched live at search time, so the preview here shows the layout without real prices.",
    ],
    links: {
      repo: ext("https://github.com/navee43/Price_comparison_website"),
    },
    preview: "price",
    previewAlt:
      "Illustration of the price comparison results page: a search box and a list of offers, each with a seller, rating and price placeholder.",
    featured: false,
  },
  {
    slug: "chat-app",
    name: "Chat App",
    category: "Real-time applications",
    tagline: "A real-time chat app with one-to-one and group conversations.",
    summary:
      "A MERN chat app where people sign up with a profile picture, start one-to-one chats or create and join groups, and receive new messages instantly over Socket.IO.",
    problem:
      "A project to learn how real-time messaging works end to end: authentication, chat rooms, message storage and instant delivery to everyone in a conversation.",
    features: [
      "Sign-up with a profile picture (Multer and Cloudinary), and JWT login and logout with bcrypt-hashed passwords.",
      "One-to-one chats, and group chats you can create, join and leave.",
      "Instant message delivery with Socket.IO rooms.",
      "Message history stored in MongoDB.",
      "API state managed with Redux Toolkit Query.",
    ],
    stack: [
      { group: "Frontend", items: ["React", "Vite", "Tailwind CSS", "Redux Toolkit", "Socket.IO client", "Framer Motion"] },
      { group: "Backend", items: ["Node.js", "Express", "MongoDB", "Socket.IO", "JWT", "Cloudinary"] },
    ],
    cardStack: ["React", "Redux Toolkit", "Socket.IO", "Express", "MongoDB"],
    notes: [
      "The live app needs an account, so the link opens the sign-in page.",
      "It's hosted on Render, so the first load can take a moment if the app has been idle.",
    ],
    links: {
      repo: ext("https://github.com/navee43/chat_app"),
      live: ext("https://chat-app-frontend-food.onrender.com/login"),
      liveLabel: "Open live app",
      liveNote: "Sign-in required",
    },
    preview: "chat",
    previewAlt:
      "Illustration of the chat interface: a conversation list with a group chat, and message bubbles in an open conversation.",
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
