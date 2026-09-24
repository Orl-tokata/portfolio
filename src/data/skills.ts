import type { EngineeringPractice, SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Typed, accessible interfaces that stay fast.",
    skills: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    title: "Backend",
    description: "Layered services with clear contracts.",
    skills: [
      { name: "Java", icon: "java" },
      { name: "Spring Boot", icon: "spring" },
      { name: "REST API", icon: "api" },
      { name: "JPA / Hibernate", icon: "hibernate" },
    ],
  },
  {
    title: "Database",
    description: "Schemas and queries built for real workloads.",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    title: "DevOps & Tools",
    description: "Repeatable builds and calm deployments.",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitLab", icon: "gitlab" },
      { name: "GitLab CI/CD", icon: "cicd" },
      { name: "Docker", icon: "docker" },
      { name: "Linux", icon: "linux" },
    ],
  },
];

export const engineeringPractices: EngineeringPractice[] = [
  { name: "RESTful API Design", description: "Resource-oriented, versionable contracts" },
  { name: "Authentication", description: "Session, token & role-based access" },
  { name: "Database Design", description: "Normalized schemas, indexes, migrations" },
  { name: "System Integration", description: "Banks, third parties, schedulers" },
  { name: "Legacy Modernization", description: "Incremental JSP → Spring Boot + Next.js" },
  { name: "CI/CD", description: "GitLab pipelines from commit to deploy" },
  { name: "Troubleshooting", description: "Logs, metrics, root-cause analysis" },
];
