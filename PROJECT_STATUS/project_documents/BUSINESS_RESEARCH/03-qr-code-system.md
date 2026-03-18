# QR Code Generation & Scanning

**Linked BRD Requirement**: BR-3
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 3
**Priority (BRD)**: Must Have

---

## 1. Feature Context

BR-3 specifies a dual-layer QR code system for heritage sites in Makkah and Madinah: an entry-level QR code at each site provides an overview, while internal QR codes placed at specific sections deliver location-specific heritage stories. QR scans open a PWA instantly with no app download required — this is the primary distribution mechanism for the entire Athar platform.

This feature is the critical on-ramp for the product. Without frictionless QR-to-PWA access, user acquisition at heritage sites fails. The 2.47% app download rate among museum visitors (Nubart, 2024) makes a no-download approach essential. QR codes are the bridge between the physical heritage site and the digital storytelling experience.

---

## 2. Competitive Landscape

### Direct Competitors

| Competitor | Product | What They Do | Target Audience | Pricing | Strengths | Weaknesses |
|-----------|---------|-------------|-----------------|---------|-----------|------------|
| **Nubart** | Nubart GUIDE | QR-code-accessed PWA audio guides for museums. Visitors scan a QR card/poster and get a browser-based multilingual audio tour — no download. Supports offline playback after first scan. | Museums & cultural institutions globally | SaaS model; monetizable QR cards for museums | True PWA (no app store), offline support, GDPR-compliant, multilingual, proven 2.47% vs. near-universal QR scan adoption data | Museum-focused only, no outdoor heritage trail support, no AI-powered storytelling, no Arabic heritage content |
| **izi.TRAVEL** | izi.TRAVEL Platform | World's largest free audio tour guide — 25,000+ tours across 2,500 cities in 137 countries, 50+ languages. CMS generates unique QR codes per exhibit. Trusted by 3,000+ museums. | Museums, cities, tour guides worldwide | Free for creators; ad-supported free tier for visitors | Massive scale (25K tours, 137 countries), established museum partnerships, QR per exhibit, community-created content | Requires app download (iOS/Android), not a PWA, content quality varies (user-generated), no AI storytelling, limited MENA/Arabic heritage content |
| **SmartGuide** | SmartGuide Digital Audio Guide | QR code + Bluetooth beacon triggered audio/video/AR guides. AI chatbot for visitor Q&A. GPS heatmaps for visitor flow analytics. | Tourist attractions, museums, tourism boards | SaaS pricing, custom quotes | Multi-trigger (QR + beacon + GPS), AI chatbot, analytics dashboard, AR support | Requires app download, not heritage-specific, no Arabic cultural storytelling, no PWA instant access |
| **Bebot** (Bespoke Inc.) | Bebot AI Chatbot | QR-accessed AI chatbot for tourism guidance. Deployed at Narita Airport, Tokyo Station, Tokyo Metro, Niseko resort. 12M+ annual traveler interactions. No app download — opens in browser via QR. | Tourists in Japan (airports, transit, resorts) | B2B SaaS to venues | Browser-based (no download), massive scale (12M users/year), multilingual, proven QR adoption at transit hubs | Japan-only, chatbot-only (no rich storytelling), no heritage narratives, no section-specific QR routing, not a PWA |
| **MySmartJourney** | MySmartJourney Platform | 100% web-based (no app) NFC + QR platform for interactive multimedia experiences in physical spaces. Text, images, audio, video, 3D content. Used by museums and heritage sites (e.g., Le Mans cemetery heritage trail). | Museums, cultural sites, tourism operators | SaaS pricing | True web-based (no download), NFC + QR dual access, multimedia rich, heritage-proven (Le Mans), rapid setup | Canada/Europe focused, no Arabic content, no AI storytelling, no PWA architecture, limited MENA presence |
| **Supercode** | Supercode QR Platform | Dynamic QR code management for city tours and tourism. Per-stop analytics, auto-locale language detection, real-time content updates. | Cities, tour operators, tourism boards | SaaS (QR management platform) | Dynamic QR codes (editable post-print), per-stop analytics, auto-language detection, multi-stop tour tracking | Generic QR management (not heritage-specific), no storytelling engine, no PWA, requires integration with content platform |

