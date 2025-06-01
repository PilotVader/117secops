import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { Project } from "@/lib/project"

const projectsDirectory = path.join(process.cwd(), "content/projects")

// Make this route static for export
export const dynamic = "force-static"

export async function getSortedProjectsData(): Promise<Project[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(projectsDirectory)) {
      console.warn("Projects directory does not exist:", projectsDirectory)
      fs.mkdirSync(projectsDirectory, { recursive: true })
      return []
    }

    // Get file names under /content/projects
    const fileNames = fs.readdirSync(projectsDirectory)

    // Filter out non-markdown files
    const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md"))

    if (markdownFiles.length === 0) {
      return []
    }

    const allProjectsData = await Promise.all(
      markdownFiles.map(async (fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, "")

        // Read markdown file as string
        const fullPath = path.join(projectsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Process content to HTML
        const processedContent = await remark().use(html).process(matterResult.content)
        const contentHtml = processedContent.toString()

        // Apply defaults and handle flexible data formats
        const data = matterResult.data

        // Handle results - could be string, array, or missing
        let results: string[] = []
        if (data.results) {
          if (Array.isArray(data.results)) {
            results = data.results
          } else if (typeof data.results === "string") {
            results = [data.results]
          }
        }

        // Handle technologies - could be string, array, or missing
        let technologies: string[] = []
        if (data.technologies) {
          if (Array.isArray(data.technologies)) {
            technologies = data.technologies
          } else if (typeof data.technologies === "string") {
            technologies = [data.technologies]
          }
        }

        // Handle tags - could be string, array, or missing
        let tags: string[] = []
        if (data.tags) {
          if (Array.isArray(data.tags)) {
            tags = data.tags
          } else if (typeof data.tags === "string") {
            tags = [data.tags]
          }
        }

        // Handle images for lightbox
        let images: { src: string; alt: string }[] = []
        if (data.images) {
          if (Array.isArray(data.images)) {
            images = data.images
          } else if (typeof data.images === "object") {
            images = [data.images]
          }
        }

        // Extract images from content if not explicitly defined
        if (images.length === 0) {
          // Simple regex to find markdown image syntax
          const imageRegex = /!\[(.*?)\]$$(.*?)$$/g
          let match
          while ((match = imageRegex.exec(matterResult.content)) !== null) {
            images.push({
              alt: match[1] || "Project image",
              src: match[2] || "/placeholder.svg",
            })
          }
        }

        // Combine the data with the slug and apply defaults
        return {
          slug,
          title: data.title || slug.replace(/-/g, " "),
          description: data.description || "",
          date: data.date || new Date().toISOString().split("T")[0],
          author: data.author || "Samson Otori",
          client: data.client || "Personal Project",
          challenge: data.challenge || "",
          solution: data.solution || "",
          results,
          category: data.category === "red" || data.category === "blue" ? data.category : "blue",
          tags,
          content: contentHtml,
          image: data.image || "/placeholder.svg?height=300&width=600",
          technologies,
          images,
          series: data.series,
        }
      }),
    )

    // Sort projects by date
    return allProjectsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("Error getting projects data:", error)
    return []
  }
}

export async function GET() {
  try {
    const projects = await getSortedProjectsData()
    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Error getting projects data:", error)
    return NextResponse.json({ projects: [] })
  }
}
