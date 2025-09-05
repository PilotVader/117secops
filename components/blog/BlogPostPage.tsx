"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calendar, Eye, Share2, Linkedin, Twitter, Copy, Check, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getBlogPostBySlug, getRelatedBlogPosts, getPopularBlogPosts, getCategoryCounts } from "@/lib/blog"
import { BlogSidebar } from "./BlogSidebar"
import { BlogCard } from "./BlogCard"
import { BlogContentRenderer } from "@/components/blog-content-renderer"
import type { BlogPost } from "./BlogCard"

interface BlogPostPageProps {
  slug: string
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([])
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const postData = getBlogPostBySlug(slug)
    if (postData) {
      setPost(postData)
      setRelatedPosts(getRelatedBlogPosts(slug, 3))
      setPopularPosts(getPopularBlogPosts())
      setCategoryCounts(getCategoryCounts())
    }
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "foundations":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "incidents":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "trends":
        return "bg-purple-600/20 text-purple-400 border-purple-600/30"
      case "insights":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "resources":
        return "bg-orange-600/20 text-orange-400 border-orange-600/30"
      default:
        return "bg-muted/50 text-muted-foreground border-border"
    }
  }

  const handleShare = (platform: string) => {
    const title = post?.title || "Check out this article"
    const url = `${window.location.origin}/blog/${slug}`

    switch (platform) {
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">📄</div>
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog/">
          <Button className="cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Back Navigation - Simple and Reliable */}
      <Link href="/blog/">
        <button className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors duration-400">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all blog posts
        </button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Hero Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge 
                variant="outline" 
                className={`${getCategoryColor(post.category)}`}
              >
                {post.category}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                By: Otori Samson, Cybersecurity Analyst
              </span>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare("linkedin")}
                className="cyber-border bg-transparent text-foreground hover:bg-blue-600 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare("twitter")}
                className="cyber-border bg-transparent text-foreground hover:bg-blue-400 hover:text-white"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare("copy")}
                className="cyber-border bg-transparent text-foreground hover:bg-green-600 hover:text-white"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="blog-content mb-12">
            <BlogContentRenderer 
              content={post.content}
              groupId="blog-post"
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted/50 rounded-full border border-border text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-border pt-8">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="space-y-6">
                {relatedPosts.map((relatedPost, index) => (
                  <BlogCard
                    key={relatedPost.slug}
                    post={relatedPost}
                    variant="compact"
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BlogSidebar
            popularPosts={popularPosts}
            categoryCounts={categoryCounts}
          />
        </div>
      </div>
    </div>
  )
}
