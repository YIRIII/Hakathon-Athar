# Phase 0.1: Frontend Prototype (No Backend)

**Generated:** 2026-03-18 | **Source:** idea-forge/athar-heritage-platform | **Tier:** B
**Status:** planned

## Purpose
Build the complete frontend UI with mock/static data so the team can see, navigate, and evaluate the full website experience before connecting any backend services. All data is hardcoded JSON — no Supabase, no APIs, no auth.

## Research Links
- **PRD:** All features (F1-F11) — UI shells only
- **Business Research:** All BR-IDs — informs page layouts and content structure
- **Design System:** Created in Phase 0 step 0.6

## Recommended Tech Stack
- **Framework:** Next.js 14+ App Router (from Phase 0)
- **UI:** shadcn/ui + Tailwind CSS (from Phase 0)
- **i18n:** next-intl (from Phase 0)
- **Data:** Static JSON files in `/src/data/` — no database
- **Maps:** Leaflet + react-leaflet with OpenStreetMap (client-side only)
- **Images:** Placeholder heritage images (Unsplash/public domain)

## Estimated Cost
$0

## Prerequisites
- Phase 0 must be complete (Next.js project, shadcn/ui, bilingual framework, design system, PWA shell)

## Implementation Steps

### Landing / Home Page
- [ ] **0.1.1:** Build hero section — heritage-themed hero with tagline in Arabic + English, "Explore Sites" CTA, atmospheric background image of Makkah/Madinah heritage
- [ ] **0.1.2:** Build featured sites carousel/grid — 4-6 highlighted heritage sites with thumbnail, name (bilingual), type badge, city tag — uses mock JSON data
- [ ] **0.1.3:** Build "How It Works" section — 3-4 step visual flow (Scan QR → Discover Stories → Earn Stamps → Share Certificates)
- [ ] **0.1.4:** Build stats/impact section — visitor count, sites covered, stories told (mock numbers with animated counters)

### Interactive Map Page
- [ ] **0.1.5:** Build full-page map view with Leaflet — all 10-12 mock heritage sites plotted with custom Islamic-themed markers, classified by type (religious/archaeological/cultural/museum)
- [ ] **0.1.6:** Build map sidebar/panel — site list with filters (by city: Makkah/Madinah, by type), search bar, "Near Me" button (mock GPS — shows all sites)
- [ ] **0.1.7:** Build map popup/card on marker click — site thumbnail, name, type, short description, "View Details" button

### Heritage Site Detail Page
- [ ] **0.1.8:** Build site detail page template — hero image, site name (bilingual), type/city badges, layered narrative tabs (Brief 15-30s / Full 1-2min), visitor info panel (hours, location, accessibility)
- [ ] **0.1.9:** Build image gallery component — 3-5 mock images per site with lightbox, respecting photography restriction rules
- [ ] **0.1.10:** Build "Nearby Sites" sidebar — 2-3 related sites with distance badges (mock distances)
- [ ] **0.1.11:** Build "Get Directions" button (non-functional placeholder) and "Scan QR" CTA

### QR Scanner Page
- [ ] **0.1.12:** Build QR scanner UI shell — camera viewport area with heritage-styled scan overlay/frame, "Point camera at QR code" instruction text, mock scan animation
- [ ] **0.1.13:** Build scan result card — mock successful scan showing site name, heritage stamp earned animation, "View Site" button

### AI Chatbot
- [ ] **0.1.14:** Build chatbot UI component — floating chat button (heritage-themed), expandable chat panel, message bubbles (user + AI), Arabic/English input, mock conversation with 3-4 pre-scripted heritage Q&A exchanges
- [ ] **0.1.15:** Build chatbot empty state — welcome message with suggested questions ("Tell me about Cave Hira", "What's the history of Quba Mosque?")

### Heritage Passport Page
- [ ] **0.1.16:** Build passport overview page — visual stamp collection grid (3 earned / 9 locked mock stamps), progress bar "3/12 sites visited", heritage-themed badge/stamp designs
- [ ] **0.1.17:** Build certificate preview — mock generated certificate in Instagram Stories format (1080×1920) with Islamic geometric border, site name, date, "Share" button placeholder

