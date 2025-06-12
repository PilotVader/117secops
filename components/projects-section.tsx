"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Project } from "@/lib/project"
import { SeriesCard } from "@/components/series-card"
import { ProjectLightbox } from "@/components/project-lightbox"
import { ProjectSeriesModal } from "@/components/project-series-modal"

interface ProjectsSectionProps {
  className?: string
}

export function ProjectsSection({ className }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string }>>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSeries, setSelectedSeries] = useState<Project[]>([])
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false)
  const [selectedSeriesName, setSelectedSeriesName] = useState("")

  useEffect(() => {
    // Fetch projects when component mounts
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        // Get the first 3 projects
        setProjects(data.slice(0, 3))
      })
  }, [])

  // Function to open lightbox
  const openLightbox = (images: Array<{ src: string; alt: string }>, startIndex = 0) => {
    setLightboxImages(images)
    setCurrentImageIndex(startIndex)
    setIsLightboxOpen(true)
  }

  // Function to open series modal
  const openSeriesModal = (seriesName: string, seriesProjects: Project[]) => {
    setSelectedSeries(seriesProjects)
    setSelectedSeriesName(seriesName)
    setIsSeriesModalOpen(true)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-950 to-purple-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <SeriesCard
              key={project.slug}
              seriesName={project.title}
              projects={[project]}
              index={index}
              openLightbox={openLightbox}
              openSeriesModal={openSeriesModal}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <ProjectLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={currentImageIndex}
        onNext={() => setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length)}
        onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
      />
      <ProjectSeriesModal
        isOpen={isSeriesModalOpen}
        onClose={() => setIsSeriesModalOpen(false)}
        series={selectedSeries}
        seriesName={selectedSeriesName}
      />
    </section>
  )
} 