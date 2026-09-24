import { Braces, Database, Workflow } from "lucide-react";
import {
  siCss,
  siDocker,
  siGit,
  siGitlab,
  siHibernate,
  siHtml5,
  siJavascript,
  siLinux,
  siNextdotjs,
  siOpenjdk,
  siPostgresql,
  siReact,
  siSpringboot,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import type { TechIconKey } from "@/types";

interface BrandIcon {
  path: string;
  hex: string;
}

const brandIcons: Partial<Record<TechIconKey, BrandIcon>> = {
  nextjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  javascript: siJavascript,
  tailwind: siTailwindcss,
  html: siHtml5,
  css: siCss,
  java: { path: siOpenjdk.path, hex: "E76F00" },
  spring: siSpringboot,
  hibernate: siHibernate,
  postgresql: siPostgresql,
  git: siGit,
  gitlab: siGitlab,
  docker: siDocker,
  linux: { path: siLinux.path, hex: "FCC624" },
};

const conceptIcons = {
  api: { Icon: Braces, hex: "22D3EE" },
  sql: { Icon: Database, hex: "60A5FA" },
  cicd: { Icon: Workflow, hex: "FC6D26" },
} as const;

/** Brand colours too dark to read on the dark theme fall back to the text colour. */
function brandColor(hex: string): string {
  const value = parseInt(hex, 16);
  const luminance = 0.299 * (value >> 16) + 0.587 * ((value >> 8) & 255) + 0.114 * (value & 255);
  return luminance < 60 ? "var(--foreground)" : `#${hex}`;
}

/** Brand colour for a technology, exposed as a CSS value for hover styles. */
export function techColor(icon: TechIconKey): string {
  const brand = brandIcons[icon];
  if (brand) return brandColor(brand.hex);
  return `#${conceptIcons[icon as keyof typeof conceptIcons].hex}`;
}

export function TechIcon({ icon, className }: { icon: TechIconKey; className?: string }) {
  const brand = brandIcons[icon];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
        <path d={brand.path} />
      </svg>
    );
  }
  const { Icon } = conceptIcons[icon as keyof typeof conceptIcons];
  return <Icon aria-hidden strokeWidth={1.75} className={className} />;
}
