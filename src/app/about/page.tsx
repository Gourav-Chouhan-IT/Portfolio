import Image from "next/image"
import { PERSON, STACK } from "@/lib/constants"
import { Timeline } from "@/components/Timeline"

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pb-20 pt-36 text-primary sm:px-10 lg:px-14">
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

        <section className="mt-16 grid items-center gap-10 sm:mt-20 lg:grid-cols-[minmax(300px,0.92fr)_1.08fr] lg:gap-14">
          <figure className="relative mx-auto w-full max-w-lg lg:mx-0">
            <div
              aria-hidden="true"
              className="absolute inset-3 translate-x-3 translate-y-3 rounded-2xl border border-grid"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-grid bg-surface">
              <Image
                src="/about/gourav-portrait.png"
                alt={`Portrait of ${PERSON.name}`}
                fill
                sizes="(max-width: 1023px) 100vw, 36vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-5 py-5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                In the loop · Bhopal, India
              </figcaption>
            </div>
          </figure>

          <div className="py-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              The human in the loop
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-[1.08] text-primary sm:text-4xl xl:text-5xl">
              Behind every system on this page, the same person —{" "}
              <em className="text-accent">building it, shipping it,</em> and
              standing behind it in production.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              I&apos;m {PERSON.name}, a full-stack developer and machine
              learning researcher studying computer science at {PERSON.college}.
              I bring models from notebooks to robust live endpoints, then build
              the full-stack architecture that makes them useful in the real
              world. I care about the unglamorous details that keep products
              working long after the demo ends.
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-5 border-t border-grid pt-6 sm:grid-cols-3 sm:gap-4">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                  Role
                </dt>
                <dd className="mt-2 text-sm leading-5 text-primary">
                  Full-Stack Developer &amp; ML Researcher
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                  Now
                </dt>
                <dd className="mt-2 text-sm leading-5 text-primary">
                  DSA &amp; building CommHub
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                  Status
                </dt>
                <dd className="mt-2 text-sm leading-5 text-primary">
                  Open to opportunities / AI Engineering roles
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <Timeline />
      </article>
    </main>
  )
}
