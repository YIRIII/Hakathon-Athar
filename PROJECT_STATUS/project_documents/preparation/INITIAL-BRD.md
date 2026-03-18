# BRD: Athar (أثر) — Interactive Heritage Discovery Platform

**Version**: 1.0
**BRD Phase**: Initial
**Date**: 2026-03-18
**Status**: Complete
**Author**: Idea Forge (AI-Generated)

---

## 1. Executive Summary

Athar (أثر) is an interactive digital platform for discovering historical and heritage sites in Makkah and Madinah. It combines smart classified maps, on-site QR code exploration, an AI-powered voice/text chatbot guide, and digital visit certificates into a Progressive Web App (PWA) that visitors access instantly by scanning a QR code — no download required.

The opportunity is massive and uniquely timed. Saudi Arabia received 122 million tourists in 2025 (Gulf News), with Makkah alone welcoming 19.57 million visitors and Madinah 18+ million in 2024. Despite 148+ historical heritage sites across these two cities, **no unified digital heritage discovery platform exists**. The closest competitors — Nusuk (40M+ users, pilgrimage logistics only), Visit Saudi (broad directory), and Historic Jeddah (covers only Al-Balad) — leave a clear gap. Vision 2030's revised target of 150 million annual visitors, backed by $80B+ in Makkah/Madinah infrastructure investment, signals strong government commitment to enriching the visitor experience.

The Saudi heritage tourism market is valued at $5.12B (2024, Grand View Research) growing at 6.0% CAGR, with Madinah specifically at 8.2% — the highest growth rate in the Kingdom. The AI in tourism market is growing at 28.7% CAGR (MarketsandMarkets). Athar enters this intersection at the right moment: a hackathon-born platform that can scale into the official heritage layer for the two holiest cities in Islam, serving a potential audience of 30+ million annual pilgrims by 2030.

---

## 2. Problem Statement

### Core Problems

1. **Poor information access**: Available information about historical sites in Makkah and Madinah is limited, unattractive, and not presented in a modern interactive way. Visitors encounter static signage or no information at all at most heritage sites.

2. **No unified platform**: There is no single platform that aggregates historical, religious, archaeological, and cultural sites in Makkah and Madinah. Information is fragmented across individual museum guides, general tourism websites, and word-of-mouth.

3. **No smart map**: There is no intelligent map that helps visitors discover heritage sites, understand their stories, and navigate between them with historical context.

4. **Inadequate visitor experience**: The current experience doesn't suit all age groups. TripAdvisor reviews of Makkah heritage tours report that tours are "not actually guided" — drivers stay in the car, there's no heritage commentary, and heritage content is nonexistent. Ziarat (heritage tour) packages cost $50-$200+ per person with inconsistent quality.

### Who Experiences This Problem

- **18.5 million Hajj/Umrah pilgrims annually** (2024, Ministry of Hajj and Umrah) who spend days in Makkah/Madinah with free time between religious obligations but no digital heritage discovery tools
- **86.2 million domestic Saudi trips annually** (2024, SPA) including families seeking educational, heritage-rich experiences
- **Tourism & cultural authorities** who have invested $80B+ in heritage infrastructure but lack digital visitor engagement tools

### Cost of Inaction

- Saudi Arabia's religious tourism contributes ~$12B annually (~20% of non-oil economy, Salaam Gateway). Without digital heritage engagement, the Ministry of Tourism's goal to increase per-capita spending beyond $1,000 and extend average stays from 5 to 9 nights remains unachieved.
- 148+ heritage sites remain underutilized despite significant restoration investment.
- Pilgrims and tourists default to poor-quality paid tours ($50-$200) or skip heritage exploration entirely.

---

## 3. Business Objectives

