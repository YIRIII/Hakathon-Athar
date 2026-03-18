# Phase 6: Supporting Systems & Infrastructure

**Generated:** 2026-03-18 | **Source:** idea-forge/athar-heritage-platform | **Tier:** B
**Status:** planned

## Research Links
- **Supporting Systems:** [README.md](../../project_documents/SUPPORTING_SYSTEMS/README.md)
- **Technical Options:** TC-9 (Navigation), TC-10 (Push Notifications) → [TECHNICAL_OPTIONS/](../../project_documents/TECHNICAL_OPTIONS/README.md)
- **PRD:** F9 (Navigation Integration), F10 (Push Notifications)

## Recommended Tech Stack
- **Monitoring:** Sentry Free (error tracking) + Langfuse Free (LLM tracing)
- **Analytics:** Umami Cloud (privacy-first, cookie-less)
- **Navigation:** Platform-aware deep links (Google Maps/Apple Maps/Waze)
- **Push:** Firebase Cloud Messaging (free, unlimited)

## Estimated Cost
$0 cash (all free tiers)

## Budget Context
- **Active tier:** Bootstrap
- **Phase cost vs. budget:** $0
- **Sanity check:** PASS

## Prerequisites
- Phase 0 must be complete (base deployment)
- Phase 3 should be complete (Langfuse tracing needs chatbot)
- Phase 1 should be complete (navigation needs site coordinates)

## Implementation Steps
- [ ] **6.1:** Set up Sentry error tracking — install @sentry/nextjs, configure source maps, set up error boundaries
- [ ] **6.2:** Configure Langfuse LLM tracing — connect to chatbot API routes, track token usage, latency, hallucination patterns
- [ ] **6.3:** Set up Umami analytics — install tracking script, create custom events for QR scans, chatbot conversations, stamp earning, certificate sharing
- [ ] **6.4:** Build analytics dashboard page — display key metrics: QR scan counts, chatbot usage, engagement time, popular sites (matches BR-11 requirements)
- [ ] **6.5:** Implement navigation integration — "Get Directions" button on site detail pages with platform-aware deep links (Google Maps on Android, Apple Maps on iOS, Waze option)
- [ ] **6.6:** Set up Firebase Cloud Messaging — FCM project, service worker integration with Serwist, notification permission request UX
- [ ] **6.7:** Build notification types — nearby site alerts (GPS-triggered), new content notifications, heritage challenge invitations
- [ ] **6.8:** Create notification preferences page — user controls for each notification type, respect PDPL consent

## Key Decisions (from research)
- Sentry over LogRocket/Datadog — free tier generous enough for MVP, better Next.js integration
- Umami over Google Analytics — privacy-first (PDPL compliant), no cookies, self-hostable
- Platform-aware deep links over embedded Google Maps — no API keys, no cost, works universally
- FCM over OneSignal — free unlimited notifications, good PWA support

## Acceptance Criteria
- Sentry captures errors with source maps and breadcrumbs
- Langfuse traces all LLM calls with latency and token metrics
- Umami tracks key events without cookies (PDPL compliant)
- Navigation deep links detect platform (iOS/Android/desktop) and open correct maps app
- Push notifications delivered on supported browsers
- Notification preferences saved per-user with PDPL consent

## Research Gaps
- No RISK_ASSESSMENT: Push notification permission fatigue risk not assessed
- No PRICING_STRATEGY: Analytics dashboard placement (free vs premium/B2B) not determined
