"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Github, Sparkles } from "lucide-react";
import { portfolioConfig, type ProjectItem } from "@/config/portfolio.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUpVariant, viewportConfig } from "@/lib/motion";

const categories = ["All", "AI / Healthcare", "EdTech", "AI Automation", "Full Stack"] as const;
type ProjectCategoryFilter = (typeof categories)[number];

function ProjectCard({
  project,
  featuredLayout = false,
}: {
  project: ProjectItem;
  featuredLayout?: boolean;
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 6, ry: x * 6 });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 200ms ease-out",
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-sm transition-colors hover:border-blue-500/40 dark:border-white/10 dark:bg-[#0E1017]/95 sm:p-8 ${
        featuredLayout ? "lg:col-span-2 lg:grid lg:grid-cols-12 lg:gap-8" : ""
      }`}
    >
      {/* Visual Preview Panel */}
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.gradient} p-6 ${
          featuredLayout ? "lg:col-span-5 lg:flex lg:flex-col lg:justify-between" : "mb-6 h-48"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-blue-400" />
            {project.metricsLabel}
          </span>
          <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white/90">
            {project.category}
          </span>
        </div>

        <div className="mt-6">
          <div className="font-mono text-xs text-white/70">
            {"// "}{project.subtitle}
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-white">
            {project.title}
          </div>
        </div>
      </div>

      {/* Content Panel */}
      <div className={`flex flex-col justify-between ${featuredLayout ? "mt-6 lg:col-span-7 lg:mt-0" : ""}`}>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {project.description}
          </p>

          <ul className="mt-5 space-y-2">
            {project.features.map((feat, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-slate-200/80 pt-5 dark:border-white/10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
          >
            <Github className="h-3.5 w-3.5" />
            <span>View on GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategoryFilter>("All");

  const filtered =
    filter === "All"
      ? portfolioConfig.projects.items
      : portfolioConfig.projects.items.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={portfolioConfig.projects.eyebrow}
            heading={portfolioConfig.projects.heading}
            subheading={portfolioConfig.projects.subheading}
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? "text-white"
                      : "border border-slate-200 bg-white/70 text-slate-600 hover:border-blue-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="projects-filter-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Grid */}
        <motion.div
          layout
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                featuredLayout={idx === 0 && filter === "All"}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
