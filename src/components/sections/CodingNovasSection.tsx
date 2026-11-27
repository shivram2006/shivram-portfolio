"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Layers, ShieldCheck, Zap } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUpVariant, staggerContainer, viewportConfig } from "@/lib/motion";

export function CodingNovasSection() {
  const cn = portfolioConfig.codingnovas;

  return (
    <section id="codingnovas" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-slate-950 via-[#0B1020] to-[#110C22] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
          {/* Ambient Brand Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-600/25 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-600/25 blur-[110px]"
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Brand Story, Vision, Mission */}
            <div className="lg:col-span-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>{cn.eyebrow}</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {cn.heading}
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                {cn.overview}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                    <Compass className="h-4 w-4" />
                    <span>Vision</span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                    {cn.vision}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
                    <Zap className="h-4 w-4" />
                    <span>Mission</span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                    {cn.mission}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Problems We Solve
                </p>
                <ul className="mt-3 space-y-2.5">
                  {cn.problemsSolved.map((problem, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9">
                <a
                  href={cn.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:brightness-110"
                >
                  <span>Visit CodingNovas</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Products & Services */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:content-center"
            >
              {cn.offerings.map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={fadeUpVariant}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-blue-400/40 hover:bg-white/[0.07]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-400">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-xs font-mono text-slate-400">
                    0{idx + 1}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {item.description}
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
