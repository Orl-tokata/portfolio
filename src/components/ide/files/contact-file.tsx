import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/icons/brand-icons";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { profile } from "@/data/profile";
import { CodeLine, Comment, FileHeading, Kw, Punct, Str } from "../code";

export function ContactFile() {
  return (
    <article aria-labelledby="contact-title">
      <FileHeading
        id="contact"
        comment="#!/usr/bin/env bash — contact.sh"
        title={
          <>
            Let&apos;s build something <span className="text-gradient">reliable.</span>
          </>
        }
        subtitle="Have a role, a project, or a hard production problem? My inbox is open."
      />

      <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="animate-file-open space-y-5" style={{ animationDelay: "0.1s" }}>
          <div className="rounded-xl border border-border bg-ide-panel/60 p-5">
            <CodeLine>
              <Kw>export</Kw> EMAIL<Punct>=</Punct>
              <a href={`mailto:${profile.email}`} className="underline decoration-dotted underline-offset-4 hover:decoration-solid">
                <Str>&quot;{profile.email}&quot;</Str>
              </a>
            </CodeLine>
            <CodeLine>
              <Kw>export</Kw> LOCATION<Punct>=</Punct>
              <Str>&quot;{profile.location}&quot;</Str>
            </CodeLine>
            <CodeLine>
              <Kw>export</Kw> TIMEZONE<Punct>=</Punct>
              <Str>&quot;ICT (UTC+7)&quot;</Str>
            </CodeLine>
          </div>

          <ul className="space-y-2" aria-label="Social links">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.icon === "email" ? undefined : "_blank"}
                  rel={social.icon === "email" ? undefined : "noopener noreferrer"}
                  className="group flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm text-muted transition-colors hover:border-border-strong hover:bg-ide-hover hover:text-foreground"
                >
                  <SocialIcon icon={social.icon} className="size-4" />
                  <span className="font-mono text-xs text-syn-fn">open</span>
                  {social.label}
                  <ArrowUpRight aria-hidden className="ml-auto size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-file-open rounded-xl border border-border bg-ide-panel/60 p-5 sm:p-6" style={{ animationDelay: "0.18s" }}>
          <CodeLine className="mb-5">
            <Comment># ./contact.sh --send</Comment>
          </CodeLine>
          <ContactForm />
        </div>
      </div>
    </article>
  );
}
