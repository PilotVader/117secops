import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog"
import { ClientBlogPost } from "./ClientBlogPost"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Generate static params for all blog posts
export function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const postData = getBlogPostBySlug(slug)

  if (!postData) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const baseUrl = 'https://www.117secops.com'
  const postUrl = `${baseUrl}/blog/${slug}`
  
  return {
    title: postData.title,
    description: postData.excerpt,
    openGraph: {
      title: `${postData.title} | 117 SecOps`,
      description: postData.excerpt,
      url: postUrl,
      images: postData.image ? [postData.image] : undefined,
      type: 'article',
      publishedTime: postData.date,
      authors: ['Samson Otori'],
      tags: postData.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.excerpt,
      images: postData.image ? [postData.image] : undefined,
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

export default async function BlogPostRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postData = getBlogPostBySlug(slug)
  const allPosts = getAllBlogPosts()

  if (!postData) {
    notFound()
  }

  return <ClientBlogPost postData={postData} allPosts={allPosts} />
}
