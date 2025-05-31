"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Expand, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
  }[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const handlePrevious = () => {
    setSelectedIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const handleNext = () => {
    setSelectedIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  const toggleFullscreen = () => {
    setIsFullscreen((current) => !current)
    setZoomLevel(1) // Reset zoom when toggling fullscreen
  }

  const handleZoomIn = () => {
    setZoomLevel((current) => Math.min(current + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((current) => Math.max(current - 0.2, 0.5))
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-background/50 dark:bg-background/10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "relative h-full w-full",
              isFullscreen && "fixed inset-0 z-50 h-screen w-screen bg-background/95 flex items-center justify-center"
            )}
          >
            <motion.div 
              className={cn(
                "relative w-full h-full",
                isFullscreen && "w-[75%] h-[75%] max-w-6xl max-h-[75vh]"
              )}
              animate={{ scale: zoomLevel }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedIndex}
                  initial={{ 
                    opacity: 0,
                    x: 50 * (isFullscreen ? 1 : 0)  // Only slide when fullscreen
                  }}
                  animate={{ 
                    opacity: 1,
                    x: 0
                  }}
                  exit={{ 
                    opacity: 0,
                    x: -50 * (isFullscreen ? 1 : 0)  // Only slide when fullscreen
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut"
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[selectedIndex].src}
                    alt={images[selectedIndex].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Navigation Controls Container */}
            <div className={cn(
              "absolute bottom-4 w-full px-4 flex justify-between items-center",
              isFullscreen && "bottom-[120px]"
            )}>
              {/* Left Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <X className="h-6 w-6" /> : <Expand className="h-6 w-6" />}
                </Button>
                {isFullscreen && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                      onClick={handleZoomIn}
                    >
                      <ZoomIn className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                      onClick={handleZoomOut}
                    >
                      <ZoomOut className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Fullscreen Thumbnails */}
            {isFullscreen && (
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-4">
                <div className="flex justify-center space-x-2 overflow-x-auto pb-2 max-w-4xl mx-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        "relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-md transition-all",
                        selectedIndex === index
                          ? "ring-2 ring-primary ring-offset-2"
                          : "ring-1 ring-border hover:ring-2 hover:ring-primary/50"
                      )}
                    >
                      <Image src={image.src} alt={image.alt} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Regular View Thumbnails */}
      {!isFullscreen && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative aspect-video h-20 flex-shrink-0 overflow-hidden rounded-md transition-all",
                selectedIndex === index
                  ? "ring-2 ring-primary ring-offset-2"
                  : "ring-1 ring-border hover:ring-2 hover:ring-primary/50"
              )}
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 