### Adjacent / Partial Solutions

| Solution | How It Partially Addresses This Need | Gap Remaining |
|----------|--------------------------------------|--------------|
| **Saudi STS (Smart Tourism System)** research project | Academic framework using QR codes to provide multilingual information about historical/ancient Saudi sites, addressing shortage of multilingual tour guides | Research/conceptual only — not a deployed product; no PWA, no AI storytelling, no Makkah/Madinah implementation |
| **Riyadh/Jeddah Street QR Codes** | QR codes on street signs in Riyadh and Jeddah linking to location info, GPS coordinates, and area details | Navigation/wayfinding only — no heritage narratives, no multimedia storytelling, no section-specific content |
| **AR Code (ar-code.com)** | AI-powered QR codes combining AR and AI for museum experiences, including historical persona quest systems | Emerging technology, primarily Western museums, no Arabic heritage focus, requires AR-capable devices for full experience |
| **QRStuff / ME-QR / QR Tiger** | Generic QR code generators with tourism templates | Infrastructure tools only — no content management, no storytelling, no heritage-specific features |
| **Guide ID** | PWA-based tour guide access via QR codes | Generic tour guide platform, no heritage storytelling, no Arabic content |

### Open-Source / Academic Approaches

| Project / Paper | Description | Maturity | Limitations |
|----------------|-------------|----------|-------------|
| **Smart Tourism Architectural Model (KSA)** (Thesai.org, 2017) | Academic paper proposing QR-based smart tourism architecture for Saudi Arabia, covering historical site information delivery | Research | Theoretical framework only; no implementation, no PWA, dated (2017) |
| **Bristol Digital Game Lab Quest System** (2025) | AI-powered quest system for heritage sector using QR codes — visitors scan to take on historical personas with LLM-powered NPCs guiding them through galleries | Prototype | UK-focused, gallery-specific, not adapted for outdoor heritage sites or Arabic cultural contexts |
| **Pérez-Sanagustín et al. (2016)** — QR codes for museum engagement | Research on using QR codes to increase user engagement in museum-like settings | Research | Academic study; no production system, museum-interior only |
| **MDPI Sustainability (2025)** — Context-aware QR framework for KSA | Sustainable smart urban governance framework using context-aware QR codes in Saudi Arabia, aligned with Vision 2030 | Research | Urban governance focus (property visualization), not heritage storytelling |

---

## 3. Gap Analysis

A clear gap exists at the intersection of four dimensions that no current competitor covers:

**Geographic Gap — Makkah & Madinah Heritage**: No QR-based heritage storytelling platform operates in Makkah or Madinah. Saudi Arabia's existing QR deployments (Riyadh/Jeddah street signs) are navigational, not narrative. The STS research project is academic only. The two holiest cities in Islam, receiving 15M+ Hajj/Umrah pilgrims plus growing tourism under Vision 2030, have zero QR-to-digital-storytelling infrastructure for heritage sites.

**Architectural Gap — True PWA Instant Access**: Most competitors (izi.TRAVEL, SmartGuide) still require app downloads. Nubart and MySmartJourney are web-based but not full PWAs with offline capability and installability. Bebot is browser-based but chatbot-only. No competitor combines QR → PWA instant open → rich multimedia heritage storytelling → offline capability in a single flow.

**Content Gap — Arabic Heritage Storytelling**: Existing platforms carry predominantly Western museum content. None offer curated Arabic/Islamic heritage narratives for Makkah/Madinah's historical sites with culturally appropriate storytelling in Arabic and English.

**Structural Gap — Dual-Layer QR (Entry + Section)**: Competitors typically use single QR codes per exhibit or per venue. The dual-layer approach (entry QR for site overview + internal QR codes for section-specific stories) creates a guided discovery flow that mirrors how visitors actually move through heritage sites — an approach not implemented by any current platform.

**Distribution Gap — No Download Barrier**: At 2.47% museum app download rates (Nubart data), QR-to-PWA eliminates the single biggest adoption barrier in heritage tech. Combined with 2.2 billion active QR code users worldwide (29% of smartphone users, 2026), the addressable audience is near-universal among smartphone holders.

