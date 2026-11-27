"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Trophy } from "lucide-react";
import { portfolioConfig, type TimelineItem } from "@/config/portfolio.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUpVariant, viewportConfig } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function getTimelineIcon(type: TimelineItem["type"]) {
  switch (type) {
    case "Entrepreneurship":
      return Rocket;
    case "Engineering":
      return Briefcase;
    case "Education":
      return GraduationCap;
    case "Milestone":
      return Trophy;
  }
}

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current || !spineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={portfolioConfig.experience.eyebrow}
          heading={portfolioConfig.experience.heading}
          subheading={portfolioConfig.experience.subheading}
        />

        <div ref={containerRef} className="relative mt-16 pl-6 sm:pl-10">
          {/* Background Track */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-2.5 top-2 w-[2px] bg-slate-200 dark:bg-white/10 sm:left-4"
          />
          {/* GSAP Animated Progress Spine */}
          <div
            ref={spineRef}
            aria-hidden="true"
            className="absolute bottom-0 left-2.5 top-2 w-[2px] origin-top bg-gradient-to-b from-blue-500 via-cyan-400 to-violet-500 sm:left-4"
          />

          <div className="space-y-10">
            {portfolioConfig.experience.items.map((item) => {
              const Icon = getTimelineIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className="relative pl-6 sm:pl-10"
                >
                  {/* Node Marker */}
                  <div className="absolute -left-[22px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/40 bg-white text-blue-600 shadow-md dark:bg-[#0B0D14] dark:text-blue-400 sm:-left-[31px]">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 transition hover:border-blue-500/40 dark:border-white/10 dark:bg-[#0E1017]/90 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {item.type}
                        </span>
                        <h3 className="mt-2.5 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                          {item.role}
                        </h3>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {item.organization}
                        </p>
                      </div>
                      <span className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:text-slate-400">
                        {item.period}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                      {item.summary}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