| ID | Objective | Target | Timeframe |
|----|-----------|--------|-----------|
| BO-1 | Win the Hackathon for Historical and Enrichment Sites (3rd Edition) | Functional MVP demonstrating all core features | Hackathon deadline |
| BO-2 | Launch PWA covering 10-12 most visited heritage sites in Makkah & Madinah | 10-12 sites with complete content, QR codes, map, AI chatbot | Month 1-3 |
| BO-3 | Achieve initial user adoption via QR-first distribution | 5,000+ monthly active users | Month 6 |
| BO-4 | Establish partnerships with Heritage Commission / Ministry of Tourism | 1+ official partnership or endorsement | Month 6-12 |
| BO-5 | Generate revenue through premium features and B2B partnerships | $2,000+ MRR | Month 12 |

---

## 4. Market Analysis

### 4.1 Market Size

| Metric | Value | Source |
|--------|-------|--------|
| **TAM** (Total Addressable Market) | $5.12B — Saudi heritage tourism market (2024) | Grand View Research, 2025 |
| **SAM** (Serviceable Addressable Market) | ~$500M — Digital heritage experiences for Makkah & Madinah visitors (~37.5M combined visitors × ~$13.30 avg. heritage experience spend) | Derived: Makkah 19.57M + Madinah 18M visitors (2024) × estimated digital heritage spend |
| **SOM** (Serviceable Obtainable Market) | ~$1.5M — Year 1 realistic capture from freemium + B2B at bootstrap scale | Derived: See revenue projections §8.2 |
| **Growth Rate (CAGR)** | 6.0% (Saudi heritage tourism); 8.2% (Madinah specifically) | Grand View Research; PS Market Research |

### 4.2 Market Trends

1. **Vision 2030 tourism acceleration**: Saudi Arabia exceeded its original 100M visitor target 6 years early and revised it to 150M. The government is investing $80B+ in Makkah/Madinah infrastructure including heritage restoration.

2. **Digital pilgrimage revolution**: Nusuk's growth from 12M to 30M downloads in one year (150% YoY) and 90% satisfaction rate proves pilgrims enthusiastically adopt digital tools. Ministerial Resolution No. 211 (2023) mandates digital platforms for Hajj/Umrah services.

3. **AI in tourism boom**: The global AI in tourism market is growing at 28.7% CAGR ($2.95B → $13.38B by 2030, MarketsandMarkets). Saudi Arabia launched "Sara" AI virtual tour guide via the Saudi Tourism Authority.

4. **Heritage site digitization push**: The Heritage Commission registered 36,919 urban heritage sites nationally (2025). Makkah advanced development of 64 prioritized historical/cultural sites (Asharq Al-Awsat, 2024). 15 historic sites tied to the Prophet's life were reopened in 2024.

5. **QR adoption wave**: Saudi Arabia deploys QR codes on street signs; GCC hospitality QR menus improved table turnover by 15%. Only 2.47% of museum visitors download dedicated apps — QR eliminates this barrier.

### 4.3 Competitive Landscape

| Competitor | Type | Pricing | Strengths | Weaknesses | Market Share |
|-----------|------|---------|-----------|------------|-------------|
| **Nusuk** | Pilgrimage logistics | Free | 40M+ users, government-backed, mandatory for Umrah | Zero heritage discovery, no AI guide, no QR content | Dominant (pilgrimage) |
| **Visit Saudi** | General tourism directory | Free | Official STA app, broad coverage | Surface-level heritage, no interactive features | Small |
| **Historic Jeddah** | Heritage app (Jeddah only) | Free | Ministry of Culture backed, interactive maps | Jeddah only, no AI, no QR, no certificates | Niche |
| **SirahMaps** | Makkah heritage map | Free | 37+ features, 117+ landmarks, voice narrations | Makkah only, no AI chatbot, no gamification, traditional web | Niche |
| **izi.TRAVEL** | Global audio tours | Freemium | 25K tours, 137 countries, 50+ languages | Minimal Saudi content, no AI chatbot | Global |
| **Bebot (Japan)** | AI tourism chatbot | B2B | Proven QR + AI chatbot model | Japan only, logistics focus, no heritage | Japan |

### 4.4 Competitive Advantage

Athar is the **only platform** that combines all five pillars for Makkah/Madinah:

