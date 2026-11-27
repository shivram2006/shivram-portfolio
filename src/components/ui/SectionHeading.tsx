"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUpVariant, viewportConfig } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <div
        className={`mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
          {subheading}
        </p>
      )}
    </motion.div>
  );
}
