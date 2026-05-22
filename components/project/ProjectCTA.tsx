import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

export default function ProjectCTA({ project }: { project: ProjectData }) {
  const isWorkflow = project.slug === "ai-saas-workflow-platform";
  const nextProjectSlug = isWorkflow ? "ai-code-review-platform" : "ai-saas-workflow-platform";
  const nextProjectTitle = isWorkflow ? "AI Code Review Platform" : "AI SaaS Workflow Platform";

  return (
    <section className="mt-24 border-t border-[var(--color-border)] pt-16 w-full">
      <div className="grid md:grid-cols-2 gap-6 w-full mb-12">
        {/* Back to Portfolio Box */}
        <Link 
          href="/#projects" 
          className="flex flex-col justify-between p-8 md:p-10 rounded-[1.5rem] bg-[var(--color-surface)]/10 border border-[var(--color-border)] hover:bg-[var(--color-surface)]/20 transition-all duration-300 group cursor-pointer"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-8 flex items-center gap-2">
            <ArrowLeft size={12} className="transform transition-transform group-hover:-translate-x-1" /> Return
          </div>
          <div>
            <h4 className="text-xl font-semibold text-[var(--color-foreground)] mb-2 font-display">Back to Portfolio</h4>
            <p className="text-xs text-[var(--color-text-muted)]">Explore other projects on the homepage.</p>
          </div>
        </Link>

        {/* Next Project Box */}
        <Link 
          href={`/projects/${nextProjectSlug}`} 
          className="flex flex-col justify-between p-8 md:p-10 rounded-[1.5rem] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/20 transition-all duration-300 group cursor-pointer"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-8 flex items-center justify-between">
            <span>Next Project</span>
            <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-[var(--color-foreground)] mb-2 font-display">{nextProjectTitle}</h4>
            <p className="text-xs text-[var(--color-text-muted)]">View detailed implementation and workflow.</p>
          </div>
        </Link>
      </div>
      
      {/* Giant Full-Width Call to Action */}
      <div className="bg-white/60 backdrop-blur-md border border-[var(--color-border)] rounded-[1.8rem] p-10 md:p-16 text-center shadow-sm w-full">
        <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-foreground)] mb-4">
          Want to build something similar?
        </h3>
        <p className="text-base text-[var(--color-text-muted)] max-w-xl mx-auto mb-10 font-sans">
          Let&apos;s collaborate to design and develop your next-generation application. I&apos;m open to contract work, consultation, and freelance engineering.
        </p>
        <Link
          href="/#contact"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[var(--color-primary)] text-[var(--color-button-text)] px-10 py-4.5 rounded-xl font-medium hover:bg-[var(--color-primary-hover)] transition-all duration-300 shadow-lg shadow-[var(--color-primary)]/10 group text-xs tracking-widest uppercase font-mono"
        >
          Get In Touch
          <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
