import { cn } from "@/lib/utils";

/**
 * Tiny syntax-coloured primitives used to give file panels an editor feel
 * while the content itself stays readable prose and semantic HTML.
 */
type TokenProps = { children: React.ReactNode; className?: string };

export const Kw = ({ children, className }: TokenProps) => (
  <span className={cn("text-syn-keyword", className)}>{children}</span>
);
export const Str = ({ children, className }: TokenProps) => (
  <span className={cn("text-syn-string", className)}>{children}</span>
);
export const Type = ({ children, className }: TokenProps) => (
  <span className={cn("text-syn-type", className)}>{children}</span>
);
export const Fn = ({ children, className }: TokenProps) => (
  <span className={cn("text-syn-fn", className)}>{children}</span>
);
export const Prop = ({ children, className }: TokenProps) => (
  <span className={cn("text-syn-prop", className)}>{children}</span>
);
export const Num = ({ children, className }: TokenProps) => (
  <span className={cn("text-syn-number", className)}>{children}</span>
);
export const Punct = ({ children, className }: TokenProps) => (
  <span className={cn("text-syn-punct", className)}>{children}</span>
);
export const Comment = ({ children, className }: TokenProps) => (
  <span className={cn("text-syn-comment italic", className)}>{children}</span>
);

/** Monospace code line, optionally animated in with a stagger index. */
export function CodeLine({ children, index, className }: TokenProps & { index?: number }) {
  return (
    <div
      className={cn("font-mono text-[0.8rem] leading-6 whitespace-pre-wrap", index !== undefined && "animate-line-in", className)}
      style={index !== undefined ? { animationDelay: `${0.05 + index * 0.04}s` } : undefined}
    >
      {children}
    </div>
  );
}

/** Title block at the top of every file: a code comment plus the real heading. */
export function FileHeading({
  id,
  comment,
  title,
  subtitle,
  as: Heading = "h2",
}: {
  id: string;
  comment: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <header className="mb-10">
      <CodeLine index={0}>
        <Comment>{comment}</Comment>
      </CodeLine>
      <Heading
        id={`${id}-title`}
        className="mt-4 animate-line-in font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
        style={{ animationDelay: "0.1s" }}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p className="mt-3 max-w-2xl animate-line-in text-base leading-relaxed text-muted" style={{ animationDelay: "0.15s" }}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
