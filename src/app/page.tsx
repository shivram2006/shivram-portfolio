import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CodingNovasSection } from "@/components/sections/CodingNovasSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { BeyondTechSection } from "@/components/sections/BeyondTechSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CodingNovasSection />
        <AchievementsSection />
        <BeyondTechSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
