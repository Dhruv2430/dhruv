import { CheckCircle2, Wrench } from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

export default function ProjectChallenges({ project }: { project: ProjectData }) {
  return (
    <section id="challenges" className="py-16 border-b border-[var(--color-border)]">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-[var(--color-foreground)]">Challenges & Solutions</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {project.challenges.map((item, index) => (
          <div key={index} className="bg-[var(--color-surface)]/30 border border-[var(--color-border)] p-6 rounded-2xl">
             <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-lg shrink-0">
                  <Wrench size={18} />
                </div>
                <div>
                   <h3 className="font-medium text-[var(--color-foreground)]">{item.title}</h3>
                </div>
             </div>
             <div className="flex items-start gap-3 pl-2">
               <div className="w-[2px] h-full bg-[var(--color-border)] absolute -left-4 top-10"></div>
               <div className="p-2 bg-green-500/10 text-green-500 rounded-lg shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                   <p className="text-sm text-[var(--color-text-muted)] mt-1">{item.solution}</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
