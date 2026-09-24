import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
}

export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative py-24 sm:py-32", className)} {...props}>
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  /** Short monospace label, e.g. "02 — Experience". */
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-14 max-w-2xl sm:mb-16", align === "center" && "mx-auto text-center", className)}>
      <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
        <span aria-hidden className="h-px w-6 bg-accent-cyan/60" />
        {eyebrow}
      </p>
      <h2
        id={`${id}-title`}
        className="font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
      >
        {title}
      </h2>
      {description ? <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}
