# AGENTS.md — ARCHIØN Multi-Agent Architecture & Engineering Directives

> Operational protocols, architecture guidelines, and build commands for all agents working on the **ARCHIØN** codebase.

---

## 1. Project Overview & Tech Stack

- **Application:** Static architectural website for ARCHIØN (Atelier Aurum).
- **Framework:** Next.js 16 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS v4, custom CSS variables, Google Fonts (`Cinzel`, `Syne`, `Plus Jakarta Sans`).
- **Motion & Smooth Scroll:** GSAP 3.15, `@gsap/react`, `lenis` smooth scroll, ScrollTrigger.
- **Icons:** `lucide-react`.
- **Target Export:** Pure static site (`output: 'export'`, `images: { unoptimized: true }`). Zero backend dependency.

---

## 2. Directory Structure

```
atelier-aurum/
├── public/                 # Static assets, svg blueprints, favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout (SmoothScroll, CustomCursor, Header, Footer)
│   │   ├── page.tsx        # Archion-style home page
│   │   ├── globals.css     # Design tokens, fonts, hatch patterns, hairline borders
│   │   ├── projects/
│   │   │   ├── page.tsx    # Portfolio catalog & filterable archive
│   │   │   └── [slug]/
│   │   │       └── page.tsx # In-depth project case study
│   │   ├── studio/
│   │   │   └── page.tsx    # Studio history, manifesto, leadership & awards
│   │   ├── monograph/
│   │   │   └── page.tsx    # Architectural essays, research & monographs
│   │   └── contact/
│   │       └── page.tsx    # Bespoke commission inquiry & global studio contacts
│   ├── components/
│   │   ├── Header.tsx      # Sticky blur header with live world clocks & mobile menu
│   │   ├── Footer.tsx      # Obsidian dark footer with international offices (Riyadh, London, NY)
│   │   ├── SmoothScroll.tsx# Lenis smooth-scroll provider synced with GSAP
│   │   ├── CustomCursor.tsx# Dual-ring luxury magnetic cursor
│   │   ├── ArchitecturalHatch.tsx # Reusable SVG architectural drafting patterns
│   │   └── ConsultationModal.tsx  # "Let's Build Together" consultation dialog
│   ├── data/
│   │   ├── projects.ts     # 10 comprehensive architectural projects with high-res photography
│   │   └── monographs.ts   # Essays, press features, client testimonials & trust partners
│   └── lib/
│       └── animations.ts   # SSR-safe GSAP wrappers, ScrollTrigger utilities, easing curves
├── DESIGN.md               # Visual design tokens, typography, hatch motifs, responsive rules
├── AGENTS.md               # Agent guidelines, project architecture, commands
└── next.config.ts          # Static export configuration
```

---

## 3. Mandatory Build & Quality Commands

Always use `pnpm` in this project:

- **Development Server:** `pnpm run dev`
- **TypeScript Type Check:** `npx tsc --noEmit`
- **ESLint Linting:** `pnpm run lint`
- **Production Build (Static Export):** `pnpm run build`

---

## 4. Impeccable Design & Craft Floor Rules

1. **Persuasive Minimal Aesthetic:** Never introduce generic SaaS cards or loud neon colors. Keep to warm limestone whites, obsidian blacks, and subtle champagne gold hairlines.
2. **Responsive by Default:** All layouts must cleanly adapt from 375px mobile screens to 2560px ultra-wide displays. Never use fixed widths that cause horizontal overflow.
3. **SSR Safety:** GSAP, ScrollTrigger, and Lenis must always be guarded behind client components (`"use client"`) or lifecycle hooks (`useGSAP`, `useEffect`, `typeof window !== 'undefined'`).
4. **Touch Safety:** Custom cursors must never intercept touch gestures; gate behind `(hover: hover) and (pointer: fine)`.
5. **Static Export Compliance:** Dynamic route pages like `/projects/[slug]` must export `generateStaticParams()` returning all valid project slugs so `next build` generates static HTML without a server.
