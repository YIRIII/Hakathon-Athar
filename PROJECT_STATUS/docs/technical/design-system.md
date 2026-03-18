# Design System — Athar (أثر) Heritage Platform

**Created:** 2026-03-18 | **Last Updated:** 2026-03-18

## Theme
- **Mode:** Both light and dark supported (light primary)
- **Aesthetic:** Islamic heritage — warm earthy tones, dignified and scholarly
- **Inspiration:** Sandstone architecture of Makkah/Madinah, Islamic geometric patterns, calligraphic gold accents

## Brand Colors
| Name | Hex | Usage |
|------|-----|-------|
| Heritage Gold | #C8A45C | Primary brand — buttons, links, accents |
| Desert Sand | #E8D5B7 | Light backgrounds, card surfaces |
| Sandstone | #B8956A | Secondary accents, borders |
| Islamic Green | #2D6A4F | Success states, heritage badges, nature |
| Deep Brown | #4A3728 | Dark text, headings |
| Warm Ivory | #FAF6F0 | Page backgrounds (light mode) |
| Night Sky | #1A1410 | Page backgrounds (dark mode) |
| Parchment | #F5EDE0 | Card surfaces (light mode) |
| Dark Walnut | #2C2218 | Card surfaces (dark mode) |

## Color Tokens
| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--bg-base` | #FAF6F0 (Warm Ivory) | #1A1410 (Night Sky) | Page background |
| `--bg-surface` | #F5EDE0 (Parchment) | #2C2218 (Dark Walnut) | Cards, panels |
| `--bg-elevated` | #EDE3D3 | #3D3129 | Modals, dropdowns |
| `--bg-muted` | #E8D5B7 (Desert Sand) | #4A3728 (Deep Brown) | Subtle backgrounds |
| `--text-primary` | #2C1810 | #FAF6F0 | Headings, body text |
| `--text-secondary` | #6B5744 | #C8A45C | Labels, descriptions |
| `--text-muted` | #9B8B7A | #8B7B6A | Hints, placeholders |
| `--border-default` | #D4C4AD | #4A3728 | Borders, dividers |
| `--border-subtle` | #E8D5B7 | #3D3129 | Subtle borders |
| `--primary` | #C8A45C (Heritage Gold) | #C8A45C | Primary buttons, links, focus rings |
| `--primary-hover` | #B8944C | #D8B46C | Button hover states |
| `--primary-foreground` | #FFFFFF | #1A1410 | Text on primary buttons |
| `--accent` | #2D6A4F (Islamic Green) | #3D8A6F | Highlights, badges, success |
| `--accent-foreground` | #FFFFFF | #FFFFFF | Text on accent backgrounds |
| `--danger` | #C53030 | #E53E3E | Errors, destructive actions |
| `--danger-foreground` | #FFFFFF | #FFFFFF | Text on danger backgrounds |
| `--warning` | #C8A45C | #D4AF37 | Warning states |
| `--success` | #2D6A4F | #3D8A6F | Success states |

## Typography
- **Font family (Arabic):** `"IBM Plex Sans Arabic", "Noto Sans Arabic", system-ui, sans-serif`
- **Font family (English):** `"Inter", "Geist", system-ui, sans-serif`
- **Font family (decorative):** `"Amiri", serif` — for heritage headings and certificates only
- **Scale:**
  - `text-xs`: 0.75rem (12px) — badges, small labels
  - `text-sm`: 0.875rem (14px) — body secondary, metadata
  - `text-base`: 1rem (16px) — body primary
  - `text-lg`: 1.125rem (18px) — section titles
  - `text-xl`: 1.25rem (20px) — card headings
  - `text-2xl`: 1.5rem (24px) — page section headers
  - `text-3xl`: 1.875rem (30px) — page titles
  - `text-4xl`: 2.25rem (36px) — hero headings
  - `text-5xl`: 3rem (48px) — landing hero
- **Font weight:** 400 (normal body), 500 (medium labels), 600 (semibold headings), 700 (bold hero)
- **Line height:** 1.6 for Arabic text (more generous), 1.5 for English

## Spacing
- **Base unit:** 4px (0.25rem)
- **Common gaps:**
  - `gap-1` (4px) — icon-to-label
  - `gap-2` (8px) — within compact groups
  - `gap-3` (12px) — between related items
  - `gap-4` (16px) — standard component spacing
  - `gap-6` (24px) — between sections within a card
  - `gap-8` (32px) — between cards/sections
  - `gap-12` (48px) — between major page sections
  - `gap-16` (64px) — between page-level blocks

## Border Radius
- `rounded-sm`: 4px — badges, small elements
- `rounded-md`: 8px — buttons, inputs
- `rounded-lg`: 12px — cards, panels
- `rounded-xl`: 16px — featured cards, hero elements
- `rounded-2xl`: 24px — large modals, certificate frames

## Shadows
- **Light mode:**
  - `shadow-sm`: `0 1px 2px rgba(74, 55, 40, 0.05)`
  - `shadow-md`: `0 4px 6px rgba(74, 55, 40, 0.07), 0 2px 4px rgba(74, 55, 40, 0.04)`
  - `shadow-lg`: `0 10px 15px rgba(74, 55, 40, 0.1), 0 4px 6px rgba(74, 55, 40, 0.05)`
- **Dark mode:**
  - `shadow-sm`: `0 1px 2px rgba(0, 0, 0, 0.2)`
  - `shadow-md`: `0 4px 6px rgba(0, 0, 0, 0.3)`
  - `shadow-lg`: `0 10px 15px rgba(0, 0, 0, 0.4)`

## Components (shadcn/ui customization)
| Component | Source | Heritage Customization |
|-----------|--------|----------------------|
| Button | shadcn/ui | Primary: Heritage Gold bg, rounded-md. Ghost: transparent with gold text hover |
| Card | shadcn/ui | Parchment bg, subtle border, rounded-lg, warm shadow |
| Badge | shadcn/ui | Site type badges: Religious (green), Archaeological (sandstone), Cultural (gold), Museum (brown) |
| Tabs | shadcn/ui | Underline style with Heritage Gold active indicator |
| Input | shadcn/ui | Parchment bg, sandstone border, gold focus ring |
| Dialog/Modal | shadcn/ui | Elevated bg, rounded-xl, warm shadow-lg |
| Sheet | shadcn/ui | Used for mobile sidebar, dark walnut bg in dark mode |
| DropdownMenu | shadcn/ui | Elevated bg, rounded-lg |

## Badge Color Map (Site Types)
| Type | Light BG | Light Text | Dark BG | Dark Text |
|------|----------|-----------|---------|----------|
| Religious | #E6F4EA | #2D6A4F | #1A3D2F | #6FCF97 |
| Archaeological | #FDF2E2 | #8B6914 | #3D3020 | #C8A45C |
| Cultural | #F0E6D4 | #6B5744 | #3D3129 | #B8956A |
| Museum | #EDE3D3 | #4A3728 | #2C2218 | #9B8B7A |

## Islamic Geometric Pattern (decorative use)
- Use CSS-based geometric patterns as subtle backgrounds on hero sections and certificates
- Pattern color: `var(--primary)` at 5% opacity over `var(--bg-base)`
- Use for: hero backgrounds, certificate borders, passport page background
- Do NOT overuse — patterns should be subtle, not overwhelming

## Responsive Breakpoints
| Name | Width | Usage |
|------|-------|-------|
| sm | 640px | Mobile |
| md | 768px | Tablet |
| lg | 1024px | Desktop (primary) |
| xl | 1280px | Wide desktop |
| 2xl | 1536px | Ultra-wide |

## RTL/LTR Rules
- All layouts must work in both RTL (Arabic) and LTR (English)
- Use logical CSS properties: `ps-4` not `pl-4`, `ms-auto` not `ml-auto`
- Use `gap-*` and `flex` instead of directional margins where possible
- Icons that indicate direction (arrows, chevrons) must flip in RTL
- Text alignment: use `text-start` / `text-end` not `text-left` / `text-right`

## Rules
- ALWAYS use semantic color tokens (`var(--primary)`, `bg-[var(--bg-surface)]`) — NEVER hardcode hex colors
- ALWAYS import from `@/components/ui/` before creating new components
- Every new component must support both light and dark themes
- Every layout must work in both RTL and LTR
- Arabic text gets `font-arabic` class, English text gets `font-sans`
- Heritage decorative text (certificates, headings on landing page) uses `font-serif` (Amiri)
- Test all UI changes in: light+LTR, light+RTL, dark+LTR, dark+RTL
