# Athar (أثر) — Interactive Heritage Discovery Platform

An interactive digital platform that transforms the experience of exploring historical and heritage sites in Makkah and Madinah through smart maps, QR codes, AI-powered heritage chatbot, and digital visit certificates.

## Tech Stack
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Database:** Supabase (PostgreSQL + pgvector + Auth + RLS)
- **UI:** shadcn/ui + Tailwind CSS
- **i18n:** next-intl (Arabic RTL primary, English secondary)
- **PWA:** Serwist
- **AI/LLM:** Gemini Flash-Lite via Vercel AI SDK
- **Hosting:** Vercel + Cloudflare CDN

## Project Context
- **Team:** 4-person student team
- **Context:** Hackathon for Historical and Enrichment Sites (3rd Edition) — Ministry of Hajj & Umrah + Umm Al-Qura University
- **Target:** 18.5M Hajj/Umrah pilgrims + 86.2M Saudi domestic tourists annually

## Pipeline
- **Tracking:** PROJECT_STATUS/ directory
- **Roadmap:** PROJECT_STATUS/roadmap.md
- **Planning docs:** PROJECT_STATUS/docs/planning/
- **Research snapshot:** PROJECT_STATUS/project_documents/ (read-only)

## Key Rules
- Arabic (RTL) is the primary language — always implement Arabic first
- Islamic cultural sensitivity — no prophet voice impersonation, respectful tone for sacred sites
- PDPL compliance — Saudi Personal Data Protection Law requires Arabic privacy notice, GPS consent
- Photography restrictions — no photos from inside Masjid al-Haram or Masjid an-Nabawi
- Heritage content must use third-person scholarly voice with source attribution
- All free tiers — $0 cash budget for MVP

## UI & Design System

When creating or modifying any UI component, ALWAYS read the design system first:
- **Design system:** PROJECT_STATUS/docs/technical/design-system.md
- **Shared components:** src/components/ui/ (shadcn/ui)
- **Layout components:** src/components/layout/ (header, footer, locale toggle, theme toggle)

Key rules:
- Use semantic color tokens (bg-primary, text-muted-foreground) — never hardcode hex colors
- Import shared components from @/components/ui/ before creating new ones
- Support both light and dark themes
- Support both RTL (Arabic) and LTR (English) — use logical properties (ps, pe, ms, me)
- Arabic text uses IBM Plex Sans Arabic font
- Heritage decorative text uses Amiri serif font (certificates, landing page)
- Test changes in all 4 combinations: light+LTR, light+RTL, dark+LTR, dark+RTL

## Mock Data (Frontend Prototype)

During the frontend prototype phase, all data comes from static files:
- **Sites:** src/data/sites.ts
- **Stamps:** src/data/stamps.ts
- **Chat messages:** src/data/chat-messages.ts
- **Suggested questions:** src/data/suggested-questions.ts

These will be replaced with Supabase queries when the backend is connected.
