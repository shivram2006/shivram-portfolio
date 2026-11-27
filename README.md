# Shivam — Personal Portfolio Website

Personal portfolio for **Shivam** (Founder & CEO of **CodingNovas** | Full Stack Developer | Tech Entrepreneur), built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, **Three.js / React Three Fiber**, and **Lenis**.

---

## Features

- **Centralized Editable Content**: Update all personal info, stats, skills, timeline, projects, achievements, and social links in [`src/config/portfolio.config.ts`](src/config/portfolio.config.ts).
- **Interactive 3D & Motion**:
  - Three.js / React Three Fiber abstract geometric core & particle field in the Hero (automatically disabled on low-power mobile / `prefers-reduced-motion`).
  - Character-by-character headline reveal, mouse-following radial glow, magnetic buttons, custom desktop cursor, GSAP ScrollTrigger timeline spine, and 3D tilt cards.
  - `Cmd+K` / `Ctrl+K` Command Palette for fast section & action navigation.
  - Dark / Light theme toggle (defaults to `#08090D` dark-first aesthetic).
- **Working Backend Routes**:
  - `POST /api/contact`: Validated contact form with honeypot spam protection, IP rate limiting, and email delivery via **Resend** or **SMTP (Nodemailer)**.
  - `GET /api/resume`: Serves `public/resume.pdf` if present, or dynamically generates a downloadable HTML resume from `portfolioConfig`.
- **SEO & Performance**: Open Graph & Twitter metadata, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`, Next.js image optimization, and custom `404` page.

---

## Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables (`.env.local`)

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL (used for Open Graph, `sitemap.xml`, `robots.txt`) |
| `RESEND_API_KEY` | *(Option 1)* Resend API key for contact form delivery |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | *(Option 2)* SMTP credentials for Nodemailer |
| `CONTACT_TO_EMAIL` | Destination inbox for contact form submissions |
| `CONTACT_FROM_EMAIL` | Verified sender email address |

---

## Customizing Your Content

1. **Personal Info, Stats, Projects, Timeline, Achievements**: Edit `src/config/portfolio.config.ts`.
2. **Profile Photo**: Replace `public/images/shivam-profile.jpg` (or update `about.profileImage` in `portfolio.config.ts`).
3. **PDF Resume**: Place your PDF at `public/resume.pdf` and `/api/resume` will automatically serve it as a PDF download.

---

## Deploying to Vercel

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.example` in **Project Settings -> Environment Variables**.
4. Click **Deploy**. Vercel automatically detects Next.js and runs `npm run build`.
