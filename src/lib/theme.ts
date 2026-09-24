import { THEME_STORAGE_KEY } from "@/components/layout/theme-script";

export type Theme = "dark" | "light";

export function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Applies a theme (or toggles when omitted) and remembers it. Returns the applied theme. */
export function setTheme(next?: Theme): Theme {
  const theme = next ?? (currentTheme() === "dark" ? "light" : "dark");
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage may be unavailable (private mode); the change still applies for this visit.
  }
  return theme;
}
