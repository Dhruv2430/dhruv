import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

export default function ProjectProblemSolution({ project }: { project: ProjectData }) {
  return (
    <section className="py-16 border-b border-[var(--color-border)]">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Problem Card */}
        <div id="problem" className="bg-[var(--color-surface)]/30 rounded-2xl p-8 border border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-semibold">The Problem</h3>
          </div>
          
          <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
            {project.problem.description}
          </p>
          
          <ul className="space-y-4">
            {project.problem.points.map((item, i) => (
              <li key={i} className="flex gap-3 text-[var(--color-foreground)]">
                <div className="mt-1 min-w-5 text-[var(--color-text-muted)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] mt-2" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution Card */}
        <div id="solution" className="bg-[var(--color-surface)]/60 rounded-2xl p-8 border border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg text-[var(--color-primary)]">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-semibold">The Solution</h3>
          </div>
          
          <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
            {project.solution.description}
          </p>
          
          <ul className="space-y-4">
            {project.solution.points.map((item, i) => (
              <li key={i} className="flex gap-3 text-[var(--color-foreground)]">
                <div className="mt-1 min-w-5 text-[var(--color-primary)]">
                  <CheckCircle2 size={16} />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
