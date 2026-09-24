"use client";

import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { setTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import type { IdeFileMeta, TerminalData } from "./types";

interface Line {
  id: number;
  kind: "input" | "output";
  content: React.ReactNode;
}

interface TerminalProps {
  data: TerminalData;
  files: IdeFileMeta[];
  open: boolean;
  onToggle: () => void;
  onOpenFile: (id: string) => void;
}

const PROMPT = "orl@portfolio:~$";
const TYPE_SPEED_MS = 38;
const MAX_LINES = 200;

const COMMANDS: Record<string, string> = {
  help: "List available commands",
  whoami: "Who is Orl?",
  skills: "Tech stack by category",
  experience: "Work history",
  projects: "List projects (click to open)",
  github: "Open github.yml",
  contact: "How to reach me",
  resume: "Download my resume",
  social: "Profile links",
  ls: "List files",
  open: "Open a file — e.g. open skills.json",
  theme: "Toggle theme — theme dark | light",
  clear: "Clear the terminal",
  exit: "Close the terminal panel",
};

export function Terminal({ data, files, open, onToggle, onOpenFile }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState<string | null>(null);
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoplay = useRef<{ cancel: () => void } | null>(null);

  const fileNames = useMemo(() => files.filter((file) => !file.href).map((file) => file.name), [files]);

  const push = useCallback((kind: Line["kind"], content: React.ReactNode) => {
    setLines((prev) => [...prev, { id: nextId.current++, kind, content }].slice(-MAX_LINES));
  }, []);

  const FileLink = useCallback(
    ({ id, children }: { id: string; children: React.ReactNode }) => (
      <button type="button" onClick={() => onOpenFile(id)} className="text-syn-fn underline decoration-dotted underline-offset-4 hover:decoration-solid">
        {children}
      </button>
    ),
    [onOpenFile],
  );

  /** Returns the output for a command, or null for commands with side effects only. */
  const run = useCallback(
    (raw: string): React.ReactNode | null => {
      const [command = "", ...args] = raw.trim().split(/\s+/);
      const arg = args.join(" ");
      switch (command.toLowerCase()) {
        case "":
          return null;
        case "help":
          return (
            <div className="grid gap-x-6 sm:grid-cols-[8rem_1fr]">
              {Object.entries(COMMANDS).map(([name, description]) => (
                <div key={name} className="contents">
                  <span className="text-syn-fn">{name}</span>
                  <span className="text-muted">{description}</span>
                </div>
              ))}
            </div>
          );
        case "whoami":
        case "about":
          return (
            <>
              <span className="text-foreground">{data.name}</span> — {data.role} @ {data.company}
              <br />
              <span className="text-muted">{data.summary}</span>
            </>
          );
        case "skills":
          return data.skills.map((group) => (
            <div key={group.title}>
              <span className="inline-block w-32 text-syn-prop">{group.title.toLowerCase()}</span>
              <span className="text-syn-string">{group.items.join(" · ")}</span>
            </div>
          ));
        case "experience":
          return data.experience.map((job) => (
            <div key={job.company}>
              <span className="inline-block w-32 text-syn-number">{job.period}</span>
              {job.role} <span className="text-muted">@</span> <span className="text-syn-type">{job.company}</span>
            </div>
          ));
        case "projects":
          return data.projects.map((project, index) => (
            <div key={project.fileId}>
              <span className="text-muted">{String(index + 1).padStart(2, "0")} </span>
              <FileLink id={project.fileId}>{project.title}</FileLink>
            </div>
          ));
        case "github":
          onOpenFile("github");
          return <>Opening github.yml…</>;
        case "contact":
          onOpenFile("contact");
          return (
            <>
              ✉ <a className="text-syn-string underline underline-offset-4" href={`mailto:${data.email}`}>{data.email}</a> · opened contact.sh
            </>
          );
        case "resume": {
          const link = document.createElement("a");
          link.href = data.resumeUrl;
          link.download = "";
          link.click();
          return <>Downloading resume.pdf…</>;
        }
        case "social":
        case "links":
          return data.socials.map((social) => (
            <div key={social.label}>
              <span className="inline-block w-24 text-syn-prop">{social.label}</span>
              <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-syn-fn underline underline-offset-4">
                {social.href.replace(/^mailto:/, "")}
              </a>
            </div>
          ));
        case "ls":
          return (
            <div className="flex flex-wrap gap-x-5">
              {files.map((file) => (
                <span key={file.id} className={file.folder ? "text-syn-type" : "text-foreground"}>
                  {file.folder ? `${file.folder}/` : ""}
                  {file.name}
                </span>
              ))}
            </div>
          );
        case "open":
        case "cat":
        case "code": {
          const target = files.find((file) => file.name.toLowerCase() === arg.toLowerCase() || file.id === arg.toLowerCase());
          if (!target) return <span className="text-syn-prop">No such file: {arg || "(missing name)"}. Try `ls`.</span>;
          if (target.href) {
            window.open(target.href, "_blank", "noopener");
            return <>Opening {target.name}…</>;
          }
          onOpenFile(target.id);
          return <>Opened {target.name}</>;
        }
        case "theme": {
          const applied = setTheme(arg === "dark" || arg === "light" ? arg : undefined);
          return <>Theme set to {applied}.</>;
        }
        case "date":
          return new Date().toString();
        case "echo":
          return arg;
        case "pwd":
          return "/home/orl/portfolio";
        case "cd":
          return "Everything lives in one folder — try `ls`.";
        case "sudo":
          return <>Permission denied. Nice try 😄 — but you can <FileLink id="contact">hire me</FileLink> instead.</>;
        case "clear":
          setLines([]);
          return null;
        case "exit":
          onToggle();
          return null;
        default:
          return (
            <>
              command not found: <span className="text-syn-prop">{command}</span>. Type <span className="text-syn-fn">help</span> to see what I can do.
            </>
          );
      }
    },
    [data, files, onOpenFile, onToggle, FileLink],
  );

  const execute = useCallback(
    (command: string) => {
      push("input", command);
      const output = run(command);
      if (output !== null && output !== "") push("output", output);
    },
    [push, run],
  );

  // Latest `execute` for the one-time intro below, without restarting it when callbacks change.
  const executeRef = useRef(execute);
  useEffect(() => {
    executeRef.current = execute;
  }, [execute]);

  // Auto-typed intro (runs once). Any user interaction finishes it instantly.
  useEffect(() => {
    const execute = (command: string) => executeRef.current(command);
    const script: string[] = ["whoami", "skills"];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const booted = document.documentElement.hasAttribute("data-booted");
    const timers: number[] = [];
    let cancelled = false;
    let step = 0;

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      timers.forEach(window.clearTimeout);
      setTyping(null);
      script.slice(step).forEach(execute);
      push("output", <Hint />);
      autoplay.current = null;
    };
    autoplay.current = { cancel: finish };

    if (reduceMotion) {
      finish();
      return;
    }

    const typeCommand = (command: string, done: () => void) => {
      let index = 0;
      const tick = () => {
        if (cancelled) return;
        index += 1;
        setTyping(command.slice(0, index));
        if (index < command.length) timers.push(window.setTimeout(tick, TYPE_SPEED_MS));
        else
          timers.push(
            window.setTimeout(() => {
              if (cancelled) return;
              setTyping(null);
              execute(command);
              step += 1;
              done();
            }, 260),
          );
      };
      timers.push(window.setTimeout(tick, TYPE_SPEED_MS));
    };

    const next = () => {
      if (cancelled) return;
      if (step >= script.length) {
        cancelled = true;
        autoplay.current = null;
        push("output", <Hint />);
        return;
      }
      timers.push(window.setTimeout(() => typeCommand(script[step], next), 450));
    };

    timers.push(window.setTimeout(next, booted ? 300 : 2100));
    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [push]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines, typing]);

  const interrupt = () => autoplay.current?.cancel();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    interrupt();
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const items = history.current;
      if (items.length === 0) return;
      historyIndex.current =
        event.key === "ArrowUp"
          ? Math.min(items.length - 1, historyIndex.current + 1)
          : Math.max(-1, historyIndex.current - 1);
      setValue(historyIndex.current === -1 ? "" : items[items.length - 1 - historyIndex.current]);
    } else if (event.key === "Tab") {
      event.preventDefault();
      const [command, ...rest] = value.split(" ");
      if (rest.length === 0) {
        const match = Object.keys(COMMANDS).find((name) => name.startsWith(command.toLowerCase()));
        if (match) setValue(`${match} `);
      } else {
        const partial = rest.join(" ").toLowerCase();
        const match = fileNames.find((name) => name.toLowerCase().startsWith(partial));
        if (match) setValue(`${command} ${match}`);
      }
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    interrupt();
    const command = value;
    if (command.trim()) history.current.push(command.trim());
    historyIndex.current = -1;
    setValue("");
    execute(command);
  };

  return (
    <section aria-label="Terminal" className={cn("flex min-h-0 flex-col border-t border-border bg-ide-panel", open ? "h-56 lg:h-60" : "h-9")}>
      <div className="flex h-9 shrink-0 items-center justify-between gap-3 px-3 font-mono text-[0.7rem] tracking-wide text-subtle uppercase">
        <div className="flex items-center gap-4">
          <button type="button" onClick={onToggle} className="border-b border-accent-cyan py-1.5 text-foreground">
            Terminal
          </button>
          <span className="hidden sm:inline">Problems <span className="text-accent-emerald">0</span></span>
          <span className="hidden sm:inline">Output</span>
        </div>
        <div className="flex items-center gap-1">
          {open ? (
            <button type="button" onClick={() => setLines([])} aria-label="Clear terminal" className="rounded p-1 hover:bg-ide-hover hover:text-foreground">
              <Trash2 aria-hidden className="size-3.5" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onToggle}
            aria-label={open ? "Collapse terminal" : "Expand terminal"}
            aria-expanded={open}
            className="rounded p-1 hover:bg-ide-hover hover:text-foreground"
          >
            {open ? <ChevronDown aria-hidden className="size-4" /> : <ChevronUp aria-hidden className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="ide-scroll min-h-0 flex-1 cursor-text overflow-y-auto px-4 pb-3 font-mono text-[0.78rem] leading-6"
        >
          <div role="log" aria-live="polite" aria-label="Terminal output">
            <p className="text-subtle">
              Portfolio shell v1.0 — type <span className="text-syn-fn">help</span> and press Enter.
            </p>
            {lines.map((line) =>
              line.kind === "input" ? (
                <p key={line.id} className="mt-1 break-words">
                  <span className="text-accent-emerald">{PROMPT}</span> <span className="text-foreground">{line.content}</span>
                </p>
              ) : (
                <div key={line.id} className="break-words text-foreground/90">
                  {line.content}
                </div>
              ),
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-2">
            <label htmlFor="terminal-input" className="shrink-0 text-accent-emerald">
              {PROMPT}
            </label>
            {typing !== null ? (
              <span aria-hidden className="text-foreground">
                {typing}
                <span className="ml-px inline-block h-4 w-[7px] translate-y-0.5 bg-accent-cyan motion-safe:animate-blink" />
              </span>
            ) : null}
            <input
              id="terminal-input"
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={interrupt}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal command"
              className={cn(
                "min-w-0 flex-1 bg-transparent text-foreground caret-accent-cyan outline-none",
                typing !== null && "sr-only",
              )}
            />
          </form>
        </div>
      ) : null}
    </section>
  );
}

function Hint() {
  return (
    <p className="mt-1 text-subtle">
      ↳ Type <span className="text-syn-fn">help</span> for all commands, try <span className="text-syn-fn">projects</span>, or open any file in the explorer.
    </p>
  );
}
