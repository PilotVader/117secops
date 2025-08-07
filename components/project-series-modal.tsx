import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Project } from "@/lib/project"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animations"

interface ProjectSeriesModalProps {
  isOpen: boolean
  onClose: () => void
  series: Project[]
  seriesName: string
}

export function ProjectSeriesModal({ isOpen, onClose, series, seriesName }: ProjectSeriesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold">{seriesName}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-6 -mr-6">
          <div className="space-y-6 py-4">
            {series.map((project, index) => (
              <motion.div
                key={project.slug}
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
                className="flex flex-col space-y-2 border-b border-border pb-4 last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {/* Display clean title without duplicating "Part X:" */}
                      {project.title.includes("Part ") ? project.title : `Part ${project.series?.part}: ${project.title}`}
                    </h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="shrink-0 cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white px-3 py-1 text-sm font-medium border rounded-md transition-colors"
                  >
                    Read More
                  </Link>
                </div>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-muted/50 rounded border border-gray-200 dark:border-border text-gray-800 dark:text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 