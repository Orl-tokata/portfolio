import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface-muted/60 px-2 py-0.5 font-mono text-[0.7rem] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
