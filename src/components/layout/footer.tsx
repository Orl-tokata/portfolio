import { SocialIcon } from "@/components/icons/brand-icons";
import { navItems, profile } from "@/data/profile";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div aria-hidden className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-accent-gradient opacity-40" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-foreground">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.role}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-subtle">{profile.headline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-muted transition-colors hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2" aria-label="Social links">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                target={social.icon === "email" ? undefined : "_blank"}
                rel={social.icon === "email" ? undefined : "noopener noreferrer"}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground"
              >
                <SocialIcon icon={social.icon} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {profile.name}. All rights reserved.
          </p>
          <p>Designed &amp; Built by {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
