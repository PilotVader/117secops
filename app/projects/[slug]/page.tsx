import { getProjectData, getAllProjectSlugs, getRelatedProjects, getProjectCategoryCounts } from "@/lib/project"
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

  // Fetch related projects and category counts on the server side
  const relatedProjects = getRelatedProjects(slug, 3)
  const categoryCounts = getProjectCategoryCounts()

  return (
    <ProjectClientPage 
      projectData={projectData}
      relatedProjects={relatedProjects}
      categoryCounts={categoryCounts}
    />
  )
}
