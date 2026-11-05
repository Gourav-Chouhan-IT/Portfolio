"use client"

import { PERSON } from "@/lib/constants"

export function ResumeLink() {
  return (
    <a
      href={PERSON.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        event.preventDefault()
        window.open(PERSON.resumeUrl, "_blank", "noopener,noreferrer")
      }}
    >
      Resume
    </a>
  )
}
