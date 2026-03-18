# Google Maps / Navigation Integration

**Linked BRD Requirement**: BR-7
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 7
**Priority (BRD)**: Should Have

---

## 1. Feature Context

BR-7 specifies directions to heritage sites from the user's current location, removing friction from discovery to visit by leveraging existing navigation behavior. In the Athar PWA, when a user discovers a heritage site on the interactive map or through curated content, they should be able to tap "Navigate" and receive turn-by-turn directions — either in-app via an embedded map or by handing off to Google Maps / Apple Maps. This bridges the gap between digital discovery and physical visitation, which is critical for a heritage tourism app where users are often in unfamiliar cities (Makkah and Madinah attract millions of international visitors annually for Hajj and Umrah). Without seamless navigation, users must manually copy addresses or search separately, creating friction that reduces site visitation rates.

## 2. Competitive Landscape

### Direct Competitors

| Competitor | Product | What They Do | Target Audience | Pricing | Strengths | Weaknesses |
|-----------|---------|-------------|-----------------|---------|-----------|------------|
| **Google Maps** | Google Maps (Web/App) | General-purpose mapping with directions to any POI, including heritage sites if searched by name. Walking, driving, transit directions. | General public worldwide | Free (ad-supported) | Ubiquitous, excellent routing engine, real-time traffic, Street View, high map accuracy in Saudi cities | No heritage classification or curation — users must know what to search for; no cultural context, no heritage trails, no storytelling layer |
| **Apple Maps** | Apple Maps (iOS) | Turn-by-turn navigation to searched locations. Includes some curated city guides. | iOS users | Free (bundled) | Smooth iOS integration, privacy-focused, improving Saudi coverage | No heritage-specific data, limited Saudi POI curation, no heritage classification |
| **Waze** | Waze (Web/App) | Community-driven navigation focused on driving efficiency (traffic, road hazards) | Drivers | Free (ad-supported) | Real-time traffic alerts, strong community reporting in Saudi Arabia | Driving-only (no walking), zero heritage/tourism content, purely utilitarian |
| **Nusuk** | Nusuk App (Saudi Ministry of Hajj) | Official pilgrimage companion — interactive maps of Makkah/Madinah, transport booking, ritual guidance. Offline maps available. | Hajj & Umrah pilgrims | Free (government) | Official data, offline capability, covers Haram areas, AI assistant, multi-language, transport booking (taxis, Haramain train) | Focused exclusively on pilgrimage rituals and logistics — no heritage site discovery, no navigation to historical/cultural landmarks outside Haram perimeter |
| **Visit Saudi** | Visit Saudi App (STA) | National tourism app with interactive map, heritage site listings, event calendar, dining, and accommodations across all Saudi cities | Tourists (domestic & international) | Free (government) | Comprehensive national coverage, verified opening times, curated heritage listings, official backing | Map shows locations but provides no integrated navigation/directions — users must switch to a separate navigation app; no heritage trails or walking routes; broad national scope means limited depth for Makkah/Madinah heritage |
| **Historic Jeddah** | Historic Jeddah App (Ministry of Culture) | Interactive map of Al Balad district with heritage landmarks, route planning, parking/bus info, virtual tours, multilingual content | Visitors to Jeddah's historic district | Free (government) | Deep heritage content for one district, route planning, parking integration, verified historical sources, virtual tours | Limited to Jeddah only — no coverage of Makkah or Madinah; route planning is basic (shows routes, not full turn-by-turn navigation); single-district scope |

### Adjacent / Partial Solutions

