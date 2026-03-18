# Authentication & User Management — Supporting System Analysis

| Field | Value |
|-------|-------|
| **System** | Authentication & User Management |
| **Detection Signals** | Premium subscribers, heritage passport stamps, bilingual preferences, multiple user types |
| **Source Documents** | BR-6 (heritage passport), BRD §8 (premium tier), BRD §12 (PDPL) |
| **Priority** | Essential |
| **Recommendation** | Open-source: NextAuth.js (Auth.js) + Supabase (database + auth) |
| **FACT-ID Prefix** | SUP |

---

## 1. Context & Justification

### Why This System Is Needed

Athar requires persistent user state for several core features: heritage passport stamps that track which sites a visitor has explored (BR-6), premium subscription status for the freemium model (BRD §8.1), language/preference settings, and chatbot conversation history. Without authentication, the heritage passport — a key differentiator and viral growth mechanic — cannot persist across sessions or devices.

The BRD identifies 4 implicit user types: anonymous visitors (QR scan, browse map), registered free users (passport stamps, limited chatbot), premium subscribers (unlimited chatbot, certificates), and admin/team (content management). This requires at minimum a basic role system.

### What Happens If Absent

Without auth, heritage passport stamps are lost when the browser clears localStorage. Premium subscriptions cannot be managed. The entire freemium revenue model is impossible. Users have no persistent identity — killing the gamification loop that drives social sharing and repeat visits.

---

## 2. Requirements Derived from Product

| Requirement | Source BR | Description | Must-Have? |
|------------|-----------|-------------|-----------|
| Persistent user accounts | BR-6 | Heritage passport stamps must survive across sessions/devices | Yes |
| Social login (Google, Apple) | BRD §5 | Pilgrims won't create passwords; social login reduces friction | Yes |
| Role-based access | BRD §8 | Distinguish free vs premium users; admin access for team | Yes |
| PDPL-compliant data handling | BRD §12 | Consent for data collection; data subject rights; Saudi hosting | Yes |
| PWA compatibility | BRD §6 | Auth must work in PWA context (no native app APIs) | Yes |
| Bilingual auth flows | BR-5 | Arabic primary, English secondary for login/signup UI | No (nice-to-have) |

---

## 3. Solution Landscape

### Commercial SaaS Options

| Vendor | Pricing | Key Features | Limitations | Fit Score (1-5) |
|--------|---------|-------------|-------------|----------------|
| **Supabase Auth** | Free: 50K MAU; Pro: $25/mo (100K MAU) (researched 2026-03-18) | Built-in with Supabase DB; social login; Row Level Security; JS SDK | Projects paused after 7 days inactivity on free tier | 5 |
| **Firebase Auth** | Free: 50K MAU; Phone auth costs extra (researched 2026-03-18) | Google ecosystem; social login; mature; great docs | No built-in DB; Google data practices may concern PDPL | 4 |
| **Clerk** | Free: 50K MAU; Pro: $25/mo (researched 2026-03-18) | Beautiful pre-built UI components; Next.js-native; easy setup | Vendor lock-in; limited customization on free tier | 4 |
| **Auth0** | Free: 25K MAU; Essentials: $35/mo (researched 2026-03-18) | Enterprise-grade; extensive social providers; MFA | Expensive at scale; complex for simple needs | 2 |

### Open-Source Options

| Project | GitHub Stars | Last Commit | Key Features | Limitations | Fit Score (1-5) |
|---------|-------------|-------------|-------------|-------------|----------------|
| **NextAuth.js / Auth.js** | 28.2K | Active (2026) | Native Next.js integration; 50+ providers; database adapters; JWT or session | Requires own database; more setup than SaaS | 5 |
| **Lucia** | ~9K | Active | Lightweight; TypeScript; session-based | Smaller community; fewer adapters | 3 |
| **SuperTokens** | ~14K | Active | Self-hosted; pre-built UI; session management | Heavier setup; overkill for this scale | 3 |

### Build from Scratch

