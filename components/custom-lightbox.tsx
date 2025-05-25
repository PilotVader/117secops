"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export interface GalleryImage {
  src: string
  alt: string
  width?: number
  height?: number
}

interface CustomLightboxProps {
  images: GalleryImage[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function CustomLightbox({ images, isOpen, currentIndex, onClose, onPrev, onNext }: CustomLightboxProps) {
  const [zoom, setZoom] = useState(1)
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

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }, [])

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

// Gallery component that uses the lightbox
export function CustomGallery({
  images,
  groupId = "default",
  className = "",
}: {
  images: GalleryImage[]
  groupId?: string
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleOpen = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform duration-400 hover:scale-[1.02] hover:shadow-lg"
            onClick={() => handleOpen(index)}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-400" />
          </div>
        ))}
      </div>

      <CustomLightbox
        images={images}
        isOpen={isOpen}
        currentIndex={currentIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  )
}

// Single image component that opens in lightbox
export function CustomLightboxImage({
  image,
  className = "",
}: {
  image: GalleryImage
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  // For single image, prev and next are no-ops
  const handlePrev = () => {}
  const handleNext = () => {}

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-400 hover:scale-[1.02] hover:shadow-lg ${className}`}
        onClick={handleOpen}
      >
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          width={image.width || 800}
          height={image.height || 600}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-400" />
      </div>

      <CustomLightbox
        images={[image]}
        isOpen={isOpen}
        currentIndex={0}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  )
}
