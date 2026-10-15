"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Server,
  Globe,
  Cpu,
  Database,
  Terminal as TerminalIcon,
  Cloud,
  Code,
  Shield,
  Activity,
  ChevronDown
} from "lucide-react";

// Import UI components
import { ServiceCard } from "@/components/cloud/ServiceCard";
import { DeploymentTerminal } from "@/components/cloud/DeploymentTerminal";
import { InfrastructureCards } from "@/components/cloud/InfrastructureCards";

// Dynamically import the heavy R3F Canvas to prevent SSR issues and optimize performance
const CloudCanvasDynamic = dynamic(
  () => import("@/components/cloud/CloudCanvas").then((mod) => mod.CloudCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#F6F6F6] text-[#6B6B6B] font-mono gap-3 select-none">
        <Activity className="w-6 h-6 text-[#6D9886] animate-spin" />
        <span className="text-xs uppercase tracking-widest font-semibold">ENGAGING 3D WORKSPACE...</span>
      </div>
    )
  }
);

export default function CloudDeploymentPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const lastTouchY = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const panel = leftPanelRef.current;
    if (!panel) return;

    // Track detailed scroll progress for camera transitions
    const handleScroll = () => {
      const scrollPos = panel.scrollTop;
      const docHeight = panel.scrollHeight - panel.clientHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.max(0, Math.min(0.999, scrollPos / docHeight)));
      }
    };

    // intersection observer for active step tracking
    const observerOptions = {
      root: panel,
      rootMargin: "-40% 0px -40% 0px", // triggers when center of card crosses the middle region
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepAttr = entry.target.getAttribute("data-step");
          if (stepAttr !== null) {
            setActiveStep(parseInt(stepAttr, 10));
          }
        }
      });
    }, observerOptions);

    const sections = panel.querySelectorAll("section[data-step]");
    sections.forEach((section) => observer.observe(section));

    panel.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial progress check
    handleScroll();

    return () => {
      panel.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToStep = (step: number) => {
    const targetElement = leftPanelRef.current?.querySelector(`section[data-step="${step}"]`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  // Forward mobile swipe gestures on the 3D viewport to the text scrolling panel
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      lastTouchY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (lastTouchY.current !== null && e.touches.length === 1 && leftPanelRef.current) {
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY.current - currentY;
      leftPanelRef.current.scrollTop += deltaY;
      lastTouchY.current = currentY;
    }
  };

  const handleTouchEnd = () => {
    lastTouchY.current = null;
  };

  if (!mounted) return null;

  return (
    <div className="h-screen w-screen bg-[#F6F6F6] text-[#212121] overflow-hidden flex flex-col lg:flex-row font-sans">
      {/* Dynamic 2-Panel Split Layout */}
      <div className="flex flex-col lg:flex-row w-full h-full">
        
        {/* LEFT PANEL: Narrative Walkthrough content */}
        <div
          ref={leftPanelRef}
          className="w-full lg:w-1/2 h-[55vh] lg:h-screen overflow-y-auto flex flex-col items-center px-6 sm:px-12 lg:px-16 z-10 py-16 lg:py-24 border-r border-[#D9CAB3]/20"
        >
          <div className="w-full max-w-xl flex flex-col gap-24 lg:gap-32">
            
            {/* SECTION 1: HERO INTRO (Step 0) */}
            <section data-step="0" className="min-h-[80vh] flex flex-col justify-center select-none pt-8">
              <span className="text-[#6D9886] font-mono text-xs font-bold tracking-widest uppercase mb-3 block">
                AWS PRODUCTION ENVIRONMENT
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight text-[#212121] mb-6">
                Interactive MERN Cloud Deployment
              </h1>
              <p className="text-lg text-[#6B6B6B] leading-relaxed mb-10 max-w-lg">
                Visualizing how modern full-stack applications are compiled, cached, routed, and secured across production AWS infrastructure.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  onClick={() => scrollToStep(1)}
                  className="bg-[#6D9886] hover:bg-[#567A6B] text-[#F6F6F6] px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  Start Deployment Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-16 flex items-center gap-2 text-xs font-mono text-[#6B6B6B]">
                <ChevronDown className="w-4 h-4 animate-bounce" />
                <span>Scroll down to navigate walkthrough</span>
              </div>
            </section>

            {/* SECTION 2: LOCAL DEVELOPMENT (Step 1) */}
            <section data-step="1" className="min-h-[85vh] flex flex-col justify-center">
              <ServiceCard
                stepNumber={1}
                title="Local Development Prep"
                subtitle="VS Code & Git Repositories"
                badge="LOCAL HOST"
              >
                <p>
                  Before code goes into the cloud, it must be compiled and optimized. Our React frontend code is bundled, and environment keys are loaded into production configurations.
                </p>
                <div className="border-l-2 border-[#6D9886] pl-4 py-1 text-xs text-[#6B6B6B] italic">
                  "Production builds optimize package sizes, tree-shake dead scripts, and minimize bundle loads for lightning-fast loads."
                </div>
                <div className="mt-6">
                  <DeploymentTerminal activeStep={1} />
                </div>
              </ServiceCard>
            </section>

            {/* SECTION 3: FRONTEND DEPLOYMENT TO S3 (Step 2) */}
            <section data-step="2" className="min-h-[85vh] flex flex-col justify-center">
              <ServiceCard
                stepNumber={2}
                title="Static Website Hosting on S3"
                subtitle="Decoupled Ephemeral Storage"
                badge="AWS S3"
              >
                <p>
                  React builds are client-side Single Page Applications (SPAs). S3 acts as a serverless static file hosting node, storing HTML, CSS, and JS files without the cost or vulnerability of a running virtual server.
                </p>
                <ul className="text-xs space-y-2 text-[#6B6B6B] list-disc list-inside">
                  <li>Zero active compute costs for serving frontends</li>
                  <li>Ephemerally decoupled from server database clusters</li>
                  <li>Allows presigned secure media uploads directly</li>
                </ul>
                <div className="mt-6">
                  <DeploymentTerminal activeStep={2} />
                </div>
              </ServiceCard>
            </section>

            {/* SECTION 4: CLOUDFRONT CDN (Step 3) */}
            <section data-step="3" className="min-h-[85vh] flex flex-col justify-center">
              <ServiceCard
                stepNumber={3}
                title="Global Caching via CloudFront"
                subtitle="AWS Certificate Manager & SSL Bindings"
                badge="AWS CLOUDFRONT"
              >
                <p>
                  S3 buckets are centralized in a single region. To achieve global low latencies, CloudFront pulls static files to local edge servers nearest to visitors, serving HTTPS SSL verification endpoints natively.
                </p>
                <div className="bg-[#D9CAB3]/20 p-3 rounded-lg flex items-start gap-2.5">
                  <Shield className="w-5 h-5 text-[#6D9886] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#6B6B6B]">
                    <strong>Security Alert:</strong> Edge invalidations refresh modified assets immediately, protecting client states.
                  </span>
                </div>
                <div className="mt-6">
                  <DeploymentTerminal activeStep={3} />
                </div>
              </ServiceCard>
            </section>

            {/* SECTION 5: EC2 BACKEND DEPLOYMENT (Step 4) */}
            <section data-step="4" className="min-h-[85vh] flex flex-col justify-center">
              <ServiceCard
                stepNumber={4}
                title="Express Server on EC2"
                subtitle="Ubuntu Server & PM2 Clusters"
                badge="AWS EC2"
              >
                <p>
                  Unlike frontends, backends require dynamic computing cores to process APIs and database query calculations. Express runs continuously inside an AWS EC2 instance, managed by PM2.
                </p>
                <ul className="text-xs space-y-2 text-[#6B6B6B] list-disc list-inside">
                  <li>PM2 handles crashes by executing auto-restarts</li>
                  <li>Clustering pools workloads across multiple CPU cores</li>
                  <li>VPC security groups restrict unauthorized public access</li>
                </ul>
                <div className="mt-6">
                  <DeploymentTerminal activeStep={4} />
                </div>
              </ServiceCard>
            </section>

            {/* SECTION 6: NGINX REVERSE PROXY (Step 5) */}
            <section data-step="5" className="min-h-[85vh] flex flex-col justify-center">
              <ServiceCard
                stepNumber={5}
                title="Nginx Reverse Proxy Gateway"
                subtitle="Port Translation & Rate Limiting"
                badge="NGINX"
              >
                <p>
                  Nginx stands in front of our server processes, catching external web traffic and routing it inward to target backend ports. It acts as an API gateway, preventing direct external exposure of Express ports.
                </p>
                <div className="mt-6">
                  <DeploymentTerminal activeStep={5} />
                </div>
              </ServiceCard>
            </section>

            {/* SECTION 7: DATABASE FLOW (Step 6) */}
            <section data-step="6" className="min-h-[85vh] flex flex-col justify-center">
              <ServiceCard
                stepNumber={6}
                title="MongoDB Atlas Database Cluster"
                subtitle="Replica Sets & VPC Peering Tunnels"
                badge="MONGODB ATLAS"
              >
                <p>
                  To prevent data loss in server failures, we decouple database state management. MongoDB Atlas handles replication synchronizations between primary and secondary database canisters, connected to EC2 via private VPC Peering.
                </p>
                <div className="mt-6">
                  <DeploymentTerminal activeStep={6} />
                </div>
              </ServiceCard>
            </section>

            {/* SECTION 8: COMPLETE PRODUCTION FLOW (Step 7) */}
            <section data-step="7" className="min-h-[85vh] flex flex-col justify-center">
              <ServiceCard
                stepNumber={7}
                title="Full End-to-End Production Flow"
                subtitle="MERN Pipeline Architecture Map"
                badge="AWS MERN FLOW"
              >
                <p>
                  Look at the 3D model: Browser requests static content cached on CloudFront edge clusters. Dynamic API calls bypass S3 and Route53 to hit Nginx on the EC2 host, which queries data in MongoDB Atlas.
                </p>
                <div className="mt-6">
                  <DeploymentTerminal activeStep={7} />
                </div>
              </ServiceCard>
            </section>

            {/* SECTION 9: LIVE CI/CD TRIGGER (Step 8) */}
            <section data-step="8" className="min-h-[85vh] flex flex-col justify-center">
              <ServiceCard
                stepNumber={8}
                title="GitHub Actions CI/CD pipeline"
                subtitle="Automated Code Updates"
                badge="CI/CD WORKFLOW"
              >
                <p>
                  Pushing commits triggers a webhook runners pipeline. Tests run; if they pass, files are automatically synced to S3, and the EC2 server pulls and hot-reloads processes without downtime.
                </p>
                <div className="mt-6">
                  <DeploymentTerminal activeStep={8} />
                </div>
              </ServiceCard>
            </section>

            {/* SECTION 10: INFRASTRUCTURE SUMMARY (Step 9) */}
            <section data-step="9" className="min-h-[100vh] flex flex-col justify-center pt-8">
              <span className="text-[#6D9886] font-mono text-xs font-bold tracking-widest uppercase mb-3 block">
                REFERENCE DESIGNS
              </span>
              <h2 className="text-3xl font-display font-bold text-[#212121] mb-4">
                Architecture Explanations
              </h2>
              <p className="text-sm text-[#6B6B6B] mb-8 leading-relaxed">
                Why we use this stack arrangement in production:
              </p>
              
              <InfrastructureCards />
              
              <div className="mt-12">
                <DeploymentTerminal activeStep={9} />
              </div>
            </section>

          </div>
        </div>

        {/* RIGHT PANEL: Fixed 3D Canvas Viewport */}
        <div
          onWheel={(e) => {
            if (leftPanelRef.current) {
              leftPanelRef.current.scrollTop += e.deltaY;
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full lg:w-1/2 h-[45vh] lg:h-screen relative order-first lg:order-last z-0"
        >
          <CloudCanvasDynamic activeStep={activeStep} scrollProgress={scrollProgress} />
          
          {/* Subtle overlay stats dashboard for premium SaaS vibe */}
          <div className="absolute bottom-6 left-6 right-6 pointer-events-none flex justify-between items-center text-xs font-mono text-[#6B6B6B] bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#D9CAB3]/30 shadow-sm select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6D9886] animate-ping"></span>
              <span className="font-semibold text-[#212121]">STATUS: ONLINE</span>
            </div>
            <div className="flex gap-4">
              <span>LATENCY: 28ms</span>
              <span>Uptime: 99.99%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Floating HUD Controller Overlay at Bottom Left (only visible on desktop when mounted) */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-25 bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#D9CAB3]/50 shadow-md gap-4 items-center select-none">
        <span className="text-xs font-mono font-bold text-[#212121]">
          STEP {activeStep + 1} OF 10
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="p-1.5 rounded-lg border border-[#D9CAB3]/50 hover:bg-[#D9CAB3]/30 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToStep(Math.min(9, activeStep + 1))}
            disabled={activeStep === 9}
            className="p-1.5 rounded-lg border border-[#D9CAB3]/50 hover:bg-[#D9CAB3]/30 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
