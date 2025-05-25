import { ClientBlogPost } from "./ClientBlogPost"

// This data needs to be available at the module level for generateStaticParams
const posts = {
  "introduction-to-zero-trust-copy": {
    slug: "introduction-to-zero-trust-copy",
    title: "Introduction to Zero Trust Architecture",
    description: "A practical guide to implementing zero trust principles in your organization's security strategy.",
    date: "2023-04-28",
    author: "Sarah Chen",
    category: "Industry Trends",
    tags: ["Zero Trust", "Network Security", "Implementation"],
    image: "/placeholder.svg?height=200&width=400",
    content: `<h1>Introduction to Zero Trust Architecture</h1>
    <p>Zero Trust is a security concept centered on the belief that organizations should not automatically trust anything inside or outside their perimeters and instead must verify anything and everything trying to connect to its systems before granting access.</p>`,
  },
  "welcome-to-our-blog": {
    slug: "welcome-to-our-blog",
    title: "Welcome to Our Cybersecurity Blog",
    description: "An introduction to our blog where we'll share insights, tips, and best practices for cybersecurity.",
    date: "2025-04-01",
    author: "Samson Otori",
    category: "Best Practices",
    tags: ["Welcome", "Introduction", "Cybersecurity"],
    image: "/placeholder.svg?height=200&width=400",
    content: `<h1>Welcome to Our Cybersecurity Blog</h1>
    <p>Thank you for visiting our cybersecurity blog! This is where we'll share valuable insights, tips, and best practices to help you strengthen your security posture and stay protected in an increasingly complex digital landscape.</p>`,
  },
  "cybersecurity-tools-showcase": {
    slug: "cybersecurity-tools-showcase",
    title: "Essential Cybersecurity Tools Showcase",
    description: "A visual guide to the most important cybersecurity tools every professional should know.",
    date: "2025-04-15",
    author: "Samson Otori",
    category: "Best Practices",
    tags: ["Tools", "Security", "Software", "Penetration Testing"],
    image: "/placeholder.svg?height=200&width=400&text=Cybersecurity+Tools",
    content: `<h1>Essential Cybersecurity Tools Showcase</h1>
    <p>In today's rapidly evolving threat landscape, cybersecurity professionals need a robust toolkit to defend against sophisticated attacks. This visual guide showcases essential tools that every security professional should be familiar with.</p>`,
  },
  "building-a-resilient-security-culture": {
    slug: "building-a-resilient-security-culture",
    title: "Building a Resilient Security Culture",
    description:
      "Strategies for fostering a strong, organization-wide approach to cybersecurity awareness and behavior.",
    date: "2025-04-05",
    author: "Samson Otori",
    category: "Best Practices",
    tags: ["Security Culture", "Cybersecurity Awareness", "Training"],
    image: "/placeholder.svg?height=200&width=400",
    content: `<h1>Building a Resilient Security Culture</h1>
    <p>A resilient security culture is the foundation of any strong cybersecurity strategy. It goes beyond technology—focusing on the people, behaviors, and mindset required to defend against evolving threats.</p>`,
  },
  "advanced-security-monitoring-tools": {
    slug: "advanced-security-monitoring-tools",
    title: "Advanced Security Monitoring Tools",
    description: "A comprehensive guide to the latest security monitoring tools and techniques for modern enterprises.",
    date: "2025-05-01",
    author: "Samson Otori",
    category: "Best Practices",
    tags: ["Security Monitoring", "SIEM", "Threat Detection", "Tools"],
    image: "/placeholder.svg?height=200&width=400&text=Security+Monitoring",
    content: `<h1>Advanced Security Monitoring Tools</h1>
    <p>In today's complex threat landscape, having robust security monitoring tools is essential for detecting and responding to threats quickly. This guide explores the latest tools and techniques for effective security monitoring.</p>`,
  },
}

// Add the generateStaticParams function for static export
export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const postData = posts[slug]

  return <ClientBlogPost postData={postData} />
}
