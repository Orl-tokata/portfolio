import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { SpotlightCard } from "@/components/animations/spotlight-card";
import { TechIcon, techColor } from "@/components/icons/tech-icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { engineeringPractices, skillCategories } from "@/data/skills";
import type { Skill } from "@/types";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        eyebrow="03 — Skills"
        title="A full-stack toolkit, chosen for reliability."
        description="Tools I use every day to ship and operate production systems — from the database schema to the pixels on screen."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delay={index * 0.06}>
            <SpotlightCard className="p-6 sm:p-7">
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-semibold text-foreground">{category.title}</h3>
                <span className="font-mono text-xs text-subtle">
                  {String(category.skills.length).padStart(2, "0")} tools
                </span>
              </div>
              <p className="-mt-4 mb-6 text-sm text-muted">{category.description}</p>
              <Stagger as="ul" className="flex flex-wrap gap-2.5" stagger={0.04}>
                {category.skills.map((skill) => (
                  <StaggerItem as="li" key={skill.name}>
                    <TechChip skill={skill} />
                  </StaggerItem>
                ))}
              </Stagger>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-5">
        <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-7">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-foreground">Architecture &amp; Engineering</h3>
            <span className="font-mono text-xs text-subtle">practices, not percentages</span>
          </div>
          <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringPractices.map((practice) => (
              <li key={practice.name} className="flex gap-3">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-emerald" />
                <span>
                  <span className="block text-sm font-medium text-foreground">{practice.name}</span>
                  <span className="block text-xs leading-relaxed text-subtle">{practice.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

function TechChip({ skill }: { skill: Skill }) {
  return (
    <span
      style={{ "--brand": techColor(skill.icon) } as React.CSSProperties}
      className="group/chip inline-flex items-center gap-2.5 rounded-xl border border-border bg-surface-muted/50 px-3.5 py-2.5 text-sm text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--brand)_45%,transparent)] hover:shadow-[0_8px_24px_-12px_var(--brand)]"
    >
      <TechIcon
        icon={skill.icon}
        className="size-[1.1rem] text-muted transition-[color,transform] duration-200 group-hover/chip:scale-110 group-hover/chip:text-[var(--brand)]"
      />
      {skill.name}
    </span>
  );
}