### Profile & Settings
- [ ] **0.1.18:** Build user profile page shell — avatar placeholder, display name, visit stats (mock), language preference toggle, notification preferences (toggles, non-functional)
- [ ] **0.1.19:** Build login/signup page shell — email + social auth buttons (non-functional), heritage-themed auth card

### Global UI Components
- [ ] **0.1.20:** Build responsive navigation — header with logo, nav links (Home, Map, Passport, Chatbot), locale toggle (AR/EN), mobile hamburger menu
- [ ] **0.1.21:** Build footer — links, social icons, PDPL privacy link, Heritage Commission attribution, bilingual
- [ ] **0.1.22:** Build PDPL consent banner UI (from Phase 0.10 — ensure it's styled and visible)
- [ ] **0.1.23:** Create mock data files — `/src/data/sites.json` (10-12 heritage sites with full bilingual content), `/src/data/stamps.json`, `/src/data/chat-messages.json`

### Polish & Review
- [ ] **0.1.24:** Desktop responsiveness pass — ensure all pages look good at 1024px, 1280px, 1440px+ breakpoints
- [ ] **0.1.25:** RTL/LTR verification — switch to Arabic and verify every page renders correctly in RTL
- [ ] **0.1.26:** Dark/light theme verification (if design system includes both modes)

## Mock Data Spec

### sites.json — 10-12 sites with:
```json
{
  "id": "cave-hira",
  "name_ar": "غار حراء",
  "name_en": "Cave Hira",
  "type": "religious",
  "city": "makkah",
  "coordinates": { "lat": 21.4575, "lng": 39.8583 },
  "brief_ar": "...",
  "brief_en": "A cave on Jabal al-Nour where Prophet Muhammad received the first revelation...",
  "full_ar": "...",
  "full_en": "...",
  "images": ["placeholder1.jpg", "placeholder2.jpg"],
  "hours": "Open 24 hours",
  "accessibility": "Steep climb, not wheelchair accessible",
  "stamp_icon": "cave-hira-stamp.svg"
}
```

### Suggested Heritage Sites (Makkah):
1. Cave Hira (غار حراء)
2. Cave Thawr (غار ثور)
3. Makkah Museum (متحف مكة المكرمة)
4. Al-Mualla Cemetery (مقبرة المعلاة)
5. Birthplace of Prophet Muhammad site (موقع مولد النبي)
6. Jabal al-Rahmah (جبل الرحمة)

### Suggested Heritage Sites (Madinah):
7. Quba Mosque (مسجد قباء)
8. Al-Baqi Cemetery (مقبرة البقيع)
9. Uhud Mountain & Martyrs (جبل أحد وشهداء أحد)
10. Qiblatain Mosque (مسجد القبلتين)
11. Madinah Museum / Dar Al Madinah (دار المدينة)
12. Al-Khandaq (Trench) site (موقع الخندق)

## Key Decisions
- All data is static JSON — no API calls, no database, no auth
- Pages are fully navigable with Next.js routing
- Chatbot shows pre-scripted mock conversation, not real AI
- QR scanner shows mock scan animation, not real camera access
- Map is real (Leaflet/OSM) with real coordinates but static site data
- This phase is a **design review checkpoint** — team evaluates UI before backend work begins

## Acceptance Criteria
- All pages render in both Arabic (RTL) and English (LTR)
- Navigation between all pages works
- Map displays all 12 heritage sites at correct coordinates
- Site detail pages show layered narratives (brief/full tabs)
- Heritage passport shows earned vs locked stamps
- Chatbot panel opens/closes with mock conversation
- QR scanner page shows scan overlay UI
- Design system colors/tokens used consistently across all pages
- Desktop layout looks polished at all breakpoints (1024px+)
- No backend calls — app works with `npm run dev` and nothing else
