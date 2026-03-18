# Smart Interactive Map

**Linked BRD Requirement**: BR-1
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 7
**Priority (BRD)**: Must Have

---

## 1. Feature Context

The Smart Interactive Map is the core feature of Athar, displaying 10-12 heritage sites in Makkah and Madinah classified by type (religious, archaeological, cultural, museum) and city. It includes interactive heritage-specific overlays such as historical layers, site boundaries, and contextual information. As the primary navigation and discovery interface, this feature differentiates Athar from general tourism or pilgrimage apps by focusing exclusively on heritage interpretation rather than logistics.

**Key capabilities**:
- Map display with 10-12 heritage sites across Makkah and Madinah
- Category filtering by site type (religious, archaeological, cultural, museum) and city
- Heritage-specific overlays (historical context, site boundaries, era timelines)
- Interactive markers with site previews and navigation
- PWA-compatible responsive map interface

---

## 2. Competitive Landscape

### 2.1 Direct Competitors

| Competitor | Description | Target Audience | Pricing | Strengths | Weaknesses |
|---|---|---|---|---|---|
| **SirahMaps** | Interactive historical map of Makkah during the Prophet's era (570-632 CE). 3km x 3km map with 37+ geographic features and 117+ topographic landmarks. Includes voice narrations, 3D animations, and a comparison overlay with modern satellite imagery. | Islamic history enthusiasts, scholars, educators, students | Free tier (basic map); Pro: $10/mo or $100-200/yr | Deep historical accuracy based on primary Arabic sources; 3D animations and voice narrations; comparison map (historical vs modern); bilingual (EN/AR); strong scholarly credibility (TEDx featured) | Makkah only — no Madinah coverage; focused on Prophet's era only, not broader heritage categories; subscription model limits casual access; web-based, not a native PWA; no real-time visitor info or trip planning |
| **Heritage Eye** (Ministry of Culture) | Official Saudi Ministry of Culture portal for exploring heritage and historical sites across Saudi Arabia with augmented reality experiences. | Domestic tourists, international visitors, heritage enthusiasts | Free | Government-backed with official data; AR immersive experiences; covers all of Saudi Arabia; promotes national identity | Not focused specifically on Makkah/Madinah heritage; broad scope dilutes depth per city; limited interactive map functionality compared to dedicated map apps; no heritage-type classification system |
| **Historic Jeddah (Al-Balad) App** | Dedicated app for Al-Balad UNESCO World Heritage district in Jeddah. Interactive map of landmarks, mosques, museums, and souks with virtual tours and event updates. | Tourists visiting Jeddah, heritage enthusiasts | Free | UNESCO site focus with deep content; interactive map with landmark details; virtual tours; route planning; bilingual (AR/EN); real-time event alerts | Jeddah only — no Makkah or Madinah coverage; single-district scope; no heritage classification taxonomy; no cross-city comparison capability |
| **Nusuk** (Ministry of Hajj & Umrah) | Official pilgrimage platform for Hajj and Umrah. Provides permits, booking, maps, navigation, crowd info, and AI assistant. 120+ services, 10 languages, offline support. | Hajj and Umrah pilgrims from 100+ countries | Free | Massive user base (millions of pilgrims); offline maps; government-backed; multi-language (10); comprehensive logistics (permits, transport, hotels) | Pilgrimage logistics focus — no heritage content or interpretation; maps show religious sites for worship, not heritage exploration; no heritage classification or historical overlays; not designed for cultural tourism |
| **Visit Saudi App** | Official Saudi Tourism Authority app with interactive map, POI filtering, events calendar, restaurant/hotel listings across all Saudi cities. | International and domestic tourists | Free | Nationwide coverage; POI filtering; events calendar; restaurant and accommodation listings; official tourism authority backing | Surface-level heritage content — listings without deep interpretation; broad scope means shallow depth per location; no heritage-specific overlays or classification; no Makkah/Madinah heritage focus |

### 2.2 Adjacent Solutions (Global Heritage/Tourism Map Platforms)

