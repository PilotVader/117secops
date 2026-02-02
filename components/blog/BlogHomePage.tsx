"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { BlogCard } from "./BlogCard"
import { CategoryFilter } from "./CategoryFilter"
import { getAllBlogPosts, getCategoryCounts } from "@/lib/blog"
import type { BlogPost } from "./BlogCard"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function BlogHomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const allPosts = getAllBlogPosts()
  const categoryCounts = getCategoryCounts()

  // Get featured post (most recent)
  const featuredPost = allPosts[0]
  const otherPosts = allPosts.slice(1)

  const filteredPosts = useMemo(() => {
    let filtered = selectedCategory === "All" ? otherPosts : allPosts

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    return filtered
  }, [allPosts, otherPosts, selectedCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 px-4 md:px-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Cybersecurity Insights
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Practical analysis, incident breakdowns, and defensive security strategies
          </motion.p>
        </div>
      </motion.section>

      {/* Featured Post Section */}
      {selectedCategory === "All" && featuredPost && (
        <motion.section
          className="px-4 md:px-6 py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">Featured Article</h2>
            <Link
              href={`/blog/${featuredPost.slug}/`}
              className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-1 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                      {featuredPost.category}
                    </Badge>

                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {featuredPost.title}
                    </h3>

                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500 mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime} min read
                      </span>
                    </div>

                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.section>
      )}

      {/* Category Filter Section */}
      <motion.section
        className="px-4 md:px-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="container mx-auto max-w-6xl">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categoryCounts={categoryCounts}
          />
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <section className="px-4 md:px-6 pb-20">
        <div className="container mx-auto max-w-6xl">
          {filteredPosts.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                No posts found in {selectedCategory} category
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Try selecting a different category or browse all posts.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                View All Posts
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="group block h-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-purple-500/50 dark:hover:border-purple-500/30 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col h-[calc(100%-200px)]">
                        <Badge variant="secondary" className="w-fit mb-3 text-xs">
                          {post.category}
                        </Badge>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 pt-4 border-t border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime} min
                            </span>
                          </div>

                          <ArrowRight className="h-4 w-4 text-purple-500 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
