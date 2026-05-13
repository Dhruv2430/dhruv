"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

// Brand SVG icons (not available in lucide-react)
function LinkedinIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const links = [
  {
    label: "LinkedIn",
    description: "Connect with me professionally",
    href: "https://www.linkedin.com/in/dhruvpanchal-dev/",
    Icon: LinkedinIcon,
    color: "#0A66C2",
    gradient: "from-[#0A66C2]/20 to-[#0A66C2]/5",
  },
  {
    label: "GitHub",
    description: "Explore my repositories & projects",
    href: "https://github.com/Dhruv2430",
    Icon: GithubIcon,
    color: "#333",
    gradient: "from-[#333]/20 to-[#333]/5",
  },
  {
    label: "Resume / CV",
    description: "Download my latest resume",
    href: "/resume.pdf",
    Icon: FileText,
    color: "#6D9886",
    gradient: "from-primary/20 to-primary/5",
    download: true,
  },
  {
    label: "Email Me",
    description: "Let\u2019s start a conversation",
    href: "mailto:dhruvpanchal897@gmail.com",
    Icon: Mail,
    color: "#EA4335",
    gradient: "from-[#EA4335]/20 to-[#EA4335]/5",
  },
];

// Floating particles for background atmosphere
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: 4 + Math.random() * 10,
            height: 4 + Math.random() * 10,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated link card
function LinkCard({
  link,
  index,
}: {
  link: (typeof links)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    if (link.label === "Email Me") {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText("dhruvpanchal897@gmail.com");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.4 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
        download={link.download ? true : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex items-center gap-5 p-5 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl overflow-hidden transition-shadow duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] cursor-pointer"
        style={{ textDecoration: "none" }}
      >
        {/* Hover gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${link.gradient} rounded-2xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Icon container */}
        <div className="relative z-10 shrink-0">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300"
            style={{
              borderColor: isHovered ? link.color : "rgba(255,255,255,0.1)",
              backgroundColor: isHovered ? `${link.color}15` : "rgba(255,255,255,0.03)",
            }}
            animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            <link.Icon
              size={20}
              className="transition-colors duration-300"
              style={{ color: isHovered ? link.color : "var(--color-text-muted)" }}
            />
          </motion.div>
        </div>

        {/* Text */}
        <div className="relative z-10 flex-1 min-w-0">
          <p className="font-display text-lg text-foreground font-medium leading-tight mb-0.5">
            {link.label}
          </p>
          <p className="text-sm text-text-muted/70 font-sans truncate !mb-0">
            {link.description}
          </p>
        </div>

        {/* Right side actions */}
        <div className="relative z-10 flex items-center gap-2 shrink-0">
          {/* Copy email button */}
          {link.label === "Email Me" && (
            <motion.button
              onClick={handleCopyEmail}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              whileTap={{ scale: 0.9 }}
              title="Copy email"
            >
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check size={14} className="text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy size={14} className="text-text-muted" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {/* Arrow */}
          <motion.div
            animate={{
              x: isHovered ? 2 : 0,
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight
              size={18}
              className="text-text-muted/50 group-hover:text-foreground transition-colors duration-300"
            />
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export function Linktree() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Full-page background effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[50vh] bg-gradient-to-b from-primary/[0.06] to-transparent rounded-b-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-primary/[0.03] rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-0 w-[40vw] h-[40vw] bg-surface/15 rounded-full blur-[120px]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_60%,transparent_100%)]" />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="pt-6 md:pt-8 px-6 md:px-12"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl text-text-muted hover:text-foreground hover:border-primary/30 transition-all duration-300 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-sans text-sm">Back to portfolio</span>
        </Link>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center py-12 md:py-20">
        <div className="max-w-lg w-full mx-auto px-6 relative z-10">

          {/* Profile header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center mb-12"
          >
            {/* Profile photo with animated gradient ring */}
            <div className="relative mb-6 group">
              {/* Outer animated glow ring */}
              <motion.div
                className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-primary via-primary/60 to-surface opacity-80"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ padding: 3 }}
              />
              {/* Inner animated glow ring secondary */}
              <motion.div
                className="absolute -inset-[5px] rounded-full bg-gradient-to-bl from-primary/40 via-transparent to-primary/40 opacity-60 blur-sm"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* Photo container */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-[3px] border-background z-10">
                <Image
                  src="/PERSONAL/photo1.jpeg"
                  alt="Dhruv Panchal"
                  fill
                  className="object-cover"
                  sizes="112px"
                  priority
                />
              </div>
              {/* Verified-like sparkle badge */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-20 border-[3px] border-background shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              >
                <Sparkles size={14} className="text-background" />
              </motion.div>
            </div>

            {/* Name & Bio */}
            <motion.h1
              className="font-display text-3xl md:text-4xl tracking-tight mb-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Dhruv Panchal
            </motion.h1>

            <motion.p
              className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Full-Stack Developer
            </motion.p>

            <motion.p
              className="text-base text-text-muted font-sans max-w-xs leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              Building scalable web apps with React, Node.js &amp; AWS. Open to opportunities.
            </motion.p>

            {/* Decorative divider */}
            <motion.div
              className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          {/* Link cards */}
          <div className="flex flex-col gap-3">
            {links.map((link, i) => (
              <LinkCard key={link.label} link={link} index={i} />
            ))}
          </div>

          {/* Bottom branding */}
          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted/40 hover:text-primary transition-colors duration-300"
            >
              <span>dhruvpanchal.dev</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
