import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog"
import BlogPostPage from "@/components/blog/BlogPostPage"
import { notFound } from "next/navigation"

// Generate static params for all blog posts
export function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostRoute({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const postData = getBlogPostBySlug(slug)

  if (!postData) {
    notFound()
  }

  return <BlogPostPage slug={slug} />
}
