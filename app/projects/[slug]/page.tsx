import { getProjectData, getAllProjectSlugs, getRelatedProjects, getProjectCategoryCounts, getOldestProjects, getNewestProjects, getAdjacentProjects } from "@/lib/project"
import ProjectClientPage from "./ProjectClientPage"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Generate static params based on markdown files
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map(({ slug }: { slug: string }) => ({ slug }))
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const projectData = await getProjectData(slug)

  if (!projectData) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  const baseUrl = 'https://www.117secops.com'
  const projectUrl = `${baseUrl}/projects/${slug}`
  const description = projectData.description || `Cybersecurity project: ${projectData.title}`
  
  return {
    title: projectData.title,
    description: description,
    openGraph: {
      title: `${projectData.title} | 117 SecOps`,
      description: description,
      url: projectUrl,
      images: projectData.image ? [projectData.image] : undefined,
      type: 'article',
      publishedTime: projectData.date,
      authors: ['Samson Otori'],
      tags: projectData.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: projectData.title,
      description: description,
      images: projectData.image ? [projectData.image] : undefined,
    },
    alternates: {
      canonical: projectUrl,
    },
  }
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
  const { previous: previousProject, next: nextProject } = await getAdjacentProjects(slug)

  return (
    <ProjectClientPage 
      projectData={projectData}
      relatedProjects={relatedProjects}
      oldestProjects={oldestProjects}
      newestProjects={newestProjects}
      categoryCounts={categoryCounts}
      previousProject={previousProject}
      nextProject={nextProject}
    />
  )
}
