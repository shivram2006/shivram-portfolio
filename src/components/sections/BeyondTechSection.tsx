"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Compass, Sparkles, Users } from "lucide-react";
import { portfolioConfig, type BeyondTechItem } from "@/config/portfolio.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUpVariant, staggerContainer, viewportConfig } from "@/lib/motion";

function getIcon(name: BeyondTechItem["iconName"]) {
  switch (name) {
    case "compass":
      return Compass;
    case "sparkles":
      return Sparkles;
    case "book":
      return BookOpen;
    case "users":
      return Users;
  }
}

export function BeyondTechSection() {
  return (
    <section id="beyond-tech" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={portfolioConfig.beyondTech.eyebrow}
          heading={portfolioConfig.beyondTech.heading}
          subheading={portfolioConfig.beyondTech.subheading}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {portfolioConfig.beyondTech.items.map((item) => {
            const Icon = getIcon(item.iconName);
            return (
              <motion.div
                key={item.id}
                variants={fadeUpVariant}
                className="group rounded-3xl border border-slate-200/80 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 dark:border-white/10 dark:bg-[#0E1017]/90"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 transition-transform duration-300 group-hover:scale-110 dark:text-violet-400">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  {item.subtitle}
                </p>
                <h3 className="mt-1.5 text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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
