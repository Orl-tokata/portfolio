"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";

/** Vertical line that fills as the timeline scrolls through the viewport. */
export function TimelineProgress({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-border-strong md:left-[calc(12rem+7px)]" />
      <m.div
        aria-hidden
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-violet md:left-[calc(12rem+7px)]"
      />
      {children}
    </div>
  );
}
