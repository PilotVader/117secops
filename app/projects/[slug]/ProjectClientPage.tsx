"use client"

import { useState, useEffect } from "react"
import { notFound, useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import PageTransition from "@/components/page-transition"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Building } from "lucide-react"
import { BlogContentRenderer } from "@/components/blog-content-renderer"
import { ImageGallery } from "@/components/ui/image-gallery"

interface Project {
  slug: string
  title: string
  description: string
  date?: string
  author?: string
  client?: string
  category: string
  challenge?: string
  solution?: string
  results?: string[]
  image: string
  technologies?: string[]
  tags?: string[]
  content: string
  images?: {
    src: string
    alt: string
  }[]
}



export default function ProjectClientPage({ projectData }: { projectData: Project }) {
  const params = useParams()
  const slug = params?.slug

  const [project, setProject] = useState(projectData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!project && slug) {
      setLoading(true)
      console.error("Project data not available for slug:", slug)
      notFound()
    }
  }, [slug, project])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!project) {
    notFound()
  }

  // Determine color scheme based on project category
  const colorScheme = project.category === "red" ? "red" : project.category === "Infrastructure" ? "green" : "blue"

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/projects/"
            className={`inline-flex items-center ${
              colorScheme === "red" 
                ? "text-red-600 hover:text-red-700" 
                : colorScheme === "green"
                  ? "text-green-600 hover:text-green-700"
                  : "text-blue-600 hover:text-blue-700"
            } mb-8 transition-colors duration-400`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all projects
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-4 items-center text-muted-foreground mb-6">
              {project.date && (
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{project.date}</span>
                </div>
              )}
              {project.author && (
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{project.author}</span>
                </div>
              )}
              {project.client && (
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  <span>{project.client}</span>
                </div>
              )}
              <Badge
                variant="outline"
                className={`${
                  colorScheme === "red"
                    ? "bg-red-500/5 border-red-500/20 text-red-600"
                    : colorScheme === "green"
                      ? "bg-green-500/5 border-green-500/20 text-green-600"
                    : "bg-blue-500/5 border-blue-500/20 text-blue-600"
                }`}
              >
                {project.category === "red" 
                  ? "PROJECT RED" 
                  : project.category === "Infrastructure"
                    ? "INFRASTRUCTURE"
                    : "PROJECT BLUE"}
              </Badge>
            </div>

            <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
          </div>

          <div className="mb-8 space-y-6">
            {project.challenge && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${
                  colorScheme === "red" 
                    ? "text-red-600" 
                    : colorScheme === "green"
                      ? "text-green-600"
                      : "text-blue-600"
                }`}>
                  Challenge
                </h2>
                <p className="text-muted-foreground">{project.challenge}</p>
              </div>
            )}

            {project.solution && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${
                  colorScheme === "red" 
                    ? "text-red-600" 
                    : colorScheme === "green"
                      ? "text-green-600"
                      : "text-blue-600"
                }`}>
                  Solution
                </h2>
                <p className="text-muted-foreground">{project.solution}</p>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${
                  colorScheme === "red" 
                    ? "text-red-600" 
                    : colorScheme === "green"
                      ? "text-green-600"
                      : "text-blue-600"
                }`}>
                  Results
                </h2>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  {project.results.map((result: string, index: number) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Use enhanced BlogContentRenderer with inline gallery support */}
          <BlogContentRenderer
            content={project.content}
            groupId={`project-${project.slug}`}
          />

          

          {/* Project Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mt-12 mb-8">
              <h2 className={`text-2xl font-bold mb-6 ${
                colorScheme === "red" 
                  ? "text-red-600" 
                  : colorScheme === "green"
                    ? "text-green-600"
                    : "text-blue-600"
              }`}>
                Project Gallery
              </h2>
              <ImageGallery images={project.images} />
            </div>
          )}

          {/* Display tags if available */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className={`h-4 w-4 ${
                  colorScheme === "red" 
                    ? "text-red-600" 
                    : colorScheme === "green"
                      ? "text-green-600"
                      : "text-blue-600"
                } mr-2`} />
                {project.tags.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`${
                      colorScheme === "red" 
                        ? "bg-red-500/5 text-red-600" 
                        : colorScheme === "green"
                          ? "bg-green-500/5 text-green-600"
                          : "bg-blue-500/5 text-blue-600"
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Display technologies if available */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className={`h-4 w-4 ${
                  colorScheme === "red" 
                    ? "text-red-600" 
                    : colorScheme === "green"
                      ? "text-green-600"
                      : "text-blue-600"
                } mr-2`} />
                {project.technologies.map((tech: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`${
                      colorScheme === "red" 
                        ? "bg-red-500/5 text-red-600" 
                        : colorScheme === "green"
                          ? "bg-green-500/5 text-green-600"
                          : "bg-blue-500/5 text-blue-600"
                    }`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
