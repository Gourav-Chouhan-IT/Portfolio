const milestones = [
  {
    period: "2024 — 2028",
    title: "B.Tech Computer Science",
    organization: "VIT Bhopal",
    detail: "Undergraduate studies focused on computer science and engineering.",
  },
  {
    period: "2025",
    title: "Health Dashboard",
    organization: "Hardware / real-time dashboard",
    detail:
      "Built a real-time biometric dashboard connecting Arduino sensor readings to a React interface.",
  },
  {
    period: "2025",
    title: "Focus Map",
    organization: "Browser-based computer vision",
    detail:
      "Created a browser-based eye-tracking heatmap visualizer using WebGazer.js.",
  },
  {
    period: "2026",
    title: "Computer Vision Research",
    organization: "Model benchmarking",
    detail:
      "Comparing YOLOv8s object detection with ViT and Swin image-classification workflows.",
  },
  {
    period: "2026",
    title: "Reelify",
    organization: "Creator tooling",
    detail:
      "Built an AI-assisted Instagram content workflow for reel analysis, playbooks, and PDF reports.",
  },
  {
    period: "2026 — In progress",
    title: "DSA & CommHub",
    organization: "Current focus",
    detail:
      "Studying data structures and algorithms while building a multi-channel messaging workspace for WhatsApp, Gmail, and SMS.",
  },
]

export function Timeline() {
  return (
    <section aria-labelledby="journey-heading" className="mt-16 sm:mt-20">
      <div className="border-b border-white/[0.08] pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          Experience / 01
        </p>
        <h2
          id="journey-heading"
          className="mt-2 font-serif text-4xl text-primary sm:text-5xl"
        >
          The journey so far.
        </h2>
      </div>
      <ol className="mt-7 space-y-0">
        {milestones.map((milestone) => (
          <li
            key={milestone.title}
            className="relative grid gap-2 border-l border-white/[0.1] py-5 pl-6 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:pl-8"
          >
            <span className="absolute -left-[4px] top-7 size-2 rounded-full bg-accent ring-4 ring-[#080808]" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
              {milestone.period}
            </p>
            <div>
              <h3 className="font-serif text-2xl text-primary">
                {milestone.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-accent">
                {milestone.organization}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                {milestone.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
