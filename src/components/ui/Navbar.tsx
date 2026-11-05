"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, Moon, X } from "lucide-react"
import { useState, useEffect } from "react"
import { NAV_LINKS } from "@/lib/constants"

function getNavigationHref(href: string) {
  const [pathname, hash] = href.split("#", 2)
  return hash ? `${pathname || "/"}#${hash}` : href
}

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed left-1/2 top-6 z-50 w-[92%] max-w-7xl -translate-x-1/2 rounded-2xl border border-grid px-6 py-4 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-surface/85 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
          : "bg-surface/80 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 font-mono text-sm text-primary transition-colors duration-200 hover:text-accent"
        >
          GC
        </Link>

        <ul className="hidden items-center gap-x-5 lg:flex">
          {NAV_LINKS.map((link) => {
            const href = getNavigationHref(link.href)
            const linkPath = href.split("#", 1)[0] || "/"

            return (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 whitespace-nowrap font-mono text-xs tracking-widest uppercase text-muted transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <Link
                    href={href}
                    className={`whitespace-nowrap font-mono text-xs tracking-widest uppercase transition-colors duration-200 hover:text-primary ${
                      pathname === linkPath ? "text-primary" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-4">
          <span
            aria-label="Theme is fixed to obsidian dark mode"
            className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-neutral-500"
          >
            <Moon size={14} />
            <span className="hidden sm:inline">Obsidian</span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="text-muted transition-colors duration-200 hover:text-primary lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul
          id="mobile-navigation"
          className="mt-4 flex flex-col gap-1 border-t border-grid pt-3 lg:hidden"
        >
          {NAV_LINKS.map((link) => {
            const href = getNavigationHref(link.href)
            const linkPath = href.split("#", 1)[0] || "/"

            return (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 font-mono text-xs tracking-widest uppercase text-muted transition-colors hover:bg-lifted hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-3 font-mono text-xs tracking-widest uppercase transition-colors hover:bg-lifted hover:text-primary ${
                      pathname === linkPath ? "text-primary" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </nav>
  )
}