1. **Heritage-focused smart maps** — Classified by type (religious, archaeological, cultural, museum) with historical overlays
2. **On-site QR exploration** — Zero-friction PWA access; entry QR = site overview, internal QRs = section stories
3. **AI chatbot guide** (voice + text) — Conversational heritage guide in 8+ languages, recommends sites based on preferences
4. **Digital visit certificates** — Shareable proof of heritage site visits, driving social media amplification
5. **Makkah AND Madinah coverage** — No competitor covers both cities

**Why users switch**: Pilgrims currently have zero digital heritage tools. This isn't about switching — it's about filling a complete vacuum. The 40M+ Nusuk users are a captive, digitally-engaged audience with no heritage discovery option.

---

## 5. Target Audience

### 5.1 Primary Users

1. **Hajj & Umrah pilgrims** (18.5M annually) — International visitors with free time between religious obligations, seeking cultural enrichment
2. **Saudi domestic tourists** (86.2M trips annually) — Families and individuals visiting Makkah/Madinah for religious and heritage tourism
3. **Youth (18-35)** — 70% of Saudi population, 95.3% social media penetration, mobile-first travel adoption

### 5.2 User Personas

**Persona 1: Ahmad — International Umrah Pilgrim**
- Role: Indonesian professional performing Umrah with family
- Demographics: Age 42, middle-income, speaks Indonesian + basic Arabic/English
- Pain Points: Limited time in Madinah; wants to visit historical Islamic sites but doesn't know which ones exist or how to find them; can't afford private guide ($100+); language barrier
- Goals: Visit significant Islamic heritage sites near the Prophet's Mosque; learn stories; share experience with family back home
- Current Solutions: Asks hotel staff, follows tour groups, uses Google Maps (no heritage info)

**Persona 2: Sarah — Saudi Family Tourist**
- Role: Saudi mother planning a heritage trip with children during school break
- Demographics: Age 34, lives in Riyadh, fluent Arabic/English, tech-savvy
- Pain Points: Wants educational yet fun experience for kids (ages 8-14); existing heritage info is dry text; no gamification to keep kids engaged
- Goals: Create memorable family heritage experience; children earn certificates to share at school; discover sites she didn't know existed
- Current Solutions: Visit Saudi app listings (surface-level), word-of-mouth from friends

**Persona 3: Dr. Ali — Heritage Authority Official**
- Role: Heritage Commission program director
- Demographics: Age 50, PhD in Islamic history, responsible for visitor engagement metrics
- Pain Points: $53B+ invested in Madinah heritage but no digital engagement tool; cannot measure visitor interactions with heritage sites; no data on which sites visitors care about
- Goals: Digital engagement metrics, increased time spent at heritage sites, visitor satisfaction data
- Current Solutions: Physical signage, occasional guided tours, no digital analytics

### 5.3 Audience Validation

- **Pilgrim digital readiness proven**: Satisfaction with digital services rose from 57% → 81% (2022-2024, Arab News). Nusuk's 30M downloads and 90% satisfaction prove pilgrims adopt digital tools enthusiastically.
- **Heritage demand**: Cultural heritage accounts for 54.37% of Saudi heritage tourism revenue (Grand View Research, 2024). The Ministry of Tourism aims to extend average stays from 5 to 9 nights by integrating cultural/heritage experiences.
- **QR behavior validated**: Saudi Arabia actively deploys QR codes on street signs. Global QR users exceed 2.2B (29% of mobile users). Adelaide's QR signage boosted engagement 40%.
- **Social sharing incentive**: Saudis spend 3h 6m daily on social media (vs. 2h 24m global average). Digital certificates tap into this sharing behavior for organic amplification.

---

## 6. Scope

### 6.1 In Scope (Hackathon MVP)

- PWA with smart interactive map of 10-12 heritage sites in Makkah & Madinah
- Heritage site detail pages with historical narratives, images, and visitor info
- QR code system — entry QR (site overview) + internal QRs (section stories)
- AI chatbot (text) for heritage Q&A and site recommendations
- Digital heritage passport with visit stamps/certificates
- Bilingual interface (Arabic primary, English secondary)
- Google Maps integration for navigation to sites
- Nearby sites discovery based on user location

