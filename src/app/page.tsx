import Link from "next/link"
import { PERSON, STACK } from "@/lib/constants"
import { FlowFieldBackground } from "@/components/ui/FlowFieldBackground"

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian text-primary">
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <FlowFieldBackground />
        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl content-center gap-10 px-6 pb-12 pt-32 sm:gap-12 sm:px-10 sm:pb-16 lg:grid-cols-[minmax(0,1.8fr)_minmax(18rem,0.8fr)] lg:gap-16 lg:px-14">
          <div className="hero-copy-glow relative isolate flex min-w-0 flex-col justify-center py-4 sm:py-8 lg:py-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {PERSON.role}
            </p>

            <h1 className="mt-5 break-words font-serif text-4xl leading-[0.98] tracking-[-0.04em] sm:mt-6 sm:text-6xl lg:text-7xl">
              {PERSON.name}
            </h1>

            <h2 className="mt-5 max-w-2xl font-serif text-xl leading-snug text-muted sm:mt-6 sm:text-3xl lg:text-4xl">
              I build useful software that{" "}
              <span className="italic text-accent">solves real problems.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
              I work across full-stack development and machine learning, turning
              ideas into practical applications.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8">
              <Link
                href="/#work"
                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-accent hover:text-primary"
              >
                See my work
              </Link>
              <a
                href={`mailto:${PERSON.email}`}
                className="text-sm font-medium text-accent hover:underline"
              >
                Get in touch
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted sm:mt-9">
              <a href={PERSON.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a
                href={PERSON.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href={`mailto:${PERSON.email}`}>Email</a>
              <a href={PERSON.resumeUrl}>Résumé</a>
            </div>
          </div>

          <aside className="flex min-w-0 flex-col justify-center gap-6 rounded-xl border border-grid bg-surface/95 p-5 shadow-lg shadow-obsidian/40 sm:gap-7 sm:p-7 lg:p-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Currently building
              </p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {PERSON.currentlyBuilding.name} —{" "}
                {PERSON.currentlyBuilding.description}.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Studying
              </p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {PERSON.degree}, {PERSON.college}
                <br />
                {PERSON.year} · CGPA {PERSON.cgpa}
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Technologies
              </p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {STACK.join(" · ")}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}