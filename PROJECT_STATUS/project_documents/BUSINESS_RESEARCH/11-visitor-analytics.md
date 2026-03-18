# Visitor Analytics Dashboard

**Linked BRD Requirement**: BR-11
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section: Nice to Have Features
**Priority (BRD)**: Nice to Have

---

## 1. Feature Context

BR-11 specifies a Visitor Analytics Dashboard providing site visit counts, engagement time, popular sites, and visitor flow patterns. The B2B value proposition targets the Heritage Commission (persona: Dr. Ali) who needs digital engagement metrics, increased time at heritage sites, and visitor satisfaction data to justify the $53B+ invested in Madinah heritage infrastructure. The BRD estimates B2B revenue of $2,000–$5,000/month from this capability.

This feature matters because no existing system measures how visitors digitally interact with heritage sites in Makkah and Madinah. While Saudi Arabia's Heritage Commission has built a comprehensive digital database of geographic coordinates and historical information for registered sites, and has launched a tourism monitoring platform for accommodation and tourist movement statistics, there is no tool that tracks individual visitor engagement with heritage content — time spent reading about sites, popular routes, or flow patterns between heritage locations. This gap means the Heritage Commission cannot measure ROI on its heritage digitization investments.

---

## 2. Competitive Landscape

### Direct Competitors

| Competitor | Product | What They Do | Target Audience | Pricing | Strengths | Weaknesses |
|-----------|---------|-------------|-----------------|---------|-----------|------------|
| **Dexibit** | Dexibit Analytics Platform | AI-powered data analytics for visitor attractions — integrates online/in-person visitor data, tracks foot traffic, dwell time, ticketing analytics, forecasting. Used by Smithsonian, Field Museum, Rock & Roll Hall of Fame. | Museums, galleries, theme parks, stadiums | Contact sales; enterprise pricing not published. Add-ons for AI insights, revenue forecasts, third-party data. | Deep integrations with ticketing/POS systems; AI forecasting; proven at world-class museums; sentiment analysis. | Designed for enclosed venues with ticketed entry, not open-air heritage sites; no heritage-specific content engagement tracking; no Arabic/Islamic heritage context; likely expensive for regional deployments. |
| **Ariadne Analytics** | Ariadne AI Platform | AI-driven people counting, visitor journey tracking, heatmaps, flow patterns, dwell time via anonymous smartphone signal sensing. Hybrid Fusion technology with Time-of-Flight validation. | Retail, museums, event venues, airports | Contact sales; flexible plans by business size. Hardware + SaaS subscription model. | Hardware-free smartphone sensing; real-time analytics; GDPR-compliant; indoor navigation included. | Requires smartphone signal density; designed for indoor/enclosed spaces; no heritage content engagement layer; no Arabic language support documented; no heritage-specific metrics. |
| **SenSource** | Vea Analytics + People Counting Sensors | 3D stereo vision sensors (98%+ accuracy) with SaaS analytics dashboard — crowd counting, guest flow analysis, zone-level dwell time. | Museums, libraries, venues, retail | ~$400/sensor installation; SaaS subscription (price not published). Unlimited users included. | High accuracy hardware sensors; proven in museums; real-time occupancy management. | Hardware-dependent deployment at each location; no mobile/digital engagement tracking; measures physical presence only, not content interaction; no heritage specialization. |
| **SmartGuide** | SmartGuide Digital Audio Guide + Big Data Analytics | Audio guide platform with GPS-based visitor tracking — generates heatmaps, dwell time, engagement data, visitor demographics from mobile devices. Meter-level GPS precision. | Tourism boards, destinations, attractions, tour operators | €0.30–€1.00 per user per destination; volume discounts up to 70%; or monthly fee based on volume. | GPS heatmaps with meter precision; combines content delivery with analytics; affordable per-user pricing; serves tourism boards directly. | Audio guide focused — analytics are a secondary feature; no heritage-specific content framework; no Arabic heritage context; limited B2B dashboard for government stakeholders; analytics tied to SmartGuide's audio platform. |
| **Place Informatics** | Place360 Tourism | Visitor location analytics combining mobility data, visitor spend, web search, and bookings data — calculates spending by category, measures event impact, tracks visitor volumes and origins. | DMOs, tourism boards, town centres, heritage zones | Contact sales; enterprise/government pricing. | Comprehensive visitor journey analytics (plan → visit → spend); strong for justifying funding with data; serves heritage zones explicitly. | Macro-level destination analytics, not site-level heritage engagement; no individual heritage content interaction tracking; UK-focused company; no Makkah/Madinah or Saudi market presence. |

