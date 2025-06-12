import { NextResponse } from "next/server"
import { getSortedProjectsData } from "@/lib/project"

export const dynamic = "force-static"

export async function GET() {
  try {
    const projects = await getSortedProjectsData()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}