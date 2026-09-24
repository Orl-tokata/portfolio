import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { SocialIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { CodeWindow } from "./code-window";
import { HeroBackground } from "./hero-background";
import { HeroItem, RevealText } from "./hero-intro";

export function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="relative isolate flex min-h-dvh items-center pt-28 pb-20">
      <HeroBackground />

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div className="max-w-2xl">
          <HeroItem step={0}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/50 py-1 pr-3.5 pl-1 text-xs text-muted backdrop-blur">
              <span className="relative">
                <Image
                  src={profile.photo.avatar}
                  alt=""
                  width={48}
                  height={48}
                  priority
                  className="size-6 rounded-full bg-white object-cover ring-1 ring-border-strong"
                />
                <span className="absolute -right-0.5 -bottom-0.5 flex size-2.5" aria-hidden>
                  <span className="absolute inset-0 rounded-full bg-emerald-400 motion-safe:animate-ping" />
                  <span className="relative size-2.5 rounded-full border-2 border-background bg-emerald-400" />
                </span>
              </span>
              Software Engineer at <span className="font-medium text-foreground">{profile.company}</span>
            </p>
          </HeroItem>

          <h1 id="home-title" className="mt-8 font-display tracking-tight">
            <HeroItem step={1} as="span" className="block">
              <span className="block font-mono text-sm font-normal tracking-normal text-accent-cyan sm:text-base">
                Hello, I&apos;m
              </span>
            </HeroItem>
            <RevealText
              step={2}
              text={profile.name}
              className="mt-3 block text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl md:text-7xl lg:text-6xl xl:text-[5.25rem]"
            />
            <HeroItem step={4} as="span" className="block">
              <span className="text-gradient mt-3 block text-3xl font-semibold leading-tight motion-safe:animate-gradient-pan sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl">
                {profile.role}
              </span>
            </HeroItem>
          </h1>

          <HeroItem step={5}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{profile.summary}</p>
          </HeroItem>

          <HeroItem step={6} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projects" size="lg">
              View My Work
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            <Button href={profile.resumeUrl} download variant="secondary" size="lg">
              <Download aria-hidden className="size-4" />
              Download Resume
            </Button>
            <Button href="#contact" variant="ghost" size="lg">
              <Mail aria-hidden className="size-4" />
              Contact Me
            </Button>
          </HeroItem>

          <HeroItem step={7} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ul className="flex items-center gap-2" aria-label="Social links">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.icon === "email" ? undefined : "_blank"}
                    rel={social.icon === "email" ? undefined : "noopener noreferrer"}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface/40 text-muted backdrop-blur transition-all hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground"
                  >
                    <SocialIcon icon={social.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <span aria-hidden className="hidden h-5 w-px bg-border-strong sm:block" />
            <p className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle">
              <MapPin aria-hidden className="size-3.5" />
              {profile.location}
            </p>
          </HeroItem>
        </div>

        <div className="hidden lg:block">
          <CodeWindow />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-subtle transition-colors hover:text-foreground md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-border-strong">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-accent-cyan motion-safe:animate-[scroll-line_1.8s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}
