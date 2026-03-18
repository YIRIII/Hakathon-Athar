# Phase 4: Heritage Passport & Social Sharing

**Generated:** 2026-03-18 | **Source:** idea-forge/athar-heritage-platform | **Tier:** B
**Status:** planned

## Research Links
- **Business Research:** BR-6 (Digital Heritage Passport) — Score 4.20 → [06-digital-heritage-passport.md](../../project_documents/BUSINESS_RESEARCH/06-digital-heritage-passport.md)
- **Technical Options:** TC-4 (Passport & Certificates), TC-7 (Social Sharing) → [04-heritage-passport-certificates.md](../../project_documents/TECHNICAL_OPTIONS/04-heritage-passport-certificates.md), [07-social-sharing-referral.md](../../project_documents/TECHNICAL_OPTIONS/07-social-sharing-referral.md)
- **PRD:** F4 (Digital Heritage Passport), F8 (Social Sharing & Referral)
- **Marketing Strategy:** Certificate sharing is the primary viral growth loop → [README.md](../../project_documents/MARKETING_STRATEGY/README.md)

## Recommended Tech Stack
- **Offline Storage:** Dexie.js (IndexedDB wrapper) for stamp collection
- **Certificate Generation:** Canvas API (client-side, <2s generation)
- **Fallback:** html-to-image for complex certificate layouts
- **Sharing:** Web Share API + react-share + @vercel/og (OG image generation)
- **Sync:** Supabase real-time sync when online
- **Referral Tracking:** UTM parameters tracked in Supabase

## Estimated Cost
$0 cash

## Budget Context
- **Active tier:** Bootstrap
- **Phase cost vs. budget:** $0
- **Sanity check:** PASS

## Prerequisites
- Phase 0 must be complete (Supabase, base UI)
- Phase 2 must be complete (QR scanning triggers stamp earning)
- Phase 1 should be complete (site detail pages for stamp context)

## Implementation Steps
- [ ] **4.1:** Install Dexie.js and create offline stamp collection schema — stamps table with site ID, timestamp, QR scan proof, sync status
- [ ] **4.2:** Build stamp earning logic — auto-earn stamp on QR scan + 30 seconds time-at-site verification (prevents drive-by scanning)
- [ ] **4.3:** Create heritage passport UI — visual collection page showing earned stamps as heritage-themed badges, progress tracker
- [ ] **4.4:** Implement Supabase sync — stamps sync to cloud when online, merge strategy for offline-first conflicts
- [ ] **4.5:** Build certificate generation with Canvas API — Instagram Stories format (1080×1920), heritage-themed design with Islamic geometric borders, site name, date, visitor name
- [ ] **4.6:** Add html-to-image fallback for complex certificate layouts that exceed Canvas API capabilities
- [ ] **4.7:** Implement one-tap social sharing — Web Share API for native share sheet, react-share buttons for specific platforms (Twitter, WhatsApp, Instagram)
- [ ] **4.8:** Set up @vercel/og for rich Open Graph preview images — heritage-branded social cards when certificate links are shared
- [ ] **4.9:** Build referral tracking system — UTM-tagged share links stored in Supabase, bonus stamp awarded for successful referral (friend visits via shared link)
- [ ] **4.10:** Add share analytics — track which certificates get shared, which platforms drive referrals
- [ ] **4.11:** Print-ready certificate — add print button with CSS @media print styling, proper A4/letter layout
- [ ] **4.12:** Certificate background picker — let user choose background image (Haram, Mina, Quba, etc.) for their certificate
- [ ] **4.13:** Certificate mini-map with visited places — embed a small static map showing visited site markers with thumbnail photos of each visited site

## Key Decisions (from research)
- Dexie.js over raw IndexedDB — cleaner API, better query support, reliable offline-first pattern
- Canvas API over server-side generation — instant client-side generation (<2s), no server cost, works offline
- Web Share API over custom share modals — native OS share sheet is familiar, supports more platforms
- Bonus stamp for referral over monetary incentive — aligns with heritage/cultural value, not commercial feel

## Acceptance Criteria
- Stamps auto-earned on QR scan + 30s time-at-site
- Stamp collection persists offline (Dexie.js)
- Stamps sync to Supabase when connectivity returns
- Certificates generate in <2s client-side
- Certificates display in Instagram Stories format (1080×1920)
- Social sharing works via Web Share API and direct platform buttons
- Referral links tracked with UTM parameters
- Bonus stamp awarded for successful referral

## Competitive Context
- Zero digital passport/certificate competitors in Saudi heritage
- Western gamification (badges, leaderboards) clashes with sacred context — Athar uses dignified "heritage passport" framing
- Certificate sharing is the primary viral growth loop identified in marketing strategy

## Research Gaps
- No PRICING_STRATEGY: Passport assumed free, unlimited certificates. Premium could gate certificate customization — decision deferred.
- No CUSTOMER_VALIDATION: Assumption that pilgrims want shareable certificates not validated with primary research
