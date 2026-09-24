"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import {
  Bell,
  Blocks,
  Check,
  Download,
  Files,
  GitBranch,
  Mail,
  Menu,
  Moon,
  Search,
  Settings,
  SquareTerminal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BOOT_STORAGE_KEY } from "@/components/layout/theme-script";
import { useMediaQuery } from "@/hooks/use-media-query";
import { setTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { CommandPalette, type PaletteItem } from "./command-palette";
import { Explorer } from "./explorer";
import { FileIcon } from "./file-icon";
import { Terminal } from "./terminal";
import type { IdeFile, IdeFileMeta, TerminalData } from "./types";

interface IdeShellProps {
  files: IdeFile[];
  defaultFileId: string;
  terminal: TerminalData;
  resumeUrl: string;
  githubUrl: string;
  email: string;
}

const LINE_HEIGHT = 24;

export function IdeShell({ files, defaultFileId, terminal, resumeUrl, githubUrl, email }: IdeShellProps) {
  const metas = useMemo<IdeFileMeta[]>(
    () =>
      files.map(({ id, name, folder, kind, language, description, git, href }) => ({
        id,
        name,
        folder,
        kind,
        language,
        description,
        git,
        href,
      })),
    [files],
  );
  const byId = useMemo(() => new Map(metas.map((file) => [file.id, file])), [metas]);

  const [openIds, setOpenIds] = useState<string[]>([defaultFileId]);
  const [activeId, setActiveId] = useState(defaultFileId);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // null = follow the default (open on desktop, collapsed on phones) until the visitor toggles it.
  const isPhone = useMediaQuery("(max-width: 767px)");
  const [terminalPref, setTerminalPref] = useState<boolean | null>(null);
  const terminalOpen = terminalPref ?? !isPhone;
  const [paletteOpen, setPaletteOpen] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const scrollPositions = useRef(new Map<string, number>());
  const previousActive = useRef(activeId);
  const baseTitle = useRef<string | null>(null);

  const openFile = useCallback(
    (id: string) => {
      const file = byId.get(id);
      if (!file || file.href) return;
      setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
      setActiveId(id);
      setDrawerOpen(false);
    },
    [byId],
  );

  const closeFile = useCallback(
    (id: string) => {
      if (openIds.length === 1) return;
      const index = openIds.indexOf(id);
      const next = openIds.filter((item) => item !== id);
      setOpenIds(next);
      if (activeId === id) setActiveId(next[Math.max(0, index - 1)]);
    },
    [openIds, activeId],
  );

  const toggleTerminal = useCallback(() => setTerminalPref(!terminalOpen), [terminalOpen]);

  // Returning visitors in this session skip the boot splash.
  useEffect(() => {
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {
      // Splash simply replays next time.
    }
  }, []);

  // Deep links: #skills opens skills.json. In-content links use hashes too.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) openFile(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [openFile]);

  useEffect(() => {
    const hash = activeId === defaultFileId && !window.location.hash ? "" : `#${activeId}`;
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash || window.location.pathname);
    baseTitle.current ??= document.title;
    const name = byId.get(activeId)?.name;
    document.title = activeId === defaultFileId || !name ? baseTitle.current : `${name} — ${baseTitle.current}`;
  }, [activeId, defaultFileId, byId]);

  // Remember scroll position per file, like a real editor.
  useLayoutEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    scrollPositions.current.set(previousActive.current, editor.scrollTop);
    editor.scrollTop = scrollPositions.current.get(activeId) ?? 0;
    previousActive.current = activeId;
  }, [activeId]);

  // Global shortcuts.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const mod = event.ctrlKey || event.metaKey;
      if (mod && (event.key === "k" || event.key === "p")) {
        event.preventDefault();
        setPaletteOpen(true);
      } else if (mod && event.key === "`") {
        event.preventDefault();
        toggleTerminal();
      } else if (mod && event.key === "b") {
        event.preventDefault();
        setSidebarOpen((value) => !value);
      } else if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleTerminal]);

  const paletteItems = useMemo<PaletteItem[]>(
    () => [
      ...metas.map((file) => ({
        id: `file-${file.id}`,
        label: file.name,
        hint: file.folder ? `${file.folder}/ · ${file.description}` : file.description,
        group: "Files" as const,
        icon: <FileIcon kind={file.kind} />,
        run: () => (file.href ? window.open(file.href, "_blank", "noopener") : openFile(file.id)),
      })),
      {
        id: "cmd-theme",
        label: "Toggle theme",
        hint: "Switch between dark and light",
        group: "Commands",
        icon: <Moon aria-hidden className="size-4 text-subtle" />,
        run: () => setTheme(),
      },
      {
        id: "cmd-terminal",
        label: "Toggle terminal",
        hint: "Ctrl + `",
        group: "Commands",
        icon: <SquareTerminal aria-hidden className="size-4 text-subtle" />,
        run: toggleTerminal,
      },
      {
        id: "cmd-resume",
        label: "Download resume",
        hint: "resume.pdf",
        group: "Commands",
        icon: <Download aria-hidden className="size-4 text-subtle" />,
        run: () => {
          const link = document.createElement("a");
          link.href = resumeUrl;
          link.download = "";
          link.click();
        },
      },
      {
        id: "cmd-github",
        label: "Open GitHub profile",
        hint: githubUrl.replace("https://", ""),
        group: "Commands",
        icon: <GitHubIcon className="size-4 text-subtle" />,
        run: () => window.open(githubUrl, "_blank", "noopener"),
      },
      {
        id: "cmd-email",
        label: "Send an email",
        hint: email,
        group: "Commands",
        icon: <Mail aria-hidden className="size-4 text-subtle" />,
        run: () => {
          window.location.href = `mailto:${email}`;
        },
      },
    ],
    [metas, openFile, toggleTerminal, resumeUrl, githubUrl, email],
  );

  const active = byId.get(activeId);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-ide-editor text-foreground">
      <TitleBar
        onMenu={() => setDrawerOpen(true)}
        onPalette={() => setPaletteOpen(true)}
        onToggleSidebar={() => setSidebarOpen((value) => !value)}
        onToggleTerminal={toggleTerminal}
        resumeUrl={resumeUrl}
      />

      <div className="flex min-h-0 flex-1">
        <ActivityBar
          sidebarOpen={sidebarOpen}
          onExplorer={() => setSidebarOpen((value) => !value)}
          onSearch={() => setPaletteOpen(true)}
          onExtensions={() => openFile("skills")}
          onTerminal={toggleTerminal}
          githubUrl={githubUrl}
        />

        {sidebarOpen ? (
          <aside className="hidden w-60 shrink-0 border-r border-border bg-ide-sidebar md:block lg:w-64">
            <Explorer files={metas} activeId={activeId} onOpen={openFile} />
          </aside>
        ) : null}

        <AnimatePresence>
          {drawerOpen ? (
            <>
              <m.div
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
              />
              <m.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
                className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-border bg-ide-sidebar md:hidden"
              >
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close explorer"
                  className="absolute top-1.5 right-2 rounded p-1.5 text-subtle hover:bg-ide-hover hover:text-foreground"
                >
                  <X aria-hidden className="size-4" />
                </button>
                <Explorer files={metas} activeId={activeId} onOpen={openFile} />
              </m.aside>
            </>
          ) : null}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <TabBar files={openIds.map((id) => byId.get(id)!).filter(Boolean)} activeId={activeId} onSelect={setActiveId} onClose={closeFile} />
          <Breadcrumbs file={active} />

          <main id="main" className="relative flex min-h-0 flex-1">
            <div ref={editorRef} className="ide-scroll min-h-0 flex-1 overflow-y-auto" tabIndex={-1}>
              <EditorBody files={files} activeId={activeId} />
            </div>
            <Minimap />
          </main>

          <Terminal data={terminal} files={metas} open={terminalOpen} onToggle={toggleTerminal} onOpenFile={openFile} />
        </div>
      </div>

      <StatusBar language={active?.language ?? ""} onContact={() => openFile("contact")} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} items={paletteItems} />
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function TitleBar({
  onMenu,
  onPalette,
  onToggleSidebar,
  onToggleTerminal,
  resumeUrl,
}: {
  onMenu: () => void;
  onPalette: () => void;
  onToggleSidebar: () => void;
  onToggleTerminal: () => void;
  resumeUrl: string;
}) {
  const menu: [string, (() => void) | undefined][] = [
    ["File", onPalette],
    ["Edit", undefined],
    ["View", onToggleSidebar],
    ["Go", onPalette],
    ["Terminal", onToggleTerminal],
  ];
  return (
    <header className="flex h-11 shrink-0 items-center gap-3 border-b border-border bg-ide-titlebar px-3">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open explorer"
        className="rounded p-1.5 text-muted hover:bg-ide-hover hover:text-foreground md:hidden"
      >
        <Menu aria-hidden className="size-4" />
      </button>
      <div className="hidden items-center gap-1.5 md:flex" aria-hidden>
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <span className="grid size-6 place-items-center rounded-md bg-accent-gradient font-mono text-[0.6rem] font-bold text-white">OT</span>
      <nav aria-label="Menu" className="hidden items-center lg:flex">
        {menu.map(([label, action]) =>
          action ? (
            <button key={label} type="button" onClick={action} className="rounded px-2 py-1 text-xs text-muted hover:bg-ide-hover hover:text-foreground">
              {label}
            </button>
          ) : (
            <span key={label} className="px-2 py-1 text-xs text-subtle">
              {label}
            </span>
          ),
        )}
      </nav>

      <button
        type="button"
        onClick={onPalette}
        className="mx-auto flex h-7 w-full max-w-md min-w-0 items-center gap-2 rounded-md border border-border bg-ide-editor/60 px-3 text-xs text-subtle transition-colors hover:border-border-strong hover:text-muted"
      >
        <Search aria-hidden className="size-3.5 shrink-0" />
        <span className="truncate">orl-tokata — search files &amp; commands</span>
        <kbd className="ml-auto hidden rounded border border-border px-1.5 font-mono text-[0.6rem] sm:inline">Ctrl K</kbd>
      </button>

      <div className="flex items-center gap-2">
        <ThemeToggle className="size-8" />
        <a
          href={resumeUrl}
          download
          className="hidden h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background transition-transform hover:-translate-y-px active:scale-95 sm:inline-flex"
        >
          <Download aria-hidden className="size-3.5" />
          Resume
        </a>
      </div>
    </header>
  );
}

