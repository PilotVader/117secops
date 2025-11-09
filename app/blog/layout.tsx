import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Cybersecurity articles, tutorials, and insights covering vulnerability analysis, threat hunting techniques, SOC operations, security infrastructure, and best practices for security professionals.',
  openGraph: {
    title: 'Blog | 117 SecOps',
    description: 'Cybersecurity articles, tutorials, and insights covering vulnerability analysis, threat hunting, SOC operations, and security best practices.',
    url: 'https://www.117secops.com/blog',
  },
  alternates: {
    canonical: 'https://www.117secops.com/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