### Adjacent / Partial Solutions

| Solution | How It Partially Addresses This Need | Gap Remaining |
|----------|--------------------------------------|--------------|
| **Mzar App** (Saudi) | Heritage discovery app for Mecca with 4 routes, audio/text in 6 languages — could theoretically track usage. | No analytics dashboard; no B2B reporting; consumer-facing only; Mecca only, not Madinah; no visitor flow analytics exposed to stakeholders. |
| **Madinah Moments** (hedgehog lab) | GPS-enabled tours with audio narrations and interactive content for Madinah heritage; includes loyalty program. Built in Flutter. | Consumer app without B2B analytics layer; no heritage commission dashboard; engagement data stays within the app, not exposed to government stakeholders. |
| **Ethaf App** | 3D exhibits on Prophet's life with interactive programs and virtual museum tours. | Museum-focused, not open-air heritage sites; no visitor analytics or flow tracking; no B2B data offering. |
| **Saudi Heritage Commission Platform** | Digital database with geographic coordinates, photographs, and historical information for registered sites; tourism monitoring platform for accommodation/movement statistics. | Monitors tourism accommodation and movement at macro level; does not track digital engagement with heritage content; no site-level visitor flow or dwell time analytics. |
| **Google Cloud Tourism AI Toolkit** | Real-time footfall prediction APIs; adopted by Singapore Tourism Board for visitor distribution management. | Generic infrastructure tool requiring custom development; no heritage-specific implementation; no Arabic heritage content framework; requires significant integration work. |
| **Mapsted** | Indoor positioning, heatmaps, path analytics, and IoT solutions for museums and galleries. AI-powered location analytics. | Indoor venue focused; requires Mapsted IoT infrastructure; no heritage content engagement layer; no Saudi market presence documented. |

### Open-Source / Academic Approaches

| Project / Paper | Description | Maturity | Limitations |
|----------------|-------------|----------|-------------|
| AI-driven visitor perception framework (Nature, 2025) | SHAP-interpretable AI using social media sentiment analysis to assess visitor experiences at cultural heritage sites. | Research | Academic framework only; analyzes social media posts retrospectively, not real-time visitor behavior; no deployable product. |
| Heritage site-seeing through Instagram (Journal of Cultural Analytics) | Uses Instagram data to understand how visitors perceive and photograph heritage sites. | Research | Post-hoc social media analysis; no real-time tracking; privacy-dependent on public posts; not actionable for heritage management. |
| Geo-dashboard for tourism (MDPI Smart Cities, 2024) | Innovative geo-dashboard combining geographic and alphanumeric data for real-time tourism analytics views. | Prototype | Framework/methodology paper; not a deployable product; requires custom development per destination. |
| Machine learning tourism prediction (Nature Scientific Reports, 2025) | ML models (Random Forest, Gradient Boosting) predicting tourist arrivals in Saudi Arabia at city level. | Research | Predicts arrivals at city level, not site-level heritage engagement; no content interaction tracking; forecasting only, not real-time analytics. |

---

## 3. Gap Analysis

The competitive landscape reveals a clear and significant gap at the intersection of three dimensions:

**Geographic gap — Saudi heritage market**: No existing visitor analytics platform operates specifically within the Makkah/Madinah heritage context. Dexibit, Ariadne, and SenSource serve Western museums and enclosed venues. Place Informatics focuses on UK destinations. SmartGuide operates primarily in European tourism. The Saudi Heritage Commission's own platform monitors macro-level tourism accommodation and movement but has no tool measuring digital engagement with heritage sites.

**Capability gap — heritage content engagement analytics**: Existing platforms track either physical presence (people counters, WiFi sensing) OR digital content delivery (audio guides, AR apps) but never provide a unified analytics dashboard showing how visitors engage with heritage content. Mzar and Madinah Moments deliver heritage content to consumers but expose zero analytics to institutional stakeholders. Dexibit and Ariadne track physical movement patterns but have no heritage content layer. No competitor provides the specific metrics the Heritage Commission needs: digital engagement time per heritage site, popular site rankings by engagement, visitor flow patterns between heritage locations, or content interaction heatmaps.

