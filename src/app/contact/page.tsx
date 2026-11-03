import { Mail } from "lucide-react"
import { PERSON } from "@/lib/constants"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-obsidian px-6 pb-20 pt-36 text-primary sm:px-10 lg:px-14">
      <section className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Contact
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-7xl">
          Let&apos;s talk.
        </h1>
        <p className="mt-6 max-w-2xl leading-7 text-muted">
          For opportunities, collaborations, or questions, send me an email.
        </p>
        <a
          href={`mailto:${PERSON.email}`}
          className="mt-8 inline-flex items-center gap-3 rounded-lg border border-grid bg-surface px-5 py-4 text-primary transition-colors hover:border-accent hover:text-accent"
        >
          <Mail size={18} />
          {PERSON.email}
        </a>
      </section>
    </main>
  )
}
