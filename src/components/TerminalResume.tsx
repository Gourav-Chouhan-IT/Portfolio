"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowUpRight, Terminal as TerminalIcon } from "lucide-react"
import { PERSON, PROJECTS, STACK } from "@/lib/constants"

type OutputLine = {
  text: string
  href?: string
  prefix?: string
  suffix?: string
  tone?: "accent" | "success" | "muted"
}

type CommandEntry = {
  command: string
  output: OutputLine[]
}

const commands = [
  "projects",
  "research",
  "skills",
  "resume",
  "github",
  "linkedin",
  "contact",
]

const bootSequence: OutputLine[][] = [
  [{ text: "gourav-shell v2.0 — warm boot", tone: "accent" }],
  [
    { text: "mounting src/lib/constants.ts ... " },
    { text: "ok", tone: "success" },
  ],
  [{ text: "ready. pick a command below ↓", tone: "muted" }],
]

function runCommand(rawCommand: string): CommandEntry | null {
  const command = rawCommand.trim().toLowerCase()
  if (!command) return null

  if (command === "clear") return { command, output: [] }

  switch (command) {
    case "help":
      return {
        command,
        output: [
          {
            text: "commands: projects, research, skills, resume, github, linkedin, contact, clear, help",
            tone: "muted",
          },
        ],
      }
    case "projects":
      return {
        command,
        output: PROJECTS.map((project) => ({
          text: `${project.id}  ${project.name} — ${project.status} (${project.year})`,
          href: project.caseStudy,
        })),
      }
    case "research": {
      const research = PROJECTS.find(
        (project) => project.slug === "ai-research-tool",
      )
      return {
        command,
        output: research
          ? [
              { text: research.name, tone: "accent" },
              { text: research.descriptor },
              { text: `stack: ${research.stack.join(" · ")}` },
              { text: `status: ${research.status} · ${research.year}` },
              { text: "case study ↗", href: research.caseStudy },
            ]
          : [{ text: "No research project found.", tone: "muted" }],
      }
    }
    case "skills":
      return {
        command,
        output: [{ text: STACK.join("  ·  "), tone: "accent" }],
      }
    case "resume":
      return {
        command,
        output: [
          {
            text: PERSON.resumeUrl,
            href: PERSON.resumeUrl,
            tone: "accent",
          },
        ],
      }
    case "github":
      return {
        command,
        output: [{ text: PERSON.github, href: PERSON.github, tone: "accent" }],
      }
    case "linkedin":
      return {
        command,
        output: [
          {
            text: PERSON.linkedin,
            href: PERSON.linkedin,
            tone: "accent",
          },
        ],
      }
    case "contact":
      return {
        command,
        output: [
          {
            text: PERSON.email,
            href: `mailto:${PERSON.email}`,
            tone: "accent",
          },
        ],
      }
    default:
      return {
        command,
        output: [
          {
            text: `command not found: ${command}. Type "help" to see available commands.`,
            tone: "muted",
          },
        ],
      }
  }
}

function lineTone(tone: OutputLine["tone"]) {
  if (tone === "accent") return "text-accent"
  if (tone === "success") return "text-emerald-400"
  if (tone === "muted") return "text-neutral-500"
  return "text-neutral-300"
}

export function TerminalResume() {
  const [bootLines, setBootLines] = useState<OutputLine[][]>([])
  const [history, setHistory] = useState<CommandEntry[]>([])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers = bootSequence.map((_, index) =>
      window.setTimeout(
        () => setBootLines((current) => [...current, bootSequence[index]!]),
        280 + index * 360,
      ),
    )
    return () => timers.forEach(window.clearTimeout)
  }, [])

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [bootLines, history])

  function execute(rawCommand: string) {
    const result = runCommand(rawCommand)
    if (!result) return

    if (result.command === "clear") {
      setHistory([])
      setInput("")
      return
    }

    setHistory((current) => [...current, result])
    setInput("")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    execute(input)
  }

  return (
    <section
      aria-labelledby="terminal-heading"
      className="px-6 pb-24 pt-8 sm:px-10 sm:pb-32 sm:pt-12 lg:px-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Interactive resume
            </p>
            <h2
              id="terminal-heading"
              className="mt-2 font-serif text-4xl leading-tight text-primary sm:text-5xl"
            >
              Query the resume yourself.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-muted sm:text-right">
            A real shell over my resume data — click a command or type below.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0c10]/85 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wide text-neutral-500">
              <TerminalIcon size={13} />
              <span>gourav-shell</span>
            </div>
            <span className="w-12" aria-hidden="true" />
          </div>

          <div
            ref={outputRef}
            aria-live="polite"
            className="h-64 overflow-y-auto px-4 py-4 font-mono text-xs leading-6 sm:h-72 sm:px-6 sm:py-5 sm:text-sm"
          >
            <div className="space-y-0.5">
              {bootLines.map((line, lineIndex) => (
                <p key={`boot-${lineIndex}`}>
                  {line.map((part, partIndex) => (
                    <span
                      key={`${lineIndex}-${partIndex}`}
                      className={lineTone(part.tone)}
                    >
                      {part.text}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            <div className="mt-4 space-y-4">
              {history.map((entry, entryIndex) => (
                <div key={`${entry.command}-${entryIndex}`}>
                  <p className="flex gap-2 text-neutral-400">
                    <span className="text-emerald-400">gourav@portfolio</span>
                    <span className="text-accent">~</span>
                    <span className="text-neutral-500">$</span>
                    <span className="text-neutral-100">{entry.command}</span>
                  </p>
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-white/[0.08] pl-3 sm:ml-5 sm:pl-4">
                    {entry.output.map((line, lineIndex) => (
                      <p key={`${entryIndex}-${lineIndex}`} className="break-words">
                        {line.href ? (
                          <a
                            href={line.href}
                            target="_blank"
                            rel={
                              line.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className={
                              line.href === PERSON.resumeUrl
                                ? "font-mono text-cyan-400 underline transition-colors hover:text-cyan-300"
                                : `${lineTone(line.tone)} transition-colors hover:text-sky-300`
                            }
                          >
                            {line.prefix}
                            {line.text}
                            {line.suffix}
                            {line.href.startsWith("http") && (
                              <ArrowUpRight
                                aria-hidden="true"
                                className="ml-1 inline"
                                size={12}
                              />
                            )}
                          </a>
                        ) : (
                          <span className={lineTone(line.tone)}>{line.text}</span>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-4 flex items-center gap-2"
            >
              <label
                htmlFor="resume-terminal-input"
                className="shrink-0 text-emerald-400"
              >
                guest@portfolio <span className="text-accent">~</span> $
              </label>
              <input
                ref={inputRef}
                id="resume-terminal-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                autoComplete="off"
                spellCheck={false}
                aria-label="Enter a resume terminal command"
                className="min-w-0 flex-1 bg-transparent text-neutral-100 outline-none placeholder:text-neutral-700"
                placeholder="type help"
              />
              <button type="submit" className="sr-only">
                Run command
              </button>
            </form>
          </div>

          <div className="border-t border-white/[0.08] bg-white/[0.02] px-4 py-3 sm:px-5">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-600">
              Quick commands
            </p>
            <div className="flex flex-wrap gap-2">
              {commands.map((command) => (
                <button
                  type="button"
                  key={command}
                  onClick={() => {
                    execute(command)
                    inputRef.current?.focus()
                  }}
                  className="rounded-md border border-white/[0.09] bg-white/[0.025] px-2.5 py-1.5 font-mono text-[10px] text-neutral-400 transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-sky-200"
                >
                  {command}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
