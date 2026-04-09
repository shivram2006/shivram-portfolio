// ========== PORTFOLIO SCRIPT v2 - OPTIMIZED ==========
const isDev = false; // Set to true for debugging

function log(...args) {
  if (isDev) console.log(...args);
}

// ========== PRELOADER HIDE ==========
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.transition = "opacity 0.4s ease";
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      preloader.style.pointerEvents = "none";
      log("✓ Preloader hidden");
    }, 450);
  }
}

// Hide as soon as DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hidePreloader);
} else {
  hidePreloader();
}

// Fallback: force-hide if browser stalls
setTimeout(hidePreloader, 2500);

// ========== THEME SYSTEM ==========
const THEME_STORAGE_KEY = "portfolio-theme";
const DARK_LIGHT_MODE_KEY = "portfolio-dark-light-mode";

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  log("🎨 Theme:", theme);
  
  // Update theme buttons
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });
}

function setMode(mode) {
  document.documentElement.setAttribute("data-mode", mode);
  localStorage.setItem(DARK_LIGHT_MODE_KEY, mode);
  log("🌙 Mode:", mode);
  
  const darkLightToggle = document.getElementById("darkLightToggle");
  if (darkLightToggle) {
    darkLightToggle.textContent = mode === "dark" ? "🌙" : "☀️";
  }
}

function initTheme() {
  let savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "neon";
  let savedMode = localStorage.getItem(DARK_LIGHT_MODE_KEY) || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.documentElement.setAttribute("data-mode", savedMode);
  log("✓ Theme init: " + savedTheme + " / " + savedMode);
}

// Init theme immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTheme);
} else {
  initTheme();
}

// ========== GSAP ANIMATIONS ==========
function startGSAPAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    log("⏳ GSAP/ScrollTrigger loading...");
    setTimeout(startGSAPAnimations, 500);
    return;
  }

  log("🎬 Starting GSAP animations...");
  gsap.registerPlugin(ScrollTrigger);

  // Reveal elements
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
  log("✓ Animated " + reveals.length + " reveal elements");

  // Skill categories
  const skills = document.querySelectorAll(".skill-category");
  skills.forEach((skill, i) => {
    gsap.fromTo(
      skill,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.12,
        scrollTrigger: {
          trigger: skill,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
  log("✓ Animated " + skills.length + " skill categories");

  // Experience items
  const expItems = document.querySelectorAll(".exp-item");
  expItems.forEach((item, i) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
  log("✓ Animated " + expItems.length + " experience items");

  // Skill bars
  const bars = document.querySelectorAll(".skill-bar");
  bars.forEach((bar) => {
    const width = bar.dataset.width || "0";
    gsap.fromTo(
      bar,
      { width: "0%" },
      {
        width: width + "%",
        duration: 1.5,
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
        },
      }
    );
  });
  log("✓ Animated " + bars.length + " skill bars");

  // Hero parallax
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    gsap.to(heroSection, {
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 50,
    });
    log("✓ Hero parallax enabled");
  }

  log("✅ GSAP animations complete");
}

// Start GSAP after libs load
window.addEventListener("load", startGSAPAnimations);
setTimeout(startGSAPAnimations, 2000);

// ========== CUSTOM CURSOR ==========
function initCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    dx += (mx - dx) * 0.7;
    dy += (my - dy) * 0.7;
    rx += (mx - rx) * 0.2;
    ry += (my - ry) * 0.2;

    dot.style.left = dx + "px";
    dot.style.top = dy + "px";
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";

    requestAnimationFrame(animate);
  }
  animate();

  // Hover effects
  document.querySelectorAll("button, a, input, textarea, [role='button']").forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  log("✓ Custom cursor ready");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCursor);
} else {
  initCursor();
}

// ========== THEME WIDGET ==========
document.addEventListener("DOMContentLoaded", function () {
  // Theme buttons
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => setTheme(btn.dataset.theme));
  });

  // Dark/Light toggle
  const toggle = document.getElementById("darkLightToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const mode = localStorage.getItem(DARK_LIGHT_MODE_KEY) === "dark" ? "light" : "dark";
      setMode(mode);
    });
  }

  log("✓ Theme widget ready");
});

// ========== CLI CHATBOT ==========
function initCLI() {
  const btn = document.getElementById("cliButton");
  const input = document.getElementById("cliInput");
  const output = document.getElementById("cliOutput");
  const close = document.getElementById("cliClose");
  const modal = document.getElementById("cliModal");
  const dotClose = document.getElementById("cliDotClose");

  if (!btn || !input || !output || !modal) return;

  // Open CLI
  btn.addEventListener("click", () => {
    modal.classList.add("active");
    setTimeout(() => input.focus(), 100);
  });

  // Close CLI
  const closeCLI = () => {
    modal.classList.remove("active");
  };

  if (close) close.addEventListener("click", closeCLI);
  if (dotClose) dotClose.addEventListener("click", closeCLI);

  // Handle commands
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim().toLowerCase();
      if (!cmd) return;
      
      input.value = "";

      const userLine = document.createElement("div");
      userLine.className = "cli-line";
      userLine.innerHTML = `<span class="cli-prompt">➜</span> ${cmd}`;
      output.appendChild(userLine);

      if (cmd === "clear") {
        output.innerHTML = "";
        return;
      }

      if (cmd === "exit") {
        closeCLI();
        return;
      }

      const response = processCLICommand(cmd);
      if (response) {
        const respLine = document.createElement("div");
        respLine.className = "cli-line";
        respLine.innerHTML = response;
        output.appendChild(respLine);
      }

      output.scrollTop = output.scrollHeight;
    }

    if (e.key === "Escape") {
      closeCLI();
    }
  });
}

