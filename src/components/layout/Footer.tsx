"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { fadeUpVariant, viewportConfig } from "@/lib/motion";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/50 py-14 dark:border-white/10 dark:bg-[#06070A]">
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2.5 text-base font-semibold tracking-[0.28em] text-slate-900 dark:text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500" />
              <span>{portfolioConfig.brand.wordmark}</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-400">
              {portfolioConfig.brand.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            {portfolioConfig.navigation.slice(0, 6).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-blue-600 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-slate-200/80 pt-8 dark:border-white/10 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {year} {portfolioConfig.brand.name} · {portfolioConfig.brand.company}. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: portfolioConfig.brand.socials.github, label: "GitHub" },
              { icon: Linkedin, href: portfolioConfig.brand.socials.linkedin, label: "LinkedIn" },
              { icon: Instagram, href: portfolioConfig.brand.socials.instagram, label: "Instagram" },
              { icon: Mail, href: `mailto:${portfolioConfig.brand.email}`, label: "Email" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-500/40 hover:text-blue-600 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-500/40 hover:text-blue-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
            >
              <span>Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
