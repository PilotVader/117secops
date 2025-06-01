import ProjectsClientPage from "./ProjectsClientPage"

async function getProjects() {
  // During build, we'll use the file system directly
  if (process.env.NODE_ENV === "production") {
    const { getSortedProjectsData } = await import("@/app/api/projects/route")
    const response = await getSortedProjectsData()
    return response
  }

  // During development, we'll use the API
  const res = await fetch("http://localhost:3000/api/projects")
  if (!res.ok) {
    throw new Error("Failed to fetch projects")
  }
  const data = await res.json()
  return data.projects
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return <ProjectsClientPage initialProjects={projects} />
}
