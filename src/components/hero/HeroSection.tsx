"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_PREMIUM } from "@/lib/motion";

const HeroCanvas = dynamic(
  () => import("@/components/hero/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
);

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
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: delayOffset + index * 0.022,
            ease: EASE_PREMIUM,
          }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });
  const [show3D, setShow3D] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const isLowPower = window.innerWidth < 768;
    if (!prefersReducedMotion && !isLowPower) {
      setShow3D(true);
    }
  }, [prefersReducedMotion]);

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
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
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
      <div aria-hidden="true" className="bg-grid-pattern pointer-events-none absolute inset-0 -z-30 opacity-60" />

      {/* 3D Interactive Scene on capable viewports */}
      {show3D && <HeroCanvas />}

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>{portfolioConfig.brand.availabilityText}</span>
          </motion.div>

          {/* Main Headline with Character Reveal + Animated Gradient */}
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            <CharacterReveal text={portfolioConfig.hero.headlineLine1} delayOffset={0.15} />
            <br />
            <span className="animate-gradient-text bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              <CharacterReveal text={portfolioConfig.hero.headlineLine2} delayOffset={0.55} />
            </span>
          </h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE_PREMIUM }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl"
          >
            {portfolioConfig.hero.supportingText}
          </motion.p>

          {/* Role & Company Tag */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE_PREMIUM }}
            className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400"
          >
            {portfolioConfig.brand.designation}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.08, ease: EASE_PREMIUM }}
            className="mt-9 flex flex-wrap items-center gap-4"
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
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-10 flex items-center gap-3"
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
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("#about")}
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 transition hover:text-blue-500 dark:text-slate-400"
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
