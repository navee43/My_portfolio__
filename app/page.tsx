import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Education } from "@/components/education/education";
import { Experience } from "@/components/experience/experience";
import { Hero } from "@/components/hero/hero";
import { Profiles } from "@/components/profiles/profiles";
import { Projects } from "@/components/projects/projects";
import { Resume } from "@/components/resume/resume";
import { SkillsSection } from "@/components/skills/skills-section";
import { profile } from "@/data/profile";
import { socials } from "@/data/social-links";
import { siteUrl } from "@/lib/site";

/** Structured data so search engines understand who this page is about. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Kanina", addressRegion: "Haryana", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Information Technology Una" },
  sameAs: socials.map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <SkillsSection />
      <Education />
      <Profiles />
      <Resume />
      <Contact />
    </>
  );
}