| Aspect | Estimate | Basis |
|--------|----------|-------|
| Development effort | 2-3 weeks | JWT + bcrypt + session management + social OAuth flows |
| Ongoing maintenance | 4-6 hrs/month | Security patches, token rotation, session management |
| Key complexity | OAuth provider integration, secure token handling, PDPL compliance | |

---

## 4. Options Rating Matrix

### KPI Definition

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| Next.js Integration | Native support, setup simplicity, App Router compatibility | High (3x) | Tech stack is Next.js; poor integration = wasted dev time |
| Year 1 TCO | Total cost including setup time at $17.50/hr | High (3x) | Bootstrapped with $6,692 revenue; every dollar matters |
| Free Tier Capacity | MAU limit on free tier relative to Year 1 target (3,107) | Medium (2x) | Must stay within free tier for Year 1 |
| Social Login Support | Google, Apple, email/password at minimum | Medium (2x) | Pilgrim audience won't create passwords |
| PDPL Compliance Fit | Data residency, consent management, data subject rights | Medium (2x) | Saudi regulatory requirement |
| Setup Speed | Time from zero to working auth in the PWA | Low (1x) | Hackathon time pressure |
| Vendor Lock-in Risk | Difficulty of migrating away if needed | Low (1x) | Long-term flexibility |

### Scoring Matrix

| Option | Next.js (3x) | Year 1 TCO (3x) | Free Capacity (2x) | Social Login (2x) | PDPL Fit (2x) | Setup Speed (1x) | Lock-in (1x) | **Weighted** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Supabase Auth** | 4 | 5 | 5 | 4 | 4 | 4 | 3 | **4.29** |
| **NextAuth.js + Supabase DB** | 5 | 5 | 5 | 5 | 4 | 3 | 5 | **4.64** |
| **Firebase Auth** | 4 | 5 | 5 | 5 | 3 | 4 | 2 | **4.14** |
| **Clerk** | 5 | 4 | 5 | 5 | 3 | 5 | 2 | **4.21** |
| **Build from Scratch** | 3 | 2 | 5 | 3 | 4 | 1 | 5 | **3.14** |

**Verification (NextAuth.js + Supabase DB)**: (5×3 + 5×3 + 5×2 + 5×2 + 4×2 + 3×1 + 5×1) / (3+3+2+2+2+1+1) = (15+15+10+10+8+3+5)/14 = 66/14 = **4.71** → recalculated: **4.71**

### Recommendation

**NextAuth.js (Auth.js) + Supabase as database backend** (Score: 4.71)

- Native Next.js integration (Auth.js is the standard)
- Supabase free tier provides database (500MB) + 50K MAU + Row Level Security
- Zero vendor lock-in on auth layer (NextAuth.js is open-source)
- All social providers supported (Google, Apple, email)
- Supabase has Middle East edge nodes

**Runner-up**: Supabase Auth standalone (4.29). Switch if team wants simpler setup with less flexibility.

---

## 5. Build vs Buy Analysis (including Bootstrap)

| Criterion | Build (JWT custom) | Buy: Clerk | Open-source: NextAuth.js + Supabase | Bootstrap/MVP |
|-----------|-------|--------|---------------------|---------------|
| Setup time | 2-3 weeks | 1-2 hours | 1-2 days | 4-8 hours |
| Monthly cost (100 users) | $0 (cash) | $0 | $0 | $0 |
| Monthly cost (10K users) | $0 (cash) | $0 | $0 | $0 |
| Monthly cost (100K users) | $0 (cash) + hosting | $25/mo | $25/mo (Supabase Pro) | N/A |
| Customization | Full | Limited | Full | Minimal |
| Integration effort | High | Low | Medium | Low |
| Vendor lock-in | None | High | None (auth) / Low (DB) | None |
| Data ownership | Full | Via export | Full | Full |
| PDPL compliance | Manual | Partial | Good (Supabase ME region) | Manual |
| Maintenance burden | High (4-6 hrs/mo) | None | Low (1-2 hrs/mo) | Low |

