import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'About',
  description: 'Samson Otori - Cybersecurity analyst and engineer based in the UK. Currently pursuing MSc in Cybersecurity at Edge Hill University. Background in SOC operations, threat hunting, DFIR, and security infrastructure.',
  openGraph: {
    title: 'About | 117 SecOps',
    description: 'Cybersecurity analyst and engineer with hands-on experience in SOC operations, threat hunting, DFIR, and security infrastructure. Currently pursuing MSc in Cybersecurity at Edge Hill University, UK.',
    url: 'https://www.117secops.com/about',
    type: 'profile',
  },
  alternates: {
    canonical: 'https://www.117secops.com/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

