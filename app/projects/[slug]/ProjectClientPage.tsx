"use client"

import { useState, useEffect } from "react"
import { notFound, useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import PageTransition from "@/components/page-transition"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Building } from "lucide-react"
import { BlogContentRenderer } from "@/components/blog-content-renderer"
import { ProjectLightbox } from "@/components/project-lightbox"

export default function ProjectClientPage({ projectData }: { projectData: any }) {
  const params = useParams()
  const slug = params?.slug

  const [project, setProject] = useState(projectData)
  const [loading, setLoading] = useState(false) // Set to false since we have the data

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // We don't need to fetch again since we already have the data
  // But keep a simplified useEffect in case we need to handle any client-side logic
  useEffect(() => {
    if (!project && slug) {
      setLoading(true)
      console.error("Project data not available for slug:", slug)
      notFound()
    }

    // Prepare lightbox images
    if (project) {
      const images =
        project.images && project.images.length > 0
          ? project.images
          : [{ src: project.image || "/placeholder.svg", alt: project.title }]
      setLightboxImages(images)
    }
  }, [slug, project])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!project) {
    notFound()
  }

  // Function to open lightbox
  const openLightbox = (index = 0) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  // Determine color scheme based on project category
  const colorScheme = project.category === "red" ? "red" : "blue"

  // Update the component to handle optional fields
  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/projects/"
            className={`inline-flex items-center ${
              colorScheme === "red" ? "text-red-600 hover:text-red-700" : "text-blue-600 hover:text-blue-700"
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
                    : "bg-blue-500/5 border-blue-500/20 text-blue-600"
                }`}
              >
                {project.category === "red" ? "PROJECT RED" : "PROJECT BLUE"}
              </Badge>
            </div>

            <div
              className="aspect-video relative rounded-lg overflow-hidden mb-8 cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-400"></div>

              {/* Lightbox indicator */}
              {lightboxImages.length > 0 && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                  {lightboxImages.length} {lightboxImages.length === 1 ? "image" : "images"}
                </div>
              )}
            </div>
          </div>

          <div className="mb-8 space-y-6">
            {project.challenge && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${colorScheme === "red" ? "text-red-600" : "text-blue-600"}`}>
                  Challenge
                </h2>
                <p className="text-muted-foreground">{project.challenge}</p>
              </div>
            )}

            {project.solution && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${colorScheme === "red" ? "text-red-600" : "text-blue-600"}`}>
                  Solution
                </h2>
                <p className="text-muted-foreground">{project.solution}</p>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${colorScheme === "red" ? "text-red-600" : "text-blue-600"}`}>
                  Results
                </h2>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  {project.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="prose prose-purple max-w-none dark:prose-invert prose-img:rounded-lg prose-img:mx-auto prose-img:shadow-md">
            <BlogContentRenderer
              content={project.content}
              groupId={`project-${project.slug}`}
              onImageClick={(index) => openLightbox(index)}
            />
          </div>

          {/* Display tags if available */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className={`h-4 w-4 ${colorScheme === "red" ? "text-red-600" : "text-blue-600"} mr-2`} />
                {project.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`${colorScheme === "red" ? "bg-red-500/5 text-red-600" : "bg-blue-500/5 text-blue-600"}`}
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
                <Tag className={`h-4 w-4 ${colorScheme === "red" ? "text-red-600" : "text-blue-600"} mr-2`} />
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`${colorScheme === "red" ? "bg-red-500/5 text-red-600" : "bg-blue-500/5 text-blue-600"}`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Lightbox */}
        <ProjectLightbox
          isOpen={isLightboxOpen}
          images={lightboxImages}
          currentIndex={currentImageIndex}
          onClose={() => setIsLightboxOpen(false)}
          onNext={() => setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length)}
          onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
        />
      </div>
    </PageTransition>
  )
}
