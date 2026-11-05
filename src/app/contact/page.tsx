import { ContactActions } from "@/components/ContactActions"

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 pb-20 pt-36 text-primary sm:px-10 lg:px-14">
      <section className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Contact
        </p>
        <div className="mt-4 grid gap-8 rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/45 p-6 backdrop-blur-md sm:mt-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-200/80">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Available for opportunities &amp; AI engineering roles
            </span>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">
              Let&apos;s make something useful.
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-muted">
              For opportunities, collaborations, or questions, send a note.
              I&apos;d be glad to hear what you&apos;re working on.
            </p>
            <ContactActions />
          </div>
          <p className="hidden max-w-40 font-serif text-2xl italic leading-snug text-neutral-500 sm:block">
            Good work starts with a conversation.
          </p>
        </div>
      </section>
    </main>
  )
}
