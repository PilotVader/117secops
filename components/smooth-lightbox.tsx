"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SmoothLightboxProps {
  isOpen: boolean
  onClose: () => void
  images: Array<{ src: string; alt: string }>
  currentIndex: number
  onNext: () => void
  onPrev: () => void
}

export function SmoothLightbox({ isOpen, onClose, images, currentIndex, onNext, onPrev }: SmoothLightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [direction, setDirection] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [slidePosition, setSlidePosition] = useState(0)

  useEffect(() => {
    // Preload adjacent images
    const preloadImages = () => {
      const prevIndex = (currentIndex - 1 + images.length) % images.length
      const nextIndex = (currentIndex + 1) % images.length
      
      const prevImg = document.createElement('img')
      prevImg.src = images[prevIndex].src
      
      const nextImg = document.createElement('img')
      nextImg.src = images[nextIndex].src
    }
    preloadImages()
  }, [currentIndex, images])

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (transitioning) return
    setDirection(1)
    setTransitioning(true)
    setSlidePosition(100)
    onNext()
    setTimeout(() => {
      setTransitioning(false)
      setSlidePosition(0)
    }, 300)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (transitioning) return
    setDirection(-1)
    setTransitioning(true)
    setSlidePosition(-100)
    onPrev()
    setTimeout(() => {
      setTransitioning(false)
      setSlidePosition(0)
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[1500] bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-30">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation()
            setZoom(Math.max(zoom - 0.2, 1))
          }}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation()
            setZoom(Math.min(zoom + 0.2, 3))
          }}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Image counter */}
      <div className="absolute top-4 left-4 text-white z-30">
        <span className="text-sm">
          {currentIndex + 1} / {images.length}
        </span>
        <span className="text-sm ml-4">{images[currentIndex].alt}</span>
      </div>

      {/* Main image container */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div 
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute w-full h-full flex items-center justify-center transition-all duration-300 ease-out transform-gpu"
            style={{
              transform: `translateX(${slidePosition}%)`,
              opacity: transitioning ? 0.5 : 1,
            }}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto object-contain select-none"
              style={{ transform: `scale(${zoom})` }}
              priority
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full h-12 w-12 z-30"
            onClick={handlePrev}
            disabled={transitioning}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full h-12 w-12 z-30"
            onClick={handleNext}
            disabled={transitioning}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-0 right-0 z-30">
        <div className="flex justify-center space-x-2 overflow-x-auto px-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                if (transitioning || index === currentIndex) return
                const goingNext = index > currentIndex
                setDirection(goingNext ? 1 : -1)
                setTransitioning(true)
                setSlidePosition(goingNext ? 100 : -100)
                setZoom(1)
                if (goingNext) {
                  onNext()
                } else {
                  onPrev()
                }
                setTimeout(() => {
                  setTransitioning(false)
                  setSlidePosition(0)
                }, 300)
              }}
              disabled={transitioning}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md transition-all ${
                currentIndex === index
                  ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                  : "ring-1 ring-white/50 hover:ring-2 hover:ring-white"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 