import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-background py-5 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="relative w-[3.6rem] h-[3.6rem]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png"
                  alt="117 SECOPS Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Cybersecurity professional specializing in protecting digital assets from evolving threats.
            </p>
                         <div className="pt-0">
              <Button size="sm" className="cyber-border bg-transparent text-foreground hover:bg-purple-600 hover:text-white" asChild>
                <a href="https://www.linkedin.com/in/otori-samson/" target="_blank" rel="noopener noreferrer">
                  Contact Me
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-2 text-foreground">Quick Links</h3>
            <ul className="space-y-0.5">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-2 text-foreground">Areas of Expertise</h3>
            <ul className="space-y-0.5">
              <li className="text-sm text-muted-foreground">Security Assessment</li>
              <li className="text-sm text-muted-foreground">Penetration Testing</li>
              <li className="text-sm text-muted-foreground">Secure Development</li>
              <li className="text-sm text-muted-foreground">Incident Response</li>
              <li className="text-sm text-muted-foreground">Compliance</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-5 pt-3 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Samson's. Personal cybersecurity portfolio.
          </p>
        </div>
      </div>
    </footer>
  )
}
