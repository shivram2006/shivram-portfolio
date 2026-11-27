"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "@/config/portfolio.config";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = prefersReducedMotion ? 150 : 950;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08090D] text-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 shadow-[0_0_16px_rgba(59,130,246,0.9)]" />
              <span className="text-xl font-semibold tracking-[0.35em] text-white">
                {portfolioConfig.brand.wordmark}
              </span>
            </div>
            <div className="h-[2px] w-44 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
              />
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
              {portfolioConfig.brand.company} · Initializing
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
