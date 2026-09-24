import { Reveal } from "@/components/animations/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectGrid } from "./project-grid";

export function Projects() {
  const items = projects.map((project) => ({
    slug: project.slug,
    category: project.category,
    card: <ProjectCard project={project} />,
  }));

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        eyebrow="04 — Projects"
        title="Selected work."
        description="Enterprise systems I've helped design, build, and run. Client names and screenshots are withheld under NDA — the engineering story isn't."
      />
      <Reveal>
        <ProjectGrid items={items} />
      </Reveal>
    </Section>
  );
}
