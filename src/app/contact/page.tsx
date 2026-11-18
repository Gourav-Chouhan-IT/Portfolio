import type { Metadata } from "next"
import { ArrowUpRight, Mail } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { PERSON } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contact",
}

export default function ContactPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden px-6 pb-24 pt-36 text-primary sm:px-10 lg:px-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_22%,rgba(219,149,88,0.1),transparent_38%),radial-gradient(ellipse_at_82%_72%,rgba(91,130,255,0.07),transparent_40%)] dark:opacity-100"
      />
      <section className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_minmax(24rem,0.88fr)] lg:gap-20">
        <div className="py-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Contact / 01
          </p>
          <h1 className="mt-5 max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
            Great software starts with a{" "}
            <em className="text-accent">strong foundation.</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Looking to hire for an AI/ML or Full-Stack role, discuss a research
            idea, or build a production system from scratch? Drop a message
            below ,it goes directly to my inbox with no middleman.
          </p>

          <div className="mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Or reach me directly
            </p>
            <nav aria-label="Direct contact links" className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${PERSON.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-grid bg-surface/70 px-4 py-2.5 text-sm text-primary transition-colors hover:border-accent hover:text-accent dark:border-white/10 dark:bg-white/[0.04]"
              >
                <Mail size={15} aria-hidden="true" />
                Email
              </a>
              <a
                href={PERSON.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-grid bg-surface/70 px-4 py-2.5 text-sm text-primary transition-colors hover:border-accent hover:text-accent dark:border-white/10 dark:bg-white/[0.04]"
              >
                LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={PERSON.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-grid bg-surface/70 px-4 py-2.5 text-sm text-primary transition-colors hover:border-accent hover:text-accent dark:border-white/10 dark:bg-white/[0.04]"
              >
                GitHub <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href={PERSON.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-grid bg-surface/70 px-4 py-2.5 text-sm text-primary transition-colors hover:border-accent hover:text-accent dark:border-white/10 dark:bg-white/[0.04]"
              >
                Resume <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </nav>
          </div>

          <a
            href={`mailto:${PERSON.email}`}
            className="mt-10 inline-block font-mono text-xs tracking-wide text-muted transition-colors hover:text-accent sm:mt-14"
          >
            {PERSON.email}
          </a>
        </div>

        <div id="contact" className="scroll-mt-28">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
