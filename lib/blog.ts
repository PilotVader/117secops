import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { cache } from "react"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  content: string
  image: string
}

// Make this function handle directory not existing
export async function getAllPostSlugs() {
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn("Blog directory does not exist:", postsDirectory)
      fs.mkdirSync(postsDirectory, { recursive: true })
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)

    // Filter out non-markdown files
    const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md"))

    return markdownFiles.map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ""),
      }
    })
  } catch (error) {
    console.error("Error reading blog directory:", error)
    return []
  }
}

export const getSortedPostsData = cache(async (): Promise<BlogPost[]> => {
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn("Blog directory does not exist:", postsDirectory)
      fs.mkdirSync(postsDirectory, { recursive: true })
      return []
    }

    // Get file names under /content/blog
    const fileNames = fs.readdirSync(postsDirectory)

    // Filter out non-markdown files
    const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md"))

    if (markdownFiles.length === 0) {
      return []
    }

    const allPostsData = markdownFiles.map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "")

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the slug
      return {
        slug,
        ...(matterResult.data as Omit<BlogPost, "slug" | "content">),
        content: "",
      }
    })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("Error getting sorted posts data:", error)
    return []
  }
})

export async function getPostData(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`Blog post not found: ${slug}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the slug and contentHtml
    return {
      slug,
      ...(matterResult.data as Omit<BlogPost, "slug" | "content">),
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error getting post data for slug ${slug}:`, error)
    return null
  }
}
