import { ProjectData } from "@/lib/projectsData";

export default function ProjectDatabaseSchema({ project }: { project: ProjectData }) {
  return (
    <section id="database" className="py-16 border-b border-[var(--color-border)]">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-[var(--color-foreground)]">Database Schema</h2>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
          {project.database.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-8">
        {project.database.collections.map((coll, index) => (
          <div 
            key={index} 
            className="bg-[var(--color-surface)]/20 border border-[var(--color-border)] rounded-xl w-64 overflow-hidden relative"
          >
            <div className="bg-[var(--color-surface)]/50 px-4 py-2 border-b border-[var(--color-border)] flex items-center justify-between">
              <span className="font-semibold text-sm">{coll.name.replace(" Collection", "")}</span>
              <span className="text-xs text-[var(--color-text-muted)]">Collection</span>
            </div>
            <div className="p-4 flex flex-col gap-2 font-mono text-xs">
              {coll.fields.map((field, fIdx) => (
                <div key={fIdx} className="flex justify-between">
                  <span className={field.primary ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)]"}>
                    {field.name}
                  </span>
                  <span className="text-[var(--color-text-muted)]">{field.type}</span>
                </div>
              ))}
            </div>
            {/* SVG line pointing to the previous element if not the first one */}
            {index > 0 && (
              <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-[var(--color-border)] border-dashed hidden md:block"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
