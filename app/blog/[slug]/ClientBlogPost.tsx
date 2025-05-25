"use client"

import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import PageTransition from "@/components/page-transition"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { BlogContentRenderer } from "@/components/blog-content-renderer"

export function ClientBlogPost({ postData }: { postData: any }) {
  // If no post data is provided, show 404
  if (!postData) {
    notFound()
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors duration-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{postData.title}</h1>

            <div className="flex flex-wrap gap-4 items-center text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{postData.date}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{postData.author}</span>
              </div>
              <Badge variant="outline" className="bg-primary/5 border-primary/20">
                {postData.category}
              </Badge>
            </div>

            <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
              <Image src={postData.image || "/placeholder.svg"} alt={postData.title} fill className="object-cover" />
            </div>
          </div>

          <BlogContentRenderer content={postData.content} groupId={`blog-${postData.slug}`} />

          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="h-4 w-4 text-primary mr-2" />
              {postData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/5">
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
