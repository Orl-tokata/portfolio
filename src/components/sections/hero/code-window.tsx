"use client";

import { AnimatePresence, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useMemo, useState } from "react";
import { codeSamples } from "@/data/code-samples";
import { tokenizeLine, type TokenType } from "@/lib/highlight";
import { cn } from "@/lib/utils";

const tokenColors: Record<TokenType, string> = {
  keyword: "text-[#c792ea]",
  string: "text-[#a5e3a0]",
  annotation: "text-[#f7c873]",
  type: "text-[#7fd4ff]",
  comment: "text-[#5c6781] italic",
  number: "text-[#f78c6c]",
  function: "text-[#82aaff]",
  plain: "text-[#d6deeb]",
};

const AUTO_ADVANCE_MS = 7000;

/** Floating editor window that tilts toward the mouse and cycles code samples. */
export function CodeWindow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const sample = codeSamples[index];
  const lines = useMemo(() => sample.code.split("\n").map(tokenizeLine), [sample]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 60, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), spring);
  const rotateX = useSpring(useTransform(my, [-1, 1], [6, -6]), spring);
  const x = useSpring(useTransform(mx, [-1, 1], [-10, 10]), spring);
  const y = useSpring(useTransform(my, [-1, 1], [-8, 8]), spring);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      mx.set((event.clientX / window.innerWidth) * 2 - 1);
      my.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduceMotion]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % codeSamples.length), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduceMotion]);

  return (
    <m.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative [perspective:1200px]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <m.div style={{ rotateX, rotateY, x, y }} className="relative">
        <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent-gradient opacity-20 blur-3xl" />

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-code/95 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/5 backdrop-blur">
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-3 rounded-full bg-[#ff5f57]/90" />
              <span className="size-3 rounded-full bg-[#febc2e]/90" />
              <span className="size-3 rounded-full bg-[#28c840]/90" />
            </div>
            <div role="tablist" aria-label="Code samples" className="flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {codeSamples.map((item, i) => (
                <button
                  key={item.file}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "shrink-0 rounded-md px-2.5 py-1 font-mono text-[0.7rem] transition-colors",
                    i === index ? "bg-white/[0.08] text-white" : "text-white/45 hover:text-white/80",
                  )}
                >
                  {item.file}
                </button>
              ))}
            </div>
          </div>

          <div role="tabpanel" aria-label={sample.file} className="relative h-[19.5rem] overflow-hidden px-1 py-4">
            <AnimatePresence mode="wait" initial={false}>
              <m.pre
                key={sample.file}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[0.8rem] leading-6"
              >
                <code>
                  {lines.map((tokens, lineIndex) => (
                    <m.span
                      key={lineIndex}
                      className="flex"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + lineIndex * 0.045, duration: 0.35 }}
                    >
                      <span aria-hidden className="w-10 shrink-0 select-none pr-4 text-right text-white/20">
                        {lineIndex + 1}
                      </span>
                      <span className="whitespace-pre">
                        {tokens.map((token, tokenIndex) => (
                          <span key={tokenIndex} className={tokenColors[token.type]}>
                            {token.text}
                          </span>
                        ))}
                        {lineIndex === lines.length - 1 ? (
                          <span aria-hidden className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-accent-cyan motion-safe:animate-blink" />
                        ) : null}
                      </span>
                    </m.span>
                  ))}
                </code>
              </m.pre>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2 font-mono text-[0.65rem] text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
              build passing
            </span>
            <span>{sample.language.toUpperCase()} · UTF-8</span>
          </div>
        </div>

        <FloatingChip className="-left-10 top-16" delay={0.9} label="Spring Boot 3" dot="bg-emerald-400" />
        <FloatingChip className="-right-6 top-1/2" delay={1.05} label="Next.js 16" dot="bg-white" />
        <FloatingChip className="-bottom-11 left-20" delay={1.2} label="PostgreSQL" dot="bg-sky-400" />
      </m.div>
    </m.div>
  );
}

function FloatingChip({ className, delay, label, dot }: { className: string; delay: number; label: string; dot: string }) {
  return (
    <m.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("absolute", className)}
    >
      <div className="flex items-center gap-2 rounded-full border border-border-strong bg-background-elevated/80 px-3 py-1.5 font-mono text-[0.7rem] text-foreground shadow-card backdrop-blur-md motion-safe:animate-float">
        <span className={cn("size-1.5 rounded-full", dot)} />
        {label}
      </div>
    </m.div>
  );
}
