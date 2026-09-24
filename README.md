# Orl Tokata — Developer Portfolio

A custom-designed, interactive portfolio for **Orl Tokata, Full-Stack Software Engineer**.

It's built with Next.js and **exported as a fully static site**: plain HTML, CSS and JS in `out/`, with no server or database. It deploys free on Vercel, Netlify, Cloudflare Pages or GitHub Pages.

## Tech stack

Next.js 16 (App Router, `output: "export"`), React 19, TypeScript (strict), Tailwind CSS 4, Motion 12, Lucide React, simple-icons, ESLint.

## Features

**Main design (`/`):** a single scrolling page.
- Floating navbar with the active section highlighted, and a mobile menu.
- Animated hero:
  - moving grid, parallax glow orbs and a glow that follows the mouse
  - word-by-word text reveal
  - a floating code window that tilts toward the cursor
  - your photo in the header badge
- About section with your circular portrait and a rotating gradient ring.
- Scroll reveals, a timeline that fills as you scroll, spotlight and tilt cards, animated counters, and a project filter.

**Alternative IDE design (`/ide`):** the same content presented as a code editor. It has a file explorer, tabs, an interactive terminal and a Ctrl+K command palette. It isn't indexed by search engines. To remove it, delete `src/app/ide` and `src/components/ide`.

**Everywhere:**
- Dark theme by default, with a light toggle that is remembered.
- A GitHub section with your real stats, languages and hand-picked repos, fetched **at build time**.
- A contact form with typed validation that needs **no backend** (see below).
- SEO: every file panel is in the static HTML. Metadata, OpenGraph and Twitter tags, a share image, sitemap, robots, manifest and JSON-LD are included.
- Accessibility: reduced motion (skips the splash and typing), tabs and tree roles, labelled fields, live regions and visible focus.

## Project structure

```
portfolio/
├── public/resume/            # Orl_Tokata_Resume.pdf (public CV — no personal details)
├── src/
│   ├── app/                  # layout, page, globals.css, sitemap, robots, manifest, OG images, icon
│   ├── components/
│   │   ├── ide/              # the /ide design: shell, explorer, terminal, command palette
│   │   │   └── files/        # content of each "file" (README, experience, skills, projects…)
│   │   ├── animations/       # MotionProvider, Reveal/Stagger, Counter, Tilt, SpotlightCard
│   │   ├── icons/            # brand + technology icons
│   │   ├── layout/           # Navbar, Footer, ThemeToggle, ThemeScript
│   │   ├── sections/         # hero, about, stats, experience, skills, projects, highlights, github, contact
│   │   └── ui/               # Button, Section, Tag
│   ├── data/                 # ← edit your content here
│   ├── hooks/  lib/  types/
├── next.config.ts            # output: "export"
└── vercel.json               # security headers on Vercel
```

## Edit your content

| What | File |
| ---- | ---- |
| Name, bio, email, socials, resume path | `src/data/profile.ts` |
| Experience | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Highlights & stats | `src/data/highlights.ts` |
| Hero code samples | `src/data/code-samples.ts` |
| Resume PDF | `public/resume/Orl_Tokata_Resume.pdf` |
| Profile photo | `public/images/orl-tokata.webp` (portrait) and `orl-tokata-avatar.webp` |
| IDE files & terminal (`/ide`) | `src/app/ide/page.tsx` |
| Featured GitHub repos | `featuredRepos` in `src/data/profile.ts` |

> The email address is still a **placeholder**. Replace it before publishing.

## Contact form (no backend)

- **Default, zero setup:** submitting opens the visitor's email app with the subject and message already filled in, addressed to `profile.email`.
- **Optional, send directly from the page:** create a free form at [Formspree](https://formspree.io) and set `NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx`. Messages are then emailed to you.

## Run locally

Requires Node.js ≥ 20.9.

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

## Build the static site

```bash
npm run build                # outputs the static site to out/
npx serve out                # preview the exact files you will deploy
```

## Environment variables (all optional, read at build time)

| Variable | Description |
| -------- | ----------- |
| `NEXT_PUBLIC_SITE_URL` | Your public URL, used for canonical, sitemap and OG tags. On Vercel it defaults to the production domain, so set it only for a custom domain. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Form service URL. If empty, the form falls back to the visitor's email app. |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Overrides the GitHub username. The default is `Orl-tokata` from `profile.ts`. |
| `GITHUB_TOKEN` | Build-time only, never sent to the browser. Shows the real contribution calendar; without it, the section links to your GitHub activity instead. |
| `GITHUB_DISABLE_FETCH` | Set to `true` to force sample GitHub data. |

GitHub data is fetched during the build, so redeploy to refresh it. You can also set up a scheduled redeploy with a Vercel Deploy Hook.

## Deploy free

**Vercel (recommended)**
1. Push this folder to a GitHub repository.
2. On vercel.com, click **Add New → Project** and import the repo. The framework is detected automatically, and the project root is the repo root.
3. Optionally add environment variables (for example `NEXT_PUBLIC_SITE_URL` for a custom domain), then click **Deploy**.

**Netlify / Cloudflare Pages:** use build command `npm run build` and output directory `out`.

**GitHub Pages:** run `npm run build` and publish the `out/` folder, for example with the `actions/deploy-pages` workflow. If the site is served from `/<repo>`, also set `basePath` in `next.config.ts`.
