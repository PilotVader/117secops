import { getProjectData, getAllProjectSlugs, getRelatedProjects, getProjectCategoryCounts, getOldestProjects, getNewestProjects } from "@/lib/project"
import ProjectClientPage from "./ProjectClientPage"
import { notFound } from "next/navigation"

// Generate static params based on markdown files
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map(({ slug }: { slug: string }) => ({ slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projectData = await getProjectData(slug)

  if (!projectData) {
    notFound()
  }

  // Fetch all sidebar data on the server side with exclusion logic to prevent duplicates
  const relatedProjects = getRelatedProjects(slug, 3)
  const relatedSlugs = relatedProjects.map(p => p.slug)
  
  const oldestProjects = getOldestProjects(slug, relatedSlugs, 3)
  const oldestSlugs = oldestProjects.map(p => p.slug)
  
  const newestProjects = getNewestProjects(slug, [...relatedSlugs, ...oldestSlugs], 3)
  const categoryCounts = getProjectCategoryCounts()

  return (
    <ProjectClientPage 
      projectData={projectData}
      relatedProjects={relatedProjects}
      oldestProjects={oldestProjects}
      newestProjects={newestProjects}
      categoryCounts={categoryCounts}
    />
  )
}
