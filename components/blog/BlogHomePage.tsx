"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { BlogCard } from "./BlogCard"
import { CategoryFilter } from "./CategoryFilter"
import { BlogSidebar } from "./BlogSidebar"
import { getAllBlogPosts, getCategoryCounts } from "@/lib/blog"
import type { BlogPost } from "./BlogCard"

export function BlogHomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const allPosts = getAllBlogPosts()
  const categoryCounts = getCategoryCounts()

  const filteredPosts = useMemo(() => {
    let filtered = allPosts

    // Filter by category only
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    return filtered
  }, [allPosts, selectedCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Cybersecurity Blog
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Insights, research, and lessons from my cybersecurity journey
          </motion.p>
        </div>
      </motion.section>

      {/* Category Filter Section - Centered */}
      <motion.section
        className="px-4 md:px-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container mx-auto">
          <div className="flex justify-center">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              categoryCounts={categoryCounts}
            />
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="px-4 md:px-6 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-3">
              {filteredPosts.length === 0 ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h2 className="text-2xl font-bold mb-4">
                    No posts found in {selectedCategory} category
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Try selecting a different category or browse all posts.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="cyber-border bg-transparent text-foreground hover:bg-primary hover:text-white px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    View All Posts
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {filteredPosts.map((post, index) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      variant="featured"
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                popularPosts={allPosts}
                categoryCounts={categoryCounts}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
