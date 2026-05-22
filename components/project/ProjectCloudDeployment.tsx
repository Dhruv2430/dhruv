import { Box, Server, Database, Globe, Network, ListTodo } from "lucide-react";
import { ProjectData } from "@/lib/projectsData";

export default function ProjectCloudDeployment({ project }: { project: ProjectData }) {
  const isCodeReview = project.slug === "ai-code-review-platform";

  return (
    <section id="cloud" className="py-16 border-b border-[var(--color-border)]">
      <div className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-[var(--color-foreground)]">Cloud Deployment</h2>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
          {isCodeReview 
            ? "Deployed on AWS ECS Fargate using Docker containers, BullMQ with Redis ElastiCache, and load balancers to handle webhooks asynchronously."
            : "Deployed on AWS with auto-scaling, CDN, and monitoring for high availability and performance."}
        </p>
      </div>

      <div className="bg-[var(--color-surface)]/10 border border-[var(--color-border)] rounded-3xl p-8 overflow-x-auto">
        <div className="min-w-[600px] flex items-center justify-between relative py-4">
           {/* AWS Logo Placeholder */}
           <div className="absolute top-0 left-0 font-bold text-xl tracking-tighter text-[#FF9900]">AWS</div>

           {!isCodeReview ? (
             /* SaaS Workflow Platform nodes */
             <>
               {/* Nodes */}
               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <Box size={28} className="text-[#569A31]" />
                 </div>
                 <span className="text-xs font-semibold">S3</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">Static Files</span>
               </div>

               <div className="h-[2px] flex-1 bg-[var(--color-border)] mx-4 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-[var(--color-border)] rotate-45"></div>
               </div>

               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <Globe size={28} className="text-[#D13212]" />
                 </div>
                 <span className="text-xs font-semibold">CloudFront</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">CDN</span>
               </div>

               <div className="h-[2px] flex-1 bg-[var(--color-border)] mx-4 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-[var(--color-border)] rotate-45"></div>
               </div>

               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <Server size={28} className="text-[#FF9900]" />
                 </div>
                 <span className="text-xs font-semibold">EC2</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">App Server</span>
               </div>

               <div className="h-[2px] flex-1 bg-[var(--color-border)] mx-4 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-[var(--color-border)] rotate-45"></div>
               </div>

               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <Database size={28} className="text-[#4DB33D]" />
                 </div>
                 <span className="text-xs font-semibold">MongoDB</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">Atlas</span>
               </div>

               <div className="h-[2px] flex-1 bg-[var(--color-border)] mx-4 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-[var(--color-border)] rotate-45"></div>
               </div>

               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <Globe size={28} className="text-[#FF9900]" />
                 </div>
                 <span className="text-xs font-semibold">Route 53</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">DNS</span>
               </div>
             </>
           ) : (
             /* Code Review Platform nodes */
             <>
               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <Globe size={28} className="text-[#FF9900]" />
                 </div>
                 <span className="text-xs font-semibold">Route 53</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">DNS Router</span>
               </div>

               <div className="h-[2px] flex-1 bg-[var(--color-border)] mx-4 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-[var(--color-border)] rotate-45"></div>
               </div>

               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <Network size={28} className="text-[#00A0E0]" />
                 </div>
                 <span className="text-xs font-semibold">ALB</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">Load Balancer</span>
               </div>

               <div className="h-[2px] flex-1 bg-[var(--color-border)] mx-4 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-[var(--color-border)] rotate-45"></div>
               </div>

               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <Server size={28} className="text-[#FF9900]" />
                 </div>
                 <span className="text-xs font-semibold">ECS Fargate</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">Containerized App</span>
               </div>

               <div className="h-[2px] flex-1 bg-[var(--color-border)] mx-4 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-[var(--color-border)] rotate-45"></div>
               </div>

               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <ListTodo size={28} className="text-purple-500" />
                 </div>
                 <span className="text-xs font-semibold">Redis (BullMQ)</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">Task Queue</span>
               </div>

               <div className="h-[2px] flex-1 bg-[var(--color-border)] mx-4 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-[var(--color-border)] rotate-45"></div>
               </div>

               <div className="flex flex-col items-center gap-2 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center">
                    <Database size={28} className="text-[#4DB33D]" />
                 </div>
                 <span className="text-xs font-semibold">MongoDB Atlas</span>
                 <span className="text-[10px] text-[var(--color-text-muted)] text-center w-20">Database</span>
               </div>
             </>
           )}

        </div>
      </div>
    </section>
  );
}
