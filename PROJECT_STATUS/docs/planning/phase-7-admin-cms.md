# Phase 7: Admin CMS & Content Management

**Generated:** 2026-03-18 | **Source:** idea-forge/athar-heritage-platform | **Tier:** B
**Status:** planned

## Research Links
- **Business Research:** BR-10 (Admin CMS) — Score 2.00, BR-11 (Analytics Dashboard) — Score 2.60 → [10-admin-cms.md](../../project_documents/BUSINESS_RESEARCH/10-admin-cms.md), [11-visitor-analytics.md](../../project_documents/BUSINESS_RESEARCH/11-visitor-analytics.md)
- **Technical Options:** TC-11 (Admin CMS & Visitor Analytics) → [11-admin-cms-analytics.md](../../project_documents/TECHNICAL_OPTIONS/11-admin-cms-analytics.md)
- **PRD:** F11 (Admin CMS & Analytics — Phase 3 feature)

## Recommended Tech Stack
- **CMS:** Payload CMS 3.0 (Next.js native, self-hosted on Vercel)
- **Dashboard:** Custom React components with shadcn/ui charts
- **Data:** Supabase views and aggregation queries

## Estimated Cost
$0 cash (Payload CMS is open-source, hosted on same Vercel deployment)

## Budget Context
- **Active tier:** Bootstrap (may be Growth by this phase)
- **Phase cost vs. budget:** $0
- **Sanity check:** PASS

## Prerequisites
- Phase 0 must be complete (Supabase, base UI)
- Phase 6 should be complete (analytics data feeds dashboard)
- All content-producing phases (1-4) should be complete (CMS manages this content)

## Implementation Steps
- [ ] **7.1:** Install and configure Payload CMS 3.0 — integrate with existing Next.js App Router, connect to Supabase PostgreSQL
- [ ] **7.2:** Define CMS collections — heritage sites (bilingual fields), QR codes, heritage stories/narratives, media library
- [ ] **7.3:** Build content editor experience — Arabic RTL editor, bilingual field pairs (name_ar/name_en), image upload with WebP optimization
- [ ] **7.4:** Create role-based access — Heritage Commission editors (content only), Athar admins (full access), read-only analysts
- [ ] **7.5:** Build visitor analytics dashboard — QR scan counts by site/date, chatbot conversation metrics, engagement time, popular sites, certificate sharing stats
- [ ] **7.6:** Add content publishing workflow — draft → review → publish states, bilingual content completeness checks
- [ ] **7.7:** Build B2B government dashboard view — aggregate metrics for Heritage Commission / Saudi Tourism Authority reporting

## Key Decisions (from research)
- Payload CMS 3.0 over Strapi/Sanity — native Next.js integration (same deployment), TypeScript, self-hosted (free)
- Custom dashboard over Grafana/Metabase — tighter integration with heritage data model, heritage-themed UI
- Role-based access over single admin — supports Heritage Commission editors and future B2B clients

## Acceptance Criteria
- Heritage Commission editors can create/edit bilingual site content without code
- Content changes reflect on public site after publishing
- Analytics dashboard shows real-time metrics from Supabase
- Role-based access controls enforced
- Arabic RTL content editing works correctly in CMS

## Competitive Context
- No heritage CMS combines Arabic-first RTL, QR-linked publishing, and bilingual layered narratives
- B2B dashboard differentiates from pure consumer apps — government stakeholder value

## Research Gaps
- No PRICING_STRATEGY: B2B dashboard pricing for Heritage Commission / tourism authorities not researched
- No CUSTOMER_VALIDATION: Heritage Commission willingness to use digital CMS not validated