function ActivityBar({
  sidebarOpen,
  onExplorer,
  onSearch,
  onExtensions,
  onTerminal,
  githubUrl,
}: {
  sidebarOpen: boolean;
  onExplorer: () => void;
  onSearch: () => void;
  onExtensions: () => void;
  onTerminal: () => void;
  githubUrl: string;
}) {
  const item = "relative grid size-12 place-items-center text-subtle transition-colors hover:text-foreground";
  return (
    <nav aria-label="Activity bar" className="hidden w-12 shrink-0 flex-col items-center border-r border-border bg-ide-activity md:flex">
      <button type="button" onClick={onExplorer} aria-label="Toggle explorer (Ctrl+B)" aria-pressed={sidebarOpen} className={cn(item, sidebarOpen && "text-foreground")}>
        {sidebarOpen ? <span aria-hidden className="absolute inset-y-2 left-0 w-0.5 bg-accent-cyan" /> : null}
        <Files aria-hidden className="size-5" />
      </button>
      <button type="button" onClick={onSearch} aria-label="Search (Ctrl+K)" className={item}>
        <Search aria-hidden className="size-5" />
      </button>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={item}>
        <GitBranch aria-hidden className="size-5" />
      </a>
      <button type="button" onClick={onExtensions} aria-label="Skills" className={item}>
        <Blocks aria-hidden className="size-5" />
      </button>
      <button type="button" onClick={onTerminal} aria-label="Toggle terminal (Ctrl+`)" className={cn(item, "mt-auto")}>
        <SquareTerminal aria-hidden className="size-5" />
      </button>
      <span className={cn(item, "cursor-default")} aria-hidden>
        <Settings className="size-5" />
      </span>
    </nav>
  );
}

