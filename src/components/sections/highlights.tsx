import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";
import { Section, SectionHeading } from "@/components/ui/section";
import { highlights } from "@/data/highlights";

export function Highlights() {
  return (
    <Section id="highlights" className="overflow-hidden">
      <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
      <SectionHeading
        id="highlights"
        eyebrow="05 — Engineering"
        title="What I bring to a team."
        description="The areas where I consistently add the most value — on greenfield products and on systems that have been running for years."
      />

      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {highlights.map((highlight, index) => (
          <StaggerItem as="li" key={highlight.title}>
            <Tilt max={4}>
              <div className="group gradient-border relative flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur transition-colors duration-300 hover:bg-surface">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-subtle transition-colors group-hover:text-accent-cyan">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-px w-8 origin-right scale-x-50 bg-accent-gradient opacity-50 transition-transform duration-500 group-hover:scale-x-100 group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-8 font-display text-base font-semibold leading-snug text-foreground">
                  {highlight.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{highlight.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {highlight.tags.map((tag) => (
                    <li key={tag} className="font-mono text-[0.65rem] text-subtle">
                      #{tag.toLowerCase().replace(/\s+/g, "-")}
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
