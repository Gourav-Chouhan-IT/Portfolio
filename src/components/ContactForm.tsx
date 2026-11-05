"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, LoaderCircle } from "lucide-react"

const fieldClassName =
  "mt-2 w-full rounded-xl border border-grid bg-obsidian/80 px-4 py-3 text-sm text-primary outline-none transition-colors placeholder:text-muted/70 focus:border-accent dark:border-white/10 dark:bg-black/20 dark:focus:border-accent"

type SubmissionStatus = "idle" | "sending" | "success" | "error"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwllyywy"

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return

    const form = event.currentTarget
    setStatus("sending")

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        setStatus("error")
        return
      }

      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="rounded-2xl border border-grid bg-surface/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-7 dark:border-white/[0.1] dark:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Contact form
          </p>
          <h2
            id="contact-form-heading"
            className="mt-2 font-serif text-3xl text-primary sm:text-4xl"
          >
            Send a note
          </h2>
        </div>
        <span className="shrink-0 rounded-full border border-grid bg-lifted px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-muted dark:border-white/10 dark:bg-white/[0.04]">
          Replies in ~12h
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div>
          <label
            htmlFor="contact-name"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
          >
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldClassName}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
          >
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClassName}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className={`${fieldClassName} resize-y`}
            placeholder="A line about the role, problem, or system you have in mind..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-obsidian transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              Sending...
              <LoaderCircle
                size={16}
                aria-hidden="true"
                className="animate-spin"
              />
            </>
          ) : (
            <>
              Send message <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
        <p
          aria-live="polite"
          role={status === "error" ? "alert" : "status"}
          className={`text-xs leading-5 ${
            status === "success"
              ? "text-emerald-800 dark:text-emerald-300"
              : status === "error"
                ? "text-red-800 dark:text-red-300"
                : "text-muted"
          }`}
        >
          {status === "success"
            ? "Thanks! Your note has been delivered directly to my inbox."
            : status === "error"
              ? "Sorry, your message could not be sent. Please try again or email me directly."
              : "Delivered directly to my inbox — no auto-reply."}
        </p>
      </form>
    </section>
  )
}
