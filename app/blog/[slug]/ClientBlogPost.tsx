"use client"

import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import PageTransition from "@/components/page-transition"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { BlogContentRenderer } from "@/components/blog-content-renderer"
import { ImageGallery } from "@/components/ui/image-gallery"

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  content: string
  image: string
  gallery?: {
    src: string
    alt: string
  }[]
}

export function ClientBlogPost({ postData }: { postData: BlogPost }) {
  // If no post data is provided, show 404
  if (!postData) {
    notFound()
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-lg mx-auto">
          <Link
            href="/blog/"
            className="inline-flex items-center text-slate-500 hover:text-purple-600 mb-12 transition-colors duration-200 font-medium group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to all posts
          </Link>

          <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-12">
            <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1 text-sm font-semibold rounded-full dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                {postData.category}
              </Badge>
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{postData.date}</span>
              </div>
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                <User className="mr-2 h-4 w-4" />
                <span>{postData.author}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-8 leading-tight text-center">
              {postData.title}
            </h1>

            <div className="w-full relative rounded-2xl overflow-hidden shadow-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img
                src={postData.image || "/placeholder.svg"}
                alt={postData.title}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>

          <div className="prose prose-lg prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-purple-600 prose-img:rounded-xl">
            <BlogContentRenderer content={postData.content} groupId={`blog-${postData.slug}`} />
          </div>

          {/* Image Gallery Section */}
          {postData.gallery && (
            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100 tracking-tight">Project Gallery</h2>
              <ImageGallery images={postData.gallery} />
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center flex-wrap gap-3">
              <Tag className="h-5 w-5 text-purple-500 mr-2" />
              {postData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1 text-sm font-medium dark:bg-slate-800 dark:text-slate-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
