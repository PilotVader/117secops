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
      title: "Samson's | Cybersecurity Portfolio",
  description: "Professional cybersecurity portfolio showcasing expertise in digital security",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png",
      },
    ],
  },
    generator: 'v0.dev'
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
