import { cn } from "@/lib/utils";
import type { FileKind } from "./types";

/** VS Code "Seti"-style file badges, so the explorer reads like a real editor. */
const badges: Record<FileKind, { label: string; className: string }> = {
  md: { label: "M↓", className: "text-sky-500 dark:text-sky-400" },
  ts: { label: "TS", className: "text-blue-600 dark:text-blue-400" },
  json: { label: "{}", className: "text-amber-500 dark:text-amber-300" },
  yml: { label: "yml", className: "text-violet-500 dark:text-violet-400" },
  sh: { label: "$_", className: "text-emerald-600 dark:text-emerald-400" },
  pdf: { label: "PDF", className: "text-rose-500 dark:text-rose-400" },
};

export function FileIcon({ kind, className }: { kind: FileKind; className?: string }) {
  const badge = badges[kind];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex w-6 shrink-0 justify-center font-mono text-[0.6rem] leading-none font-bold tracking-tight",
        badge.className,
        className,
      )}
    >
      {badge.label}
    </span>
  );
}
