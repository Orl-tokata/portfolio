import { profile } from "@/data/profile";

/** Explicit URL first, then the production domain Vercel exposes at build time, then local dev. */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl().replace(/\/$/, ""),
  title: `${profile.name} | ${profile.role}`,
  description:
    "Full-Stack Software Engineer specializing in Java, Spring Boot, Next.js, React, TypeScript, PostgreSQL, and enterprise application development.",
  keywords: [
    "Orl Tokata",
    "Full-Stack Software Engineer",
    "Java Developer",
    "Spring Boot",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "REST API",
    "Enterprise Applications",
    "Banking Systems",
    "Financial Systems",
    "Phnom Penh",
    "Cambodia",
  ],
} as const;
