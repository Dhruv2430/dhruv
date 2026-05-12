"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const educationData = {
  college: {
    degree: "Bachelor of Engineering in Computer Engineering",
    school: "Silver Oak University",
    location: "Ahmedabad, Gujarat",
    year: "2023 – 2027",
    cgpa: "8.15",
    description: "Pursuing Computer Engineering with focus on full-stack development, cloud computing, and modern software architecture.",
    highlights: ["AWS Community Volunteer", "IEEE Branch Member", "Active Open Source Contributor"]
  },
  school: {
    degree: "Higher Secondary Education (Science)",
    school: "M.Y. High School",
    location: "Dahod, Gujarat",
    year: "2021 – 2023",
    cgpa: "A",
    description: "Completed science stream with focus on Mathematics, Physics, and Computer Science fundamentals.",
    highlights: ["Science Stream", "Strong Foundation in Mathematics"]
  }
};

export function Education() {
  const [activeTab, setActiveTab] = useState<"college" | "school">("college");

  return (
    <section id="education" className="py-32 relative border-t border-border/40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="lg:col-span-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-display text-[var(--text-display-2)] leading-none mb-12">Academic<br/>Roots</h2>
              
              <div className="flex flex-col gap-4">
                {(["college", "school"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-left px-8 py-6 rounded-2xl transition-all duration-300 font-display text-2xl relative overflow-hidden group border ${activeTab === tab ? "border-primary bg-primary/5 text-foreground" : "border-transparent text-text-muted hover:bg-surface/20 hover:text-foreground"}`}
                  >
                    <span className="relative z-10 capitalize">{tab}</span>
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-surface/20 border border-border/50 rounded-[2rem] p-8 md:p-16 h-full flex flex-col justify-center"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-4">
                  <h3 className="font-display text-4xl lg:text-5xl max-w-xl leading-tight">
                    {educationData[activeTab].degree}
                  </h3>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="font-mono text-sm tracking-widest bg-background px-4 py-2 rounded-full border border-border">
                      {educationData[activeTab].year}
                    </span>
                    <span className="font-display text-3xl text-primary mt-4">
                      {educationData[activeTab].cgpa}
                    </span>
                  </div>
                </div>
                
                <p className="text-xl text-primary mb-2 font-sans">
                  {educationData[activeTab].school}
                </p>
                <p className="text-sm text-text-muted mb-8 font-mono tracking-wide">
                  {educationData[activeTab].location}
                </p>
                
                <p className="text-lg text-text-muted leading-relaxed mb-12 max-w-2xl font-sans">
                  {educationData[activeTab].description}
                </p>

                <div>
                  <h4 className="font-mono text-xs tracking-widest uppercase text-text-muted mb-6">Key Highlights</h4>
                  <ul className="space-y-4">
                    {educationData[activeTab].highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center text-foreground font-sans">
                        <div className="w-8 h-[1px] bg-primary mr-4" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}
