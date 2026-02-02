"use client"

import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import PageTransition from "@/components/page-transition"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react"
import { BlogContentRenderer } from "@/components/blog-content-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { ReadingProgress } from "@/components/reading-progress"
import { ShareButtons } from "@/components/share-buttons"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { AuthorBio } from "@/components/author-bio"
import { RelatedPosts } from "@/components/related-posts"
import type { BlogPost } from "@/components/blog/BlogCard"

interface ClientBlogPostProps {
  postData: BlogPost
  allPosts: BlogPost[]
}

export function ClientBlogPost({ postData, allPosts }: ClientBlogPostProps) {
  // If no post data is provided, show 404
  if (!postData) {
    notFound()
  }

  // Get related posts from the same category
  const relatedPosts = allPosts
    .filter(post => post.category === postData.category && post.slug !== postData.slug)
    .slice(0, 3)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://117secops.com/blog/${postData.slug}/`

  return (
    <PageTransition>
      <ReadingProgress />
      
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: postData.title },
              ]}
            />

            <Link
              href="/blog/"
              className="inline-flex items-center text-slate-500 hover:text-purple-600 mb-8 transition-colors duration-200 font-medium group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to all posts
            </Link>

            <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-12">
              <div className="flex flex-wrap gap-4 items-center mb-6">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1 text-sm font-semibold rounded-full dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                  {postData.category}
                </Badge>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{new Date(postData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{postData.readTime} min read</span>
                </div>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <User className="mr-2 h-4 w-4" />
                  <span>Samson Otori</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-8 leading-tight">
                {postData.title}
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {postData.excerpt}
              </p>

              <ShareButtons title={postData.title} url={currentUrl} />
            </div>

            <div className="w-full relative rounded-2xl overflow-hidden shadow-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-12">
              <img
                src={postData.image || "/placeholder.svg"}
                alt={postData.title}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>

          {/* Main content with TOC sidebar */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12">
            <div className="max-w-4xl">
              <div className="prose prose-lg prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-purple-600 prose-img:rounded-xl prose-headings:scroll-mt-24">
                <BlogContentRenderer content={postData.content} groupId={`blog-${postData.slug}`} />
              </div>



              {/* Tags */}
              <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center flex-wrap gap-3">
                  <Tag className="h-5 w-5 text-purple-500 mr-2" />
                  {postData.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1 text-sm font-medium dark:bg-slate-800 dark:text-slate-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <AuthorBio />

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <RelatedPosts posts={relatedPosts} currentSlug={postData.slug} />
              )}
            </div>

            {/* Table of Contents - Sticky Sidebar */}
            <div className="hidden xl:block">
              <TableOfContents content={postData.content} />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
