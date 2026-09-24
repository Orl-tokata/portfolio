import type { ContributionDay } from "@/types";
import { cn } from "@/lib/utils";

const levelClass: Record<ContributionDay["level"], string> = {
  0: "bg-surface-muted",
  1: "bg-accent-blue/25",
  2: "bg-accent-blue/45",
  3: "bg-accent-cyan/65",
  4: "bg-accent-cyan",
};

/** GitHub-style heatmap. Pure server component: no client JS. */
export function ContributionGraph({ days, total }: { days: ContributionDay[]; total: number }) {
  // Pad the first column so weeks start on Sunday, like GitHub.
  const offset = days.length > 0 ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  const cells: (ContributionDay | null)[] = [...Array<null>(offset).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <figure>
      <div className="overflow-x-auto pb-2">
        <div
          role="img"
          aria-label={`${total} contributions in the last ${weeks.length} weeks`}
          className="flex w-max gap-[3px]"
        >
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
              {week.map((day, dayIndex) =>
                day ? (
                  <span
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    className={cn("size-[11px] rounded-[3px] transition-transform hover:scale-125", levelClass[day.level])}
                  />
                ) : (
                  <span key={`empty-${dayIndex}`} className="size-[11px]" />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 flex items-center justify-between font-mono text-[0.7rem] text-subtle">
        <span>{total.toLocaleString("en-US")} contributions · last 6 months</span>
        <span className="flex items-center gap-1" aria-hidden>
          Less
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span key={level} className={cn("size-[10px] rounded-[2px]", levelClass[level])} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
