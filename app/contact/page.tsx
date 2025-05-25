"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DateInput } from "@/components/ui/date-input"
import PageTransition from "@/components/page-transition"
import { fadeIn, staggerContainer } from "@/lib/animations"
import { Mail, Phone, Calendar, Clock, Send, Shield } from "lucide-react"

export default function ContactPage() {
  const [date, setDate] = useState<Date>()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    time: "morning",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your server
    console.log({ ...formData, date })
    setSubmitted(true)
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <motion.div
          className="flex flex-col items-center text-center space-y-4 mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-gradient" variants={fadeIn}>
            Get in Touch
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-3xl" variants={fadeIn}>
            Schedule a consultation or reach out with any questions about cybersecurity services
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Card className="border-primary/10 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">Schedule a Consultation</CardTitle>
                <CardDescription>
                  Fill out the form below to book a time to discuss your cybersecurity needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-400"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-400"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company (Optional)
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-400"
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Date</label>
                      <DateInput date={date} setDate={(newDate) => setDate(newDate)} />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="time" className="text-sm font-medium">
                        Preferred Time
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-400"
                      >
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (1PM - 5PM)</option>
                        <option value="evening">Evening (6PM - 8PM)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-400"
                        placeholder="Tell us about your cybersecurity needs or concerns"
                      />
                    </div>

                    <Button type="submit" className="w-full shadow-lg shadow-primary/10 transition-all duration-400">
                      <Send className="mr-2 h-4 w-4" /> Submit Request
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-center">Thank You!</h3>
                    <p className="text-center text-muted-foreground">
                      Your consultation request has been received. We'll contact you shortly to confirm your appointment
                      {date && ` on ${date.toLocaleDateString()}`}.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          message: "",
                          time: "morning",
                        })
                        setDate(undefined)
                      }}
                      className="mt-4"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <Card className="border-primary/10 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <CardDescription>Reach out directly through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">info@117secops.com</p>
                    <p className="text-sm text-muted-foreground mt-1">For general inquiries and support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1 (800) 555-1234</p>
                    <p className="text-sm text-muted-foreground mt-1">Monday to Friday, 9am to 6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Availability</h3>
                    <p className="text-muted-foreground">Monday to Friday</p>
                    <p className="text-sm text-muted-foreground mt-1">Consultations available during business hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Response Time</h3>
                    <p className="text-muted-foreground">Within 24 hours</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We aim to respond to all inquiries within one business day
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-lg shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">Emergency Response</CardTitle>
                <CardDescription>For urgent cybersecurity inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you're experiencing an active security breach or incident that requires immediate attention, please
                  use our emergency hotline:
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <p className="font-bold text-primary text-lg">+1 (800) 555-9999</p>
                  <p className="text-sm text-muted-foreground mt-1">Available 24/7 for critical incidents</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-primary/20 hover:border-primary transition-all duration-400"
                >
                  Emergency Response Protocol
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
