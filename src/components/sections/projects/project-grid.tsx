"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import { projectFilters } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

export interface ProjectGridItem {
  slug: string;
  category: ProjectCategory;
  /** Server-rendered card, so card markup never ships as client JS. */
  card: React.ReactNode;
}

type Filter = ProjectCategory | "all";

export function ProjectGrid({ items }: { items: ProjectGridItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {projectFilters.map((option) => {
          const active = option.value === filter;
          const count =
            option.value === "all" ? items.length : items.filter((item) => item.category === option.value).length;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.value)}
              className={cn(
                "relative isolate rounded-full border px-4 py-2 text-sm transition-colors active:scale-[0.97]",
                active
                  ? "border-transparent text-background"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {active ? (
                <m.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              ) : null}
              {option.label}
              <span className={cn("ml-1.5 font-mono text-xs", active ? "text-background/60" : "text-subtle")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} project{visible.length === 1 ? "" : "s"}
      </p>

      <m.ul layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <m.li
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.card}
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </>
  );
}
