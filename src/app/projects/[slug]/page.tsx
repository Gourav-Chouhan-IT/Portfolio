import Link from "next/link"
import { notFound } from "next/navigation"
import { PROJECTS } from "@/lib/constants"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = PROJECTS.find(
    (item) => item.slug.toLowerCase() === slug.toLowerCase(),
  )

  if (project === undefined) {
    notFound()
  }
  return (
    <main className="min-h-screen bg-obsidian px-6 pb-20 pt-36 text-primary sm:px-10 lg:px-14">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
        >
          ← Back to work
        </Link>

        <header className="mt-12 border-b border-grid pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {project.year} · {project.status}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-7xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            {project.descriptor}
          </p>
        </header>

        <section className="grid gap-8 py-10 sm:grid-cols-[1fr_2fr]">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Technology
          </h2>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-grid bg-surface px-3 py-1.5 text-sm text-primary"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8 border-t border-grid py-10 sm:grid-cols-[1fr_2fr]">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Case study
          </h2>
          <p className="leading-7 text-muted">{project.descriptor}</p>
        </section>

        <div className="flex flex-wrap gap-5 border-t border-grid pt-8">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline"
            >
              Visit live project
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline"
            >
              View source
            </a>
          )}
        </div>
      </article>
    </main>
  )
}