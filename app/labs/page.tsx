import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Code, Server, Database, Lock, Cpu } from "lucide-react"

export default function LabsPage() {
    const projects = require("@/public/data/labs-projects.json")

    return (
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-7xl">
            <div className="mb-16 text-center max-w-3xl mx-auto">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">
                    R&D / EXPERIMENTAL
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">
                    117 LABS
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium">
                    The engineering black box. A collection of experimental tools, SaaS prototypes, and side projects built to solve specific problems or test new architectures.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => (
                    <div key={project.slug} className="group relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-emerald-500/50 dark:hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full">
                        {/* Status Indicator */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${project.status === 'Active Development'
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800'
                                    : 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300'
                                }`}>
                                {project.status === 'Active Development' && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>}
                                {project.status}
                            </span>
                        </div>

                        {/* Image Preview */}
                        <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-950 relative">
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-xl font-bold text-white font-mono">{project.codename}</h3>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{project.title}</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                                {project.summary}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.techStack.slice(0, 4).map((tech: string) => (
                                    <span key={tech} className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                                {project.techStack.length > 4 && (
                                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">
                                        +{project.techStack.length - 4}
                                    </span>
                                )}
                            </div>

                            <Link href={`/labs/${project.slug}`} className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors mt-auto">
                                Read Build Log <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
