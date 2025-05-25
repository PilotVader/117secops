"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ThumbsUp, MessageSquare, Share2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { LinkedInPost } from "@/lib/api-service"

interface LinkedInPostModalProps {
  isOpen: boolean
  onClose: () => void
  post: LinkedInPost
}

export function LinkedInPostModal({ isOpen, onClose, post }: LinkedInPostModalProps) {
  const [mounted, setMounted] = useState(false)
  const [hasReacted, setHasReacted] = useState(false)
  const [localLikes, setLocalLikes] = useState(post.likes)

  // Handle escape key press
  useEffect(() => {
    setMounted(true)

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  const handleReaction = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasReacted) {
      setLocalLikes((prev) => prev + 1)
      setHasReacted(true)
    } else {
      setLocalLikes((prev) => prev - 1)
      setHasReacted(false)
    }
  }

  const openInNewTab = () => {
    window.open(post.url, "_blank")
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="bg-background rounded-lg shadow-xl overflow-hidden flex flex-col relative z-10"
            style={{
              width: "95%",
              maxWidth: "700px",
              maxHeight: "90vh",
            }}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={post.author.profileImage || "/placeholder.svg"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <p className="text-xs text-muted-foreground">{post.author.title}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 cursor-pointer" onClick={openInNewTab}>
              {/* Post content */}
              <div className="whitespace-pre-line mb-6">{post.content}</div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Images */}
              {post.images && post.images.length > 0 && (
                <div className="mb-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image src={post.images[0] || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                  </div>
                </div>
              )}

              {/* Post metadata */}
              <div className="text-sm text-muted-foreground mb-4">
                <span>{post.date}</span>
              </div>

              {/* Engagement stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-b py-2">
                <div>
                  {localLikes} likes • {post.comments} comments
                </div>
                <div>{post.shares} shares</div>
              </div>
            </div>

            {/* Reaction buttons */}
            <div className="p-2 border-t flex justify-between" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                className={`flex-1 ${hasReacted ? "text-blue-600" : ""}`}
                onClick={handleReaction}
              >
                <ThumbsUp className="h-5 w-5 mr-2" />
                Like
              </Button>
              <Button variant="ghost" className="flex-1" onClick={(e) => e.stopPropagation()}>
                <MessageSquare className="h-5 w-5 mr-2" />
                Comment
              </Button>
              <Button variant="ghost" className="flex-1" onClick={(e) => e.stopPropagation()}>
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
              <Button variant="ghost" className="flex-1" onClick={(e) => e.stopPropagation()}>
                <Send className="h-5 w-5 mr-2" />
                Send
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
