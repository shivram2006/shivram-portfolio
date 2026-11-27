"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeUpVariant, staggerContainer, viewportConfig } from "@/lib/motion";

export function AboutSection() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 8, rotateY: x * 8 });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={portfolioConfig.about.eyebrow}
          heading={portfolioConfig.about.heading}
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Interactive Profile Frame */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-5"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="group relative mx-auto max-w-md"
            >
              {/* Animated Outer Glow Border */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-violet-600 opacity-40 blur-lg transition duration-500 group-hover:opacity-75"
              />

              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 dark:border-white/10">
                <div className="relative aspect-[4/4.3] w-full overflow-hidden">
                  <Image
                    src={portfolioConfig.about.profileImage}
                    alt={portfolioConfig.about.profileAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, 420px"
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090D]/85 via-transparent to-transparent" />
                </div>

                {/* Floating Caption */}
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/55 p-4 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                    {portfolioConfig.brand.company}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-white">
                    {portfolioConfig.brand.name} · {portfolioConfig.brand.designation.split("|")[0].trim()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story & Configurable Stats */}
          <div className="lg:col-span-7">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
            >
              {portfolioConfig.about.paragraphs.map((paragraph, i) => (
                <motion.p key={i} variants={fadeUpVariant}>
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Editable Animated Statistics */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {portfolioConfig.about.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUpVariant}
                  className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-sm transition hover:border-blue-500/40 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
