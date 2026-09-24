import type { ContributionDay, GitHubRepo, LanguageShare } from "@/types";

/**
 * Placeholder data rendered when the GitHub API is unavailable (offline builds,
 * rate limiting, or no username configured). Shapes match the live API mapping
 * in `src/lib/github.ts`, so components never need to know the source.
 */
export const mockLanguages: LanguageShare[] = [
  { name: "Java", percent: 42, color: "#e76f00" },
  { name: "TypeScript", percent: 31, color: "#3178c6" },
  { name: "JavaScript", percent: 12, color: "#f1e05a" },
  { name: "SQL", percent: 9, color: "#336791" },
  { name: "CSS", percent: 6, color: "#663399" },
];

export const mockRepos: GitHubRepo[] = [
  {
    name: "spring-boot-banking-starter",
    description: "Opinionated Spring Boot starter for integrating with banking REST APIs.",
    url: "https://github.com/Orl-tokata",
    language: "Java",
    stars: 0,
    forks: 0,
  },
  {
    name: "nextjs-enterprise-ui",
    description: "Reusable, typed Next.js UI patterns for data-heavy enterprise screens.",
    url: "https://github.com/Orl-tokata",
    language: "TypeScript",
    stars: 0,
    forks: 0,
  },
  {
    name: "portfolio",
    description: "This portfolio — Next.js App Router frontend with a Spring Boot contact API.",
    url: "https://github.com/Orl-tokata",
    language: "TypeScript",
    stars: 0,
    forks: 0,
  },
];

/** Deterministic pseudo-random activity so server and client renders match. */
export function createMockContributions(weeks = 26, seed = 7): ContributionDay[] {
  const days: ContributionDay[] = [];
  const end = new Date(Date.UTC(2026, 8, 19));
  let state = seed;
  const random = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };

  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const date = new Date(end);
    date.setUTCDate(end.getUTCDate() - i);
    const weekday = date.getUTCDay();
    const weekend = weekday === 0 || weekday === 6;
    const roll = random();
    const count = weekend ? (roll > 0.8 ? Math.round(roll * 3) : 0) : Math.round(roll * roll * 12);
    const level = (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4) as ContributionDay["level"];
    days.push({ date: date.toISOString().slice(0, 10), count, level });
  }
  return days;
}
