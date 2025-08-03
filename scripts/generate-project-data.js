// This script is run during the build process to generate static project data from markdown files
const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Paths
const projectsDirectory = path.join(process.cwd(), "content/projects")
const publicDirectory = path.join(process.cwd(), "public")
const dataDirectory = path.join(publicDirectory, "data")

// Ensure directories exist
if (!fs.existsSync(projectsDirectory)) {
  console.warn("Projects directory does not exist, creating it...")
  fs.mkdirSync(projectsDirectory, { recursive: true })
}

if (!fs.existsSync(dataDirectory)) {
  console.warn("Data directory does not exist, creating it...")
  fs.mkdirSync(dataDirectory, { recursive: true })
}

// Get all project markdown files
const getProjectFiles = () => {
  try {
    const fileNames = fs.readdirSync(projectsDirectory)
    return fileNames.filter((fileName) => fileName.endsWith(".md"))
  } catch (error) {
    console.error("Error reading project files:", error)
    return []
  }
}

// Parse project data from markdown files
const parseProjectData = async () => {
  const projectFiles = getProjectFiles()

  const projectsData = await Promise.all(
    projectFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      const matterResult = matter(fileContents)

      // Pass raw content instead of processing to HTML
      const content = matterResult.content

      // Apply defaults and handle flexible data formats
      const data = matterResult.data

      // Handle results - could be string, array, or missing
      let results = []
      if (data.results) {
        if (Array.isArray(data.results)) {
          results = data.results
        } else if (typeof data.results === "string") {
          results = [data.results]
        }
      }

      // Handle technologies - could be string, array, or missing
      let technologies = []
      if (data.technologies) {
        if (Array.isArray(data.technologies)) {
          technologies = data.technologies
        } else if (typeof data.technologies === "string") {
          technologies = [data.technologies]
        }
      }

      // Handle tags - could be string, array, or missing
      let tags = []
      if (data.tags) {
        if (Array.isArray(data.tags)) {
          tags = data.tags
        } else if (typeof data.tags === "string") {
          tags = [data.tags]
        }
      }

      // Handle images for lightbox
      let images = []
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
        category: data.category === "red" || data.category === "blue" || data.category === "Infrastructure" ? data.category : "blue",
        tags,
        content: content,
        image: data.image || "/placeholder.svg?height=300&width=600",
        technologies,
        images,
        series: data.series,
      }
    }),
  )

  // Sort projects by date
  return projectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// Main function to generate project data
const generateProjectData = async () => {
  const projects = await parseProjectData()

  if (projects.length === 0) {
    console.warn("No project files found. Make sure to add markdown files to content/projects/")
    return
  }

  console.log(`Found ${projects.length} project files.`)

  // Create a map of projects for static generation
  const projectsMap = {}
  projects.forEach((project) => {
    projectsMap[project.slug] = project
  })

  // Write projects data to JSON file
  fs.writeFileSync(path.join(dataDirectory, "projects.json"), JSON.stringify(projects, null, 2))

  // Write projects map to JSON file
  fs.writeFileSync(path.join(dataDirectory, "projects-map.json"), JSON.stringify(projectsMap, null, 2))

  console.log("Project data generated successfully!")
}

// Run the generator
generateProjectData()
