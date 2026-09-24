import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/types";
import { ProjectPreview } from "./project-preview";

const categoryLabel: Record<Project["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Full Stack",
};

export function ProjectCard({ project, detailHref }: { project: Project; detailHref?: string }) {
  return (
    <article className="group gradient-border relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <ProjectPreview project={project} />
        </div>

        {/* Hover overlay with extra detail. Always visible to keyboard & screen readers via the list below. */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/85 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-accent-cyan">Highlights</p>
          <ul className="space-y-1">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2 text-sm text-foreground">
                <span aria-hidden className="size-1 rounded-full bg-accent-cyan" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <span className="absolute top-3 left-3 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-[0.65rem] text-muted backdrop-blur">
          {categoryLabel[project.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-foreground">{project.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.description}</p>

        <dl className="mt-5 grid gap-3 border-t border-border pt-5 text-sm">
          <div className="grid grid-cols-[6.5rem_1fr] gap-2">
            <dt className="font-mono text-xs text-subtle">Role</dt>
            <dd className="text-foreground">{project.role}</dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr] gap-2">
            <dt className="font-mono text-xs text-subtle">Contribution</dt>
            <dd className="text-muted">{project.contribution}</dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {detailHref ? (
            <a
              href={detailHref}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent-cyan/50 hover:bg-surface-muted"
            >
              open {project.slug}.md
              <ArrowRight aria-hidden className="size-3.5" />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-muted"
            >
              <GitHubIcon className="size-3.5" />
              Source
              <span className="sr-only"> for {project.title}</span>
            </a>
          ) : null}
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Live demo
              <ArrowUpRight aria-hidden className="size-3.5" />
              <span className="sr-only"> of {project.title}</span>
            </a>
          ) : null}
          {project.confidential ? (
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-subtle">
              <Lock aria-hidden className="size-3" />
              Enterprise project · details under NDA
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
