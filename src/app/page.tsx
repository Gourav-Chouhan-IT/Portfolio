import { Hero } from "@/components/sections/Hero"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { TerminalResume } from "@/components/TerminalResume"

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen overflow-x-hidden text-primary">
      <Hero />
      <FeaturedProjects />
      <TerminalResume />
    </main>
  )
}