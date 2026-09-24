import type { Project, ProjectCategory } from "@/types";

export const projectFilters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Full Stack" },
];

export const projects: Project[] = [
  {
    slug: "enterprise-financial-platform",
    title: "Enterprise Financial Management Platform",
    description:
      "Modern enterprise financial management platform supporting banking integration, account management, payments, reporting, and financial workflows.",
    category: "fullstack",
    stack: ["Java", "Spring Boot", "Next.js", "React", "PostgreSQL"],
    role: "Full-Stack Engineer",
    contribution:
      "Built account, payment, and reporting modules across Spring Boot APIs and a Next.js interface.",
    highlights: [
      "Multi-bank account dashboard",
      "Approval-based payment workflows",
      "Optimized reporting queries",
    ],
    accent: "blue",
    preview: "dashboard",
    confidential: true,
  },
  {
    slug: "banking-integration-system",
    title: "Banking Integration System",
    description:
      "Integration platform connecting enterprise applications with banking systems for account inquiries, transaction histories, payment processing, and automated synchronization.",
    category: "backend",
    stack: ["Java", "REST API", "PostgreSQL"],
    role: "Backend Engineer",
    contribution:
      "Designed integration adapters, scheduled synchronization jobs, and failure-safe transaction handling.",
    highlights: [
      "Idempotent sync jobs",
      "Unified bank adapter interface",
      "Audit-friendly logging",
    ],
    accent: "cyan",
    preview: "integration",
    confidential: true,
  },
  {
    slug: "legacy-modernization",
    title: "Legacy System Modernization",
    description:
      "Modernization project migrating a legacy JSP-based enterprise application toward a Spring Boot and Next.js architecture.",
    category: "fullstack",
    stack: ["Java", "Spring Boot", "Next.js", "TypeScript", "PostgreSQL"],
    role: "Full-Stack Engineer",
    contribution:
      "Extracted REST APIs from server-rendered JSP flows and rebuilt screens as typed React components.",
    highlights: [
      "Incremental, module-by-module migration",
      "Typed API contracts",
      "Reusable UI component set",
    ],
    accent: "violet",
    preview: "migration",
    confidential: true,
  },
  {
    slug: "invoice-data-integration",
    title: "Invoice Data Integration",
    description:
      "Automated invoice retrieval and processing system with data validation, retry handling, export, and financial platform integration.",
    category: "backend",
    stack: ["Java", "Web Integration", "PostgreSQL"],
    role: "Backend Engineer",
    contribution:
      "Implemented the retrieval pipeline, validation rules, retry strategy, and export into the financial platform.",
    highlights: ["Automatic retry & backoff", "Validation before import", "Excel / CSV export"],
    accent: "emerald",
    preview: "pipeline",
    confidential: true,
  },
  {
    slug: "developer-portfolio",
    title: "Developer Portfolio",
    description:
      "This site — a Next.js App Router project statically exported to plain HTML/CSS/JS, built with a focus on performance and accessibility.",
    category: "frontend",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    role: "Designer & Developer",
    contribution:
      "Designed the visual system and implemented server-first sections with lightweight client animations.",
    highlights: ["Static export, no server", "Reduced-motion aware", "Typed, validated contact form"],
    accent: "blue",
    preview: "dashboard",
    githubUrl: "https://github.com/Orl-tokata",
  },
];
