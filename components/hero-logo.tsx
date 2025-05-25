"use client"

import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HeroLogo() {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Start floating animation
    controls.start({
      y: [0, -20, 0],
      rotateY: [0, 10, 0, -10, 0],
      rotateX: [0, 5, 0, -5, 0],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      },
    })
  }, [controls])

  const handleHoverStart = () => {
    setIsHovered(true)
    controls.stop()
    controls.start({
      rotateY: 180,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    })
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    controls.start({
      rotateY: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    })
  }

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      }}
      className="relative w-[17.28rem] h-[17.28rem] md:w-[360px] md:h-[360px] mx-auto mb-12 perspective-1000"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 rounded-full -z-10"></div>
      <motion.div
        animate={controls}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png"
          alt="117 SECOPS Logo"
          fill
          className="object-contain drop-shadow-lg"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-primary/10 rounded-full"
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}
