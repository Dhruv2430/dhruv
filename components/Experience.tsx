"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Senior Cloud Engineer",
    company: "Tech Innovations Inc.",
    year: "2023",
    description: "Architected serverless ecosystems handling millions of requests daily. Reduced AWS costs by 30% through targeted refactoring of ECS tasks and Lambda cold-start optimizations.",
    tech: ["AWS", "Terraform", "Node.js", "Docker"]
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Solutions LLC",
    year: "2021",
    description: "Spearheaded the migration of a legacy monolithic system into a decoupled Next.js frontend and microservice backend. Improved core web vitals and developer velocity.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"]
  },
  {
    role: "Frontend Engineer",
    company: "Creative Agency",
    year: "2019",
    description: "Translated high-fidelity design prototypes into robust, interactive React interfaces for enterprise clients, focusing on state management and performance.",
    tech: ["React", "Redux", "Sass", "Figma"]
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-32 bg-foreground text-background relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-24 flex items-baseline gap-4">
          <h2 className="font-display text-[var(--text-display-2)] text-background leading-none">Experience</h2>
          <div className="h-[1px] flex-grow bg-background/20" />
        </div>

        <div className="relative">
          {/* Central progress line (desktop) */}
          <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-[1px] bg-background/10">
            <motion.div 
              style={{ height: progressHeight }} 
              className="w-full bg-primary origin-top"
            />
          </div>

          <div className="space-y-32">
            {experiences.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 group">
                
                {/* Left Side: Sticky Year */}
                <div className="md:col-span-4 relative h-full">
                  <div className="md:sticky md:top-32 flex items-center gap-6">
                    <span className="font-display text-5xl md:text-7xl text-background/10 group-hover:text-primary transition-colors duration-500">
                      {exp.year}
                    </span>
                    <div className="w-12 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                </div>

                {/* Right Side: Content Box */}
                <div className="md:col-span-8">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="p-8 md:p-12 rounded-[2rem] bg-background/5 border border-background/10 backdrop-blur-sm group-hover:bg-background/10 transition-colors duration-500"
                  >
                    <h3 className="font-display text-3xl md:text-4xl mb-2">{exp.role}</h3>
                    <p className="text-primary font-mono text-sm tracking-widest uppercase mb-8">{exp.company}</p>
                    
                    <p className="text-lg text-background/70 font-sans leading-relaxed mb-10">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {exp.tech.map((tech, j) => (
                        <span key={j} className="text-xs font-mono px-4 py-2 rounded-full border border-background/20 text-background/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
