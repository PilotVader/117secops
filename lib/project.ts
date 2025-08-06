import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { cache } from "react"

const projectsDirectory = path.join(process.cwd(), "content/projects")
const dataDirectory = path.join(process.cwd(), "public/data")

export interface Project {
  slug: string
  title: string
  description: string
  date?: string
  author?: string
  client?: string
  challenge?: string
  solution?: string
  results?: string[]
  category?: "red" | "blue" | "Infrastructure"
  tags?: string[]
  content: string
  image?: string
  technologies?: string[]
  images?: { src: string; alt: string }[]
  series?: {
    name: string
    part: number
    totalParts?: number
  }
}

// Make this function handle directory not existing
export async function getAllProjectSlugs() {
  try {
    // Check if we're in production and have pre-generated data
    if (process.env.NODE_ENV === "production" && fs.existsSync(path.join(dataDirectory, "projects.json"))) {
      const projectsData = JSON.parse(fs.readFileSync(path.join(dataDirectory, "projects.json"), "utf8"))
      return projectsData.map((project: Project) => ({
        slug: project.slug,
      }))
    }

    // Otherwise, read from the projects directory
    if (!fs.existsSync(projectsDirectory)) {
      console.warn("Projects directory does not exist:", projectsDirectory)
      fs.mkdirSync(projectsDirectory, { recursive: true })
      return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)

    // Filter out non-markdown files
    const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md"))

    return markdownFiles.map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ""),
      }
    })
  } catch (error) {
    console.error("Error reading projects directory:", error)
    return []
  }
}

export const getSortedProjectsData = cache(async (): Promise<Project[]> => {
  try {
    // Check if we're in production and have pre-generated data
    if (process.env.NODE_ENV === "production" && fs.existsSync(path.join(dataDirectory, "projects.json"))) {
      return JSON.parse(fs.readFileSync(path.join(dataDirectory, "projects.json"), "utf8"))
    }

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
      // If no markdown files exist, return empty array
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
          const imageRegex = /!\[(.*?)\]\((.*?)\)/g
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
          category: data.category === "Infrastructure" ? "Infrastructure" as const : (data.category === "red" ? "red" as const : "blue" as const),
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
    console.error("Error getting sorted projects data:", error)
    return []
  }
})

export async function getProjectData(slug: string): Promise<Project | null> {
  try {
    // Check if we're in production and have pre-generated data
    if (process.env.NODE_ENV === "production" && fs.existsSync(path.join(dataDirectory, "projects-map.json"))) {
      const projectsMap = JSON.parse(fs.readFileSync(path.join(dataDirectory, "projects-map.json"), "utf8"))
      return projectsMap[slug] || null
    }

    const fullPath = path.join(projectsDirectory, `${slug}.md`)

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`Project not found: ${slug}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Pass raw markdown content to let BlogContentRenderer handle custom components
    const contentHtml = matterResult.content

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
      category: data.category === "Infrastructure" ? "Infrastructure" as const : (data.category === "red" ? "red" as const : "blue" as const),
      tags,
      content: contentHtml,
      image: data.image || "/placeholder.svg?height=300&width=600",
      technologies,
      images,
      series: data.series,
    }
  } catch (error) {
    console.error(`Error getting project data for slug ${slug}:`, error)
    return null
  }
}

// Helper function to get all projects as a map for static generation
export async function getProjectsMap(): Promise<Record<string, Project>> {
  // Check if we're in production and have pre-generated data
  if (process.env.NODE_ENV === "production" && fs.existsSync(path.join(dataDirectory, "projects-map.json"))) {
    return JSON.parse(fs.readFileSync(path.join(dataDirectory, "projects-map.json"), "utf8"))
  }

  const projects = await getSortedProjectsData()
  const projectsMap: Record<string, Project> = {}

  for (const project of projects) {
    projectsMap[project.slug] = project
  }

  return projectsMap
}

// Helper function to group projects by series
export function groupProjectsBySeries(projects: Project[]): {
  series: Record<string, Project[]>;
  standalone: Project[];
} {
  const seriesMap: Record<string, Project[]> = {};
  const standalone: Project[] = [];

  projects.forEach(project => {
    if (project.series?.name) {
      if (!seriesMap[project.series.name]) {
        seriesMap[project.series.name] = [];
      }
      seriesMap[project.series.name].push(project);
    } else {
      standalone.push(project);
    }
  });

  // Sort projects within each series by part number
  Object.values(seriesMap).forEach(seriesProjects => {
    seriesProjects.sort((a, b) => (a.series?.part || 0) - (b.series?.part || 0));
  });

  return { series: seriesMap, standalone };
}
