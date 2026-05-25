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
  Link2,
} from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const MotionLink = motion.create(NextLink);

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  isRoute?: boolean;
};

const sectionItems: NavItem[] = [
  { name: "Home", href: "#home", icon: House },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderCode },
  { name: "Skills", href: "#skills", icon: Cpu },
  { name: "Community", href: "#contributions", icon: Globe },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Contact", href: "#contact", icon: Mail },
];

const routeItems: NavItem[] = [
  { name: "Links", href: "/linktree", icon: Link2, isRoute: true },
];

// macOS-like spring config — fast response, minimal wobble
const DOCK_SPRING = { mass: 0.1, stiffness: 200, damping: 15 };

// Responsive size breakpoints
type DockSizeConfig = {
  baseSize: number;
  maxSize: number;
  magnificationRange: number;
  iconSize: number;
  gap: number;
  px: number;
  py: number;
  liftY: number;
  borderRadius: number;
};

function getDockConfig(width: number): DockSizeConfig {
  if (width < 380) {
    // Very small phones (SE, Mini)
    return { baseSize: 32, maxSize: 32, magnificationRange: 0, iconSize: 15, gap: 1, px: 6, py: 5, liftY: 0, borderRadius: 14 };
  }
  if (width < 480) {
    // Standard phones
    return { baseSize: 36, maxSize: 36, magnificationRange: 0, iconSize: 16, gap: 1, px: 8, py: 5, liftY: 0, borderRadius: 16 };
  }
  if (width < 640) {
    // Large phones / phablets
    return { baseSize: 40, maxSize: 40, magnificationRange: 0, iconSize: 18, gap: 2, px: 8, py: 6, liftY: 0, borderRadius: 16 };
  }
  if (width < 768) {
    // Small tablets
    return { baseSize: 42, maxSize: 56, magnificationRange: 150, iconSize: 18, gap: 2, px: 8, py: 6, liftY: -8, borderRadius: 16 };
  }
  if (width < 1024) {
    // Tablets
    return { baseSize: 44, maxSize: 64, magnificationRange: 170, iconSize: 19, gap: 3, px: 10, py: 7, liftY: -10, borderRadius: 18 };
  }
  // Desktop
  return { baseSize: 48, maxSize: 76, magnificationRange: 200, iconSize: 20, gap: 3, px: 10, py: 7, liftY: -12, borderRadius: 18 };
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return isTouch;
}

function useWindowWidth() {
  const [width, setWidth] = useState(1024); // SSR-safe default
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    const frame = requestAnimationFrame(handle);
    window.addEventListener("resize", handle, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handle);
    };
  }, []);
  return width;
}

