"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Project } from "@/lib/project"
import { useEffect, useState } from "react"

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  return (
    <section className={`py-20 ${
      isDarkMode 
        ? "bg-gradient-to-b from-purple-950 to-purple-900" 
        : "bg-gradient-to-b from-gray-50 to-white"
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl ${
              isDarkMode ? "text-purple-200" : "text-gray-600"
            }`}
          >
            Hands-on experiments and documented learning
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-lg overflow-hidden ${
                isDarkMode 
                  ? "bg-black/20 backdrop-blur-sm" 
                  : "bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              }`}
            >
              <div className="aspect-video relative">
                <Image
                  src={project.image || "/images/project-placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}>
                  {project.title}
                </h3>
                <p className={`mb-4 line-clamp-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {project.description}
                </p>
                <Link href={`/projects/${project.slug}`}>
                  <Button
                    variant="outline"
                    className={`w-full ${
                      isDarkMode 
                        ? "bg-transparent border-gray-700 text-white hover:bg-white/10" 
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button
              variant="outline"
              size="lg"
              className={`${
                isDarkMode 
                  ? "bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400/10" 
                  : "bg-white border-purple-600 text-purple-600 hover:bg-purple-50"
              }`}
            >
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 