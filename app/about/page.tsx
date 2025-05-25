"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  Lock,
  Code,
  Server,
  Database,
  Zap,
  Github,
  Cloud,
  LayoutGrid,
  File,
} from "lucide-react"
import PageTransition from "@/components/page-transition"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-purple-500/10 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center text-center space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tighter" variants={fadeIn}>
                About Me
              </motion.h1>
              <motion.p className="text-xl max-w-3xl mx-auto text-gray-100" variants={fadeIn}>
                Security analyst in training - breaking, fixing and documenting systems. 117SecOps is my public lab
                notebook for offensive/defensive experiments.
              </motion.p>
            </motion.div>
          </div>

          {/* Animated background elements */}
          <motion.div
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </section>

        {/* Company History */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight mb-6 text-gradient">My Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    With over 8 years in the cybersecurity industry, I began my journey with a simple mission: to make
                    enterprise-grade cybersecurity accessible to organizations of all sizes. As a veteran of the
                    cybersecurity industry, I recognized that many businesses lacked the resources and expertise to
                    properly defend themselves against increasingly sophisticated cyber threats.
                  </p>
                  <p>
                    What started as a passion for information security has evolved into a comprehensive approach to
                    cybersecurity with expertise in multiple domains. Throughout my career, I've maintained core values
                    of integrity, excellence, and client partnership.
                  </p>
                  <p>
                    Today, I serve clients across multiple industries, from financial services and healthcare to
                    government and manufacturing, combining deep technical expertise with a practical, business-focused
                    approach to security.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative rounded-lg overflow-hidden"
              >
                <div className="w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smason.png-FkQLzPrsMUw5FqUFhBt4UZts1Y2bRz.jpeg"
                    alt="117SECOPS founder"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-400" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-gradient">MY MISSION</h2>
            </motion.div>
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <Card className="card-transition border-primary/10">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      To develop the hands-on security expertise that protects modern businesses—while documenting my
                      journey openly at 117SecOps. I believe effective cybersecurity isn't just about tools, but
                      practical risk management that enables growth. Every lab, tutorial, and project brings me closer
                      to becoming the defender organizations need.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Educational Background */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-gradient">Educational Background</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                My academic journey and professional certifications
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="card-transition border-primary/10 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Academic Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold">MSc Cybersecurity</h3>
                      <p className="text-primary font-medium">Edge Hill University, UK | 2024 - Present</p>
                      <p className="text-muted-foreground mt-2">
                        Focus: Malware Analysis, Infrastructure Security, Penetration Testing
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">BSc Computer Science</h3>
                      <p className="text-primary font-medium">Veritas University, Abuja | 2015 - 2020</p>
                      <p className="text-muted-foreground mt-2">Focus: Networks, Security, Software Engineering</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="card-transition border-primary/10 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Continuing Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold">Professional Development</h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <p className="text-muted-foreground">
                            Advanced Incident Response Training, SANS Institute, 2023
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <p className="text-muted-foreground">Cloud Security Architecture Workshop, AWS, 2022</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <p className="text-muted-foreground">Offensive Security Training Program, 2021</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Online Courses</h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <p className="text-muted-foreground">Advanced Penetration Testing, Udemy, 2023</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <p className="text-muted-foreground">Secure Coding Practices, Coursera, 2022</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <p className="text-muted-foreground">Ethical Hacking Masterclass, Pluralsight, 2021</p>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills, Expertise, and Experience Tabs */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-gradient">Professional Profile</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                My skills, expertise, and professional experience
              </p>
            </motion.div>

            <Tabs defaultValue="experience" className="w-full mb-12">
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <TabsList className="border border-primary/20">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="expertise">Expertise</TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="skills" className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {skills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="expertise" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {expertise.map((item, index) => (
                    <ExpertiseCard key={index} expertise={item} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-8">
                <div className="space-y-8">
                  {experience.map((job, index) => (
                    <ExperienceCard key={index} job={job} index={index} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.h2 className="text-3xl font-bold tracking-tight text-gradient">Contact Me</motion.h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Get in touch with our team to discuss your cybersecurity needs
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              <ContactCard
                icon={<Mail className="h-6 w-6 text-primary" />}
                title="Email"
                description="For general inquiries and support"
                contact="info@117secops.com"
                href="mailto:info@117secops.com"
                index={0}
              />
              <ContactCard
                icon={<Phone className="h-6 w-6 text-primary" />}
                title="Phone"
                description="Monday to Friday, 9am to 6pm EST"
                contact="+1 (800) 555-1234"
                href="tel:+18005551234"
                index={1}
              />
              <ContactCard
                icon={<MapPin className="h-6 w-6 text-primary" />}
                title="Office"
                description="Visit our headquarters"
                contact={
                  <>
                    1234 Cyber Street
                    <br />
                    Suite 500
                    <br />
                    Boston, MA 02110
                  </>
                }
                index={2}
              />
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">GitHub</h3>
                <a
                  href="https://github.com/PilotVader"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors duration-400"
                >
                  github.com/PilotVader
                </a>
                <p className="text-sm text-muted-foreground mt-1">Check out my code repositories and projects</p>
              </div>
            </div>
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button size="lg" asChild className="shadow-lg shadow-primary/20 transition-all duration-400">
                <a href="https://www.linkedin.com/in/otori-samson/" target="_blank" rel="noopener noreferrer">
                  Get in Touch
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

interface Skill {
  name: string
  description: string
  icon: React.ReactNode
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden transition-all duration-400 hover:shadow-lg hover:shadow-primary/10 group card-transition border-primary/10">
        <CardContent className="p-6">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-400">
            {skill.icon}
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-400">{skill.name}</h3>
          <p className="text-sm text-muted-foreground mt-2">{skill.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  description: string
  contact: React.ReactNode
  href?: string
  index: number
}

function ContactCard({ icon, title, description, contact, href, index }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="card-transition border-primary/10">
        <CardContent className="flex flex-col items-center text-center p-6">
          <div className="bg-primary/10 p-3 rounded-full mb-4 group-hover:bg-primary/20 transition-colors duration-400">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          {href ? (
            <a href={href} className="text-primary hover:underline transition-colors duration-400">
              {contact}
            </a>
          ) : (
            <address className="not-italic text-primary">{contact}</address>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface Expertise {
  area: string
  description: string
  skills: string[]
  icon: React.ReactNode
}

function ExpertiseCard({ expertise, index }: { expertise: Expertise; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden transition-all duration-400 hover:shadow-lg hover:shadow-primary/10 group card-transition border-primary/10">
        <CardContent className="p-6">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-400">
            {expertise.icon}
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-400">
            {expertise.area}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">{expertise.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {expertise.skills.map((skill, i) => (
              <Badge key={i} variant="outline" className="bg-primary/5 border-primary/20">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface Job {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
}

function ExperienceCard({ job, index }: { job: Job; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden transition-all duration-400 hover:shadow-lg hover:shadow-primary/10 group card-transition border-primary/10">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors duration-400">
                {job.title}
              </CardTitle>
              <CardDescription className="text-primary">{job.company}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/5 border-primary/20">
              {job.period}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{job.description}</p>
          <div>
            <h4 className="font-medium text-primary mb-2">Key Achievements:</h4>
            <ul className="space-y-1 text-muted-foreground">
              {job.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const skills: Skill[] = [
  {
    name: "Hardware/Software Troubleshooting",
    description: "System administration and technical support for various hardware and software environments.",
    icon: <Server className="h-6 w-6 text-primary" />,
  },
  {
    name: "Operating Systems Management",
    description: "Administration and configuration of Windows and Linux operating systems.",
    icon: <Code className="h-6 w-6 text-primary" />,
  },
  {
    name: "Data Analysis & Programming",
    description: "Development and analysis using Java, Excel, Python, and SQL.",
    icon: <Database className="h-6 w-6 text-primary" />,
  },
  {
    name: "Network Administration",
    description: "Setting up, managing, and securing network infrastructure.",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    name: "Technical Documentation",
    description: "Creating comprehensive documentation for systems, processes, and procedures.",
    icon: <File className="h-6 w-6 text-primary" />,
  },
  {
    name: "Problem-Solving & Troubleshooting",
    description: "Identifying and resolving complex technical issues efficiently.",
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
]

// Add the expertise and experience data
const expertise: Expertise[] = [
  {
    area: "Offensive Security",
    description:
      "Specialized in identifying vulnerabilities and security weaknesses through ethical hacking and penetration testing.",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Red Teaming", "Social Engineering"],
    icon: <Lock className="h-6 w-6 text-primary" />,
  },
  {
    area: "Defensive Security",
    description:
      "Expert in implementing robust security controls and monitoring systems to protect against cyber threats.",
    skills: ["SIEM Implementation", "Threat Hunting", "Incident Response", "Security Monitoring"],
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    area: "Cloud Security",
    description:
      "Specialized in securing cloud environments and implementing security best practices across major cloud platforms.",
    skills: ["AWS Security", "Azure Security", "GCP Security", "Cloud Architecture"],
    icon: <Cloud className="h-6 w-6 text-primary" />,
  },
  {
    area: "Security Architecture",
    description: "Designing comprehensive security frameworks and architectures for organizations of all sizes.",
    skills: ["Zero Trust", "Security Frameworks", "Risk Assessment", "Compliance"],
    icon: <LayoutGrid className="h-6 w-6 text-primary" />,
  },
]

const experience: Job[] = [
  {
    title: "System Operator",
    company: "Transmission Company of Nigeria",
    period: "June 2021 - April 2022",
    description:
      "Provided 24/7 system monitoring and IT support during 12-hour shifts, ensuring uninterrupted operations and timely issue resolution.",
    achievements: [
      "Managed IT helpdesk operations, tracking and resolving technical support requests for operational continuity",
      "Maintained database integrity and performed regular system data collection and verification",
      "Coordinated IT procurement and implemented cost-effective technical solutions",
      "Conducted technical training sessions and created documentation for knowledge transfer",
    ],
  },
  {
    title: "Blog Manager",
    company: "Goody PC",
    period: "March 2020 - April 2021",
    description:
      "Led content strategy development and managed a team of content creators for the company blog platform.",
    achievements: [
      "Implemented audience engagement strategies to increase reader interaction",
      "Established and monitored key performance metrics for traffic and engagement",
      "Utilised data analytics tools to drive content optimisation and decision-making",
      "Maintained quality control and editorial standards across all blog content",
    ],
  },
  {
    title: "Internship",
    company: "HiiT plc",
    period: "March 2018 - September 2018",
    description: "Developed a comprehensive Hospital Management System using Java and OOP principles.",
    achievements: [
      "Created and maintained database schemas using MySQL/Oracle for patient records",
      "Designed user-friendly interfaces using Java GUI frameworks (Swing/JavaFX)",
      "Implemented database connectivity and system integration features",
      "Conducted system testing and delivered project progress presentations",
    ],
  },
]
