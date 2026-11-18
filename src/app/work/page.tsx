import type { Metadata } from "next"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"

export const metadata: Metadata = {
  title: "Work",
}

export default function WorkPage() {
  return (
    <main className="min-h-screen pb-12 pt-36 text-primary">
      <section className="px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Work / Selected projects
          </p>
          <div className="mt-4 grid gap-5 sm:mt-6 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
            <h1 className="font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Projects with purpose.
            </h1>
            <p className="max-w-lg leading-7 text-muted sm:justify-self-end">
              A selection of products, experiments, and systems I’ve been
              building.
            </p>
          </div>
        </div>
      </section>
      <FeaturedProjects showHeader={false} />
    </main>
  )
}
