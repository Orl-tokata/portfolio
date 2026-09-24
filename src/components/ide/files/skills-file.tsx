import { TechIcon, techColor } from "@/components/icons/tech-icon";
import { engineeringPractices, skillCategories } from "@/data/skills";
import { CodeLine, FileHeading, Prop, Punct, Str } from "../code";

export function SkillsFile() {
  return (
    <article aria-labelledby="skills-title">
      <FileHeading
        id="skills"
        comment="// skills.json — tools I use to ship and run production systems"
        title="A full-stack toolkit, chosen for reliability."
        subtitle="Experience is shown through projects and results — so no skill percentages here."
      />

      <div className="rounded-xl border border-border bg-ide-panel/60 p-5 sm:p-6">
        <CodeLine index={1}>
          <Punct>{"{"}</Punct>
        </CodeLine>

        {skillCategories.map((category, index) => (
          <section
            key={category.title}
            aria-label={category.title}
            className="animate-file-open py-2 pl-4 sm:pl-6"
            style={{ animationDelay: `${0.1 + index * 0.08}s` }}
          >
            <CodeLine>
              <Prop>&quot;{category.title.toLowerCase()}&quot;</Prop>
              <Punct>: [</Punct>
              <span className="ml-3 text-syn-comment italic">{"// "}{category.description}</span>
            </CodeLine>
            <ul className="my-3 flex flex-wrap gap-2.5 pl-4 sm:pl-6">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <span
                    style={{ "--brand": techColor(skill.icon) } as React.CSSProperties}
                    className="group/chip inline-flex items-center gap-2.5 rounded-lg border border-border bg-ide-editor px-3 py-2 text-sm text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--brand)_45%,transparent)] hover:shadow-[0_8px_24px_-12px_var(--brand)]"
                  >
                    <TechIcon
                      icon={skill.icon}
                      className="size-4 text-muted transition-[color,transform] duration-200 group-hover/chip:scale-110 group-hover/chip:text-[var(--brand)]"
                    />
                    <Str className="text-foreground">{skill.name}</Str>
                  </span>
                </li>
              ))}
            </ul>
            <CodeLine>
              <Punct>],</Punct>
            </CodeLine>
          </section>
        ))}

        <section
          aria-label="Architecture and engineering practices"
          className="animate-file-open py-2 pl-4 sm:pl-6"
          style={{ animationDelay: `${0.1 + skillCategories.length * 0.08}s` }}
        >
          <CodeLine>
            <Prop>&quot;engineering&quot;</Prop>
            <Punct>{": {"}</Punct>
          </CodeLine>
          <dl className="my-2 grid gap-x-6 gap-y-1 pl-4 sm:grid-cols-2 sm:pl-6">
            {engineeringPractices.map((practice) => (
              <div key={practice.name} className="font-mono text-[0.8rem] leading-6">
                <dt className="inline text-syn-prop">&quot;{practice.name}&quot;</dt>
                <Punct>: </Punct>
                <dd className="inline font-sans text-sm text-muted">{practice.description}</dd>
              </div>
            ))}
          </dl>
          <CodeLine>
            <Punct>{"}"}</Punct>
          </CodeLine>
        </section>

        <CodeLine>
          <Punct>{"}"}</Punct>
        </CodeLine>
      </div>
    </article>
  );
}