function TabBar({
  files,
  activeId,
  onSelect,
  onClose,
}: {
  files: IdeFileMeta[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}) {
  return (
    <div role="tablist" aria-label="Open files" className="ide-scroll flex h-10 shrink-0 overflow-x-auto border-b border-border bg-ide-tab [scrollbar-width:none]">
      {files.map((file) => {
        const isActive = file.id === activeId;
        return (
          <div
            key={file.id}
            className={cn(
              "group relative flex shrink-0 items-center border-r border-border text-[0.8rem]",
              isActive ? "bg-ide-editor text-foreground" : "text-subtle hover:bg-ide-hover hover:text-muted",
            )}
          >
            {isActive ? (
              <m.span layoutId="ide-active-tab" className="absolute inset-x-0 top-0 h-0.5 bg-accent-gradient" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
            ) : null}
            <button
              type="button"
              role="tab"
              id={`tab-${file.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${file.id}`}
              onClick={() => onSelect(file.id)}
              onAuxClick={(event) => event.button === 1 && onClose(file.id)}
              className="flex h-full items-center gap-1.5 pr-1 pl-3"
            >
              <FileIcon kind={file.kind} />
              {file.name}
            </button>
            <button
              type="button"
              onClick={() => onClose(file.id)}
              aria-label={`Close ${file.name}`}
              className={cn(
                "mr-1.5 rounded p-0.5 transition-opacity hover:bg-ide-hover",
                files.length === 1 ? "invisible" : isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
              )}
            >
              <X aria-hidden className="size-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Breadcrumbs({ file }: { file?: IdeFileMeta }) {
  if (!file) return null;
  return (
    <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-border px-4 font-mono text-[0.7rem] text-subtle">
      <span>portfolio</span>
      {file.folder ? (
        <>
          <span aria-hidden>›</span>
          <span>{file.folder}</span>
        </>
      ) : null}
      <span aria-hidden>›</span>
      <FileIcon kind={file.kind} className="w-auto" />
      <span className="text-muted">{file.name}</span>
    </div>
  );
}

/** Line-number gutter sized to the visible panel, plus every panel rendered (inactive ones hidden). */
function EditorBody({ files, activeId }: { files: IdeFile[]; activeId: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(60);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      setLineCount(Math.max(30, Math.ceil(entry.contentRect.height / LINE_HEIGHT)));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const numbers = useMemo(() => Array.from({ length: lineCount }, (_, i) => i + 1).join("\n"), [lineCount]);

  return (
    <div className="flex min-h-full">
      <pre
        aria-hidden
        className="hidden w-14 shrink-0 select-none border-r border-border/60 pt-8 pr-4 text-right font-mono text-[0.72rem] leading-6 text-ide-line sm:block"
      >
        {numbers}
      </pre>
      <div ref={contentRef} className="min-w-0 flex-1 px-5 pt-8 pb-16 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-6xl">
          {files
            .filter((file) => file.content)
            .map((file) => (
              <section
                key={file.id}
                id={`panel-${file.id}`}
                role="tabpanel"
                aria-label={file.name}
                hidden={file.id !== activeId}
                className="animate-file-open"
              >
                {file.content}
              </section>
            ))}
        </div>
      </div>
    </div>
  );
}

/** Decorative minimap, like the code overview on the right edge of an editor. */
function Minimap() {
  const widths = [60, 85, 40, 72, 90, 30, 66, 80, 45, 70, 55, 88, 35, 62, 78, 50, 82, 40, 68, 74];
  return (
    <div aria-hidden className="pointer-events-none hidden w-20 shrink-0 border-l border-border/60 px-3 pt-8 xl:block">
      <div className="space-y-1.5 opacity-50">
        {widths.map((width, index) => (
          <div
            key={index}
            className={cn("h-1 rounded-full", index % 5 === 0 ? "bg-syn-keyword/60" : index % 3 === 0 ? "bg-syn-string/50" : "bg-border-strong")}
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
      <div className="mt-4 h-24 rounded-sm bg-ide-hover" />
    </div>
  );
}

function StatusBar({ language, onContact }: { language: string; onContact: () => void }) {
  return (
    <footer className="flex h-6 shrink-0 items-center justify-between gap-4 bg-ide-status px-3 font-mono text-[0.65rem] text-white/85">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <GitBranch aria-hidden className="size-3" /> main
        </span>
        <span className="hidden items-center gap-1 sm:flex">
          <Check aria-hidden className="size-3" /> 0 problems
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">{language}</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden lg:inline">Phnom Penh · UTC+7</span>
        <button type="button" onClick={onContact} className="flex items-center gap-1.5 rounded px-1 hover:bg-white/10">
          <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
          Open to opportunities
        </button>
        <Bell aria-hidden className="hidden size-3 sm:block" />
      </div>
    </footer>
  );
}
