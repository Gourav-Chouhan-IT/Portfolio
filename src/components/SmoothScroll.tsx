"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let lenis: Lenis | undefined

    const syncScroll = () => {
      if (reducedMotion.matches) {
        lenis?.destroy()
        lenis = undefined
      } else if (!lenis) {
        lenis = new Lenis({
          autoRaf: true,
          smoothWheel: true,
          lerp: 0.08,
        })
      }
    }

    syncScroll()
    reducedMotion.addEventListener("change", syncScroll)

    return () => {
      reducedMotion.removeEventListener("change", syncScroll)
      lenis?.destroy()
    }
  }, [])

  return null
}
