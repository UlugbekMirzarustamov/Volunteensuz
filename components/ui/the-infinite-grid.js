"use client";

import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

// Reusable animated background: an infinitely-scrolling grid with a
// cursor-following radial mask that reveals a brand-colored grid layer,
// plus soft brand orbs. Renders as an absolute-positioned background —
// place real content in a `relative z-10` layer on top.
export function InfiniteGrid({ className, revealRadius = 300, fadeBottom = false }) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  useAnimationFrame(() => {
    offsetX.set((offsetX.get() + 0.5) % 40);
    offsetY.set((offsetY.get() + 0.5) % 40);
  });

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const maskImage = useMotionTemplate`radial-gradient(${revealRadius}px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div onMouseMove={handleMouseMove} className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Faint base grid (theme-aware via text-fg) */}
      <div className="absolute inset-0 opacity-[0.07] text-fg">
        <GridPattern offsetX={offsetX} offsetY={offsetY} />
      </div>

      {/* Brand-colored grid revealed under the cursor */}
      <motion.div
        className="absolute inset-0 opacity-60 text-blue-500"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={offsetX} offsetY={offsetY} />
      </motion.div>

      {/* Soft brand orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-15%] top-[-20%] w-[45%] h-[45%] rounded-full blur-[120px]" style={{ background: "color-mix(in srgb, #2563EB 32%, transparent)" }} />
        <div className="absolute left-[-15%] bottom-[-25%] w-[45%] h-[45%] rounded-full blur-[120px]" style={{ background: "color-mix(in srgb, #06B6D4 28%, transparent)" }} />
        <div className="absolute left-[42%] top-[-12%] w-[26%] h-[26%] rounded-full blur-[100px]" style={{ background: "color-mix(in srgb, #7C3AED 22%, transparent)" }} />
      </div>

      {/* Bottom fade — dissolves grid lines + glow into the page background
          (var(--bg)) so there's no hard seam with the next section. */}
      {fadeBottom && (
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: "45%", background: "linear-gradient(to bottom, transparent, var(--bg))" }}
        />
      )}
    </div>
  );
}

function GridPattern({ offsetX, offsetY }) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern id="infinite-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse" x={offsetX} y={offsetY}>
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#infinite-grid-pattern)" />
    </svg>
  );
}

export default InfiniteGrid;