### 6.2 Out of Scope (Phase 2+)

- Voice AI chatbot (requires STT/TTS integration — Phase 2)
- AR (Augmented Reality) overlays at sites
- Full 8-10 language support (Phase 2: add Urdu, Indonesian, Turkish, Bengali, Malay, French)
- Native mobile apps (iOS/Android)
- Integration with Nusuk or Webook APIs
- E-commerce (ticket sales, tour bookings)
- Admin dashboard / CMS for Heritage Commission
- Offline mode with pre-cached content (Phase 2)

---

## 7. Business Requirements

| ID | Requirement | Priority | Rationale |
|----|------------|----------|-----------|
| BR-1 | Smart interactive map displaying 10-12 heritage sites classified by type (religious, archaeological, cultural, museum) and city (Makkah/Madinah) | Must Have | Core value proposition — unified heritage discovery |
| BR-2 | Heritage site detail pages with historical narrative, images, visitor info (hours, location, accessibility) | Must Have | Essential content layer that no competitor provides for both cities |
| BR-3 | QR code generation and scanning — entry QR for site overview, internal QRs for section-specific stories | Must Have | Primary distribution mechanism; eliminates app download friction (only 2.47% download apps) |
| BR-4 | AI chatbot (text-based) for heritage Q&A and personalized site recommendations | Must Have | Key differentiator; validated by Bebot (Japan) at scale; AI tourism growing 28.7% CAGR |
| BR-5 | Bilingual interface — Arabic (primary, RTL) with English toggle | Must Have | Arabic mandatory for Saudi consumer apps; English needed for 63%+ Asian pilgrims |
| BR-6 | Digital heritage passport — collect stamps for visited sites, shareable certificates | Should Have | Gamification drives repeat visits + social sharing (3h+ daily social media in Saudi) |
| BR-7 | Google Maps / navigation integration for directions to heritage sites | Should Have | Removes friction from discovery to visit; leverages existing navigation behavior |
| BR-8 | Nearby sites discovery based on GPS location | Should Have | Increases site visits per session; leverages 98-99% 5G coverage in Makkah/Madinah |
| BR-9 | Voice-enabled AI chatbot (Arabic + English speech) | Nice to Have | Enhanced accessibility; natural interaction; Phase 2 with STT/TTS integration |
| BR-10 | Admin CMS for Heritage Commission to manage site content | Nice to Have | Enables official partnership; content independence from dev team |
| BR-11 | Visitor analytics dashboard (site visit counts, engagement time, popular sites) | Nice to Have | B2B value proposition for Heritage Commission partnership |

---

## 8. Revenue Model

### 8.1 Pricing Strategy

**Freemium + B2B model** — Aligned with the audience (pilgrims/tourists expect free basic tools) and the competitive landscape (Nusuk, Visit Saudi, Historic Jeddah are all free):

1. **Free tier** (core platform):
   - Smart map with all heritage sites
   - Basic site information pages
   - QR code scanning
   - 3 AI chatbot questions per site visit
   - Basic heritage passport (visit stamps)

2. **Premium tier** (~SAR 20/month or SAR 50/year, ~$5.30/$13.30):
   - Unlimited AI chatbot conversations
   - Voice-enabled AI guide
   - Premium certificates (personalized, downloadable)
   - Audio narrations for all sites
   - Offline content caching
   - Ad-free experience

3. **B2B / Government partnerships**:
   - Heritage Commission: Content management dashboard + analytics ($2,000-$5,000/month)
   - Tourism operators: Featured placement + booking integration (commission-based)
   - Sponsorship packages from heritage-interested organizations

### 8.2 Revenue Projections

#### Funding Stage Assessment

| Factor | Value | Signal |
|--------|-------|--------|
| **Funding Stage** | Bootstrapped (hackathon) | No funding mentioned; student team; hackathon context |
| **Revenue Confidence** | Low | Pre-product, no traction, assumptions speculative |
| **Team Size** | 4 (hackathon team) | Yousef, Mohammed G., Mohammed S., Ahmed |
| **Product State** | Concept (building from scratch) | No existing website |

