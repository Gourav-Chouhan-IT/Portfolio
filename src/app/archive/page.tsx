import Link from "next/link"
import { PROJECTS } from "@/lib/constants"

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-obsidian px-6 pb-20 pt-36 text-primary sm:px-10 lg:px-14">
      <section className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Archive
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-7xl">
          Project archive
        </h1>
        <ul className="mt-10 divide-y divide-grid border-y border-grid">
          {PROJECTS.map((project) => (
            <li
              key={project.slug}
              className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-xs text-muted">
                  {project.year} · {project.status}
                </p>
                <h2 className="mt-2 font-serif text-2xl">{project.name}</h2>
                <p className="mt-1 text-sm leading-6 text-muted">
                  {project.descriptor}
                </p>
              </div>
              <Link
                href={project.caseStudy}
                className="shrink-0 text-sm font-medium text-accent hover:underline"
              >
                View project
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
