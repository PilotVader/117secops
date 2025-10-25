"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { TrendingUp, Clock, Calendar, FolderOpen, History, Sparkles } from "lucide-react"
import type { Project } from "@/lib/project"

interface ProjectSidebarProps {
  relatedProjects: Project[]
  oldestProjects: Project[]
  newestProjects: Project[]
  categoryCounts: { [key: string]: number }
  className?: string
}

export function ProjectSidebar({ relatedProjects, oldestProjects, newestProjects, categoryCounts, className = "" }: ProjectSidebarProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "red team":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "infrastructure":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "blue team":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "cloud":
        return "bg-purple-600/20 text-purple-400 border-purple-600/30"
      case "all":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
      default:
        return "bg-muted/50 text-muted-foreground border-border"
    }
  }

  // Helper function to render project cards
  const renderProjectCard = (project: Project) => (
    <Link key={project.slug} href={`/projects/${project.slug}`}>
      <motion.div
        className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge 
              variant="outline" 
              className={`text-xs ${getCategoryColor(project.category === "red" ? "Red Team" : project.category === "Infrastructure" ? "Infrastructure" : "Blue Team")}`}
            >
              {project.category === "red" ? "Red Team" : project.category === "Infrastructure" ? "Infrastructure" : "Blue Team"}
            </Badge>
          </div>
          <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
            {project.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {project.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(project.date)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FolderOpen className="w-3 h-3" />
              Project
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Related Projects */}
      <Card className="cyber-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Related Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {relatedProjects.map(renderProjectCard)}
        </CardContent>
      </Card>

      {/* Oldest Projects */}
      <Card className="cyber-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="w-5 h-5 text-primary" />
            Oldest Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {oldestProjects.map(renderProjectCard)}
        </CardContent>
      </Card>

      {/* Newest Projects */}
      <Card className="cyber-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            Newest Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {newestProjects.map(renderProjectCard)}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="cyber-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Project Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <motion.div
                key={category}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200 cursor-pointer group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getCategoryColor(category)}`}
                  >
                    {category}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {count}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
