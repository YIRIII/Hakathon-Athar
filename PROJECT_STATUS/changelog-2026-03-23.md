# Changelog — 2026-03-23: Mobile UX Fixes & Enhancements

## Summary
Major mobile UX bug fix session addressing 9 user-reported issues from field testing on phones. All fixes verified with automated Playwright tests (32/32 pass).

---

## Bug Fixes

### 1. Near Me radius increased (2km → 15km)
- **File:** `src/components/map/heritage-map.tsx`
- **What:** `NEAR_ME_RADIUS_KM` changed from 2 to 15
- **Why:** 2km was too small — users couldn't find nearby sites
- Updated "no nearby sites" message in both AR/EN translations

### 2. Mobile sidebar closes on link tap
- **File:** `src/components/layout/header.tsx`
- **What:** Added controlled `open` state to mobile Sheet, `onClick` handler closes it on navigation
- **Why:** Sidebar stayed open after selecting a page, blocking the UI

### 3. Map page z-index fix (filter/sidebar appearing behind map)
- **Files:** `src/components/map/heritage-map.tsx`, `src/app/globals.css`
- **What:** Added `isolation: isolate` on `.leaflet-container` and map wrapper div
- **Why:** Leaflet tiles use z-index 200-600, overriding Sheet overlay (z-50). Isolation creates a stacking context so Leaflet z-indexes don't escape.

### 4. Map filter Sheet controlled state
- **File:** `src/components/map/heritage-map.tsx`
- **What:** Filter Sheet now uses controlled `open` state, closes when selecting a site
- **Why:** Filter sidebar didn't close after picking a site on mobile

### 5. Map mobile touch fix
- **File:** `src/components/map/map-view.tsx`
- **What:** Added `tap: false` to Leaflet MapContainer
- **Why:** Leaflet's tap handler caused ghost clicks and touch conflicts on mobile

### 6. Map height reduced on mobile
- **Files:** `src/components/map/heritage-map.tsx`, `src/app/[locale]/map/page.tsx`
- **What:** Map height reduced by 4rem on mobile with padding below
- **Why:** Map filled entire screen, no space to scroll or tap outside it

### 7. Chat input bar visibility on mobile
- **File:** `src/app/[locale]/chat/page.tsx`
- **What:** Changed `100vh` → `100dvh` (dynamic viewport height)
- **Why:** Mobile browser chrome (address bar) hid the input bar

### 8. Chat safe-area + overscroll fix
- **File:** `src/components/home/chat-interface.tsx`
- **What:** Added `safe-area-inset-bottom` padding, `overscroll-behavior: contain`, `overflow: hidden` on container
- **Why:** Input bar was hidden on notched phones, page bounced past boundary

### 9. Story sheet scrollable on mobile
- **File:** `src/components/home/storyteller.tsx`
- **What:** Increased sheet from 80dvh → 90dvh, added `-webkit-overflow-scrolling: touch` + `overscroll-contain`
- **Why:** Only 2 lines of story visible, couldn't scroll through full text

### 10. TTS reads markdown literally ("star star")
- **File:** `src/components/home/storyteller.tsx`
- **What:** Added `stripMarkdown()` function that removes `**bold**`, `*italic*`, headings, links before passing text to Web Speech API
- **Why:** Voice was reading "star star name star star" instead of just the name

---

## New Features

### 11. Bigger logo with proper tap target
- **File:** `src/components/layout/header.tsx`
- **What:** Logo text `text-xl` → `text-2xl md:text-3xl`, min 44x44px tap target
- **Why:** Logo was too small to tap reliably on mobile

### 12. Feature highlights section (replaced stats counters)
- **File:** `src/components/home/stats-section.tsx`
- **What:** Replaced animated number counters (12 sites, 18.5M visitors, 48 stories) with 3 feature highlight cards: Explore (Map icon), Collect (Award icon), Learn (MessageCircle icon)
- **Why:** Numbers weren't meaningful for the platform

### 13. About page
- **File:** `src/app/[locale]/about/page.tsx` (new)
- **What:** Professional about page with mission, vision, and 4 feature cards
- **Why:** No "Who are we" page existed, footer links went to homepage

### 14. Expanded footer
- **File:** `src/components/layout/footer.tsx`
- **What:** 4-column footer: Branding, Features (Map/Passport/Chat), About (About/Privacy/Terms), Contact
- **Why:** Footer was minimal with broken links

### 15. Homepage AI chat widget
- **File:** `src/components/home/home-chat-widget.tsx` (new), `src/app/[locale]/page.tsx`
- **What:** Floating "Heritage Guide" chat button on homepage that opens AI assistant in a slide-out panel
- **Why:** AI assistant was only available on site detail pages and the dedicated chat page

---

## Testing Infrastructure

### 16. `/test-athar` skill created
- **Files:** `.claude/skills/test-athar/SKILL.md`, `.claude/skills/test-athar/scripts/test-mobile.py`
- **What:** Automated Playwright test suite for mobile viewport (390x844, iPhone 14). Tests all pages in both AR/EN locales: homepage, map, chat, passport, about, navigation.
- **Usage:** `/test-athar` (full), `/test-athar quick` (smoke test)
- **Result:** 32/32 tests passing

---

## Translation Updates
- **Files:** `messages/ar.json`, `messages/en.json`
- Added: feature highlight keys (exploreTitle/Desc, collectTitle/Desc, learnTitle/Desc)
- Added: about page keys (title, mission, vision, whatWeDo, feature1-4)
- Added: footer keys (termsOfUse, contact, features)
- Updated: noNearbySites message (2km → 15km)
