# Hosting & CDN Infrastructure — Supporting System Analysis

| Field | Value |
|-------|-------|
| **System** | Hosting & CDN Infrastructure |
| **Detection Signals** | PWA hosting (Next.js SSR/SSG), heritage images CDN, AI chatbot API hosting, PDPL data residency |
| **Source Documents** | BRD §13 (budget), BRD §12 (PDPL data localization), RESEARCH.md §4 |
| **Priority** | Essential |
| **Recommendation** | Buy: Vercel Hobby (free) + Cloudflare CDN (free) |
| **FACT-ID Prefix** | SUP |

---

## 1. Context & Justification

### Why This System Is Needed

Athar is a Next.js PWA that must be hosted and accessible to visitors who scan QR codes at heritage sites. The hosting must deliver sub-3-second load times (QR scan → content) and serve heritage images efficiently. The AI chatbot API (Gemini Flash-Lite) runs as serverless functions. PDPL prefers Saudi-based data storage, though the app itself can be served globally via CDN.

### What Happens If Absent

Without hosting, the product literally doesn't exist. Without CDN, visitors in Makkah/Madinah experience slow load times, QR scans lead to blank pages, and heritage images take seconds to load. For a QR-first PWA, speed IS the product.

---

## 2. Requirements Derived from Product

| Requirement | Source BR | Description | Must-Have? |
|------------|-----------|-------------|-----------|
| Next.js hosting (SSR + SSG) | All BRs | App must be deployed and accessible | Yes |
| Fast global CDN | BR-3 | QR scan → content must be < 3 seconds | Yes |
| Serverless functions | BR-4 | AI chatbot API endpoint | Yes |
| MENA edge nodes | BRD §12 | Low latency for Saudi visitors | Yes |
| PDPL-compliant data storage | BRD §12 | User data in Saudi/GCC region | Yes (for database, not static assets) |
| Free tier viability | Budget | Must operate at $0/mo for Year 1 | Yes |

---

## 3. Solution Landscape

### Managed Platform Options

| Vendor | Pricing | Key Features | Limitations | Fit Score (1-5) |
|--------|---------|-------------|-------------|----------------|
| **Vercel (Hobby)** | Free: 100GB bandwidth, 100GB-hrs serverless, ~100K visitors/mo; Pro: $20/mo (researched 2026-03-18) | Next.js creator; best DX; global edge; instant deploys | Pauses on commercial use violation; 100GB bandwidth limit | 5 |
| **Cloudflare Pages** | Free: unlimited bandwidth, 500 builds/mo (researched 2026-03-18) | Unlimited bandwidth; global CDN; Workers for serverless | Limited Next.js SSR support; less native than Vercel | 4 |
| **Netlify** | Free: 100GB bandwidth, 300 build mins (researched 2026-03-18) | Good Next.js support; form handling; edge functions | Slower builds; less Next.js-native than Vercel | 3 |
| **Railway** | Free: $5 credit/mo; Hobby: $5/mo (researched 2026-03-18) | Full-stack hosting; databases; containers | Not optimized for Next.js static; less CDN | 2 |

### Cloud Providers (Saudi Region)

| Provider | Pricing | Key Features | Limitations | Fit Score (1-5) |
|----------|---------|-------------|-------------|----------------|
| **Oracle Cloud (Jeddah)** | Free: 2 VMs, 10TB egress (researched 2026-03-18) | Saudi data center; generous free tier; ARM instances | No Next.js-native hosting; requires manual setup | 2 |
| **AWS (Bahrain me-south-1)** | Free: 12-month limited; EC2/Lambda pricing after (researched 2026-03-18) | GCC region; Amplify for Next.js; CloudFront CDN | Complex; costs escalate quickly; overkill for MVP | 2 |

### CDN Options

| CDN | Pricing | MENA Nodes | Notes |
|-----|---------|-----------|-------|
| **Cloudflare** | Free: unlimited bandwidth (researched 2026-03-18) | Dubai, Jeddah, Riyadh, Manama | Best free CDN; Jeddah PoP means local caching |
| **Vercel Edge Network** | Included with Vercel | Bahrain, Dubai edge nodes | Automatic with Vercel hosting |
| **Bunny CDN** | $0.01/GB (MENA); ~$1-5/mo at Athar's scale (researched 2026-03-18) | Dubai, Jeddah | Cheapest paid CDN; excellent MENA coverage |

---

## 4. Options Rating Matrix

### KPI Definition

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| Next.js Compatibility | Native support for SSR, SSG, API routes, App Router | High (3x) | Tech stack is Next.js |
| Year 1 TCO | Total cost at Year 1 traffic (3,107 users) | High (3x) | Must be $0 |
| MENA Edge Performance | Edge nodes in Saudi Arabia / GCC | Medium (2x) | QR scan latency for visitors in Makkah/Madinah |
| Free Tier Headroom | How much capacity before hitting limits | Medium (2x) | Growth runway without cost |
| Serverless Functions | Support for API routes / AI chatbot endpoint | Medium (2x) | BR-4 chatbot needs serverless |
| Deploy Experience | Git push → live; preview deployments | Low (1x) | Team productivity |

