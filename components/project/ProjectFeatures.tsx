import * as Icons from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BrainCircuit: Icons.BrainCircuit,
  Search: Icons.Search,
  Zap: Icons.Zap,
  Users: Icons.Users,
  BarChart3: Icons.BarChart3,
  Lock: Icons.Lock,
  Settings: Icons.Settings
};

export default function ProjectFeatures({ project }: { project: ProjectData }) {
  return (
    <section id="features" className="py-16 border-b border-[var(--color-border)]">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-[var(--color-foreground)]">Core Features</h2>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
          {project.features.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.features.list.map((feature, index) => {
          const FeatureIcon = iconMap[feature.icon] || Icons.HelpCircle;
          return (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-[var(--color-surface)]/20 border border-[var(--color-border)] hover:bg-[var(--color-surface)]/40 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center mb-6 group-hover:text-[var(--color-primary)] transition-colors">
                <FeatureIcon size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-[var(--color-foreground)]">{feature.title}</h3>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
