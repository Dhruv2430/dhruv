import { ProjectData } from "@/lib/projectsData";

export default function ProjectMetrics({ project }: { project: ProjectData }) {
  return (
    <section id="performance" className="py-16 border-b border-[var(--color-border)]">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-[var(--color-foreground)]">Performance Metrics</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {project.metrics.map((metric, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-8 bg-[var(--color-surface)]/20 border border-[var(--color-border)] rounded-2xl text-center hover:bg-[var(--color-surface)]/40 transition-colors">
            <div className="text-4xl md:text-5xl font-display font-semibold text-[var(--color-primary)] mb-2">
              {metric.value}
            </div>
            <div className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
