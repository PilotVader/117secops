"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Project } from "@/lib/project"
import { Shield, Terminal, Zap, ArrowRight } from "lucide-react"

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="cyber-border bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden">
                {/* Project Image */}
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image || "/images/project-placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                                         <Badge 
                       variant="outline" 
                       className="cyber-border bg-card/30"
                     >
                       <span style={getCategoryColor(project.category || 'blue')} className="flex items-center">
                         {getCategoryIcon(project.category || 'blue')}
                         {project.category === "red" ? "Red Team" : 
                          project.category === "Infrastructure" ? "Infrastructure" : "Blue Team"}
                       </span>
                     </Badge>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 font-mono text-foreground">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.filter(tag => tag).slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={`${tag}-${tagIndex}`}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-muted/50 rounded border border-gray-200 dark:border-border text-gray-800 dark:text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.filter(tag => tag).length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-muted/50 rounded border border-gray-200 dark:border-border text-gray-800 dark:text-muted-foreground">
                          +{project.tags.filter(tag => tag).length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Read More Button */}
                  <Link href={`/projects/${project.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
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