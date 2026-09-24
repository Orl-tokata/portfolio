export type FileKind = "md" | "ts" | "json" | "yml" | "sh" | "pdf";

export interface IdeFileMeta {
  /** Stable id, also used as the URL hash (e.g. #skills). */
  id: string;
  name: string;
  /** Folder segments above the file, e.g. ["projects"]. */
  folder?: string;
  kind: FileKind;
  /** Language label shown in the status bar. */
  language: string;
  /** Short description shown in the command palette. */
  description: string;
  /** Git-style decoration in the explorer. */
  git?: "M" | "U";
  /** Files that are links (e.g. the resume PDF) open this URL instead of a tab. */
  href?: string;
}

export interface IdeFile extends IdeFileMeta {
  /** Server-rendered panel content. Absent for link-only files. */
  content?: React.ReactNode;
}

/** Plain data the interactive terminal needs (serializable across the server/client boundary). */
export interface TerminalData {
  name: string;
  role: string;
  company: string;
  location: string;
  email: string;
  summary: string;
  stack: string[];
  skills: { title: string; items: string[] }[];
  experience: { company: string; role: string; period: string }[];
  projects: { title: string; fileId: string }[];
  socials: { label: string; href: string }[];
  resumeUrl: string;
}