**Audience gap — B2B government heritage stakeholder dashboard**: Most visitor analytics platforms serve venue operators (museums, theme parks) or DMOs at the destination level. None provide a purpose-built B2B dashboard for a Heritage Commission managing open-air, distributed historical sites across two cities. Dr. Ali's persona needs — justifying digital heritage investment with engagement metrics — is unserved by any existing product.

**Pricing gap**: At $2,000–$5,000/month, Athar's B2B pricing is likely far below enterprise platforms like Dexibit (which serves the Smithsonian) while providing more heritage-specific value than generic SmartGuide analytics (€0.30–€1/user). The value proposition is unique: heritage-specific analytics at government-accessible pricing.

---

## 4. Novelty Assessment

**Rating**: `novel`

**Rationale**: While visitor analytics for museums and tourism is an established market (Dexibit, Ariadne, SenSource all have mature products), the specific combination Athar proposes — heritage content engagement analytics for distributed open-air sites, with a B2B dashboard designed for a government Heritage Commission, in the Saudi/Islamic heritage context — has zero direct competitors. No existing platform tracks how visitors digitally engage with heritage content across Makkah and Madinah's distributed historical sites. The closest adjacent solutions (Mzar, Madinah Moments) deliver heritage content but provide no institutional analytics. The closest analytics platforms (Dexibit, Ariadne) serve enclosed venues without heritage content integration. Saudi Arabia's $53B+ investment in Madinah heritage and Vision 2030's target of 150M visitors create massive demand for exactly this capability, yet no product exists to serve it. The novelty is in the intersection — not in analytics technology itself, but in the heritage-specific, government-facing, Saudi-market application.

---

## 5. Key Sources

1. Dexibit — Data analytics for visitor attractions. https://dexibit.com/ — Accessed March 2026.
2. Dexibit Pricing. https://dexibit.com/pricing/ — Accessed March 2026.
3. Ariadne Analytics — AI-Driven Visitor Insights. https://www.ariadne.inc/platform/ariadne-analytics/ — Accessed March 2026.
4. Ariadne Pricing Plans. https://www.ariadne.inc/pricing/ — Accessed March 2026.
5. SenSource — Museum Visitor Engagement. https://sensourceinc.com/industries/museum-visitor-engagement/ — Accessed March 2026.
6. SmartGuide — Big data analytics in destination management with GPS heatmaps. https://blog.smart-guide.org/en/big-data-analytics-in-destination-management-with-gps-heatmaps — Accessed March 2026.
7. SmartGuide — Pricing for tour operators. https://blog.smart-guide.org/pricing-for-tour-operators — Accessed March 2026.
8. Place Informatics — Tourism. https://placeinformatics.com/tourism/ — Accessed March 2026.
9. Mapsted — How Museums Use Data Analytics. https://mapsted.com/blog/how-museums-use-data-analytics-to-understand-visitors-and-foot-traffic — Accessed March 2026.
10. Mzar App — Heritage landmarks in Mecca. https://www.mzarapp.com/ — Accessed March 2026.
11. hedgehog lab — Digitally Transforming Madinah's Hidden History (Madinah Moments). https://hedgehoglab.com/our-work/digitally-transforming-madinahs-hidden-history/ — Accessed March 2026.
12. Ethaf — International Fairs and Museums of the Prophet's Biography. https://ethaf.com/en — Accessed March 2026.
13. Saudi Heritage Commission. https://heritage.moc.gov.sa/en — Accessed March 2026.
14. Arab News — Saudi heritage commission launches online platform to monitor tourism. https://www.arabnews.com/node/1560686/saudi-arabia — Accessed March 2026.
15. Arab News — Heritage meets high-tech: Saudi Arabia's bold vision for smart tourism. https://www.arabnews.com/node/2601858/amp — Accessed March 2026.
16. Nature Scientific Reports — Predicting tourism growth in Saudi Arabia with machine learning. https://www.nature.com/articles/s41598-025-32509-6 — Accessed March 2026.
17. Nature npj Heritage Science — Unlocking visitor experiences with SHAP-interpretable AI. https://www.nature.com/articles/s40494-025-02014-0 — Accessed March 2026.
18. STQRY — Best Museum Software 2025. https://www.stqry.com/blog/museum-software/ — Accessed March 2026.
19. Visit Saudi — Vision 2030: Transforming Tourism for the Future. https://www.visitsaudi.com/en/stories/vision-2030 — Accessed March 2026.
20. Eco-Counter — VisitorFlow qualitative & quantitative visitor data. https://www.eco-counter.com/solutions/data-fusion/visitorflow — Accessed March 2026.
