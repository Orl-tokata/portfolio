import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const accentVar: Record<Project["accent"], string> = {
  blue: "var(--accent-blue)",
  cyan: "var(--accent-cyan)",
  violet: "var(--accent-violet)",
  emerald: "var(--accent-emerald)",
};

/**
 * Screenshot placeholder rendered as lightweight HTML "product UI" artwork.
 * Enterprise work is under NDA, so these abstract previews stand in for real
 * screenshots. Swap for <Image> when public screenshots are available.
 */
export function ProjectPreview({ project }: { project: Project }) {
  const accent = accentVar[project.accent];
  return (
    <div
      aria-hidden
      style={{ "--card-accent": accent } as React.CSSProperties}
      className="relative h-full w-full overflow-hidden bg-surface-muted"
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--card-accent) 28%, transparent), transparent 60%)",
        }}
      />
      <div className="absolute inset-x-6 top-6 bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-border-strong bg-background/85 shadow-card backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="ml-3 h-2 w-24 rounded-full bg-border" />
        </div>
        <div className="p-4">{previews[project.preview]}</div>
      </div>
    </div>
  );
}

const Bar = ({ className }: { className?: string }) => <div className={cn("h-2 rounded-full bg-border", className)} />;

const previews: Record<Project["preview"], React.ReactNode> = {
  dashboard: (
    <div className="grid grid-cols-[4rem_1fr] gap-4">
      <div className="space-y-2">
        <Bar className="w-10 bg-[var(--card-accent)] opacity-70" />
        <Bar />
        <Bar className="w-12" />
        <Bar className="w-9" />
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-border p-2">
              <Bar className="w-8" />
              <div className="mt-2 h-3 w-12 rounded bg-[var(--card-accent)] opacity-60" />
            </div>
          ))}
        </div>
        <div className="flex h-20 items-end gap-1.5 rounded-lg border border-border p-2">
          {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-[var(--card-accent)] opacity-50" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  ),
  integration: (
    <div className="flex items-center justify-between gap-3 pt-3">
      <div className="space-y-2">
        {["ERP", "Web"].map((label) => (
          <div key={label} className="rounded-lg border border-border px-3 py-2 font-mono text-[0.6rem] text-muted">
            {label}
          </div>
        ))}
      </div>
      <div className="relative h-px flex-1 bg-border-strong">
        <span className="absolute -top-1 left-1/3 size-2 rounded-full bg-[var(--card-accent)]" />
      </div>
      <div className="grid size-14 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--card-accent)_50%,transparent)] font-mono text-[0.6rem] text-foreground">
        API
      </div>
      <div className="relative h-px flex-1 bg-border-strong">
        <span className="absolute -top-1 right-1/3 size-2 rounded-full bg-[var(--card-accent)]" />
      </div>
      <div className="space-y-2">
        {["Bank A", "Bank B", "Bank C"].map((label) => (
          <div key={label} className="rounded-lg border border-border px-3 py-1.5 font-mono text-[0.6rem] text-muted">
            {label}
          </div>
        ))}
      </div>
    </div>
  ),
  migration: (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 pt-2">
      <div className="space-y-1.5 rounded-lg border border-dashed border-border-strong p-3 font-mono text-[0.6rem] text-subtle">
        <p>&lt;%@ page %&gt;</p>
        <Bar className="w-3/4" />
        <Bar className="w-1/2" />
        <Bar className="w-2/3" />
      </div>
      <span className="font-mono text-sm text-[var(--card-accent)]">→</span>
      <div className="space-y-1.5 rounded-lg border border-[color-mix(in_oklab,var(--card-accent)_50%,transparent)] p-3 font-mono text-[0.6rem] text-foreground">
        <p>&lt;Screen /&gt;</p>
        <Bar className="w-3/4 bg-[var(--card-accent)] opacity-50" />
        <Bar className="w-1/2 bg-[var(--card-accent)] opacity-40" />
        <Bar className="w-2/3 bg-[var(--card-accent)] opacity-30" />
      </div>
    </div>
  ),
  pipeline: (
    <div className="space-y-2.5 pt-1">
      {[
        ["fetch", "ok"],
        ["validate", "ok"],
        ["retry", "2/3"],
        ["export", "ok"],
      ].map(([step, state]) => (
        <div key={step} className="flex items-center gap-3 rounded-lg border border-border px-3 py-1.5">
          <span className="size-1.5 rounded-full bg-[var(--card-accent)]" />
          <span className="font-mono text-[0.65rem] text-foreground">{step}</span>
          <Bar className="flex-1" />
          <span className="font-mono text-[0.6rem] text-subtle">{state}</span>
        </div>
      ))}
    </div>
  ),
};
