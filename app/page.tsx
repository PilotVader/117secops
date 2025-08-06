import { CyberHero } from "@/components/cyber-hero"
import { CyberFeaturedProjects } from "@/components/cyber-featured-projects"
import { getSortedProjectsData } from "@/lib/project"

export default async function Home() {
  // Get the 3 most recent projects
  const projects = await getSortedProjectsData()
  const featuredProjects = projects.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <main>
        <CyberHero />
        <CyberFeaturedProjects projects={featuredProjects} />
      </main>
    </div>
  )
}
