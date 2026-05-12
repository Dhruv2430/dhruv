"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

const projects = [
  {
    title: "AI Code Review Platform",
    description: "Built an AI-powered code review tool that analyzes code quality and suggests improvements. Integrated LLM APIs for automated review generation, providing developers with instant, actionable feedback on their pull requests.",
    tech: ["React", "Node.js", "MongoDB", "AWS"],
    image: "/ProjectImage/Aicodereview.png",
    link: "#",
    github: "https://github.com/Dhruv2430",
    year: "2025"
  },
  {
    title: "E-Commerce Platform",
    description: "Developed a full-stack e-commerce application with authentication, cart management, and payment integration. Implemented responsive UI with optimized backend APIs for a seamless shopping experience.",
    tech: ["React", "Node.js", "MongoDB", "Docker", "AWS"],
    image: "/ProjectImage/e-commerce.png",
    link: "#",
    github: "https://github.com/Dhruv2430",
    year: "2024"
  },
  {
    title: "Task Management App",
    description: "Built a collaborative task management system with real-time updates and role-based access control. Designed scalable REST APIs and authentication workflows for team productivity.",
    tech: ["React", "Express.js", "MongoDB"],
    image: "/ProjectImage/task.png",
    link: "#",
    github: "https://github.com/Dhruv2430",
    year: "2024"
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
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}
              >
                {/* Project Screenshot */}
                <div className="w-full lg:w-3/5 aspect-[4/3] rounded-[2rem] border border-border/50 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover object-top transition-transform duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.3em] uppercase text-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    {project.year}
                  </span>
                </div>

                {/* Content Area */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xs tracking-widest text-primary">{project.year}</span>
                    <div className="h-[1px] w-12 bg-primary/30" />
                  </div>
                  
                  <h3 className="font-display text-4xl lg:text-5xl mb-6">{project.title}</h3>
                  
                  <p className="text-lg text-text-muted leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tech.map((t, j) => (
                      <span key={j} className="text-xs font-mono px-4 py-2 bg-surface/50 rounded-full border border-border">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
                    >
                      View Source <Code size={16} />
                    </a>
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
