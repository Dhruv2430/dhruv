"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  X, 
  GitPullRequest, 
  Cpu, 
  ShieldAlert, 
  ListTodo, 
  BarChart3, 
  Terminal,
  Activity,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/lib/projectsData";

// Metadata mapping for screenshots
const SCREENSHOT_METADATA: Record<string, { title: string; description: string }[]> = {
  "ai-saas-workflow-platform": [
    {
      title: "Executive Analytics Dashboard",
      description: "A centralized command center showing real-time processing volumes, execution time statistics, vector index health, and OpenAI token expenditure analytics."
    },
    {
      title: "Smart Document Ingestion Hub",
      description: "Upload interface supporting PDFs, DOCX, and text files. Monitors real-time parsing, OCR chunking, embedding generation, and Pinecone indexing progress."
    },
    {
      title: "Interactive Workflow builder Canvas",
      description: "Visual node graph builder where developers can connect document triggers, metadata extractors, AI system prompts, and vector search nodes."
    },
    {
      title: "Vector Search Query Explorer",
      description: "Debugging interface to test semantic search queries, inspect retrieved text chunks, and evaluate vector similarity distance scores."
    },
    {
      title: "Semantic Chat Interface (RAG)",
      description: "Conversational AI assistant that retrieves relevant context from uploaded files to answer queries, showing inline source citations and verification logs."
    },
    {
      title: "Workspace settings & Key Manager",
      description: "Admin panel for configuring custom LLM temperature parameters, managing system prompts, rotating API keys, and setting usage rate limits."
    }
  ]
};

