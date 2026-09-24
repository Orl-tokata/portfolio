import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SocialIcon } from "@/components/icons/brand-icons";
import { Section, SectionHeading } from "@/components/ui/section";
import { profile } from "@/data/profile";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <Section id="contact" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent-violet/10 blur-[120px]" />

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact"
            eyebrow="07 — Contact"
            title={
              <>
                Let&apos;s build something <span className="text-gradient">reliable.</span>
              </>
            }
            description="Have a role, a project, or a hard production problem? My inbox is open — I usually reply within a couple of days."
            className="mb-10 sm:mb-10"
          />

          <Reveal delay={0.1}>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4 transition-colors hover:border-border-strong"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-accent-gradient text-white">
                    <Mail aria-hidden className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-subtle">Email</span>
                    <span className="block truncate text-sm font-medium text-foreground">{profile.email}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4">
                <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-muted text-accent-cyan">
                  <MapPin aria-hidden className="size-4" />
                </span>
                <span>
                  <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-subtle">Based in</span>
                  <span className="block text-sm font-medium text-foreground">{profile.location}</span>
                </span>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4">
                <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-muted text-accent-cyan">
                  <Clock aria-hidden className="size-4" />
                </span>
                <span>
                  <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-subtle">Timezone</span>
                  <span className="block text-sm font-medium text-foreground">ICT · UTC+7</span>
                </span>
              </li>
            </ul>

            <ul className="mt-6 flex gap-2" aria-label="Social links">
              {profile.socials
                .filter((social) => social.icon !== "email")
                .map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
                    >
                      <SocialIcon icon={social.icon} className="size-4" />
                      {social.label}
                    </a>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="gradient-border relative rounded-3xl border border-border bg-surface/80 p-6 shadow-card backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center gap-2 font-mono text-xs text-subtle">
              <span className="text-accent-emerald">$</span>
              <span>send --to {profile.email}</span>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
