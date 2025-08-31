"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Shield, TrendingUp, Lightbulb, BookOpen, AlertTriangle, Zap } from "lucide-react"

export interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  categoryCounts: { [key: string]: number }
}

const categories = [
  { id: "All", label: "All", icon: Shield },
  { id: "Foundations", label: "Foundations", icon: BookOpen },
  { id: "Incidents", label: "Incidents", icon: AlertTriangle },
  { id: "Trends", label: "Trends", icon: TrendingUp },
  { id: "Insights", label: "Insights", icon: Lightbulb },
  { id: "Resources", label: "Resources", icon: Zap },
]

export function CategoryFilter({ selectedCategory, onCategoryChange, categoryCounts }: CategoryFilterProps) {
  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    if (category) {
      const IconComponent = category.icon
      return <IconComponent className="w-4 h-4" />
    }
    return null
  }

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case "Foundations":
        return "hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-600/30"
      case "Incidents":
        return "hover:bg-red-600/20 hover:text-red-400 hover:border-red-600/30"
      case "Trends":
        return "hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-600/30"
      case "Insights":
        return "hover:bg-green-600/20 hover:text-green-400 hover:border-green-600/30"
      case "Resources":
        return "hover:bg-orange-600/20 hover:text-orange-400 hover:border-orange-600/30"
      default:
        return "hover:bg-primary/20 hover:text-primary hover:border-primary/30"
    }
  }

  const getActiveCategoryColor = (categoryId: string) => {
    if (selectedCategory !== categoryId) return ""
    
    switch (categoryId) {
      case "Foundations":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30"
      case "Incidents":
        return "bg-red-600/20 text-red-400 border-red-600/30"
      case "Trends":
        return "bg-purple-600/20 text-purple-400 border-purple-600/30"
      case "Insights":
        return "bg-green-600/20 text-green-400 border-green-600/30"
      case "Resources":
        return "bg-orange-600/20 text-orange-400 border-orange-600/30"
      default:
        return "bg-primary/20 text-primary border-primary/30"
    }
  }

  const getPostCount = (categoryId: string) => {
    if (categoryId === "All") {
      return Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)
    }
    return categoryCounts[categoryId] || 0
  }

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {categories.map((category) => {
        const postCount = getPostCount(category.id)
        return (
          <Button
            key={category.id}
            variant="outline"
            size="sm"
            className={`
              cyber-border bg-card/30 text-foreground transition-all duration-300
              ${selectedCategory === category.id ? getActiveCategoryColor(category.id) : ''}
              ${getCategoryColor(category.id)}
              hover:scale-105
            `}
            onClick={() => onCategoryChange(category.id)}
          >
            {getCategoryIcon(category.id)}
            <span className="ml-2">{category.label}</span>
            <span className="ml-2 px-2 py-1 bg-muted/50 rounded-full text-xs">
              {postCount}
            </span>
          </Button>
        )
      })}
    </motion.div>
  )
}
