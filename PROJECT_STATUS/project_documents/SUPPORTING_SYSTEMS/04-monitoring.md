# Monitoring & Error Tracking — Supporting System Analysis

| Field | Value |
|-------|-------|
| **System** | Monitoring & Error Tracking |
| **Detection Signals** | AI chatbot hallucination risk, PWA error tracking, QR scan reliability |
| **Source Documents** | BR-4 (AI chatbot), BRD §10 R-4 (hallucination), BRD §9 (success criteria) |
| **Priority** | Growth |
| **Recommendation** | Buy: Sentry Free (errors) + Langfuse Free (AI monitoring) |
| **FACT-ID Prefix** | SUP |

---

## 1. Context & Justification

### Why This System Is Needed

Athar has an AI chatbot (BR-4) that discusses Islamic heritage — a domain where inaccurate content can cause cultural offense and damage credibility. BRD §10 R-4 identifies AI hallucination as a Medium probability / High impact risk. Monitoring the chatbot's response quality is critical for maintaining trust.

Beyond AI, the PWA needs standard error tracking: broken QR scan flows, map rendering failures, and auth errors. Without monitoring, the team flies blind — bugs are discovered when users complain (or stop using the app).

### What Happens If Absent

Without monitoring, the AI chatbot could hallucinate incorrect Islamic heritage facts for days before anyone notices. QR scan failures at physical sites would go undetected. The team has no data on error rates, response quality, or system health — making iterative improvement impossible.

---

## 2. Requirements Derived from Product

| Requirement | Source BR | Description | Must-Have? |
|------------|-----------|-------------|-----------|
| Frontend error tracking | All BRs | Catch JS errors in PWA across browsers | Yes (post-hackathon) |
| AI chatbot monitoring | BR-4 | Track response quality, hallucination detection, latency | Yes (post-hackathon) |
| QR scan success rate | BR-3 | Track scan failures by device/browser | No |
| Uptime monitoring | All BRs | Know when the app is down | No (Vercel handles this) |

---

## 3. Solution Landscape

### Commercial SaaS Options

| Vendor | Pricing | Key Features | Limitations | Fit Score (1-5) |
|--------|---------|-------------|-------------|----------------|
| **Sentry** | Free: 5K errors/mo, 1 user; Team: $26/mo (researched 2026-03-18) | Industry standard; Next.js SDK; source maps; breadcrumbs | Free tier limited to 1 user; 5K errors/mo | 4 |
| **LogRocket** | Free: 1K sessions/mo (researched 2026-03-18) | Session replay; error tracking; performance monitoring | Limited free tier; heavy SDK; no AI monitoring | 2 |
| **Datadog** | Free: 5 hosts; APM from $31/host/mo (researched 2026-03-18) | Full observability stack; APM; logs; dashboards | Expensive; overkill for bootstrapped project | 1 |

### AI-Specific Monitoring

| Vendor | Pricing | Key Features | Limitations | Fit Score (1-5) |
|--------|---------|-------------|-------------|----------------|
| **Langfuse** | Free: 50K observations/mo, 2 users; Core: $29/mo (researched 2026-03-18) | Open-source (21K+ GitHub stars); LLM tracing; prompt management; evals | Self-host option available; newer platform | 5 |
| **Helicone** | Free: 10K logs/mo (researched 2026-03-18) | LLM proxy; cost tracking; prompt caching | Proxy model adds latency; less evaluation features | 3 |
| **LangSmith** | Free: 5K traces/mo (researched 2026-03-18) | LangChain ecosystem; debugging; evaluation | Tied to LangChain; less useful without it | 2 |

### Open-Source Options

| Project | GitHub Stars | Key Features | Limitations | Fit Score (1-5) |
|---------|-------------|-------------|-------------|----------------|
| **GlitchTip** | 2K+ | Sentry-compatible; self-hosted; simpler | Requires hosting; smaller community | 2 |
| **Langfuse (self-hosted)** | 21K+ | Full LLM monitoring; MIT licensed; Docker deploy | Requires hosting ($5-10/mo VPS) | 4 |

---

## 4. Options Rating Matrix

### KPI Definition

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| Year 1 TCO | Total cost at Year 1 scale | High (3x) | Bootstrapped; must be $0 |
| AI Chatbot Monitoring | LLM trace, hallucination detection, response quality | High (3x) | Core risk: AI hallucination at Islamic heritage sites |
| Next.js Integration | SDK quality, source maps, App Router support | Medium (2x) | Tech stack compatibility |
| Free Tier Headroom | Capacity before hitting limits | Medium (2x) | Growth runway |
| Setup Speed | Time to integrate | Low (1x) | Hackathon context |

