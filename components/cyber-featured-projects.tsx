"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Project } from "@/lib/project"
import { Shield, Terminal, Zap, ArrowRight, Cloud } from "lucide-react"

interface CyberFeaturedProjectsProps {
  projects: Project[]
}

export function CyberFeaturedProjects({ projects }: CyberFeaturedProjectsProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "red":
        return <Zap className="w-4 h-4" />
      case "Infrastructure":
        return <Shield className="w-4 h-4" />
      case "cloud":
        return <Cloud className="w-4 h-4" />
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
      case "cloud":
        return { color: '#7c3aed' } // purple-600
      default:
        return { color: '#2563eb' } // blue-600
    }
  }

  // Helper logic for badges
  const getProjectBadges = (project: Project) => {
    const normalizedTags = (project.tags || []).map((t) => t.toLowerCase())
    const teamBadges: string[] = []
    if (normalizedTags.includes("blue team")) teamBadges.push("Blue")
    if (normalizedTags.includes("red team")) teamBadges.push("Red")
    if (normalizedTags.includes("cloud")) teamBadges.push("Cloud")

    return teamBadges.length > 0 ? teamBadges : [project.category === "red" ? "Red" : project.category === "Infrastructure" ? "Infra" : "Blue"]
  }

  const labelToCategory = (label: string) =>
    label === "Red" || label === "Red Team" ? "red" :
      label === "Infra" || label === "Infrastructure" ? "Infrastructure" :
        label === "Cloud" ? "cloud" : "blue"

  const renderBadges = (project: Project, isMobile: boolean) => {
    const labels = getProjectBadges(project);
    const displayLabels = isMobile ? labels.slice(0, 1) : labels.slice(0, 3);

    return displayLabels.map((label) => {
      const fullLabel = !isMobile && label === "Blue" ? "Blue Team" :
        !isMobile && label === "Red" ? "Red Team" :
          !isMobile && label === "Infra" ? "Infrastructure" : label;

      const cat = labelToCategory(label);

      return (
        <Badge key={label} variant="outline" className={`cyber-border ${isMobile ? 'bg-black/60 backdrop-blur-md text-[10px] px-1.5 py-0 border-opacity-50 h-5' : 'bg-card/30 text-[10px] md:text-xs'}`}>
          <span style={getCategoryColor(cat)} className="flex items-center">
            {getCategoryIcon(cat)}
            <span className="ml-1">{fullLabel}</span>
          </span>
        </Badge>
      )
    })
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 matrix-bg opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Badge variant="outline" className="cyber-border bg-card/50 backdrop-blur-sm">
              <Terminal className="w-3 h-3 mr-1" />
              Featured Posts
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 font-mono"
          >
            <span className="text-cyber-glow">Security</span>
            <br />
            <span className="text-cyber-glow">
              Operations
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Hands-on experiments and documented learning experiences from my cybersecurity journey
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-full"
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="cyber-border bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden h-full flex flex-col md:min-h-[500px] hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                  {/* Project Image */}
                  <div className="aspect-video relative overflow-hidden">
                    {/* Mobile Badge Overlay */}
                    <div className="absolute top-2 left-2 z-10 md:hidden flex flex-wrap gap-1">
                      {renderBadges(project, true)}
                    </div>

                    <Image
                      src={project.image || "/images/project-placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-2 md:p-6 flex-1 flex flex-col">
                    {/* Desktop Team Badges */}
                    <div className="hidden md:flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                      {renderBadges(project, false)}
                    </div>

                    {/* Title */}
                    <h3 className="text-xs md:text-xl font-semibold mb-1 md:mb-3 font-mono text-foreground group-hover:text-primary transition-colors leading-tight">
                      {(() => {
                        const projectBoxMatch = project.title.match(/^(Project\s+\d+(\.\d+)?)/i);
                        if (projectBoxMatch) {
                          return (
                            <>
                              <span className="block md:hidden">{projectBoxMatch[1]}</span>
                              <span className="hidden md:block">{project.title}</span>
                            </>
                          )
                        }
                        return <span className="line-clamp-2 md:line-clamp-none">{project.title}</span>
                      })()}
                    </h3>

                    {/* Description - HIDE ON MOBILE */}
                    <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 hidden md:block">
                      {project.description}
                    </p>

                    {/* Tags - HIDE ON MOBILE */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="hidden md:flex flex-wrap gap-1 mb-2 md:mb-4 flex-shrink-0">
                        {project.tags.filter(tag => tag).slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={`${tag}-${tagIndex}`}
                            className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 dark:bg-muted/50 rounded border border-gray-200 dark:border-border text-gray-800 dark:text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.filter(tag => tag).length > 3 && (
                          <span className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 dark:bg-muted/50 rounded border border-gray-200 dark:border-border text-gray-800 dark:text-muted-foreground">
                            +{project.tags.filter(tag => tag).length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Read More Button - HIDE ON MOBILE */}
                    <div className="flex-shrink-0 mt-auto hidden md:block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white h-8 text-xs md:h-9 md:text-sm"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/projects">
            <Button
              size="lg"
              className="cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white"
            >
              <Terminal className="w-5 h-5 mr-2" />
              View All Operations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 