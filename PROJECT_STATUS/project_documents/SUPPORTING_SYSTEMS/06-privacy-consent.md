# Privacy & Consent Management — Supporting System Analysis

| Field | Value |
|-------|-------|
| **System** | Privacy & Consent Management |
| **Detection Signals** | PDPL requires consent for location data, Arabic privacy notice, data subject rights |
| **Source Documents** | BRD §12 (PDPL compliance), BR-8 (GPS location), BRD §10 R-7 |
| **Priority** | Essential |
| **Recommendation** | Build custom: Simple consent banner + Arabic privacy page |
| **FACT-ID Prefix** | SUP |

---

## 1. Context & Justification

### Why This System Is Needed

Saudi PDPL (effective September 2024, enforced by SDAIA) requires explicit consent for data collection — especially sensitive data like precise GPS location (BR-8 nearby sites discovery). Penalties are severe: up to 2 years imprisonment + SAR 3M ($800K) fine for sensitive data disclosure. The law mandates Arabic privacy notices, data subject rights (access, correct, delete, withdraw consent), and consent records.

Athar collects: GPS location (sensitive), language preferences, heritage passport data, chatbot conversation history, and QR scan history. Each of these requires user consent under PDPL.

### What Happens If Absent

Without consent management, Athar violates Saudi PDPL from its first user. GPS-based nearby sites discovery (BR-8) is illegal without explicit location consent. The team has no defense if SDAIA investigates. Government partnership (Heritage Commission) becomes impossible — a government body won't partner with a non-compliant app.

---

## 2. Requirements Derived from Product

| Requirement | Source BR | Description | Must-Have? |
|------------|-----------|-------------|-----------|
| Consent banner (Arabic primary) | BRD §12 | PDPL-compliant consent prompt before data collection | Yes |
| Granular consent categories | BRD §12 | Separate consent for: location, analytics, chatbot history | Yes |
| Privacy policy page (Arabic + English) | BRD §12, BR-5 | Bilingual privacy notice explaining data practices | Yes |
| Consent withdrawal | BRD §12 | Users can withdraw consent at any time | Yes |
| Data subject rights | BRD §12 | Access, correct, delete personal data | Yes (post-hackathon) |

---

## 3. Solution Landscape

### Commercial SaaS Options

| Vendor | Pricing | Key Features | Limitations | Fit Score (1-5) |
|--------|---------|-------------|-------------|----------------|
| **CookieYes** | Free: 1 domain, 100 pageviews/mo; Paid from $9/mo (researched 2026-03-18) | GDPR/CCPA banners; auto-scan; Arabic support claimed | Free tier too limited (100 pageviews); PDPL not specifically supported | 2 |
| **Iubenda** | From $27/year for cookie consent (researched 2026-03-18) | Cookie banner; privacy policy generator; multilingual | No specific PDPL template; limited Arabic quality | 2 |
| **OneTrust** | Enterprise pricing (>$500/mo) (researched 2026-03-18) | Industry standard CMP; full compliance suite | Massively overpriced for a hackathon project | 1 |
| **Termly** | Free: basic banner; Paid from $10/mo (researched 2026-03-18) | Privacy policy generator; consent management | Limited Arabic; no PDPL-specific features | 2 |

### Open-Source Options

| Project | GitHub Stars | Key Features | Limitations | Fit Score (1-5) |
|---------|-------------|-------------|-------------|----------------|
| **Klaro** | ~5K | BSD-3 license; multi-language (i18n built-in); granular consent per service; no cookies by default | Requires configuration; no PDPL-specific template | 4 |
| **cookie-consent (Orestbida)** | 6K+ | Lightweight; GDPR-ready; multi-language; categories | Less granular than Klaro; general-purpose | 3 |

### Build Custom

| Aspect | Estimate | Basis |
|--------|----------|-------|
| Development effort | 1-2 days | Consent banner component + localStorage + privacy page |
| Ongoing maintenance | 1 hr/month | Update consent text as features change |
| Key complexity | Low — it's a modal + localStorage + a static page | |

---

## 4. Options Rating Matrix

### KPI Definition

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| PDPL Compliance | Supports Arabic consent, granular categories, withdrawal | High (3x) | Legal requirement; penalties up to SAR 3M |
| Year 1 TCO | Total cost including dev time | High (3x) | Bootstrapped budget |
| Arabic Support Quality | Native Arabic RTL consent UI | Medium (2x) | Mandatory for Saudi consumer apps |
| Customization | Can tailor consent categories for location/analytics/chatbot | Medium (2x) | Need granular consent per data type |
| Setup Speed | Time to implement | Low (1x) | Hackathon time pressure |

### Scoring Matrix

