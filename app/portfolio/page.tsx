"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animations"
import Background3D from "@/components/3d-background"
import Card3D from "@/components/3d-card"
import { useState } from "react"
import { X } from "lucide-react"

export default function PortfolioPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<null | { name: string; image: string }>(null)

  return (
    <PageTransition>
      <Background3D />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <motion.div
          className="flex flex-col items-center text-center space-y-4 mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-gradient" variants={fadeIn}>
            My Portfolio
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-3xl" variants={fadeIn}>
            Showcasing my expertise, certifications, and achievements in cybersecurity
          </motion.p>
        </motion.div>

        <Tabs defaultValue="certifications" className="w-full mb-12">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <TabsList className="border border-primary/20">
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="certifications" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <CertificationCard
                  key={index}
                  certification={cert}
                  index={index}
                  setSelectedCertificate={setSelectedCertificate}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} achievement={achievement} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Industry Recognition Section */}
        <section className="mt-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gradient">Industry Recognition</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Awards and recognition from leading cybersecurity organizations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <AwardCard key={index} award={award} index={index} />
            ))}
          </div>
        </section>
      </div>

      {/* Certificate Lightbox */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedCertificate(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-auto">
            <button
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"
              onClick={() => setSelectedCertificate(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <Image
              src={selectedCertificate.image || "/placeholder.svg"}
              alt={selectedCertificate.name}
              width={1200}
              height={800}
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </PageTransition>
  )
}

interface Certification {
  name: string
  organization: string
  image: string
  year: string
  description: string
  certificateUrl?: string
}

function CertificationCard({
  certification,
  index,
  setSelectedCertificate,
}: {
  certification: Certification
  index: number
  setSelectedCertificate: (certificate: { name: string; image: string }) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card3D>
        <div
          className="h-40 relative bg-muted flex items-center justify-center p-6 overflow-hidden cursor-pointer"
          onClick={() => setSelectedCertificate({ name: certification.name, image: certification.image })}
        >
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-400" />
          <Image
            src={certification.image || "/placeholder.svg"}
            alt={certification.name}
            width={150}
            height={150}
            className="object-contain max-h-full relative z-10 transition-transform duration-400 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-400">
            {certification.name}
          </CardTitle>
          <CardDescription className="text-primary/80">
            {certification.organization} • {certification.year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{certification.description}</p>
          {certification.certificateUrl && (
            <a
              href={certification.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors duration-200 mt-2"
            >
              🔗 View Certificate
            </a>
          )}
        </CardContent>
      </Card3D>
    </motion.div>
  )
}

interface Achievement {
  title: string
  date: string
  description: string
  image: string
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card3D>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative overflow-hidden">
            <Image
              src={achievement.image || "/placeholder.svg"}
              alt={achievement.title}
              width={300}
              height={200}
              className="object-cover h-full transition-transform duration-400 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-400" />
          </div>
          <div className="md:w-2/3">
            <CardHeader>
              <CardTitle className="text-xl group-hover:text-primary transition-colors duration-400">
                {achievement.title}
              </CardTitle>
              <CardDescription className="text-primary/80">{achievement.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{achievement.description}</p>
            </CardContent>
          </div>
        </div>
      </Card3D>
    </motion.div>
  )
}

interface Award {
  title: string
  organization: string
  year: string
  description: string
  image: string
}

function AwardCard({ award, index }: { award: Award; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card3D>
        <div className="h-40 relative bg-muted flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-400" />
          <Image
            src={award.image || "/placeholder.svg"}
            alt={award.title}
            width={150}
            height={150}
            className="object-contain max-h-full relative z-10 transition-transform duration-400 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-400">
            {award.title}
          </CardTitle>
          <CardDescription className="text-primary/80">
            {award.organization} • {award.year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{award.description}</p>
        </CardContent>
      </Card3D>
    </motion.div>
  )
}

const certifications = [
  {
    name: "IBM IT Support Professional Certificate",
    organization: "IBM & Coursera",
    image: "/images/ibm-it-support-cert.png",
    year: "2022",
    description:
      "Completed 7 courses covering IT fundamentals, hardware, software, networking, cybersecurity, cloud computing, and database essentials.",
  },
  {
    name: "Google IT Support Professional Certificate",
    organization: "Google & Coursera",
    image: "/images/google-it-support-cert.png",
    year: "2022",
    description:
      "Completed 5 courses covering troubleshooting, customer service, networking, operating systems, system administration, and security.",
  },
  {
    name: "Microsoft Security, Compliance, and Identity Fundamentals",
    organization: "Microsoft",
    image: "/images/microsoft-security-cert.png",
    year: "2025",
    description: "Mastered fundamentals of security, compliance, and identity across Microsoft services and platforms.",
  },
  {
    name: "ISO/IEC 27001:2022 Lead Auditor Certification",
    organization: "Mastermind Assurance & Certification Ltd",
    image: "/images/ISO-IEC-27001-Cert.png",
    year: "2025",
    description: "Completed intensive training covering ISMS principles, audit planning, evidence gathering, reporting, risk assessment, Annex A controls, and ISO 19011 auditing guidelines.",
    certificateUrl: "https://learn.mastermindassurance.com/certificates/ezndpc9m98",
  },
]

const achievements = [
  {
    title: "COMING SOON",
    date: "Future",
    description: "COMING SOON",
    image: "/placeholder.svg?height=200&width=300&text=COMING+SOON",
  },
]

const awards = [
  {
    title: "COMING SOON",
    organization: "Future Award",
    year: "Future",
    description: "COMING SOON",
    image: "/placeholder.svg?height=150&width=150&text=COMING+SOON",
  },
 
]
