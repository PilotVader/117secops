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

export interface AdjacentBlogPosts {
  previous?: BlogPost
  next?: BlogPost
}

const sortBlogPostsByDate = (posts: BlogPost[]): BlogPost[] => {
  return [...posts].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    return dateB - dateA
  })
}

export function getAdjacentBlogPosts(slug: string): AdjacentBlogPosts {
  const posts = getAllBlogPosts()
  if (!posts.length) {
    return {}
  }

  const sortedPosts = sortBlogPostsByDate(posts)
  const currentIndex = sortedPosts.findIndex((post) => post.slug === slug)

  if (currentIndex === -1) {
    return {}
  }

  const currentPost = sortedPosts[currentIndex]
  let previous: BlogPost | undefined
  let next: BlogPost | undefined

  if (currentPost.series?.name) {
    const seriesPosts = sortedPosts
      .filter((post) => post.series?.name === currentPost.series?.name)
      .sort((a, b) => {
        const partA = a.series?.part ?? 0
        const partB = b.series?.part ?? 0
        return partA - partB
      })

    const seriesIndex = seriesPosts.findIndex((post) => post.slug === slug)

    if (seriesIndex > 0) {
      previous = seriesPosts[seriesIndex - 1]
    }
    if (seriesIndex < seriesPosts.length - 1) {
      next = seriesPosts[seriesIndex + 1]
    }

    if (!previous && currentIndex > 0) {
      previous = sortedPosts[currentIndex - 1]
    }

    if (!next && currentIndex < sortedPosts.length - 1) {
      next = sortedPosts[currentIndex + 1]
    }
  } else {
    if (currentIndex > 0) {
      previous = sortedPosts[currentIndex - 1]
    }
    if (currentIndex < sortedPosts.length - 1) {
      next = sortedPosts[currentIndex + 1]
    }
  }

  return { previous, next }
}
