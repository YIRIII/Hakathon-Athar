# Capability 11: Admin CMS & Visitor Analytics Dashboard

**Tier**: Skip (Lightweight Research)
**Business Rank**: #11 (BR-10: Nice to Have, BR-11: Nice to Have) — Post-hackathon B2B features for Heritage Commission
**BR Reference**: BR-10 (Admin CMS), BR-11 (Visitor analytics dashboard)
**Date**: 2026-03-18

---

## Overview

Two post-hackathon capabilities bundled together:
1. **Admin CMS** — Allows the Heritage Commission to manage site content (descriptions, images, layered narratives) without developer intervention
2. **Visitor Analytics Dashboard** — B2B offering showing QR scans, chatbot usage, popular sites, and engagement time

Both are unnecessary for the hackathon MVP (content is managed via JSON-in-Git per Supporting Systems decision). These become relevant when onboarding the Heritage Commission as a paying partner.

---

## Part A: Headless CMS Options

The current approach (JSON files in Git) works for 30-60 content units managed by the dev team. A headless CMS becomes necessary when non-technical Heritage Commission staff need to update content independently.

### Option A1: Payload CMS 3.0 (Recommended)

**Type:** Open-source, self-hosted, Next.js-native
**Cost:** Free (MIT license). Self-host on Vercel free tier.

**Why it fits Athar:**
- **Next.js native** — installs directly into the existing `/app` folder. No separate backend to deploy. This is the only CMS that runs *inside* the Next.js app itself.
- **Arabic RTL support** — Built-in opt-in RTL text alignment for input fields when locale is RTL. Admin panel translated in 30+ languages.
- **Bilingual content** — Field-level localization with unlimited locales (ar/en). No plugins needed.
- **TypeScript-first** — Matches Athar's stack. Code-first schema configuration.
- **Image management** — Built-in media library with upload adapters (Vercel Blob, S3, local).
- **Supabase-compatible** — Uses PostgreSQL adapter, which works with Supabase's Postgres instance.

**Limitations:** Requires self-hosting (but Vercel free tier handles this). Newer ecosystem than Strapi — fewer community plugins.

