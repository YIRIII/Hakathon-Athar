# Supporting Systems Analysis — Athar (أثر)

| Field | Value |
|-------|-------|
| **Version** | 1.0 |
| **Date** | 2026-03-18 |
| **Status** | Complete |
| **Author** | Claude (Idea Forge Pipeline) |
| **BRD Reference** | [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) |
| **Business Research** | [BUSINESS_RESEARCH/](../BUSINESS_RESEARCH/README.md) |
| **Budget Context** | [BUDGET_CONTEXT.md](../BUDGET_CONTEXT.md) |

---

## Research Progress

| # | System | Priority | File | Status | Updated |
|---|--------|----------|------|--------|---------|
| 1 | Authentication & User Management | Essential | [01-authentication.md](01-authentication.md) | complete | 2026-03-18 |
| 2 | Content Management (Internal) | Essential | [02-content-management.md](02-content-management.md) | complete | 2026-03-18 |
| 3 | Hosting & CDN Infrastructure | Essential | [03-hosting-cdn.md](03-hosting-cdn.md) | complete | 2026-03-18 |
| 4 | Monitoring & Error Tracking | Growth | [04-monitoring.md](04-monitoring.md) | complete | 2026-03-18 |
| 5 | Product Analytics | Growth | [05-product-analytics.md](05-product-analytics.md) | complete | 2026-03-18 |
| 6 | Privacy & Consent Management | Essential | [06-privacy-consent.md](06-privacy-consent.md) | complete | 2026-03-18 |

---

## Detected Systems Summary

| # | System | Detection Signals | Source Documents | Priority |
|---|--------|-------------------|-----------------|----------|
| 1 | Authentication & User Management | Premium subscribers need accounts; heritage passport stamps need persistent state; multiple user types | BR-6, BRD §8, BRD §12 | Essential |
| 2 | Content Management (Internal) | 30-60 bilingual content units; layered micro-narratives; scholarly accuracy requirements | BR-2, Domain Research | Essential |
| 3 | Hosting & CDN Infrastructure | PWA hosting; heritage images CDN; AI chatbot API; PDPL data residency preference | BRD §13, BRD §12, RESEARCH.md §4 | Essential |
| 4 | Monitoring & Error Tracking | AI chatbot hallucination risk; PWA error tracking; QR scan reliability | BR-4, BRD §10 R-4, BRD §9 | Growth |
| 5 | Product Analytics | QR scans, chatbot usage, conversion funnel, engagement metrics needed for BRD success criteria | BRD §9 | Growth |
| 6 | Privacy & Consent Management | PDPL requires consent for GPS location (sensitive data); Arabic privacy notice; data subject rights | BRD §12, BR-8, BRD §10 R-7 | Essential |

---

## Priority Classification

### Essential (Must-Have for Launch)

| # | System | Recommendation | Year 1 Cost (Cash) | Rationale |
|---|--------|---------------|---------------------|-----------|
| 1 | Authentication & User Management | Open-source: NextAuth.js + Supabase | $0 | Enables heritage passport persistence, premium subscriptions, and PDPL compliance. Supabase free tier: 50K MAU. |
| 2 | Content Management (Internal) | File-based: JSON in Git | $0 | 30-60 content units managed via Git. Zero cost, instant versioning, native Next.js import. |
| 3 | Hosting & CDN Infrastructure | Buy: Vercel Hobby + Cloudflare CDN | $10-15 (domain only) | Vercel free: 100GB bandwidth (~100K visitors). Cloudflare free: Jeddah/Riyadh edge nodes. |
| 6 | Privacy & Consent Management | Build custom: React consent banner | $0 | PDPL legal requirement. No CMP supports PDPL natively. Simple React component (~100 lines). |

### Growth (Needed for Scaling)

| # | System | Recommendation | Year 1 Cost (Cash) | Rationale |
|---|--------|---------------|---------------------|-----------|
| 4 | Monitoring & Error Tracking | Buy: Sentry Free + Langfuse Free | $0 | Critical once real users interact with AI chatbot. Hallucination detection needed before Heritage Commission demo. |
| 5 | Product Analytics | Open-source: Umami Cloud (free) | $0 | Privacy-first (no cookies = no consent banner needed). Measures BRD §9 success criteria. |

### Enterprise (Deferred)

*No enterprise-tier supporting systems identified. All 6 systems are Essential or Growth.*

---

## Cost Impact Summary

### Monthly/Annual by Priority Tier

| Tier | Monthly Cost | Annual Cost | Systems |
|------|-------------|-------------|---------|
| Essential | $0-$1.25 | $10-$15 | Auth, Content, Hosting, Privacy |
| Growth | $0 | $0 | Monitoring, Analytics |
| Enterprise | — | — | None |
| **Total** | **$0-$1.25** | **$10-$15** | |

### Fully-Loaded Cost (Including Founder Time)

| Tier | Setup (One-Time) | Annual Maintenance | Total Year 1 |
|------|-----------------|-------------------|---------------|
| Essential | $70-$123 (4-7 hrs) | $210 (12 hrs) | $280-$333 |
| Growth | $53-$62 (3-3.5 hrs) | $0 | $53-$62 |
| **Total** | **$123-$185** | **$210** | **$333-$395** |

### Cost Scaling Projection

