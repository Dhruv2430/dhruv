"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "features", label: "Features" },
  { id: "system-design", label: "System Design" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "database", label: "Database Schema" },
  { id: "cloud", label: "Cloud Deployment" },
  { id: "challenges", label: "Challenges" },
  { id: "performance", label: "Performance" },
  { id: "screenshots", label: "Screenshots" },
  { id: "future", label: "Future Improvements" },
];

import { ProjectData } from "@/lib/projectsData";

interface ProjectSidebarProps {
  project: ProjectData;
}

export default function ProjectSidebar({ project }: ProjectSidebarProps) {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = SECTIONS.filter(
    (sec) => !(
      (sec.id === "cloud" || sec.id === "system-design") && 
      project.slug === "ai-saas-workflow-platform"
    )
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Account for potential fixed headers
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-24 hidden lg:block w-64 shrink-0">
      <div className="flex flex-col space-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4 px-3">
          On this page
        </h3>
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={cn(
              "px-3 py-2 text-sm rounded-lg transition-colors duration-200",
              activeSection === id
                ? "bg-[var(--color-surface)] text-[var(--color-foreground)] font-medium"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]/50 hover:text-[var(--color-foreground)]"
            )}
          >
            {label}
          </a>
        ))}
      </div>
      
      <div className="mt-12 px-3">
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Interested in working together?
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-[var(--color-primary)] text-[var(--color-button-text)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Let&apos;s Connect
        </Link>
      </div>
    </nav>
  );
}
