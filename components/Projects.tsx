"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

const projects = [
  {
    title: "CloudFlow Architecture",
    description: "A highly scalable infrastructure management dashboard visualizing AWS resources in real-time. Built for enterprise cloud teams aiming to reduce technical debt.",
    tech: ["Next.js", "AWS API", "Tailwind", "Framer Motion"],
    link: "#",
    github: "#",
    year: "2024"
  },
  {
    title: "NexCommerce",
    description: "Headless e-commerce storefront with sub-second page loads. Integrates a custom Node.js backend with Stripe and PostgreSQL for a deeply resilient architecture.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    link: "#",
    github: "#",
    year: "2023"
  },
  {
    title: "DevMetrics",
    description: "Developer productivity tool tracking GitHub PR times, CI/CD pipeline durations, and deployment frequency to optimize engineering velocity.",
    tech: ["TypeScript", "Express", "MongoDB", "OAuth"],
    link: "#",
    github: "#",
    year: "2022"
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
                {/* Visual Area (Massive abstract placeholder for cinematic feel) */}
                <div className="w-full lg:w-3/5 aspect-[4/3] bg-surface/30 rounded-[2rem] border border-border/50 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-700 group-hover:opacity-100 opacity-50" />
                  <div className="w-1/2 aspect-square rounded-full bg-primary/10 blur-[80px] absolute transition-transform duration-[2s] group-hover:scale-150" />
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-text-muted absolute bottom-8 right-8">
                    {project.title.replace(/\s+/g, '_').toUpperCase()}
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
                      href={project.link}
                      className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
                    >
                      Live Demo <ExternalLink size={16} />
                    </a>
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-text-muted hover:text-foreground transition-colors"
                    >
                      Source <Code size={16} />
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
