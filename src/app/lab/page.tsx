"use client"

import { useState } from "react"
import { ModelLab } from "@/components/sections/ModelLab"

export default function LabPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <main className="min-h-screen px-6 pb-24 pt-36 text-primary sm:px-10 lg:px-14">
      <section className="mx-auto max-w-7xl">
        <p
          aria-live="polite"
          className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          The Lab / 0{activeTab + 1}
        </p>
        <div className="mt-4 grid gap-5 sm:mt-6 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
          <h1 className="font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
            Experiments in vision.
          </h1>
          <p className="max-w-lg leading-7 text-muted sm:justify-self-end">
            Model benchmarks and computer-vision prototypes. Choose an
            experiment, inspect the sample inputs, and explore the inference
            interface.
          </p>
        </div>
        <ModelLab activeTab={activeTab} onTabChange={setActiveTab} />
      </section>
    </main>
  )
}
