"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const contributions = [
  {
    org: "AWS Community",
    role: "Speaker & Architect",
    logo: "/CommunityLogo/aws.jpg",
    description: "Sharing serverless architectural patterns and cost optimization strategies.",
    colSpan: "md:col-span-8",
    align: "items-start"
  },
  {
    org: "JS Gujarat",
    role: "Event Organizer",
    logo: "/CommunityLogo/javascript_gujarat.png",
    description: "Fostering local frontend talent through technical hackathons.",
    colSpan: "md:col-span-4",
    align: "items-end"
  },
  {
    org: "IEEE Branch",
    role: "Technical Lead",
    logo: "/CommunityLogo/IEEE.png",
    description: "Led workshops on distributed systems and basic web dev.",
    colSpan: "md:col-span-5",
    align: "items-start"
  },
  {
    org: "Laracon",
    role: "Contributor",
    logo: "/CommunityLogo/LARACON.png",
    description: "Participating in deep-dive backend architecture discussions.",
    colSpan: "md:col-span-7",
    align: "items-end"
  }
];

export function Contributions() {
  return (
    <section id="contributions" className="py-32 relative border-t border-border/40 overflow-hidden bg-surface/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <h2 className="font-display text-[var(--text-display-2)] leading-none mb-6">Community Impact</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto font-sans">
            Software isn't built in a vacuum. Engaging with the community is how we push the industry forward.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {contributions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${item.colSpan} relative bg-background border border-border/50 rounded-3xl p-8 hover:bg-surface/30 transition-all duration-500 overflow-hidden group`}
            >
              <div className={`relative z-10 flex flex-col h-full ${item.align} text-center md:text-left`}>
                <div className="w-20 h-20 bg-surface/50 rounded-2xl p-3 flex items-center justify-center mb-8 border border-border shadow-sm group-hover:scale-110 transition-transform duration-500 origin-bottom-left">
                  <Image
                    src={item.logo}
                    alt={item.org}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                
                <h3 className="font-display text-2xl lg:text-3xl mb-2">{item.org}</h3>
                <span className="font-mono text-xs tracking-widest uppercase text-primary mb-6 block">
                  {item.role}
                </span>
                
                <p className="text-text-muted mt-auto">
                  {item.description}
                </p>
              </div>

              {/* Decorative background element per card */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 z-0 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
