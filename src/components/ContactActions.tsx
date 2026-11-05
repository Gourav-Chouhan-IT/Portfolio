"use client"

import { useState } from "react"
import {
  BriefcaseBusiness,
  Check,
  Code2,
  Copy,
  Mail,
} from "lucide-react"
import { PERSON } from "@/lib/constants"

export function ContactActions() {
  const [copyStatus, setCopyStatus] = useState("")

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PERSON.email)
      setCopyStatus("Email copied.")
    } catch {
      setCopyStatus("Copy unavailable. Select the email address above.")
    }
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${PERSON.email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-grid bg-obsidian px-4 py-3 text-sm text-primary transition-colors hover:border-accent/50 hover:text-accent dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100"
        >
          <Mail size={17} />
          {PERSON.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-2 rounded-xl border border-grid px-4 py-3 text-sm text-primary transition-colors hover:border-accent/50 hover:text-accent dark:border-white/10 dark:text-zinc-300 dark:hover:text-white"
        >
          {copyStatus === "Email copied." ? (
            <Check size={16} />
          ) : (
            <Copy size={16} />
          )}
          Copy email
        </button>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 font-mono text-xs text-accent">
        {copyStatus}
      </p>

      <nav aria-label="Social links" className="mt-8 flex flex-wrap gap-3">
        <a
          href={PERSON.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-grid bg-obsidian px-4 py-2.5 text-sm text-primary transition-colors hover:border-accent/50 hover:text-accent dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:text-white"
        >
          <Code2 size={16} />
          GitHub
        </a>
        <a
          href={PERSON.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-grid bg-obsidian px-4 py-2.5 text-sm text-primary transition-colors hover:border-accent/50 hover:text-accent dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:text-white"
        >
          <BriefcaseBusiness size={16} />
          LinkedIn
        </a>
      </nav>
    </>
  )
}
