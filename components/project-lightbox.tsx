"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectLightboxProps {
  isOpen: boolean
  images: { src: string; alt: string }[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function ProjectLightbox({ isOpen, images, currentIndex, onClose, onNext, onPrev }: ProjectLightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Reset zoom when changing images
    setZoom(1)

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          onPrev()
          break
        case "ArrowRight":
          onNext()
          break
        case "+":
          setZoom((prev) => Math.min(prev + 0.25, 3))
          break
        case "-":
          setZoom((prev) => Math.max(prev - 0.25, 0.5))
          break
        case "f":
          toggleFullscreen()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Prevent scrolling when lightbox is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose, onNext, onPrev, currentIndex])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true)
        })
        .catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false)
          })
          .catch((err) => {
            console.error(`Error attempting to exit fullscreen: ${err.message}`)
          })
      }
    }
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1500] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/90"
            onClick={onClose}
          />

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 text-white">
              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  {currentIndex + 1} / {images.length}
                </span>
                <span className="text-sm ml-4">{images[currentIndex]?.alt || "Image"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={handleZoomOut}>
                  <ZoomOut className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={handleZoomIn}>
                  <ZoomIn className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Image container */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <div
                className="relative transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${zoom})`,
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                }}
              >
                <Image
                  src={images[currentIndex]?.src || "/placeholder.svg"}
                  alt={images[currentIndex]?.alt || "Image"}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full h-12 w-12"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPrev()
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full h-12 w-12"
                  onClick={(e) => {
                    e.stopPropagation()
                    onNext()
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
