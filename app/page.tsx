import { CyberHero } from "@/components/cyber-hero"
import { CyberFeaturedProjects } from "@/components/cyber-featured-projects"
import { CyberFeaturedBlogPosts } from "@/components/cyber-featured-blog-posts"
import { getSortedProjectsData } from "@/lib/project"
import { getAllBlogPosts } from "@/lib/blog"

export default async function Home() {
  // Get the 3 most recent projects
  const projects = await getSortedProjectsData()
  const featuredProjects = projects.slice(0, 3)
  
  // Get the 3 most recent blog posts
  const blogPosts = getAllBlogPosts()
  const featuredBlogPosts = blogPosts.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <main>
        <CyberHero />
        <CyberFeaturedProjects projects={featuredProjects} />
        <CyberFeaturedBlogPosts blogPosts={featuredBlogPosts} />
      </main>
    </div>
  )
}
