"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileDown, Menu, Moon, Sun, X } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { useTheme } from "@/components/providers/ThemeProvider";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = portfolioConfig.navigation
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <nav
        aria-label="Primary Navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border border-slate-200/80 bg-white/80 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B0D14]/80 dark:shadow-black/30"
            : "border border-transparent bg-transparent"
        }`}
      >
        {/* Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-[0.26em] text-slate-900 dark:text-white"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 transition-transform duration-300 group-hover:scale-125" />
          <span>{portfolioConfig.brand.wordmark}</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {portfolioConfig.navigation
            .filter((item) => item.label !== "CodingNovas")
            .map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative rounded-lg px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-blue-600 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-lg bg-blue-500/10 dark:bg-white/10"
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <CommandPalette />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-700 transition hover:border-blue-500/40 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href={portfolioConfig.brand.resumeUrl}
            download="Shiv_Ram_Sharma_Resume.html"
            className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-3.5 py-2 text-xs font-medium text-white shadow-md shadow-blue-600/20 transition hover:brightness-110 sm:inline-flex"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>Download Resume</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0B0D14]/95 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {portfolioConfig.navigation.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={portfolioConfig.brand.resumeUrl}
                download="Shiv_Ram_Sharma_Resume.html"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-medium text-white"
              >
                <FileDown className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
