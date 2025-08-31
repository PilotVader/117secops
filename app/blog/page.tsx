"use client"

import { BlogHomePage } from "@/components/blog/BlogHomePage"
import PageTransition from "@/components/page-transition"

export default function BlogPage() {
  return (
    <PageTransition>
      <BlogHomePage />
    </PageTransition>
  )
}
