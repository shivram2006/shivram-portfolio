"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Search, ArrowRight, FileDown, Sun, Moon, X } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { useTheme } from "@/components/providers/ThemeProvider";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navItems = portfolioConfig.navigation.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (href: string) => {
    setOpen(false);
    setQuery("");
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command navigation"
        className="hidden items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-100/80 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-500/40 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white lg:inline-flex"
      >
        <Command className="h-3.5 w-3.5" />
        <span>K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0E1017]"
            >
              <div className="flex items-center border-b border-slate-200 px-4 py-3 dark:border-white/10">
                <Search className="mr-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to section or action..."
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close command palette"
                  className="rounded-md p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto p-2">
                <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Sections
                </p>
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => navigateTo(item.href)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                ))}

                <p className="mt-2 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Quick Actions
                </p>
                <a
                  href={portfolioConfig.brand.resumeUrl}
                  download="Shiv_Ram_Sharma_Resume.html"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  <span className="flex items-center gap-2">
                    <FileDown className="h-4 w-4 text-blue-500" />
                    Download Resume
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    toggleTheme();
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  <span className="flex items-center gap-2">
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Moon className="h-4 w-4 text-indigo-500" />
                    )}
                    Switch to {theme === "dark" ? "Light" : "Dark"} Theme
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
