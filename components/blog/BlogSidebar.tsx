"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { TrendingUp, Clock, Calendar } from "lucide-react"
import type { BlogPost } from "./BlogCard"

interface BlogSidebarProps {
  popularPosts: BlogPost[]
  categoryCounts: { [key: string]: number }
  className?: string
}

export function BlogSidebar({ popularPosts, categoryCounts, className = "" }: BlogSidebarProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
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

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Most Popular Posts */}
      <Card className="cyber-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Most Popular
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularPosts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.div
                className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getCategoryColor(post.category)}`}
                    >
                      {post.category}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="cyber-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <motion.div
                key={category}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200 cursor-pointer group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getCategoryColor(category)}`}
                  >
                    {category}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {count}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>


    </motion.div>
  )
}
