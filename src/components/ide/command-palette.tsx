"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { CornerDownLeft, Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface PaletteItem {
  id: string;
  label: string;
  hint: string;
  group: "Files" | "Commands";
  icon: React.ReactNode;
  run: () => void;
}

/** Case-insensitive subsequence match, so "exjs" still finds "experience.ts". */
function isSubsequence(query: string, text: string): boolean {
  let position = 0;
  for (const char of query) {
    position = text.indexOf(char, position);
    if (position === -1) return false;
    position += 1;
  }
  return true;
}

/** Lower is better: label prefix → label substring → hint substring → fuzzy. Null = no match. */
function score(query: string, item: PaletteItem): number | null {
  const label = item.label.toLowerCase();
  const hint = item.hint.toLowerCase();
  if (label.startsWith(query)) return 0;
  if (label.includes(query)) return 1;
  if (hint.includes(query)) return 2;
  if (isSubsequence(query, `${label} ${hint}`)) return 3;
  return null;
}

export function CommandPalette({ open, onClose, items }: { open: boolean; onClose: () => void; items: PaletteItem[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const groups: PaletteItem["group"][] = ["Files", "Commands"];
    return groups.flatMap((group) =>
      items
        .filter((item) => item.group === group)
        .map((item) => ({ item, rank: score(q, item) }))
        .filter((entry): entry is { item: PaletteItem; rank: number } => entry.rank !== null)
        .sort((a, b) => a.rank - b.rank)
        .map((entry) => entry.item),
    );
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      restoreFocus.current?.focus?.();
    };
  }, [open]);

  const close = () => {
    setQuery("");
    setActive(0);
    onClose();
  };

  const choose = (item: PaletteItem | undefined) => {
    if (!item) return;
    close();
    item.run();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(results[active]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      // Keep focus inside the dialog: the input is its only focusable element.
      event.preventDefault();
    }
  };

  let lastGroup: PaletteItem["group"] | null = null;

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(event) => event.target === event.currentTarget && close()}
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border-strong bg-ide-sidebar shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search aria-hidden className="size-4 text-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                placeholder="Search files and commands…"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
                aria-autocomplete="list"
                className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-subtle">Esc</kbd>
            </div>

            <ul id={listId} role="listbox" aria-label="Results" className="ide-scroll max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-subtle">No matching files or commands.</li>
              ) : (
                results.map((item, index) => {
                  const header = item.group !== lastGroup ? item.group : null;
                  lastGroup = item.group;
                  return (
                    <li key={item.id} role="presentation">
                      {header ? (
                        <p role="presentation" className="px-3 pt-2 pb-1 font-mono text-[0.65rem] tracking-wider text-subtle uppercase">
                          {header}
                        </p>
                      ) : null}
                      <div
                        id={`${listId}-${item.id}`}
                        role="option"
                        aria-selected={index === active}
                        onMouseMove={() => setActive(index)}
                        onClick={() => choose(item)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm",
                          index === active ? "bg-ide-active text-foreground" : "text-muted",
                        )}
                      >
                        {item.icon}
                        <span className="text-foreground">{item.label}</span>
                        <span className="truncate text-xs text-subtle">{item.hint}</span>
                        {index === active ? <CornerDownLeft aria-hidden className="ml-auto size-3.5 shrink-0 text-subtle" /> : null}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
