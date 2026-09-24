import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { ContributionGraph } from "@/components/sections/github/contribution-graph";
import { LanguageBar, RepoCard } from "@/components/sections/github/github-parts";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { getGitHubSummary } from "@/lib/github";
import { CodeLine, Comment, FileHeading, Num, Prop, Punct, Str } from "../code";

export async function GitHubFile() {
  const summary = await getGitHubSummary(profile.githubUsername);

  const fields: [string, React.ReactNode][] = [
    ["user", <Str key="u">{summary.username}</Str>],
    ["public_repos", <Num key="r">{summary.publicRepos}</Num>],
    ...(summary.memberSince ? ([["member_since", <Num key="m">{summary.memberSince}</Num>]] as [string, React.ReactNode][]) : []),
    ["top_language", <Str key="t">{summary.languages[0]?.name ?? "—"}</Str>],
  ];

  return (
    <article aria-labelledby="github-title">
      <FileHeading
        id="github"
        comment="# github.yml — fetched from the GitHub API at build time"
        title="On GitHub."
        subtitle="Personal projects, experiments and practice repositories. Company code stays private."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_1.3fr]">
        <div className="min-w-0 animate-file-open space-y-5" style={{ animationDelay: "0.1s" }}>
          <div className="rounded-xl border border-border bg-ide-panel/60 p-5">
            <dl>
              {fields.map(([key, value]) => (
                <CodeLine key={key}>
                  <dt className="inline">
                    <Prop>{key}</Prop>
                    <Punct>:</Punct>{" "}
                  </dt>
                  <dd className="inline">{value}</dd>
                </CodeLine>
              ))}
            </dl>
            <div className="mt-5">
              <Button href={summary.profileUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                <GitHubIcon className="size-4" />
                View GitHub profile
                <ArrowUpRight aria-hidden className="size-3.5" />
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-ide-panel/60 p-5">
            <h3 className="font-mono text-sm text-foreground">
              <Prop>languages</Prop>
              <Punct>:</Punct>
            </h3>
            <LanguageBar languages={summary.languages} />
          </div>
        </div>

        <div className="min-w-0 animate-file-open space-y-5" style={{ animationDelay: "0.18s" }}>
          <div className="rounded-xl border border-border bg-ide-panel/60 p-5">
            <h3 className="mb-4 font-mono text-sm text-foreground">
              <Prop>activity</Prop>
              <Punct>:</Punct>
            </h3>
            {summary.contributions ? (
              <ContributionGraph days={summary.contributions.days} total={summary.contributions.total} />
            ) : (
              <a
                href={summary.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-grid flex items-center justify-between gap-4 rounded-lg border border-dashed border-border-strong px-5 py-7 text-sm text-muted transition-colors hover:border-accent-cyan/50 hover:text-foreground"
              >
                <span>See my full contribution activity on GitHub</span>
                <ArrowUpRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {summary.isMock ? (
              <CodeLine className="mt-3">
                <Comment># sample data — GitHub could not be reached during the build</Comment>
              </CodeLine>
            ) : null}
          </div>

          <div>
            <h3 className="mb-3 font-mono text-sm text-foreground">
              <Prop>featured</Prop>
              <Punct>:</Punct>
            </h3>
            <ul className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
              {summary.featuredRepos.map((repo) => (
                <li key={repo.name} className="min-w-0">
                  <RepoCard repo={repo} languages={summary.languages} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
