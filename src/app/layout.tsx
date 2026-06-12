import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gourav Chouhan — Full-Stack Developer & ML Researcher",
  description:
    "Portfolio of Gourav Chouhan. Full-stack developer and ML researcher at VIT Bhopal.",
  openGraph: {
    title: "Gourav Chouhan",
    description: "Full-Stack Developer & ML Researcher",
    url: "https://gourav.dev", // update with your actual domain
    siteName: "Gourav Chouhan",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-obsidian text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  )
}