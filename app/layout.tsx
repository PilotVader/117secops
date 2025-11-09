import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../styles/prism-tailwind.css"
import { CyberHeader } from "@/components/cyber-header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.117secops.com'),
  title: {
    template: '%s | 117 SecOps',
    default: 'Cybersecurity Projects & Portfolio | 117 SecOps'
  },
  description: "Cybersecurity portfolio showcasing hands-on SOC analyst, DFIR, and threat hunting projects. Documented homelab experiments with SIEM, XDR, malware analysis, and security infrastructure.",
  keywords: ['cybersecurity', 'SOC analyst', 'DFIR', 'threat hunting', 'SIEM', 'Wazuh', 'Elastic', 'homelab', 'malware analysis', 'security infrastructure', 'EDR', 'incident response'],
  authors: [{ name: 'Samson Otori' }],
  creator: 'Samson Otori',
  publisher: '117 SecOps',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.117secops.com',
    siteName: '117 SecOps',
    title: 'Cybersecurity Projects & Portfolio | 117 SecOps',
    description: 'Cybersecurity portfolio showcasing hands-on SOC analyst, DFIR, and threat hunting projects. Documented homelab experiments with SIEM, XDR, malware analysis, and security infrastructure.',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png',
        width: 1200,
        height: 630,
        alt: '117 SecOps Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Projects & Portfolio | 117 SecOps',
    description: 'Cybersecurity portfolio showcasing hands-on SOC analyst, DFIR, and threat hunting projects.',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Umami Analytics Script */}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="1c0f224c-1fe0-4093-a4e2-c43cb8c84bfa"></script>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '117 SecOps',
              url: 'https://www.117secops.com',
              logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png',
              sameAs: [
                'https://github.com/PilotVader',
                'https://www.linkedin.com/in/otori-samson/',
              ],
              description: 'Cybersecurity portfolio showcasing hands-on SOC analyst, DFIR, and threat hunting projects.',
            }),
          }}
        />
        {/* End Umami Analytics Script */}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <CyberHeader />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
