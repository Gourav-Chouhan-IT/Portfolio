import { PERSON, STACK } from "@/lib/constants"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-obsidian px-6 pb-20 pt-36 text-primary sm:px-10 lg:px-14">
      <article className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          About
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-7xl">
          {PERSON.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          I&apos;m a {PERSON.role.toLowerCase()} studying {PERSON.degree} at{" "}
          {PERSON.college}. I enjoy building practical software and exploring
          how machine learning can solve real problems.
        </p>
        <section className="mt-12 border-t border-grid pt-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Technologies
          </h2>
          <p className="mt-4 leading-7 text-primary">{STACK.join(" · ")}</p>
        </section>
      </article>
    </main>
  )
}
