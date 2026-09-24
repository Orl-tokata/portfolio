"use client";

import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileIcon } from "./file-icon";
import type { IdeFileMeta } from "./types";

interface ExplorerProps {
  files: IdeFileMeta[];
  activeId: string;
  onOpen: (id: string) => void;
}

/** VS Code-style file tree. Root files first, then folders. */
export function Explorer({ files, activeId, onOpen }: ExplorerProps) {
  const folders = [...new Set(files.map((file) => file.folder).filter((folder): folder is string => Boolean(folder)))];
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => Object.fromEntries(folders.map((f) => [f, true])));
  const rootFiles = files.filter((file) => !file.folder);

  return (
    <nav aria-label="Explorer" className="flex h-full min-h-0 flex-col">
      <p className="flex h-9 shrink-0 items-center px-4 font-mono text-[0.65rem] tracking-[0.18em] text-subtle uppercase">Explorer</p>
      <div className="flex items-center gap-1 px-2 pb-1 font-mono text-[0.7rem] font-semibold tracking-wide text-foreground uppercase">
        <ChevronRight aria-hidden className="size-3.5 rotate-90" />
        portfolio
      </div>
      <ul role="tree" aria-label="portfolio" className="ide-scroll min-h-0 flex-1 overflow-y-auto pb-4">
        {folders.map((folder) => {
          const children = files.filter((file) => file.folder === folder);
          const isOpen = expanded[folder];
          return (
            <li key={folder} role="treeitem" aria-expanded={isOpen} aria-selected={false}>
              <button
                type="button"
                onClick={() => setExpanded((prev) => ({ ...prev, [folder]: !prev[folder] }))}
                className="flex h-7 w-full items-center gap-1.5 pr-3 pl-5 text-left text-[0.8rem] text-muted hover:bg-ide-hover hover:text-foreground"
              >
                <ChevronRight aria-hidden className={cn("size-3.5 shrink-0 transition-transform", isOpen && "rotate-90")} />
                {isOpen ? (
                  <FolderOpen aria-hidden className="size-4 shrink-0 text-syn-type" />
                ) : (
                  <Folder aria-hidden className="size-4 shrink-0 text-syn-type" />
                )}
                {folder}
              </button>
              {isOpen ? (
                <ul role="group">
                  {children.map((file) => (
                    <FileItem key={file.id} file={file} active={file.id === activeId} depth={2} onOpen={onOpen} />
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
        {rootFiles.map((file) => (
          <FileItem key={file.id} file={file} active={file.id === activeId} depth={1} onOpen={onOpen} />
        ))}
      </ul>
    </nav>
  );
}

function FileItem({
  file,
  active,
  depth,
  onOpen,
}: {
  file: IdeFileMeta;
  active: boolean;
  depth: number;
  onOpen: (id: string) => void;
}) {
  const className = cn(
    "relative flex h-7 w-full items-center gap-1.5 pr-3 text-left text-[0.8rem] transition-colors",
    active ? "bg-ide-active text-foreground" : "text-muted hover:bg-ide-hover hover:text-foreground",
  );
  const style = { paddingLeft: `${depth * 0.9 + 0.55}rem` };
  const inner = (
    <>
      {active ? <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-accent-cyan" /> : null}
      <FileIcon kind={file.kind} />
      <span className="truncate">{file.name}</span>
      {file.git ? (
        <span className={cn("ml-auto font-mono text-[0.65rem]", file.git === "M" ? "text-amber-500" : "text-emerald-500")}>{file.git}</span>
      ) : null}
    </>
  );

  return (
    <li role="treeitem" aria-selected={active}>
      {file.href ? (
        <a href={file.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
          {inner}
        </a>
      ) : (
        <button type="button" onClick={() => onOpen(file.id)} aria-current={active ? "page" : undefined} className={className} style={style}>
          {inner}
        </button>
      )}
    </li>
  );
}
