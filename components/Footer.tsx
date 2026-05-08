import { Code2, Briefcase, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-32 pb-12 rounded-t-[3rem] -mt-10 relative z-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Massive Marquee/Typography Close */}
        <div className="w-full overflow-hidden mb-24 relative flex justify-center text-center">
           <h2 className="font-display text-[12vw] leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-background/5">
             LET&apos;S BUILD SOMETHING
             <br />
             <span className="text-background italic">EXCEPTIONAL</span>
           </h2>
           {/* Absolute positioning for screen readers / cleaner structural text */}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 border-t border-background/20 pt-12">
          <div className="text-center md:text-left">
            <a href="#home" className="text-3xl font-display tracking-tight text-background">
              DP<span className="text-primary">.</span>
            </a>
            <p className="text-background/60 text-sm mt-2 font-mono uppercase tracking-widest">
              Software Engineer &bull; 2024
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="w-14 h-14 rounded-full border border-background/20 flex items-center justify-center text-background hover:bg-primary hover:border-primary transition-all duration-300">
              <Code2 size={20} />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-background/20 flex items-center justify-center text-background hover:bg-primary hover:border-primary transition-all duration-300">
              <Briefcase size={20} />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-background/20 flex items-center justify-center text-background hover:bg-primary hover:border-primary transition-all duration-300">
              <Globe size={20} />
            </a>
          </div>
        </div>
        
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono tracking-widest text-background/40 mt-16 pt-8 border-t border-background/10 uppercase">
          <p>&copy; {new Date().getFullYear()} DHRUV PANCHAL. ALL RIGHTS RESERVED.</p>
          <p>EDITORIAL DESIGN SYSTEM</p>
        </div>
      </div>
    </footer>
  );
}
