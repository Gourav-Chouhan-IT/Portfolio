import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ARCHIVE_PROJECTS } from "@/lib/constants"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

type CaseStudy = {
  introduction: string
  architecture: string[]
  challenges: string[]
  tradeoffs: string[]
}

const caseStudies: Record<string, CaseStudy> = {
  reelify: {
    introduction:
      "A creator workflow that turns an Instagram reel into a tailored content playbook and a shareable PDF report.",
    architecture: [
      "React and Vite provide the interactive creator workspace.",
      "A FastAPI service coordinates reel processing and Gemini 2.5 Flash content generation.",
      "yt-dlp extracts source media and ReportLab assembles the generated playbook into a PDF.",
    ],
    challenges: [
      "Orchestrating media extraction, analysis, and report creation as a single understandable workflow.",
      "Keeping generated recommendations grounded in the source reel instead of returning generic copy.",
    ],
    tradeoffs: [
      "Separating the Python processing service from the React client keeps media and document tooling in their strongest ecosystem.",
      "The report is generated as a downloadable artifact, favoring a portable result over a persistent publishing platform.",
    ],
  },
  commhub: {
    introduction:
      "A real-client messaging workspace for Aanya Music Studio, bringing WhatsApp, Gmail, and SMS conversations into one dashboard.",
    architecture: [
      "A React dashboard organizes inboxes and conversations by client workspace.",
      "A Node.js service isolates tenant data and coordinates channel integrations.",
      "PostgreSQL and Prisma persist tenant-scoped application data.",
      "Redis and Bull queues process outbound and retryable channel jobs asynchronously.",
    ],
    challenges: [
      "Maintaining strict tenant boundaries across shared inboxes, users, and message records.",
      "Handling provider delays and transient delivery failures without losing messages.",
      "Making multiple communication channels feel consistent while retaining their channel-specific behavior.",
    ],
    tradeoffs: [
      "Asynchronous Redis/Bull jobs add operational components, but keep provider latency away from interactive dashboard requests and enable controlled retries.",
      "The multi-tenant model supports one product for multiple client workspaces, at the cost of requiring explicit tenant scoping throughout data access.",
    ],
  },
  "ai-research-tool": {
    introduction:
      "An experimental computer-vision workspace spanning plant disease classification and comparative object-detection research.",
    architecture: [
      "FastAPI exposes the model and evaluation workflows to a lightweight web interface.",
      "YOLOv8s is evaluated on PASCAL VOC 2012 with precision, recall, and mAP-oriented reporting.",
      "ViT and Swin classification workflows pair predictions with explainability visualizations for inspection.",
    ],
    challenges: [
      "Comparing models with different task and output conventions requires consistent preprocessing and evaluation boundaries.",
      "Model outputs need to be interpretable alongside their prediction, especially when comparing transformer architectures.",
    ],
    tradeoffs: [
      "Keeping inference behind FastAPI makes model iteration independent from the UI, while introducing service deployment and request-latency concerns.",
      "Benchmark values are intentionally not hard-coded here; only verified evaluation results should be presented as measured metrics.",
    ],
  },
  "focus-map": {
    introduction:
      "A browser-based eye-tracking heatmap visualizer built around WebGazer.js, designed to turn gaze samples into a spatial view of attention.",
    architecture: [
      "HTML, CSS, and JavaScript provide a lightweight browser-first interface.",
      "WebGazer.js captures gaze estimates in the client session.",
      "Canvas renders the spatial visualization without requiring a server-side rendering pipeline.",
    ],
    challenges: [
      "Presenting continuously changing gaze estimates in a way that remains legible as attention shifts.",
      "Working within the limits of browser-based calibration and device-dependent tracking quality.",
    ],
    tradeoffs: [
      "Client-side processing keeps interaction responsive and avoids sending gaze data to a backend, but results depend on browser support, lighting, and calibration.",
      "Canvas rendering keeps the visualization flexible without introducing a heavier charting dependency.",
    ],
  },
  "health-dashboard": {
    introduction:
      "A sensor-to-dashboard prototype that streams Arduino biometric readings into a React interface.",
    architecture: [
      "Arduino sensors provide the biometric readings.",
      "A Node.js service relays updates over Socket.IO.",
      "A React dashboard presents incoming measurements in real time.",
    ],
    challenges: [
      "Keeping the browser view responsive as sensor readings arrive continuously.",
      "Separating connection state from the visualized measurements so interruptions are apparent.",
    ],
    tradeoffs: [
      "Socket.IO provides a straightforward real-time channel, while requiring an active connection for live updates.",
      "The prototype favors immediate streaming over long-term historical storage.",
    ],
  },
}

export function generateStaticParams() {
  return ARCHIVE_PROJECTS.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = ARCHIVE_PROJECTS.find(
    (item) => item.slug === slug.toLowerCase(),
  )

  if (!project) notFound()

  const study = caseStudies[project.slug]
  if (!study) notFound()

  return (
    <main className="min-h-screen px-6 pb-24 pt-36 text-primary sm:px-10 lg:px-14">
      <article className="mx-auto max-w-6xl">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} />
          Back to work
        </Link>

        <header className="mt-12 border-b border-grid pb-10 sm:mt-16 sm:pb-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {project.id} / {project.year} / {project.status}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
            {project.descriptor}
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            {study.introduction}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-obsidian transition-colors hover:bg-accent hover:text-primary"
              >
                Visit live project <ArrowUpRight size={15} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-grid bg-obsidian px-4 py-2.5 text-sm text-primary transition-colors hover:border-accent/50 hover:text-accent dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-200 dark:hover:text-white"
              >
                View source <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </header>

        <section className="grid gap-6 border-b border-grid py-10 sm:grid-cols-[minmax(10rem,0.65fr)_1.35fr] sm:gap-10 sm:py-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              01 / System design
            </p>
            <h2 className="mt-3 font-serif text-3xl">Architecture</h2>
          </div>
          <ol className="grid gap-3">
            {study.architecture.map((item, index) => (
              <li
                key={item}
                className="flex gap-4 rounded-xl border border-grid bg-obsidian p-4 backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-5"
              >
                <span className="font-mono text-xs text-muted">
                  0{index + 1}
                </span>
                <p className="text-sm leading-6 text-muted">{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-6 border-b border-grid py-10 sm:grid-cols-[minmax(10rem,0.65fr)_1.35fr] sm:gap-10 sm:py-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              02 / Problem solving
            </p>
            <h2 className="mt-3 font-serif text-3xl">Engineering challenges</h2>
          </div>
          <ul className="space-y-4">
            {study.challenges.map((item) => (
              <li
                key={item}
                className="border-l border-accent/50 pl-4 text-sm leading-7 text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 border-b border-grid py-10 sm:grid-cols-[minmax(10rem,0.65fr)_1.35fr] sm:gap-10 sm:py-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              03 / Decisions
            </p>
            <h2 className="mt-3 font-serif text-3xl">Trade-offs</h2>
          </div>
          <ul className="space-y-4">
            {study.tradeoffs.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-grid bg-obsidian p-4 text-sm leading-7 text-muted backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.03] sm:p-5"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-5 pt-10 sm:grid-cols-[minmax(10rem,0.65fr)_1.35fr] sm:gap-10 sm:pt-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Toolkit
            </p>
            <h2 className="mt-3 font-serif text-3xl">Technology</h2>
          </div>
          <ul className="flex flex-wrap content-start gap-2">
            {project.stack.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-grid bg-lifted px-3 py-1.5 font-mono text-xs text-primary dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  )
}
