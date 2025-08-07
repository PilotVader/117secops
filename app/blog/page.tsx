"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Construction } from "lucide-react"

/* Original Blog Page Implementation - To be restored when blog is ready
import ClientBlogPage from "@/components/client-blog-page"

// Define the blog posts at the module level
const mockBlogPosts = [
  {
    slug: "introduction-to-zero-trust-copy",
    title: "Introduction to Zero Trust Architecture",
    description: "A practical guide to implementing zero trust principles in your organization's security strategy.",
    date: "2023-04-28",
    author: "Sarah Chen",
    category: "Industry Trends",
    tags: ["Zero Trust", "Network Security", "Implementation"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    slug: "welcome-to-our-blog",
    title: "Welcome to Our Cybersecurity Blog",
    description: "An introduction to our blog where we'll share insights, tips, and best practices for cybersecurity.",
    date: "2025-04-01",
    author: "Samson Otori",
    category: "Best Practices",
    tags: ["Welcome", "Introduction", "Cybersecurity"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    slug: "cybersecurity-tools-showcase",
    title: "Essential Cybersecurity Tools Showcase",
    description: "A visual guide to the most important cybersecurity tools every professional should know.",
    date: "2025-04-15",
    author: "Samson Otori",
    category: "Best Practices",
    tags: ["Tools", "Security", "Software", "Penetration Testing"],
    image: "/placeholder.svg?height=200&width=400&text=Cybersecurity+Tools",
  },
  {
    slug: "building-a-resilient-security-culture",
    title: "Building a Resilient Security Culture",
    description:
      "Strategies for fostering a strong, organization-wide approach to cybersecurity awareness and behavior.",
    date: "2025-04-05",
    author: "Samson Otori",
    category: "Best Practices",
    tags: ["Security Culture", "Cybersecurity Awareness", "Training"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    slug: "advanced-security-monitoring-tools",
    title: "Advanced Security Monitoring Tools",
    description: "A comprehensive guide to the latest security monitoring tools and techniques for modern enterprises.",
    date: "2025-05-01",
    author: "Samson Otori",
    category: "Best Practices",
    tags: ["Security Monitoring", "SIEM", "Threat Detection", "Tools"],
    image: "/placeholder.svg?height=200&width=400&text=Security+Monitoring",
  },
]

export default function BlogPage() {
  return <ClientBlogPage blogPosts={mockBlogPosts} />
}
*/

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Construction className="h-16 w-16 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Blog Coming Soon</h1>
        <p className="text-xl text-gray-600 mb-8">
          I'm working hard to bring you engaging content, but my blog section isn't quite ready yet.
        </p>
        <p className="text-lg text-gray-600 mb-12">
          In the meantime, why not check out the exciting projects I've been working on? From SOC analysis to security monitoring, I've got plenty of interesting content to share.
        </p>
        <Link href="/projects">
          <Button size="lg" className="cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white transition-colors">
            View My Projects
          </Button>
        </Link>
      </div>
    </div>
  )
}
