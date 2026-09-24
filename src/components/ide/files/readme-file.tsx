import { ArrowRight, Download, FolderOpen } from "lucide-react";
import Image from "next/image";
import { Counter } from "@/components/animations/counter";
import { SocialIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { stats } from "@/data/highlights";
import { profile } from "@/data/profile";
import { CodeLine, Comment, Num, Prop, Punct, Str } from "../code";

const facts: [string, React.ReactNode][] = [
  ["location", <Str key="l">&quot;{profile.location}&quot;</Str>],
  ["role", <Str key="r">&quot;{profile.role}&quot;</Str>],
  ["company", <Str key="c">&quot;{profile.company}&quot;</Str>],
  ["experience", <Num key="e">{profile.yearsOfExperience}+ years</Num>],
  ["focus", <Str key="f">&quot;{profile.focus}&quot;</Str>],
];

export function ReadmeFile() {
  return (
    <article aria-labelledby="about-title">
      <CodeLine index={0}>
        <Comment>{"<!-- README.md · last updated by "}{profile.name}{" -->"}</Comment>
      </CodeLine>

      <div className="mt-8 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
        <Portrait />

        <div>
          <p className="animate-line-in font-mono text-sm text-accent-cyan" style={{ animationDelay: "0.1s" }}>
            <Punct>#</Punct> Hello, I&apos;m
          </p>
          <h1
            id="about-title"
            className="mt-2 animate-line-in font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
            style={{ animationDelay: "0.15s" }}
          >
            {profile.name}
          </h1>
          <p className="mt-3 animate-line-in font-display text-2xl font-semibold sm:text-3xl" style={{ animationDelay: "0.2s" }}>
            <span className="text-gradient motion-safe:animate-gradient-pan">{profile.role}</span>
          </p>
          <p className="mt-5 max-w-xl animate-line-in text-base leading-relaxed text-muted sm:text-lg" style={{ animationDelay: "0.25s" }}>
            {profile.summary}
          </p>

          <div className="mt-7 flex animate-line-in flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
            <Button href="#projects">
              <FolderOpen aria-hidden className="size-4" />
              Open projects/
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            <Button href={profile.resumeUrl} download variant="secondary">
              <Download aria-hidden className="size-4" />
              resume.pdf
            </Button>
            <ul className="flex items-center gap-2" aria-label="Social links">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.icon === "email" ? undefined : "_blank"}
                    rel={social.icon === "email" ? undefined : "noopener noreferrer"}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground"
                  >
                    <SocialIcon icon={social.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section aria-labelledby="about-me-title" className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 id="about-me-title" className="font-mono text-sm text-foreground">
            <Punct>##</Punct> About me
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-ide-panel p-5">
          <CodeLine>
            <Comment># profile.yml</Comment>
          </CodeLine>
          <dl>
            {facts.map(([key, value], index) => (
              <CodeLine key={key} index={index + 4}>
                <dt className="inline">
                  <Prop>{key}</Prop>
                  <Punct>:</Punct>{" "}
                </dt>
                <dd className="inline">{value}</dd>
              </CodeLine>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Statistics" className="mt-12">
        <ul className="grid grid-cols-2 overflow-hidden rounded-xl border border-border lg:grid-cols-4">
          {stats.map((stat, index) => (
            <li
              key={stat.label}
              className={[
                "bg-ide-panel/60 p-5",
                index % 2 === 1 ? "border-l border-border" : "",
                index >= 2 ? "border-t border-border lg:border-t-0" : "",
                index === 2 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <p className="whitespace-nowrap font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {stat.value !== undefined ? (
                  <Counter value={stat.value} suffix={stat.suffix} className="text-gradient" />
                ) : (
                  <span className="text-gradient">{stat.display}</span>
                )}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{stat.label}</p>
              <p className="mt-0.5 text-xs text-subtle">{stat.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function Portrait() {
  return (
    <div className="relative mx-auto grid size-48 animate-line-in place-items-center sm:size-56" style={{ animationDelay: "0.05s" }}>
      <div
        aria-hidden
        className="absolute inset-0 rounded-full motion-safe:animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, var(--accent-blue), var(--accent-cyan), var(--accent-violet), transparent 70%, var(--accent-blue))",
        }}
      />
      <div aria-hidden className="absolute -inset-8 rounded-full bg-accent-blue/15 blur-3xl" />
      <div className="relative size-[calc(100%-8px)] overflow-hidden rounded-full border-4 border-ide-editor bg-white">
        <Image
          src={profile.photo.portrait}
          alt={`Portrait of ${profile.name}`}
          width={234}
          height={234}
          priority
          className="size-full object-cover object-top"
        />
      </div>
      <span className="absolute -right-2 bottom-5 flex items-center gap-1.5 rounded-full border border-border-strong bg-ide-editor px-2.5 py-1 font-mono text-[0.65rem] text-foreground shadow-card">
        <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
        online
      </span>
    </div>
  );
}
