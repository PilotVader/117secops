import { getSortedProjectsData } from "@/lib/project"

import HomeClientPage from "./HomeClientPage"

export default async function HomePage() {
  const projects = await getSortedProjectsData()
  // Get the 3 most recent projects
  const featuredProjects = projects.slice(0, 3)

  return <HomeClientPage initialProjects={featuredProjects} />
}
