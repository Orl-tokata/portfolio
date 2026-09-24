import { cn } from "@/lib/utils";

/**
 * Page-load entrance for hero content, implemented with CSS keyframes rather
 * than Motion: it needs no JavaScript, starts before hydration (faster LCP),
 * and is neutralised by the global prefers-reduced-motion rule.
 */
const BASE_DELAY = 0.1;
const STEP = 0.08;

const delay = (step: number): React.CSSProperties => ({ animationDelay: `${BASE_DELAY + step * STEP}s` });

export function HeroItem({
  children,
  className,
  step,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Position in the entrance sequence. */
  step: number;
  /** Use "span" inside phrasing-only parents such as headings. */
  as?: "div" | "span";
}) {
  return (
    <Component className={cn("animate-hero-item", className)} style={delay(step)}>
      {children}
    </Component>
  );
}

/** Masked word-by-word text reveal. The full text stays readable to assistive tech. */
export function RevealText({ text, step, className }: { text: string; step: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((part, index) => (
        <span key={`${part}-${index}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span className="inline-block animate-word-up" style={delay(step + index)}>
            {part}
            {index < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
