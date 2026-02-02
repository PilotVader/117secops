import { Badge } from "@/components/ui/badge"
import { User, Briefcase, MapPin } from "lucide-react"

export function AuthorBio() {
  return (
    <div className="mt-16 p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            SO
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Samson Otori
            </h3>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              Cybersecurity Analyst
            </Badge>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>SOC Analyst & Security Researcher</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>United Kingdom</span>
            </div>
          </div>
          
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Samson Otori is a cybersecurity professional specializing in incident response, threat analysis, and security operations. With hands-on experience in SOC environments, he focuses on practical defensive security strategies and real-world incident analysis. Through 117SecOps, Samson shares insights on detection engineering, incident response, and the evolving threat landscape to help security teams improve their defensive capabilities.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">Incident Response</Badge>
            <Badge variant="outline" className="text-xs">Threat Analysis</Badge>
            <Badge variant="outline" className="text-xs">SOC Operations</Badge>
            <Badge variant="outline" className="text-xs">Detection Engineering</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
