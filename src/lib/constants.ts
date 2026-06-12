// src/lib/constants.ts

export const PERSON = {
  name: "Gourav Chouhan",
  role: "Full-Stack Developer & ML Researcher",
  email: "gourav.chouhan.it@gmail.com",
  github: "https://github.com/Gourav-Chouhan-IT",
  linkedin: "https://linkedin.com/in/", // add your linkedin
  college: "VIT Bhopal",
  degree: "B.Tech Computer Science",
  cgpa: "8.22",
  year: "2nd Year · 2024–2028",
  resumeUrl: "/resume.pdf",
  currentlyBuilding: {
    name: "Portfolio Website",
    description: "The one you're looking at right now",
    github: "https://github.com/Gourav-Chouhan-IT/gourav-portfolio",
  },
} as const

export const PROJECTS = [
  {
    id: "01",
    slug: "reelify",
    name: "Reelify",
    descriptor: "AI-powered caption and hook generator for Instagram creators",
    stack: ["Next.js", "FastAPI", "Gemini 2.5 Flash", "Python"],
    status: "Live",
    caseStudy: "/projects/reelify",
    live: "https://", // add live url
    github: "https://",
    year: "2025",
  },
  {
    id: "02",
    slug: "cv-research",
    name: "Computer Vision Research",
    descriptor: "YOLOv8s vs Vision Transformer on PASCAL VOC 2012",
    stack: ["Python", "YOLOv8", "PyTorch", "PASCAL VOC"],
    status: "Research",
    caseStudy: "/projects/cv-research",
    live: null,
    github: "https://",
    year: "2025",
  },
  {
    id: "03",
    slug: "health-dashboard",
    name: "Health Dashboard",
    descriptor: "Real-time biometric monitoring from Arduino to React",
    stack: ["React", "Socket.IO", "Arduino", "Node.js"],
    status: "Live",
    caseStudy: "/projects/health-dashboard",
    live: "https://",
    github: "https://",
    year: "2024",
  },
  {
    id: "04",
    slug: "smart-leads",
    name: "Smart Leads Dashboard",
    descriptor: "MERN + TypeScript CRM with JWT auth and RBAC",
    stack: ["MongoDB", "Express", "React", "TypeScript", "Docker"],
    status: "Live",
    caseStudy: "/projects/smart-leads",
    live: "https://",
    github: "https://",
    year: "2024",
  },
] as const

export const STACK = [
  "Next.js", "TypeScript", "React", "Node.js",
  "Python", "FastAPI", "MongoDB", "PostgreSQL",
  "Docker", "Arduino", "TensorFlow.js", "Tailwind CSS",
] as const

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Lab", href: "/lab" },
  { label: "Archive", href: "/archive" },
  { label: "Resume", href: "/resume.pdf", external: true },
] as const