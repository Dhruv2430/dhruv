"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  { src: "/PERSONAL/photo2.jpeg", alt: "Focused work", style: "col-span-12 md:col-span-8 aspect-video rounded-3xl", objectPos: "top" },
  { src: "/PERSONAL/photo3.jpeg", alt: "Speaking", style: "col-span-6 md:col-span-4 aspect-square md:aspect-[4/5] rounded-3xl md:translate-y-12", objectPos: "center" },
  { src: "/PERSONAL/photo4.jpeg", alt: "Team", style: "col-span-6 md:col-span-5 aspect-square rounded-3xl", objectPos: "center" },
  { src: "/PERSONAL/photo5.jpeg", alt: "Award", style: "col-span-12 md:col-span-7 aspect-[4/3] rounded-3xl md:-translate-y-8", objectPos: "top" },
];

export function ImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-display text-[var(--text-display-2)] leading-none tracking-tight">
              Beyond<br />The Code.
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-text-muted max-w-sm text-lg font-sans"
          >
            A visual documentation of community involvement, speaking engagements, and the moments that shape my professional journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-8 relative">
          {images.map((image, i) => (
            <motion.div
              key={i}
              style={{ y: i % 2 === 0 ? y1 : y2 }}
              className={`relative overflow-hidden group ${image.style}`}
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110 filter saturate-50 group-hover:saturate-100"
                style={{ objectPosition: image.objectPos }}
                loading="lazy"
              />
            </motion.div>
          ))}
          
          {/* Central decorative badge */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-32 h-32 rounded-full bg-foreground text-background font-mono text-xs text-center p-4 cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="uppercase tracking-widest leading-loose">Visual<br/>Diary<br/>2025-26</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
