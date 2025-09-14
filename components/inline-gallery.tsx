"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand, X, Maximize2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface InlineGalleryProps {
  images: string[]
  imageNames?: string[]
  title?: string
}

export function InlineGallery({ images, imageNames, title }: InlineGalleryProps) {
  // Debug: Log the props to see what's being received
  console.log('InlineGallery Props:', { images: images?.length, imageNames: imageNames?.length, title })
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 })
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (!isFullscreen) {
      setZoomLevel(1)
      setPanOffset({ x: 0, y: 0 })
    }
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5))
  }

  const resetZoom = () => {
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
  }

  const toggleThumbnails = () => {
    setShowThumbnails(!showThumbnails)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsPanning(true)
      setLastPanPoint({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && zoomLevel > 1) {
      const deltaX = e.clientX - lastPanPoint.x
      const deltaY = e.clientY - lastPanPoint.y
      setPanOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }))
      setLastPanPoint({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1 && e.touches.length === 1) {
      setIsPanning(true)
      setLastPanPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPanning && zoomLevel > 1 && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - lastPanPoint.x
      const deltaY = e.touches[0].clientY - lastPanPoint.y
      setPanOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }))
      setLastPanPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
  }

  const handleTouchEnd = () => {
    setIsPanning(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isFullscreen) return

    switch (e.key) {
      case "Escape":
        toggleFullscreen()
        break
      case "ArrowLeft":
        prevImage()
        break
      case "ArrowRight":
        nextImage()
        break
      case "+":
      case "=":
        handleZoomIn()
        break
      case "-":
        handleZoomOut()
        break
      case "0":
        resetZoom()
        break
      case "t":
        toggleThumbnails()
        break
    }
  }

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen])

  useEffect(() => {
    if (!isInitialMount.current && thumbnailContainerRef.current) {
      const activeThumbnail = thumbnailContainerRef.current.children[currentIndex] as HTMLElement
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        })
      }
    } else {
      isInitialMount.current = false
    }
  }, [currentIndex])

  if (!images || images.length === 0) return null

  return (
    <>
             {/* Inline Gallery */}
       <div className="my-8">
         <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-4 border-purple-500">
          {/* Main Image */}
          <div className="relative aspect-video">
            <Image
              src={images[currentIndex]}
              alt={imageNames?.[currentIndex] || `${title || "Gallery"} image ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            
            {/* Navigation Arrows */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-purple-600 text-white hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-600 transition-none"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5 mx-auto" />
            </button>
            
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-purple-600 text-white hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-600 transition-none"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5 mx-auto" />
            </button>

            {/* Expand Button */}
            <button
              className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-purple-600 text-white hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-600 transition-none"
              onClick={toggleFullscreen}
            >
              <Expand className="h-4 w-4 mx-auto" />
            </button>

                         {/* Image Counter and Name */}
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
               <div className="bg-black/90 dark:bg-black/90 bg-white/90 dark:bg-black/90 backdrop-blur-md text-black dark:text-white text-sm px-3 py-1 rounded-full font-medium">
                 {currentIndex + 1} of {images.length}
               </div>
               {imageNames?.[currentIndex] && (
                 <div className="bg-black/95 dark:bg-black/95 bg-white/95 dark:bg-black/95 backdrop-blur-md text-black dark:text-white text-sm px-3 py-1 rounded-lg max-w-xs text-center font-medium shadow-lg">
                   {imageNames[currentIndex]}
                 </div>
               )}
             </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900">
            <div
              ref={thumbnailContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide"
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-28 h-20 rounded-md transition-all duration-200 bg-gray-200 dark:bg-gray-700 ${
                    index === currentIndex
                      ? "ring-2 ring-purple-500 ring-offset-2"
                      : "ring-1 ring-gray-300 dark:ring-gray-600"
                  }`}
                >
                  <Image
                    src={image}
                    alt={imageNames?.[index] || `Thumbnail ${index + 1}`}
                    width={112}
                    height={80}
                    className="w-full h-full object-cover object-center rounded-md cursor-pointer"
                    onClick={() => goToImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Main Image */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={images[currentIndex]}
                alt={imageNames?.[currentIndex] || `${title || "Gallery"} image ${currentIndex + 1}`}
                fill
                className="object-contain"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                  cursor: isPanning ? "grabbing" : zoomLevel > 1 ? "grab" : "default",
                }}
                sizes="100vw"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-purple-600 text-white hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-600 transition-none"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6 mx-auto" />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-purple-600 text-white hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-600 transition-none"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6 mx-auto" />
            </button>

            {/* Close Button */}
            <button
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-purple-600 text-white hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-600 transition-none"
              onClick={toggleFullscreen}
            >
              <X className="h-5 w-5 mx-auto" />
            </button>

            {/* Zoom Controls */}
            <div className="absolute left-4 top-4 flex gap-2">
              <button
                className="h-10 w-10 rounded-full bg-purple-600 text-white hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-600 transition-none"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-5 w-5 mx-auto" />
              </button>
              <button
                className="h-10 w-10 rounded-full bg-purple-600 text-white hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-600 transition-none"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-5 w-5 mx-auto" />
              </button>
              <button
                className="h-10 w-10 rounded-full bg-purple-600 text-white hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-600 transition-none"
                onClick={resetZoom}
              >
                <RotateCcw className="h-5 w-5 mx-auto" />
              </button>
            </div>

            {/* Zoom Level Display */}
            {zoomLevel !== 1 && (
              <div className="absolute left-4 bottom-4 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                {Math.round(zoomLevel * 100)}%
              </div>
            )}

                         {/* Image Counter and Name */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
               <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-black dark:text-white text-sm px-4 py-2 rounded-full font-medium">
                 {currentIndex + 1} of {images.length}
               </div>
               {imageNames?.[currentIndex] && (
                 <div className="bg-white/95 dark:bg-black/90 backdrop-blur-md text-black dark:text-white text-base px-4 py-2 rounded-lg max-w-lg text-center font-medium shadow-lg">
                   {imageNames[currentIndex]}
                 </div>
               )}
             </div>

            {/* Fullscreen Thumbnails with Hover Effect */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-300 ease-in-out"
              style={{
                transform: showThumbnails ? 'translateY(0)' : 'translateY(100%)'
              }}
              onMouseEnter={() => setShowThumbnails(true)}
              onMouseLeave={() => setShowThumbnails(false)}
            >
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex gap-2 max-w-96 overflow-x-auto">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-24 h-18 rounded-md transition-all duration-200 bg-gray-800 ${
                        index === currentIndex
                          ? "ring-2 ring-white/50"
                          : "ring-1 ring-white/30"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={imageNames?.[index] || `Thumbnail ${index + 1}`}
                        width={96}
                        height={72}
                        className="w-full h-full object-cover object-center rounded-md cursor-pointer"
                        onClick={() => goToImage(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 