---

## 4. Novelty Assessment

**Rating**: `novel`

**Rationale**: While QR codes for museum/tourism experiences are well-established (izi.TRAVEL has 25K+ tours, Nubart pioneered QR-to-PWA in museums, Bebot handles 12M+ annual interactions), no existing solution combines:

1. **QR → PWA instant access** (no download) with
2. **Dual-layer QR routing** (entry overview + section-specific stories) at
3. **Heritage sites in Makkah/Madinah** with
4. **Arabic/Islamic cultural storytelling** content

The individual technologies are proven (QR scanning, PWAs, audio/multimedia guides). The novelty is in the specific combination, the geographic deployment (world's most visited religious sites with zero existing digital heritage infrastructure), and the dual-layer QR architecture for guided heritage discovery. This is a novel application of proven technology in an unserved, high-traffic market. The 15M+ annual pilgrim audience and Saudi Vision 2030 tourism investment create a unique deployment context that no competitor has addressed.

---

## 5. Key Sources

1. Nubart — "Museum Audio Guide Apps: Only 2.47% of Visitors Download Them" — https://www.nubart.eu/audio-guides/museum-audio-guide-app-adoption-rates.html — Accessed 2026-03-18
2. Nubart GUIDE — PWA-based QR audio guides for museums — https://www.nubart.eu/audio-guides/ — Accessed 2026-03-18
3. izi.TRAVEL — QR codes in audio guides documentation — https://izi.travel/en/help/production/qr-codes — Accessed 2026-03-18
4. SmartGuide — Digital audio guide for museums — https://www.smartguide.app/museums — Accessed 2026-03-18
5. Bespoke Inc. — "Bebot AI Chatbot launches on Tokyo Metro" — https://www.prnewswire.com/news-releases/bespokes-ai-chatbot-launches-on-the-tokyo-metro-300966865.html — Accessed 2026-03-18
6. Bespoke Inc. — "Bebot implemented by Niseko Resort Area" — https://www.prnewswire.com/news-releases/bespokes-ai-based-chatbot-bebot-implemented-by-niseko-resort-area-301182848.html — Accessed 2026-03-18
7. MySmartJourney — "How museums benefit from QR and NFC technologies" — https://mysmartjourney.com/en-ca/post/how-museums-benefit-from-qr-and-nfc-technologies — Accessed 2026-03-18
8. Supercode — "QR Codes for Cities & Tours (2026)" — https://www.supercode.com/use-case/qr-codes-for-cities-and-tours — Accessed 2026-03-18
9. Scanova — "QR Codes in Saudi Arabia: 4 Diverse Use Cases" — https://scanova.io/blog/qr-codes-saudi-arabia/ — Accessed 2026-03-18
10. MDPI Sustainability — "Sustainable Smart Urban Governance Enabled by Context-Aware QR Codes... in Saudi Arabia" — https://www.mdpi.com/2071-1050/18/5/2374 — Accessed 2026-03-18
11. Thesai.org — "Smart Tourism Architectural Model (Kingdom of Saudi Arabia)" — https://thesai.org/Downloads/Volume8No10/Paper_10-Smart_Tourism_Architectural_Model.pdf — Accessed 2026-03-18
12. Bristol Digital Game Lab — "On a Quest to Learn: AI-powered Quest System for Heritage Sector" (2025) — https://bristoldigitalgamelab.blogs.bristol.ac.uk/2025/09/04/on-a-quest-to-learn-creating-an-ai-powered-quest-system-for-the-heritage-sector/ — Accessed 2026-03-18
13. MuseumNext — "QR Codes in Museums: Unlocking New Opportunities in 2025" — https://www.museumnext.com/article/qr-codes-are-experiencing-a-resurgence-but-how-can-they-benefit-museums/ — Accessed 2026-03-18
14. National Museums Scotland — "QR codes in museums — worth the effort?" (2022) — https://blog.nms.ac.uk/2022/07/19/qr-codes-in-museums-worth-the-effort/ — Accessed 2026-03-18
15. Supercode — "QR Code for Tourism" — https://www.supercode.com/use-case/qr-codes-for-tourism — Accessed 2026-03-18
