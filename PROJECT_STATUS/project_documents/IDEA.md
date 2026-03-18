# Athar (أثر) — Interactive Heritage Discovery Platform


| Field        | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| **ID**       | `IF-Y-001`                                                             |
| **Slug**     | `athar-heritage-platform`                                              |
| **Status**   | `prd-complete`                                                         |
| **Created**  | 2026-03-18                                                             |
| **Category** | Tourism & Heritage Tech                                                |
| **Stage**    | Hackathon competition — building from scratch                          |
| **Tags**     | heritage, tourism, makkah, madinah, AI, QR, interactive-map, hackathon |
| **Domain Research** | [DOMAIN_RESEARCH/](DOMAIN_RESEARCH/README.md)                  |
| **Business Research** | [BUSINESS_RESEARCH/](BUSINESS_RESEARCH/README.md)            |
| **Supporting Systems** | [SUPPORTING_SYSTEMS/](SUPPORTING_SYSTEMS/README.md)         |
| **Marketing Strategy** | [MARKETING_STRATEGY/](MARKETING_STRATEGY/README.md)         |
| **Technical Options** | [TECHNICAL_OPTIONS/](TECHNICAL_OPTIONS/README.md)             |
| **BRD**      | [BRD.md](BRD.md)                                                      |
| **PRD**      | [PRD.md](PRD.md)                                                       |


## One-Liner

An interactive digital platform that transforms the experience of exploring historical and heritage sites in Makkah and Madinah through smart maps, on-site QR codes, AI-powered voice/chat recommendations, and digital visit certificates.

## Problem Statement

1. **Poor information access**: Available information about historical sites is limited, unattractive, and not presented in a modern interactive way.
2. **No unified platform**: There is no single platform that aggregates historical, religious, archaeological, and cultural sites in one place.
3. **No smart map**: There is no intelligent map that helps visitors discover sites and understand their stories.
4. **Inadequate experience**: The current experience doesn't suit all age groups and doesn't deliver genuine enjoyment or engagement.

## Target Audience

1. **Visitors & tourists** — Local and international pilgrims, Umrah/Hajj visitors, and general tourists visiting Makkah and Madinah.
2. **Families & children** — Looking for enjoyable, age-appropriate educational experiences.
3. **Students & researchers** — Interested in history, culture, and heritage studies.
4. **Tourism & cultural authorities** — Government bodies and organizations (Ministry of Hajj & Umrah, Saudi Tourism Authority).
5. **Museum & historical site administrators** — Managing and promoting heritage locations.

## Existing Solutions

**Indirect competitors only (no direct competitor identified):**

- General map applications (Google Maps, Apple Maps) — no heritage-specific classification or storytelling.
- Traditional tourism websites — static information, not interactive.
- Individual museum/site official guides — fragmented, each site has its own separate guide if any.
- Some cultural events/visit apps — limited scope, no QR-based on-site exploration.

**What competitors lack:** Smart site classification, interactive storytelling per site, on-site QR code exploration, and an experience designed for all age groups.

## Initial Thoughts

### Project Goals

No existing website — building from scratch for the hackathon competition. The goal is to **win the hackathon**. Key priorities:

1. **Focus on Makkah & Madinah only** — Start with 10-12 of the most visited historical/heritage sites.
2. **AI Voice & Text Chatbot** — A conversational AI that acts like a human guide: asks visitors about their preferences and interests, answers questions, and recommends specific places based on their needs. Both voice and text chat modes.
3. **Enhanced visitor experience** — Simplicity, targeting a large population segment, expandable architecture.
4. **Integration potential** — Designed to be part of an existing app ecosystem (Webook or Nusuk app).

### Core Features (from hackathon presentation)

1. **Information boards with QR** — Physical boards at each site with site info and QR code.
2. **Distributed QR codes** — QR codes placed throughout each site, each telling the story of that specific section. Entry QR = site overview; internal QRs = section-specific stories.
3. **Smart interactive map** — In-app map showing all heritage sites, classified by type and city, with Google Maps integration for navigation and nearby site discovery.
4. **Digital certificates & badges** — Awarded upon visiting/completing site explorations.
5. **AI recommendation engine** — Trained to converse with users about what they want in a site visit, then recommends specific matching locations.

### Existing Tech Stack

- **Frontend**: Next.js + React
- **Maps**: Leaflet Maps (open-source interactive maps)
- **QR**: QR code generation and scanning system
- **Prototype**: None yet — to be built from scratch for the hackathon. The pitch deck shows mockup/design concepts.

### Hackathon Context

- **Event**: Hackathon for Historical and Enrichment Sites (3rd Edition)
- **Organizers**: Ministry of Hajj & Umrah, Umm Al-Qura University, Umrah & Ziyarah Forum
- **Team**: Yousef Osama Endargiri, Mohammed Ghazi Al-Owaidhi, Mohammed Siraj Menshi, Ahmed Mohammed Qaed

## Monetization Idea

1. **Booking platform integration** — Integration with Webook/Nusuk for seamless visitor booking experience.
2. **Sponsorship & support packages** — From heritage and tourism-interested organizations and government bodies.
3. **Premium paid services** — Advanced interactive content, premium guided experiences.

## Known Constraints

- Must focus initially on Makkah and Madinah sites only (10-12 most visited places).
- Designed to potentially integrate as part of Webook or Nusuk app (not necessarily standalone).
- Hackathon project context — needs to demonstrate viability within competition scope.
- Heritage/religious content — must be historically accurate and culturally respectful.
- Bilingual support needed (Arabic primary, English secondary).

## References & Inspiration

- Hackathon pitch deck mockups (design concepts, not built yet).
- Webook platform (events & booking in Saudi Arabia).
- Nusuk app (official Hajj & Umrah platform by Ministry of Hajj & Umrah).
- Hackathon presentation: "ملف عرض مشروع اثر.pdf" (15-slide pitch deck).
- Project fundamentals doc: "أساسيات وهدف المشروع.pdf" (project goals and core idea).

## Open Questions

- Should the platform be standalone or built as a module within Webook/Nusuk?
- What AI/LLM provider for the voice chatbot? (OpenAI, Google, local Arabic-optimized model?)
- How to handle offline QR scanning in areas with poor connectivity inside historical sites?
- What certificate/badge system — simple digital images, or verifiable credentials?
- Content sourcing — who provides the historical narratives and site descriptions?
- What analytics/tracking for visitor engagement at physical sites?

## Next Steps

- Conduct market research (`/brd-generator`)
- Generate BRD
- Generate PRD (`/prd-generator`)

