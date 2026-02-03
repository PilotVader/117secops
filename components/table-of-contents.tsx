"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  // Progress tracking
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const matches = [...content.matchAll(headingRegex)]
    
    const toc = matches.map((match) => {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      
      return { id, text, level }
    })

    setHeadings(toc)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <>
      {/* Desktop TOC - Sidebar */}
      <nav className="hidden xl:block">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
          {/* Header with Progress Bar */}
          <div className="p-6 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-8 bg-purple-600 rounded-full" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                In This Blog
              </h4>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* TOC List */}
          <div className="px-6 pb-6">
            <ul className="space-y-1">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "block py-2 px-3 text-sm rounded-md transition-all",
                      heading.level === 3 && "pl-6",
                      activeId === heading.id
                        ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile TOC - Fixed at Bottom with Preview */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-2xl">
        {/* Header with Progress - Always Visible */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 pb-3"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-purple-600 rounded-full" />
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                In This Blog
              </span>
            </div>
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            )}
          </div>
          {/* Progress Bar - Always Visible */}
          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </button>

        {/* Preview Items - Always Visible (First 3) */}
        <div className="px-4 pb-3">
          <ul className="space-y-1">
            {headings.slice(0, 3).map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={cn(
                    "block py-2 px-3 text-sm rounded-md transition-all",
                    heading.level === 3 && "pl-6",
                    activeId === heading.id
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Content - Remaining Items */}
        {isOpen && headings.length > 3 && (
          <div className="max-h-[50vh] overflow-y-auto px-4 pb-4 border-t border-slate-200 dark:border-slate-800 pt-3">
            <ul className="space-y-1">
              {headings.slice(3).map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "block py-2 px-3 text-sm rounded-md transition-all",
                      heading.level === 3 && "pl-6",
                      activeId === heading.id
                        ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsOpen(false)
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Spacer for mobile to prevent content from being hidden behind fixed TOC */}
      <div className="xl:hidden h-32" />
    </>
  )
}
