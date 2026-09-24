"use client";

/**
 * The page is statically generated, so the server renders the build-time year
 * and the client re-renders with the visitor's current year on hydration.
 */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