| Solution | How It Partially Addresses This Need | Gap Remaining |
|----------|--------------------------------------|--------------|
| **Al Maqsad** (Grand Mosque indoor navigation) | BLE-based indoor navigation within Masjid Al-Haram — turn-by-turn directions to gates, facilities, prayer areas | Indoor-only (Haram complex); no outdoor heritage site navigation; no heritage content beyond mosque facilities |
| **Seerab Hajj Maps** | Interactive maps of Hajj sites (Mina, Arafat) with facility locations and camp navigation | Covers ritual sites only; no heritage/cultural site mapping; pilgrimage logistics focus |
| **Ka'bah Map** | Pilgrimage-focused app with maps and ritual guidance for Hajj/Umrah | No navigation integration; informational only; no heritage site coverage |
| **STQRY** (Tour Guide Platform) | White-label platform for heritage/museum apps with Mapbox-powered turn-by-turn navigation, location-triggered audio, self-guided tours | B2B platform ($495+/yr), not consumer-facing; no Saudi Arabia heritage content; requires institution to build and populate content; general-purpose, not Makkah/Madinah-specific |
| **Roadtrippers** | Road trip planner with historical site discovery and in-app navigation (US/Western focus) | US-centric content; no Saudi/MENA coverage; no walking navigation; subscription-based ($29.99/yr); no heritage depth |
| **Locatify** | Museum/heritage tour app platform with GPS-based navigation and audio guides | B2B platform; no Saudi content; requires institutional adoption; indoor-focused |
| **Triposo** | Travel guide with offline maps, historical site info, and customized itineraries | No integrated navigation — links out to external maps; generic content, not heritage-curated for Saudi |
| **Saudi Official Smart Maps** (Haramain) | Real-time interactive wayfinding maps at Grand Mosque and Prophet's Mosque with route updates | Fixed installation (in-mosque screens/systems); not a portable app for outdoor heritage navigation; covers only the Two Holy Mosques |

### Open-Source / Academic Approaches

| Project / Paper | Description | Maturity | Limitations |
|----------------|-------------|----------|-------------|
| **Leaflet + Leaflet Routing Machine** | Open-source JavaScript mapping library with routing plugin. Supports OpenStreetMap tiles, multiple routing backends (OSRM, GraphHopper, Mapbox) | Production-ready | Requires custom POI data layer; no heritage content included; routing quality depends on backend; needs integration work |
| **OSRM (Open Source Routing Machine)** | High-performance routing engine for OpenStreetMap data. Supports car, bicycle, walking profiles | Production-ready | No heritage layer; raw routing only — no POI discovery; requires hosting or API service |
| **Mapbox Navigation SDK** | Navigation SDK with turn-by-turn directions, used by STQRY and others. Available for web, iOS, Android | Production-ready | Pay-as-you-go pricing (free tier: 50K requests/month); no heritage content; requires integration |
| **OpenTripPlanner** | Open-source multimodal trip planner combining transit, walking, cycling with POI routing | Production-ready | Complex deployment; primarily transit-focused; no heritage curation; limited MENA transit data |
| **pwa-maps (GitHub)** | Demonstration of offline-capable PWA maps using OpenMapTiles and service workers | Prototype | Demo-level only; no routing; no heritage layer; proof of concept for offline tile caching |

## 3. Gap Analysis

A clear gap exists at the intersection of **heritage content curation** and **integrated navigation** for Makkah and Madinah specifically:

1. **General navigation apps** (Google Maps, Apple Maps, Waze) provide excellent routing but zero heritage discovery — users must already know what they're looking for. There is no "show me heritage sites near me and navigate there" workflow.

