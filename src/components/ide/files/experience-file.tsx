import { Tag } from "@/components/ui/tag";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { CodeLine, FileHeading, Kw, Prop, Punct, Str, Type } from "../code";

export function ExperienceFile() {
  return (
    <article aria-labelledby="experience-title">
      <FileHeading
        id="experience"
        comment="// experience.ts — where I've been building"
        title="Work experience"
        subtitle="From supporting customers on live systems to engineering the financial products they rely on."
      />

      <CodeLine index={2}>
        <Kw>export const</Kw> experience<Punct>:</Punct> <Type>Job</Type>
        <Punct>[] = [</Punct>
      </CodeLine>

      <ol className="relative my-4 space-y-8 pl-8 sm:pl-10">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top animate-[draw-y_1.2s_cubic-bezier(0.22,1,0.36,1)_0.2s_both] bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-violet sm:left-[11px]"
        />
        {experience.map((job, index) => (
          <li key={job.company} className="relative animate-file-open" style={{ animationDelay: `${0.15 + index * 0.12}s` }}>
            <span
              aria-hidden
              className={cn(
                "absolute top-5 -left-8 grid size-[15px] place-items-center rounded-full border bg-ide-editor sm:-left-10 sm:size-[23px]",
                job.current ? "border-accent-cyan" : "border-border-strong",
              )}
            >
              <span className={cn("size-[7px] rounded-full", job.current ? "bg-accent-cyan" : "bg-subtle")} />
            </span>

            <div className="gradient-border rounded-xl border border-border bg-ide-panel/70 p-5 transition-colors hover:bg-ide-panel sm:p-6">
              <div className="font-mono text-[0.8rem] leading-6">
                <Punct>{"{"}</Punct> <Prop>company</Prop>
                <Punct>:</Punct> <Str>&quot;{job.company}&quot;</Str>
                <Punct>,</Punct> <Prop>period</Prop>
                <Punct>:</Punct> <Str>&quot;{job.period}&quot;</Str>
                {job.current ? (
                  <>
                    <Punct>,</Punct> <Prop>current</Prop>
                    <Punct>:</Punct> <Kw>true</Kw>
                  </>
                ) : null}
              </div>

              <h3 className="mt-3 font-display text-xl font-semibold text-foreground">{job.role}</h3>
              <p className="mt-1 text-sm text-muted">
                <span className="font-medium text-accent-cyan">{job.company}</span>
                {job.department ? <> · {job.department}</> : null} · {job.location}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{job.summary}</p>

              <ul className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-x-6">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-0.5 font-mono text-syn-punct">›</span>
                    {item}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
                {job.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
              <div className="mt-3 font-mono text-[0.8rem] text-syn-punct">{"},"}</div>
            </div>
          </li>
        ))}
      </ol>

      <CodeLine>
        <Punct>];</Punct>
      </CodeLine>
    </article>
  );
}
