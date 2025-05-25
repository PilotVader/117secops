"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Logo3D() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same dimensions during SSR
    return <div className="w-[4.32rem] h-[4.32rem] md:w-[5.04rem] md:h-[5.04rem]"></div>
  }

  return (
    <Link href="/">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative w-[4.32rem] h-[4.32rem] md:w-[5.04rem] md:h-[5.04rem] cursor-pointer"
      >
        <motion.div
          animate={{
            rotateY: hovered ? [0, 180, 360] : [0, 360],
            transition: {
              duration: hovered ? 1.5 : 10,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            },
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png"
            alt="117 SECOPS Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        <div
          className={`absolute inset-0 bg-primary/10 rounded-full transition-opacity duration-300 ${
            hovered ? "opacity-30" : "opacity-0"
          }`}
        ></div>
      </motion.div>
    </Link>
  )
}
