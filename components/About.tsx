"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yStats = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" ref={containerRef} className="py-32 relative border-t border-border/40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* LEFT: Huge Vertical Text & Path */}
          <div className="hidden lg:block lg:col-span-2 relative h-full min-h-[500px]">
             <motion.div style={{ y: yText }} className="sticky top-1/3">
               <h2 className="font-display text-[10rem] leading-none text-surface/30 -rotate-90 origin-top-left absolute top-full -left-12 pointer-events-none select-none">
                 ABOUT
               </h2>
             </motion.div>
             
             {/* Decorative vertical line */}
             <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
          </div>

          {/* CENTER: Main Narrative */}
          <div className="lg:col-span-6 z-10 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="font-display text-4xl mb-8">
                I engineer systems that scale elegantly.
              </h3>
              
              <div className="space-y-8 text-lg text-text-muted font-sans leading-relaxed">
                <p>
                  As a Full-Stack Developer and AWS Cloud Engineer, my focus lies at the intersection of robust cloud architecture and seamless user experiences. I don&apos;t just build features; I architect solutions designed for resilience, performance, and long-term maintainability.
                </p>
                <p>
                  My journey involves tearing down complex monolithic structures and rebuilding them into agile, microservice-driven ecosystems. Whether it&apos;s a high-availability Next.js frontend or a deeply integrated serverless AWS backend, I prioritize technical excellence.
                </p>
                <p>
                  Beyond the code, I am deeply invested in the technical community—sharing knowledge, organizing hackathons, and constantly refining my understanding of what makes software truly great.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="font-mono text-sm tracking-widest uppercase text-primary">Philosophy</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Floating Stats & Elements */}
          <div className="lg:col-span-4 relative h-full">
            <motion.div style={{ y: yStats }} className="flex flex-col gap-6 sticky top-1/4 pt-12 lg:pt-0">
              
              {[
                { label: "Years Experience", value: "03+", desc: "Building production apps" },
                { label: "Projects Delivered", value: "20+", desc: "From MVP to enterprise" },
                { label: "Cloud Certifications", value: "02", desc: "AWS Architect & Developer" },
              ].map((stat, i) => (
                <div key={i} className="group relative bg-background border border-border/50 rounded-3xl p-6 hover:bg-surface/20 transition-colors duration-500 overflow-hidden">
                  <div className="relative z-10 flex justify-between items-end">
                    <div>
                      <div className="text-sm font-mono text-primary mb-2 uppercase">{stat.label}</div>
                      <div className="text-text-muted text-sm">{stat.desc}</div>
                    </div>
                    <div className="font-display text-4xl text-foreground group-hover:scale-110 transition-transform origin-bottom-right">
                      {stat.value}
                    </div>
                  </div>
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
