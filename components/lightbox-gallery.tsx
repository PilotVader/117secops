"use client"

import { useState, useEffect } from "react"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
import Image from "next/image"

export interface GalleryImage {
  src: string
  alt: string
  width?: number
  height?: number
}

interface LightboxGalleryProps {
  images: GalleryImage[]
  groupId?: string
  className?: string
}

// Global registry to track all galleries on the page
type GalleryRegistry = {
  [groupId: string]: GalleryImage[]
}

// This will be shared across all gallery instances
const galleryRegistry: GalleryRegistry = {}

export function LightboxGallery({ images, groupId = "default", className = "" }: LightboxGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Register this gallery's images
  useEffect(() => {
    setMounted(true)
    galleryRegistry[groupId] = images

    return () => {
      // Cleanup when component unmounts
      delete galleryRegistry[groupId]
    }
  }, [images, groupId])

  if (!mounted) return null

  const currentGallery = galleryRegistry[groupId] || []

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform duration-400 hover:scale-[1.02] hover:shadow-lg"
            onClick={() => {
              setPhotoIndex(index)
              setIsOpen(true)
            }}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-400" />
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={currentGallery[photoIndex].src}
          nextSrc={currentGallery[(photoIndex + 1) % currentGallery.length].src}
          prevSrc={currentGallery[(photoIndex + currentGallery.length - 1) % currentGallery.length].src}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + currentGallery.length - 1) % currentGallery.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % currentGallery.length)}
          imageTitle={currentGallery[photoIndex].alt}
          reactModalStyle={{ overlay: { zIndex: 1500 } }}
        />
      )}
    </>
  )
}

// For single image lightbox
export function LightboxImage({
  image,
  groupId = "default",
  className = "",
}: { image: GalleryImage; groupId?: string; className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Register this image
  useEffect(() => {
    setMounted(true)
    if (!galleryRegistry[groupId]) {
      galleryRegistry[groupId] = []
    }

    // Check if image already exists in registry
    const exists = galleryRegistry[groupId].some((img) => img.src === image.src)
    if (!exists) {
      galleryRegistry[groupId] = [...galleryRegistry[groupId], image]
    }

    return () => {
      // Cleanup when component unmounts
      galleryRegistry[groupId] = galleryRegistry[groupId].filter((img) => img.src !== image.src)
      if (galleryRegistry[groupId].length === 0) {
        delete galleryRegistry[groupId]
      }
    }
  }, [image, groupId])

  if (!mounted) return null

  const currentGallery = galleryRegistry[groupId] || []
  const currentIndex = currentGallery.findIndex((img) => img.src === image.src)

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-400 hover:scale-[1.02] hover:shadow-lg ${className}`}
        onClick={() => setIsOpen(true)}
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

      {isOpen && currentIndex !== -1 && (
        <Lightbox
          mainSrc={currentGallery[currentIndex].src}
          nextSrc={currentGallery[(currentIndex + 1) % currentGallery.length].src}
          prevSrc={currentGallery[(currentIndex + currentGallery.length - 1) % currentGallery.length].src}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => {
            const newIndex = (currentIndex + currentGallery.length - 1) % currentGallery.length
            // We don't update state here as we're using the registry directly
          }}
          onMoveNextRequest={() => {
            const newIndex = (currentIndex + 1) % currentGallery.length
            // We don't update state here as we're using the registry directly
          }}
          imageTitle={currentGallery[currentIndex].alt}
          reactModalStyle={{ overlay: { zIndex: 1500 } }}
        />
      )}
    </>
  )
}
