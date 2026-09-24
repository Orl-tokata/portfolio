"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { setTheme } from "@/lib/theme";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
// Dark is the server default (see <html className="dark">).
const getServerSnapshot = () => true;

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => setTheme(), []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-border text-muted",
        "transition-colors hover:border-border-strong hover:text-foreground active:scale-95",
        className,
      )}
    >
      <Sun
        aria-hidden
        className={cn("absolute size-4 transition-all duration-300", isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")}
      />
      <Moon
        aria-hidden
        className={cn("absolute size-4 transition-all duration-300", isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")}
      />
    </button>
  );
}
