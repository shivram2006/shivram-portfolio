"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_PREMIUM } from "@/lib/motion";

function CharacterReveal({
  text,
  delayOffset = 0,
  className = "",
}: {
  text: string;
  delayOffset?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split(" ").map((word, wIdx, words) => {
        const charStart = words
          .slice(0, wIdx)
          .reduce((acc, w) => acc + w.length + 1, 0);
        return (
          <span key={`${word}-${wIdx}`} className="inline-block whitespace-nowrap">
            {word.split("").map((char, cIdx) => (
              <motion.span
                key={`${char}-${cIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: delayOffset + (charStart + cIdx) * 0.02,
                  ease: EASE_PREMIUM,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            {wIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const scrollToSection = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28"
    >
      {/* Interactive Mouse-Following Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(620px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.14), rgba(139, 92, 246, 0.06) 40%, transparent 75%)`,
        }}
      />

      {/* Subtle Ambient Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 -z-20 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 -z-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="bg-grid-pattern pointer-events-none absolute inset-0 -z-30 opacity-60"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7">
            {/* Availability Pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span>{portfolioConfig.brand.availabilityText}</span>
            </motion.div>

            {/* Main Headline with Word-Safe Character Reveal */}
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl xl:text-[3.6rem]">
              <CharacterReveal text={portfolioConfig.hero.headlineLine1} delayOffset={0.12} />
              <br />
              <span className="animate-gradient-text bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
                <CharacterReveal text={portfolioConfig.hero.headlineLine2} delayOffset={0.45} />
              </span>
            </h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE_PREMIUM }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
            >
              {portfolioConfig.hero.supportingText}
            </motion.p>

            {/* Role & Company Tag */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: EASE_PREMIUM }}
              className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400"
            >
              {portfolioConfig.brand.designation}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease: EASE_PREMIUM }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={() => scrollToSection("#projects")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40"
              >
                <span>{portfolioConfig.hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-900 backdrop-blur-md transition hover:border-blue-500/50 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-blue-400/50 dark:hover:bg-white/10"
              >
                <span>{portfolioConfig.hero.secondaryCta}</span>
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="mt-9 flex items-center gap-3"
            >
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition hover:-translate-y-0.5 hover:border-blue-500/50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-blue-400/40 dark:hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Framed Hero Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE_PREMIUM }}
            className="lg:col-span-5"
          >
            <div className="group relative mx-auto max-w-lg lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-tr from-blue-600/40 via-cyan-400/30 to-violet-600/40 opacity-60 blur-xl transition duration-500 group-hover:opacity-90"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[#0B0D14] shadow-2xl dark:border-white/15">
                <video
                  src="/videos/hero-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090D]/35 via-transparent to-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("#about")}
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 transition hover:text-blue-500 dark:text-slate-400"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
