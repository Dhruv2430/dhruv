"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const contributions = [
  {
    org: "AWS Community",
    role: "Volunteer",
    logo: "/CommunityLogo/aws.jpg",
    description:
      "Contributing to cloud community events and supporting AWS knowledge-sharing initiatives.",
    accent: "#7B61FF",
    colSpan: "md:col-span-7",
  },
  {
    org: "JS Gujarat",
    role: "Crew Member",
    logo: "/CommunityLogo/javascript_gujarat.png",
    description:
      "Supporting local frontend meetups and helping organize community-driven learning events.",
    accent: "#F0B429",
    colSpan: "md:col-span-5",
  },
  {
    org: "IEEE Branch",
    role: "Volunteer & Member",
    logo: "/CommunityLogo/IEEE.png",
    description: "Participating in technical workshops and student branch activities at Silver Oak University.",
    accent: "#0078D4",
    colSpan: "md:col-span-5",
  },
  {
    org: "Laracon India",
    role: "Volunteer",
    logo: "/CommunityLogo/LARACON.png",
    description:
      "Assisted with on-ground operations, speaker coordination, and attendee management at the developer conference.",
    accent: "#E8703A",
    colSpan: "md:col-span-7",
  },
];

export function Contributions() {
  return (
    <section
      id="contributions"
      className="py-32 relative border-t border-border/40 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
              Community & Contributions
            </span>
            <h2 className="font-display text-[var(--text-display-2)] leading-none tracking-tight">
              Community
              <br />
              Impact.
            </h2>
          </div>
          <p className="text-lg text-text-muted max-w-sm font-sans">
            Software isn't built in a vacuum. Engaging with the community is how
            we push the industry forward.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {contributions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`${item.colSpan} group relative`}
            >
              <div className="relative h-full bg-background border border-border/50 rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)]">
                {/* Top row: Logo + Arrow */}
                <div className="flex items-start justify-between mb-8">
                  {/* Logo container — properly sized */}
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white border border-border/40 shadow-sm flex items-center justify-center p-2 group-hover:shadow-md transition-shadow duration-500">
                    <Image
                      src={item.logo}
                      alt={item.org}
                      width={48}
                      height={48}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  {/* External link icon */}
                  <motion.div
                    className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-primary/40"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ExternalLink
                      size={14}
                      className="text-text-muted group-hover:text-primary transition-colors duration-300"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-display text-2xl lg:text-3xl mb-1 tracking-tight">
                    {item.org}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary mb-5 block">
                    {item.role}
                  </span>

                  {/* Divider */}
                  <div className="w-full h-px bg-border/40 mb-5" />

                  <p className="text-text-muted text-[15px] leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Hover accent glow */}
                <div
                  className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{ backgroundColor: item.accent }}
                />

                {/* Corner accent dot */}
                <div
                  className="absolute top-8 right-8 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:hidden"
                  style={{ backgroundColor: item.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
