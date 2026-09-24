export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  headline: string;
  summary: string;
  about: string[];
  location: string;
  yearsOfExperience: number;
  focus: string;
  email: string;
  company: string;
  resumeUrl: string;
  /** Square portrait and small avatar in /public. */
  photo: { portrait: string; avatar: string };
  githubUsername: string;
  socials: SocialLink[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  department?: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
  stack: string[];
}

export type ProjectCategory = "frontend" | "backend" | "fullstack";

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  stack: string[];
  role: string;
  contribution: string;
  highlights: string[];
  /** Visual accent used by the generated preview artwork. */
  accent: "blue" | "cyan" | "violet" | "emerald";
  preview: "dashboard" | "integration" | "migration" | "pipeline";
  githubUrl?: string;
  demoUrl?: string;
  confidential?: boolean;
}

export type TechIconKey =
  | "nextjs"
  | "react"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "html"
  | "css"
  | "java"
  | "spring"
  | "hibernate"
  | "postgresql"
  | "git"
  | "gitlab"
  | "docker"
  | "linux"
  | "api"
  | "sql"
  | "cicd";

export interface Skill {
  name: string;
  icon: TechIconKey;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export interface EngineeringPractice {
  name: string;
  description: string;
}

export interface Highlight {
  title: string;
  description: string;
  tags: string[];
}

export interface Stat {
  /** Numeric part animated by the counter. Omit for non-numeric stats. */
  value?: number;
  suffix?: string;
  /** Display text used when no numeric value is configured. */
  display?: string;
  label: string;
  description: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
}

export interface LanguageShare {
  name: string;
  percent: number;
  color: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubSummary {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  /** Real contribution calendar, or null when unavailable (needs GITHUB_TOKEN at build time). */
  contributions: { total: number; days: ContributionDay[] } | null;
  memberSince?: string;
  languages: LanguageShare[];
  featuredRepos: GitHubRepo[];
  /** True when the data comes from the local mock instead of the GitHub API. */
  isMock: boolean;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
