"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const TOTAL_DURATION = 2000; // ms before exit begins
const COLORS = {
  bg: "#F6F6F6",
  primary: "#6D9886",
  primaryMuted: "rgba(109,152,134,0.12)",
  surface: "#D9CAB3",
  text: "#212121",
  textMuted: "#6B6B6B",
};

// ─────────────────────────────────────────────
// SVG Monogram "DP" – elegant geometric paths
// ─────────────────────────────────────────────
function DPMonogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* D letter */}
      <path
        className="monogram-d"
        d="M20 28 L20 92 L44 92 C62 92 74 80 74 60 C74 40 62 28 44 28 Z"
        stroke={COLORS.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        className="monogram-d-inner"
        d="M32 40 L44 40 C54 40 62 48 62 60 C62 72 54 80 44 80 L32 80 Z"
        stroke={COLORS.primary}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
      {/* P letter */}
      <path
        className="monogram-p"
        d="M82 92 L82 28 L100 28 C112 28 118 36 118 46 C118 56 112 64 100 64 L82 64"
        stroke={COLORS.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        className="monogram-p-inner"
        d="M90 38 L100 38 C106 38 110 42 110 46 C110 50 106 54 100 54 L90 54"
        stroke={COLORS.primary}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
}

// ─────────────────────────────────────────────
// Geometric accent lines
// ─────────────────────────────────────────────
function GeometricLines() {
  return (
    <div className="geometric-lines absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top-left corner frame */}
      <svg className="absolute top-[12%] left-[8%] w-16 h-16 opacity-0 geo-line" viewBox="0 0 64 64" fill="none">
        <path d="M0 24 L0 0 L24 0" stroke={COLORS.primary} strokeWidth="1" opacity="0.5" />
      </svg>
      {/* Bottom-right corner frame */}
      <svg className="absolute bottom-[12%] right-[8%] w-16 h-16 opacity-0 geo-line" viewBox="0 0 64 64" fill="none">
        <path d="M40 64 L64 64 L64 40" stroke={COLORS.primary} strokeWidth="1" opacity="0.5" />
      </svg>
      {/* Horizontal accent — left */}
      <div className="absolute top-1/2 left-[5%] w-[12%] h-px opacity-0 geo-line" style={{ background: `linear-gradient(to right, transparent, ${COLORS.primary}40, transparent)` }} />
      {/* Horizontal accent — right */}
      <div className="absolute top-1/2 right-[5%] w-[12%] h-px opacity-0 geo-line" style={{ background: `linear-gradient(to left, transparent, ${COLORS.primary}40, transparent)` }} />
      {/* Vertical accent — top */}
      <div className="absolute left-1/2 top-[6%] w-px h-[8%] opacity-0 geo-line" style={{ background: `linear-gradient(to bottom, transparent, ${COLORS.primary}30, transparent)` }} />
      {/* Vertical accent — bottom */}
      <div className="absolute left-1/2 bottom-[6%] w-px h-[8%] opacity-0 geo-line" style={{ background: `linear-gradient(to top, transparent, ${COLORS.primary}30, transparent)` }} />
      {/* Small floating squares */}
      <div className="absolute top-[20%] right-[18%] w-2 h-2 border opacity-0 geo-line rotate-45" style={{ borderColor: `${COLORS.primary}30` }} />
      <div className="absolute bottom-[25%] left-[15%] w-1.5 h-1.5 border opacity-0 geo-line rotate-45" style={{ borderColor: `${COLORS.primary}25` }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Loading Screen
// ─────────────────────────────────────────────
export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const runAnimation = useCallback(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    timelineRef.current = tl;

    // ── Phase 1: Geometric lines fade in (0 – 0.4s) ──
    tl.to(".geo-line", {
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
    });

    // ── Phase 2: Monogram SVG draw-in (0.2 – 1.0s) ──
    tl.fromTo(
      ".monogram-d, .monogram-p",
      { strokeDasharray: 400, strokeDashoffset: 400 },
      { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.1 },
      0.2
    );

    // Inner strokes (delayed, softer)
    tl.fromTo(
      ".monogram-d-inner, .monogram-p-inner",
      { strokeDasharray: 200, strokeDashoffset: 200, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.4, duration: 0.6, ease: "power2.inOut", stagger: 0.1 },
      0.5
    );



    // ── Phase 5: Hold & exit prep (1.5 – 1.8s) ──
    tl.to(".geo-line", { opacity: 0, duration: 0.3, stagger: 0.03 }, 1.5);

    // Start exit
    tl.call(() => setIsExiting(true), [], TOTAL_DURATION / 1000);
  }, []);

  useEffect(() => {
    // Small delay to ensure DOM is painted
    const raf = requestAnimationFrame(() => {
      runAnimation();
    });
    return () => {
      cancelAnimationFrame(raf);
      timelineRef.current?.kill();
    };
  }, [runAnimation]);

  // After framer-motion exit completes
  const handleExitComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {!isExiting ? null : null}
        {isLoading && !isExiting ? (
          <motion.div
            key="loading-screen"
            ref={containerRef}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              opacity: 0,
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: COLORS.bg }}
          >
            {/* Subtle noise texture (matches body) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Ambient radial glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${COLORS.primaryMuted} 0%, transparent 70%)`,
              }}
            />

            {/* Geometric accent lines */}
            <GeometricLines />

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center">
              {/* DP Monogram — large, hero-sized */}
              <DPMonogram className="w-36 h-36 md:w-44 md:h-44" />
            </div>

            {/* Bottom branding watermark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <p
                className="font-mono text-[9px] tracking-[0.35em] uppercase"
                style={{ color: COLORS.textMuted }}
              >
                Portfolio &middot; 2025
              </p>
            </motion.div>
          </motion.div>
        ) : isExiting ? (
          <motion.div
            key="loading-exit"
            initial={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
            animate={{
              clipPath: "inset(0 0 100% 0)",
              opacity: 0,
            }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleExitComplete}
            className="fixed inset-0 z-[9999]"
            style={{ backgroundColor: COLORS.bg }}
          >
            {/* Keep monogram visible during curtain reveal */}
            <div className="absolute inset-0 flex items-center justify-center">
              <DPMonogram className="w-36 h-36 md:w-44 md:h-44 opacity-30" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main content — always mounted, revealed after loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
