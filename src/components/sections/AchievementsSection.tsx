"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Code, Flag, Mic } from "lucide-react";
import { portfolioConfig, type AchievementItem } from "@/config/portfolio.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeUpVariant, staggerContainer, viewportConfig } from "@/lib/motion";

function getAchievementIcon(category: AchievementItem["category"]) {
  switch (category) {
    case "Milestone":
      return Flag;
    case "Recognition":
      return Mic;
    case "Certification":
      return Award;
    case "Open Source":
      return Code;
  }
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={portfolioConfig.achievements.eyebrow}
            heading={portfolioConfig.achievements.heading}
            subheading={portfolioConfig.achievements.subheading}
          />

          {/* Compact Animated Counters */}
          <div className="flex flex-wrap gap-4">
            {portfolioConfig.achievements.counters.map((counter) => (
              <div
                key={counter.label}
                className="rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3.5 dark:border-white/10 dark:bg-[#0E1017]/90"
              >
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  <AnimatedCounter value={counter.value} suffix={counter.suffix} />
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {counter.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {portfolioConfig.achievements.items.map((item) => {
            const Icon = getAchievementIcon(item.category);
            return (
              <motion.div
                key={item.id}
                variants={fadeUpVariant}
                className="group rounded-3xl border border-slate-200/80 bg-white/80 p-6 transition hover:border-blue-500/40 dark:border-white/10 dark:bg-[#0E1017]/90 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">
                    {item.year}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {item.issuer}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
