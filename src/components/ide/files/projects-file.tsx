import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { ProjectCard } from "@/components/sections/projects/project-card";
import { ProjectGrid } from "@/components/sections/projects/project-grid";
import { ProjectPreview } from "@/components/sections/projects/project-preview";
import { Tag } from "@/components/ui/tag";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { CodeLine, Comment, FileHeading, Prop, Punct, Str } from "../code";

export const projectFileId = (project: Project) => `project-${project.slug}`;

/** projects/index.md — filterable overview of every project. */
export function ProjectsIndexFile() {
  const items = projects.map((project) => ({
    slug: project.slug,
    category: project.category,
    card: <ProjectCard project={project} detailHref={`#${projectFileId(project)}`} />,
  }));

  return (
    <article aria-labelledby="projects-title">
      <FileHeading
        id="projects"
        comment="<!-- projects/index.md -->"
        title="Selected work."
        subtitle="Enterprise systems I've helped design, build and run. Client names and screenshots are withheld under NDA — the engineering story isn't. Open any file for details."
      />
      <ProjectGrid items={items} />
    </article>
  );
}

const categoryLabel: Record<Project["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Full Stack",
};

/** projects/<slug>.md — one project in detail. */
export function ProjectFile({ project }: { project: Project }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <article aria-labelledby={`${projectFileId(project)}-title`}>
      <FileHeading
        id={projectFileId(project)}
        comment={`<!-- projects/${project.slug}.md -->`}
        title={project.title}
        subtitle={project.description}
      />

      <div className="grid gap-8 xl:grid-cols-[1.2fr_1fr]">
        <div className="animate-file-open overflow-hidden rounded-xl border border-border shadow-card" style={{ animationDelay: "0.1s" }}>
          <div className="aspect-[16/10]">
            <ProjectPreview project={project} />
          </div>
        </div>

        <div className="animate-file-open space-y-6" style={{ animationDelay: "0.18s" }}>
          <div className="rounded-xl border border-border bg-ide-panel/60 p-5">
            <CodeLine>
              <Comment>---</Comment>
            </CodeLine>
            <dl>
              {(
                [
                  ["category", categoryLabel[project.category]],
                  ["role", project.role],
                ] as const
              ).map(([key, value]) => (
                <CodeLine key={key}>
                  <dt className="inline">
                    <Prop>{key}</Prop>
                    <Punct>:</Punct>{" "}
                  </dt>
                  <dd className="inline">
                    <Str>{value}</Str>
                  </dd>
                </CodeLine>
              ))}
            </dl>
            <CodeLine>
              <Comment>---</Comment>
            </CodeLine>
          </div>

          <section aria-label="Key contribution">
            <h3 className="font-mono text-sm text-foreground">
              <Punct>##</Punct> Key contribution
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.contribution}</p>
          </section>

          <section aria-label="Highlights">
            <h3 className="font-mono text-sm text-foreground">
              <Punct>##</Punct> Highlights
            </h3>
            <ul className="mt-2 space-y-1.5">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-sm text-muted">
                  <span aria-hidden className="font-mono text-syn-string">
                    - [x]
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <ul className="flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-border-strong hover:bg-ide-hover"
              >
                <GitHubIcon className="size-3.5" />
                Source
              </a>
            ) : null}
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background"
              >
                Live demo <ArrowUpRight aria-hidden className="size-3.5" />
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
      </div>

      <nav aria-label="Project files" className="mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-6 font-mono text-xs">
        {previous ? (
          <a href={`#${projectFileId(previous)}`} className="inline-flex items-center gap-2 text-muted hover:text-foreground">
            <ArrowLeft aria-hidden className="size-3.5" /> {previous.slug}.md
          </a>
        ) : (
          <a href="#projects" className="inline-flex items-center gap-2 text-muted hover:text-foreground">
            <ArrowLeft aria-hidden className="size-3.5" /> index.md
          </a>
        )}
        {next ? (
          <a href={`#${projectFileId(next)}`} className="inline-flex items-center gap-2 text-muted hover:text-foreground">
            {next.slug}.md <ArrowRight aria-hidden className="size-3.5" />
          </a>
        ) : null}
      </nav>
    </article>
  );
}
