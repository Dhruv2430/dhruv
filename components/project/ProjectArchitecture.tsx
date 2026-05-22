import { Database, Server, Cpu, Globe, Workflow, GitPullRequest, GitMerge, ListTodo, Monitor, ShieldCheck, Sparkles, FolderOpen, Network, Zap } from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

export default function ProjectArchitecture({ project }: { project: ProjectData }) {
  const isCodeReview = project.slug === "ai-code-review-platform";

  return (
    <section id="system-design" className="py-16 border-b border-[var(--color-border)] overflow-hidden">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-[var(--color-foreground)]">System Design</h2>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
          High-level architecture of the {project.title}.
        </p>
      </div>

      <div className="bg-[var(--color-surface)]/10 border border-[var(--color-border)] rounded-3xl p-8 lg:p-12 overflow-x-auto">
        <div className="min-w-[800px] relative">
          
          {/* Legend */}
          <div className="absolute top-0 right-0 flex gap-4 text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-1"><div className="w-4 h-[1px] bg-[var(--color-foreground)]"></div> Request Flow</div>
            <div className="flex items-center gap-1"><div className="w-4 h-[1px] bg-[var(--color-primary)]"></div> Data Flow</div>
            <div className="flex items-center gap-1"><div className="w-4 border-t border-dashed border-[var(--color-text-muted)]"></div> External Service</div>
          </div>

          {!isCodeReview ? (
            /* Workflow Platform Diagram */
            <div className="flex items-center justify-between mt-8">
              {/* Client Side */}
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-32 text-center text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Client</div>
                <div className="bg-white/80 backdrop-blur-md border border-[var(--color-border)] shadow-md rounded-2xl p-5 flex flex-col items-center justify-center gap-2 w-32 hover:border-[var(--color-primary)]/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <Monitor size={28} className="text-[var(--color-foreground)]" />
                  <span className="text-xs font-bold text-[var(--color-foreground)]">Web App</span>
                  <span className="text-[10px] text-[var(--color-primary)] font-semibold">(Next.js)</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-1 h-[1px] bg-[var(--color-foreground)]/40 relative mx-4">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-foreground)]/60 rotate-45"></div>
              </div>

              {/* Gateway & Auth */}
              <div className="flex items-center gap-8 relative z-10">
                <div className="bg-white/80 backdrop-blur-md border border-[var(--color-primary)]/30 rounded-2xl p-6 text-center w-40 relative hover:border-[var(--color-primary)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-background)] border border-[var(--color-primary)]/20 px-2 py-0.5 rounded-full text-[9px] font-bold text-[var(--color-primary)] uppercase tracking-wider">Gateway</div>
                  <Server size={32} className="mx-auto text-[var(--color-primary)] mb-2" />
                  <span className="text-xs font-bold text-[var(--color-foreground)]">API Gateway</span>
                  <div className="text-[10px] text-[var(--color-text-muted)] mt-1">(NGINX)</div>
                </div>

                {/* Arrow */}
                <div className="w-8 h-[1px] bg-[var(--color-foreground)]/40 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-foreground)]/60 rotate-45"></div>
                </div>

                <div className="bg-white/80 backdrop-blur-md border border-[var(--color-border)] rounded-2xl p-6 text-center w-40 hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <ShieldCheck size={32} className="mx-auto text-blue-500 mb-2" />
                  <span className="text-xs font-bold text-[var(--color-foreground)]">Auth Service</span>
                  <div className="text-[10px] text-blue-500 font-semibold mt-1">(JWT)</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="w-8 h-[1px] bg-[var(--color-foreground)]/40 relative mx-4">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-foreground)]/60 rotate-45"></div>
              </div>

              {/* Core Services */}
              <div className="bg-[var(--color-surface)]/20 border border-[var(--color-border)] rounded-3xl p-6 relative z-10">
                <div className="absolute -top-3 left-6 bg-[var(--color-background)] px-2 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest rounded-full border border-[var(--color-border)]">Backend Services</div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-6">
                    <div className="bg-white/80 backdrop-blur-md shadow-sm border border-[var(--color-border)] rounded-xl p-4 text-center w-36 hover:border-purple-500/50 hover:shadow-md transition-all duration-300">
                      <Workflow size={24} className="mx-auto text-purple-600 mb-2" />
                      <span className="text-xs font-bold text-[var(--color-foreground)]">Workflow Service</span>
                      <div className="text-[10px] text-[var(--color-text-muted)] mt-1">(Node.js)</div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="bg-white/80 backdrop-blur-md shadow-sm border border-dashed border-green-500/50 rounded-xl p-4 text-center w-36 relative hover:border-green-500 hover:shadow-md transition-all duration-300">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-green-500/50"></div>
                        <Sparkles size={24} className="mx-auto text-green-600 mb-2" />
                        <span className="text-xs font-bold text-[var(--color-foreground)]">AI Service</span>
                        <div className="text-[10px] text-green-600 font-semibold mt-1">(OpenAI RAG)</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-md shadow-sm border border-[var(--color-border)] rounded-xl p-4 text-center w-36 relative hover:border-orange-500/50 hover:shadow-md transition-all duration-300">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-[var(--color-foreground)]/40"></div>
                        <FolderOpen size={24} className="mx-auto text-orange-500 mb-2" />
                        <span className="text-xs font-bold text-[var(--color-foreground)]">File Service</span>
                        <div className="text-[10px] text-[var(--color-text-muted)] mt-1">(AWS S3)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="w-8 h-[1px] bg-[var(--color-primary)] relative mx-4">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-primary)] rotate-45"></div>
              </div>

              {/* Storage */}
              <div className="flex flex-col gap-4 relative z-10">
                <div className="bg-emerald-50/70 backdrop-blur-md border border-emerald-200/60 shadow-sm rounded-xl p-4 flex items-center gap-3 w-40 hover:border-emerald-500/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <Database size={20} className="text-emerald-600" />
                  <div>
                    <div className="text-xs font-bold text-emerald-950">Database</div>
                    <div className="text-[10px] text-emerald-600 font-bold">(MongoDB)</div>
                  </div>
                </div>
                <div className="bg-purple-50/70 backdrop-blur-md border border-purple-200/60 shadow-sm rounded-xl p-4 flex items-center gap-3 w-40 hover:border-purple-500/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <Network size={20} className="text-purple-600" />
                  <div>
                    <div className="text-xs font-bold text-purple-950">Vector DB</div>
                    <div className="text-[10px] text-purple-600 font-bold">(Pinecone)</div>
                  </div>
                </div>
                <div className="bg-rose-50/70 backdrop-blur-md border border-rose-200/60 shadow-sm rounded-xl p-4 flex items-center gap-3 w-40 hover:border-rose-500/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <Zap size={20} className="text-rose-600" />
                  <div>
                    <div className="text-xs font-bold text-rose-950">Cache</div>
                    <div className="text-[10px] text-rose-600 font-bold">(Redis)</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Code Review Platform Diagram */
            <div className="flex items-center justify-between mt-8">
              {/* GitHub Hook / Client */}
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-32 text-center text-sm font-medium mb-2">Sources</div>
                <div className="bg-white border border-[var(--color-border)] shadow-sm rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                  <GitPullRequest size={24} className="text-[var(--color-foreground)]" />
                  <span className="text-xs font-semibold">GitHub webhook</span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">(Git PR events)</span>
                </div>
                <div className="bg-white border border-[var(--color-border)] shadow-sm rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                  <Globe size={24} className="text-[var(--color-foreground)]" />
                  <span className="text-xs font-semibold">Web Dashboard</span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">(User Config)</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-1 h-[1px] bg-[var(--color-foreground)] relative mx-4">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-foreground)] rotate-45"></div>
              </div>

              {/* API Gateway & Queue */}
              <div className="flex items-center gap-8 relative z-10">
                <div className="bg-[var(--color-background)] border border-[var(--color-primary)]/30 rounded-2xl p-6 text-center w-40 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-background)] px-2 text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest">Gateway</div>
                  <Server size={32} className="mx-auto text-[var(--color-primary)] mb-2" />
                  <span className="text-xs font-medium">Webhook Handler</span>
                  <div className="text-[10px] text-[var(--color-text-muted)] mt-1">(Express App)</div>
                </div>

                {/* Arrow */}
                <div className="w-8 h-[1px] bg-[var(--color-foreground)] relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-foreground)] rotate-45"></div>
                </div>

                <div className="bg-[var(--color-background)] border border-dashed border-[var(--color-border)] rounded-2xl p-6 text-center w-40">
                  <ListTodo size={32} className="mx-auto text-purple-500 mb-2" />
                  <span className="text-xs font-medium">Queue Broker</span>
                  <div className="text-[10px] text-[var(--color-text-muted)] mt-1">(BullMQ / Redis)</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="w-8 h-[1px] bg-[var(--color-foreground)] relative mx-4">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-foreground)] rotate-45"></div>
              </div>

              {/* Analysis Engines */}
              <div className="bg-[var(--color-surface)]/40 border border-[var(--color-border)] rounded-3xl p-6 relative z-10">
                <div className="absolute -top-3 left-6 bg-[var(--color-background)] px-2 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest rounded-full border border-[var(--color-border)]">Analysis Engines</div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-6">
                    <div className="bg-white shadow-sm border border-[var(--color-border)] rounded-xl p-4 text-center w-36">
                      <Cpu size={24} className="mx-auto text-blue-600 mb-2" />
                      <span className="text-xs font-medium">AST Parser</span>
                      <div className="text-[10px] text-[var(--color-text-muted)] mt-1">(Tree-Sitter)</div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="bg-white shadow-sm border border-dashed border-green-500/50 rounded-xl p-4 text-center w-36 relative">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-green-500/50"></div>
                        <Cpu size={24} className="mx-auto text-green-600 mb-2" />
                        <span className="text-xs font-medium">AI Reviewer</span>
                        <div className="text-[10px] text-[var(--color-text-muted)] mt-1">(OpenAI GPT-4)</div>
                      </div>
                      <div className="bg-white shadow-sm border border-[var(--color-border)] rounded-xl p-4 text-center w-36 relative">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-[1px] bg-[var(--color-foreground)]"></div>
                        <GitMerge size={24} className="mx-auto text-orange-500 mb-2" />
                        <span className="text-xs font-medium">GitHub Poster</span>
                        <div className="text-[10px] text-[var(--color-text-muted)] mt-1">(Octokit API)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="w-8 h-[1px] bg-[var(--color-primary)] relative mx-4">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-primary)] rotate-45"></div>
              </div>

              {/* DB & Cache Storage */}
              <div className="flex flex-col gap-4 relative z-10">
                <div className="bg-white border-l-4 border-l-green-500 border-y border-r border-[var(--color-border)] shadow-sm rounded-xl p-4 flex items-center gap-3 w-40">
                  <Database size={20} className="text-green-500" />
                  <div>
                    <div className="text-xs font-semibold">Database</div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">(MongoDB)</div>
                  </div>
                </div>
                <div className="bg-white border-l-4 border-l-red-500 border-y border-r border-[var(--color-border)] shadow-sm rounded-xl p-4 flex items-center gap-3 w-40">
                  <Database size={20} className="text-red-500" />
                  <div>
                    <div className="text-xs font-semibold">Cache/Queues</div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">(Redis)</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Background decorative lines */}
          {isCodeReview && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
               <path d="M 450 180 L 450 250 L 750 250 L 750 220" fill="none" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="4 4" />
               <rect x="735" y="210" width="30" height="20" fill="white" stroke="var(--color-border)" rx="4" />
               <text x="742" y="223" fontSize="8" fill="var(--color-text-muted)">Mail</text>
            </svg>
          )}

        </div>
      </div>
    </section>
  );
}
