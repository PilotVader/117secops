// This is a mock service that simulates fetching LinkedIn posts
// In a real implementation, you would need to use LinkedIn's API with proper authentication

export interface LinkedInPost {
  id: string
  author: {
    name: string
    title: string
    profileImage: string
    profileUrl: string
  }
  content: string
  images?: string[]
  date: string
  likes: number
  comments: number
  shares: number
  url: string
  tags: string[]
}

// Mock data to simulate LinkedIn posts
const mockLinkedInPosts: LinkedInPost[] = [
  {
    id: "post-1",
    author: {
      name: "Otori Samson",
      title: "Cybersecurity Analyst | SOC Analyst | Digital Forensics Investigator",
      profileImage: "/placeholder.svg?height=100&width=100",
      profileUrl: "https://linkedin.com/in/otori-samson",
    },
    content: `🔍 Just completed an intensive SOC Analyst project focused on threat hunting and incident response!

As part of my continuous professional development in cybersecurity, I've been working on enhancing my skills in Security Operations Center (SOC) analysis.

Key accomplishments:
• Implemented advanced threat hunting methodologies using SIEM tools
• Developed custom detection rules for identifying sophisticated attack patterns
• Reduced false positive alerts by 78% through fine-tuning detection mechanisms
• Established streamlined incident response procedures with clear escalation paths
• Integrated threat intelligence feeds for proactive threat detection

This project has significantly improved my ability to detect and respond to security incidents efficiently. Looking forward to applying these skills in real-world scenarios!

#Cybersecurity #SOCAnalyst #MyDFIR #ThreatHunting #IncidentResponse`,
    images: ["/placeholder.svg?height=500&width=800&text=SOC+Analyst+Project"],
    date: "April 15, 2023",
    likes: 142,
    comments: 28,
    shares: 15,
    url: "https://www.linkedin.com/posts/otori-samson_cybersecurity-socanalyst-mydfir-activity-7258897169036795904-uYqQ/",
    tags: ["Cybersecurity", "SOCAnalyst", "MyDFIR", "ThreatHunting", "IncidentResponse"],
  },
  {
    id: "post-2",
    author: {
      name: "Otori Samson",
      title: "Cybersecurity Analyst | SOC Analyst | Digital Forensics Investigator",
      profileImage: "/placeholder.svg?height=100&width=100",
      profileUrl: "https://linkedin.com/in/otori-samson",
    },
    content: `🛡️ Excited to share my latest project on implementing Zero Trust Architecture for a healthcare organization!

In this comprehensive security overhaul, I focused on:
• Implementing the principle of "never trust, always verify" across all network access
• Securing sensitive patient data with end-to-end encryption
• Deploying micro-segmentation to limit lateral movement
• Establishing continuous monitoring and validation

The results were impressive:
- 95% reduction in potential attack surface
- Complete elimination of unauthorized access attempts
- Full HIPAA compliance achievement
- Enhanced visibility into all network traffic

This project reinforced my belief that Zero Trust is no longer optional but essential for modern security postures.

#Cybersecurity #ZeroTrust #HealthcareSecurity #NetworkSecurity`,
    images: ["/placeholder.svg?height=500&width=800&text=Zero+Trust+Architecture"],
    date: "March 22, 2023",
    likes: 98,
    comments: 17,
    shares: 8,
    url: "https://www.linkedin.com/in/otori-samson/",
    tags: ["Cybersecurity", "ZeroTrust", "HealthcareSecurity", "NetworkSecurity"],
  },
  {
    id: "post-3",
    author: {
      name: "Otori Samson",
      title: "Cybersecurity Analyst | SOC Analyst | Digital Forensics Investigator",
      profileImage: "/placeholder.svg?height=100&width=100",
      profileUrl: "https://linkedin.com/in/otori-samson",
    },
    content: `🔐 Just completed a comprehensive penetration testing project for an e-commerce platform!

Key findings and achievements:
• Identified and exploited 17 critical vulnerabilities including SQL injection and XSS
• Discovered an authentication bypass that could have led to complete account takeover
• Found insecure direct object references exposing customer data
• Detected misconfigured cloud storage buckets with sensitive information

After providing detailed remediation steps, the client implemented all recommendations, resulting in:
- 100% resolution of critical vulnerabilities
- PCI DSS compliance achievement
- Improved security awareness among development team
- Implementation of secure SDLC practices

This project reinforced the importance of regular security testing in maintaining a strong security posture.

#Cybersecurity #PenetrationTesting #WebSecurity #EthicalHacking`,
    images: ["/placeholder.svg?height=500&width=800&text=Penetration+Testing+Project"],
    date: "February 10, 2023",
    likes: 115,
    comments: 23,
    shares: 12,
    url: "https://www.linkedin.com/in/otori-samson/",
    tags: ["Cybersecurity", "PenetrationTesting", "WebSecurity", "EthicalHacking"],
  },
]

export async function getLinkedInPosts(): Promise<LinkedInPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockLinkedInPosts
}

export async function getLinkedInPostById(id: string): Promise<LinkedInPost | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockLinkedInPosts.find((post) => post.id === id)
}
