"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro sequence
      const tl = gsap.timeline();

      tl.from(".hero-intro-text", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      })
        .from(".hero-headline .word", {
          opacity: 0,
          y: 60,
          rotateX: -90,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.7)",
        }, "-=0.4")
        .from(".hero-desc", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.6")
        .from(".hero-cta", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4")
        .from(".hero-right-element", {
          opacity: 0,
          x: 40,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out"
        }, "-=1");

      // Parallax movement on right side elements
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(".parallax-layer-1", { x: xPos, y: yPos, duration: 1, ease: "power2.out" });
        gsap.to(".parallax-layer-2", { x: xPos * 1.5, y: yPos * 1.5, duration: 1, ease: "power2.out" });
        gsap.to(".parallax-layer-3", { x: xPos * 0.5, y: yPos * 0.5, duration: 1, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-surface/40 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/3" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* LEFT SIDE: Typography Focus */}
        <div className="lg:col-span-7 flex flex-col z-10 pt-10 lg:pt-0">
          <p className="hero-intro-text text-primary font-mono text-base tracking-[0.2em] uppercase mb-6">
            DHRUV PANCHAL &mdash; FULL-STACK DEVELOPER
          </p>

          {/* Massive Headline */}
          <h1 className="hero-headline font-display text-[clamp(4rem,9vw,7rem)] leading-[0.9] tracking-[-0.03em] text-foreground mb-8 perspective-1000">
            <div className="overflow-hidden pb-2"><span className="word inline-block origin-bottom">Building</span></div>
            <div className="overflow-hidden pb-2"><span className="word inline-block origin-bottom">Modern</span></div>
            <div className="overflow-hidden pb-2 text-primary/90 italic pr-4"><span className="word inline-block origin-bottom">Web</span></div>
            <div className="overflow-hidden pb-2"><span className="word inline-block origin-bottom">Applications.</span></div>
          </h1>

          <div className="hero-desc flex flex-col md:flex-row gap-6 md:items-center border-l-2 border-primary/30 pl-6 mb-12">
            <p className="max-w-[450px] text-xl text-text-muted leading-relaxed font-sans">
              MERN stack developer building scalable web applications with React, Node.js, and AWS cloud infrastructure.
            </p>
          </div>

          <div className="hero-cta flex items-center gap-6">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10 font-sans">Explore Work</span>
              <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <ArrowRight size={18} className="relative z-10 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </a>

            <span className="text-sm font-mono tracking-widest uppercase text-text-muted">
              Scroll to explore
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: Abstract Technical & Motion Elements */}
        <div className="lg:col-span-5 relative h-full min-h-[400px] flex flex-col justify-center lg:border-l border-border/40 lg:pl-12 mt-12 lg:mt-0">

          {/* Vertical Text */}
          <div className="hero-right-element absolute right-0 top-1/4 -rotate-90 origin-right translate-x-full text-xs font-mono tracking-[0.5em] text-text-muted opacity-50 uppercase hidden lg:block">
            Engineering &bull; Architecture
          </div>

          {/* Abstract Layered Motion Area */}
          <div className="relative w-full aspect-square max-w-[400px] mx-auto">
            {/* Card 1: Main */}
            <div 
              className="hero-right-element parallax-layer-2 absolute bottom-4 left-4"
              style={{ zIndex: activeCard === 1 ? 50 : 20 }}
            >
              <motion.div 
                drag 
                dragConstraints={containerRef}
                onMouseDown={() => setActiveCard(1)}
                whileDrag={{ scale: 1.05 }}
                className="w-56 h-64 bg-surface/20 backdrop-blur-md rounded-3xl border border-white/20 flex flex-col items-start justify-end p-6 shadow-2xl cursor-grab active:cursor-grabbing"
              >
                 <div className="text-xs font-mono text-primary mb-2">01 // REACT</div>
                 <div className="font-display text-2xl">Frontend</div>
                 <div className="w-12 h-[1px] bg-foreground/20 mt-4" />
              </motion.div>
            </div>

            {/* Card 2: Top Right */}
            <div 
              className="hero-right-element parallax-layer-3 absolute top-4 right-4"
              style={{ zIndex: activeCard === 2 ? 50 : 10 }}
            >
              <motion.div 
                drag 
                dragConstraints={containerRef}
                onMouseDown={() => setActiveCard(2)}
                whileDrag={{ scale: 1.05 }}
                className="w-48 h-48 bg-background/40 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col items-start justify-end p-5 shadow-xl cursor-grab active:cursor-grabbing"
              >
                 <div className="text-xs font-mono text-text-muted mb-2">02 // NODE.JS</div>
                 <div className="font-display text-xl">Backend</div>
                 <div className="w-8 h-[1px] bg-foreground/10 mt-3" />
              </motion.div>
            </div>

            {/* Card 3: Left Accent */}
            <div 
              className="hero-right-element parallax-layer-1 absolute top-1/3 -left-8"
              style={{ zIndex: activeCard === 3 ? 50 : 30 }}
            >
              <motion.div 
                drag 
                dragConstraints={containerRef}
                onMouseDown={() => setActiveCard(3)}
                whileDrag={{ scale: 1.05 }}
                className="w-40 h-40 bg-primary/90 text-background rounded-3xl flex flex-col items-start justify-end p-5 shadow-[0_0_30px_rgba(109,152,134,0.3)] cursor-grab active:cursor-grabbing"
              >
                 <div className="text-xs font-mono text-background/80 mb-2">03 // AWS</div>
                 <div className="font-display text-lg">Cloud</div>
                 <div className="w-8 h-[1px] bg-background/40 mt-3" />
              </motion.div>
            </div>

            {/* Circular Accent */}
            <div className="hero-right-element parallax-layer-2 absolute bottom-1/4 -right-6 w-24 h-24 border border-primary/30 rounded-full flex items-center justify-center z-0">
               <span className="font-mono text-[10px] tracking-widest text-text-muted opacity-50 rotate-90">BUILD</span>
            </div>

            {/* Grid Crosses */}
            <div className="absolute top-0 left-0 text-text-muted/30">+</div>
            <div className="absolute top-0 right-0 text-text-muted/30">+</div>
            <div className="absolute bottom-0 left-0 text-text-muted/30">+</div>
            <div className="absolute bottom-0 right-0 text-text-muted/30">+</div>
          </div>
        </div>

      </div>
    </section>
  );
}
