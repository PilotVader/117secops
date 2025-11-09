import { getSortedProjectsData } from "@/lib/project"
import ProjectsClientPage from "./ProjectsClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Hands-on cybersecurity projects including SIEM/XDR deployments (Wazuh, Elastic), threat hunting scenarios, malware analysis, incident response, and security infrastructure lab experiments. Practical security engineering documentation.',
  openGraph: {
    title: 'Projects | 117 SecOps',
    description: 'Hands-on cybersecurity projects including SIEM/XDR deployments, threat hunting, malware analysis, and security infrastructure experiments.',
    url: 'https://www.117secops.com/projects',
  },
  alternates: {
    canonical: 'https://www.117secops.com/projects',
  },
}

export default async function ProjectsPage() {
  const projects = await getSortedProjectsData()

  return <ProjectsClientPage initialProjects={projects} />
}
