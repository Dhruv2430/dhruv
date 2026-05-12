"use client";

import { motion } from "framer-motion";
import { Code2, Briefcase, MessageCircle, Mail, ArrowUp, Heart, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Code2, label: "GitHub", href: "https://github.com/Dhruv2430" },
  { icon: Briefcase, label: "LinkedIn", href: "https://www.linkedin.com/in/dhruvpanchal-dev/" },
  { icon: MessageCircle, label: "LeetCode", href: "https://leetcode.com/u/2S4eTOtSDy/" },
  { icon: Mail, label: "Email", href: "mailto:dhruvpanchal897@gmail.com" },
];

const lineReveal = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.9,
      delay: 0.15 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background relative z-20 overflow-hidden rounded-t-[3rem] -mt-10">

      {/* ── Background Texture ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[200px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[150px]" />
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />
      </div>

      {/* ── Cinematic CTA Section ── */}
      <div className="pt-28 md:pt-40 pb-24 md:pb-32 relative">
        <div className="text-center px-6 max-w-[1200px] mx-auto" style={{ perspective: "800px" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-12 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-background/10 bg-background/[0.04]"
          >
            <Sparkles size={12} className="text-primary" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-background/50">
              What&apos;s next?
            </span>
          </motion.div>

          {/* Headline with line-by-line 3D reveal */}
          <h2 className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.88] tracking-[-0.04em] mb-10" style={{ transformStyle: "preserve-3d" }}>
            <motion.span
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={lineReveal}
              className="block text-background/80 origin-bottom"
            >
              Let&apos;s Build
            </motion.span>

            <motion.span
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={lineReveal}
              className="block italic text-primary origin-bottom"
            >
              Something
            </motion.span>

            <motion.span
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={lineReveal}
              className="block text-background origin-bottom"
            >
              Exceptional.
            </motion.span>
          </h2>

          {/* Expanding decorative line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-10 h-px w-40 bg-gradient-to-r from-transparent via-primary/60 to-transparent origin-center"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-background/40 text-lg font-sans max-w-md mx-auto mb-10 leading-relaxed"
          >
            Have a project in mind or want to collaborate?
            I&apos;d love to hear from you.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-background font-sans font-medium text-base overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(109,152,134,0.4)] hover:scale-105"
            >
              <span className="relative z-10">Start a conversation</span>
              <ArrowUp size={16} className="relative z-10 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-0 bg-background/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="border-t border-background/10 pt-14 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* Brand Column */}
            <div className="lg:col-span-4">
              <a
                href="#home"
                className="inline-block text-3xl font-display tracking-tight text-background mb-4 hover:text-primary transition-colors duration-300"
              >
                DP<span className="text-primary">.</span>
              </a>
              <p className="text-background/40 text-sm leading-relaxed font-sans max-w-xs mb-6">
                MERN stack developer building scalable web applications with React, Node.js, and AWS cloud infrastructure.
              </p>

              {/* Availability */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                  Available for hire
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-3 lg:col-start-6">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-background/25 mb-5">
                Sitemap
              </p>
              <nav className="grid grid-cols-2 gap-x-8 gap-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center gap-2 text-background/50 hover:text-background transition-colors duration-300 text-sm font-sans"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div className="lg:col-span-3">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-background/25 mb-5">
                Connect
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-background/50 hover:text-background transition-colors duration-300 text-sm font-sans"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                    {social.label}
                  </a>
                ))}
              </div>

              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-background/25 mb-3">
                Get in touch
              </p>
              <a
                href="mailto:dhruvpanchal897@gmail.com"
                className="text-sm text-background/60 hover:text-primary transition-colors duration-300 font-sans underline underline-offset-4 decoration-background/10 hover:decoration-primary"
              >
                dhruvpanchal897@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-background/[0.06] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono tracking-[0.12em] text-background/25 uppercase flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} Dhruv Panchal &middot; Built with
            <Heart size={10} className="text-primary fill-primary inline" />
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2.5 text-background/30 hover:text-background transition-colors duration-300"
          >
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase">
              Back to top
            </span>
            <div className="w-8 h-8 rounded-full border border-background/15 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
