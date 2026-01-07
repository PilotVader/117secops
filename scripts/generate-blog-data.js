const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Paths
const blogDirectory = path.join(process.cwd(), "content/blog")
const publicDirectory = path.join(process.cwd(), "public")
const dataDirectory = path.join(publicDirectory, "data")

// Ensure directories exist
if (!fs.existsSync(blogDirectory)) {
    console.warn("Blog directory does not exist, creating it...")
    fs.mkdirSync(blogDirectory, { recursive: true })
}

if (!fs.existsSync(dataDirectory)) {
    console.warn("Data directory does not exist, creating it...")
    fs.mkdirSync(dataDirectory, { recursive: true })
}

// Get all blog markdown files
const getBlogFiles = () => {
    try {
        const fileNames = fs.readdirSync(blogDirectory)
        return fileNames.filter((fileName) => fileName.endsWith(".md"))
    } catch (error) {
        console.error("Error reading blog files:", error)
        return []
    }
}

// Parse blog data from markdown files
const parseBlogData = async () => {
    const blogFiles = getBlogFiles()

    const blogPosts = await Promise.all(
        blogFiles.map(async (fileName) => {
            const slug = fileName.replace(/\.md$/, "")
            const fullPath = path.join(blogDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, "utf8")

            const matterResult = matter(fileContents)
            const content = matterResult.content
            const data = matterResult.data

            // Helper to handle array or string fields
            const normalizeArray = (field) => {
                if (!field) return []
                return Array.isArray(field) ? field : [field]
            }

            return {
                slug,
                title: data.title || slug.replace(/-/g, " "),
                excerpt: data.description || data.excerpt || "",
                content: content,
                date: data.date || new Date().toISOString().split("T")[0],
                author: data.author || "Samson Otori",
                category: data.category || "General",
                readTime: parseInt(data.readTime || data.read_time || "5", 10), // Default read time if missing
                image: data.image || "/placeholder.svg?height=300&width=600",
                tags: normalizeArray(data.tags),
            }
        }),
    )

    // Sort blog posts by date
    return blogPosts.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

// Main function to generate blog data
const generateBlogData = async () => {
    const posts = await parseBlogData()

    if (posts.length === 0) {
        console.warn("No blog files found. Make sure to add markdown files to content/blog/")
        return
    }

    console.log(`Found ${posts.length} blog files.`)

    // Write blog posts data to JSON file
    fs.writeFileSync(path.join(dataDirectory, "blog-posts.json"), JSON.stringify(posts, null, 2))

    console.log("Blog data generated successfully!")
}

// Run the generator
generateBlogData()
