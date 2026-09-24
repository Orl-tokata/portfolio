import type { Metadata } from "next";
import { BootScreen } from "@/components/ide/boot-screen";
import { ContactFile } from "@/components/ide/files/contact-file";
import { EngineeringFile } from "@/components/ide/files/engineering-file";
import { ExperienceFile } from "@/components/ide/files/experience-file";
import { GitHubFile } from "@/components/ide/files/github-file";
import { ProjectFile, ProjectsIndexFile, projectFileId } from "@/components/ide/files/projects-file";
import { ReadmeFile } from "@/components/ide/files/readme-file";
import { SkillsFile } from "@/components/ide/files/skills-file";
import { IdeShell } from "@/components/ide/ide-shell";
import type { IdeFile, TerminalData } from "@/components/ide/types";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

/** Alternative "developer IDE" design, kept for later. Not indexed. */
export const metadata: Metadata = {
  title: "IDE design",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

const githubUrl = profile.socials.find((social) => social.icon === "github")?.href ?? "https://github.com";

/** Every "file" in the editor. Order here is the explorer order. */
const files: IdeFile[] = [
  {
    id: "projects",
    name: "index.md",
    folder: "projects",
    kind: "md",
    language: "Markdown",
    description: "All projects, filterable",
    content: <ProjectsIndexFile />,
  },
  ...projects.map<IdeFile>((project) => ({
    id: projectFileId(project),
    name: `${project.slug}.md`,
    folder: "projects",
    kind: "md",
    language: "Markdown",
    description: project.title,
    content: <ProjectFile project={project} />,
  })),
  { id: "about", name: "README.md", kind: "md", language: "Markdown", description: "About me", content: <ReadmeFile /> },
  {
    id: "experience",
    name: "experience.ts",
    kind: "ts",
    language: "TypeScript",
    description: "Work history",
    git: "M",
    content: <ExperienceFile />,
  },
  { id: "skills", name: "skills.json", kind: "json", language: "JSON", description: "Tech stack", content: <SkillsFile /> },
  {
    id: "engineering",
    name: "engineering.md",
    kind: "md",
    language: "Markdown",
    description: "Engineering strengths",
    content: <EngineeringFile />,
  },
  { id: "github", name: "github.yml", kind: "yml", language: "YAML", description: "GitHub activity & repos", content: <GitHubFile /> },
  {
    id: "contact",
    name: "contact.sh",
    kind: "sh",
    language: "Shell Script",
    description: "Get in touch",
    git: "U",
    content: <ContactFile />,
  },
  { id: "resume", name: "resume.pdf", kind: "pdf", language: "PDF", description: "Download my resume", href: profile.resumeUrl },
];

const terminal: TerminalData = {
  name: profile.name,
  role: profile.role,
  company: profile.company,
  location: profile.location,
  email: profile.email,
  summary: profile.summary,
  stack: ["Java", "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL"],
  skills: skillCategories.map((category) => ({ title: category.title, items: category.skills.map((skill) => skill.name) })),
  experience: experience.map(({ company, role, period }) => ({ company, role, period })),
  projects: projects.map((project) => ({ title: project.title, fileId: projectFileId(project) })),
  socials: profile.socials.map(({ label, href }) => ({ label, href })),
  resumeUrl: profile.resumeUrl,
};

export default function IdePage() {
  return (
    <>
      <BootScreen />
      <IdeShell
        files={files}
        defaultFileId="about"
        terminal={terminal}
        resumeUrl={profile.resumeUrl}
        githubUrl={githubUrl}
        email={profile.email}
      />
    </>
  );
}
