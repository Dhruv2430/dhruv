import * as Icons from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MessageSquare: Icons.MessageSquare,
  Cpu: Icons.Cpu,
  Smartphone: Icons.Smartphone,
  BarChart: Icons.BarChart,
  Settings: Icons.Settings,
  Users: Icons.Users
};

export default function ProjectFuture({ project }: { project: ProjectData }) {
  return (
    <section id="future" className="py-16 border-b border-[var(--color-border)]">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-[var(--color-foreground)]">Future Improvements</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {project.future.map((item, index) => {
          const FutureIcon = iconMap[item.icon] || Icons.HelpCircle;
          return (
            <div key={index} className="flex items-center gap-4 p-4 bg-[var(--color-surface)]/10 border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-surface)]/30 transition-colors">
              <FutureIcon size={20} className="text-[var(--color-text-muted)] shrink-0" />
              <span className="text-sm font-medium text-[var(--color-foreground)]">{item.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
