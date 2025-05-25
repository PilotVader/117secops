"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animations"
import { LinkedInPostModal } from "@/components/linkedin-post-modal"
import { getLinkedInPosts } from "@/lib/api-service"
import { ProjectLightbox } from "@/components/project-lightbox"
import type { Project } from "@/lib/project"

export default function ProjectsClientPage({ initialProjects }: { initialProjects: Project[] }) {
  // Initialize with the initial data
  const [projects] = useState<Project[]>(initialProjects)
  const [linkedInPosts, setLinkedInPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Add state for visible project counts
  const [visibleProjectCounts, setVisibleProjectCounts] = useState({
    all: 6,
    "blue-team": 6,
    "red-team": 6,
    cloud: 6,
    infrastructure: 6,
  })

  // Constants for how many projects to show per load
  const PROJECTS_PER_LOAD = 3

  useEffect(() => {
    async function fetchLinkedInData() {
      try {
        // Only fetch LinkedIn posts
        const posts = await getLinkedInPosts()
        setLinkedInPosts(posts)
      } catch (error) {
        console.error("Error fetching LinkedIn data:", error)
      }
    }

    fetchLinkedInData()
  }, [])

  const openPostModal = (post) => {
    setSelectedPost(post)
    setIsPostModalOpen(true)
  }

  const closePostModal = () => {
    setIsPostModalOpen(false)
  }

  // Function to open lightbox
  const openLightbox = (images, startIndex = 0) => {
    setLightboxImages(images)
    setCurrentImageIndex(startIndex)
    setIsLightboxOpen(true)
  }

  // Function to load more projects for a specific category
  const loadMoreProjects = (category) => {
    setVisibleProjectCounts((prev) => ({
      ...prev,
      [category]: prev[category] + PROJECTS_PER_LOAD,
    }))
  }

  // Filter projects by tags
  const blueTeamProjects = projects.filter(
    (project) => project.category === "blue" || (project.tags && project.tags.includes("Blue Team")),
  )
  const redTeamProjects = projects.filter(
    (project) => project.category === "red" || (project.tags && project.tags.includes("Red Team")),
  )
  const cloudProjects = projects.filter((project) => project.tags && project.tags.includes("Cloud"))
  const infrastructureProjects = projects.filter((project) => project.tags && project.tags.includes("Infrastructure"))

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <motion.div
          className="flex flex-col items-center text-center space-y-4 mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-gradient" variants={fadeIn}>
            My Project Journal
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-3xl" variants={fadeIn}>
            Security experiments, tutorial recreations & original builds – documenting my hands-on progress
          </motion.p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full mb-12">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <TabsList className="border border-primary/20">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="blue-team">Blue Team</TabsTrigger>
              <TabsTrigger value="red-team">Red Team</TabsTrigger>
              <TabsTrigger value="cloud">Cloud</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            </TabsList>
          </motion.div>

          {/* All Projects Tab */}
          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, visibleProjectCounts.all).map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} openLightbox={openLightbox} />
              ))}
            </div>

            {/* See More button for all projects */}
            {visibleProjectCounts.all < projects.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  onClick={() => loadMoreProjects("all")}
                  className="bg-primary hover:bg-primary/90 shadow-primary/10"
                >
                  See More
                </Button>
              </motion.div>
            )}
          </TabsContent>

          {/* Blue Team Tab */}
          <TabsContent value="blue-team" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blueTeamProjects.slice(0, visibleProjectCounts["blue-team"]).map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} openLightbox={openLightbox} />
              ))}
            </div>

            {/* See More button for blue team projects */}
            {visibleProjectCounts["blue-team"] < blueTeamProjects.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  onClick={() => loadMoreProjects("blue-team")}
                  className="bg-blue-600 hover:bg-blue-700 shadow-blue-500/10"
                >
                  See More
                </Button>
              </motion.div>
            )}
          </TabsContent>

          {/* Red Team Tab */}
          <TabsContent value="red-team" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {redTeamProjects.slice(0, visibleProjectCounts["red-team"]).map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} openLightbox={openLightbox} />
              ))}
            </div>

            {/* See More button for red team projects */}
            {visibleProjectCounts["red-team"] < redTeamProjects.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  onClick={() => loadMoreProjects("red-team")}
                  className="bg-red-600 hover:bg-red-700 shadow-red-500/10"
                >
                  See More
                </Button>
              </motion.div>
            )}
          </TabsContent>

          {/* Cloud Tab */}
          <TabsContent value="cloud" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cloudProjects.slice(0, visibleProjectCounts.cloud).map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} openLightbox={openLightbox} />
              ))}
            </div>

            {/* See More button for cloud projects */}
            {visibleProjectCounts.cloud < cloudProjects.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  onClick={() => loadMoreProjects("cloud")}
                  className="bg-primary hover:bg-primary/90 shadow-primary/10"
                >
                  See More
                </Button>
              </motion.div>
            )}
          </TabsContent>

          {/* Infrastructure Tab */}
          <TabsContent value="infrastructure" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {infrastructureProjects.slice(0, visibleProjectCounts.infrastructure).map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} openLightbox={openLightbox} />
              ))}
            </div>

            {/* See More button for infrastructure projects */}
            {visibleProjectCounts.infrastructure < infrastructureProjects.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  onClick={() => loadMoreProjects("infrastructure")}
                  className="bg-primary hover:bg-primary/90 shadow-primary/10"
                >
                  See More
                </Button>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        {/* LinkedIn Post Modal */}
        {selectedPost && <LinkedInPostModal isOpen={isPostModalOpen} onClose={closePostModal} post={selectedPost} />}

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

// Update the ProjectCard component to handle optional fields and lightbox
function ProjectCard({ project, index, openLightbox }) {
  const isRed = project.category === "red"

  // Prepare images for lightbox
  const lightboxImages =
    project.images && project.images.length > 0
      ? project.images
      : [{ src: project.image || "/placeholder.svg", alt: project.title }]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card
        className={`overflow-hidden transition-all duration-400 hover:shadow-lg group card-transition
          ${
            isRed
              ? "hover:shadow-red-500/20 hover:border-red-500/30"
              : "hover:shadow-blue-500/20 hover:border-blue-500/30"
          }`}
      >
        <div className="aspect-video relative cursor-pointer" onClick={() => openLightbox(lightboxImages)}>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-400 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 bg-primary/0 
              ${isRed ? "group-hover:bg-red-500/10" : "group-hover:bg-blue-500/10"} 
              transition-all duration-400`}
          />
          {/* Lightbox indicator */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
            {lightboxImages.length} {lightboxImages.length === 1 ? "image" : "images"}
          </div>
        </div>
        <CardHeader>
          <CardDescription className={`text-sm font-medium ${isRed ? "text-red-600" : "text-blue-600"}`}>
            {project.client || "Personal Project"}
          </CardDescription>
          <CardTitle
            className={`text-2xl transition-colors duration-400 
              ${isRed ? "group-hover:text-red-600" : "group-hover:text-blue-600"}`}
          >
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.challenge && (
            <div>
              <h3 className={`font-semibold mb-1 ${isRed ? "text-red-600" : "text-blue-600"}`}>Challenge</h3>
              <p className="text-muted-foreground text-sm">{project.challenge}</p>
            </div>
          )}
          {project.solution && (
            <div>
              <h3 className={`font-semibold mb-1 ${isRed ? "text-red-600" : "text-blue-600"}`}>Solution</h3>
              <p className="text-muted-foreground text-sm">{project.solution}</p>
            </div>
          )}
          {/* Display tags if available */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`
                    ${isRed ? "bg-red-500/5 border-red-500/20" : "bg-blue-500/5 border-blue-500/20"}
                  `}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {/* Display technologies if available */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`
                    ${isRed ? "bg-red-500/5 border-red-500/20" : "bg-blue-500/5 border-blue-500/20"}
                  `}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className={`w-full shadow-lg transition-all duration-400
              ${
                isRed
                  ? "bg-red-600 hover:bg-red-700 shadow-red-500/10"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/10"
              }`}
            asChild
          >
            <Link href={`/projects/${project.slug}/`}>Read More</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function ProjectSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <Skeleton className="absolute inset-0" />
      </div>
      <CardHeader>
        <Skeleton className="h-4 w-40 mb-2" />
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-1" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-1" />
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  )
}
