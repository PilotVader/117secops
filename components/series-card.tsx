"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/project"

interface SeriesCardProps {
  seriesName: string
  projects: Project[]
  index: number
  openLightbox: (images: Array<{ src: string; alt: string }>, startIndex?: number) => void
  openSeriesModal: (seriesName: string, projects: Project[]) => void
}

export function SeriesCard({ seriesName, projects, index, openLightbox, openSeriesModal }: SeriesCardProps) {
  const firstProject = projects[0]
  const isRed = firstProject.category === "red"
  const isInfrastructure = firstProject.category === "Infrastructure"
  const accentColor = isRed ? "red" : isInfrastructure ? "green" : "blue"
  const totalParts = projects.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card 
        className={`cyber-border bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden transition-cyber ${
          firstProject.category === "red"
            ? ""
            : firstProject.category === "Infrastructure"
            ? ""
            : ""
        }`}
      >
        <div className="flex flex-col h-full">
          <div 
            className="relative h-[200px] cursor-pointer" 
            onClick={() => openLightbox([{ src: firstProject.image || "/images/project-placeholder.svg", alt: firstProject.title }])}
          >
            <Image
              src={firstProject.image || "/images/project-placeholder.svg"}
              alt={firstProject.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0"
            />
          </div>
          
          <CardHeader className="p-6">
            <CardTitle 
              className={`text-base font-semibold mb-2 font-mono
                ${isRed 
                  ? "text-red-500" 
                  : isInfrastructure
                    ? "text-green-500"
                    : "text-blue-500"}`}
            >
              {seriesName}
            </CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {firstProject.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 mt-3 flex-1">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {firstProject.tags?.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className={`text-xs
                    ${isRed 
                      ? "bg-red-500/5 border-red-500/20" 
                      : isInfrastructure
                        ? "bg-green-500/5 border-green-500/20"
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
            
            <ul className="mt-2 space-y-1">
              {projects.slice(0, 2).map((project) => (
                <li key={project.slug} className="text-xs text-muted-foreground font-mono">
                  {project.title.includes("Part ") ? project.title : `Part ${project.series?.part}: ${project.title}`}
                </li>
              ))}
              {totalParts > 2 && (
                <li className="text-xs text-muted-foreground font-medium font-mono">
                  +{totalParts - 2} more {totalParts - 2 === 1 ? 'part' : 'parts'}
                </li>
              )}
            </ul>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              className={`w-full text-xs shadow-lg
                ${isRed 
                  ? "bg-red-600 shadow-red-500/10" 
                  : isInfrastructure
                    ? "bg-green-600 shadow-green-500/10"
                    : "bg-blue-600 shadow-blue-500/10"}`}
              size="sm"
              onClick={() => openSeriesModal(seriesName, projects)}
            >
              View Series Details
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
} 