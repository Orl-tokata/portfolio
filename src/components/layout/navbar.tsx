"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex animate-fade-down h-14 max-w-6xl items-center justify-between gap-4 rounded-full border px-3 pl-4 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open
            ? "border-border bg-background/70 shadow-card backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <a href="#home" className="group flex items-center gap-2.5" aria-label={`${profile.name} — back to top`}>
          <span className="relative grid size-8 place-items-center rounded-lg bg-accent-gradient font-mono text-xs font-semibold text-white shadow-[0_0_20px_-4px_var(--accent-blue)]">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-foreground sm:inline">
            {profile.name}
            <span className="text-accent-cyan">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative isolate block rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {isActive ? (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-border bg-surface-muted"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href={profile.resumeUrl} download size="sm" className="hidden sm:inline-flex">
            <Download aria-hidden className="size-3.5" />
            Resume
          </Button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl origin-top rounded-3xl border border-border bg-background/95 p-3 shadow-card backdrop-blur-xl lg:hidden"
          >
            <ul className="grid gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-base transition-colors",
                      active === item.id ? "bg-surface-muted text-foreground" : "text-muted hover:bg-surface-muted/60",
                    )}
                  >
                    {item.label}
                    {active === item.id ? <span aria-hidden className="size-1.5 rounded-full bg-accent-cyan" /> : null}
                  </a>
                </li>
              ))}
            </ul>
            <Button href={profile.resumeUrl} download className="mt-3 w-full" onClick={() => setOpen(false)}>
              <Download aria-hidden className="size-4" />
              Download Resume
            </Button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
