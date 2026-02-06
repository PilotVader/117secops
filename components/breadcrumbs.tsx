import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  truncateLimit?: number
}

export function Breadcrumbs({ items, truncateLimit = 40 }: BreadcrumbsProps) {
  const truncate = (text: string, limit: number) => {
    if (text.length <= limit) return text
    return text.substring(0, limit) + "..."
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6 font-mono overflow-hidden whitespace-nowrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-3 w-3 text-slate-400" />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(
                "font-medium",
                isLast ? "text-slate-900 dark:text-slate-100 truncate" : "text-slate-500"
              )}>
                {isLast ? truncate(item.label, truncateLimit) : item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}


