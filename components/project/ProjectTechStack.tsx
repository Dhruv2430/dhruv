import * as Icons from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor: Icons.Monitor,
  Server: Icons.Server,
  Database: Icons.Database,
  BrainCircuit: Icons.BrainCircuit,
  Cloud: Icons.Cloud,
  Cog: Icons.Cog
};

export default function ProjectTechStack({ project }: { project: ProjectData }) {
  return (
    <section id="tech-stack" className="py-16 border-b border-[var(--color-border)]">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-[var(--color-foreground)]">Tech Stack Breakdown</h2>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
          Detailed breakdown of tools and frameworks used to build the platform.
        </p>
      </div>

      <div className="space-y-4">
        {project.techStack.map((category, index) => {
          const TechIcon = iconMap[category.icon] || Icons.HelpCircle;
          return (
            <div 
              key={index} 
              className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[var(--color-surface)]/20 border border-[var(--color-border)] rounded-2xl gap-4 hover:bg-[var(--color-surface)]/30 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-[240px]">
                <div className={`p-3 rounded-xl ${category.bg} ${category.color}`}>
                  <TechIcon size={24} />
                </div>
                <h3 className="font-semibold text-[var(--color-foreground)]">{category.title}</h3>
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--color-foreground)] leading-relaxed">
                  {category.technologies}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