### Scoring Matrix

| Option | Next.js (3x) | TCO (3x) | MENA Edge (2x) | Free Headroom (2x) | Serverless (2x) | Deploy DX (1x) | **Weighted** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Vercel Hobby + Cloudflare CDN** | 5 | 5 | 5 | 4 | 5 | 5 | **4.85** |
| **Cloudflare Pages** | 3 | 5 | 5 | 5 | 4 | 4 | **4.23** |
| **Netlify Free** | 4 | 5 | 3 | 4 | 4 | 4 | **4.08** |
| **Oracle Cloud Jeddah** | 2 | 5 | 5 | 5 | 2 | 1 | **3.31** |
| **AWS Bahrain** | 3 | 2 | 5 | 2 | 4 | 2 | **2.92** |

### Recommendation

**Vercel Hobby (free) + Cloudflare CDN (free)** (Score: 4.85)

Vercel is the Next.js creator — best possible compatibility. Free Hobby tier provides 100GB bandwidth (~100K visitors/mo), far exceeding Year 1 needs. Cloudflare's free CDN adds Jeddah/Riyadh PoPs for local caching of heritage images, reducing Vercel bandwidth consumption. Combined cost: $0.

**Runner-up**: Cloudflare Pages (4.23). Switch if Vercel Hobby TOS becomes an issue for commercial use.

---

## 5. Build vs Buy Analysis (including Bootstrap)

| Criterion | Self-host (Oracle Jeddah) | Buy: Vercel + Cloudflare | Bootstrap/MVP |
|-----------|-------|---------------------|---------------|
| Setup time | 1-2 weeks | 30 minutes | 30 minutes |
| Monthly cost (100 users) | $0 | $0 | $0 |
| Monthly cost (10K users) | $0 | $0 | $0 |
| Monthly cost (100K users) | $0-20/mo | $20/mo (Vercel Pro) | N/A |
| Next.js support | Manual (PM2/Docker) | Native (zero-config) | Native |
| CDN | Manual setup | Automatic (Vercel Edge + Cloudflare) | Vercel Edge only |
| Maintenance burden | High (OS patches, SSL, monitoring) | None (managed) | None |

**Recommendation**: Buy: Vercel Hobby + Cloudflare CDN

**Rationale**: Zero cost, zero maintenance, best Next.js support, MENA edge nodes, and the team can deploy with `git push`. Self-hosting on Oracle Jeddah would be free but requires significant DevOps effort that a 4-person hackathon team shouldn't spend on infrastructure.

**Switch trigger**: If PDPL enforcement requires ALL data (including static assets) on Saudi soil, migrate to Oracle Cloud Jeddah or AWS Bahrain. Current guidance: user data must be in-region, static content can be served globally.

**Bootstrap upgrade trigger**: Vercel Hobby → Pro ($20/mo) when traffic exceeds 100K monthly visitors.

---

## 6. Cost Analysis

### Year 1 Total Cost

| Cost Component | Amount | Notes |
|----------------|--------|-------|
| Vercel Hobby | $0 | Free tier: 100GB bandwidth |
| Cloudflare CDN | $0 | Free tier: unlimited bandwidth |
| Domain | $10-15/year | .com or .sa domain |
| SSL | $0 | Included with Vercel + Cloudflare |
| **Year 1 Total (cash)** | **$10-15** | Domain only |

### Cost Sanity Check

- **Product Year 1 projected revenue**: $6,692
- **This system as % of revenue**: 0.2% — **acceptable**
- **Would a bootstrapped founder pay this?**: Yes — it's essentially free

---

## 7. Impact Assessment

| Dimension | Impact | Details |
|-----------|--------|---------|
| **Revenue** | High | No hosting = no product = no revenue |
| **Conversion** | High | Slow load times kill QR→content conversion; CDN directly affects this |
| **Operations** | Low | Managed hosting = zero ops burden |
| **Compliance** | Medium | PDPL data residency applies to user data storage (Supabase), not static hosting |

---

## 8. Priority Tier Classification

**Priority**: Essential

**Rationale**: The product cannot exist without hosting. Vercel + Cloudflare provides production-grade infrastructure at $0, making this a no-brainer Essential system.

**Phase recommendation**: Phase 0 — deploy to Vercel from hackathon day one.

---

## 9. Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | Vercel Pricing | https://vercel.com/pricing | 2026-03-18 | Hobby free: 100GB BW |
| 2 | Vercel Limits | https://vercel.com/docs/limits | 2026-03-18 | ~100K visitors/mo on free |
| 3 | Cloudflare Pages | https://pages.cloudflare.com/ | 2026-03-18 | Free unlimited bandwidth |
| 4 | Oracle Cloud Free Tier | https://www.oracle.com/cloud/free/ | 2026-03-18 | Jeddah region available |
| 5 | Bunny CDN Pricing | https://bunny.net/pricing/ | 2026-03-18 | $0.01/GB MENA |