function DockItem({
  item,
  mouseX,
  isActive,
  config,
  isTouch,
}: {
  item: NavItem;
  mouseX: MotionValue<number>;
  isActive: boolean;
  config: DockSizeConfig;
  isTouch: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const hasMagnification = config.magnificationRange > 0 && !isTouch;

  // Distance from mouse to icon center
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const range = config.magnificationRange;
  const halfRange = range / 2;

  // Size magnification — smooth sinusoidal-like curve
  const sizeSync = useTransform(
    distance,
    hasMagnification
      ? [-range, -halfRange, 0, halfRange, range]
      : [-1, 0, 1],
    hasMagnification
      ? [config.baseSize, config.baseSize + 8, config.maxSize, config.baseSize + 8, config.baseSize]
      : [config.baseSize, config.baseSize, config.baseSize]
  );
  const size = useSpring(sizeSync, DOCK_SPRING);

  // Y-axis lift — items rise as they magnify
  const ySync = useTransform(
    distance,
    hasMagnification
      ? [-range, -halfRange, 0, halfRange, range]
      : [-1, 0, 1],
    hasMagnification
      ? [0, -3, config.liftY, -3, 0]
      : [0, 0, 0]
  );
  const y = useSpring(ySync, DOCK_SPRING);

  const innerContent = (
    <>
      {/* Tooltip — desktop only */}
      {!isTouch && (
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
      )}

      {/* Icon background */}
      <div
        className={`
          flex items-center justify-center w-full h-full transition-all duration-200 relative
          ${isActive
            ? "bg-primary/15"
            : isHovered
              ? "bg-foreground/[0.06]"
              : "bg-transparent"
          }
        `}
        style={{ borderRadius: config.borderRadius }}
      >
        <item.icon
          className={`transition-colors duration-200 ${isActive
              ? "text-primary"
              : isHovered
                ? "text-foreground/80"
                : "text-foreground/45"
            }`}
          size={config.iconSize}
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
    </>
  );

  const pathname = usePathname();
  const isHome = pathname === "/";
  const targetHref = item.isRoute 
    ? item.href 
    : (isHome ? item.href : `/${item.href}`);

  const motionProps = {
    style: hasMagnification ? { width: size, height: size, y } : { width: config.baseSize, height: config.baseSize },
    onMouseEnter: () => !isTouch && setIsHovered(true),
    onMouseLeave: () => !isTouch && setIsHovered(false),
    className: "relative flex items-center justify-center shrink-0",
  };

  // Use Next.js Link for route items or when we are not on the homepage
  if (item.isRoute || !isHome) {
    return (
      <MotionLink href={targetHref} ref={ref} {...motionProps}>
        {innerContent}
      </MotionLink>
    );
  }

  return (
    <motion.a ref={ref} href={targetHref} {...motionProps}>
      {innerContent}
    </motion.a>
  );
}

// Dock divider — macOS-style thin vertical line
function DockDivider({ config }: { config: DockSizeConfig }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{ width: 8, height: config.baseSize }}
    >
      <div
        className="w-px bg-foreground/10 rounded-full"
        style={{ height: config.baseSize * 0.5 }}
      />
    </div>
  );
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const mouseX = useMotionValue(Infinity);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const isTouch = useIsTouchDevice();
  const windowWidth = useWindowWidth();
  const config = getDockConfig(windowWidth);
  const pathname = usePathname();

  // On the linktree page, don't track sections
  const isOnLinktree = pathname === "/linktree";

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 40) {
      setHidden(diff > 0 && y > 150);
      lastYRef.current = y;
    }
  });

  useEffect(() => {
    if (isOnLinktree) return;

    const handleScroll = () => {
      const sections = sectionItems.map((i) => i.href.substring(1));
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
  }, [isOnLinktree]);

  const getIsActive = (item: NavItem) => {
    if (item.isRoute) {
      return pathname === item.href;
    }
    if (isOnLinktree) return false;
    return activeSection === item.href.substring(1);
  };

  return (
    <motion.div
      animate={hidden ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-4 sm:bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      style={{ maxWidth: "calc(100vw - 24px)" }}
    >
      <motion.nav
        onMouseMove={(e: ReactMouseEvent) => {
          if (!isTouch) mouseX.set(e.clientX);
        }}
        onMouseLeave={() => {
          if (!isTouch) mouseX.set(Infinity);
        }}
        className="pointer-events-auto flex items-end rounded-2xl bg-white/65 backdrop-blur-2xl backdrop-saturate-[1.8] border border-white/30 shadow-[0_2px_20px_rgba(0,0,0,0.08),0_8px_40px_rgba(0,0,0,0.06)]"
        style={{
          gap: config.gap,
          paddingLeft: config.px,
          paddingRight: config.px,
          paddingTop: config.py,
          paddingBottom: config.py,
        }}
      >
        {/* Section nav items */}
        {sectionItems.map((item) => (
          <DockItem
            key={item.name}
            item={item}
            mouseX={mouseX}
            isActive={getIsActive(item)}
            config={config}
            isTouch={isTouch}
          />
        ))}

        {/* Divider */}
        <DockDivider config={config} />

        {/* Route items (Linktree) */}
        {routeItems.map((item) => (
          <DockItem
            key={item.name}
            item={item}
            mouseX={mouseX}
            isActive={getIsActive(item)}
            config={config}
            isTouch={isTouch}
          />
        ))}
      </motion.nav>
    </motion.div>
  );
}


