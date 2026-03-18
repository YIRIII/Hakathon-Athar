# Phase 1: Smart Map & Heritage Content

**Generated:** 2026-03-18 | **Source:** idea-forge/athar-heritage-platform | **Tier:** B
**Status:** planned

## Research Links
- **Business Research:** BR-1 (Smart Map), BR-2 (Detail Pages), BR-8 (Nearby Discovery) → [BUSINESS_RESEARCH/](../../project_documents/BUSINESS_RESEARCH/README.md)
- **Technical Options:** TC-1 (Interactive Map), TC-8 (Content Delivery) → [01-smart-interactive-map.md](../../project_documents/TECHNICAL_OPTIONS/01-smart-interactive-map.md), [08-heritage-content-delivery.md](../../project_documents/TECHNICAL_OPTIONS/08-heritage-content-delivery.md)
- **PRD:** F1 (Smart Interactive Map), F6 (Heritage Site Detail Pages)

## Recommended Tech Stack
- **Map:** Leaflet + react-leaflet + OpenStreetMap tiles with Arabic labels
- **Content:** Next.js Image (sharp) + WebP/AVIF optimization + react-markdown for narratives
- **Offline:** Service worker cache for visited site content
- **GPS:** Browser Geolocation API (2km radius "Near Me")

## Estimated Cost
$0 cash (all open-source)

## Budget Context
- **Active tier:** Bootstrap
- **Phase cost vs. budget:** $0
- **Sanity check:** PASS

## Prerequisites
- Phase 0 must be complete (Next.js app, Supabase, bilingual framework, heritage data seeded)

## Implementation Steps
- [ ] **1.1:** Install Leaflet + react-leaflet and create base map component with OpenStreetMap Arabic tiles
- [ ] **1.2:** Build heritage site marker system — custom branded markers classified by type (religious/archaeological/cultural/museum) and filterable by city (Makkah/Madinah)
- [ ] **1.3:** Implement GPS "Near Me" feature — browser Geolocation API with 2km radius, permission handling, fallback for denied permissions
- [ ] **1.4:** Create heritage site detail page template — layered micro-narratives (brief 15-30s + expanded 1-2min), bilingual, third-person scholarly voice
- [ ] **1.5:** Build image gallery for site pages — Next.js Image with WebP/AVIF, lazy loading, respect photography restrictions (no Masjid al-Haram/an-Nabawi interior photos)
- [ ] **1.6:** Implement visitor info section — hours, location, accessibility notes, "Get Directions" placeholder
- [ ] **1.7:** Add offline caching for visited sites — service worker caches site detail pages after first visit
- [ ] **1.8:** Build nearby sites discovery — contextual recommendations on site detail pages showing related sites within walking distance
- [ ] **1.9:** Map interaction polish — 60fps pan/zoom, cluster markers at zoom-out, responsive map sizing
- [ ] **1.10:** Site detail page background image — replace white page background with a blurred/dimmed hero image of the heritage site, creating an immersive feel

## Key Decisions (from research)
- Leaflet over Google Maps / Mapbox — $0 cost, no API keys, OpenStreetMap has good MENA coverage, Arabic label tiles available
- Layered narratives over single long text — matches tourist attention spans (15-30s quick scan, 1-2min deep read)
- Client-side GPS over server-side geofencing — simpler, no backend cost, works offline after initial load

## Acceptance Criteria
- Map displays 10-12 heritage sites with correct coordinates and classifications
- Markers filterable by type and city
- GPS "Near Me" shows sites within 2km radius
- Site detail pages render bilingual content with image galleries
- Map maintains 60fps pan/zoom on mid-range mobile
- Visited sites accessible offline
- Photography restriction rules enforced (no restricted imagery)

## Competitive Context
- No heritage-classified interactive map covers both Makkah and Madinah with unified discovery (BR-1)
- Zero heritage-specific GPS discovery with narrative connections exists for MENA region (BR-8)
- No platform combines layered scholarly narratives with visitor logistics for both holy cities (BR-2)

## Research Gaps
- No PRICING_STRATEGY: Map features assumed free tier (Hero priority). Nearby discovery could be premium — decision deferred.
- No CONSTRAINT_VALIDATION: Leaflet performance with 50+ markers on mobile not formally tested
