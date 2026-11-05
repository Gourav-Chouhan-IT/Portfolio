import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Cormorant_Garamond } from "next/font/google"
import { Navbar } from "@/components/ui/Navbar"
import { SplashScreen } from "@/components/ui/SplashScreen"
import { FlowFieldBackground } from "@/components/ui/FlowFieldBackground"
import { SmoothScroll } from "@/components/SmoothScroll"
import { ThemeProvider } from "@/components/ThemeProvider"
import "lenis/dist/lenis.css"
import "./globals.css"

const editorialSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Gourav Chouhan — Full-Stack Developer & ML Researcher",
  description: "Portfolio of Gourav Chouhan.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`no-scrollbar ${GeistSans.variable} ${GeistMono.variable} ${editorialSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="no-scrollbar overflow-x-hidden bg-obsidian font-sans text-primary antialiased">
        <ThemeProvider>
          <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
            <FlowFieldBackground />
          </div>
          <SplashScreen />
          <Navbar />
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}