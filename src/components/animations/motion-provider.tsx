"use client";

import { domMax, LazyMotion, MotionConfig } from "motion/react";

/**
 * Loads Motion features once (LazyMotion keeps the per-component `m` import
 * tiny) and makes every animation honour the OS "reduce motion" setting.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
