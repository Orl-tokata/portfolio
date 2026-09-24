import { Tilt } from "@/components/animations/tilt";
import { highlights } from "@/data/highlights";
import { FileHeading } from "../code";

export function EngineeringFile() {
  return (
    <article aria-labelledby="engineering-title">
      <FileHeading
        id="engineering"
        comment="<!-- engineering.md -->"
        title="What I bring to a team."
        subtitle="The areas where I consistently add the most value — on greenfield products and on systems that have been running for years."
      />
      <ul className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {highlights.map((highlight, index) => (
          <li key={highlight.title} className="animate-file-open" style={{ animationDelay: `${0.08 + index * 0.05}s` }}>
            <Tilt max={4}>
              <div className="group gradient-border flex h-full flex-col rounded-xl border border-border bg-ide-panel/70 p-5 transition-colors hover:bg-ide-panel">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-subtle transition-colors group-hover:text-accent-cyan">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="text-syn-comment">
                    {"</>"}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-base font-semibold leading-snug text-foreground">{highlight.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{highlight.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {highlight.tags.map((tag) => (
                    <li key={tag} className="font-mono text-[0.65rem] text-syn-keyword">
                      #{tag.toLowerCase().replace(/\s+/g, "-")}
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </li>
        ))}
      </ul>
    </article>
  );
}
