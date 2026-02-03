"use client"

import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Clock, X as Twitter, Linkedin, Facebook } from "lucide-react"
import { BlogContentRenderer } from "@/components/blog-content-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { AuthorBio } from "@/components/author-bio"
import { RelatedPosts } from "@/components/related-posts"
import type { BlogPost } from "@/components/blog/BlogCard"

interface ClientBlogPostProps {
  postData: BlogPost
  allPosts: BlogPost[]
}

export function ClientBlogPost({ postData, allPosts }: ClientBlogPostProps) {
  if (!postData) {
    notFound()
  }

  const relatedPosts = allPosts
    .filter(post => post.category === postData.category && post.slug !== postData.slug)
    .slice(0, 3)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://117secops.com/blog/${postData.slug}/`

  // Share functions
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(postData.title)}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank')
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank')
  }

  return (
    <>
      
      <article className="min-h-screen bg-white dark:bg-slate-950">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
            {/* Category Badge */}
            <div className="flex justify-center mb-6">
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 text-sm font-semibold rounded-full">
                {postData.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-900 dark:text-white mb-6 leading-tight">
              {postData.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-center text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              {postData.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{postData.readTime} min read</span>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={shareOnTwitter}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-lg transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-lg transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                onClick={shareOnFacebook}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-lg transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {postData.image && (
          <div className="px-4 pb-8">
            <div className="max-w-7xl mx-auto">
              <img
                src={postData.image}
                alt={postData.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Sidebar TOC (Desktop Only) */}
            <aside className="hidden xl:block xl:col-span-3">
              <div className="sticky top-24">
                <TableOfContents content={postData.content} />
              </div>
            </aside>

            {/* Article Content */}
            <div className="xl:col-span-9">
              <div className="max-w-3xl mx-auto">
                {/* Mobile TOC */}
                <div className="xl:hidden mb-8">
                  <TableOfContents content={postData.content} />
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <BlogContentRenderer content={postData.content} />
                </div>

                {/* Tags */}
                {postData.tags && postData.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap gap-2">
                      {postData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-sm px-3 py-1 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                <div className="mt-12">
                  <AuthorBio />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 py-16">
            <div className="container mx-auto px-4">
              <RelatedPosts posts={relatedPosts} currentSlug={postData.slug} />
            </div>
          </div>
        )}
      </article>
    </>
  )
}
