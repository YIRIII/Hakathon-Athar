# Nearby Sites Discovery

**Linked BRD Requirement**: BR-8
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 8
**Priority (BRD)**: Should Have

---

## 1. Feature Context

BR-8 specifies GPS-based discovery of heritage sites near the user's current location to increase site visits per session. The feature leverages the 98-99% 5G coverage in Makkah and Madinah to deliver real-time proximity recommendations. Unlike generic "nearby places" features, Athar's version surfaces heritage-specific context, including historical narratives and cross-site connections (e.g., "You visited Quba Mosque — did you know the nearby Qiblatain Mosque has a fascinating linked story?"). This feature transforms passive sightseeing into active heritage exploration by clustering related sites and nudging users toward contextually relevant next visits.

---

## 2. Competitive Landscape

### Direct Competitors

| Competitor | Product | What They Do | Target Audience | Pricing | Strengths | Weaknesses |
|-----------|---------|-------------|-----------------|---------|-----------|------------|
| **Clio** | [Clio — Your Guide to History](https://theclio.com/) | GPS-based discovery of nearby historical sites. Shows 20 nearest sites on launch; "Discovery" mode tracks 7 closest sites and updates as user moves. Supports walking tours and heritage trails. | US history enthusiasts, educators, students | Free (non-profit) | Strong GPS discovery with auto-updating proximity; 100,000+ entries; walking tours linking related sites; community-contributed content | US-focused only — zero coverage in Saudi Arabia or MENA; no heritage classification taxonomy; no AI-driven cross-site storytelling; no Arabic language support |
| **Driftscape** | [Driftscape — Local Guide](https://www.driftscape.com/) | GPS-triggered heritage content with proximity notifications. Tour Autoplay triggers next stop narration when user approaches. AR overlay of nearby heritage markers on streetscape. | Canadian municipalities, heritage parks, DMOs | B2B SaaS (municipalities pay); free for users | GPS-triggered audio autoplay; AR mode overlaying heritage markers; offline support; multilingual (EN/FR) | Canada-focused; requires municipal partnership to populate content; no heritage classification or cross-site narratives; no MENA presence |
| **HeritageSpot** | [HeritageSpot](https://heritagespotapp.com/) | Curated heritage site discovery for India. Shows nearby heritage sites with distance from current location. 200+ sites with religious significance, architectural details, and visiting info. | Indian heritage tourists, spiritual travelers | Free | Nearby site discovery based on location; 10 Indian languages; rich cultural context per site; spiritual and architectural classification | India-only (200+ sites); no AI recommendations; no cross-site narrative linking; no MENA coverage |
| **izi.TRAVEL** | [izi.TRAVEL](https://izi.travel/en/app) | Audio tour platform with "Free Walking Mode" — GPS auto-plays stories at nearest attractions across 900+ cities. | Global tourists, museum visitors | Free (with premium content) | 900+ cities globally; GPS auto-play nearest attractions; large content library; community-created tours | Generic tourism — no heritage-specific classification; no cross-site narrative connections; limited MENA content; user-generated quality varies |
| **SmartGuide** | [SmartGuide](https://blog.smart-guide.org/) | Digital tour guide with GPS-triggered audio narration at points of interest. Auto-plays when reaching a sight. | Tour operators, destinations, travelers | Freemium (operators pay for premium features) | GPS auto-trigger narration; good tour operator tools; offline maps | Tour-focused rather than discovery-focused; no heritage taxonomy; no AI-driven recommendations; limited MENA content |

### Adjacent / Partial Solutions

| Solution | How It Partially Addresses This Need | Gap Remaining |
|----------|--------------------------------------|--------------|
| **Google Maps** ("Explore Nearby") | Shows nearby points of interest by category (restaurants, attractions, etc.); enlarged landmark icons for major heritage sites; "Explore" tab surfaces general attractions | No heritage classification or taxonomy; no contextual heritage narratives; no cross-site storytelling; treats heritage sites same as restaurants and shops |
| **Nusuk** (official Hajj/Umrah platform) | Lists 150+ destinations in Makkah/Madinah including heritage landmarks; maps and navigation to religious sites | Pilgrimage logistics focused, not heritage discovery; no GPS-triggered proximity recommendations; no heritage classification; no narrative connections between sites |
| **Visit Saudi** (visitsaudi.com) | Lists heritage and cultural sites across Saudi Arabia including Makkah/Madinah; general destination information | Static web listings, not proximity-based; no real-time GPS discovery; no heritage classification taxonomy; no contextual cross-site connections |
| **TripAdvisor** | "Sights & Historical Landmarks" category for Makkah and Madinah; user reviews and ratings; nearby attraction suggestions | Tourist review platform, not heritage discovery tool; no heritage classification; generic proximity ("near this hotel") not heritage-contextual; no narrative storytelling |
| **Locatify** (BLE Beacon platform) | BLE beacon-triggered content delivery for museums and heritage sites; indoor proximity detection | Indoor/museum focused — not city-scale outdoor heritage discovery; requires physical beacon infrastructure deployment; B2B platform, not consumer app |

### Open-Source / Academic Approaches

| Project / Paper | Description | Maturity | Limitations |
|----------------|-------------|----------|-------------|
| "Heritage-aware Graph Neural Networks" (Nature, 2025) | Models cultural significance propagation between heritage sites using spatiotemporal transformers; balances cultural value with tourist preferences for route recommendations | Research | Academic prototype; no production deployment; requires extensive heritage knowledge graph construction |
| "My Heritage Companion" (ACM UMAP 2025) | AI-driven mobile experience combining visual storytelling with heritage site visits; personalizes narratives based on user context | Research / Prototype | Conference demo; not production-ready; Western heritage focus |
| "Multilingual Heritage Assistant Using Recurrent Location" (IJCRT) | Location-aware heritage guide using recurrent neural networks for contextual recommendations based on visit sequence | Research | Paper-stage only; no deployed system; language coverage unclear |
| Location-based AR for Cultural Heritage (PMC, 2023) | Augmented reality mobile app using GPS for cultural heritage communication in the Doltso District, Greece | Prototype | Single-district deployment; not transferable without extensive content creation; no cross-site discovery |

---

## 3. Gap Analysis

The competitive landscape reveals a clear and significant gap at the intersection of **heritage-specific proximity discovery** and **Makkah/Madinah coverage**:

**Geographic Gap**: No existing app provides GPS-based heritage site discovery specifically for Makkah and Madinah. Clio covers only the US, Driftscape only Canada, and HeritageSpot only India. The Nusuk app covers the two cities but focuses on pilgrimage logistics, not heritage exploration. Google Maps and TripAdvisor list sites generically without heritage context.

**Heritage Classification Gap**: All general-purpose proximity apps (Google Maps, izi.TRAVEL, SmartGuide) treat heritage sites as generic points of interest. None apply a heritage-specific taxonomy (e.g., Islamic historical period, architectural significance, prophetic connection) that would enable meaningful filtering and contextual recommendations.

**Cross-Site Narrative Gap**: This is the widest gap. No competitor — including heritage-focused apps like Clio and HeritageSpot — provides AI-driven cross-site storytelling that connects nearby sites through shared historical narratives. Clio links sites via manually curated walking tours, but does not dynamically surface contextual connections between sites based on the user's current visit. The BRD's vision of "You visited Quba Mosque — did you know the nearby Qiblatain Mosque has a fascinating linked story?" is entirely unserved.

**5G Advantage Gap**: Makkah and Madinah's 98-99% 5G coverage enables rich real-time proximity experiences (instant content loading, AR overlays, streaming narratives) that competitors in lower-connectivity regions cannot assume. No competitor is designed to exploit this infrastructure advantage.

---

## 4. Novelty Assessment

**Rating**: `novel`

**Rationale**: While GPS-based "nearby sites" discovery is an established pattern (Clio, Driftscape, HeritageSpot, izi.TRAVEL all implement it), no competitor combines all three differentiators: (1) heritage-specific classification taxonomy, (2) AI-driven cross-site narrative connections that dynamically suggest related sites based on visit context, and (3) coverage of Makkah/Madinah heritage sites. The cross-site narrative intelligence — connecting nearby sites through shared historical threads rather than just geographic proximity — is genuinely novel and not found in any production app. The closest academic work (Heritage-aware Graph Neural Networks) validates the concept but has no deployed implementation. The combination of this narrative linking with the specific geographic focus and 5G infrastructure advantage creates a differentiated proposition that moves beyond incremental improvement into novel territory.

---

## 5. Key Sources

1. Clio — Your Guide to History. https://theclio.com/ — Accessed 2026-03-18
2. Clio App on Google Play. https://play.google.com/store/apps/details?id=com.theclio.clio — Accessed 2026-03-18
3. "Clio: Connecting Place with the Past." American Historical Association, March 2018. https://www.historians.org/perspectives-article/clio-connecting-place-with-the-past-march-2018/ — Accessed 2026-03-18
4. Driftscape — Exploring Heritage Park Made Easy. https://www.driftscape.com/post/exploring-heritage-park-made-easy-with-driftscape — Accessed 2026-03-18
5. HeritageSpot. https://heritagespotapp.com/ — Accessed 2026-03-18
6. HeritageSpot on Google Play. https://play.google.com/store/apps/details?id=com.heritage.spot — Accessed 2026-03-18
7. izi.TRAVEL App. https://izi.travel/en/app — Accessed 2026-03-18
8. SmartGuide vs izi.TRAVEL comparison. https://blog.smart-guide.org/en/smartguide-vs-izi.travel-comparing-the-best-digital-guide-audio-platforms — Accessed 2026-03-18
9. Google Maps — Search for nearby places. https://support.google.com/maps/answer/4610185 — Accessed 2026-03-18
10. Nusuk App — Saudipedia. https://saudipedia.com/en/nusuk-app — Accessed 2026-03-18
11. Nusuk — Makkah & Madinah. https://umrah.nusuk.sa/MakkahAndMadinah — Accessed 2026-03-18
12. Visit Saudi — Makkah. https://www.visitsaudi.com/en/makkah — Accessed 2026-03-18
13. How Bluetooth Beacons Transform Smart Tourism — Locatify. https://locatify.com/how-bluetooth-beacons-transform-smart-tourism/ — Accessed 2026-03-18
14. "Deep learning based personalized tourism recommendation." Scientific Reports, 2025. https://www.nature.com/articles/s41598-025-22592-0 — Accessed 2026-03-18
15. "My Heritage Companion: An AI-Driven Mobile Experience." ACM UMAP 2025. https://dl.acm.org/doi/10.1145/3708319.3733651 — Accessed 2026-03-18
16. "Location-Based Augmented Reality for Cultural Heritage Communication." PMC, 2023. https://pmc.ncbi.nlm.nih.gov/articles/PMC10222302/ — Accessed 2026-03-18
17. "Artificial Intelligence in Heritage Tourism." MDPI Heritage, 2025. https://www.mdpi.com/2571-9408/8/10/428 — Accessed 2026-03-18
18. Boosting Tourism — Location-Based iOS Apps. https://moldstud.com/articles/p-boosting-tourism-harnessing-location-based-ios-apps-to-attract-visitors — Accessed 2026-03-18