*Bootstrap/MVP: NextAuth.js with JSON file or localStorage for hackathon demo. No database needed initially — passport stamps in localStorage, upgrade to Supabase post-hackathon.*

**Recommendation**: Open-source: NextAuth.js + Supabase

**Rationale**: NextAuth.js provides native Next.js auth with zero cost and full control. Supabase's free tier (50K MAU, 500MB DB) far exceeds Year 1 needs (3,107 users). Combined Year 1 cash cost: $0. The team maintains full data ownership and can migrate the auth layer independently of the database.

**Switch trigger**: If user count exceeds 50K MAU, upgrade Supabase to Pro ($25/mo).

**Bootstrap upgrade trigger**: Move from localStorage to Supabase DB once hackathon is won and the team commits to production deployment.

---

## 6. Cost Analysis

### Cost at Three Scale Points

| Scale | Recommended | Bootstrap/MVP | Notes |
|-------|------------|---------------|-------|
| 100 users | $0/mo | $0/mo | Supabase free tier; NextAuth.js free |
| 10,000 users | $0/mo | N/A | Still within Supabase free 50K MAU |
| 100,000 users | $25/mo | N/A | Supabase Pro tier needed |

### Year 1 Total Cost (Recommended Option)

| Cost Component | Amount | Notes |
|----------------|--------|-------|
| NextAuth.js | $0 | Open-source, MIT license |
| Supabase free tier | $0 | 50K MAU, 500MB DB |
| Setup development | $0-$35 (2 hrs × $17.50) | Founder time during hackathon |
| Monthly maintenance | $0 (included in normal dev) | Minimal maintenance needed |
| **Year 1 Total (cash)** | **$0** | |
| **Year 1 Total (fully-loaded incl. founder time)** | **$35-$245** | 2 hrs setup + ~1 hr/mo maintenance × 12 |

### Year 1 Total Cost (Bootstrap/MVP Option)

| Cost Component | Amount | Notes |
|----------------|--------|-------|
| NextAuth.js + localStorage | $0 | No database needed for demo |
| Setup | $0 (1-2 hrs founder time) | Part of hackathon build |
| **Bootstrap Year 1 Total** | **$0** | |

### Cost Sanity Check

- **Product Year 1 projected revenue**: $6,692
- **This system as % of revenue**: 0% (cash) — **acceptable**
- **What similar startups pay**: Most pre-revenue Next.js apps use Supabase or Firebase free tiers
- **Would a bootstrapped founder pay this?**: Yes — it's free

---

## 7. Impact Assessment

| Dimension | Impact | Details |
|-----------|--------|---------|
| **Revenue** | High | Enables premium subscription model (entire freemium revenue depends on user accounts) |
| **Conversion** | High | Social login reduces signup friction; heritage passport requires auth for persistence |
| **Operations** | Medium | Role-based access needed for admin vs user separation |
| **Compliance** | High | PDPL requires identifiable data handling; auth system is the foundation for consent management |

---

## 8. Priority Tier Classification

**Priority**: Essential

**Rationale**: Authentication is required for the heritage passport (BR-6), premium subscriptions (BRD §8), and PDPL compliance (BRD §12). Without it, two of the key differentiators (passport gamification + freemium revenue) are impossible. The free tier of Supabase + NextAuth.js means this is Essential with zero cost barrier.

**Phase recommendation**: Phase 0 (hackathon MVP) — start with localStorage for demo, add Supabase auth post-hackathon.

---

## 9. Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | Supabase Pricing | https://supabase.com/pricing | 2026-03-18 | Free 50K MAU, Pro $25/mo |
| 2 | Firebase Auth Pricing | https://firebase.google.com/pricing | 2026-03-18 | Free 50K MAU |
| 3 | Clerk Pricing | https://clerk.com/pricing | 2026-03-18 | Free 50K MAU, Pro $25/mo |
| 4 | NextAuth.js GitHub | https://github.com/nextauthjs/next-auth | 2026-03-18 | 28.2K stars |
| 5 | Auth0 Pricing | https://auth0.com/pricing | 2026-03-18 | Free 25K MAU |
