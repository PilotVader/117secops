"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animations"
import { ProjectLightbox } from "@/components/project-lightbox"
import { ProjectSeriesModal } from "@/components/project-series-modal"
import type { Project } from "@/lib/project"

// Helper function to group projects by series
function groupProjectsBySeries(projects: Project[]): {
  series: Record<string, Project[]>;
  standalone: Project[];
} {
  const seriesMap: Record<string, Project[]> = {};
  const standalone: Project[] = [];

  projects.forEach(project => {
    if (project.series?.name) {
      if (!seriesMap[project.series.name]) {
        seriesMap[project.series.name] = [];
      }
      seriesMap[project.series.name].push(project);
    } else {
      // Convert standalone projects into single-project series
      const seriesName = project.title;
      if (!seriesMap[seriesName]) {
        seriesMap[seriesName] = [];
      }
      seriesMap[seriesName].push({
        ...project,
        series: {
          name: seriesName,
          part: 1,
          totalParts: 1
        }
      });
    }
  });

  // Sort projects within each series by part number
  Object.values(seriesMap).forEach(seriesProjects => {
    seriesProjects.sort((a, b) => (a.series?.part || 0) - (b.series?.part || 0));
  });

  return { series: seriesMap, standalone: [] };
}

export default function ProjectsClientPage({ initialProjects }: { initialProjects: Project[] }) {
  const [projects] = useState<Project[]>(initialProjects)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string }>>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSeries, setSelectedSeries] = useState<Project[]>([])
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false)
  const [selectedSeriesName, setSelectedSeriesName] = useState("")

  // Group projects by series
  const { series: seriesMap } = groupProjectsBySeries(projects)

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

  // Filter projects by category
  const filterProjects = (category: string) => {
    if (category === "all") {
      return { seriesMap }
    }

    const filteredSeries: Record<string, Project[]> = {}

    // Filter series projects
    Object.entries(seriesMap).forEach(([seriesName, seriesProjects]) => {
      const filtered = seriesProjects.filter(project => 
        project.category === category || 
        (project.tags && project.tags.includes(category))
      )
      if (filtered.length > 0) {
        filteredSeries[seriesName] = filtered
      }
    })

    return { seriesMap: filteredSeries }
  }

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
              <TabsTrigger value="blue">Blue Team</TabsTrigger>
              <TabsTrigger value="red">Red Team</TabsTrigger>
              <TabsTrigger value="Cloud">Cloud</TabsTrigger>
              <TabsTrigger value="Infrastructure">Infrastructure</TabsTrigger>
            </TabsList>
          </motion.div>

          {["all", "blue", "red", "Cloud", "Infrastructure"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(filterProjects(category).seriesMap).map(([seriesName, seriesProjects], index) => (
                  <SeriesCard
                    key={seriesName}
                    seriesName={seriesName}
                    projects={seriesProjects}
                    index={index}
                    openLightbox={openLightbox}
                    openSeriesModal={openSeriesModal}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

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
      </div>
    </PageTransition>
  )
}

interface SeriesCardProps {
  seriesName: string
  projects: Project[]
  index: number
  openLightbox: (images: Array<{ src: string; alt: string }>, startIndex?: number) => void
  openSeriesModal: (seriesName: string, projects: Project[]) => void
}

function SeriesCard({ seriesName, projects, index, openLightbox, openSeriesModal }: SeriesCardProps) {
  const firstProject = projects[0]
  const isRed = firstProject.category === "red"
  const accentColor = isRed ? "red" : "blue"
  const totalParts = projects.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card 
        className={`overflow-hidden transition-all duration-300 group
          ${isRed 
            ? "hover:shadow-red-500/20 hover:border-red-500/30" 
            : "hover:shadow-blue-500/20 hover:border-blue-500/30"}`}
      >
        <div className="flex flex-col">
          <div 
            className="relative h-[200px] cursor-pointer" 
            onClick={() => openLightbox([{ src: firstProject.image || "/images/project-placeholder.svg", alt: firstProject.title }])}
          >
            <Image
              src={firstProject.image || "/images/project-placeholder.svg"}
              alt={firstProject.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${isRed ? "group-hover:from-red-900/50" : "group-hover:from-blue-900/50"}`}
            />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <CardHeader className="p-0">
              <CardTitle 
                className={`text-lg mb-2 transition-colors duration-300
                  ${isRed 
                    ? "text-red-500 group-hover:text-red-600" 
                    : "text-blue-500 group-hover:text-blue-600"}`}
              >
                {seriesName}
              </CardTitle>
              <CardDescription className="text-sm line-clamp-2">
                {firstProject.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-3 flex-1">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {firstProject.tags?.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className={`text-xs
                      ${isRed 
                        ? "bg-red-500/5 border-red-500/20" 
                        : "bg-blue-500/5 border-blue-500/20"}`}
                  >
                    {tag}
                  </Badge>
                ))}
                {firstProject.tags && firstProject.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{firstProject.tags.length - 3} more</Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {totalParts} {totalParts === 1 ? 'Part' : 'Parts'}
              </p>
              <ul className="space-y-1">
                {projects.slice(0, 2).map((project) => (
                  <li key={project.slug} className="text-xs text-muted-foreground">
                    {project.title.includes("Part ") ? project.title : `Part ${project.series?.part}: ${project.title}`}
                  </li>
                ))}
                {totalParts > 2 && (
                  <li className="text-xs text-muted-foreground font-medium">
                    +{totalParts - 2} more {totalParts - 2 === 1 ? 'part' : 'parts'}
                  </li>
                )}
              </ul>
            </CardContent>
            <CardFooter className="p-0 mt-3">
              <Button
                className={`w-full text-xs shadow-lg transition-all duration-300
                  ${isRed 
                    ? "bg-red-600 hover:bg-red-700 shadow-red-500/10" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/10"}`}
                size="sm"
                onClick={() => openSeriesModal(seriesName, projects)}
              >
                View Series Details
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
