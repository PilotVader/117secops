"use client"

import { usePathname } from "next/navigation"
import { CyberHeader } from "@/components/cyber-header"
import { SiteHeader } from "@/components/site-header"

export function ConditionalHeader() {
  const pathname = usePathname()
  
  // Use new SiteHeader for blog and projects pages
  const useNewHeader = pathname.startsWith("/blog") || pathname.startsWith("/projects")
  
  return useNewHeader ? <SiteHeader /> : <CyberHeader />
}