**Stage**: Bootstrapped. Month 12 targets calibrated to what a 4-person team can realistically achieve without external funding.

#### Growth Assumptions

| Assumption | Conservative | Base | Optimistic | Source / Basis |
|-----------|-------------|------|-----------|----------------|
| Monthly user acquisition (steady-state) | 500 | 1,000 | 2,500 | QR distribution at 10-12 sites; organic social sharing; (estimate) |
| Monthly churn rate | 40% | 30% | 20% | Tourism apps have high churn — visitors leave the city; (estimate) |
| Free → Premium conversion | 1.5% | 3% | 5% | Tourism app benchmark ~2-5% (SaaS industry avg ~3-5%); (estimate) |
| Premium ARPU | $4.50/mo | $5.30/mo (SAR 20) | $5.30/mo | Based on competitor-free market; modest premium pricing |
| B2B revenue (monthly, from Month 6) | $0 | $500 | $1,500 | Heritage Commission or tourism operator partnership; (estimate) |
| Months to steady-state | 8 | 6 | 4 | (estimate — S-curve ramp for tourism/consumer platform) |
| Ramp shape | S-curve | S-curve | S-curve | Consumer platform dependent on QR distribution + word-of-mouth |

#### Month-by-Month Year 1 Revenue Build (Base Scenario)

| Month | New Users | Churned | Active Users (End) | Paid Subscribers | Monthly Revenue |
|-------|----------|---------|-------------------|-----------------|----------------|
| 1 | 100 | — | 100 | 3 | $16 |
| 2 | 150 | 30 | 220 | 7 | $37 |
| 3 | 250 | 66 | 404 | 12 | $64 |
| 4 | 400 | 121 | 683 | 20 | $106 |
| 5 | 600 | 205 | 1,078 | 32 | $170 |
| 6 | 800 | 323 | 1,555 | 47 | $749 |
| 7 | 900 | 467 | 1,988 | 60 | $818 |
| 8 | 1,000 | 596 | 2,392 | 72 | $882 |
| 9 | 1,000 | 718 | 2,674 | 80 | $924 |
| 10 | 1,000 | 802 | 2,872 | 86 | $956 |
| 11 | 1,000 | 862 | 3,010 | 90 | $977 |
| 12 | 1,000 | 903 | 3,107 | 93 | $993 |
| **Year 1** | **7,200** | **4,093** | **3,107** | **93** | **$6,692** |

*Notes: B2B revenue of $500/mo added from Month 6 onward. Premium conversion at 3% of active users. Churn at 30%. Revenue = (paid subscribers × $5.30) + B2B. Months 1-5 have no B2B revenue. S-curve ramp: slow start (M1-3), acceleration (M4-8), approaching steady-state (M9-12).*

#### Three-Scenario Summary

| Metric | Conservative | Base | Optimistic |
|--------|-------------|------|-----------|
| **Year 1 Cumulative Revenue** | $2,800 | $6,692 | $18,500 |
| **Month 12 MRR** | $350 | $993 | $2,800 |
| **Month 12 Annualized Run Rate** | $4,200/yr | $11,916/yr | $33,600/yr |
| **Year 2 Cumulative Revenue** | $8,000 | $22,000 | $65,000 |
| **Year 3 Cumulative Revenue** | $18,000 | $55,000 | $180,000 |
| Active users (end of Year 1) | 1,500 | 3,107 | 8,000 |
| Active users (end of Year 3) | 5,000 | 15,000 | 40,000 |

#### Key Projection Notes