| Solution | Description | Relevance to Athar | Pricing | Key Differentiator |
|---|---|---|---|---|
| **izi.TRAVEL** | World's largest free audio tour guide platform. 25,000+ tours across 2,500 cities in 137 countries. GPS-triggered audio, multimedia content, offline support. Used by 3,000+ museums. | Closest global model for heritage audio tours with maps; could be a distribution channel but lacks Makkah/Madinah heritage content | Free (premium subscription for ad-free + downloads) | Massive tour library; GPS-triggered playback; community-created content; 50+ languages |
| **SmartGuide** | Digital audio tour guide app with GPS navigation, multimedia content, AR features, and AI translation. B2B platform for tour operators, museums, and heritage organizations. | B2B platform model relevant for partnerships; no Saudi heritage content exists | Free app; guides $0.99-6.99; B2B: €0.3-1/user | AI translation; analytics dashboard; B2B model for heritage orgs |
| **Clio** | GPS-enabled US history discovery app. Shows nearest 7 historical sites on map, AR navigation, walking/driving tour modes, heritage trails, PDF tour downloads. | Strong UX model for location-based heritage discovery; US-only, no MENA content | Free | Academic rigor (NEH-backed); "Discovery mode" with proximity alerts; AR wayfinding; heritage trail format |
| **HeritageSpot** | Heritage site discovery app with type filtering (temples, mosques, churches, forts), distance-based browsing, offline access, QR sharing, 10 languages. | Filtering by type is directly relevant; global but thin content per site | Free | Type-based filtering; proximity sorting; multilingual; QR sharing |
| **UNESCO Dive into Heritage** | Saudi-funded UNESCO platform using 3D models, VR, AR, interactive maps, and geolocated narratives for World Heritage sites. Pilot phase covers 14 sites across 9 Arab countries. | Directly relevant technology approach; focuses on UNESCO sites only, not local heritage | Free (web platform) | 3D immersive models; geolocated narratives; UNESCO-quality documentation; capacity building program |
| **Pilgrim Map** | Digital companion for discovering sacred sites and pilgrimage destinations worldwide across all religious traditions. | Relevant concept for religious/pilgrimage heritage mapping; no depth per site | Free (web) | Multi-faith; global sacred site database |

### 2.3 Open-Source / Build-Your-Own Solutions

| Solution | Type | Relevance | License |
|---|---|---|---|
| **Leaflet.js** | JavaScript interactive map library, 42KB, mobile-friendly, supports GeoJSON, custom layers, markers, popups | Primary candidate for Athar's map engine; lightweight, ideal for PWA | BSD-2-Clause (open source) |
| **MapLibre GL JS** | Open-source fork of Mapbox GL JS; vector tile rendering, 3D terrain, custom styling | Alternative to Leaflet for richer visual effects and vector tiles | BSD-3-Clause (open source) |
| **Mapbox** | Commercial mapping platform with custom styling, geocoding, navigation, satellite imagery | High-quality tiles and APIs but has usage-based pricing | Free tier (50K map loads/mo); paid beyond |
| **OpenStreetMap** | Community-maintained global map data | Free base map tiles for any mapping solution | ODbL (open data) |
| **ArcGIS StoryMaps** | ESRI platform for creating narrative-driven interactive maps (used by Al-Balad Digital Twin project) | Proven for Saudi heritage mapping; expensive for production use | Enterprise pricing |

---

## 3. Gap Analysis

### 3.1 Critical Gap Identified

**No existing platform provides a dedicated, interactive heritage discovery map for both Makkah and Madinah with heritage-type classification.**

| Gap Dimension | Current Market State | Athar's Opportunity |
|---|---|---|
| **Geographic coverage** | SirahMaps covers only Makkah (historical era); Historic Jeddah covers only Al-Balad; Heritage Eye covers all of Saudi broadly; no platform covers Makkah + Madinah heritage together | First platform to unify heritage sites across both holy cities in a single interactive map |
| **Heritage focus vs. logistics** | Nusuk focuses on pilgrimage logistics; Visit Saudi focuses on general tourism; neither interprets heritage | Dedicated heritage interpretation layer — historical context, not just POI pins |
| **Classification taxonomy** | No competitor classifies heritage sites by type (religious, archaeological, cultural, museum) with filterable overlays | Structured heritage taxonomy enables discovery by interest, not just geography |
| **Depth vs. breadth** | Global platforms (izi.TRAVEL, HeritageSpot) have breadth but no Makkah/Madinah depth; SirahMaps has Makkah depth but only for Prophet's era | Deep, curated content for 10-12 sites with multiple content layers per site |
| **Modern PWA delivery** | SirahMaps is web-based but not a PWA; Heritage Eye and Nusuk are native apps; no competitor offers an installable PWA for heritage | PWA approach enables quick hackathon deployment while providing app-like experience |
| **Bilingual heritage content** | Most platforms offer basic bilingual UI but not bilingual heritage interpretation content | Arabic-primary heritage narratives with English support, designed for both local and international audiences |

### 3.2 Competitive Position Summary

Athar's Smart Interactive Map sits in an unoccupied niche: **a heritage-focused, classification-driven, dual-city (Makkah + Madinah) interactive map**. Competitors either cover the wrong geography (Jeddah, all of Saudi), the wrong purpose (pilgrimage logistics, general tourism), or the wrong depth (surface listings vs. interpretive heritage content). SirahMaps is the closest competitor with genuine heritage depth, but is limited to historical Makkah and the Prophet's era — it does not address broader heritage categories or Madinah.

---

## 4. Novelty Assessment

**Rating: Novel**

**Justification**: While interactive heritage maps exist globally (izi.TRAVEL, Clio, HeritageSpot) and Saudi-specific platforms exist for pilgrimage (Nusuk) and individual cities (Historic Jeddah, SirahMaps), no platform combines:

