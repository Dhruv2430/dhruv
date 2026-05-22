"use client";

import { useState } from "react";
import { ExternalLink, Code, PlayCircle, XCircle } from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

export default function ProjectHero({ project }: { project: ProjectData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = project.video && project.video !== "#";

  return (
    <section id="overview" className="pt-8 pb-16 border-b border-[var(--color-border)]">
      <div className="mb-4 inline-flex items-center rounded-full bg-[var(--color-surface)]/40 px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
        {project.category || "Featured Project"}
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--color-foreground)] mb-6 font-display">
        {project.title}
      </h1>
      
      <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mb-8 leading-relaxed">
        {project.subtitle}
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        {project.techStack.flatMap(cat => cat.technologies.split(",").map(t => t.trim())).slice(0, 8).map((tech) => (
          <span key={tech} className="px-3 py-1 text-sm rounded-md bg-[var(--color-surface)]/40 text-[var(--color-foreground)] border border-[var(--color-border)]">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-16">
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-button-text)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors">
          Live Demo <ExternalLink size={18} />
        </a>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[var(--color-surface)] text-[var(--color-foreground)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-border)] transition-colors">
          GitHub Repo <Code size={18} />
        </a>
        {hasVideo ? (
          <button 
            onClick={() => setIsPlaying(true)} 
            className="flex items-center gap-2 text-[var(--color-foreground)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
          >
            Watch Video <PlayCircle size={18} />
          </button>
        ) : (
          <a href={project.video} className="flex items-center gap-2 text-[var(--color-foreground)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--color-surface)] transition-colors">
            Watch Video <PlayCircle size={18} />
          </a>
        )}
      </div>

      <div 
        onClick={() => hasVideo && !isPlaying && setIsPlaying(true)}
        className="relative rounded-2xl overflow-hidden bg-[var(--color-surface)] aspect-video border border-[var(--color-border)] shadow-xl shadow-black/5 group cursor-pointer"
      >
        {isPlaying && hasVideo ? (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <video 
              src={project.video} 
              className="w-full h-full object-contain" 
              controls 
              autoPlay 
              playsInline
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(false);
              }}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors border border-white/20"
              title="Close Video"
            >
              <XCircle size={24} />
            </button>
          </div>
        ) : (
          <>
            {/* Placeholder for actual video/image */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-background)]/50 backdrop-blur-sm z-10">
               <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                 <PlayCircle size={32} className="text-[var(--color-primary)] ml-1" />
               </div>
               <p className="mt-4 text-sm font-medium text-[var(--color-foreground)]">
                 {hasVideo ? "Click to play demo video" : "Click to play demo"}
               </p>
            </div>
            {/* Abstract mock UI inside the placeholder to make it look premium */}
            <div className="w-full h-full opacity-30 p-8 flex">
               <div className="w-64 h-full border-r border-[var(--color-border)] pr-8 space-y-4">
                 <div className="w-full h-8 rounded bg-[var(--color-border)]"></div>
                 <div className="w-3/4 h-4 rounded bg-[var(--color-border)]"></div>
                 <div className="w-5/6 h-4 rounded bg-[var(--color-border)]"></div>
                 <div className="w-4/6 h-4 rounded bg-[var(--color-border)]"></div>
               </div>
               <div className="flex-1 pl-8">
                 <div className="w-1/3 h-8 rounded bg-[var(--color-border)] mb-8"></div>
                 <div className="grid grid-cols-3 gap-6 mb-8">
                   <div className="h-24 rounded-xl bg-[var(--color-border)]"></div>
                   <div className="h-24 rounded-xl bg-[var(--color-border)]"></div>
                   <div className="h-24 rounded-xl bg-[var(--color-border)]"></div>
                 </div>
                 <div className="w-full h-64 rounded-xl bg-[var(--color-border)]"></div>
               </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
