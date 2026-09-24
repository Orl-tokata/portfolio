import { ArrowRight, BookMarked, GitFork, Star } from "lucide-react";
import type { GitHubRepo, LanguageShare } from "@/types";

export function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 font-mono text-[0.7rem] text-subtle">
        {icon}
        {label}
      </dt>
      <dd className="mt-0.5 font-display text-lg font-semibold text-foreground">{value}</dd>
    </div>
  );
}

export function LanguageBar({ languages }: { languages: LanguageShare[] }) {
  return (
    <>
      <div className="mt-6 flex h-2.5 overflow-hidden rounded-full bg-surface-muted" aria-hidden>
        {languages.map((language) => (
          <span key={language.name} style={{ width: `${language.percent}%`, backgroundColor: language.color }} />
        ))}
      </div>
      <ul className="mt-6 space-y-3">
        {languages.map((language) => (
          <li key={language.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2.5 text-foreground">
              <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: language.color }} />
              {language.name}
            </span>
            <span className="font-mono text-xs text-subtle">{language.percent}%</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function RepoCard({ repo, languages }: { repo: GitHubRepo; languages: LanguageShare[] }) {
  const color = languages.find((language) => language.name === repo.language)?.color ?? "var(--subtle)";
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group gradient-border flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-surface"
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <BookMarked aria-hidden className="size-4 text-subtle" />
        <span className="truncate">{repo.name}</span>
        <ArrowRight
          aria-hidden
          className="ml-auto size-4 -translate-x-1 text-subtle opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
        />
      </span>
      <span className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{repo.description ?? "No description provided."}</span>
      <span className="mt-4 flex items-center gap-4 font-mono text-[0.7rem] text-subtle">
        {repo.language ? (
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: color }} />
            {repo.language}
          </span>
        ) : null}
        <span className="flex items-center gap-1">
          <Star aria-hidden className="size-3" />
          <span className="sr-only">Stars:</span>
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork aria-hidden className="size-3" />
          <span className="sr-only">Forks:</span>
          {repo.forks}
        </span>
      </span>
    </a>
  );
}
