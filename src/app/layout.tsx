import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Cormorant_Garamond } from "next/font/google"
import { Navbar } from "@/components/ui/Navbar"
import { SplashScreen } from "@/components/ui/SplashScreen"
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${editorialSerif.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-obsidian font-sans text-primary antialiased">
        <SplashScreen />
        <Navbar />
        {children}
      </body>
    </html>
  )
}