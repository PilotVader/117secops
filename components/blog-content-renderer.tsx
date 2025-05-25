"use client"

import { useEffect, useState, useRef } from "react"

interface BlogContentRendererProps {
  content: string
  groupId?: string
  onImageClick?: (index: number) => void
}

export function BlogContentRenderer({ content, groupId = "blog-post", onImageClick }: BlogContentRendererProps) {
  const [processedContent, setProcessedContent] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!content) {
      setProcessedContent("")
      return
    }

    // Simple HTML sanitization for static content
    const newContent = content

    // For static export, we'll simplify the content processing
    // Just render the HTML directly without complex gallery extraction
    setProcessedContent(newContent)
  }, [content])

  useEffect(() => {
    // Add click handlers to images if onImageClick is provided
    if (contentRef.current && onImageClick) {
      const images = contentRef.current.querySelectorAll("img")
      images.forEach((img, index) => {
        img.style.cursor = "pointer"
        img.addEventListener("click", (e) => {
          e.preventDefault()
          onImageClick(index)
        })
      })

      return () => {
        // Clean up event listeners
        images.forEach((img) => {
          img.removeEventListener("click", () => {})
        })
      }
    }
  }, [processedContent, onImageClick])

  return (
    <div className="prose prose-purple max-w-none dark:prose-invert prose-img:rounded-lg prose-img:mx-auto prose-img:shadow-md">
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
