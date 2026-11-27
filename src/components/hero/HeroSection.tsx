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
  const [mousePos, setMousePos] = useState({ x: 35, y: 45 });
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
      className="relative flex min-h-screen items-center overflow-hidden bg-[#08090D] pb-20 pt-28 text-white"
    >
      {/* Full-Bleed Background Video — subject positioned on the right side next to text */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-[70%_22%] lg:translate-x-[14%] lg:scale-[1.06] lg:object-center"
        />

        {/* Left-to-right cinematic gradient scrim for crisp text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#08090D] via-[#08090D]/75 to-transparent lg:via-[#08090D]/60"
        />

        {/* Top & bottom subtle vignette so navbar and next section blend smoothly */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#08090D]/55 via-transparent to-[#08090D]/90"
        />

        {/* Interactive Mouse-Following Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(560px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.16), rgba(139, 92, 246, 0.06) 45%, transparent 75%)`,
          }}
        />
      </div>

      {/* Foreground Content on Left */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:max-w-[54%]">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>{portfolioConfig.brand.availabilityText}</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-[3.75rem]">
            <CharacterReveal text={portfolioConfig.hero.headlineLine1} delayOffset={0.12} />
            <br />
            <span className="animate-gradient-text bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              <CharacterReveal text={portfolioConfig.hero.headlineLine2} delayOffset={0.45} />
            </span>
          </h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE_PREMIUM }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg"
          >
            {portfolioConfig.hero.supportingText}
          </motion.p>

          {/* Role & Company Tag */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE_PREMIUM }}
            className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400"
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
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:shadow-blue-600/50"
            >
              <span>{portfolioConfig.hero.primaryCta}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection("#contact")}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-blue-400/60 hover:bg-white/20"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-slate-300 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:text-white"
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
        transition={{ delay: 1.25, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-300 transition hover:text-blue-400"
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
