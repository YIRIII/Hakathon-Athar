# Phase 0: Project Foundation

**Generated:** 2026-03-18 | **Source:** idea-forge/athar-heritage-platform | **Tier:** B
**Status:** planned

## Research Links
- **BRD:** [BRD.md](../../project_documents/BRD.md)
- **PRD:** [PRD.md](../../project_documents/PRD.md)
- **Technical Options:** TC-6 (Bilingual PWA) → [06-bilingual-pwa-framework.md](../../project_documents/TECHNICAL_OPTIONS/06-bilingual-pwa-framework.md)
- **Supporting Systems:** [README.md](../../project_documents/SUPPORTING_SYSTEMS/README.md)

## Recommended Tech Stack
- **Framework:** Next.js 14+ with App Router
- **Database:** Supabase (PostgreSQL + Auth + Vector Storage)
- **UI:** shadcn/ui + Tailwind CSS
- **i18n:** next-intl (Arabic RTL primary + English)
- **PWA:** Serwist (service worker)
- **Hosting:** Vercel (Hobby plan)
- **CDN:** Cloudflare
- **Monitoring:** Sentry (errors) + Langfuse (LLM tracing)
- **Analytics:** Umami

## Estimated Cost
$0 cash (all free tiers)

## Budget Context
- **Active tier:** Bootstrap
- **Phase cost vs. budget:** $0 — well within Bootstrap tier ($200-$2,170/year)
- **Domain breakdown:** Infrastructure $0 (domain purchased separately)
- **Sanity check:** PASS

## Prerequisites
- None — this is the first phase
- Supabase account required (free tier)
- Vercel account required (Hobby plan)

## Design System Preferences (from user)
- **Theme:** Islamic/historical/Saudi heritage — warm earthy tones, deep gold, desert sand, Islamic green accents
- **Color mode:** To be designed with heritage theme in mind
- **Component library:** shadcn/ui (Tailwind-based)
- **Layout:** Desktop-first, responsive (future mobile app planned)

## Implementation Steps
- [ ] **0.1:** Initialize Next.js 14+ project with App Router, TypeScript, Tailwind CSS, and ESLint
- [ ] **0.2:** Set up Supabase project — database, auth, and configure Row Level Security policies
- [ ] **0.3:** Install and configure shadcn/ui component library with Tailwind
- [ ] **0.4:** Configure next-intl for Arabic (RTL primary) + English bilingual support with locale switching
- [ ] **0.5:** Set up Serwist for PWA — service worker, manifest.json, offline fallback page
- [ ] **0.6:** Create design system reference doc (PROJECT_STATUS/docs/technical/design-system.md) — Islamic heritage color tokens, typography, spacing, component catalog
- [ ] **0.7:** Build base UI layout — app shell with header, navigation, locale toggle, footer, RTL/LTR switching
- [ ] **0.8:** Create heritage content data model in Supabase — sites table (name_ar, name_en, description layers, coordinates, type classification, city, images), QR codes table, visitor stamps table
- [ ] **0.9:** Seed initial heritage site data — 10-12 sites across Makkah and Madinah with bilingual content
- [ ] **0.10:** Build PDPL privacy consent banner (Arabic + English) — GPS consent, cookie-less analytics notice, data subject rights page
- [ ] **0.11:** Configure Vercel deployment with environment variables and Cloudflare CDN
- [ ] **0.12:** Add design system reference to CLAUDE.md for all future sessions

## Key Decisions (from research)
- Next.js App Router over Pages Router — better SSR, server components, streaming
- Supabase over Firebase — PostgreSQL for complex queries, pgvector for future RAG, free tier more generous
- shadcn/ui over MUI — better Tailwind integration, smaller bundle, more customizable
- next-intl over next-i18next — native App Router support, better RSC compatibility
- Serwist over next-pwa — actively maintained fork, better App Router support

## Acceptance Criteria
- Next.js app builds and deploys to Vercel without errors
- Arabic RTL and English LTR switch without page reload
- PWA installable on desktop and mobile browsers
- Supabase tables created with RLS policies
- Heritage data seeded and queryable
- PDPL consent banner displays on first visit
- Design system doc created and referenced in CLAUDE.md

## Research Gaps
- No PRICING_STRATEGY: Can't determine which features are free vs premium tier — defaulting to BRD priority (Hero=free, Depth=mixed, Skip=premium)
- No CONSTRAINT_VALIDATION: Combined feasibility of Next.js + Supabase + all free tiers not formally verified