function processCLICommand(cmd) {
  const commands = {
    help: `<span style="color: var(--neon-cyan)">Available Commands:</span>
help      - Show available commands
about     - About Shiv Ram
skills    - Technical skills
projects  - Featured projects
contact   - Contact information
hire      - Why hire me?
whoami    - Current session info
clear     - Clear terminal`,

    about: `<span style="color: var(--neon-cyan)">🚀 Shiv Ram Sharma</span>
Founder & CEO | Full Stack Developer
Location: Jaipur, Rajasthan, India
Passion: Building scalable digital experiences`,

    skills: `<span style="color: var(--neon-cyan)">Frontend:</span> React, HTML/CSS, JavaScript
<span style="color: var(--neon-cyan)">Backend:</span> Django, Python, REST APIs
<span style="color: var(--neon-cyan)">DevOps:</span> Docker, Git, AWS, Linux`,

    projects: `1. CodingNovas Platform - Full stack SaaS
2. AI Chatbot System - NLP integration
3. This Portfolio - Interactive frontend
4. Mobile App - React Native`,

    contact: `Email: sharmashivram2006@gmail.com
LinkedIn: linkedin.com/in/shivram
GitHub: github.com/shivram
Discord: Available on request`,

    hire: `✓ 5+ years experience
✓ Multiple production systems
✓ Strong problem solver
✓ Quick learner & team player
✓ Available for projects now!`,

    whoami: `User: Portfolio Visitor
Theme: ${localStorage.getItem(THEME_STORAGE_KEY) || "neon"}
Mode: ${localStorage.getItem(DARK_LIGHT_MODE_KEY) || "dark"}
Time: ${new Date().toLocaleTimeString()}`,

    clear: "",
  };

  if (cmd === "clear") {
    document.getElementById("cliOutput").innerHTML = "";
    return "";
  }

  return commands[cmd] || `<span style="color: var(--neon-pink)">✗ Command not found</span>
Type <span style="color: var(--text-muted)">help</span> for commands.`;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(initCLI, 100);
  });
} else {
  setTimeout(initCLI, 100);
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener("keydown", (e) => {
  // CLI: backtick or Ctrl+K
  if (e.key === "`" || (e.ctrlKey && (e.key === "k" || e.key === "K"))) {
    e.preventDefault();
    const modal = document.getElementById("cliModal");
    if (modal) {
      modal.classList.toggle("active");
      if (modal.classList.contains("active")) {
        setTimeout(() => document.getElementById("cliInput")?.focus(), 100);
      }
    }
  }

  // Reset: R
  if (!e.ctrlKey && !e.metaKey && (e.key === "r" || e.key === "R")) {
    setTheme("neon");
    setMode("dark");
  }

  // Cycle theme: T
  if (!e.ctrlKey && !e.metaKey && (e.key === "t" || e.key === "T")) {
    const themes = ["neon", "purple", "green", "orange", "red"];
    const current = localStorage.getItem(THEME_STORAGE_KEY) || "neon";
    const idx = themes.indexOf(current);
    setTheme(themes[(idx + 1) % themes.length]);
  }
});

// ========== MOBILE NAV ==========
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const closeBtn = document.getElementById("mobileNavClose");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      mobileNav.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      mobileNav.style.display = "none";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.style.display = "none";
      });
    });
  }

  log("✓ Mobile nav ready");
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ========== TYPEWRITER EFFECT ==========
document.addEventListener("DOMContentLoaded", function () {
  const typeText = document.getElementById("typewriter-text");
  if (!typeText) return;

  const words = [
    "Full Stack Developer",
    "Tech Entrepreneur",
    "Problem Solver",
    "Open Source Enthusiast",
  ];

  let wordIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const word = words[wordIdx];
    const display = isDeleting ? word.slice(0, charIdx - 1) : word.slice(0, charIdx + 1);
    typeText.textContent = display;

    if (!isDeleting && charIdx === word.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 2000);
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      setTimeout(type, 200);
    } else {
      charIdx += isDeleting ? -1 : 1;
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }

  type();
  log("✓ Typewriter effect ready");
});

// ========== ERROR HANDLING ==========
window.addEventListener("error", (e) => {
  console.error("❌ Error:", e.error);
});

// ========== FINAL MESSAGE ==========
log("✅ All systems online!");
log("⌨️ Shortcuts: ` or Ctrl+K = CLI | R = Reset | T = Cycle Theme");
