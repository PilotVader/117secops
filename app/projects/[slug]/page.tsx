import { getProjectData, getAllProjectSlugs } from "@/lib/project"
import ProjectClientPage from "./ProjectClientPage"
import { notFound } from "next/navigation"

// Generate static params based on markdown files
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const projectData = await getProjectData(slug)

  if (!projectData) {
    notFound()
  }

  return <ProjectClientPage projectData={projectData} />
}
