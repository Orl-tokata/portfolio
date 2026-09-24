import { profile } from "@/data/profile";

const lines = [
  "[  OK  ] Mounting /home/orl/portfolio",
  "[  OK  ] Loading java.spring-boot ✓ next.js ✓ postgresql ✓",
  "[  OK  ] Compiling experience.ts, skills.json, projects/",
  "[  OK  ] Starting developer environment",
];

/**
 * CSS-only boot splash: it fades itself out, so content never waits on
 * JavaScript. Skipped for returning visitors and for reduced motion.
 */
export function BootScreen() {
  return (
    <div
      aria-hidden
      className="boot-overlay pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-ide-editor px-6"
    >
      <div className="w-full max-w-md font-mono text-xs">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-accent-gradient text-sm font-bold text-white shadow-[0_0_30px_-6px_var(--accent-blue)]">
            {profile.initials}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{profile.name.toLowerCase().replace(" ", "-")}.dev</p>
            <p className="text-subtle">{profile.role}</p>
          </div>
        </div>
        {lines.map((line, index) => (
          <p key={line} className="boot-line leading-6 text-muted" style={{ animationDelay: `${0.15 + index * 0.3}s` }}>
            <span className="text-accent-emerald">{line.slice(0, 8)}</span>
            {line.slice(8)}
          </p>
        ))}
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-ide-hover">
          <div className="boot-bar h-full bg-accent-gradient" />
        </div>
      </div>
    </div>
  );
}
