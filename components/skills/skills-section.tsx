import { Wrench } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skills } from "./skills";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 sm:py-28">
      <div className="page">
        <SectionHeading
          id="skills-title"
          title="Skills"
          kicker={{ icon: Wrench, label: "the toolbox", color: "lilac", tilt: 3 }}
          intro="The tools I've used in internships and projects. Pick any skill to see where it shows up."
        />
        <Skills />
      </div>
    </section>
  );
}
