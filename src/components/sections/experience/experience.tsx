import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SpotlightCard } from "@/components/animations/spotlight-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import { TimelineProgress } from "./timeline-progress";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        eyebrow="02 — Experience"
        title="Where I've been building."
        description="From supporting customers on live systems to engineering the financial products they rely on."
      />

      <TimelineProgress>
        <ol className="space-y-12">
          {experience.map((job) => (
            <li key={job.company} className="relative grid gap-4 pl-10 md:grid-cols-[12rem_1fr] md:gap-10 md:pl-0">
              <Reveal className="md:pt-5 md:pr-6 md:text-right" y={12}>
                <p className="font-mono text-sm text-foreground">{job.period}</p>
                <p className="mt-1 text-xs text-subtle">{job.location}</p>
              </Reveal>

              <span
                aria-hidden
                className={cn(
                  "absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border md:top-6 md:left-[12rem]",
                  job.current ? "border-accent-cyan bg-background" : "border-border-strong bg-background",
                )}
              >
                <span className={cn("size-[7px] rounded-full", job.current ? "bg-accent-cyan" : "bg-subtle")} />
                {job.current ? (
                  <span className="absolute inset-0 rounded-full border border-accent-cyan motion-safe:animate-ping" />
                ) : null}
              </span>

              <Reveal className="md:pl-10" delay={0.08}>
                <SpotlightCard className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">{job.role}</h3>
                      <p className="mt-1 text-sm text-muted">
                        <span className="font-medium text-accent-cyan">{job.company}</span>
                        {job.department ? <> · {job.department}</> : null}
                      </p>
                    </div>
                    {job.current ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2.5 py-1 font-mono text-[0.7rem] text-accent-cyan">
                        Current <ArrowUpRight aria-hidden className="size-3" />
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted">{job.summary}</p>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </TimelineProgress>
    </Section>
  );
}
