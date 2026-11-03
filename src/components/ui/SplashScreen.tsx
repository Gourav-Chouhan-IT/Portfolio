"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { motion } from "framer-motion"

const SPLIT_EASE = [0.76, 0, 0.24, 1] as const
const NAME_EXPANSION_START = 100
const NAME_EXPANSION_DURATION = 400
const NAME_EXPANSION_STAGGER = 50
const NAME_HOLD_DURATION = 600
const SPLIT_DURATION = 250
const INTRO_SESSION_KEY = "hasSeenIntro"

function subscribeToMotionPreference(onChange: () => void) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  reducedMotion.addEventListener("change", onChange)

  return () => {
    reducedMotion.removeEventListener("change", onChange)
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function SplashScreen() {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    prefersReducedMotion,
    () => false,
  )
  const [splashState, setSplashState] = useState<"checking" | "show" | "skip">(
    "checking",
  )
  const [showFullName, setShowFullName] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem(INTRO_SESSION_KEY) === "true"
    // This state update occurs after hydration to keep server and client markup consistent.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSplashState(hasSeenIntro ? "skip" : "show")
  }, [])

  useEffect(() => {
    if (splashState !== "show" || reducedMotion) return

    const nameTimer = window.setTimeout(
      () => setShowFullName(true),
      NAME_EXPANSION_START,
    )
    const revealAt =
      NAME_EXPANSION_START +
      NAME_EXPANSION_DURATION +
      NAME_EXPANSION_STAGGER +
      NAME_HOLD_DURATION
    const revealTimer = window.setTimeout(() => {
      setIsRevealing(true)
    }, revealAt)
    const finishTimer = window.setTimeout(() => {
      sessionStorage.setItem(INTRO_SESSION_KEY, "true")
      setIsFinished(true)
    }, revealAt + SPLIT_DURATION + 50)

    return () => {
      window.clearTimeout(nameTimer)
      window.clearTimeout(revealTimer)
      window.clearTimeout(finishTimer)
    }
  }, [reducedMotion, splashState])

  if (splashState !== "show" || reducedMotion || isFinished) return null

  return (
    <div
      aria-hidden="true"
      className="splash-screen pointer-events-none fixed inset-0 z-[9999]"
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-obsidian"
        initial={{ y: "0%" }}
        animate={{ y: isRevealing ? "-100%" : "0%" }}
        transition={{ duration: SPLIT_DURATION / 1000, ease: SPLIT_EASE }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-obsidian"
        initial={{ y: "0%" }}
        animate={{ y: isRevealing ? "100%" : "0%" }}
        transition={{ duration: SPLIT_DURATION / 1000, ease: SPLIT_EASE }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: isRevealing ? 0 : 1,
          y: isRevealing ? -6 : 0,
        }}
        transition={{
          opacity: { duration: isRevealing ? 0.2 : 0.45 },
          y: { duration: 0.45, ease: "easeOut" },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center whitespace-nowrap font-serif text-5xl tracking-[-0.06em] text-primary sm:text-6xl"
        >
          <span className="inline-flex items-baseline">
            <span>G</span>
            <motion.span
              initial={{ width: 0, opacity: 0, x: -8 }}
              animate={
                showFullName
                  ? { width: "auto", opacity: 1, x: 0 }
                  : { width: 0, opacity: 0, x: -8 }
              }
              transition={{
                duration: NAME_EXPANSION_DURATION / 1000,
                ease: "easeOut",
              }}
              className="inline-block overflow-hidden"
            >
              ourav
            </motion.span>
          </span>
          <span className="mx-[0.22em] inline-flex items-baseline">
            <span>C</span>
            <motion.span
              initial={{ width: 0, opacity: 0, x: -8 }}
              animate={
                showFullName
                  ? { width: "auto", opacity: 1, x: 0 }
                  : { width: 0, opacity: 0, x: -8 }
              }
              transition={{
                duration: NAME_EXPANSION_DURATION / 1000,
                delay: NAME_EXPANSION_STAGGER / 1000,
                ease: "easeOut",
              }}
              className="inline-block overflow-hidden"
            >
              houhan
            </motion.span>
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
