import { ArrowUpRight, Download } from "lucide-react"
import { labProjects } from "@/data/lab"

export function ModelLab() {
  return (
    <section aria-label="Computer vision model checkpoints" className="mt-10 sm:mt-14">
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-grid pb-4 dark:border-white/[0.08]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            Research index
          </p>
          <h2 className="mt-2 font-serif text-2xl text-primary sm:text-3xl">
            Model checkpoints
          </h2>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          06 models
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {labProjects.map((project, index) => (
          <article
            key={project.id}
            className="group flex min-h-full flex-col rounded-2xl border border-grid bg-obsidian p-5 transition-[background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_28px_rgba(219,149,88,0.12)] dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-[rgba(91,130,255,0.5)] dark:hover:bg-white/[0.05] dark:hover:shadow-[0_0_28px_rgba(91,130,255,0.1)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted">
                CV / {String(index + 1).padStart(2, "0")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                Weights hosted on Hugging Face
              </span>
            </div>

            <h3 className="mt-6 font-serif text-2xl text-primary sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {project.task}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-grid py-4 dark:border-white/[0.08]">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  Dataset
                </dt>
                <dd className="mt-1.5 text-xs leading-5 text-primary">
                  {project.dataset}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  Evaluation metrics
                </dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded border border-grid px-1.5 py-1 font-mono text-[9px] text-primary dark:border-white/[0.1] dark:text-zinc-300"
                    >
                      {metric}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-auto pt-5">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-wide text-muted">
                Scores not published
              </p>
              <a
                href={project.weightsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-between gap-3 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-obsidian transition-colors hover:bg-accent hover:text-white"
              >
                <span className="inline-flex items-center gap-2">
                  <Download size={15} aria-hidden="true" />
                  Download Checkpoint
                </span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
