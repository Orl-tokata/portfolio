import { Counter } from "@/components/animations/counter";
import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { stats } from "@/data/highlights";

export function Stats() {
  return (
    <section aria-label="Developer statistics" className="relative py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/70">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-60" />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-accent-blue/10 blur-3xl"
          />
          <Stagger as="ul" className="relative grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StaggerItem
                as="li"
                key={stat.label}
                className={[
                  "p-6 sm:p-8",
                  index % 2 === 1 ? "border-l border-border" : "",
                  index >= 2 ? "border-t border-border lg:border-t-0" : "",
                  index === 2 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <p className="whitespace-nowrap font-display text-2xl font-semibold tracking-tight text-foreground sm:text-4xl xl:text-5xl">
                  {stat.value !== undefined ? (
                    <Counter value={stat.value} suffix={stat.suffix} className="text-gradient" />
                  ) : (
                    <span className="text-gradient">{stat.display}</span>
                  )}
                </p>
                <p className="mt-3 text-sm font-medium text-foreground">{stat.label}</p>
                <p className="mt-1 text-xs text-subtle">{stat.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
