"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavigatorItem {
  slug: string
  title: string
  summary?: string
  image?: string
  date?: string
  seriesName?: string
  seriesPart?: number
  totalParts?: number
}

type AccentColor = "purple" | "blue" | "red" | "green"

interface PostNavigatorProps {
  previous?: NavigatorItem
  next?: NavigatorItem
  basePath: string
  accent?: AccentColor
}

const accentMap: Record<AccentColor, { text: string; badge: string }> = {
  purple: {
    text: "text-purple-400",
    badge: "bg-purple-500/10 text-purple-300 border border-purple-500/30",
  },
  blue: {
    text: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-300 border border-blue-500/30",
  },
  red: {
    text: "text-red-400",
    badge: "bg-red-500/10 text-red-300 border border-red-500/30",
  },
  green: {
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
  },
}

const truncate = (text?: string, maxLength: number = 140) => {
  if (!text) return undefined
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1)}…`
}

const formatSeriesLabel = (item: NavigatorItem) => {
  if (!item.seriesName) return undefined
  if (item.totalParts && item.seriesPart) {
    return `${item.seriesName} · Part ${item.seriesPart}${item.totalParts ? ` of ${item.totalParts}` : ""}`
  }
  if (item.seriesPart) {
    return `${item.seriesName} · Part ${item.seriesPart}`
  }
  return item.seriesName
}

const PostCard = ({
  item,
  label,
  direction,
  basePath,
  accent = "purple",
}: {
  item: NavigatorItem
  label: string
  direction: "previous" | "next"
  basePath: string
  accent?: AccentColor
}) => {
  const accentStyles = accentMap[accent]
  const url = `${basePath}/${item.slug}`
  const seriesLabel = formatSeriesLabel(item)
  const truncatedSummary = truncate(item.summary)

  return (
    <Link
      href={url}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-border/60",
        "bg-card/30 backdrop-blur-sm p-5 transition-all duration-300 hover:border-border/80 hover:bg-card/60"
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground", accentStyles.text)}>
          {label}
        </span>
        {seriesLabel && (
          <span className={cn("text-[10px] px-2 py-1 rounded-full", accentStyles.badge)}>
            {seriesLabel}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start gap-4">
        {item.image && (
          <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-border/40 bg-background/40">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-white transition-colors">
            {item.title}
          </h3>
          {truncatedSummary && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {truncatedSummary}
            </p>
          )}
          {item.date && (
            <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground/70">
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      <div
        className={cn(
          "mt-6 flex items-center gap-2 text-sm font-medium transition-colors",
          accentStyles.text
        )}
      >
        {direction === "previous" ? (
          <>
            <ArrowLeft className="h-4 w-4" />
            <span>Read previous</span>
          </>
        ) : (
          <>
            <span>Read next</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </div>
    </Link>
  )
}

export function PostNavigator({ previous, next, basePath, accent = "purple" }: PostNavigatorProps) {
  if (!previous && !next) {
    return null
  }

  return (
    <div className="mt-12 border-t border-border/60 pt-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">Continue Reading</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {previous && (
          <PostCard
            item={previous}
            label="Previous"
            direction="previous"
            basePath={basePath}
            accent={accent}
          />
        )}
        {next && (
          <PostCard
            item={next}
            label="Next"
            direction="next"
            basePath={basePath}
            accent={accent}
          />
        )}
      </div>
    </div>
  )
}

