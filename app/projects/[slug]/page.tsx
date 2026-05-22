import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Code } from "lucide-react";
import { projectsData } from "@/lib/projectsData";

import ProjectSidebar from "@/components/project/ProjectSidebar";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectProblemSolution from "@/components/project/ProjectProblemSolution";
import ProjectFeatures from "@/components/project/ProjectFeatures";
import ProjectArchitecture from "@/components/project/ProjectArchitecture";
import ProjectTechStack from "@/components/project/ProjectTechStack";
import ProjectDatabaseSchema from "@/components/project/ProjectDatabaseSchema";
import ProjectCloudDeployment from "@/components/project/ProjectCloudDeployment";
import ProjectChallenges from "@/components/project/ProjectChallenges";
import ProjectMetrics from "@/components/project/ProjectMetrics";
import ProjectScreenshots from "@/components/project/ProjectScreenshots";
import ProjectFuture from "@/components/project/ProjectFuture";
import ProjectCTA from "@/components/project/ProjectCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  const isComingSoon = project.slug === "ai-code-review-platform";

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Back Link */}
        <div className="mb-12">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>

        {isComingSoon ? (
          /* Placeholder Component: Easy to remove or swap in the future */
          <div className="flex flex-col items-center justify-center text-center py-24 px-6 max-w-2xl mx-auto border border-[var(--color-border)] rounded-3xl bg-[var(--color-surface)]/20 shadow-xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] mb-6 shadow-md shadow-[var(--color-primary)]/5 animate-pulse">
              <Code size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-foreground)] mb-4 font-display">
              Case Study Coming Soon
            </h1>
            <p className="text-base text-[var(--color-text-muted)] mb-8 leading-relaxed">
              The case study, interactive screenshots, and architectural metrics for <strong>{project.title}</strong> are currently under development and will be published soon.
            </p>
            <Link
              href="/#projects"
              className="bg-[var(--color-primary)] text-[var(--color-button-text)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-[var(--color-primary)]/10"
            >
              Explore Other Projects
            </Link>
          </div>
        ) : (
          /* Content Layout */
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Sidebar Left */}
            <ProjectSidebar project={project} />

            {/* Main Content Right */}
            <div className="flex-1 max-w-4xl space-y-4">
              <ProjectHero project={project} />
              <ProjectProblemSolution project={project} />
              <ProjectFeatures project={project} />
              {project.slug !== "ai-saas-workflow-platform" && (
                <ProjectArchitecture project={project} />
              )}
              <ProjectTechStack project={project} />
              <ProjectDatabaseSchema project={project} />
              {project.slug !== "ai-saas-workflow-platform" && (
                <ProjectCloudDeployment project={project} />
              )}
              <ProjectChallenges project={project} />
              <ProjectMetrics project={project} />
              <ProjectScreenshots project={project} />
              <ProjectFuture project={project} />
            </div>

          </div>
        )}

        {!isComingSoon && <ProjectCTA project={project} />}
      </div>
    </div>
  );
}