**Source:** [Payload CMS 3.0 announcement](https://payloadcms.com/posts/blog/payload-30-the-first-cms-that-installs-directly-into-any-nextjs-app), [Payload i18n docs](https://payloadcms.com/docs/configuration/i18n), [Payload localization](https://payloadcms.com/docs/configuration/localization)

---

### Option A2: Sanity

**Type:** Hosted headless CMS (Sanity Cloud)
**Cost:** Free tier — 20 seats, 2 datasets, 500K API CDN requests/month, 1M API requests/month, 10GB bandwidth

**Why it fits:**
- Proven Arabic/RTL support — real-world Arabic projects exist (TalkInArabic.com)
- Field-level or document-level localization
- Real-time collaboration (multiple editors)
- Customizable Studio (React-based)
- GROQ query language is powerful for layered narratives

**Limitations:** External service (data leaves your infrastructure). Free tier generous but usage-metered. Separate deployment from Next.js app.

**Source:** [Sanity pricing](https://www.sanity.io/pricing), [Sanity localization docs](https://www.sanity.io/docs/studio/localization)

---

### Option A3: Strapi

**Type:** Open-source, self-hosted (Node.js)
**Cost:** Free (community edition, self-hosted)

**Why it fits:**
- Largest community ecosystem among open-source headless CMS
- Built-in i18n plugin for multilingual content
- REST + GraphQL APIs out of the box
- Rich media library

**Limitations:** Requires separate Node.js server (not Next.js-native). Self-hosting adds infrastructure complexity. RTL support requires custom admin panel CSS. Heavier resource footprint than Payload.

**Source:** [Strapi vs Payload comparison](https://www.glukhov.org/post/2025/11/headless-cms-comparison-strapi-directus-payload)

---

### Option A4: Directus

**Type:** Open-source, database-wrapper CMS
**Cost:** Free (self-hosted). Cloud starts at $99/month.

**Why it fits:**
- Wraps existing SQL database (could use Supabase Postgres directly)
- Auto-generates REST + GraphQL APIs from schema
- Good admin UI for non-technical users

**Limitations:** Separate deployment needed. Less Next.js integration. RTL support is basic. Heavier setup than Payload.

**Source:** [Directus documentation](https://docs.directus.io/)

---

### Option A5: Contentful

**Type:** Hosted headless CMS (SaaS)
**Cost:** Free tier — 25 content models, 50GB bandwidth, 100K API calls/month (reduced in April 2025)

**Why it fits:**
- Mature platform, enterprise-grade CDN
- Built-in localization

**Limitations:** Free tier significantly reduced in 2025. 25 content model limit is tight. Paid plan jumps to $300/month — far beyond bootstrap budget. Vendor lock-in.

**Source:** [Contentful pricing](https://www.contentful.com/pricing/), [Contentful free plan changes](https://wmkagency.com/blog/contentful-free-plan-changes-what-they-mean-for-your-website-and-how-to)

---

### CMS Scoring Matrix

| Criterion (Weight) | Payload 3.0 | Sanity | Strapi | Directus | Contentful |
|---|---|---|---|---|---|
| Next.js integration (25%) | 10 | 7 | 5 | 5 | 6 |
| Arabic/RTL support (20%) | 8 | 9 | 6 | 6 | 7 |
| Free tier viability (20%) | 10 | 8 | 9 | 9 | 4 |
| Bilingual content (15%) | 9 | 9 | 8 | 7 | 8 |
| Ease for non-tech users (10%) | 7 | 8 | 8 | 8 | 9 |
| Image management (10%) | 8 | 9 | 8 | 7 | 8 |
| **Weighted Score** | **9.0** | **8.2** | **7.1** | **6.8** | **6.5** |

**CMS Recommendation: Payload CMS 3.0** — Zero-cost, runs inside the existing Next.js app (no separate deployment), native RTL support, TypeScript-first. When the Heritage Commission needs content management post-hackathon, Payload can be added to the existing codebase with `npx create-payload-app` without architectural changes.

---

## Part B: Visitor Analytics Dashboard Options

The already-decided Umami Cloud (free) handles raw data collection (QR scans, page views, custom events). The question is how to present this data as a B2B dashboard for the Heritage Commission.

### Option B1: Custom Next.js Dashboard + Umami API (Recommended)

**Type:** Custom-built dashboard pages within the Athar app
**Cost:** $0 (dev time only)

**Approach:**
- Use Umami's REST API (`GET /api/websites/{id}/stats`, `/pageviews`, `/events`) to fetch analytics data
- Build dashboard pages in Next.js using existing UI framework (e.g., Recharts or Chart.js for visualizations)
- Track custom events via Umami for QR scans (`umami.track('qr-scan', { siteId })`) and chatbot usage
- Server-side API routes proxy Umami data to avoid exposing API keys

**Metrics to display:**
- QR scans per site (custom events)
- Chatbot conversations and popular questions (custom events)
- Popular heritage sites by visits (pageview data)
- Engagement time per site (built-in Umami metric)
- Daily/weekly/monthly trends

**Pros:** Full design control. Matches Athar's branding. Arabic RTL dashboard. No additional infrastructure. Data stays in Umami (already decided).
**Cons:** Requires dev time to build charts and dashboard UI.

**Source:** [Umami API overview](https://umami.is/docs/api), [Umami API client](https://github.com/umami-software/api-client)

---

### Option B2: Metabase (Self-Hosted)

**Type:** Open-source BI tool, self-hosted
**Cost:** Free (self-hosted, unlimited users). Cloud starts at $85/month.

**Approach:**
- Self-host Metabase (Docker container or Vercel)
- Connect directly to Supabase PostgreSQL
- If using Umami self-hosted, query Umami's Postgres tables directly
- Build dashboards with drag-and-drop interface

**Pros:** No-code dashboard building. Powerful query builder. Embeddable (iframe). Free self-hosted.
**Cons:** Requires separate hosting infrastructure (adds complexity). Free embedded dashboards show "Powered by Metabase" watermark. Umami Cloud data not directly queryable (need API bridge or self-host Umami too). Limited RTL/Arabic support in the UI.

**Source:** [Metabase pricing](https://www.metabase.com/pricing/), [Metabase embedded analytics](https://www.metabase.com/product/embedded-analytics)

---

### Option B3: Grafana Cloud (Free Tier)

**Type:** Hosted observability/dashboard platform
**Cost:** Free tier — 3 users, 10K metrics series, 14-day retention

**Approach:**
- Push analytics events to Grafana via Prometheus or custom data source
- Build dashboards using Grafana's editor

**Pros:** Powerful visualization. Free tier available. Real-time dashboards.
**Cons:** Designed for infrastructure monitoring, not business analytics. Overkill for visitor metrics. Requires data pipeline to ingest Umami data. 14-day retention on free tier is insufficient for monthly reporting. No Arabic RTL support.

**Source:** [Grafana pricing](https://grafana.com/pricing/)

---

### Analytics Dashboard Scoring

| Criterion (Weight) | Custom + Umami API | Metabase | Grafana |
|---|---|---|---|
| Cost (25%) | 10 | 8 | 8 |
| Integration with stack (25%) | 10 | 5 | 4 |
| Arabic/RTL support (20%) | 10 | 4 | 3 |
| Ease of build (15%) | 5 | 8 | 6 |
| Heritage Commission UX (15%) | 9 | 7 | 5 |
| **Weighted Score** | **9.0** | **6.3** | **5.2** |

**Dashboard Recommendation: Custom Next.js dashboard using Umami API** — Zero additional infrastructure, full RTL/Arabic control, seamless integration with Athar's existing stack. Umami's API provides all the raw data needed. The only cost is development time, which is acceptable for a post-hackathon feature.

---

## Combined Recommendation

| Component | Choice | Cost | When to Build |
|---|---|---|---|
| **Admin CMS** | Payload CMS 3.0 | $0 | Post-hackathon, when Heritage Commission partnership formalized |
| **Analytics Dashboard** | Custom Next.js + Umami API | $0 | Post-hackathon, as B2B offering for Heritage Commission |

**Total Estimated Year 1 Cost: $0** (both use free tiers/open-source, no additional infrastructure beyond what Athar already runs)

**Migration path from current state:**
1. **Hackathon**: JSON-in-Git content management (already decided) + Umami Cloud tracking (already decided)
2. **Post-hackathon**: Add Payload CMS to Next.js app (content migration from JSON) + Build dashboard pages pulling from Umami API
3. **Growth**: If Heritage Commission needs multi-tenant CMS or white-label dashboards, evaluate Sanity (for managed CMS) or Metabase (for self-service analytics)

---

## Key Risk

**Single risk:** Both features depend on Heritage Commission partnership materializing. If no B2B relationship forms, these capabilities have zero value. Mitigated by the $0 cost of selected options — no investment wasted if partnership doesn't happen.
