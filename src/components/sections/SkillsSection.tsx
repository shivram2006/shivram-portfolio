"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Braces, ShieldCheck, Webhook, Workflow } from "lucide-react";
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiDjango,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaCloud, FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import {
  portfolioConfig,
  type SkillCategory,
  type SkillItem,
} from "@/config/portfolio.config";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SKILL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Django: SiDjango,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "REST APIs": Webhook,
  Authentication: ShieldCheck,
  "API Integration": Workflow,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Redis: SiRedis,
  C: SiC,
  "C++": SiCplusplus,
  Java: FaJava,
  Python: SiPython,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  "VS Code": VscVscode,
  Postman: SiPostman,
  "Cloud Platforms": FaCloud,
};

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const Icon = SKILL_ICON_MAP[skill.name] ?? Braces;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 10, ry: x * 10 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.35) }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 180ms ease-out",
      }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm transition-colors hover:border-blue-500/40 dark:border-white/10 dark:bg-[#0E1017]/90 dark:hover:border-blue-400/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
        style={{ backgroundColor: skill.accent }}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:border-white/10 dark:bg-white/5"
          style={{ color: skill.accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:text-slate-400">
          {skill.level}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
        {skill.name}
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {skill.tagline}
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
        <Braces className="h-3 w-3" />
        <span>{skill.category}</span>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");

  const filteredSkills =
    activeCategory === "All"
      ? portfolioConfig.skills.items
      : portfolioConfig.skills.items.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={portfolioConfig.skills.eyebrow}
            heading={portfolioConfig.skills.heading}
            subheading={portfolioConfig.skills.subheading}
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {portfolioConfig.skills.categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold transition ${active
                    ? "text-white"
                    : "border border-slate-200 bg-white/70 text-slate-600 hover:border-blue-500/40 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
                    }`}
                >
                  {active && (
                    <motion.span
                      layoutId="skills-filter-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 shadow-md shadow-blue-600/20"
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <SkillCard key={skill.name} skill={skill} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
