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
                Building real-world applications with modern tools.
              </h3>

              <div className="space-y-8 text-lg text-text-muted font-sans leading-relaxed">
                <p>
                  I&apos;m a Full-Stack Developer and Computer Engineering student at Silver Oak University, Ahmedabad. I build scalable web applications using the MERN stack and deploy them on AWS cloud infrastructure.
                </p>
                <p>
                  During my internship at Kaizenth Teachology, I developed 10+ responsive web apps, reduced API response times by 40%, and implemented CI/CD pipelines with Docker and AWS. I focus on writing clean, maintainable code that delivers real business value.
                </p>
                <p>
                  Beyond coding, I&apos;m actively involved in tech communities — volunteering with AWS Community, JS Gujarat, IEEE, and Laracon India — because I believe collaboration makes us all better developers.
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
                { label: "Internship Experience", value: "01", desc: "Full-stack development" },
                { label: "Web Apps Built", value: "10+", desc: "Responsive & optimized" },
                { label: "Communities", value: "04", desc: "AWS, JS Gujarat, IEEE, Laracon" },
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