1. **Dual-city heritage focus** (Makkah + Madinah together)
2. **Heritage-type classification taxonomy** (religious, archaeological, cultural, museum) with filterable overlays
3. **Heritage interpretation depth** (historical overlays, era context, curated narratives) beyond simple POI listings
4. **PWA delivery** for lightweight, installable access

The concept is **novel within its specific domain** (Makkah/Madinah heritage discovery). The underlying technology (interactive maps with filtering) is well-established, but the application to this underserved geographic and thematic niche is genuinely new. SirahMaps demonstrates strong demand for heritage mapping in Makkah specifically, validating the market while leaving the dual-city, multi-category space completely open.

**Risk factor**: The hackathon context (10-12 sites) keeps scope manageable, but post-hackathon scalability to more sites will be needed to maintain differentiation as Saudi Vision 2030 heritage digitization efforts expand.

---

## 5. Key Sources

1. SirahMaps — Interactive Makkah Historical Map: [https://sirahmaps.com/](https://sirahmaps.com/)
2. SirahMaps Membership Pricing: [https://sirahmaps.com/memberships/](https://sirahmaps.com/memberships/)
3. SirahMaps Comparison Map Announcement: [https://sirahmaps.com/by-popular-demand-announcing-the-new-sirahmaps-interactive-comparison-map-of-makkah/](https://sirahmaps.com/by-popular-demand-announcing-the-new-sirahmaps-interactive-comparison-map-of-makkah/)
4. Heritage Eye — Ministry of Culture Portal: [https://heritage-eye.vercel.app/](https://heritage-eye.vercel.app/)
5. Historic Jeddah App — Google Play: [https://play.google.com/store/apps/details?id=sa.ay.jhd](https://play.google.com/store/apps/details?id=sa.ay.jhd)
6. Historic Jeddah App Launch — Saudi Streets: [https://saudistreets.com/2025/04/30/jeddah-launches-innovative-app-to-enhance-visitor-experience-in-historic-district/](https://saudistreets.com/2025/04/30/jeddah-launches-innovative-app-to-enhance-visitor-experience-in-historic-district/)
7. Nusuk App Features — Gulf News: [https://gulfnews.com/world/gulf/saudi/saudi-arabia-nusuk-app-unveils-new-features-to-enhance-pilgrim-experience-in-mecca-and-medina-1.500039691](https://gulfnews.com/world/gulf/saudi/saudi-arabia-nusuk-app-unveils-new-features-to-enhance-pilgrim-experience-in-mecca-and-medina-1.500039691)
8. Nusuk Offline Features: [https://gulfnews.com/world/gulf/saudi/saudi-arabia-offers-free-nusuk-app-access-without-internet-or-data-for-umrah-hajj-pilgrims-1.500226462](https://gulfnews.com/world/gulf/saudi/saudi-arabia-offers-free-nusuk-app-access-without-internet-or-data-for-umrah-hajj-pilgrims-1.500226462)
9. Visit Saudi App — Google Play: [https://play.google.com/store/apps/details?id=sa.gov.apps.sauditourism](https://play.google.com/store/apps/details?id=sa.gov.apps.sauditourism)
10. Visit Saudi Heritage Content: [https://www.visitsaudi.com/en/things-to-do/culture-history](https://www.visitsaudi.com/en/things-to-do/culture-history)
11. izi.TRAVEL Platform: [https://izi.travel/en/app](https://izi.travel/en/app)
12. SmartGuide Platform: [https://www.smartguide.app/](https://www.smartguide.app/)
13. Clio Heritage Discovery App: [https://theclio.com/](https://theclio.com/)
14. HeritageSpot App: [https://play.google.com/store/apps/details?id=com.heritage.spot](https://play.google.com/store/apps/details?id=com.heritage.spot)
15. UNESCO Dive into Heritage: [https://whc.unesco.org/en/dive-into-heritage/](https://whc.unesco.org/en/dive-into-heritage/)
16. Dive into Heritage Launch Announcement: [https://whc.unesco.org/en/news/2803](https://whc.unesco.org/en/news/2803)
17. Pilgrim Map: [https://www.pilgrimmap.com/](https://www.pilgrimmap.com/)
18. Saudi Heritage GIS Research (ScienceDirect): [https://www.sciencedirect.com/org/science/article/pii/S1548392422000143](https://www.sciencedirect.com/org/science/article/pii/S1548392422000143)
19. Leaflet.js Open Source Map Library: [https://leafletjs.com/](https://leafletjs.com/)
20. STQRY Heritage Tour Platform: [https://www.stqry.com/customers/culture-and-heritage-sites](https://www.stqry.com/customers/culture-and-heritage-sites)
21. Heritage Commission (Saudi Ministry of Culture): [https://heritage.moc.gov.sa/en](https://heritage.moc.gov.sa/en)
