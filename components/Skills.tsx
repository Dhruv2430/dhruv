"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend Architecture",
    description: "Building responsive, accessible, and performant user interfaces.",
    skills: ["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"]
  },
  {
    title: "Backend Systems",
    description: "Designing resilient APIs and robust server-side logic.",
    skills: ["Node.js", "Express", "GraphQL", "REST Architecture"]
  },
  {
    title: "Cloud & Infrastructure",
    description: "Deploying and managing scalable AWS ecosystems.",
    skills: ["AWS ECS", "AWS Lambda", "Terraform", "Docker", "CI/CD Pipelines"]
  },
  {
    title: "Data Engineering",
    description: "Optimizing database interactions and caching layers.",
    skills: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-32 relative border-t border-border/40 overflow-hidden bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 md:w-2/3"
        >
          <h2 className="font-display text-[var(--text-display-2)] leading-none mb-6">Technical Ecosystem</h2>
          <p className="text-xl text-background/60 font-sans max-w-xl">
            A carefully curated set of tools and frameworks that allow me to architect solutions from the database up to the user interface.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border-t border-background/20 pt-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6">
                <h3 className="font-display text-2xl lg:text-3xl">{category.title}</h3>
                <span className="font-mono text-xs text-primary mt-2 sm:mt-0 tracking-widest">0{i + 1}</span>
              </div>
              <p className="text-background/60 mb-8 font-sans">{category.description}</p>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, j) => (
                  <span 
                    key={j} 
                    className="font-mono text-sm px-4 py-2 border border-background/10 rounded-full hover:bg-primary hover:border-primary hover:text-button-text transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative large background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center opacity-[0.02] pointer-events-none z-0">
        <span className="font-display text-[15vw] whitespace-nowrap leading-none select-none">SYSTEMS</span>
      </div>
    </section>
  );
}
