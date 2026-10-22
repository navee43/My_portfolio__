/**
 * Central profile configuration.
 * Source: Naveen's resume (Google Drive, updated October 2026) unless noted.
 */
export const profile = {
  name: "Naveen Yadav",
  initials: "NY",
  role: "Software Engineer",
  roleLine: "Software engineer working across full-stack development and AI engineering.",
  headline: "I build intelligent systems and digital experiences that solve real problems.",
  /** The same headline, split so the hero can mark up two phrases. */
  headlineParts: [
    { text: "I build " },
    { text: "intelligent systems", mark: "marker" },
    { text: " and digital experiences that solve " },
    { text: "real problems.", mark: "scribble" },
  ] as { text: string; mark?: "marker" | "scribble" }[],
  /** Verified technologies for the ticker under the hero. */
  ticker: [
    "LangGraph",
    "LangChain",
    "FastAPI",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "TypeScript",
    "Python",
    "MongoDB",
    "Socket.IO",
    "Docker",
    "AWS EC2",
    "Tailwind CSS",
    "Redux Toolkit",
    "GitHub Actions",
  ],
  intro:
    "I'm an Information Technology student at IIIT Una with hands-on experience building web applications, backend services and AI-powered tools. I enjoy turning ideas into practical software and exploring how intelligent systems can solve real-world problems.",

  email: "naveen343k@gmail.com",
  phone: "+91-7015057676",
  /** Digits only, used for the tel: link. */
  phoneHref: "tel:+917015057676",
  location: "Kanina, Haryana, India",
  shortLocation: "India",

  availability: {
    open: true,
    label: "Open to opportunities",
  },

  interests: [
    "Software engineering",
    "Full-stack development",
    "Backend engineering",
    "AI/ML",
    "LLM applications",
    "Autonomous AI agents",
  ],

  about: [
    "Hi, I'm Naveen Yadav, an Information Technology student at IIIT Una with hands-on experience in frontend and full-stack development.",
    "I've worked with modern web technologies, APIs, databases and LLM-based applications. I enjoy building practical software, solving engineering problems and exploring AI-powered workflows.",
    "Through my internships and personal projects, I've developed an interest in creating reliable applications that combine good user experiences with useful functionality.",
  ],

  /** Shown in the About section. Each item is backed by the resume. */
  highlights: [
    {
      term: "Studying",
      detail: "B.Tech in Information Technology at IIIT Una, 2023 to 2027",
    },
    {
      term: "Interned at",
      detail: "Infrawave Solutions as a full-stack developer, and CodeWithJay as a frontend developer",
    },
    {
      term: "Building",
      detail: "Web applications and AI tools, from real-time marketplaces to an autonomous coding agent",
    },
    {
      term: "Drawn to",
      detail: "AI agents, LLM applications and dependable backend systems",
    },
    {
      term: "Recognition",
      detail: "1st place with my team at the IIIT Una Progathon, an inter-college hackathon",
    },
  ],

  /**
   * Hero photo. Put the image in public/images/ and set `src`, for example
   * src: "/images/profile.jpg". Leave src as null to show the placeholder frame.
   */
  photo: {
    src: "/images/my_photo.jpeg",
    alt: "Portrait of Naveen Yadav",
  },

  resume: {
    /** The real PDF, served from /public. Replace the file to update it. */
    localPdf: "/resume/naveen-yadav-resume.pdf",
    downloadName: "Naveen-Yadav-Resume.pdf",
    /** A rendered image of page 1, regenerate it when the PDF changes (see README). */
    previewImage: "/images/resume-preview.webp",
    previewImageSize: { width: 935, height: 1210 },
    updated: "October 2026",
  },

  /**
   * Competitive programming figures from the resume. The brief asks for coding
   * stats only from a reliable source, so these stay hidden until Naveen
   * confirms them. Set `show` to true to display them in the profiles section.
   */
  competitiveProgramming: {
    show: false,
    leetcode: "Knight tier, 1900+ rating, 500+ problems solved",
    codeforces: "Specialist, 1600+ rating",
  },
} as const;
