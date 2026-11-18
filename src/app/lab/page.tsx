import { ModelLab } from "@/components/sections/ModelLab"

export default function LabPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-36 text-primary sm:px-10 lg:px-14">
      <section className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          The Lab / Model Hub
        </p>
        <div className="mt-4 grid gap-5 sm:mt-6 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
          <h1 className="font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
            Vision research,<br /> in focus.
          </h1>
          <p className="max-w-lg leading-7 text-muted sm:justify-self-end">
            A curated collection of computer vision architectures, benchmark
            metadata, and downloadable checkpoints hosted on Hugging Face.
          </p>
        </div>
        <ModelLab />
      </section>
    </main>
  )
}
