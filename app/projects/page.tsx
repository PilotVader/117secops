import { getSortedProjectsData } from "@/lib/project"
import ProjectsClientPage from "./ProjectsClientPage"

export default async function ProjectsPage() {
  const projects = await getSortedProjectsData()

  return <ProjectsClientPage initialProjects={projects} />
}