2. **Pilgrimage apps** (Nusuk, Al Maqsad, Seerab, Ka'bah Map) cover Hajj/Umrah logistics and mosque wayfinding but completely ignore the broader heritage landscape — historic neighborhoods, Ottoman-era buildings, traditional markets, archaeological sites.

3. **Saudi tourism apps** (Visit Saudi) list heritage sites nationally but lack integrated navigation — users see a pin on a map and must manually switch to Google Maps. The Historic Jeddah app comes closest with route planning for heritage sites, but it covers only Jeddah's Al Balad district, not Makkah or Madinah.

4. **Tour guide platforms** (STQRY, Locatify, Roadtrippers) offer heritage + navigation combinations but are B2B platforms requiring institutional clients, or are geographically focused on Western markets. None have Makkah/Madinah heritage content.

5. **Geographic gap**: No existing app provides heritage-curated navigation for Makkah and Madinah — the two holiest cities in Islam that receive 15-20+ million visitors annually. The Historic Jeddah app proves the Saudi government values this approach, but coverage stops at Jeddah.

6. **Integration gap**: The workflow of "discover heritage site → learn about it → navigate there" in a single app does not exist for the Makkah/Madinah context. Users currently must: (a) find a site via web search or word-of-mouth, (b) search for it in Google Maps, (c) navigate. Athar would collapse this to: (a) browse curated heritage map → (b) tap "Navigate."

## 4. Novelty Assessment

**Rating**: `novel`

**Rationale**: While navigation technology itself is mature and commoditized (Google Maps API, Leaflet, Mapbox), the combination of heritage-curated discovery + integrated navigation for Makkah and Madinah has zero direct competitors. No existing app provides a "discover and navigate to heritage sites" experience in these cities. The closest analog — Historic Jeddah — validates the concept but covers a different city. Pilgrimage apps ignore heritage; tourism apps lack navigation; navigation apps lack heritage. Athar's navigation integration is novel not because of the routing technology, but because of the context layer it navigates *to*: classified, curated heritage sites in the two holiest cities. The 15-20M+ annual visitor base that already has navigation apps installed (Google Maps) but no heritage discovery layer makes this a high-impact integration.

## 5. Key Sources

1. Visit Saudi App — Google Play listing. https://play.google.com/store/apps/details?id=sa.gov.apps.sauditourism&hl=en — Accessed 2026-03-18
2. Visit Saudi App — Apple App Store listing. https://apps.apple.com/us/app/visit-saudi/id818179871 — Accessed 2026-03-18
3. "Smart applications transform visitor experience and accelerate digital transformation in Saudi tourism" — Saudi Gazette, 2025. https://saudigazette.com.sa/article/652722 — Accessed 2026-03-18
4. Nusuk App — Google Play listing. https://play.google.com/store/apps/details?id=com.moh.nusukapp&hl=en_US — Accessed 2026-03-18
5. "Nusuk App: Your Trusted Digital Companion for Hajj and Umrah 2025" — Darussalam. https://edarussalam.com/nusuk-app-your-trusted-digital-companion-for-hajj-and-umrah-2025/ — Accessed 2026-03-18
6. "Umrah, Hajj made easier: Nusuk App now works without internet" — Gulf Business. https://gulfbusiness.com/umrah-hajj-nusuk-app-now-works-without-internet/ — Accessed 2026-03-18
7. "Historic Jeddah App: A Smart Cultural Experience That Enhances Interaction with Heritage" — Saudi Press Agency. https://spa.gov.sa/en/N2322298 — Accessed 2026-03-18
8. "Unlock Al Balad's secrets with the new Historic Jeddah app" — TimeOut Jeddah. https://www.timeoutjeddah.com/travel/historic-jeddah-app — Accessed 2026-03-18
9. "App launched for Jeddah Historic District visitors" — Arab News. https://www.arabnews.com/node/2598917/saudi-arabia — Accessed 2026-03-18
10. Al Maqsad App — Apple App Store listing. https://apps.apple.com/us/app/al-maqsad/id1447123573 — Accessed 2026-03-18
11. "A Free Grand Mosque Navigation App For Pilgrims" — Islam Hashtag. https://islamhashtag.com/grand-mosque-navigation-app/ — Accessed 2026-03-18
12. "What is Al-Maqsad Application?" — Saudipedia. https://saudipedia.com/en/article/3710/religion/what-is-al-maqsad-application — Accessed 2026-03-18
13. STQRY — "Step-by-Step Guide to Adding In-App Navigation with Mapbox." https://support.stqry.com/support/solutions/articles/153000142604 — Accessed 2026-03-18
14. STQRY — "3 Navigation Styles for Better Self-Guided Tours." https://www.stqry.com/blog/three-navigation-styles-that-elevate-self/ — Accessed 2026-03-18
15. Seerab Hajj Maps. https://hajjmaps.seerab.com/ — Accessed 2026-03-18
16. Ka'bah Map. https://kabahmap.nifhanif.com/ — Accessed 2026-03-18
17. Leaflet Routing Machine — Basic Usage Tutorial. https://www.liedman.net/leaflet-routing-machine/tutorials/basic-usage/ — Accessed 2026-03-18
18. Leaflet — Open-source JavaScript library for interactive maps. https://leafletjs.com/ — Accessed 2026-03-18
19. Roadtrippers App Review — Cruise America. https://www.cruiseamerica.com/trip-inspiration/everything-about-the-roadtrippers-app — Accessed 2026-03-18
20. "Essential Mobile Apps for Umrah Pilgrims" — Halal Travel Pal. https://halaltravelpal.com/essential-mobile-apps-for-umrah-pilgrims/ — Accessed 2026-03-18
21. "Heritage meets high-tech: Saudi Arabia's bold vision for smart tourism" — Arab News. https://www.arabnews.com/node/2601858 — Accessed 2026-03-18
22. Google Maps Directions API documentation. https://developers.google.com/maps/documentation/directions/overview — Accessed 2026-03-18
