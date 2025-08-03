"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand, X, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface InlineGalleryProps {
  images: {
    src: string
    alt: string
  }[]
  title?: string
}

export function InlineGallery({ images, title }: InlineGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const [dragScrollLeft, setDragScrollLeft] = useState<number | null>(null)
  const thumbnailRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  if (!images || images.length === 0) {
    return null
  }

  const handlePrevious = () => {
    setCurrentIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const handleNext = () => {
    setCurrentIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  const handleThumbnailClick = (index: number) => {
    if (!isDragging) {
      setCurrentIndex(index)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen((current) => !current)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  // Mouse drag handlers for thumbnail slider
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!thumbnailRef.current) return
    
    setIsDragging(true)
    setDragStart(e.clientX)
    setDragScrollLeft(thumbnailRef.current.scrollLeft)
    thumbnailRef.current.style.cursor = 'grabbing'
    thumbnailRef.current.style.userSelect = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !thumbnailRef.current || dragStart === null || dragScrollLeft === null) return
    
    e.preventDefault()
    const x = e.clientX
    const walk = (x - dragStart) * 2 // Scroll speed multiplier
    thumbnailRef.current.scrollLeft = dragScrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragStart(null)
    setDragScrollLeft(null)
    if (thumbnailRef.current) {
      thumbnailRef.current.style.cursor = 'grab'
      thumbnailRef.current.style.userSelect = 'auto'
    }
  }

  // Touch handlers for thumbnail slider
  const handleThumbnailTouchStart = (e: React.TouchEvent) => {
    if (!thumbnailRef.current) return
    
    setTouchStart(e.targetTouches[0].clientX)
    setDragScrollLeft(thumbnailRef.current.scrollLeft)
  }

  const handleThumbnailTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !thumbnailRef.current || dragScrollLeft === null) return
    
    e.preventDefault()
    const x = e.targetTouches[0].clientX
    const walk = (x - touchStart) * 2
    thumbnailRef.current.scrollLeft = dragScrollLeft - walk
  }

  const handleThumbnailTouchEnd = () => {
    setTouchStart(null)
    setTouchEnd(null)
    setDragScrollLeft(null)
  }

  // Scroll thumbnail into view when current index changes (but not on initial mount)
  useEffect(() => {
    // Skip the first render to prevent auto-scrolling on mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (thumbnailRef.current && images.length > 1) {
      const thumbnailContainer = thumbnailRef.current
      const activeThumbnail = thumbnailContainer.children[currentIndex] as HTMLElement
      
      if (activeThumbnail) {
        // Calculate scroll position to center the active thumbnail
        const containerWidth = thumbnailContainer.offsetWidth
        const thumbnailWidth = activeThumbnail.offsetWidth
        const thumbnailLeft = activeThumbnail.offsetLeft
        const scrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2)
        
        // Smooth scroll within the container only
        thumbnailContainer.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        })
      }
    }
  }, [currentIndex, images.length])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handlePrevious()
          break
        case "ArrowRight":
          handleNext()
          break
        case "Escape":
          closeFullscreen()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen])

  // Handle touch/swipe navigation for main image
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrevious()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isFullscreen])

  return (
    <>
      {/* Inline Gallery */}
      <div className="my-8">
        {title && (
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
            {title}
          </h3>
        )}
        
        {/* Main Gallery Container */}
        <div className="relative group">
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/20 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/40 text-white"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/20 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/40 text-white"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Expand Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/40 text-white"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          {/* Single Image Display */}
          <div 
            className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
              priority
            />
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
              {currentIndex + 1} of {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Slider */}
        {images.length > 1 && (
          <div className="mt-4">
            <div
              ref={thumbnailRef}
              className="flex space-x-2 overflow-x-auto snap-x snap-mandatory pb-2 cursor-grab active:cursor-grabbing select-none smooth-scroll"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleThumbnailTouchStart}
              onTouchMove={handleThumbnailTouchMove}
              onTouchEnd={handleThumbnailTouchEnd}
            >
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={cn(
                    "relative flex-shrink-0 snap-start aspect-[16/10] w-20 md:w-24 lg:w-28 overflow-hidden rounded-md transition-all duration-200 hover:scale-105",
                    currentIndex === index
                      ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-105"
                      : "ring-1 ring-gray-300 dark:ring-gray-600 hover:ring-2 hover:ring-purple-300 dark:hover:ring-purple-400"
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                  />
                  {/* Active indicator overlay */}
                  {currentIndex === index && (
                    <div className="absolute inset-0 bg-purple-500/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
            onClick={closeFullscreen}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                onClick={handleNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Fullscreen Image */}
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Fullscreen Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-lg px-4 py-2 rounded-full">
              {currentIndex + 1} of {images.length}
            </div>
          )}

          {/* Image Caption */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-2xl text-center">
            <p className="text-white text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              {images[currentIndex].alt}
            </p>
          </div>
        </div>
      )}
    </>
  )
} 