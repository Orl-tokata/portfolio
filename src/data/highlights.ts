import type { Highlight, Stat } from "@/types";
import { profile } from "./profile";
import { skillCategories } from "./skills";

export const highlights: Highlight[] = [
  {
    title: "Enterprise Application Development",
    description: "Business-critical web applications with complex workflows, permissions, and approvals.",
    tags: ["Workflows", "RBAC"],
  },
  {
    title: "Backend Architecture",
    description: "Layered Spring Boot services with clean boundaries, DTOs, validation, and error handling.",
    tags: ["Spring Boot", "REST"],
  },
  {
    title: "Frontend Engineering",
    description: "Next.js and React interfaces that are typed, accessible, and pleasant to use.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Database Optimization",
    description: "Query tuning, indexing, and schema design for reporting-heavy PostgreSQL workloads.",
    tags: ["PostgreSQL", "Indexes"],
  },
  {
    title: "Banking System Integration",
    description: "Reliable connections to banking APIs for inquiries, histories, and payments.",
    tags: ["Integration", "Idempotency"],
  },
  {
    title: "Legacy System Modernization",
    description: "Incrementally moving JSP applications to modern APIs and component-based UIs.",
    tags: ["Migration", "Refactoring"],
  },
  {
    title: "CI/CD & Deployment",
    description: "GitLab pipelines that build, test, and ship consistently across environments.",
    tags: ["GitLab CI", "Docker"],
  },
  {
    title: "Production Troubleshooting",
    description: "Calm, methodical incident investigation from logs down to the root cause.",
    tags: ["Observability", "RCA"],
  },
];

const technologyCount = skillCategories.reduce((total, category) => total + category.skills.length, 0);

export const stats: Stat[] = [
  {
    value: profile.yearsOfExperience,
    suffix: "+",
    label: "Years Experience",
    description: "Building production software",
  },
  {
    value: Math.floor(technologyCount / 5) * 5,
    suffix: "+",
    label: "Technologies",
    description: "Across the full stack",
  },
  {
    display: "Multiple",
    label: "Enterprise Projects",
    description: "Financial & banking domain",
  },
  {
    display: "End-to-End",
    label: "Full-Stack Development",
    description: "Database to deployment",
  },
];
