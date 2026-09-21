# DESIGN.md — ARCHIØN Design System & Visual Architecture

> Design system specification for **ARCHIØN** (Atelier Aurum), an ultra-premium architecture and construction firm. Designed for persuasive authority, tactile minimalism, and responsive craft.

---

## 1. Visual World & Direction

- **Atmosphere:** Minimal, monolithic, high-precision architectural luxury. Warm, crisp travertine stone meets dark obsidian and antique champagne brass.
- **Inspirations:** Conceptzilla ARCHIØN aesthetic, John Pawson minimalism, Peter Zumthor atmospheric materiality, Tadao Ando spatial geometries.
- **Reference Aesthetics:**
  - Crisp warm white surfaces (`#FAFAF8`, `#F5F4F0`) evoking limestone, Roman travertine, and unbleached cotton paper.
  - Deep obsidian contrast (`#111111`, `#1C1B19`) for high-contrast architectural typography and night-mode footer.
  - Hairline brass/gold accents (`#C5A880`, `#D4AF37`, `#A67C52`) denoting engineering precision and bespoke materiality.
  - Architectural drafting hatch patterns (45° diagonals, vertical louvers, crosshatch grids) as graphical motifs and data visualization backdrops.

---

## 2. Color Palette & Surface Tokens

| Token | Hex Value | Semantic Usage |
|---|---|---|
| `--bg-warm` | `#FAFAF8` | Primary page canvas, warm stone/travertine white |
| `--bg-card` | `#F5F4F0` | Elevated surfaces, project cards, metric badges |
| `--bg-dark` | `#111111` | Monolithic footer, consultation cards, dark drawer |
| `--gold-accent` | `#C5A880` | Brushed champagne brass, active indicators, borders |
| `--gold-light` | `#EAD7BB` | Soft gold glow, subtle hover highlights |
| `--gold-dark` | `#A67C52` | Deep burnished bronze, pressed button states |
| `--text-primary` | `#141413` | Headings, brand mark, high-contrast editorial body |
| `--text-muted` | `#6B6862` | Subtitles, project specifications, captions |
| `--border-light` | `#E5E3DD` | Hairline technical dividers, drafting grid lines |

---

## 3. Typography System

### Font Pairings
1. **Brand & Display Serif (`Cinzel` / `Syne`):**
   - Brand mark: `ARCHIØN` tracking `0.15em`, all caps, medium/semi-bold weight.
   - Editorial headlines: *"Build at Scale. Build for Impact."*
2. **Body & Technical Specs (`Plus Jakarta Sans`):**
   - Clean, geometric sans with high legibility at micro sizes (10px–13px for project metrics).
   - Numerics: tabular figures enabled for coordinate readouts and statistics.

### Scale & Hierarchy
- **Hero Display:** `clamp(2.5rem, 6vw, 5.5rem)` with tight tracking (`-0.02em`).
- **H2 Section Titles:** `clamp(2rem, 4vw, 3.5rem)`, leading `1.1`.
- **H3 Project Titles:** `clamp(1.25rem, 2.5vw, 2rem)`.
- **Architectural Metadata:** `0.75rem` (12px), uppercase, tracking `0.1em`, mono/tabular numerals.
- **Body Copy:** `0.9375rem` to `1.0625rem` (15–17px), leading `1.65`.

---

## 4. Architectural Hatching & Graphic Motifs

The visual identity relies heavily on architectural CAD and drafting blueprints:
- **Diagonal Hatch (`bg-hatch-diagonal`):** 45-degree parallel lines spaced at 8px, used for metric stat cards (40%, 80%, 95%).
- **Vertical Louver Hatch (`bg-hatch-vertical`):** Emulates modern solar louver facades, used behind project cards.
- **Crosshatch Matrix (`bg-hatch-cross`):** Dense drafting texture for structural detail callouts.
- **Hairline Dividers:** Crisp `1px` borders in `--border-light` or `rgba(197, 168, 128, 0.2)` gold tint.

---

## 5. Motion & Interaction Design (GSAP + Lenis)

### Smooth Scroll (Lenis)
- Smooth, weighted scrolling synchronized to GSAP's internal ticker (`gsap.ticker.lagSmoothing(0)`).
- Native fallback for touch devices to preserve high-refresh-rate 120Hz gesture scrolling.

### GSAP Choreography
- **Hero Reveal:** Pinned scale and clip-path expand (`inset(15% 15% 15% 15%)` -> `inset(0% 0% 0% 0%)`).
- **Text Split Entrance:** Staggered line-by-line slide from below with easing `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Horizontal Signature Showcase:** Pinned horizontal translation linked directly to vertical scroll with `ease: "none"`.
- **Interactive Magnetic Cursor:** Dual-state pointer with center crosshair dot and trailing gold brass ring that expands on interactive triggers.
- **Tactile Feedback:** Press states use `transform: scale(0.97)` on buttons and pills.

---

## 6. Responsiveness & Adaptive Layout

- **Mobile (< 640px):**
  - Fluid single-column stacks with edge-to-edge photography.
  - Horizontal scroll gallery smoothly converts into touch swipe or vertical cards.
  - Full-screen slide-out navigation with live timezone clocks.
  - Floating consultation quick-action.
- **Tablet (640px – 1024px):**
  - Two-column balanced grids.
  - Pinned metrics with adaptive padding.
- **Desktop (> 1024px):**
  - Multi-column editorial layouts matching the Conceptzilla reference.
  - Pinned GSAP ScrollTrigger timelines and custom magnetic cursor enabled.
