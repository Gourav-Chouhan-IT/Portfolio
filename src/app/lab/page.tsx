import { PROJECTS } from "@/lib/constants"

export default function LabPage() {
  const researchProjects = PROJECTS.filter(
    (project) => project.status === "Research",
  )

  return (
    <main className="min-h-screen bg-obsidian px-6 pb-20 pt-36 text-primary sm:px-10 lg:px-14">
      <section className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Lab
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-7xl">
          Experiments &amp; research
        </h1>
        <p className="mt-6 max-w-2xl leading-7 text-muted">
          A space for technical explorations, prototypes, and research in
          progress.
        </p>
        <div className="mt-10 grid gap-4">
          {researchProjects.length > 0 ? (
            researchProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-xl border border-grid bg-surface p-6"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {project.year} · Research
                </p>
                <h2 className="mt-3 font-serif text-3xl">{project.name}</h2>
                <p className="mt-3 leading-7 text-muted">
                  {project.descriptor}
                </p>
                <p className="mt-4 font-mono text-xs leading-6 text-muted">
                  {project.stack.join(" · ")}
                </p>
              </article>
            ))
          ) : (
            <p className="rounded-xl border border-grid bg-surface p-6 text-muted">
              New experiments will be added here soon.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
