import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-[#121212] py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
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
            <p className="text-sm text-gray-300 max-w-xs">
              Cybersecurity professional specializing in protecting digital assets from evolving threats.
            </p>
            <div className="pt-2">
              <Button className="bg-[#7B34DD] hover:bg-[#6929C4] text-white rounded-md" asChild>
                <a href="https://www.linkedin.com/in/otori-samson/" target="_blank" rel="noopener noreferrer">
                  Contact Me
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-300 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-gray-300 hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-gray-300 hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4 text-white">Areas of Expertise</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">Security Assessment</li>
              <li className="text-sm text-gray-300">Penetration Testing</li>
              <li className="text-sm text-gray-300">Secure Development</li>
              <li className="text-sm text-gray-300">Incident Response</li>
              <li className="text-sm text-gray-300">Compliance</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} 117SECOPS. Personal cybersecurity portfolio.
          </p>
        </div>
      </div>
    </footer>
  )
}