export default function ProjectScreenshots({ project }: { project: ProjectData }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [prevSlug, setPrevSlug] = useState(project.slug);

  if (project.slug !== prevSlug) {
    setPrevSlug(project.slug);
    setActiveIdx(0);
  }

  const isCodeReview = project.slug === "ai-code-review-platform";
  
  // Total slides count
  const slideCount = isCodeReview ? 5 : (project.screenshots?.length || 0);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setActiveIdx((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  }, [slideCount]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setActiveIdx((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  }, [slideCount]);

  const selectSlide = (idx: number) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Captions helper
  const getSlideInfo = (idx: number) => {
    if (isCodeReview) {
      const codeReviewSlides = [
        {
          title: "GitHub Pull Request Review Feed",
          description: "Inline AI review feedback posted directly onto commit diffs, pointing out syntax bugs and proposing direct code improvements."
        },
        {
          title: "AST Tree Structure Visualizer",
          description: "Abstract Syntax Tree representation of files, mapping class inheritance, module scopes, and function declarations for AI context parsing."
        },
        {
          title: "OWASP Vulnerability Audit Panel",
          description: "Automated scanner output highlighting hardcoded secrets, SQL injection vectors, cross-site scripting risks, and memory leak vulnerabilities."
        },
        {
          title: "BullMQ Job Queue & Webhook Telemetry",
          description: "Real-time task queue broker dashboard displaying worker thread status, analysis retry counts, and repository sync backlogs."
        },
        {
          title: "Developer Velocity & Impact Analytics",
          description: "Analytics reports charting developer hours saved, PR merge speeds, automated code linting rates, and quality score progressions."
        }
      ];
      return codeReviewSlides[idx] || { title: "", description: "" };
    }
    
    return SCREENSHOT_METADATA[project.slug]?.[idx] || {
      title: `Application Screen ${idx + 1}`,
      description: `Exploring interface elements and custom dashboard configurations of the platform.`
    };
  };

  const currentInfo = getSlideInfo(activeIdx);

  // Custom CSS Mockup Renderer for Code Review Platform
  const renderCodeReviewMockup = (idx: number) => {
    switch (idx) {
      case 0: // GitHub PR Feed
        return (
          <div className="w-full h-full bg-[#0d1117] text-[#e6edf3] p-4 md:p-6 font-mono text-[10px] md:text-xs flex flex-col justify-between select-none">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-[#30363d] pb-3 mb-3">
              <GitPullRequest size={16} className="text-[#238636]" />
              <span className="font-semibold text-white">PR #12: Optimize database lookup query</span>
              <span className="px-2 py-0.5 rounded-full bg-[#238636]/20 text-[#238636] font-bold text-[9px]">Open</span>
            </div>
            
            {/* Split Diff Content */}
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
                <div className="bg-[#21262d] px-3 py-1 text-[9px] text-[#8b949e] border-b border-[#30363d]">
                  src/routes/users.ts
                </div>
                <div className="p-2 space-y-0.5 leading-relaxed text-[9px] md:text-[11px]">
                  <div className="text-[#8b949e]">{"@@ -45,6 +45,9 @@ export async function getUser(req, res) {"}</div>
                  <div className="bg-[#ffebe9] text-[#ff8182] px-2 font-bold">{'-   const user = await db.collection("users").findOne({ id: req.params.id });'}</div>
                  <div className="bg-[#e6ffec] text-[#3fb950] px-2 font-bold">{'+   const cachedUser = await redis.get(`user:${req.params.id}`);'}</div>
                  <div className="bg-[#e6ffec] text-[#3fb950] px-2 font-bold">{'+   if (cachedUser) return res.json(JSON.parse(cachedUser));'}</div>
                  <div className="bg-[#e6ffec] text-[#3fb950] px-2 font-bold">{'+   const user = await db.collection("users").findOne({ _id: new ObjectId(req.params.id) });'}</div>
                </div>
              </div>
              
              {/* AI Comment Box */}
              <div className="border border-[#1f6feb]/30 bg-[#388bfd]/5 rounded-lg p-3 relative ml-4 md:ml-8 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">AI</div>
                  <span className="font-semibold text-white text-[10px]">Reviewer Agent</span>
                  <span className="text-[9px] text-[#8b949e]">1 minute ago</span>
                </div>
                <p className="text-[#c9d1d9] text-[10px] md:text-xs mb-2 leading-normal">
                  ⚡ **Query Optimization**: Using raw string lookup for `id` causes a full table scan. Converting to `ObjectId` resolves this, and implementing Redis caching yields up to 90% faster API responses.
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-2.5 py-1 rounded bg-[#238636] hover:bg-[#2ea043] text-white text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer">
                    <CheckCircle2 size={10} /> Approve & Apply
                  </button>
                  <button className="px-2.5 py-1 rounded bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9] text-[10px] font-semibold cursor-pointer">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 1: // AST Syntax Visualizer
        return (
          <div className="w-full h-full bg-[#0a0e17] text-[#8f9bb3] p-4 md:p-6 font-mono text-[9px] md:text-xs flex flex-col justify-between select-none">
            {/* Topbar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Cpu size={15} className="text-purple-500" />
                <span className="font-semibold text-slate-200">AST Tree Viewer: parseCommit()</span>
              </div>
              <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">AST-Parser v1.2</span>
            </div>

            {/* Tree Area */}
            <div className="flex-1 flex gap-4 items-center justify-center p-2 relative overflow-hidden">
              {/* SVG Tree background connector lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Root to children */}
                <line x1="50%" y1="15%" x2="25%" y2="45%" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="50%" y1="15%" x2="75%" y2="45%" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Child Left to grand */}
                <line x1="25%" y1="45%" x2="15%" y2="75%" stroke="#3b82f6" strokeWidth="1" />
                <line x1="25%" y1="45%" x2="35%" y2="75%" stroke="#3b82f6" strokeWidth="1" />
                {/* Child Right to grand */}
                <line x1="75%" y1="45%" x2="65%" y2="75%" stroke="#8b5cf6" strokeWidth="1" />
                <line x1="75%" y1="45%" x2="85%" y2="75%" stroke="#8b5cf6" strokeWidth="1" />
              </svg>
              
              {/* Nodes */}
              {/* Root */}
              <div className="absolute top-[10%] left-[50%] -translate-x-1/2 bg-slate-900 border-2 border-blue-500 text-blue-400 px-3 py-1.5 rounded-xl font-bold shadow-lg shadow-blue-500/10 z-10 flex flex-col items-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider">Root Node</span>
                <span>Program</span>
              </div>

              {/* Children L1 */}
              <div className="absolute top-[40%] left-[25%] -translate-x-1/2 bg-slate-900 border border-blue-400 text-blue-300 px-2.5 py-1 rounded-lg z-10 text-[9px] md:text-[10px] flex flex-col items-center">
                <span className="text-[8px] text-slate-500 uppercase">Decl</span>
                <span>FunctionDeclaration</span>
              </div>
              <div className="absolute top-[40%] left-[75%] -translate-x-1/2 bg-slate-900 border border-purple-400 text-purple-300 px-2.5 py-1 rounded-lg z-10 text-[9px] md:text-[10px] flex flex-col items-center">
                <span className="text-[8px] text-slate-500 uppercase">Block</span>
                <span>BlockStatement</span>
              </div>

              {/* Grandchildren L2 */}
              <div className="absolute top-[70%] left-[15%] -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 rounded z-10 text-[8px] md:text-[9px]">
                {'Identifier(name: "parse")'}
              </div>
              <div className="absolute top-[70%] left-[35%] -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 rounded z-10 text-[8px] md:text-[9px]">
                FormalParameters[2]
              </div>
              <div className="absolute top-[70%] left-[65%] -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 rounded z-10 text-[8px] md:text-[9px]">
                TryStatement
              </div>
              <div className="absolute top-[70%] left-[85%] -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 rounded z-10 text-[8px] md:text-[9px]">
                ReturnStatement
              </div>
            </div>
            
            {/* Footer console */}
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-slate-400 text-[8px] md:text-[9px]">
              <Terminal size={12} className="text-emerald-500" />
              <span>AST parse complete: 48 nodes indexed, 12 references mapped.</span>
            </div>
          </div>
        );
      case 2: // OWASP Security Risks
        return (
          <div className="w-full h-full bg-[#0b0c10] text-[#c5c6c7] p-4 md:p-6 font-sans flex flex-col justify-between select-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-rose-500" />
                <span className="font-semibold text-slate-200 font-mono text-[10px] md:text-xs">OWASP Vulnerability Audit</span>
              </div>
              <span className="text-[9px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">3 Issues Detected</span>
            </div>

            {/* List */}
            <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto pr-1">
              {/* Alert High */}
              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-3 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-600/10 border border-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-rose-500 font-bold text-[10px]">H</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-slate-200 text-[11px] md:text-xs font-mono">Sensitive API Key Leakage</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold font-mono">CRITICAL</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">
                    Hardcoded SendGrid API Key (`SG.aB1...`) discovered on line 14 of `src/lib/mailer.js`. Storing keys in source code violates OWASP A02:2021-Cryptographic Failures.
                  </p>
                </div>
              </div>

              {/* Alert Medium */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-600/10 border border-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-amber-500 font-bold text-[10px]">M</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-slate-200 text-[11px] md:text-xs font-mono">SQL Injection vulnerability</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold font-mono">WARNING</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">
                    Unsanitized input parameter `req.query.user` passed directly to raw SQL query in `src/routes/users.js` line 52. Threat of SQL Injection (OWASP A03:2021-Injection).
                  </p>
                </div>
              </div>

              {/* Alert Low */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-3 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600/10 border border-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-blue-500 font-bold text-[10px]">I</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-slate-200 text-[11px] md:text-xs font-mono">Outdated Lodash Package</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold font-mono">ADVISORY</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">
                    `lodash` package is version `4.17.15`. Upgrading to `4.17.21` is recommended to patch prototype pollution vulnerabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 3: // BullMQ Worker Status
        return (
          <div className="w-full h-full bg-[#090b0e] text-[#a0a5b5] p-4 md:p-6 font-mono text-[9px] md:text-xs flex flex-col justify-between select-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ListTodo size={15} className="text-indigo-400 animate-pulse" />
                <span className="font-semibold text-slate-200">BullMQ Background Queue (Redis)</span>
              </div>
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[9px] font-bold">
                <Activity size={10} className="animate-pulse" /> 4 Active Workers
              </span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="bg-[#12161f] border border-slate-800 rounded-lg p-2 text-center">
                <div className="text-slate-500 text-[7px] md:text-[8px] uppercase">Completed</div>
                <div className="text-slate-100 text-xs md:text-sm font-bold mt-0.5">8,412</div>
              </div>
              <div className="bg-[#12161f] border border-slate-800 rounded-lg p-2 text-center">
                <div className="text-slate-500 text-[7px] md:text-[8px] uppercase">Active</div>
                <div className="text-indigo-400 text-xs md:text-sm font-bold mt-0.5">3</div>
              </div>
              <div className="bg-[#12161f] border border-slate-800 rounded-lg p-2 text-center">
                <div className="text-slate-500 text-[7px] md:text-[8px] uppercase">Delayed</div>
                <div className="text-amber-400 text-xs md:text-sm font-bold mt-0.5">4</div>
              </div>
              <div className="bg-[#12161f] border border-slate-800 rounded-lg p-2 text-center">
                <div className="text-slate-500 text-[7px] md:text-[8px] uppercase">Failed</div>
                <div className="text-rose-500 text-xs md:text-sm font-bold mt-0.5">12</div>
              </div>
            </div>

            {/* Active Job Processing list */}
            <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
              <div className="bg-[#161a24]/60 border border-slate-800 rounded-lg p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                  <span className="text-slate-200 text-[9px] md:text-[10px]">Job #14283: webhook-ast-parse</span>
                </div>
                <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-3/4 animate-[pulse_1.5s_infinite]"></div>
                </div>
              </div>
              
              <div className="bg-[#161a24]/60 border border-slate-800 rounded-lg p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span className="text-slate-200 text-[9px] md:text-[10px]">Job #14284: ai-code-review-gpt4</span>
                </div>
                <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-1/3 animate-[pulse_1.5s_infinite]"></div>
                </div>
              </div>

              <div className="bg-[#12151d] border border-slate-900 rounded-lg p-2 flex items-center justify-between text-slate-500 text-[8px] md:text-[9px]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-500/60" />
                  <span>Job #14282: repository-sync-commit</span>
                </div>
                <span>Done (240ms)</span>
              </div>
            </div>
          </div>
        );
      case 4: // Developer Impact Analytics
        return (
          <div className="w-full h-full bg-[#08090d] text-[#acb1c0] p-4 md:p-6 font-sans flex flex-col justify-between select-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-emerald-500" />
                <span className="font-semibold text-slate-200 font-mono text-[10px] md:text-xs">Developer Velocity Impact</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">Weekly Update</span>
            </div>

            {/* Metrics Grid */}
            <div className="flex-1 grid grid-cols-2 gap-4 items-center p-1">
              <div className="bg-[#131520] border border-[#23273e]/50 rounded-2xl p-3 text-center flex flex-col justify-center h-20 md:h-24 hover:border-emerald-500/30 transition-all duration-300">
                <span className="text-[#8e94a8] text-[9px] md:text-[10px] uppercase font-mono tracking-wider">PR Merge Velocity</span>
                <span className="text-xl md:text-2xl font-bold text-emerald-400 mt-1 font-mono">+75%</span>
                <span className="text-[8px] text-slate-500 mt-0.5">Average wait time: 14m (was 56m)</span>
              </div>
              
              <div className="bg-[#131520] border border-[#23273e]/50 rounded-2xl p-3 text-center flex flex-col justify-center h-20 md:h-24 hover:border-blue-500/30 transition-all duration-300">
                <span className="text-[#8e94a8] text-[9px] md:text-[10px] uppercase font-mono tracking-wider">Time Saved / Week</span>
                <span className="text-xl md:text-2xl font-bold text-blue-400 mt-1 font-mono">18.4 hrs</span>
                <span className="text-[8px] text-slate-500 mt-0.5">Calculated across 8 core developers</span>
              </div>

              <div className="bg-[#131520] border border-[#23273e]/50 rounded-2xl p-3 text-center flex flex-col justify-center h-20 md:h-24 hover:border-indigo-500/30 transition-all duration-300">
                <span className="text-[#8e94a8] text-[9px] md:text-[10px] uppercase font-mono tracking-wider">Bug Catch Rate</span>
                <span className="text-xl md:text-2xl font-bold text-indigo-400 mt-1 font-mono">68.2%</span>
                <span className="text-[8px] text-slate-500 mt-0.5">Critical bugs caught pre-merge</span>
              </div>

              <div className="bg-[#131520] border border-[#23273e]/50 rounded-2xl p-3 text-center flex flex-col justify-center h-20 md:h-24 hover:border-purple-500/30 transition-all duration-300">
                <span className="text-[#8e94a8] text-[9px] md:text-[10px] uppercase font-mono tracking-wider">Automated Reviews</span>
                <span className="text-xl md:text-2xl font-bold text-purple-400 mt-1 font-mono">98.4%</span>
                <span className="text-[8px] text-slate-500 mt-0.5">Total commit review coverage</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Lightbox component helper
  const handleLightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const handleLightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  return (
    <section id="screenshots" className="py-16 border-b border-[var(--color-border)] overflow-hidden">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-3 text-[var(--color-foreground)]">Screenshots & UI</h2>
          <p className="text-sm text-[var(--color-text-muted)] max-w-xl">
            {isCodeReview 
              ? "Explore high-fidelity mockups of key workflow screens, automation pipelines, and analysis panels."
              : "Click on the mockup to zoom in. Use the controls or thumbnails below to explore the platform dashboards."
            }
          </p>
        </div>
      </div>

      <div className="w-full max-w-full flex flex-col gap-6">
        
        {/* Main Browser Frame */}
        <div 
          onClick={() => !isCodeReview && setLightboxOpen(true)}
          className={`w-full aspect-[16/10] sm:aspect-[16/9.5] border border-[var(--color-border)] rounded-2xl bg-white shadow-lg flex flex-col overflow-hidden relative group/browser select-none transition-all duration-300 ${!isCodeReview ? "cursor-zoom-in hover:shadow-xl" : ""}`}
        >
          {/* Fake Browser Toolbar */}
          <div className="w-full bg-[#fbfbfa] border-b border-[var(--color-border)]/30 px-4 py-3 flex items-center shrink-0 relative z-20">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-75" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-75" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-75" />
            </div>
            
            {/* Fake Domain Address Bar */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 sm:w-1/2 h-6 rounded bg-[#f1f0ee] border border-[var(--color-border)]/20 flex items-center justify-center text-[9px] text-[var(--color-text-muted)] font-mono truncate px-4">
              {isCodeReview ? "codereview.ai" : "contexta.ai"}/dashboard/{currentInfo.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            </div>

            {/* Zoom / Info overlay button (if hover and has real screenshots) */}
            {!isCodeReview && (
              <div className="ml-auto opacity-0 group-hover/browser:opacity-100 transition-opacity duration-200 text-[var(--color-text-muted)] bg-white/80 p-1 rounded border border-[var(--color-border)]/40 shadow-sm shrink-0">
                <ZoomIn size={14} />
              </div>
            )}
          </div>

          {/* Screenshot Display Area with Motion */}
          <div className="flex-1 w-full h-full relative overflow-hidden bg-[#fafafa]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    opacity: 0,
                    x: dir > 0 ? 80 : -80
                  }),
                  center: {
                    opacity: 1,
                    x: 0
                  },
                  exit: (dir: number) => ({
                    opacity: 0,
                    x: dir > 0 ? -80 : 80
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {isCodeReview ? (
                  renderCodeReviewMockup(activeIdx)
                ) : (
                  <Image
                    src={project.screenshots?.[activeIdx] || ""}
                    alt={`${project.title} screenshot ${activeIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    className="object-cover object-top block transition-transform duration-700 ease-out group-hover/browser:scale-[1.008]"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Arrows (shown on hover on desktop, always on touch devices) */}
            <button 
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/browser:opacity-100 focus:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
              title="Previous Screenshot"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/browser:opacity-100 focus:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
              title="Next Screenshot"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Caption Panel (Dynamic Title & Description) */}
        <div className="bg-[var(--color-surface)]/20 border border-[var(--color-border)] rounded-2xl p-5 min-h-[100px] flex flex-col justify-center transition-all duration-300">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-xs font-mono font-bold text-[var(--color-primary)] uppercase tracking-wider">
              Screen {activeIdx + 1} of {slideCount}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/40" />
            <h4 className="text-[15px] font-semibold text-[var(--color-foreground)] truncate">
              {currentInfo.title}
            </h4>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {currentInfo.description}
          </p>
        </div>

        {/* Thumbnail Selector / Pagination Strip */}
        <div className="w-full flex items-center gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
          {Array.from({ length: slideCount }).map((_, idx) => {
            const info = getSlideInfo(idx);
            return (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className={`flex-shrink-0 snap-center rounded-xl overflow-hidden border-2 transition-all duration-200 flex flex-col w-28 md:w-36 ${idx === activeIdx ? "border-[var(--color-primary)] scale-[1.02] shadow-md shadow-[var(--color-primary)]/5" : "border-[var(--color-border)] opacity-60 hover:opacity-100 hover:border-[var(--color-text-muted)]/40"} cursor-pointer`}
              >
                {/* Thumbnail Preview Area */}
                <div className="w-full aspect-[16/10] bg-[#fafafa] relative overflow-hidden select-none">
                  {isCodeReview ? (
                    // Mini abstract graphic representing each mockup
                    <div className="w-full h-full bg-[#111622] flex items-center justify-center p-2">
                      {idx === 0 && <GitPullRequest size={16} className="text-[#238636]" />}
                      {idx === 1 && <Cpu size={16} className="text-purple-400" />}
                      {idx === 2 && <ShieldAlert size={16} className="text-rose-400" />}
                      {idx === 3 && <ListTodo size={16} className="text-indigo-400" />}
                      {idx === 4 && <BarChart3 size={16} className="text-emerald-400" />}
                    </div>
                  ) : (
                    <Image 
                      src={project.screenshots?.[idx] || ""} 
                      alt={`Thumb ${idx + 1}`}
                      fill
                      sizes="150px"
                      className="object-cover object-top pointer-events-none"
                    />
                  )}
                </div>
                {/* Mini Title text */}
                <div className="bg-[var(--color-surface)]/40 px-2 py-1.5 border-t border-[var(--color-border)]/50 text-[9px] font-semibold text-[var(--color-text-muted)] truncate w-full text-left">
                  {info.title.split(" & ")[0].split(" / ")[0].split(" (")[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox full-screen zoom modal */}
      <AnimatePresence>
        {lightboxOpen && !isCodeReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-8 cursor-zoom-out select-none"
          >
            {/* Lightbox Topbar */}
            <div className="w-full flex items-center justify-between text-white pb-4 z-50">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7f8c8d]">
                  Zoom View / Screen {activeIdx + 1} of {slideCount}
                </span>
                <span className="text-base font-semibold text-white/90">
                  {currentInfo.title}
                </span>
              </div>
              <button 
                onClick={() => setLightboxOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors border border-white/10 cursor-pointer"
                title="Close Zoom"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div className="flex-1 w-full flex items-center justify-center relative my-4">
              <button
                onClick={handleLightboxPrev}
                className="absolute left-2 md:left-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.img 
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={project.screenshots?.[activeIdx]} 
                alt="Zoomed Screenshot"
                className="max-w-[85vw] max-h-[75vh] object-contain rounded-xl border border-white/10 shadow-2xl"
              />

              <button
                onClick={handleLightboxNext}
                className="absolute right-2 md:right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Lightbox Caption bottom */}
            <div className="w-full text-center max-w-2xl mx-auto pb-4">
              <p className="text-sm text-white/70 leading-relaxed">
                {currentInfo.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
