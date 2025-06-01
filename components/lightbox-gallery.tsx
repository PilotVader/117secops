"use client"

import { useState } from "react"
import Image from "next/image"
import { SmoothLightbox } from "./smooth-lightbox"

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

// This will be shared across all gallery instances
const galleryRegistry: { [key: string]: GalleryImage[] } = {}

export function LightboxGallery({ images, groupId = "default", className = "" }: LightboxGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleNext = () => {
    setCurrentIndex((current) => (current + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((current) => (current + images.length - 1) % images.length)
  }

  return (
    <>
      <section className="relative p-6 rounded-xl bg-gradient-to-br from-purple-100/50 via-transparent to-purple-50/30 dark:from-purple-900/10 dark:via-purple-800/5 dark:to-purple-900/10 border-2 border-purple-300/30 dark:border-purple-600/20 shadow-xl shadow-purple-500/5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent dark:from-purple-400/5 rounded-xl" />
        <h2 className="text-2xl font-semibold mb-6 text-purple-900/80 dark:text-purple-100/80 relative">Image Gallery</h2>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative ${className}`}>
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10"
              onClick={() => {
                setCurrentIndex(index)
                setIsOpen(true)
              }}
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </section>

      <SmoothLightbox
        isOpen={isOpen}
        onClose={handleClose}
        images={images}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  )
}

// For single image lightbox
export function LightboxImage({
  image,
  groupId = "default",
  className = "",
}: {
  image: GalleryImage
  groupId?: string
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10 ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width || 800}
          height={image.height || 600}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      <SmoothLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={[image]}
        currentIndex={0}
        onNext={() => {}}
        onPrev={() => {}}
      />
    </>
  )
}