| Scale | Monthly Cost | Annual Cost | Key Cost Drivers |
|-------|-------------|-------------|-----------------|
| 100 users | $0 | $10-15 | Domain registration only; all services on free tiers |
| 10,000 users | $0 | $10-15 | Still within free tiers (Supabase 50K MAU, Vercel 100K visitors, Umami 100K events) |
| 100,000 users | $45-70/mo | $540-840 | Supabase Pro ($25), Vercel Pro ($20), Sentry Team ($26 if needed) |

### Cost Sanity Check

- **Supporting systems budget envelope (bootstrapped)**: $0-$300/year (from BUDGET_CONTEXT.md)
- **Actual Year 1 cost (cash)**: $10-$15 — **well within budget**
- **As % of Year 1 revenue ($6,692)**: 0.2% — **well below 15% threshold**
- **Fully-loaded Year 1 cost**: $333-$395 — exceeds cash budget but founder time is not cash-costed at bootstrapped stage

---

## Build vs Buy Recommendations

### Summary Table

| # | System | Recommendation | Alternative | Switch Trigger |
|---|--------|---------------|-------------|---------------|
| 1 | Authentication | Open-source: NextAuth.js + Supabase | Clerk ($25/mo) | If team wants pre-built auth UI + dashboard |
| 2 | Content Management | File-based: JSON in Git | Sanity free tier | When Heritage Commission needs non-technical content editing |
| 3 | Hosting & CDN | Buy: Vercel + Cloudflare | Cloudflare Pages | If Vercel Hobby TOS is an issue for commercial use |
| 4 | Monitoring | Buy: Sentry + Langfuse (free) | Langfuse only | If budget forces choosing one tool |
| 5 | Analytics | Open-source: Umami Cloud | PostHog Cloud | If needing session replay or A/B testing |
| 6 | Privacy & Consent | Build custom | Klaro open-source | If PDPL regulations add complexity (cookie scanning, audit trails) |

### Build Summary

**Systems recommended to build:** 1
- Privacy & Consent Management: Simple React consent banner + Arabic privacy page. No CMP supports PDPL natively; building is simpler than adapting a European framework.

**Total estimated build effort:** ~0.5 person-weeks (1-2 days consent + privacy page)

### Buy/Open-Source Summary

**Systems recommended to buy/SaaS or open-source:** 5
- Authentication → NextAuth.js + Supabase: $0/year (free tiers, 50K MAU)
- Content → JSON files in Git: $0/year
- Hosting → Vercel + Cloudflare: $10-15/year (domain only)
- Monitoring → Sentry + Langfuse: $0/year (free tiers)
- Analytics → Umami Cloud: $0/year (free tier, 100K events/mo)

**Total estimated annual SaaS cost:** $10-$15 (domain registration only)

---

## Impact on Downstream Skills

### For /marketing-strategy
- **Zero-cost infrastructure enables aggressive free-tier strategy** — supporting systems add virtually nothing to CAC. Marketing can focus budget entirely on user acquisition.
- **Umami analytics enables campaign tracking** — QR scan attribution, referral tracking, conversion funnel from first scan to registration to premium.
- **Consent banner affects first-visit UX** — marketing should account for consent friction in conversion estimates.

### For /tech-research
- **NextAuth.js + Supabase is the auth stack** — tech research for BR-4 (chatbot) and BR-6 (passport) should assume this auth backend. Supabase provides the database for passport stamps.
- **Vercel hosting constrains serverless** — AI chatbot API route runs as Vercel serverless function (10s timeout on Hobby, 60s on Pro). Tech research for BR-4 should evaluate whether LLM response times fit within this constraint.
- **JSON content files determine content architecture** — tech research for BR-2 (site pages) should assume JSON import, not API-based CMS.
- **Langfuse integration needed for chatbot** — tech research for BR-4 should include Langfuse tracing in the RAG pipeline design.

### For /pricing-strategy
- **Per-user supporting system cost: ~$0** at Year 1 scale — supporting systems have negligible impact on unit economics.
- **At 100K users: ~$0.007/user/month** — Supabase Pro + Vercel Pro + potential Sentry upgrade = ~$70/mo ÷ 100K users.
- **Free tiers create a cost cliff** — pricing strategy should note that costs remain ~$0 until 50K users (Supabase threshold), then jump to $25/mo. This is a favorable structure for a freemium model.

---

## Open Questions & Next Steps

- [ ] **Vercel Hobby TOS**: Verify that Vercel Hobby plan allows commercial use for a freemium tourism app. If not, Vercel Pro ($20/mo) or Cloudflare Pages needed.
- [ ] **Supabase data residency**: Supabase doesn't have a Saudi Arabia region. Closest is likely US/EU. For full PDPL compliance on user data storage, may need to evaluate Supabase self-hosted on Oracle Cloud Jeddah post-hackathon.
- [ ] **Consent banner UX testing**: The consent banner must not deter pilgrims from using the app. Test Arabic consent copy with diverse pilgrim demographics.
- [ ] **Heritage Commission IT requirements**: If the government partnership materializes, they may have specific hosting/security requirements (e.g., Saudi hosting mandatory, penetration testing). Clarify early.

---

*This supporting systems analysis was generated by Idea Forge using real vendor pricing and open-source research data. All pricing was researched on 2026-03-18 and should be verified before making purchasing decisions.*
