export type SkillCategory =
  | "All"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Programming"
  | "Tools & Platforms";

export interface SkillItem {
  name: string;
  category: Exclude<SkillCategory, "All">;
  level: string;
  tagline: string;
  accent: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  type: "Entrepreneurship" | "Engineering" | "Education" | "Milestone";
  summary: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "AI / Healthcare" | "Full Stack" | "EdTech" | "AI Automation";
  featured?: boolean;
  description: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  gradient: string;
  metricsLabel: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: "Milestone" | "Recognition" | "Certification" | "Open Source";
  description: string;
}

export interface BeyondTechItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: "compass" | "sparkles" | "book" | "users";
}

export const portfolioConfig = {
  seo: {
    siteName: "Shiv Ram Sharma — Founder & CEO of CodingNovas | Full Stack Developer",
    title: "Shiv Ram Sharma | Founder & CEO of CodingNovas · Full Stack Developer & Tech Entrepreneur",
    description:
      "Personal portfolio of Shiv Ram Sharma — Founder & CEO of CodingNovas, Software Development Engineer, and Technology Entrepreneur building scalable digital products and AI-powered solutions.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://shivramsharma.vercel.app",
    keywords: [
      "Shiv Ram Sharma",
      "CodingNovas",
      "Founder & CEO",
      "Full Stack Developer",
      "Software Development Engineer",
      "Tech Entrepreneur",
      "Django Developer",
      "React Developer",
      "Next.js Developer",
      "Portfolio",
    ],
  },

  brand: {
    name: "Shiv Ram Sharma",
    wordmark: "SHIV RAM SHARMA",
    designation: "Founder & CEO | Software Development Engineer | Tech Entrepreneur",
    company: "CodingNovas",
    companyUrl: "https://codingnovas.com",
    location: "Jaipur, India",
    availabilityText: "Open to Strategic Collaborations & Product Ventures",
    tagline:
      "Building digital experiences, scalable software solutions, innovative products, and technology-driven businesses.",
    email: "hello@codingnovas.com",
    resumeUrl: "/api/resume",
    socials: {
      github: "https://github.com/shivam-codingnovas",
      linkedin: "https://linkedin.com/in/shivam-codingnovas",
      instagram: "https://instagram.com/shivam.codingnovas",
      twitter: "https://x.com/shivam_dev",
    },
  },

  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "CodingNovas", href: "#codingnovas" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    headlineLine1: "Building Digital Experiences.",
    headlineLine2: "Creating What's Next.",
    supportingText:
      "I'm Shiv Ram Sharma — a technology entrepreneur, software development engineer, and founder of CodingNovas. I turn ambitious ideas into meaningful digital products.",
    primaryCta: "Explore My Work",
    secondaryCta: "Let's Connect",
  },

  about: {
    heading: "More Than Just Code.",
    eyebrow: "About Me",
    profileImage: "/images/shivam-profile.jpg",
    profileAlt: "Shiv Ram Sharma speaking at a Tech Founder Keynote",
    paragraphs: [
      "I'm Shiv Ram Sharma, a Software Development Engineer, educator, and technology entrepreneur driven by a simple conviction: great software should solve real problems with clarity, speed, and craft.",
      "Across industry engineering, AI automation, university teaching, and technical training, I've combined hands-on full-stack development with mentoring engineers and shipping production systems.",
      "At CodingNovas in Jaipur, I bridge product strategy, clean architecture, and full-stack execution—building scalable web applications, EdTech platforms, and AI-powered business solutions.",
    ],
    // Editable placeholder metrics — update these with your verified numbers anytime
    stats: [
      { label: "Projects Completed", value: 18, suffix: "+" },
      { label: "Technologies Explored", value: 24, suffix: "+" },
      { label: "Years of Experience", value: 3, suffix: "+" },
      { label: "Products Built", value: 6, suffix: "+" },
    ],
  },

  skills: {
    heading: "My Technical Arsenal.",
    eyebrow: "Skills & Stack",
    subheading:
      "A modern, production-tested toolkit spanning interactive frontends, resilient APIs, databases, and cloud infrastructure.",
    categories: [
      "All",
      "Frontend",
      "Backend",
      "Database",
      "Programming",
      "Tools & Platforms",
    ] as SkillCategory[],
    items: [
      // Frontend
      { name: "HTML5", category: "Frontend", level: "Core", tagline: "Semantic, accessible markup", accent: "#E34F26" },
      { name: "CSS3", category: "Frontend", level: "Core", tagline: "Modern layouts & fluid motion", accent: "#1572B6" },
      { name: "JavaScript", category: "Frontend", level: "Advanced", tagline: "Async runtime & ESNext", accent: "#F7DF1E" },
      { name: "TypeScript", category: "Frontend", level: "Advanced", tagline: "Type-safe scalable apps", accent: "#3178C6" },
      { name: "React.js", category: "Frontend", level: "Advanced", tagline: "Component architecture", accent: "#61DAFB" },
      { name: "Next.js", category: "Frontend", level: "Advanced", tagline: "App Router, SSR & Edge", accent: "#A855F7" },
      { name: "Tailwind CSS", category: "Frontend", level: "Advanced", tagline: "Design systems at speed", accent: "#38BDF8" },
      // Backend
      { name: "Django", category: "Backend", level: "Advanced", tagline: "Full-stack Python web framework", accent: "#092E20" },
      { name: "Node.js", category: "Backend", level: "Advanced", tagline: "Event-driven server runtime", accent: "#5FA04E" },
      { name: "Express.js", category: "Backend", level: "Advanced", tagline: "Modular API services", accent: "#94A3B8" },
      { name: "REST APIs", category: "Backend", level: "Advanced", tagline: "Clean contract design", accent: "#3B82F6" },
      { name: "Authentication", category: "Backend", level: "Proficient", tagline: "JWT, OAuth & RBAC flows", accent: "#8B5CF6" },
      { name: "API Integration", category: "Backend", level: "Advanced", tagline: "Webhooks, payments & SDKs", accent: "#06B6D4" },
      // Database
      { name: "MongoDB", category: "Database", level: "Advanced", tagline: "Flexible document schemas", accent: "#47A248" },
      { name: "PostgreSQL", category: "Database", level: "Proficient", tagline: "Relational integrity & SQL", accent: "#4169E1" },
      { name: "MySQL", category: "Database", level: "Proficient", tagline: "Structured transactional data", accent: "#4479A1" },
      { name: "Redis", category: "Database", level: "Proficient", tagline: "Low-latency caching & queues", accent: "#DC382D" },
      // Programming
      { name: "C", category: "Programming", level: "Foundational", tagline: "Memory & systems fundamentals", accent: "#A8B9CC" },
      { name: "C++", category: "Programming", level: "Proficient", tagline: "Algorithms & performance", accent: "#00599C" },
      { name: "Java", category: "Programming", level: "Proficient", tagline: "OOP & enterprise patterns", accent: "#ED8B00" },
      { name: "Python", category: "Programming", level: "Proficient", tagline: "Automation, scripting & AI", accent: "#3776AB" },
      // Tools & Platforms
      { name: "Git", category: "Tools & Platforms", level: "Advanced", tagline: "Distributed version control", accent: "#F05032" },
      { name: "GitHub", category: "Tools & Platforms", level: "Advanced", tagline: "CI/CD, PRs & open source", accent: "#E2E8F0" },
      { name: "Docker", category: "Tools & Platforms", level: "Proficient", tagline: "Reproducible containers", accent: "#2496ED" },
      { name: "VS Code", category: "Tools & Platforms", level: "Core", tagline: "Crafted dev environment", accent: "#007ACC" },
      { name: "Postman", category: "Tools & Platforms", level: "Advanced", tagline: "API testing & collections", accent: "#FF6C37" },
      { name: "Cloud Platforms", category: "Tools & Platforms", level: "Proficient", tagline: "Vercel, AWS & edge deploy", accent: "#6366F1" },
    ] as SkillItem[],
  },

  experience: {
    heading: "The Journey So Far.",
    eyebrow: "Experience & Journey",
    subheading:
      "Industry engineering, academic instruction, technical training, and startup leadership across Jaipur and beyond.",
    items: [
      {
        id: "exp-codingnovas",
        period: "2026 – Present",
        role: "Software Development Engineer",
        organization: "CodingNovas, Jaipur",
        type: "Entrepreneurship",
        summary:
          "Designing and developing production-ready full-stack web applications, RESTful APIs, and scalable software solutions for clients while mentoring junior engineers.",
        highlights: [
          "Design and develop full-stack web applications using Django, React, and modern JavaScript frameworks",
          "Build and maintain RESTful APIs and database-backed systems",
          "Focus on performance, scalability, and clean architecture",
          "Collaborate with clients to develop production-ready software solutions",
          "Mentor junior developers on coding standards, debugging, and project delivery",
        ],
      },
      {
        id: "exp-thirdeye",
        period: "September 2023 – 2026",
        role: "Programming Trainer",
        organization: "Thirdeye Computer Classes, Jaipur",
        type: "Milestone",
        summary:
          "Trained aspiring developers in Full-Stack Development through structured curricula, live coding, debugging workshops, and technical community events.",
        highlights: [
          "Train students in Full-Stack Development",
          "Design structured learning modules and practical projects",
          "Conduct live coding sessions, debugging workshops, and code reviews",
          "Organise webinars and technical group discussions",
          "Received Trainer of the Month award twice",
        ],
      },
      {
        id: "exp-octanet",
        period: "January 2024 – June 2024",
        role: "Frontend Development Intern",
        organization: "Octanet Service Pvt. Ltd.",
        type: "Engineering",
        summary:
          "Built responsive, interactive frontend web applications in collaboration with the engineering team using modern web standards.",
        highlights: [
          "Developed responsive and interactive web applications",
          "Worked with HTML, CSS, JavaScript, and React.js",
          "Collaborated with the development team",
          "Followed industry-standard coding practices",
        ],
      },
      {
        id: "exp-jecrc",
        period: "Academic Faculty",
        role: "Assistant Professor",
        organization: "JECRC University, Jaipur",
        type: "Education",
        summary:
          "Teaching core Computer Science & Engineering subjects and mentoring university students across algorithms, web technologies, and AI.",
        highlights: [
          "Teach Computer Science and Engineering subjects",
          "Mentor students in programming and problem-solving",
          "Conduct practical sessions, technical training, and academic activities",
          "Guide students in Data Structures, Algorithms, Web Technologies, and Artificial Intelligence",
        ],
      },
      {
        id: "exp-isro",
        period: "ISRO",
        role: "Junior Python Developer",
        organization: "Indian Space Research Organisation (ISRO)",
        type: "Engineering",
        summary:
          "Served as Junior Python Developer at the Indian Space Research Organisation (ISRO).",
        highlights: [
          "Designation: Junior Python Developer",
        ],
      },
    ] as TimelineItem[],
  },

  projects: {
    heading: "Things I've Built.",
    eyebrow: "Featured Work",
    subheading:
      "Production full-stack applications, AI-powered healthcare & automation systems, and EdTech platforms.",
    items: [
      {
        id: "proj-medical-ai",
        title: "AI-Based Medical Symptom Checker & Diagnosis App",
        subtitle: "AI / Healthcare",
        category: "AI / Healthcare",
        featured: true,
        description:
          "A full-stack AI Health Assistant that analyses user-reported symptoms and uploaded medical reports to provide preliminary diagnosis suggestions.",
        technologies: ["Django", "React", "PostgreSQL", "Tesseract OCR", "AI/ML"],
        features: [
          "Analyses user-reported symptoms and medical reports",
          "Provides preliminary diagnosis suggestions",
          "Integrated Tesseract OCR to extract information from uploaded medical documents",
          "Built backend using Django and PostgreSQL, with React frontend",
        ],
        liveUrl: "https://codingnovas.com",
        githubUrl: "https://github.com/shivam-codingnovas",
        gradient: "from-blue-600/30 via-cyan-600/20 to-violet-600/30",
        metricsLabel: "AI / Healthcare",
      },
      {
        id: "proj-swadhyaayi",
        title: "Swadhyaayi – Student Placement-Readiness Platform",
        subtitle: "EdTech | CodingNovas",
        category: "EdTech",
        featured: true,
        description:
          "A dedicated placement-readiness platform for engineering students designed to build problem-solving consistency and competitive coding skills.",
        technologies: ["React", "Django", "PostgreSQL", "REST APIs"],
        features: [
          "Built a structured DSA problem bank for engineering students",
          "Implemented live coding contests",
          "Integrated leaderboards to encourage competitive learning",
        ],
        liveUrl: "https://codingnovas.com",
        githubUrl: "https://github.com/shivam-codingnovas",
        gradient: "from-violet-600/30 via-indigo-600/20 to-blue-600/30",
        metricsLabel: "EdTech · CodingNovas",
      },
      {
        id: "proj-agritwist",
        title: "AgriTwist Pvt. Ltd. – Website, CRM & Automation",
        subtitle: "AI Automation",
        category: "AI Automation",
        description:
          "End-to-end digital presence, Hindi-localised website, lead-capture CRM, and LLM-powered WhatsApp customer automation.",
        technologies: ["n8n", "WhatsApp Cloud API", "LLMs", "CRM"],
        features: [
          "Developed and Hindi-localised the company's website",
          "Built lead capture and CRM systems",
          "Developed LLM-powered WhatsApp automation",
          "Integrated WhatsApp Cloud API using n8n and automated customer query handling",
        ],
        liveUrl: "https://codingnovas.com",
        githubUrl: "https://github.com/shivam-codingnovas",
        gradient: "from-emerald-500/25 via-teal-600/20 to-blue-600/25",
        metricsLabel: "AI Automation",
      },
      {
        id: "proj-swarika",
        title: "Swarika",
        subtitle: "Full-Stack Development",
        category: "Full Stack",
        description:
          "Designed and developed Swarika as a complete full-stack web application with end-to-end architecture, frontend experience, and backend integration.",
        technologies: ["React", "Full-Stack", "REST APIs", "Database"],
        features: [
          "Designed and developed Swarika as a complete full-stack web application",
          "Handled end-to-end application architecture and development",
        ],
        liveUrl: "https://codingnovas.com",
        githubUrl: "https://github.com/shivam-codingnovas",
        gradient: "from-fuchsia-600/25 via-violet-600/20 to-indigo-600/25",
        metricsLabel: "Full-Stack",
      },
    ] as ProjectItem[],
  },

  codingnovas: {
    heading: "Building Something Bigger.",
    eyebrow: "Founder Spotlight · CodingNovas",
    name: "CodingNovas",
    role: "Founder & Chief Executive Officer",
    website: "https://codingnovas.com",
    overview:
      "CodingNovas is my entrepreneurial venture built on a clear premise: technology should empower ambitious ideas to scale without friction. We combine thoughtful product design, resilient full-stack engineering, and startup agility to build software that matters.",
    vision:
      "To become a catalyst for next-generation digital products—where engineering excellence meets purposeful design.",
    mission:
      "Empowering businesses, founders, and creators with scalable software solutions, modern web platforms, and future-ready technology.",
    problemsSolved: [
      "Fragmented, slow legacy interfaces replaced with high-conversion, modern web experiences",
      "Fragile prototypes transformed into production-grade, scalable full-stack architectures",
      "Bridging the gap between business strategy and hands-on technical execution",
    ],
    offerings: [
      {
        title: "Full-Stack Product Engineering",
        description: "End-to-end web applications built with Next.js, TypeScript, Node.js, and modern databases.",
      },
      {
        title: "Startup MVP & SaaS Architecture",
        description: "Rapid yet scalable product foundations designed to validate fast and grow reliably.",
      },
      {
        title: "UI/UX & Interactive Web Craft",
        description: "Premium, motion-rich digital experiences engineered for speed, clarity, and brand authority.",
      },
      {
        title: "Cloud, APIs & Automation",
        description: "Robust REST APIs, third-party integrations, caching layers, and containerized deployments.",
      },
    ],
  },

  achievements: {
    heading: "Milestones That Matter.",
    eyebrow: "Achievements & Recognition",
    subheading:
      "Verified milestones, leadership moments, and technical accomplishments. Replace placeholders in portfolio.config.ts as you add new recognitions.",
    counters: [
      { label: "Ventures Founded", value: 1, suffix: "" },
      { label: "Core Stack Domains", value: 5, suffix: "" },
      { label: "Keynote & Leadership", value: 1, suffix: "+" },
    ],
    items: [
      {
        id: "ach-1",
        title: "Founded CodingNovas",
        issuer: "Entrepreneurial Milestone",
        year: "Milestone",
        category: "Milestone",
        description:
          "Established CodingNovas to build scalable digital products, software platforms, and technology-driven solutions.",
      },
      {
        id: "ach-2",
        title: "Trainer of the Month (2× Recipient)",
        issuer: "Thirdeye Computer Classes, Jaipur",
        year: "2023 – 2026",
        category: "Recognition",
        description:
          "Awarded Trainer of the Month twice for excellence in Full-Stack Development instruction, live coding workshops, and student mentorship.",
      },
      {
        id: "ach-3",
        title: "Full-Stack Architecture & Cloud Delivery",
        issuer: "Verified Technical Track (Placeholder)",
        year: "Ongoing",
        category: "Certification",
        description:
          "Replace with your specific certifications (e.g., AWS, Meta, Google, or university honors) in portfolio.config.ts.",
      },
      {
        id: "ach-4",
        title: "Open-Source & Developer Tooling",
        issuer: "GitHub & Community (Placeholder)",
        year: "Ongoing",
        category: "Open Source",
        description:
          "Update with your notable hackathon wins, open-source PRs, or competition rankings.",
      },
    ] as AchievementItem[],
  },

  beyondTech: {
    heading: "The Human Behind the Code.",
    eyebrow: "Beyond Technology",
    subheading:
      "Software is only half the story. How I think, lead, and stay curious outside the terminal.",
    items: [
      {
        id: "bt-1",
        title: "First-Principles Problem Solving",
        subtitle: "Clarity over complexity",
        description:
          "Whether debugging a distributed bottleneck or shaping a business model, I break challenges down to their fundamental truths before building up.",
        iconName: "compass",
      },
      {
        id: "bt-2",
        title: "Design & Creative Direction",
        subtitle: "Obsessed with craft",
        description:
          "I believe the best engineering feels invisible—expressed through typography, pacing, micro-interactions, and interfaces that respect the user's attention.",
        iconName: "sparkles",
      },
      {
        id: "bt-3",
        title: "Relentless Learning Mindset",
        subtitle: "Always Day One",
        description:
          "Technology shifts weekly. I stay sharp by reading engineering post-mortems, exploring new runtimes, and studying how great founders build durable companies.",
        iconName: "book",
      },
      {
        id: "bt-4",
        title: "Leadership & Ownership",
        subtitle: "Vision into execution",
        description:
          "Leading CodingNovas taught me that great products come from aligned teams, decisive communication, and taking ownership when things get hard.",
        iconName: "users",
      },
    ] as BeyondTechItem[],
  },

  contact: {
    heading: "Have an Idea? Let's Build Something Extraordinary.",
    supportingText:
      "Whether it's a business idea, an exciting collaboration, or an ambitious digital product, I'd love to hear from you.",
    responseTime: "Usually responds within 24 hours",
  },
};
