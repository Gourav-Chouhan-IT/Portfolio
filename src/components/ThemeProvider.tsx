"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type Theme = "dark" | "light"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const THEME_STORAGE_KEY = "portfolio-theme"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(nextTheme)
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  }, [])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    const nextTheme: Theme = savedTheme === "light" ? "light" : "dark"
    const frame = window.requestAnimationFrame(() => {
      setThemeState(nextTheme)
      document.documentElement.classList.remove("dark", "light")
      document.documentElement.classList.add(nextTheme)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