### Scoring Matrix

| Option | TCO (3x) | AI Monitor (3x) | Next.js (2x) | Free Headroom (2x) | Setup (1x) | **Weighted** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| **Sentry Free + Langfuse Free** | 5 | 5 | 4 | 4 | 3 | **4.55** |
| **Sentry Free only** | 5 | 1 | 5 | 4 | 5 | **3.55** |
| **Langfuse Free only** | 5 | 5 | 2 | 4 | 3 | **3.91** |
| **Datadog** | 1 | 3 | 4 | 1 | 2 | **2.00** |
| **Console.log (no tooling)** | 5 | 1 | 5 | 5 | 5 | **3.73** |

### Recommendation

**Sentry Free (frontend errors) + Langfuse Free (AI chatbot monitoring)** (Score: 4.55)

Two free tools, each best-in-class for its domain. Sentry catches PWA errors (5K/mo free). Langfuse monitors AI chatbot quality (50K observations/mo free) with trace-level visibility into every LLM call, enabling hallucination detection. Combined cost: $0.

**Runner-up**: Langfuse Free only (3.91). If the team must pick one, AI monitoring is higher priority than general error tracking for this product.

---

## 5. Build vs Buy Analysis (including Bootstrap)

| Criterion | Build (custom logging) | Buy: Sentry + Langfuse | Bootstrap/MVP |
|-----------|-------|---------------------|---------------|
| Setup time | 1-2 weeks | 2-4 hours | 0 (console.log) |
| Monthly cost | $0 + hosting | $0 (free tiers) | $0 |
| AI monitoring | Manual review only | Automated tracing + evals | None |
| Error tracking | Custom dashboard | Sentry dashboards | Browser console |
| Maintenance | High (build everything) | None (managed) | None |

**Recommendation**: Buy: Sentry Free + Langfuse Free

**Rationale**: Both tools are free at Athar's scale and provide capabilities that would take weeks to build. Langfuse's LLM tracing is particularly valuable — the team can see every chatbot conversation, detect hallucinations, and measure response quality without building custom infrastructure.

**Switch trigger**: Sentry → Sentry Team ($26/mo) when exceeding 5K errors/mo or needing team access.

**Bootstrap upgrade trigger**: Add Sentry + Langfuse after hackathon, when moving to production. During hackathon itself, console.log is fine.

---

## 6. Cost Analysis

### Year 1 Total Cost

| Cost Component | Amount | Notes |
|----------------|--------|-------|
| Sentry Free | $0 | 5K errors/mo, 1 user |
| Langfuse Free | $0 | 50K observations/mo, 2 users |
| Integration dev | $0 (2-3 hrs founder time) | Add Sentry SDK + Langfuse SDK |
| **Year 1 Total (cash)** | **$0** | |
| **Year 1 Total (fully-loaded)** | **$44-$53** | 2.5-3 hrs setup × $17.50/hr |

### Cost Sanity Check

- **Product Year 1 projected revenue**: $6,692
- **This system as % of revenue**: 0% (cash) — **acceptable**
- **Would a bootstrapped founder pay this?**: Yes — it's free

---

## 7. Impact Assessment

| Dimension | Impact | Details |
|-----------|--------|---------|
| **Revenue** | Low | Monitoring doesn't directly drive revenue |
| **Conversion** | Medium | Undetected errors in QR flow or chatbot kill user experience |
| **Operations** | High | Without monitoring, debugging is guesswork; chatbot hallucinations go undetected |
| **Compliance** | Medium | AI chatbot providing inaccurate Islamic heritage content is a reputational/cultural risk |

---

## 8. Priority Tier Classification

**Priority**: Growth

**Rationale**: Monitoring is not needed for the hackathon demo but becomes critical as soon as real users interact with the AI chatbot at heritage sites. The free tier of both tools means there's no cost barrier — the only cost is setup time. Recommend adding in Month 1-2 post-hackathon.

**Phase recommendation**: Phase 1 (post-hackathon) — add Sentry + Langfuse before first real user deployment.

---

## 9. Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | Sentry Pricing | https://sentry.io/pricing/ | 2026-03-18 | Free: 5K errors/mo |
| 2 | Langfuse Pricing | https://langfuse.com/ | 2026-03-18 | Free: 50K obs/mo |
| 3 | Langfuse GitHub | https://github.com/langfuse/langfuse | 2026-03-18 | 21K+ stars, MIT |
| 4 | Helicone Pricing | https://www.helicone.ai/pricing | 2026-03-18 | Free: 10K logs/mo |
