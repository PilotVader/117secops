"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Logo() {
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
        className="relative w-[4.32rem] h-[4.32rem] md:w-[5.04rem] md:h-[5.04rem] overflow-visible"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/117%20Corporation%20no%20bg-5VVBXF0igK8jcCo43su7cpA2isco7t.png"
          alt="117 SECOPS Logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </Link>
  )
}
