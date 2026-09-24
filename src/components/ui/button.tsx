import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background shadow-[0_0_0_1px_var(--border-strong),0_8px_30px_-8px_var(--glow)] " +
    "hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--border-strong),0_14px_40px_-10px_color-mix(in_oklab,var(--accent-blue)_55%,transparent)]",
  secondary:
    "border border-border-strong bg-surface/60 text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-accent-blue/50 hover:bg-surface",
  ghost: "text-muted hover:bg-surface-muted hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Renders a Next <Link> for internal hrefs, an <a> for external/files, otherwise a <button>. */
export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    const isPage = href.startsWith("#") || (href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href));
    if (isPage) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
