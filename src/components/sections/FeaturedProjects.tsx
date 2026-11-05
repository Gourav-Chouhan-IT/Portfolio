"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { PROJECTS } from "@/lib/constants"

const projectPreviews: Record<string, { heading: string; detail: string }> = {
  reelify: {
    heading: "Creator workflow",
    detail: "Analyze a reel → build a personalized playbook → export a PDF.",
  },
  commhub: {
    heading: "Unified inbox",
    detail: "WhatsApp · Gmail · SMS, organized in one workspace.",
  },
  "ai-research-tool": {
    heading: "Benchmark workspace",
    detail: "YOLOv8s evaluation with ViT / Swin explainability pipelines.",
  },
  "focus-map": {
    heading: "Browser visualization",
    detail: "WebGazer.js samples rendered as a spatial Canvas heatmap.",
  },
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const preview = projectPreviews[project.slug]

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group grid gap-5 rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/40 p-5 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 hover:border-[rgba(91,130,255,0.5)] hover:bg-[#121216]/60 hover:shadow-[0_0_28px_rgba(91,130,255,0.1)] sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-7 sm:p-7 lg:gap-10 lg:p-8"
    >
      <span
        aria-hidden="true"
        className="font-serif text-5xl leading-none text-neutral-600/60 md:text-6xl"
      >
        {project.id}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-serif text-2xl text-[#f0eee6] transition-colors duration-300 group-hover:text-[#5b82ff] md:text-3xl">
            {project.name}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
            {project.year}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-neutral-500">
            <span
              className={`size-1.5 rounded-full ${
                project.status === "Live"
                  ? "animate-pulse bg-emerald-400"
                  : "bg-accent"
              }`}
            />
            {project.status}
          </span>
        </div>
        <p className="mt-2 max-w-3xl font-mono text-xs leading-6 text-neutral-400 sm:text-sm">
          {project.descriptor}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-neutral-300"
            >
              {technology}
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-expanded={previewOpen}
          onClick={() => setPreviewOpen((open) => !open)}
          className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-neutral-400 transition-colors hover:text-sky-300"
        >
          {previewOpen ? "Close quick view" : "Open quick view"}
          <ArrowDown
            size={12}
            className={`transition-transform duration-200 ${
              previewOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {previewOpen && preview && (
          <div
            role="status"
            className="mt-3 rounded-lg border border-white/[0.08] bg-black/20 p-3"
          >
            <p className="font-mono text-[9px] uppercase tracking-wider text-accent">
              {preview.heading}
            </p>
            <p className="mt-1 text-xs leading-5 text-neutral-300">
              {preview.detail}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.07] pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
        <Link
          href={project.caseStudy}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-200 transition-colors hover:text-accent"
        >
          Case study
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-neutral-400 transition-colors hover:text-neutral-100"
          >
            Live <ArrowUpRight size={13} />
          </a>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
            {project.status}
          </span>
        )}
      </div>
    </motion.article>
  )
}

export function FeaturedProjects() {
  return (
    <section
      id="work"
      className="px-6 py-20 sm:px-10 sm:py-28 lg:px-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Selected work
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-primary sm:text-5xl">
              Projects with purpose.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted sm:text-right">
            A selection of products, experiments, and systems I’ve been
            building.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
