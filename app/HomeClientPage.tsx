"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { useState } from "react"
import Card3D from "@/components/3d-card"
import type { Project } from "@/lib/project"

export default function HomeClientPage({ initialProjects }: { initialProjects: Project[] }) {
  const [featuredProjects] = useState<Project[]>(initialProjects)
  const [isLoading, setIsLoading] = useState(false)

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen dark-gradient-bg">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-foreground dark:text-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center text-center space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tighter text-gradient dark:text-white"
                variants={fadeIn}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                117 Security Operations
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground dark:text-gray-100"
                variants={fadeIn}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                Documenting my journey through cybersecurity experiments, projects, and learning experiences.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4 justify-center mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button asChild variant="purple" className="rounded-md">
                  <Link href="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="black" className="rounded-md">
                  <Link href="/blog">Read Blog</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground dark:text-white">Featured Projects</h2>
              <p className="mt-4 text-lg text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
                Hands-on experiments and documented learning
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {isLoading
                ? // Show skeleton loaders while loading
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card3D>
                          <div className="aspect-video relative">
                            <div className="w-full h-full bg-gray-200 animate-pulse" />
                          </div>
                          <CardHeader>
                            <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2" />
                          </CardHeader>
                          <CardContent>
                            <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2" />
                            <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2" />
                            <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
                          </CardContent>
                          <CardFooter>
                            <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                          </CardFooter>
                        </Card3D>
                      </motion.div>
                    ))
                : featuredProjects.map((project, index) => (
                    <FeaturedProjectCard key={project.slug} project={project} delay={index * 0.1} />
                  ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button variant="black" size="lg" asChild className="rounded-md">
                <Link href="/projects/">View All Projects</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-foreground dark:text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              Want to Connect?
            </motion.h2>
            <motion.p
              className="text-xl max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Reach out to discuss cybersecurity challenges, opportunities, or just to chat about the latest in the
              field.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                asChild
                className="shadow-lg shadow-primary/20 transition-all duration-400 bg-[#7B34DD] hover:bg-[#6929C4] text-white"
              >
                <a
                  href="https://www.linkedin.com/in/otori-samson/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Me
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

function FeaturedProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const isRed = project.category === "red"
  const cardColor = isRed ? "text-red-500" : "text-blue-500"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden transition-all duration-400 hover:shadow-lg group">
        <div className="aspect-video relative cursor-pointer bg-gray-100">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>
        <CardHeader className="pb-2 bg-background dark:bg-black">
          <CardTitle className={`text-xl ${cardColor}`}>{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 bg-background dark:bg-black text-muted-foreground dark:text-gray-300">
          <p>{project.description}</p>
        </CardContent>
                 <CardFooter className="bg-background dark:bg-black">
           <Button 
             variant="purple"
             size="sm" 
             className="w-full" 
             asChild
           >
             <Link href={`/projects/${project.slug}/`}>Read More</Link>
           </Button>
         </CardFooter>
      </Card>
    </motion.div>
  )
}
