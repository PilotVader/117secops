import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Layers, Terminal } from "lucide-react"
import { BlogContentRenderer } from "@/components/blog-content-renderer"
import buildsProjects from "@/public/data/builds-projects.json"

interface BuildProject {
    slug: string
    codename: string
    title: string
    status: string
    image: string
    techStack: string[]
    summary: string
    content: string
}

export function generateStaticParams() {
    return buildsProjects.map((project: BuildProject) => ({
        slug: project.slug,
    }))
}

export default async function BuildProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = buildsProjects.find((p: any) => p.slug === slug) as BuildProject | undefined

    if (!project) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/builds/"
                    className="inline-flex items-center text-slate-500 hover:text-emerald-500 mb-12 transition-colors duration-200 font-mono text-sm group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                    ./return_to_builds
                </Link>

                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 dark:text-emerald-400 font-mono">
                            {project.status}
                        </Badge>
                        <span className="text-slate-400 font-mono text-sm">Codename: {project.codename}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 mb-6 tracking-tight">
                        {project.title}
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                        {project.summary}
                    </p>
                </div>

                {/* Tech Stack Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-y border-slate-200 dark:border-slate-800 py-8">
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center">
                            <Layers className="w-4 h-4 mr-2" />
                            Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                                <Badge key={tech} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center">
                            <Terminal className="w-4 h-4 mr-2" />
                            System Architecture
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                            Restricted access. Engineering logs only.
                        </p>
                    </div>
                </div>

                {/* Main Content / Image */}
                <div className="prose prose-lg prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-emerald-500 prose-img:rounded-xl">
                    {project.image && (
                        <div className="mb-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
                            <img src={project.image} alt={project.title} className="w-full h-auto" />
                        </div>
                    )}

                    <BlogContentRenderer content={project.content} groupId={`builds-${project.slug}`} />
                </div>
            </div>
        </div>
    )
}
