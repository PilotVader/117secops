import { HeroSection } from "@/components/hero-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { getSortedProjectsData } from "@/lib/project"

export default async function Home() {
  // Get the 3 most recent projects
  const projects = await getSortedProjectsData()
  const featuredProjects = projects.slice(0, 3)

  return (
    <main>
      <HeroSection />
      <FeaturedProjects projects={featuredProjects} />
    </main>
  )
}
