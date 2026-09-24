import type { NavItem, Profile } from "@/types";

/** Single source of truth for personal details used across the site and SEO. */
export const profile: Profile = {
  name: "Orl Tokata",
  initials: "OT",
  role: "Full-Stack Software Engineer",
  headline: "Engineering reliable systems for finance & enterprise.",
  summary:
    "I build reliable, scalable, and user-focused web applications using Java, Spring Boot, Next.js, React, TypeScript, and PostgreSQL.",
  about: [
    "I'm a Full-Stack Software Engineer focused on building scalable enterprise applications and modern web experiences.",
    "My work spans backend architecture, frontend development, database design, system integration, deployment, and production troubleshooting.",
    "I enjoy transforming complex business requirements into reliable and maintainable software.",
  ],
  location: "Phnom Penh, Cambodia",
  yearsOfExperience: 4,
  focus: "Enterprise & Financial Systems",
  email: "orltokata@gmail.com",
  company: "KOSIGN",
  resumeUrl: "/resume/Orl_Tokata_Resume.pdf",
  photo: { portrait: "/images/orl-tokata.webp", avatar: "/images/orl-tokata-avatar.webp" },
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Orl-tokata",
  socials: [
    { label: "GitHub", href: "https://github.com/Orl-tokata", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/orl-tokata-3201b9262", icon: "linkedin" },
    { label: "Email", href: "mailto:orltokata@gmail.com", icon: "email" },
  ],
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

/**
 * Repositories highlighted in the GitHub section, in display order. Only
 * personal, job-related work is listed — never company/client code.
 * An optional description overrides an empty or informal one on GitHub.
 */
export const featuredRepos: { name: string; description?: string }[] = [
  {
    name: "SPRING_BOOT_CRUD",
    description: "CRUD REST service built with Spring Boot.",
  },
  {
    name: "Restaurant-Management-System-NIEI-Y4-",
    description: "Restaurant Management System — final-year project at NIEI (Year 4).",
  },
  {
    name: "CRUD-NODEJS-SQLITE",
    description: "CRUD REST API built with Node.js and SQLite.",
  },
];
