import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact/contact";
import { Experience } from "@/components/sections/experience/experience";
import { GitHub } from "@/components/sections/github/github";
import { Hero } from "@/components/sections/hero/hero";
import { Highlights } from "@/components/sections/highlights";
import { Projects } from "@/components/sections/projects/projects";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Stats />
        <Experience />
        <Skills />
        <Projects />
        <Highlights />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
