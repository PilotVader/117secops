import type { BlogPost } from "@/components/blog/BlogCard"
import blogPostsData from "@/public/data/blog-posts.json"

// Get all blog posts from JSON data
export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData as BlogPost[]
}

// Get popular blog posts (for sidebar)
export function getPopularBlogPosts(): BlogPost[] {
  return blogPostsData.slice(0, 5) as BlogPost[]
}

// Get category counts
export function getCategoryCounts(): { [key: string]: number } {
  const counts: { [key: string]: number } = {}
  blogPostsData.forEach((post: any) => {
    counts[post.category] = (counts[post.category] || 0) + 1
  })
  return counts
}

// Search blog posts
export function searchBlogPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase()
  return (blogPostsData as BlogPost[]).filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.category.toLowerCase().includes(lowercaseQuery) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
  )
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return (blogPostsData as BlogPost[]).find(post => post.slug === slug)
}

// Get related blog posts
export function getRelatedBlogPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return (blogPostsData as BlogPost[]).filter(post => post.slug !== currentSlug).slice(0, limit)
}
