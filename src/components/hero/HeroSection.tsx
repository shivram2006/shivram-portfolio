"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useTheme } from "@/components/providers/ThemeProvider";
import { EASE_PREMIUM } from "@/lib/motion";

function CharacterReveal({
  text,
  delayOffset = 0,
  className = "",
  charClassName = "",
}: {
  text: string;
  delayOffset?: number;
  className?: string;
  charClassName?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <span className={`${className} ${charClassName}`}>{text}</span>;
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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: delayOffset + (charStart + cIdx) * 0.018,
                  ease: EASE_PREMIUM,
                }}
                className={`inline-block ${charClassName}`}
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

/**
 * Mobile Canvas Video — renders a hidden &lt;video&gt; to a &lt;canvas&gt; via
 * requestAnimationFrame so iOS Safari NEVER shows a native play button.
 * Falls back to poster image if autoplay is blocked.
 */
function MobileCanvasVideo({
  src,
  poster,
  brightnessClass,
}: {
  src: string;
  poster: string;
  brightnessClass: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const [showPoster, setShowPoster] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let drawing = false;

    const drawFrame = () => {
      if (!video || video.paused || video.ended) {
        drawing = false;
        return;
      }
      // Set canvas internal resolution to match video (once)
      if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    const startDrawing = () => {
      setShowPoster(false);
      if (!drawing) {
        drawing = true;
        rafRef.current = requestAnimationFrame(drawFrame);
      }
    };

    // Set attributes imperatively for iOS
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    video.addEventListener("playing", startDrawing);

    // Handle pause/resume
    const onPause = () => {
      if (!document.hidden && video) {
        video.play().catch(() => {});
      }
    };
    video.addEventListener("pause", onPause);

    // Handle loop restart
    const onEnded = () => {
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };
    video.addEventListener("ended", onEnded);

    // Try autoplay
    const tryPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    tryPlay();

    // Retry on visibility change and first interaction
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    const onInteract = () => tryPlay();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });
    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("scroll", onInteract, { once: true, passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      drawing = false;
      video.removeEventListener("playing", startDrawing);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("scroll", onInteract);
    };
  }, [src]);

  return (
    <>
      {/* Poster fallback — shown until canvas starts drawing */}
      {showPoster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt="Shiv Ram Sharma"
          loading="eager"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-[50%_22%] ${brightnessClass}`}
        />
      )}
      {/* Canvas renders video frames — no native controls ever */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full object-cover object-[50%_22%] ${brightnessClass}`}
      />
      {/* Hidden video element — feeds frames to canvas, never visible */}
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        className="pointer-events-none invisible absolute h-0 w-0"
        tabIndex={-1}
        aria-hidden="true"
      />
    </>
  );
}

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 35, y: 45 });
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  /** Force a video to play */
  const tryPlay = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  /* Desktop video autoplay logic */
  useEffect(() => {
    const desktop = desktopVideoRef.current;
    if (!desktop) return;

    desktop.muted = true;
    desktop.defaultMuted = true;
    desktop.playsInline = true;
    tryPlay(desktop);

    const onVisibility = () => {
      if (!document.hidden) tryPlay(desktop);
    };
    const onInteract = () => tryPlay(desktop);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });
    window.addEventListener("pointerdown", onInteract, { once: true, passive: true });
    window.addEventListener("scroll", onInteract, { once: true, passive: true });

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("scroll", onInteract);
    };
  }, [isLight, tryPlay]);

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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#f8fafc] pb-16 pt-20 text-slate-900 transition-colors duration-300 dark:bg-[#08090D] dark:text-white lg:flex-row lg:items-center lg:pb-20 lg:pt-28"
    >
      {/* Responsive Media Container:
          - Mobile/Tablet (< lg): Canvas-rendered video — zero native controls, no play button ever
          - Desktop (lg+): Full-HD background <video> positioned on the right side next to text */}
      <div className="pointer-events-none relative z-0 aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
        {/* ===== MOBILE / TABLET: CANVAS VIDEO ===== */}
        <div className="absolute inset-0 lg:hidden">
          <MobileCanvasVideo
            key={isLight ? "canvas-light" : "canvas-dark"}
            src={isLight ? "/videos/hero-video-light.mp4" : "/videos/hero-video.mp4"}
            poster={isLight ? "/images/hero-mobile-light.jpg" : "/images/hero-mobile-dark.jpg"}
            brightnessClass={isLight ? "brightness-105 contrast-105" : "brightness-110 contrast-105"}
          />
        </div>

        {/* ===== DESKTOP VIDEO ===== */}
        <video
          ref={desktopVideoRef}
          key={isLight ? "light-video" : "dark-video"}
          src={isLight ? "/videos/hero-video-light.mp4" : "/videos/hero-video.mp4"}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate noremoteplayback"
          preload="auto"
          onCanPlay={() => {
            if (desktopVideoRef.current?.paused) {
              desktopVideoRef.current.play().catch(() => {});
            }
          }}
          onPause={() => {
            if (!document.hidden && desktopVideoRef.current) {
              desktopVideoRef.current.play().catch(() => {});
            }
          }}
          onEnded={() => {
            if (desktopVideoRef.current) {
              desktopVideoRef.current.currentTime = 0;
              desktopVideoRef.current.play().catch(() => {});
            }
          }}
          className={`hero-bg-video hidden h-full w-full object-cover lg:block lg:translate-x-[15%] lg:scale-[1.04] lg:object-center ${
            isLight ? "brightness-105 contrast-105" : "brightness-110 contrast-105"
          }`}
        />

        {/* Desktop-only left-side gradient scrim behind text */}
        <div
          aria-hidden="true"
          className={`hidden lg:block lg:absolute lg:inset-y-0 lg:left-0 lg:w-[62%] lg:bg-gradient-to-r lg:to-transparent ${
            isLight
              ? "lg:from-[#f8fafc]/90 lg:via-[#f8fafc]/45"
              : "lg:from-[#08090D]/85 lg:via-[#08090D]/40"
          }`}
        />

        {/* Bottom edge blend into text (mobile) / next section (desktop) */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t to-transparent lg:h-28 ${
            isLight ? "from-[#f8fafc]" : "from-[#08090D]"
          }`}
        />

        {/* Interactive Mouse-Following Radial Glow (Desktop) */}
        <div
          aria-hidden="true"
          className="hidden lg:block lg:absolute lg:inset-0 lg:transition-opacity lg:duration-500"
          style={{
            background: `radial-gradient(560px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.16), rgba(139, 92, 246, 0.06) 45%, transparent 75%)`,
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto -mt-4 w-full max-w-7xl px-4 sm:px-6 lg:mt-0 lg:px-8">
        <div className="max-w-2xl lg:max-w-[54%]">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/85 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-black/45 dark:text-slate-200 lg:mb-7"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>{portfolioConfig.brand.availabilityText}</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-slate-900 dark:text-white sm:text-5xl xl:text-[3.75rem]">
            <CharacterReveal text={portfolioConfig.hero.headlineLine1} delayOffset={0.1} />
            <br />
            <CharacterReveal
              text={portfolioConfig.hero.headlineLine2}
              delayOffset={0.38}
              charClassName="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-violet-400"
            />
          </h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASE_PREMIUM }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 dark:text-slate-200 sm:mt-6 sm:text-lg"
          >
            {portfolioConfig.hero.supportingText}
          </motion.p>

          {/* Role & Company Tag */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE_PREMIUM }}
            className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 sm:text-xs sm:tracking-[0.2em]"
          >
            {portfolioConfig.brand.designation}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE_PREMIUM }}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4"
          >
            <MagneticButton
              onClick={() => scrollToSection("#projects")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:shadow-blue-600/50 sm:px-7 sm:py-3.5"
            >
              <span>{portfolioConfig.hero.primaryCta}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection("#contact")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/85 px-6 py-3 text-sm font-semibold text-slate-900 backdrop-blur-md transition hover:border-blue-500/60 hover:bg-white dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:border-blue-400/60 dark:hover:bg-white/20 sm:px-7 sm:py-3.5"
            >
              <span>{portfolioConfig.hero.secondaryCta}</span>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="mt-7 flex items-center gap-3 sm:mt-9"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-blue-500/50 hover:text-blue-600 dark:border-white/15 dark:bg-black/35 dark:text-slate-300 dark:hover:border-blue-400/60 dark:hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator (Desktop) */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("#about")}
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.6 }}
        className="mt-10 hidden flex-col items-center gap-2 self-center text-xs font-medium uppercase tracking-[0.2em] text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 lg:absolute lg:bottom-6 lg:left-1/2 lg:mt-0 lg:flex lg:-translate-x-1/2"
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
