import "server-only";

import { createMockContributions, mockLanguages, mockRepos } from "@/data/github-mock";
import { featuredRepos as featuredConfig } from "@/data/profile";
import type { ContributionDay, GitHubRepo, GitHubSummary, LanguageShare } from "@/types";

const API = "https://api.github.com";

const LANGUAGE_COLORS: Record<string, string> = {
  Java: "#e76f00",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#663399",
  SQL: "#336791",
  PLpgSQL: "#336791",
  Shell: "#89e051",
  Kotlin: "#a97bff",
  Python: "#3572a5",
  Dockerfile: "#384d54",
};

interface ApiUser {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
  created_at: string;
}

interface ApiRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

interface ContributionsResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
        };
      };
    };
  };
}

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: headers(),
    cache: "force-cache",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`GitHub API ${path} responded ${response.status}`);
  return (await response.json()) as T;
}

/** Contribution calendar requires the GraphQL API and therefore a token. */
async function getContributions(username: string): Promise<{ total: number; days: ContributionDay[] } | null> {
  if (!process.env.GITHUB_TOKEN) return null;
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const response = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ query, variables: { login: username } }),
    cache: "force-cache",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) return null;
  const json = (await response.json()) as ContributionsResponse;
  const calendar = json.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) return null;
  const days = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .slice(-26 * 7)
    .map((day) => ({ date: day.date, count: day.contributionCount, level: LEVELS[day.contributionLevel] ?? 0 }));
  return { total: calendar.totalContributions, days };
}

function toLanguageShares(repos: ApiRepo[]): LanguageShare[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const total = [...counts.values()].reduce((sum, n) => sum + n, 0);
  if (total === 0) return [];
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / total) * 100),
      color: LANGUAGE_COLORS[name] ?? "#8b949e",
    }));
}

function toRepo(repo: ApiRepo): GitHubRepo {
  return {
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  };
}

/** Configured featured repos first (in order), then the most recently pushed ones. */
function pickFeatured(repos: ApiRepo[]): GitHubRepo[] {
  const byName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));
  const configured = featuredConfig.flatMap(({ name, description }) => {
    const repo = byName.get(name.toLowerCase());
    return repo ? [{ ...toRepo(repo), description: description ?? repo.description }] : [];
  });
  if (configured.length > 0) return configured;
  return [...repos].sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)).slice(0, 3).map(toRepo);
}

function mockSummary(username: string): GitHubSummary {
  const days = createMockContributions();
  return {
    username,
    profileUrl: `https://github.com/${username}`,
    publicRepos: 12,
    followers: 0,
    contributions: { total: days.reduce((sum, day) => sum + day.count, 0), days },
    languages: mockLanguages,
    featuredRepos: mockRepos,
    isMock: true,
  };
}

/**
 * Fetches a GitHub profile summary at build time (redeploy to refresh). If the
 * API is unreachable the whole section falls back to clearly-labelled sample
 * data; real and sample data are never mixed.
 */
export async function getGitHubSummary(username: string): Promise<GitHubSummary> {
  if (process.env.GITHUB_DISABLE_FETCH === "true") return mockSummary(username);

  try {
    const [user, repos, contributions] = await Promise.all([
      getJson<ApiUser>(`/users/${encodeURIComponent(username)}`),
      getJson<ApiRepo[]>(`/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`),
      getContributions(username),
    ]);

    const ownRepos = repos.filter((repo) => !repo.fork && !repo.archived);

    return {
      username: user.login,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      memberSince: user.created_at.slice(0, 4),
      contributions,
      languages: toLanguageShares(ownRepos),
      featuredRepos: pickFeatured(ownRepos),
      isMock: false,
    };
  } catch {
    return mockSummary(username);
  }
}
