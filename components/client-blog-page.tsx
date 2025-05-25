"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animations"
import { useState } from "react"

export default function ClientBlogPage({ blogPosts }) {
  // State to track how many posts to show in each category
  const [visiblePostCounts, setVisiblePostCounts] = useState({
    all: 6,
    attacks: 6,
    trends: 6,
    "best-practices": 6,
  })

  // Constants for how many posts to show per load
  const POSTS_PER_LOAD = 3

  // Function to load more posts for a specific category
  const loadMorePosts = (category) => {
    setVisiblePostCounts((prev) => ({
      ...prev,
      [category]: prev[category] + POSTS_PER_LOAD,
    }))
  }

  // Filter posts by category
  const attacksPosts = blogPosts.filter((post) => post.category === "Recent Attacks")
  const trendsPosts = blogPosts.filter((post) => post.category === "Industry Trends")
  const bestPracticesPosts = blogPosts.filter((post) => post.category === "Best Practices")

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <motion.div
          className="flex flex-col items-center text-center space-y-4 mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-gradient" variants={fadeIn}>
            My Cybersecurity Blog
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-3xl" variants={fadeIn}>
            Stay informed about the latest cybersecurity trends, attacks, and best practices
          </motion.p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full mb-12">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <TabsList className="border border-primary/20">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="attacks">Recent Attacks</TabsTrigger>
              <TabsTrigger value="trends">Industry Trends</TabsTrigger>
              <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, visiblePostCounts.all).map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>

            {/* See More button for all posts */}
            {visiblePostCounts.all < blogPosts.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  onClick={() => loadMorePosts("all")}
                  className="bg-primary hover:bg-primary/90 shadow-primary/10"
                >
                  See More
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="attacks" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attacksPosts.slice(0, visiblePostCounts.attacks).map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>

            {/* See More button for attacks posts */}
            {visiblePostCounts.attacks < attacksPosts.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  onClick={() => loadMorePosts("attacks")}
                  className="bg-primary hover:bg-primary/90 shadow-primary/10"
                >
                  See More
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="trends" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendsPosts.slice(0, visiblePostCounts.trends).map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>

            {/* See More button for trends posts */}
            {visiblePostCounts.trends < trendsPosts.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  onClick={() => loadMorePosts("trends")}
                  className="bg-primary hover:bg-primary/90 shadow-primary/10"
                >
                  See More
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="best-practices" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestPracticesPosts.slice(0, visiblePostCounts["best-practices"]).map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>

            {/* See More button for best practices posts */}
            {visiblePostCounts["best-practices"] < bestPracticesPosts.length && (
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  onClick={() => loadMorePosts("best-practices")}
                  className="bg-primary hover:bg-primary/90 shadow-primary/10"
                >
                  See More
                </Button>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}

function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden transition-all duration-400 hover:shadow-lg hover:shadow-primary/10 group h-full flex flex-col">
        <div className="aspect-video relative">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-400 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-400" />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-primary/5 border-primary/20">
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground">{post.date}</span>
          </div>
          <CardTitle className="text-xl hover:text-primary transition-colors duration-400">
            <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
          </CardTitle>
          <CardDescription>By {post.author}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">COMING SOON!!</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {post.tags &&
              post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-primary/5">
                  {tag}
                </Badge>
              ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-primary/30 hover:border-primary transition-all duration-400"
            asChild
          >
            <Link href={`/blog/${post.slug}/`}>Read More</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
