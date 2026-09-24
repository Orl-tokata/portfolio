import { Briefcase, Clock, MapPin, Target } from "lucide-react";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { Tilt } from "@/components/animations/tilt";
import { Section, SectionHeading } from "@/components/ui/section";
import { profile } from "@/data/profile";

const facts = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Briefcase, label: "Role", value: profile.role },
  { icon: Clock, label: "Experience", value: `${profile.yearsOfExperience}+ Years` },
  { icon: Target, label: "Focus", value: profile.focus },
] as const;

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
          <Tilt max={5}>
            <ProfilePortrait />
          </Tilt>
        </Reveal>

        <div>
          <SectionHeading
            id="about"
            eyebrow="01 — About"
            title={
              <>
                Turning complex business rules into <span className="text-gradient">dependable software.</span>
              </>
            }
            className="mb-8 sm:mb-8"
          />
          <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2">
            {facts.map(({ icon: Icon, label, value }) => (
              <StaggerItem
                as="li"
                key={label}
                className="group flex items-start gap-3.5 rounded-xl border border-border bg-surface/60 p-4 transition-colors hover:border-border-strong"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-muted text-accent-cyan transition-transform group-hover:scale-105">
                  <Icon aria-hidden className="size-4" />
                </span>
                <span>
                  <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-subtle">{label}</span>
                  <span className="mt-0.5 block text-sm font-medium text-foreground">{value}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

/** Circular portrait inside a gradient card, framed by a slowly rotating conic ring. */
function ProfilePortrait() {
  return (
    <figure className="relative">
      <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent-gradient opacity-15 blur-2xl" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border-strong bg-surface shadow-card">
        <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--accent-blue) 30%, transparent), transparent 55%), radial-gradient(circle at 80% 90%, color-mix(in oklab, var(--accent-violet) 30%, transparent), transparent 50%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 bottom-20 grid place-items-center">
          <div className="relative grid size-52 place-items-center sm:size-60">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full motion-safe:animate-spin-slow"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--accent-blue), var(--accent-cyan), var(--accent-violet), transparent 70%, var(--accent-blue))",
              }}
            />
            <div aria-hidden className="absolute -inset-6 rounded-full bg-accent-blue/20 blur-2xl" />
            <div className="relative size-[calc(100%-8px)] overflow-hidden rounded-full border-4 border-surface bg-white">
              <Image
                src={profile.photo.portrait}
                alt={`Portrait of ${profile.name}`}
                width={234}
                height={234}
                priority
                className="size-full object-cover object-top"
              />
            </div>
          </div>
        </div>
        <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3 backdrop-blur-md">
          <span>
            <span className="block text-sm font-semibold text-foreground">{profile.name}</span>
            <span className="block font-mono text-[0.7rem] text-subtle">{profile.company} · Global Product</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[0.65rem] text-emerald-500 dark:text-emerald-400">
            <span aria-hidden className="size-1.5 rounded-full bg-current" />
            Active
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
