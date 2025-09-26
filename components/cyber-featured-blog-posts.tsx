"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { BlogPost } from "@/components/blog/BlogCard"
import { BookOpen, ArrowRight } from "lucide-react"

interface CyberFeaturedBlogPostsProps {
  blogPosts: BlogPost[]
}

export function CyberFeaturedBlogPosts({ blogPosts }: CyberFeaturedBlogPostsProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "foundations":
        return { color: '#2563eb' } // blue-600
      case "incidents":
        return { color: '#dc2626' } // red-600
      case "trends":
        return { color: '#a855f7' } // purple-600
      case "insights":
        return { color: '#16a34a' } // green-600
      case "resources":
        return { color: '#ea580c' } // orange-600
      default:
        return { color: '#2563eb' } // blue-600
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 matrix-bg opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Badge variant="outline" className="cyber-border bg-card/50 backdrop-blur-sm">
              <BookOpen className="w-3 h-3 mr-1" />
              Featured Posts
            </Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 font-mono"
          >
            <span className="text-cyber-glow">Cybersecurity</span>
            <br />
            <span className="text-cyber-glow">
              Blog
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Insights, research, and lessons from my cybersecurity journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-full"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="cyber-border bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden h-full flex flex-col min-h-[500px] hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                  {/* Blog Post Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.image || "/images/blog-placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Blog Post Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="cyber-border bg-card/30">
                        <span style={getCategoryColor(post.category)} className="flex items-center">
                          {post.category}
                        </span>
                      </Badge>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 font-mono text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4 flex-shrink-0">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={`${tag}-${tagIndex}`}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-muted/50 rounded border border-gray-200 dark:border-border text-gray-800 dark:text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-muted/50 rounded border border-gray-200 dark:border-border text-gray-800 dark:text-muted-foreground">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Read More Button */}
                    <div className="flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Blog Posts Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/blog">
            <Button
              size="lg"
              className="cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View All Blog Posts
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
