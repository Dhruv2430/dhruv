"use client";

import { useRef, useState, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import {
  House,
  User,
  Briefcase,
  FolderCode,
  Cpu,
  Globe,
  GraduationCap,
  Mail,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", icon: House },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderCode },
  { name: "Skills", href: "#skills", icon: Cpu },
  { name: "Community", href: "#contributions", icon: Globe },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Contact", href: "#contact", icon: Mail },
];

// macOS-like spring config — fast response, minimal wobble
const DOCK_SPRING = { mass: 0.1, stiffness: 200, damping: 15 };
const MAGNIFICATION_RANGE = 200; // px radius of magnification effect
const BASE_SIZE = 48;
const MAX_SIZE = 76;

function DockItem({
  item,
  mouseX,
  isActive,
}: {
  item: (typeof navItems)[0];
  mouseX: MotionValue<number>;
  isActive: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Distance from mouse to icon center
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Size magnification — smooth sinusoidal-like curve
  const sizeSync = useTransform(
    distance,
    [-MAGNIFICATION_RANGE, -MAGNIFICATION_RANGE / 2, 0, MAGNIFICATION_RANGE / 2, MAGNIFICATION_RANGE],
    [BASE_SIZE, BASE_SIZE + 8, MAX_SIZE, BASE_SIZE + 8, BASE_SIZE]
  );
  const size = useSpring(sizeSync, DOCK_SPRING);

  // Y-axis lift — items rise as they magnify
  const ySync = useTransform(
    distance,
    [-MAGNIFICATION_RANGE, -MAGNIFICATION_RANGE / 2, 0, MAGNIFICATION_RANGE / 2, MAGNIFICATION_RANGE],
    [0, -3, -12, -3, 0]
  );
  const y = useSpring(ySync, DOCK_SPRING);

  return (
    <motion.a
      ref={ref}
      href={item.href}
      style={{ width: size, height: size, y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute -top-10 px-3 py-1.5 rounded-lg text-[11px] font-medium font-sans text-white bg-[#1c1c1e] shadow-[0_4px_12px_rgba(0,0,0,0.4)] whitespace-nowrap pointer-events-none z-50"
          >
            {item.name}
            <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-[#1c1c1e] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon background */}
      <div
        className={`
          flex items-center justify-center w-full h-full rounded-[14px] transition-all duration-200 relative
          ${isActive
            ? "bg-primary/15"
            : isHovered
              ? "bg-foreground/[0.06]"
              : "bg-transparent"
          }
        `}
      >
        <item.icon
          className={`transition-colors duration-200 ${
            isActive
              ? "text-primary"
              : isHovered
                ? "text-foreground/80"
                : "text-foreground/45"
          }`}
          size={20}
          strokeWidth={isActive ? 2.2 : 1.7}
        />

        {/* Active dot */}
        {isActive && (
          <motion.div
            layoutId="dockDot"
            className="absolute -bottom-[3px] w-[4px] h-[4px] rounded-full bg-primary"
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          />
        )}
      </div>
    </motion.a>
  );
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const mouseX = useMotionValue(Infinity);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 40) {
      setHidden(diff > 0 && y > 150);
      lastYRef.current = y;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((i) => i.href.substring(1));
      let current = sections[0];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 3) {
          current = sections[i];
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      animate={hidden ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <motion.nav
        onMouseMove={(e: ReactMouseEvent) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-[3px] px-2.5 pb-[7px] pt-[7px] rounded-2xl bg-white/65 backdrop-blur-2xl backdrop-saturate-[1.8] border border-white/30 shadow-[0_2px_20px_rgba(0,0,0,0.08),0_8px_40px_rgba(0,0,0,0.06)]"
      >
        {navItems.map((item) => (
          <DockItem
            key={item.name}
            item={item}
            mouseX={mouseX}
            isActive={activeSection === item.href.substring(1)}
          />
        ))}
      </motion.nav>
    </motion.div>
  );
}
