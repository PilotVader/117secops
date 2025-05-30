import { ClientBlogPost } from "./ClientBlogPost"

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  content: string
  image: string
  gallery?: {
    src: string
    alt: string
  }[]
}

interface BlogPosts {
  [key: string]: BlogPost
}

// This data needs to be available at the module level for generateStaticParams
const posts: BlogPosts = {
  "soc-automation-project": {
    slug: "soc-automation-project",
    title: "SOC Automation Project: Building a Home Lab Environment",
    description: "A detailed walkthrough of building a Security Operations Center (SOC) automation lab environment from scratch.",
    date: "2025-05-12",
    author: "Samson Otori",
    category: "Best Practices",
    tags: ["SOC", "Automation", "SOAR", "Home Lab", "Blue Team"],
    image: "/images/soc-automation/cover.svg",
    gallery: [
      {
        src: "/images/soc-automation/step1.svg",
        alt: "Initial SOC Architecture Planning"
      },
      {
        src: "/images/soc-automation/step2.svg",
        alt: "Wazuh Server Setup and Configuration"
      },
      {
        src: "/images/soc-automation/step3.svg",
        alt: "The Hive Integration"
      },
      {
        src: "/images/soc-automation/step4.svg",
        alt: "Shuffle Automation Workflow"
      },
      {
        src: "/images/soc-automation/step5.svg",
        alt: "Complete SOC Environment"
      }
    ],
    content: `<h1>SOC Automation Project: Building a Home Lab Environment</h1>

<p>Welcome to my comprehensive guide on building a Security Operations Center (SOC) automation lab environment from scratch. This project documents my journey in creating a fully functional SOAR (Security Orchestration, Automation, and Response) setup using tools like Wazuh, The Hive, and Shuffle.</p>

<h2>Project Overview</h2>

<p>As a cybersecurity enthusiast and aspiring SOC analyst, I've embarked on this project to gain hands-on experience with real-world SOC tools and workflows. The goal is to create a practical environment for learning and experimenting with:</p>

<ul>
<li>Security event monitoring and collection</li>
<li>Alert management and enrichment</li>
<li>Automated response actions</li>
<li>Case management and documentation</li>
</ul>

<div class="tutorial-gallery">
<!-- Image gallery will be rendered here -->
</div>

<h2>Project Components</h2>

<h3>1. Infrastructure Planning</h3>

<p>The first phase involved careful planning of the lab infrastructure:</p>

<ul>
<li>Designing the network architecture</li>
<li>Selecting appropriate tools and technologies</li>
<li>Planning data flows between components</li>
<li>Establishing security controls</li>
</ul>

<h3>2. Tool Selection and Setup</h3>

<p>For this project, I chose the following tools:</p>

<ol>
<li><strong>Wazuh</strong>: For security monitoring and event collection
<ul>
<li>Host-based intrusion detection</li>
<li>File integrity monitoring</li>
<li>Log analysis and alerting</li>
</ul>
</li>

<li><strong>The Hive</strong>: For case management
<ul>
<li>Alert triage and investigation</li>
<li>Case tracking and documentation</li>
<li>Team collaboration features</li>
</ul>
</li>

<li><strong>Shuffle</strong>: For automation and orchestration
<ul>
<li>Workflow automation</li>
<li>Alert enrichment</li>
<li>Integration between tools</li>
</ul>
</li>
</ol>

<h2>Implementation Steps</h2>

<h3>Step 1: Initial Setup</h3>

<p>The first step involved setting up the basic infrastructure:</p>

<ol>
<li>Creating virtual machines</li>
<li>Configuring network settings</li>
<li>Installing base operating systems</li>
<li>Setting up security controls</li>
</ol>

<h3>Step 2: Wazuh Deployment</h3>

<p>Next, I focused on deploying Wazuh:</p>

<ol>
<li>Installing Wazuh server</li>
<li>Configuring agents</li>
<li>Setting up basic detection rules</li>
<li>Testing event collection</li>
</ol>

<h3>Step 3: The Hive Integration</h3>

<p>The case management system was then integrated:</p>

<ol>
<li>Installing The Hive</li>
<li>Configuring alert sources</li>
<li>Setting up case templates</li>
<li>Testing alert to case conversion</li>
</ol>

<h3>Step 4: Automation with Shuffle</h3>

<p>Finally, I implemented automation:</p>

<ol>
<li>Creating workflows in Shuffle</li>
<li>Setting up tool integrations</li>
<li>Implementing alert enrichment</li>
<li>Testing automated responses</li>
</ol>

<h2>Lessons Learned</h2>

<p>Throughout this project, I gained valuable insights:</p>

<ol>
<li>The importance of proper planning before implementation</li>
<li>The complexity of tool integration in a SOC environment</li>
<li>The value of automation in reducing manual tasks</li>
<li>The need for continuous testing and refinement</li>
</ol>

<h2>Future Enhancements</h2>

<p>I plan to enhance this setup with:</p>

<ul>
<li>Additional data sources</li>
<li>Custom detection rules</li>
<li>More automated workflows</li>
<li>Threat intelligence integration</li>
</ul>

<h2>Conclusion</h2>

<p>This project has been an invaluable learning experience, providing hands-on exposure to real-world SOC tools and workflows. It serves as a foundation for further experimentation and skill development in security operations.</p>

<p>Stay tuned for detailed posts about each phase of the implementation!</p>

<p>#SOCAnalyst #Cybersecurity #Automation #HomeLab #SOAR</p>`,
  },
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
