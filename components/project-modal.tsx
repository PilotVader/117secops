"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: any
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false)

  // Handle escape key press
  useEffect(() => {
    setMounted(true)

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="bg-background rounded-lg shadow-xl overflow-hidden flex flex-col relative z-10"
            style={{
              width: "95%",
              maxWidth: "900px",
              maxHeight: "90vh",
            }}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className={`text-2xl font-bold ${project.category === "red" ? "text-red-600" : "text-blue-600"}`}>
                {project.title}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left column - Image and client info */}
                <div>
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Client</h3>
                    <p className="text-muted-foreground">{project.client}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className={`
                            ${
                              project.category === "red"
                                ? "bg-red-500/5 border-red-500/20"
                                : "bg-blue-500/5 border-blue-500/20"
                            }
                          `}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column - Project details */}
                <div>
                  <div className="mb-6">
                    <h3
                      className={`text-lg font-medium mb-2 ${
                        project.category === "red" ? "text-red-600" : "text-blue-600"
                      }`}
                    >
                      Challenge
                    </h3>
                    <p className="text-muted-foreground">{project.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <h3
                      className={`text-lg font-medium mb-2 ${
                        project.category === "red" ? "text-red-600" : "text-blue-600"
                      }`}
                    >
                      Solution
                    </h3>
                    <p className="text-muted-foreground">{project.solution}</p>
                  </div>

                  <div className="mb-6">
                    <h3
                      className={`text-lg font-medium mb-2 ${
                        project.category === "red" ? "text-red-600" : "text-blue-600"
                      }`}
                    >
                      Results
                    </h3>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                      {project.results.map((result: string, index: number) => (
                        <li key={index}>{result}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Additional content section for the detailed case study */}
                  {project.fullCaseStudy && (
                    <div className="mt-8">
                      <h3
                        className={`text-xl font-bold mb-4 ${
                          project.category === "red" ? "text-red-600" : "text-blue-600"
                        }`}
                      >
                        Full Case Study
                      </h3>
                      <div className="prose max-w-none">{project.fullCaseStudy}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