- **Cumulative vs. Run Rate**: Year 1 cumulative ($6,692) is 56% of annualized run rate ($11,916) — consistent with S-curve ramp where early months contribute little revenue.
- **Growth curve**: S-curve — slow start as QR codes are placed and word-of-mouth builds, acceleration as social sharing kicks in (Saudi users spend 3h+ daily on social media), approaching steady-state as the site catalog matures.
- **Seasonal factors**: Ramadan and Hajj season (typically months of peak pilgrimage) will create spikes. Year 1 projections assume average distribution without Hajj spike.
- **Revenue not included**: Advertising, sponsored content, ticket sales commissions, premium API access for tourism operators. These are Phase 2+ revenue streams.
- **Hackathon context**: Initial months focus on winning the hackathon and refining the MVP. Revenue generation begins seriously after initial QR code deployment at sites.

---

## 9. Success Criteria

| ID | Metric | Target | Measurement Method | Timeframe |
|----|--------|--------|--------------------|-----------|
| SC-1 | Hackathon result | Win or top-3 placement | Competition judges | Hackathon |
| SC-2 | Heritage sites covered | 10-12 complete site profiles | Content completion tracking | Month 3 |
| SC-3 | Monthly active users | 1,000+ | PWA analytics (unique visitors) | Month 6 |
| SC-4 | QR code scans | 500+ per month | QR scan analytics | Month 6 |
| SC-5 | AI chatbot conversations | 200+ per month | Chatbot analytics | Month 6 |
| SC-6 | Heritage passport stamps issued | 300+ total | Gamification system tracking | Month 6 |
| SC-7 | Government partnership | 1+ LOI signed | Partnership agreement | Month 12 |
| SC-8 | Premium conversion rate | 3%+ | Payment/subscription analytics | Month 12 |

---

## 10. Risks & Mitigation

| ID | Risk | Probability | Impact | Mitigation Strategy |
|----|------|-------------|--------|---------------------|
| R-1 | **Heritage Commission approval required** for physical QR codes at sites | High | High | Use GPS-triggered digital content as alternative; seek partnership early; present hackathon prototype as proof-of-concept |
| R-2 | **Content sensitivity** — Islamic heritage narratives must align with official religious interpretation | Medium | High | Partner with Ministry of Culture for content review; reference Heritage Commission's Digital Archiving Guide; engage Islamic history scholars |
| R-3 | **Low premium conversion** — pilgrims may not pay for heritage content | Medium | Medium | Keep core experience free; focus on B2B revenue (government partnerships); test willingness to pay with surveys |
| R-4 | **AI hallucination** — chatbot provides inaccurate historical/religious information | Medium | High | Use RAG architecture with curated knowledge base; implement content guardrails; Islamic heritage facts verified by scholars |
| R-5 | **Photography restrictions** at holy mosques limit visual content | Medium | Medium | Use licensed archival imagery; partner with Heritage Commission for official photo library |
| R-6 | **Competition from government platforms** — Heritage Commission builds their own | Low | High | Position as partner, not competitor; offer technology licensing model; demonstrate value through hackathon |
| R-7 | **PDPL compliance burden** for a small team | Medium | Medium | Minimize personal data collection; use Saudi-based hosting; implement privacy-by-design; consent management |
| R-8 | **Multi-language complexity** — 8+ languages needed for pilgrim audience | Medium | Medium | Launch with Arabic + English; add languages incrementally; leverage AI translation for Phase 2 |

---

## 11. Assumptions & Dependencies

### Assumptions

- Pilgrims and tourists will scan QR codes at heritage sites (validated: 2.2B global QR users, Saudi QR adoption on street signs)
- A freemium model can generate sufficient revenue to sustain operations (conservative projections used)
- Heritage site content can be curated accurately using scholarly sources without requiring direct Heritage Commission approval for digital-only content
- 5G/Wi-Fi coverage at heritage sites is sufficient for AI chatbot (validated: 98-99% 5G coverage, 10,500+ Wi-Fi APs)
- The hackathon team of 4 can deliver an MVP within the competition timeframe

### Dependencies

- **Heritage Commission cooperation** for official content accuracy and eventual physical QR placement
- **Google Maps / Mapbox** API availability and pricing stability
- **LLM API access** (Gemini/OpenAI) for AI chatbot functionality
- **Heritage site access** for content research, photography, and QR code testing
- **Hackathon organizers** (Ministry of Hajj & Umrah, Umm Al-Qura University) for competition access and potential post-hackathon support

