"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar, User } from "lucide-react"
import { fadeIn, staggerContainer } from "@/lib/animations"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  readTime: number
  image: string
  tags?: string[]
  series?: {
    name: string
    part: number
    totalParts?: number
  }
}

interface BlogCardProps {
  post: BlogPost
  variant?: "featured" | "compact"
  index?: number
}

export function BlogCard({ post, variant = "featured", index = 0 }: BlogCardProps) {
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

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link href={`/blog/${post.slug}`}>
          <Card className="cyber-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getCategoryColor(post.category)}`}
                    >
                      {post.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      By: Otori Samson
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card className="cyber-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group overflow-hidden h-full flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

              {/* Category Badge - Overlay on Image Top Left */}
              <div className="absolute top-3 left-3 z-10">
                <Badge
                  variant="outline"
                  className={`${getCategoryColor(post.category)} bg-black/50 backdrop-blur-md border-opacity-50`}
                >
                  {post.category}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2 leading-snug">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-[10px] uppercase tracking-wider px-2 py-1 bg-muted/50 rounded border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50 mt-auto">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} min
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
