"use client"

import { useMemo, useState, useEffect, useRef } from "react"
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
import { Shield, Terminal, Zap, ArrowRight } from "lucide-react"

const ITEMS_PER_PAGE = 12

interface SeriesEntry {
  name: string
  projects: Project[]
  latestDate: string
}

export default function ProjectsClientPage({ initialProjects }: { initialProjects: Project[] }) {
  const [projects] = useState<Project[]>(initialProjects)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string }>>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSeries, setSelectedSeries] = useState<Project[]>([])
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false)
  const [selectedSeriesName, setSelectedSeriesName] = useState("")

  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const topRef = useRef<HTMLDivElement | null>(null)

  const seriesEntries = useMemo<SeriesEntry[]>(() => {
    const map = new Map<string, Project[]>()

    projects.forEach((project) => {
      const seriesName = project.series?.name || project.title
      const seriesPart = project.series?.part ?? 1
      const totalParts = project.series?.totalParts ?? 1

      const normalizedProject: Project = project.series
        ? project
        : {
            ...project,
            series: {
              name: seriesName,
              part: seriesPart,
              totalParts,
            },
          }

      if (!map.has(seriesName)) {
        map.set(seriesName, [])
      }

      map.get(seriesName)!.push(normalizedProject)
    })

    const entries: SeriesEntry[] = Array.from(map.entries()).map(([name, groupedProjects]) => {
      const sortedByPart = [...groupedProjects].sort(
        (a, b) => (a.series?.part || 0) - (b.series?.part || 0)
      )

      const latestDate = groupedProjects.reduce((latest, project) => {
        const projectDate = project.date ? new Date(project.date).toISOString() : latest
        return projectDate > latest ? projectDate : latest
      }, "1970-01-01T00:00:00.000Z")

      return {
        name,
        projects: sortedByPart,
        latestDate,
      }
    })

    return entries.sort((a, b) => (a.latestDate < b.latestDate ? 1 : -1))
  }, [projects])

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

  // Filter projects by category (also consider tags like "Blue Team" / "Red Team")
  const filterProjects = (category: string) => {
    if (category === "all") {
      return seriesEntries
    }

    const matchesCategory = (project: Project) => {
      if (category === "Infrastructure") {
        return project.category === "Infrastructure"
      }
      if (category === "red") {
        const tags = (project.tags || []).map((t) => t.toLowerCase())
        return project.category === "red" || tags.includes("red team")
      }
      if (category === "blue") {
        const tags = (project.tags || []).map((t) => t.toLowerCase())
        return project.category === "blue" || tags.includes("blue team")
      }
      if (category === "Cloud") {
        const tags = (project.tags || []).map((t) => t.toLowerCase())
        return tags.includes("cloud")
      }
      return project.category === category
    }

    return seriesEntries.filter((entry) => entry.projects.some(matchesCategory))
  }

  const filteredEntries = useMemo(() => filterProjects(activeCategory), [activeCategory, seriesEntries])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredEntries.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [filteredEntries, currentPage])

  useEffect(() => {
    if (typeof window === "undefined") return

    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentPage, activeCategory])

  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredEntries.slice(start, end)
  }, [filteredEntries, currentPage])

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / ITEMS_PER_PAGE))

  return (
    <PageTransition>
      <div ref={topRef} className="container mx-auto px-4 md:px-6 py-12">
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

        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value)}
          className="w-full mb-12"
        >
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

          {["all", "blue", "red", "Cloud", "Infrastructure"].map((category) => {
            const isActive = category === activeCategory
            const allCategoryEntries = isActive ? filteredEntries : filterProjects(category)
            const categoryEntries = isActive ? paginatedEntries : allCategoryEntries.slice(0, ITEMS_PER_PAGE)
            const categoryTotalPages = Math.max(1, Math.ceil(allCategoryEntries.length / ITEMS_PER_PAGE))

            return (
              <TabsContent key={category} value={category} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 items-stretch">
                  {categoryEntries.map((entry, index) => (
                    <SeriesCard
                      key={entry.name}
                      seriesName={entry.name}
                      projects={entry.projects}
                      index={index}
                      openLightbox={openLightbox}
                      openSeriesModal={openSeriesModal}
                    />
                  ))}
                </div>

                {categoryTotalPages > 1 && isActive && (
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page)
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }}
                  />
                )}
              </TabsContent>
            )
          })}
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

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 backdrop-blur">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "ghost"}
            size="sm"
            className={page === currentPage ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
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
  const totalParts = projects.length

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "red":
        return <Zap className="w-4 h-4" />
      case "Infrastructure":
        return <Shield className="w-4 h-4" />
      default:
        return <Terminal className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "red":
        return { color: '#dc2626' } // red-600
      case "Infrastructure":
        return { color: '#16a34a' } // green-600
      default:
        return { color: '#2563eb' } // blue-600
    }
  }

  return (
         <motion.div
       key={seriesName}
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: index * 0.1 }}
       className="relative h-full"
     >
       <div className="cyber-border bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden h-full flex flex-col min-h-[500px]">
         {/* Project Image */}
         <div className="aspect-video relative overflow-hidden">
           <Link href={`/projects/${firstProject.slug}/`}>
             <Image
               src={firstProject.image || "/images/project-placeholder.svg"}
               alt={firstProject.title}
               fill
               className="object-cover"
             />
           </Link>
         </div>
         
         {/* Project Content */}
         <div className="p-6 flex flex-col flex-1">
           {/* Team Badges (prioritize Blue/Red if present in tags) */}
           {(() => {
             const normalizedTags = (firstProject.tags || []).map((t) => t.toLowerCase())
             const teamBadges: string[] = []
             if (normalizedTags.includes("blue team")) teamBadges.push("Blue Team")
             if (normalizedTags.includes("red team")) teamBadges.push("Red Team")

             const labels = teamBadges.length > 0
               ? teamBadges
               : [
                   firstProject.category === "red"
                     ? "Red Team"
                     : firstProject.category === "Infrastructure"
                       ? "Infrastructure"
                       : "Blue Team",
                 ]

             const labelToCategory = (label: string) =>
               label === "Red Team" ? "red" : label === "Infrastructure" ? "Infrastructure" : "blue"

             return (
               <div className="flex items-center gap-2 mb-3">
                 {labels.slice(0, 2).map((label) => {
                   const cat = labelToCategory(label)
                   return (
                     <Badge key={label} variant="outline" className="cyber-border bg-card/30">
                       <span style={getCategoryColor(cat)} className="flex items-center">
                         {getCategoryIcon(cat)}
                         {label}
                       </span>
                     </Badge>
                   )
                 })}
               </div>
             )
           })()}
           
           {/* Title */}
           <h3 className="text-xl font-semibold mb-3 font-mono text-foreground">
             {seriesName}
           </h3>
           
           {/* Description */}
           <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
             {firstProject.description}
           </p>
           
           {/* Part Number */}
           <div className="mb-4">
             <p className="text-sm text-muted-foreground font-mono">
               {totalParts} {totalParts === 1 ? 'Part' : 'Parts'}
             </p>
           </div>
           
           {/* Tags */}
           {firstProject.tags && firstProject.tags.length > 0 && (
             <div className="flex flex-wrap gap-1 mb-4">
               {firstProject.tags.filter(tag => tag).slice(0, 3).map((tag, tagIndex) => (
                 <span
                   key={`${tag}-${tagIndex}`}
                   className="text-xs px-2 py-1 bg-gray-100 dark:bg-muted/50 rounded border border-gray-200 dark:border-border text-gray-800 dark:text-muted-foreground"
                 >
                   {tag}
                 </span>
               ))}
               {firstProject.tags.filter(tag => tag).length > 3 && (
                 <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-muted/50 rounded border border-gray-200 dark:border-border text-gray-800 dark:text-muted-foreground">
                   +{firstProject.tags.filter(tag => tag).length - 3}
                 </span>
               )}
             </div>
           )}
           
           {/* Read More Button */}
           <div className="mt-auto">
             <Button
               variant="outline"
               size="sm"
               className="w-full cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white"
               onClick={() => openSeriesModal(seriesName, projects)}
             >
               <span>View All Parts</span>
               <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
           </div>
         </div>
       </div>
     </motion.div>
  )
}