---

## 12. Regulatory & Compliance

### Saudi Personal Data Protection Law (PDPL)

- **Authority**: SDAIA (Saudi Data and AI Authority)
- **Key requirements**: Consent for data collection; Arabic privacy notice; data subject rights (access, correct, delete, withdraw consent); sensitive data (including precise location) requires explicit consent
- **Data localization**: Use Saudi-based hosting (Oracle Cloud Jeddah or AWS Bahrain); cross-border transfers restricted
- **Penalties**: Up to 2 years imprisonment + SAR 3M ($800K) fine for sensitive data disclosure
- **Action**: Implement consent management; minimize data collection; privacy-by-design

### Law of Antiquities, Museums and Urban Heritage (2014)

- Physical installations (QR codes, signage) at registered heritage sites require Heritage Commission approval
- Unauthorized posting: up to 1 year imprisonment + SAR 100K fine
- **Action**: Begin with GPS-triggered digital content; seek Heritage Commission partnership for physical QR

### Tourism Licensing

- Heritage discovery platform providing tourism-related services likely requires Ministry of Tourism license
- Processing: 5-10 business days via e-services portal
- **Action**: Apply for tourism license before commercial launch

### Content Requirements

- Arabic mandatory as primary language for consumer-facing apps
- Heritage content must align with accepted Islamic religious interpretation
- Photography banned inside Masjid al-Haram and Masjid an-Nabawi — use licensed archival imagery
- **Action**: Arabic-first design; scholarly content review; licensed imagery

---

## 13. Estimated Budget Range

| Category | Low Estimate (Year 1) | High Estimate (Year 1) | Notes |
|----------|----------------------|----------------------|-------|
| Development | $0 (founder time) | $0 (founder time) | 4-person team building as hackathon project; founder equity model |
| Infrastructure (hosting, APIs) | $600 | $2,400 | Vercel free tier + Gemini Flash-Lite chatbot ($8-30/month) + map tiles |
| AI/LLM costs | $100 | $1,200 | Gemini Flash-Lite: ~$0.0008/visit; scales with usage |
| Content creation | $0 | $500 | Heritage narratives from public domain sources; licensed imagery if needed |
| Marketing | $0 | $500 | QR-first distribution (organic); social media (sweat equity) |
| Tourism license | $200 | $500 | Ministry of Tourism e-services |
| Domain & SSL | $50 | $100 | Annual domain registration + SSL |
| **Total** | **$950** | **$5,200** | Bootstrap — primarily founder time and minimal cash |

---

## 14. Technical Options Summary

> *This section is completed in the **Final BRD** phase only — after Technical Options Analysis and PRD generation. Left blank in this Initial BRD.*

---

## 15. Recommended Next Steps

1. **Win the hackathon** — Build the MVP with smart map, QR system, AI chatbot, and heritage passport covering 10-12 sites in Makkah & Madinah
2. **Run `/business-research`** — Conduct per-feature competitive analysis and impact assessment to prioritize features for post-hackathon development
3. **Seek Heritage Commission partnership** — Present hackathon prototype as proof-of-concept; request official content collaboration and physical QR placement approval
4. **Run `/domain-research`** (recommended) — Investigate AI chatbot approaches for Islamic heritage education, Arabic NLP optimization, and gamification strategies for religious tourism
5. **Continue through pipeline** — `/supporting-systems` → `/marketing-strategy` → `/tech-research` → `/pricing-strategy` → `/prd-generator`

### Domain Research Flag

**Domain research is recommended** for this idea. The core value proposition depends on:
- **AI chatbot quality for Islamic heritage content** — choosing the right LLM approach (Jais vs GPT vs RAG architecture) for culturally appropriate, historically accurate Arabic heritage narration
- **Gamification methodology for religious/heritage tourism** — how to design certificates and badges that resonate with diverse pilgrim demographics (35-64 age range, 190+ countries)

---

*This BRD was generated by Idea Forge using real market research data. All figures should be validated before making investment decisions.*
