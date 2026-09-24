import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    company: "KOSIGN",
    role: "Software Engineer",
    department: "Global Product Department",
    period: "2022 — Present",
    location: "Phnom Penh, Cambodia",
    current: true,
    summary:
      "Building and operating enterprise financial products used by businesses to manage accounts, payments, and reporting across banking partners.",
    responsibilities: [
      "Develop and maintain enterprise financial applications end to end.",
      "Build backend services and REST APIs with Java and Spring Boot.",
      "Develop modern frontend applications with Next.js, React, and TypeScript.",
      "Design schemas and optimize PostgreSQL queries for reporting workloads.",
      "Integrate banking and third-party services with robust retry and validation.",
      "Investigate and resolve production issues with a root-cause mindset.",
      "Drive modernization of legacy JSP modules toward Spring Boot + Next.js.",
      "Implement GitLab CI/CD pipelines for repeatable, safe deployments.",
      "Collaborate daily with international development and QA teams.",
    ],
    stack: ["Java", "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL", "GitLab CI/CD"],
  },
  {
    company: "CAMBODIASOFT",
    role: "Technical Support Specialist",
    period: "2018 — 2021",
    location: "Phnom Penh, Cambodia",
    summary:
      "Supported business customers on software systems — the foundation for my focus on reliability, diagnostics, and user empathy.",
    responsibilities: [
      "Diagnosed and resolved application, database, and environment issues for customers.",
      "Worked with developers to reproduce defects and verify fixes.",
      "Installed, configured, and maintained client systems on Windows and Linux.",
      "Documented recurring problems and wrote internal troubleshooting guides.",
    ],
    stack: ["SQL", "Linux", "Networking", "Troubleshooting"],
  },
];
