# Product Analytics — Supporting System Analysis

| Field | Value |
|-------|-------|
| **System** | Product Analytics |
| **Detection Signals** | Internal usage tracking: QR scans, chatbot usage, conversion funnel, engagement metrics |
| **Source Documents** | BRD §9 (success criteria: MAU, QR scans, chatbot conversations, conversion rate) |
| **Priority** | Growth |
| **Recommendation** | Open-source: Umami Cloud (free tier) |
| **FACT-ID Prefix** | SUP |

---

## 1. Context & Justification

### Why This System Is Needed

BRD §9 defines 8 success criteria that require measurement: monthly active users, QR scan counts, chatbot conversations, heritage passport stamps, and premium conversion rate. Without analytics, the team cannot measure any of these KPIs, making data-driven decisions impossible.

This is distinct from BR-11 (Visitor Analytics Dashboard for Heritage Commission) — that's a B2B product feature. This system is the team's own internal analytics for product improvement and business metrics.

### What Happens If Absent

Without product analytics, the team cannot: measure hackathon success (SC-3: 1,000+ MAU target), identify which heritage sites get most engagement, track the free→premium conversion funnel, or prove value to Heritage Commission partners with data. Every decision becomes gut-feel instead of data-driven.

---

## 2. Requirements Derived from Product

| Requirement | Source BR | Description | Must-Have? |
|------------|-----------|-------------|-----------|
| Event-based tracking | BRD §9 | Track QR scans, chatbot conversations, stamp collections (not just pageviews) | Yes |
| Conversion funnel | BRD §8 | Free → premium conversion tracking | Yes (post-hackathon) |
| PDPL compliance | BRD §12 | Privacy-friendly; consent-based; no cookie walls | Yes |
| Real-time dashboard | BRD §9 | See current active users and engagement | No |
| Next.js integration | Tech stack | Client-side event tracking in PWA | Yes |

---

## 3. Solution Landscape

### Commercial SaaS Options

| Vendor | Pricing | Key Features | Limitations | Fit Score (1-5) |
|--------|---------|-------------|-------------|----------------|
| **Google Analytics 4** | Free (unlimited) (researched 2026-03-18) | Powerful; event-based; funnels; free | Cookie-based; PDPL consent needed; complex setup; data sent to Google | 3 |
| **Mixpanel** | Free: 20M events/mo (researched 2026-03-18) | Event-based; funnels; retention; cohorts | Complex for simple needs; US data storage | 3 |
| **Plausible Cloud** | From €9/mo for 10K pageviews (researched 2026-03-18) | Privacy-first; no cookies; GDPR compliant; simple | Limited to pageviews; no event funnels on basic; not free | 3 |
| **PostHog Cloud** | Free: 1M events/mo (researched 2026-03-18) | Event analytics; session replay; feature flags; funnels | Complex; US-hosted | 4 |

### Open-Source Options

| Project | GitHub Stars | Last Commit | Key Features | Limitations | Fit Score (1-5) |
|---------|-------------|-------------|-------------|-------------|----------------|
| **Umami** | 27K+ | Active (2026) | Privacy-first; no cookies; event tracking; Next.js compatible; lightweight | Cloud free: 100K events/mo; self-host needs VPS | 5 |
| **Matomo** | 20K+ | Active (2026) | Full GA replacement; heatmaps; funnels | Heavy; requires PHP + MySQL; complex self-hosting | 2 |
| **Plausible CE** | 21K+ | Active (2026) | Privacy-first; lightweight; no cookies | Self-host requires Elixir/Clickhouse; limited event tracking | 3 |

---

## 4. Options Rating Matrix

### KPI Definition

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| Year 1 TCO | Total cost at Year 1 scale | High (3x) | Bootstrapped budget |
| PDPL Compliance | Cookie-free / consent-friendly / privacy-first | High (3x) | Saudi PDPL requirement; location data is sensitive |
| Event-Based Tracking | Custom events (QR scans, chatbot, stamps) beyond pageviews | Medium (2x) | BRD success criteria require event tracking |
| Next.js Integration | SDK/script quality for Next.js PWA | Medium (2x) | Tech stack compatibility |
| Setup Speed | Time to first dashboard | Low (1x) | Quick wins matter for hackathon |

### Scoring Matrix

