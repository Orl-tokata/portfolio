"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Layered hero backdrop: drifting grid, parallax glow orbs and a radial glow
 * that follows the mouse. Pointer tracking writes CSS variables inside a
 * requestAnimationFrame, so it costs no React renders.
 */
export function HeroBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const orbY = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : 160]);
  const orbYSlow = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : 80]);

  useEffect(() => {
    const node = glowRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!node || reduceMotion || !finePointer) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--mx", `${event.clientX}px`);
        node.style.setProperty("--my", `${event.clientY + window.scrollY}px`);
        node.style.opacity = "1";
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduceMotion]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="mask-radial absolute inset-0 overflow-hidden">
        <div className="bg-grid absolute -top-16 -left-16 h-[calc(100%+8rem)] w-[calc(100%+8rem)] will-change-transform motion-safe:animate-grid-drift" />
      </div>

      {/* Parallax (Motion transform) and float (CSS keyframes) live on separate elements so they don't override each other. */}
      <m.div style={{ y: orbY }} className="absolute -top-40 left-1/2 -translate-x-[70%]">
        <div className="h-[36rem] w-[36rem] rounded-full bg-accent-blue/20 blur-[120px] motion-safe:animate-float" />
      </m.div>
      <m.div style={{ y: orbYSlow }} className="absolute top-20 right-[-10rem]">
        <div className="h-[28rem] w-[28rem] rounded-full bg-accent-violet/20 blur-[120px] motion-safe:animate-float [animation-delay:-3s]" />
      </m.div>
      <div className="absolute bottom-0 left-[10%] h-64 w-64 rounded-full bg-accent-cyan/10 blur-[100px]" />

      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background: "radial-gradient(520px circle at var(--mx, 50%) var(--my, 30%), var(--glow), transparent 70%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