| Option | PDPL (3x) | TCO (3x) | Arabic (2x) | Custom (2x) | Setup (1x) | **Weighted** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| **Build custom** | 4 | 5 | 5 | 5 | 4 | **4.64** |
| **Klaro** | 4 | 5 | 3 | 4 | 3 | **4.00** |
| **CookieYes (paid)** | 3 | 3 | 3 | 3 | 4 | **3.09** |
| **Iubenda** | 3 | 4 | 2 | 2 | 4 | **3.00** |
| **OneTrust** | 5 | 1 | 5 | 5 | 2 | **3.27** |

### Recommendation

**Build custom consent banner + privacy page** (Score: 4.64)

For a PWA with 3-4 consent categories (location, analytics, chatbot history, essential), a custom implementation is simpler and more controllable than any CMP tool. The team builds a React consent modal with Arabic/English text, stores consent in localStorage, and gates GPS/analytics accordingly. A static privacy policy page in Arabic + English completes the requirement.

No CMP tool specifically supports Saudi PDPL — they're all built for GDPR/CCPA. Building custom ensures exact PDPL compliance without adapting a European framework.

**Runner-up**: Klaro open-source (4.00). Use Klaro if the team wants a pre-built consent UI with i18n support rather than building from scratch.

---

## 5. Build vs Buy Analysis (including Bootstrap)

| Criterion | Build custom | Open-source: Klaro | Buy: CookieYes | Bootstrap/MVP |
|-----------|-------------|-------|--------|---------------|
| Setup time | 1-2 days | 4-8 hours | 1-2 hours | 2-4 hours |
| Monthly cost | $0 | $0 | $9/mo | $0 |
| PDPL-specific | Full control | Needs adaptation | Not PDPL-specific | Basic |
| Arabic quality | Native (team writes) | i18n but no Arabic included | Machine-translated | Native |
| Customization | Full | Moderate | Limited | Minimal |
| Maintenance | Low (1 hr/mo) | Low | None | Low |

**Recommendation**: Build custom

**Rationale**: A consent banner is a simple React component (~100 lines). Building custom gives perfect PDPL compliance, native Arabic text, and exact consent categories for Athar's data types (location, analytics, chatbot). No CMP tool supports PDPL natively, so every option requires customization — might as well build the small amount of custom code.

**Switch trigger**: If PDPL regulations become more complex (cookie scanning requirements, consent record auditing), switch to Klaro or a commercial CMP.

**Bootstrap upgrade trigger**: Start with a simple consent modal during hackathon. Add granular categories and data subject rights portal post-hackathon.

---

## 6. Cost Analysis

### Year 1 Total Cost

| Cost Component | Amount | Notes |
|----------------|--------|-------|
| Consent banner component | $0 (4-6 hrs founder time) | React modal + localStorage |
| Privacy policy page | $0 (2-3 hrs founder time) | Static bilingual page |
| Maintenance | $0 (1 hr/mo × 12) | Update as features change |
| **Year 1 Total (cash)** | **$0** | |
| **Year 1 Total (fully-loaded)** | **$105-$158** | 6-9 hrs build + 12 hrs maintenance × $17.50/hr |

### Cost Sanity Check

- **Product Year 1 projected revenue**: $6,692
- **This system as % of revenue**: 0% (cash), 1.6-2.4% (fully-loaded) — **acceptable**
- **Would a bootstrapped founder pay this?**: Yes — it's founder time only

---

## 7. Impact Assessment

| Dimension | Impact | Details |
|-----------|--------|---------|
| **Revenue** | Low | Consent management doesn't drive revenue directly |
| **Conversion** | Medium | Consent banners add friction, but are legally required; good UX minimizes impact |
| **Operations** | Low | Minimal maintenance once built |
| **Compliance** | Critical | PDPL violation carries SAR 3M fine + imprisonment; blocks government partnership |

---

## 8. Priority Tier Classification

**Priority**: Essential

**Rationale**: PDPL compliance is a legal requirement, not optional. GPS location consent (BR-8) must be obtained before using the nearby sites feature. Heritage Commission partnership is impossible without PDPL compliance. The build cost is trivial (a React component + a static page), making this Essential at near-zero cost.

**Phase recommendation**: Phase 0 (hackathon) — basic consent modal for location permission. Phase 1 — full granular consent + privacy page + data subject rights.

---

## 9. Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | Klaro GitHub | https://github.com/kiprotect/klaro | 2026-03-18 | ~5K stars, BSD-3 |
| 2 | CookieYes Pricing | https://www.cookieyes.com/pricing/ | 2026-03-18 | Free: 100 pageviews |
| 3 | PDPL Overview (DLA Piper) | https://www.dlapiper.com/en/insights/publications/2024/02/saudi-arabias-new-personal-data-protection-law-in-force | 2026-03-18 | PDPL requirements |
| 4 | Iubenda Pricing | https://www.iubenda.com/en/pricing | 2026-03-18 | From $27/year |
| 5 | SDAIA PDPL | https://securiti.ai/saudi-arabia-personal-data-protection-law/ | 2026-03-18 | Penalties, requirements |