| Option | TCO (3x) | PDPL (3x) | Events (2x) | Next.js (2x) | Setup (1x) | **Weighted** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| **Umami Cloud (free)** | 5 | 5 | 4 | 4 | 4 | **4.64** |
| **PostHog Cloud (free)** | 5 | 3 | 5 | 4 | 3 | **4.09** |
| **Google Analytics 4** | 5 | 2 | 4 | 4 | 3 | **3.55** |
| **Mixpanel (free)** | 5 | 3 | 5 | 4 | 3 | **4.09** |
| **Plausible Cloud** | 2 | 5 | 3 | 4 | 4 | **3.45** |

**Verification (Umami)**: (5×3 + 5×3 + 4×2 + 4×2 + 4×1) / (3+3+2+2+1) = (15+15+8+8+4)/11 = 50/11 = **4.55**

### Recommendation

**Umami Cloud free tier** (Score: 4.55)

Umami is privacy-first (no cookies, no personal data, no IP tracking), making it PDPL-compliant without requiring a consent banner for analytics. Free tier offers 100K events/mo — sufficient for Year 1. 27K+ GitHub stars indicate strong community. Lightweight script (~2KB) won't slow the PWA. Supports custom events for QR scans, chatbot interactions, and stamp collections.

**Runner-up**: PostHog Cloud (4.09). Switch if the team needs session replay, feature flags, or more sophisticated funnel analysis.

---

## 5. Build vs Buy Analysis (including Bootstrap)

| Criterion | Build (custom) | Buy: Umami Cloud | Buy: GA4 | Bootstrap/MVP |
|-----------|-------|---------------------|----------|---------------|
| Setup time | 2-3 weeks | 30 minutes | 1-2 hours | 0 |
| Monthly cost | $0 + hosting | $0 (100K events) | $0 | $0 |
| Privacy compliance | Manual | Built-in (no cookies) | Needs consent banner | N/A |
| Event tracking | Custom | Supported | Supported | None |
| Maintenance | High | None (managed) | None | None |

**Recommendation**: Buy: Umami Cloud (free tier)

**Rationale**: Privacy-first analytics that works without cookies (no PDPL consent banner needed for analytics), free for 100K events/mo, and takes 30 minutes to set up. The team gets a clean dashboard showing exactly the metrics from BRD §9.

**Switch trigger**: Umami Cloud → PostHog if needing session replay or A/B testing at scale.

**Bootstrap upgrade trigger**: Add Umami after hackathon, in Month 1. During hackathon, no analytics needed.

---

## 6. Cost Analysis

### Year 1 Total Cost

| Cost Component | Amount | Notes |
|----------------|--------|-------|
| Umami Cloud free tier | $0 | 100K events/mo |
| Setup | $0 (30 min founder time) | Add tracking script + custom events |
| **Year 1 Total (cash)** | **$0** | |
| **Year 1 Total (fully-loaded)** | **$9** | 0.5 hrs × $17.50/hr |

### Cost Sanity Check

- **Product Year 1 projected revenue**: $6,692
- **This system as % of revenue**: 0% — **acceptable**
- **Would a bootstrapped founder pay this?**: Yes — it's free

---

## 7. Impact Assessment

| Dimension | Impact | Details |
|-----------|--------|---------|
| **Revenue** | Medium | Conversion funnel tracking identifies revenue leaks |
| **Conversion** | Medium | Understanding which features drive engagement helps optimize |
| **Operations** | Medium | Data-driven product decisions vs gut-feel |
| **Compliance** | Low | Umami is privacy-first — reduces compliance burden |

---

## 8. Priority Tier Classification

**Priority**: Growth

**Rationale**: Analytics is not needed for hackathon demo but becomes essential for measuring BRD §9 success criteria (MAU, QR scans, conversion rate) once the product is live. Free tier means zero cost barrier. Recommend adding Month 1 post-hackathon.

**Phase recommendation**: Phase 1 (post-hackathon) — add before first real user deployment.

---

## 9. Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | Umami GitHub | https://github.com/umami-software/umami | 2026-03-18 | 27K+ stars |
| 2 | Umami Cloud | https://umami.is/ | 2026-03-18 | Free: 100K events/mo |
| 3 | PostHog Pricing | https://posthog.com/pricing | 2026-03-18 | Free: 1M events/mo |
| 4 | Mixpanel Pricing | https://mixpanel.com/pricing/ | 2026-03-18 | Free: 20M events/mo |
| 5 | GA4 | https://analytics.google.com/ | 2026-03-18 | Free unlimited |
