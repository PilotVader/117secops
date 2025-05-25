import type React from "react"

export interface Project {
  title: string
  client: string
  description: string
  challenge: string
  solution: string
  results: string[]
  image: string
  technologies: string[]
  slug: string
  category: "red" | "blue"
  fullCaseStudy?: React.ReactNode
}

export const projects: Project[] = [
  {
    title: "Financial Institution Security Overhaul",
    client: "Major National Bank",
    description: "Comprehensive security transformation for a financial institution with over 500 branches.",
    challenge:
      "The client faced increasing sophisticated cyber threats targeting customer financial data, with outdated security infrastructure and compliance issues.",
    solution:
      "Implemented a multi-layered security approach including network segmentation, endpoint protection, and a 24/7 security operations center.",
    results: [
      "95% reduction in security incidents",
      "Achieved full regulatory compliance",
      "Reduced incident response time from days to hours",
      "Implemented automated threat detection and response",
    ],
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Network Security", "Endpoint Protection", "SIEM", "Zero Trust"],
    slug: "financial-security-overhaul",
    category: "red",
    fullCaseStudy: (
      <>
        <p>
          This major national bank with over 500 branches nationwide faced increasingly sophisticated cyber threats
          targeting sensitive customer financial data. Their outdated security infrastructure and compliance issues put
          them at significant risk of a major breach.
        </p>
        <p className="mt-4">Our comprehensive security transformation included:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Complete network segmentation to isolate critical systems</li>
          <li>Next-generation endpoint protection across all devices</li>
          <li>Implementation of a 24/7 security operations center</li>
          <li>Staff security awareness training program</li>
          <li>Regular penetration testing and vulnerability assessments</li>
        </ul>
        <p className="mt-4">
          The results were transformative, with a 95% reduction in security incidents, full regulatory compliance, and
          incident response time reduced from days to hours. The automated threat detection and response capabilities
          now allow the bank to stay ahead of emerging threats.
        </p>
      </>
    ),
  },
  {
    title: "E-commerce Platform Protection",
    client: "Global Online Retailer",
    description: "Security enhancement for a high-traffic e-commerce platform processing millions in transactions.",
    challenge:
      "The e-commerce platform experienced frequent DDoS attacks, payment fraud attempts, and had vulnerabilities in their web applications.",
    solution:
      "Deployed advanced DDoS protection, implemented secure payment processing, and conducted thorough application security testing.",
    results: [
      "Eliminated downtime from DDoS attacks",
      "Reduced payment fraud by 87%",
      "Fixed 124 critical web application vulnerabilities",
      "Implemented continuous security testing",
    ],
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["DDoS Protection", "Fraud Prevention", "Web Application Security", "PCI DSS"],
    slug: "ecommerce-platform-protection",
    category: "red",
    fullCaseStudy: (
      <>
        <p>
          This global online retailer was processing millions in transactions but faced frequent DDoS attacks, payment
          fraud attempts, and had numerous vulnerabilities in their web applications. These issues were causing
          significant financial losses and damaging customer trust.
        </p>
        <p className="mt-4">Our comprehensive security enhancement included:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Deployment of advanced DDoS protection infrastructure</li>
          <li>Implementation of AI-powered fraud detection systems</li>
          <li>Thorough application security testing and remediation</li>
          <li>PCI DSS compliance implementation</li>
          <li>Continuous security monitoring and testing</li>
        </ul>
        <p className="mt-4">
          The results were immediate and significant. Downtime from DDoS attacks was completely eliminated, payment
          fraud was reduced by 87%, and 124 critical web application vulnerabilities were identified and fixed. The
          implementation of continuous security testing ensures that new vulnerabilities are quickly identified and
          addressed.
        </p>
      </>
    ),
  },
  {
    title: "Government Agency Security Modernization",
    client: "State Government Department",
    description: "Security infrastructure modernization for a government agency handling sensitive citizen data.",
    challenge:
      "The agency had legacy systems with numerous vulnerabilities, inadequate access controls, and no disaster recovery plan.",
    solution:
      "Modernized security infrastructure, implemented strict access controls with MFA, and developed comprehensive disaster recovery procedures.",
    results: [
      "Modernized 15-year-old security systems",
      "Implemented zero-trust architecture",
      "Reduced unauthorized access attempts by 99%",
      "Created and tested disaster recovery plan",
    ],
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Government Security", "Access Control", "Disaster Recovery", "Legacy Modernization"],
    slug: "government-security-modernization",
    category: "blue",
    fullCaseStudy: (
      <>
        <p>
          This state government department was responsible for handling sensitive citizen data but was operating with
          legacy systems that had numerous vulnerabilities. They had inadequate access controls and no disaster recovery
          plan, putting critical government services and citizen information at risk.
        </p>
        <p className="mt-4">Our security modernization project included:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Complete overhaul of 15-year-old security systems</li>
          <li>Implementation of zero-trust architecture across all systems</li>
          <li>Deployment of multi-factor authentication for all access points</li>
          <li>Development of comprehensive disaster recovery procedures</li>
          <li>Regular security drills and tabletop exercises</li>
        </ul>
        <p className="mt-4">
          The modernization resulted in significantly improved security posture, with unauthorized access attempts
          reduced by 99%. The implementation of zero-trust architecture ensures that even if perimeter defenses are
          breached, attackers cannot move laterally within the network. The comprehensive disaster recovery plan ensures
          continuity of government services even in the event of a major incident.
        </p>
      </>
    ),
  },
]
