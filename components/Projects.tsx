"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "AI SaaS Workflow Platform",
    description: "An enterprise-grade AI-powered workflow platform that helps teams automate document processing, extract insights, and build intelligent AI workflows using RAG architecture and modern cloud infrastructure.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Node.js", "OpenAI", "LangChain", "Tailwind CSS", "AWS"],
    image: "/ProjectImage/task.png",
    slug: "ai-saas-workflow-platform",
    year: "2025",
    team: [
      { name: "Dhruv Panchal", role: "Lead Fullstack Developer", initial: "DP", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
      { name: "Arjun Dev", role: "UI/UX Designer", initial: "AD", color: "bg-purple-500/10 text-purple-600 border-purple-200" },
      { name: "Priya Sharma", role: "AI Research Engineer", initial: "PS", color: "bg-emerald-500/10 text-emerald-600 border-emerald-200" }
    ]
  },
  {
    title: "AI Code Review Platform",
    description: "An automated code review platform that integrates directly into GitHub and GitLab webhooks, using fine-tuned LLM agents and AST parsers to provide instant, contextual, and secure feedback on every commit.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "OpenAI", "AWS", "GitHub API"],
    image: "/ProjectImage/Aicodereview.png",
    slug: "ai-code-review-platform",
    year: "2025",
    team: [
      { name: "Dhruv Panchal", role: "Lead Fullstack Developer", initial: "DP", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
      { name: "Sneha Iyer", role: "DevOps Engineer", initial: "SI", color: "bg-orange-500/10 text-orange-600 border-orange-200" },
      { name: "Rohan Patel", role: "Backend Developer", initial: "RP", color: "bg-yellow-500/10 text-yellow-600 border-yellow-200" }
    ]
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 relative border-t border-border/40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-display text-[var(--text-display-2)] leading-none tracking-tight">
              Selected Works
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex items-center gap-4"
          >
            <span className="font-mono text-sm tracking-widest uppercase text-text-muted">Featured Projects</span>
            <div className="w-24 h-[1px] bg-border" />
          </motion.div>
        </div>

        <div className="space-y-32">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
              >
                {/* Project Screenshot / High-Fidelity Browser Mockup */}
                <Link 
                  href={`/projects/${project.slug}`}
                  className="w-full lg:w-3/5 block cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="w-full aspect-[16/10] rounded-[1.5rem] border border-[#D9CAB3]/40 bg-white shadow-[0_20px_50px_rgba(217,202,179,0.2)] relative overflow-hidden flex flex-col group/browser">
                    {/* Browser Toolbar */}
                    <div className="w-full bg-[#fbfbfa] border-b border-border/30 px-5 py-3.5 flex items-center shrink-0 relative">
                      {/* Window Action Controls */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-75 group-hover/browser:opacity-100 transition-opacity" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-75 group-hover/browser:opacity-100 transition-opacity" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-75 group-hover/browser:opacity-100 transition-opacity" />
                      </div>
                      
                      {/* Address / Domain Mockup */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 min-w-[140px] h-6 rounded-md bg-[#f1f0ee] border border-border/20 flex items-center justify-center text-[10px] text-[var(--color-text-muted)] font-mono tracking-wide">
                        dhruv.dev/projects/{project.slug}
                      </div>
                    </div>
                    
                    {/* Application Content Screenshot with Hover Action Overlay */}
                    <div className="flex-1 relative overflow-hidden bg-[#fafafa]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover object-top transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/browser:scale-[1.03]"
                      />
                      
                      {/* Glowing Clickable Glassmorphic Overlay */}
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] opacity-0 group-hover/browser:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1.05 }}
                          className="w-24 h-24 rounded-full bg-white/90 border border-[var(--color-primary)]/40 backdrop-blur-md flex flex-col items-center justify-center text-[var(--color-primary)] shadow-[0_10px_30px_rgba(109,152,134,0.35)] transition-all duration-300"
                        >
                          <span className="text-[10px] tracking-[0.25em] font-mono font-bold uppercase mt-1">ENTER</span>
                          <ArrowUpRight size={18} className="mt-1" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Project Description & Metadata */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  {/* Year Indicator with Divider Line */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-mono text-xs tracking-widest text-[var(--color-primary)] font-bold">{project.year}</span>
                    <div className="h-[0.5px] w-16 bg-[var(--color-primary)]/40" />
                  </div>
                  
                  {/* Title Link */}
                  <Link href={`/projects/${project.slug}`} className="group/title block mb-4">
                    <h3 className="font-display text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors duration-300">
                      {project.title}
                    </h3>
                  </Link>
                  
                  {/* Active Contributors (Team Facepile) */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex -space-x-2 overflow-hidden">
                      {project.team.map((member, idx) => (
                        <div 
                          key={idx}
                          className={`relative group/avatar w-8 h-8 rounded-full border-2 border-[var(--color-background)] ${member.color} flex items-center justify-center text-[10px] font-mono font-bold cursor-pointer shadow-sm`}
                        >
                          {member.initial}
                          
                          {/* Rich Floating Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 bg-[var(--color-foreground)] text-[var(--color-background)] text-[10px] rounded-lg opacity-0 pointer-events-none group-hover/avatar:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/avatar:translate-y-0 whitespace-nowrap z-50 shadow-md">
                            <span className="font-semibold block">{member.name}</span>
                            <span className="opacity-70 text-[9px] block">{member.role}</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--color-foreground)] rotate-45" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono tracking-wider text-[var(--color-text-muted)] uppercase">
                      Contributors
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[17px] text-[var(--color-text-muted)] leading-relaxed mb-8 font-sans">
                    {project.description}
                  </p>

                  {/* Technology Pills */}
                  <div className="flex flex-wrap gap-2.5 mb-10">
                    {project.tech.map((t, j) => (
                      <span 
                        key={j} 
                        className="text-xs font-sans font-medium px-4 py-1.5 bg-[#D9CAB3]/20 border border-[#D9CAB3]/30 text-[#4A4A4A] rounded-full hover:bg-[#D9CAB3]/30 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Explore Link */}
                  <div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors uppercase group"
                    >
                      Explore Project
                      <span className="inline-block text-sm transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
