import { ArrowRight, ArrowUpRight, BookMarked, CalendarDays, Users } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { SpotlightCard } from "@/components/animations/spotlight-card";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { profile } from "@/data/profile";
import { getGitHubSummary } from "@/lib/github";
import { ContributionGraph } from "./contribution-graph";
import { LanguageBar, Metric, RepoCard } from "./github-parts";

export async function GitHub() {
  const summary = await getGitHubSummary(profile.githubUsername);

  return (
    <Section id="github">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="github"
          eyebrow="06 — Open Source"
          title="On GitHub."
          description="Side projects, experiments, and reusable building blocks."
          className="mb-0 sm:mb-0"
        />
        <Reveal className="shrink-0">
          <Button href={summary.profileUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
            <GitHubIcon className="size-4" />
            View GitHub Profile
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* min-w-0 lets the scrollable heatmap shrink instead of widening the grid column. */}
        <Reveal className="min-w-0">
          <SpotlightCard className="p-6 sm:p-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full border border-border bg-surface-muted">
                  <GitHubIcon className="size-5 text-foreground" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">@{summary.username}</p>
                  <p className="font-mono text-[0.7rem] text-subtle">Contribution activity</p>
                </div>
              </div>
              <dl className="flex gap-6 text-sm">
                <Metric icon={<BookMarked aria-hidden className="size-3.5" />} label="Repos" value={summary.publicRepos} />
                {summary.followers > 0 ? (
                  <Metric icon={<Users aria-hidden className="size-3.5" />} label="Followers" value={summary.followers} />
                ) : null}
                {summary.memberSince ? (
                  <Metric icon={<CalendarDays aria-hidden className="size-3.5" />} label="Since" value={summary.memberSince} />
                ) : null}
              </dl>
            </div>
            {summary.contributions ? (
              <ContributionGraph days={summary.contributions.days} total={summary.contributions.total} />
            ) : (
              <a
                href={summary.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-grid flex items-center justify-between gap-4 rounded-xl border border-dashed border-border-strong px-5 py-8 text-sm text-muted transition-colors hover:border-accent-cyan/50 hover:text-foreground"
              >
                <span>See my full contribution activity on GitHub</span>
                <ArrowUpRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
            {summary.isMock ? (
              <p className="mt-4 font-mono text-[0.65rem] text-subtle">
                * Sample data shown — GitHub could not be reached during the build.
              </p>
            ) : null}
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <SpotlightCard className="p-6 sm:p-7">
            <h3 className="text-sm font-semibold text-foreground">Most-used languages</h3>
            <LanguageBar languages={summary.languages} />
          </SpotlightCard>
        </Reveal>
      </div>

      <Stagger as="ul" className="mt-5 grid gap-5 md:grid-cols-3">
        {summary.featuredRepos.map((repo) => (
          <StaggerItem as="li" key={repo.name} className="min-w-0">
            <RepoCard repo={repo} languages={summary.languages} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
