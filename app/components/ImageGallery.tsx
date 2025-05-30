"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Expand, ChevronLeft, ChevronRight } from "lucide-react"
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

  const handlePrevious = () => {
    setSelectedIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const handleNext = () => {
    setSelectedIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  const toggleFullscreen = () => {
    setIsFullscreen((current) => !current)
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-background/50 dark:bg-background/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative h-full w-full",
              isFullscreen && "fixed inset-0 z-50 h-screen w-screen bg-background/95 p-8"
            )}
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

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
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

        {/* Fullscreen Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-10 w-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
          onClick={toggleFullscreen}
        >
          <Expand className="h-6 w-6" />
        </Button>
      </div>

      {/* Thumbnails */}
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
    </div>
  )
} 