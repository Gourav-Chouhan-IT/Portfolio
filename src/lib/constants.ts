export const PERSON = {
  name: "Gourav Chouhan",
  role: "Full-Stack Developer & ML Researcher",
  email: "gourav.chouhan.it@gmail.com",
  github: "https://github.com/Gourav-Chouhan-IT",
  linkedin: "https://www.linkedin.com/in/gourav-chouhan-071036374/",
  college: "VIT Bhopal",
  degree: "B.Tech Computer Science",
  cgpa: "8.22",
  year: "3rd Year · 2024–2028",
  resumeUrl: "/resume.pdf",
  currentlyBuilding: {
    name: "Portfolio Website",
    description: "The one you're looking at right now",
    github: "https://github.com/Gourav-Chouhan-IT/Portfolio",
  },
} as const

export const PROJECTS = [
  {
    id: "01",
    slug: "reelify",
    name: "Reelify",
    descriptor:
      "AI-powered content strategy tool for Instagram micro-creators that analyzes reels and generates personalized playbooks and PDF reports",
    stack: [
      "React",
      "Vite",
      "Python",
      "FastAPI",
      "Gemini 2.5 Flash",
      "yt-dlp",
      "ReportLab",
    ],
    status: "Live",
    caseStudy: "/projects/reelify",
    live: "https://reelify-six.vercel.app",
    github: "https://github.com/Gourav-Chouhan-IT",
    year: "2025",
  },
  {
    id: "02",
    slug: "commhub",
    name: "CommHub",
    descriptor:
      "Multi-channel messaging platform for a real client: WhatsApp, Gmail and SMS in one dashboard",
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    status: "In Progress",
    caseStudy: "/projects/commhub",
    live: null,
    github: "https://github.com/Gourav-Chouhan-IT/Portfolio",
    year: "2026",
  },
  {
    id: "03",
    slug: "ai-research-tool",
    name: "AI Research Tool",
    descriptor:
      "Comparative analysis of YOLOv8s and Vision Transformers on PASCAL VOC 2012 and plant disease classification",
    stack: ["Python", "FastAPI", "PyTorch", "YOLOv8", "ViT-Base", "Render"],
    status: "Research",
    caseStudy: "/projects/ai-research-tool",
    live: null,
    github: "https://github.com/Gourav-Chouhan-IT",
    year: "2026",
  },
  {
    id: "04",
    slug: "focus-map",
    name: "Focus Map",
    descriptor:
      "Real-time eye-tracking heatmap visualizer running entirely in the browser via WebGazer.js",
    stack: ["HTML", "CSS", "JavaScript", "WebGazer.js"],
    status: "Live",
    caseStudy: "/projects/focus-map",
    live: null,
    github: "https://github.com/Gourav-Chouhan-IT/Focus-Map",
    year: "2024",
  },
] as const

export const STACK = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "PyTorch",
  "Docker",
  "Tailwind CSS",
] as const

export const NAV_LINKS = [
  { label: "About", href: "/about", external: false },
  { label: "Work", href: "/#work", external: false },
  { label: "Lab", href: "/lab", external: false },
  { label: "Archive", href: "/archive", external: false },
  { label: "Contact", href: "/contact", external: false },
] as const
