# PRD: Athar (أثر) — Interactive Heritage Discovery Platform

**Version**: 1.0
**Date**: 2026-03-18
**Status**: Complete
**Author**: Idea Forge (AI-Generated)
**BRD Reference**: [BRD.md](BRD.md)
**Technical Options Analysis**: [TECHNICAL_OPTIONS/](TECHNICAL_OPTIONS/README.md)
**Business Research**: [BUSINESS_RESEARCH/](BUSINESS_RESEARCH/README.md)
**Supporting Systems**: [SUPPORTING_SYSTEMS/](SUPPORTING_SYSTEMS/README.md)
**Marketing Strategy**: [MARKETING_STRATEGY/](MARKETING_STRATEGY/README.md)
**Domain Research**: [DOMAIN_RESEARCH/](DOMAIN_RESEARCH/README.md)

---

## 1. Product Overview

Athar (أثر) is a Progressive Web App (PWA) that transforms the heritage site visitor experience in Makkah and Madinah. Visitors scan a QR code at any heritage site and instantly access an interactive heritage discovery platform — no app download required. The platform combines a smart classified map of 10-12 heritage sites, AI-powered heritage Q&A chatbot, on-site QR-triggered stories, and a digital heritage passport with shareable certificates.

The product targets 37.5M+ combined annual visitors to Makkah and Madinah, filling a complete market vacuum — no competitor offers a unified digital heritage discovery platform for both holy cities. Athar enters through a hackathon competition (Hackathon for Historical and Enrichment Sites, 3rd Edition) organized by the Ministry of Hajj & Umrah and Umm Al-Qura University, with the goal of winning the competition and scaling into an official heritage engagement layer.

The entire MVP runs at **$0 cash cost** using open-source libraries and cloud service free tiers, making it viable for a bootstrapped 4-person student team.

---

## 2. Goals & Success Metrics

| ID | Goal | Metric | Target | Linked BRD Objective |
|----|------|--------|--------|----------------------|
| G-1 | Win the hackathon competition | Competition placement | Win or top-3 | BO-1 |
| G-2 | Launch PWA with complete heritage site coverage | Sites with full content profiles | 10-12 sites | BO-2 |
| G-3 | Achieve user adoption via QR-first distribution | Monthly active users | 5,000+ MAU by Month 6 | BO-3 |
| G-4 | Secure government partnership | Heritage Commission LOI | 1+ signed partnership | BO-4 |
| G-5 | Generate sustainable revenue | Monthly recurring revenue | $2,000+ MRR by Month 12 | BO-5 |
| G-6 | Drive viral growth through certificate sharing | Certificate social shares per month | 100+ shares/month by Month 6 | Marketing Strategy |
| G-7 | Achieve target conversion rate | Free → Premium conversion | 3%+ by Month 12 | BRD §8 |

---

## 3. User Stories

### Epic 1: Heritage Discovery & Navigation

| ID | User Story | Priority | Acceptance Criteria | Linked BR |
|----|-----------|----------|---------------------|-----------|
| US-1.1 | As a pilgrim, I want to see all heritage sites on an interactive map so that I can discover sites I didn't know existed | Must Have | Map displays 10-12 sites with correct coordinates; sites classified by type (religious/archaeological/cultural/museum) and city (Makkah/Madinah); map supports pinch-zoom and pan on mobile | BR-1 |
| US-1.2 | As a tourist, I want to filter heritage sites by type and city so that I can find sites matching my interests | Must Have | Filter controls for site type and city; filtered results update map markers in real-time; filter state persists during session | BR-1 |
| US-1.3 | As a visitor near a heritage site, I want to discover nearby sites so that I can visit more during my trip | Should Have | GPS-based nearby discovery shows sites within 2km; distance displayed for each nearby site; sorted by proximity | BR-8 |
| US-1.4 | As a visitor, I want to get directions to a heritage site so that I can navigate there easily | Should Have | "Get Directions" button opens Google Maps/Apple Maps/Waze with correct destination coordinates | BR-7 |

### Epic 2: QR Code Heritage Experience

| ID | User Story | Priority | Acceptance Criteria | Linked BR |
|----|-----------|----------|---------------------|-----------|
| US-2.1 | As a visitor at a heritage site, I want to scan a QR code and instantly access the site's story so that I learn about its history without downloading an app | Must Have | QR scan opens PWA with site overview page in <3 seconds; no app download required; works on iOS Safari and Android Chrome | BR-3 |
| US-2.2 | As a visitor exploring a site, I want to scan section-specific QR codes so that I get stories about each area I'm standing in | Must Have | Internal QR codes link to section-specific narrative pages; each section has brief (15-30s) and expanded (1-2min) layers | BR-3, BR-2 |
| US-2.3 | As a site administrator, I want to generate branded QR codes for heritage sites so that they match the platform's visual identity | Must Have | QR codes generated with heritage branding (colors, logo); print-quality output (300+ DPI); supports error correction for outdoor conditions | BR-3 |

### Epic 3: AI Heritage Guide

| ID | User Story | Priority | Acceptance Criteria | Linked BR |
|----|-----------|----------|---------------------|-----------|
| US-3.1 | As a visitor, I want to ask questions about the heritage site I'm at so that I get accurate historical information | Must Have | Text chatbot responds to heritage questions using RAG-grounded content; responses are historically accurate and culturally appropriate; no hallucinated facts about religious content | BR-4 |
| US-3.2 | As an international pilgrim, I want to chat in my preferred language so that I can learn about heritage in a language I understand | Must Have | Chatbot supports Arabic and English; Islamic terminology preserved in transliteration across languages | BR-4, BR-5 |
| US-3.3 | As a visitor exploring Makkah, I want personalized site recommendations based on my interests so that I make the most of my limited time | Must Have | Chatbot asks about preferences (type of sites, available time, interests) and recommends specific sites; recommendations based on proximity and user interests | BR-4 |
| US-3.4 | As an older pilgrim, I want to speak to the heritage guide instead of typing so that I can interact naturally | Nice to Have | Voice input (STT) and voice output (TTS) in Arabic and English; handles Islamic terminology in speech recognition; fallback to text if voice fails | BR-9 |

### Epic 4: Digital Heritage Passport & Gamification

| ID | User Story | Priority | Acceptance Criteria | Linked BR |
|----|-----------|----------|---------------------|-----------|
| US-4.1 | As a visitor, I want to earn stamps for each heritage site I visit so that I have a digital record of my heritage journey | Should Have | Stamp earned when QR scanned + minimum time spent at site; stamps persist across sessions (offline-first with Dexie.js, synced to Supabase when online); stamp collection visible in heritage passport view | BR-6 |
| US-4.2 | As a visitor who completed visiting multiple sites, I want to generate a shareable heritage certificate so that I can share my achievement on social media | Should Have | Certificate generated client-side via Canvas API; includes visitor name, sites visited, date, heritage branding; optimized dimensions for Instagram Stories (1080×1920) and WhatsApp | BR-6 |
| US-4.3 | As a visitor, I want to share my certificate directly to WhatsApp, Instagram, or Twitter so that my friends discover Athar | Should Have | Web Share API for native sharing; react-share fallback buttons for platforms; Open Graph meta tags for rich link previews when certificate URL is shared | BR-6, Marketing |

### Epic 5: Content & Bilingual Experience

| ID | User Story | Priority | Acceptance Criteria | Linked BR |
|----|-----------|----------|---------------------|-----------|
| US-5.1 | As a visitor, I want to read detailed historical narratives about each heritage site so that I understand its significance | Must Have | Each site has layered micro-narratives: brief (15-30s read) and expanded (1-2min); scholarly third-person voice with curiosity hooks; images and visitor info (hours, location, accessibility) | BR-2 |
| US-5.2 | As an Arabic speaker, I want the interface in Arabic (RTL) so that I can use it naturally | Must Have | Full Arabic RTL interface as primary language; all UI elements, navigation, and content in Arabic; proper Arabic typography and calligraphy rendering | BR-5 |
| US-5.3 | As an English-speaking pilgrim, I want to switch to English so that I can navigate the platform in my language | Must Have | Language toggle between Arabic and English; Islamic terms preserved in transliteration (e.g., "Masjid al-Qiblatain" not "Mosque of the Two Qiblas"); instant switching without page reload | BR-5 |

---

## 4. Feature Specifications

### Feature 1: Smart Interactive Map (Hero)

- **Description**: Full-screen interactive map displaying all heritage sites in Makkah and Madinah, classified by type (religious, archaeological, cultural, museum) with custom heritage markers, clustering, filtering, and GPS-based nearby discovery.
- **Linked User Stories**: US-1.1, US-1.2, US-1.3
- **Linked Business Requirements**: BR-1, BR-8
- **Priority**: Must Have
- **Business Tier**: Hero (score 4.65)
- **Technical Approach**: Leaflet + react-leaflet with OpenStreetMap tiles. Heritage site data stored as JSON in Git. Custom marker icons per site type. Haversine formula for nearby site distance calculation. Leaflet.markercluster for marker grouping at low zoom levels.
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/01-smart-interactive-map.md) — 11 options evaluated
- **Acceptance Criteria**:
  - [ ] Map renders 10-12 heritage sites with correct GPS coordinates
  - [ ] Sites filterable by type (4 categories) and city (Makkah/Madinah)
  - [ ] Custom heritage-branded marker icons differentiate site types
  - [ ] Tapping a marker shows site name, type, brief description, and "View Details" link
  - [ ] GPS-based "Near Me" shows sites within 2km sorted by distance
  - [ ] Map performs smoothly on mid-range mobile devices (60fps pan/zoom)
  - [ ] Arabic labels visible on map tiles (OpenStreetMap has Arabic for Saudi Arabia)

### Feature 2: QR Code System (Hero)

- **Description**: Dual-layer QR code system — entry QR codes at each heritage site (site overview) and internal QR codes within sites (section-specific stories). QR codes are branded with heritage styling and print-ready. Scanning opens the PWA instantly.
- **Linked User Stories**: US-2.1, US-2.2, US-2.3
- **Linked Business Requirements**: BR-3
- **Priority**: Must Have
- **Business Tier**: Hero (score 4.90 — highest)
- **Technical Approach**: **Generation**: qr-code-styling for branded QR codes with heritage colors, logo embedding, and custom corner styles. Supports SVG/PNG/canvas output at 300+ DPI. **Scanning**: qr-scanner (Nimiq) for in-browser camera-based scanning. Primary flow: native camera app scans QR URL → opens PWA (works on all devices). Secondary: in-app scanner for re-scanning within the PWA.
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/02-qr-code-system.md) — 14 options evaluated
- **Acceptance Criteria**:
  - [ ] QR codes generated for 10-12 sites × 3-5 internal points each (30-60 codes total)
  - [ ] QR codes include heritage branding (colors, logo, custom corners)
  - [ ] QR codes output at 300+ DPI for print quality
  - [ ] Scanning a QR code opens the correct PWA page in <3 seconds
  - [ ] Works via native camera app on iOS Safari and Android Chrome
  - [ ] In-app scanner detects QR codes in <500ms under normal lighting
  - [ ] Error correction level H (30%) for outdoor/weathered conditions

### Feature 3: AI Heritage Chatbot (Depth)

- **Description**: Text-based AI chatbot that answers heritage questions, provides personalized site recommendations, and serves as a conversational guide. Uses Hybrid Dialogue + RAG architecture — scripted flows for critical religious content with LLM flexibility for exploratory questions. Guardrails prevent hallucination and sacred character impersonation.
- **Linked User Stories**: US-3.1, US-3.2, US-3.3
- **Linked Business Requirements**: BR-4
- **Priority**: Must Have
- **Business Tier**: Depth (score 4.60)
- **Pricing Tier**: Free (3 questions/site visit), Premium (unlimited)
- **Technical Approach**: **LLM**: Gemini 2.5 Flash-Lite via Vercel AI SDK (enables 1-line provider swap to GPT-4.1/Claude if Arabic quality insufficient). **RAG Framework**: Vercel AI SDK with custom retrieval pipeline. **Vector DB**: Supabase pgvector (reuses existing Supabase instance). **Embeddings**: Gemini text-embedding-001. Heritage content (30-60 micro-narratives) embedded as vectors; chatbot retrieves relevant content before generating responses. Guardrails: system prompt blocks sacred character impersonation, requires source attribution, flags uncertain claims.
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/03-ai-heritage-chatbot.md) — 25 options evaluated across 4 sub-components
- **Acceptance Criteria**:
  - [ ] Chatbot answers heritage questions with RAG-grounded responses
  - [ ] Responses cite source heritage narratives (not hallucinated)
  - [ ] System prompt prevents speaking as prophets/companions (hard constraint)
  - [ ] Islamic terminology preserved in transliteration across Arabic/English
  - [ ] Personalized site recommendations based on user preferences
  - [ ] Response time <5 seconds (fits Vercel serverless timeout)
  - [ ] Streaming responses for conversational feel
  - [ ] Free tier: 3 questions per site visit; Premium: unlimited
  - [ ] Langfuse integration for conversation tracing and hallucination monitoring

### Feature 4: Digital Heritage Passport & Certificates (Depth)

- **Description**: Gamification system where visitors earn digital stamps by visiting heritage sites (QR scan + minimum time spent). Stamps accumulate in a personal heritage passport. Visitors who collect multiple stamps can generate shareable heritage certificates for social media.
- **Linked User Stories**: US-4.1, US-4.2, US-4.3
- **Linked Business Requirements**: BR-6
- **Priority**: Should Have
- **Business Tier**: Depth (score 4.20)
- **Pricing Tier**: Free (basic stamps), Premium (personalized/downloadable certificates)
- **Technical Approach**: **Progress Tracking**: Dexie.js (IndexedDB wrapper) for offline-first stamp storage, synced to Supabase when online. Stamp earned when QR scanned + 30+ seconds spent on site page. **Certificate Generation**: Native Canvas API for client-side image generation — heritage-branded certificates with visitor name, sites visited, date, Islamic values framing (ilm/rihla/itqan). html-to-image as fallback for complex Arabic calligraphy. **Social Sharing**: Web Share API (native) + react-share (fallback buttons) + @vercel/og for Open Graph preview images.
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/04-heritage-passport-certificates.md) — 16 options evaluated
- **Acceptance Criteria**:
  - [ ] Stamps earned automatically on QR scan + 30s time at site
  - [ ] Stamps persist offline (Dexie.js/IndexedDB) and sync to Supabase when online
  - [ ] Heritage passport view shows all earned stamps with site names and dates
  - [ ] Certificate generated client-side in <2 seconds
  - [ ] Certificate dimensions optimized for Instagram Stories (1080×1920)
  - [ ] Arabic calligraphy renders correctly on certificates
  - [ ] One-tap sharing to WhatsApp, Instagram, Twitter via Web Share API
  - [ ] Shared certificate URLs show rich Open Graph previews

### Feature 5: Voice AI Guide (Depth — Phase 2)

- **Description**: Voice-enabled interaction with the AI heritage chatbot. Visitors speak questions in Arabic or English and hear spoken heritage responses. Enhances accessibility for older pilgrims (75% aged 35-64) and visitors uncomfortable with typing.
- **Linked User Stories**: US-3.4
- **Linked Business Requirements**: BR-9
- **Priority**: Nice to Have (Phase 2)
- **Business Tier**: Depth (score 4.00)
- **Technical Approach**: **STT**: Deepgram Nova-3 (best Arabic accuracy among cloud STT services; $200 free credit covers bootstrap usage). Fallback: Web Speech API (free, browser-native, lower quality). **TTS**: Azure Neural TTS (natural Arabic voices, 0.5M chars/month free tier). Islamic terminology pronunciation handled via SSML phoneme tags. End-to-end pipeline: User speaks → Deepgram STT → text → chatbot RAG → response text → Azure TTS → audio playback.
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/05-voice-ai-stt-tts.md) — 21 options evaluated
- **Acceptance Criteria**:
  - [ ] Voice input recognized in Arabic (MSA + Gulf dialect) and English
  - [ ] Spoken responses in natural Arabic and English
  - [ ] Islamic terms pronounced correctly (via SSML phoneme customization)
  - [ ] End-to-end latency <5 seconds (STT + RAG + TTS)
  - [ ] Graceful fallback to text when voice fails or network is poor
  - [ ] Works on iOS Safari and Android Chrome
  - [ ] Clear visual indicators for listening/processing/speaking states

### Feature 6: Heritage Site Detail Pages (Supporting)

- **Description**: Rich content pages for each heritage site with layered micro-narratives (brief + expanded), historical images, visitor information, and heritage classification metadata.
- **Linked User Stories**: US-5.1
- **Linked Business Requirements**: BR-2
- **Priority**: Must Have
- **Business Tier**: Supporting (score 3.70 — but content is foundational to all other features)
- **Technical Approach**: JSON content files in Git (decided by Supporting Systems). Heritage narratives rendered via react-markdown for rich text with images and styled quotes. Images optimized via Next.js Image component + sharp (build-time pre-optimization to WebP/AVIF). Cloudflare CDN for edge delivery. Service worker pre-caches site content for offline access at heritage sites with poor connectivity.
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/08-heritage-content-delivery.md) — 9 options evaluated
- **Acceptance Criteria**:
  - [ ] Each site has brief (15-30s) and expanded (1-2min) narrative layers
  - [ ] Third-person scholarly voice with curiosity hooks (per domain research)
  - [ ] Heritage images load in <2.5s (LCP target) via WebP/AVIF
  - [ ] Visitor info displayed: hours, location, accessibility, entry requirements
  - [ ] Content available offline after first visit (service worker caching)
  - [ ] Bilingual content (Arabic primary, English secondary)

### Feature 7: Bilingual Interface (Supporting)

- **Description**: Full Arabic RTL interface as primary language with English toggle. Scalable to 8+ languages in Phase 2. Islamic terminology preserved across all languages.
- **Linked User Stories**: US-5.2, US-5.3
- **Linked Business Requirements**: BR-5
- **Priority**: Must Have (legally mandatory for Saudi consumer apps)
- **Business Tier**: Supporting (score 2.95 — but mandatory)
- **Technical Approach**: next-intl for i18n with Next.js App Router. Translation strings stored in JSON files per locale. RTL layout via CSS `direction: rtl` with automatic mirroring. Islamic terminology glossary ensures terms are transliterated consistently. Serwist for PWA service worker (offline caching, install prompt, manifest).
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/06-bilingual-pwa-framework.md) — 11 options evaluated
- **Acceptance Criteria**:
  - [ ] Full Arabic RTL interface renders correctly on all target devices
  - [ ] English toggle switches all UI and content without page reload
  - [ ] Islamic terms preserved in transliteration (e.g., "Masjid" not "Mosque")
  - [ ] PWA installable on iOS and Android with proper manifest
  - [ ] Service worker enables offline access to previously visited content
  - [ ] "Add to Home Screen" prompt displayed on first meaningful visit

### Feature 8: Social Sharing & Referral System (Supporting — Marketing-Driven)

- **Description**: Native sharing of heritage certificates and site pages to social media. Invite-a-friend deeplinks with referral tracking. Rich Open Graph previews for shared URLs.
- **Linked User Stories**: US-4.3
- **Linked Business Requirements**: Marketing Strategy
- **Priority**: Should Have
- **Technical Approach**: Web Share API for native mobile sharing + react-share fallback buttons for desktop. Custom UTM parameters + Supabase for referral tracking. Next.js Metadata API + @vercel/og for dynamic Open Graph images (heritage site previews, certificate previews).
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/07-social-sharing-referral.md) — 16 options evaluated
- **Acceptance Criteria**:
  - [ ] Share button triggers native share sheet on mobile (Web Share API)
  - [ ] Fallback share buttons for WhatsApp, Instagram, Twitter, Snapchat
  - [ ] Shared URLs show rich previews with heritage imagery and Arabic text
  - [ ] Referral links tracked via UTM parameters in Supabase
  - [ ] Bonus stamp awarded for successful referral (friend visits via link)

### Feature 9: Navigation Integration (Skip)

- **Description**: "Get Directions" button on each heritage site that opens the visitor's preferred maps app with the correct destination.
- **Linked User Stories**: US-1.4
- **Linked Business Requirements**: BR-7
- **Priority**: Should Have
- **Technical Approach**: Platform-aware smart link — detects mobile OS and offers Google Maps, Apple Maps, and Waze deep links. Uses URL schemes (no API keys required). Dropdown menu for platform selection.
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/09-navigation-integration.md) — 4 options evaluated
- **Acceptance Criteria**:
  - [ ] "Get Directions" opens Google Maps/Apple Maps/Waze with correct coordinates
  - [ ] Platform detection offers relevant options (Waze popular in Saudi Arabia)
  - [ ] Works on all target browsers without additional libraries

### Feature 10: Push Notifications (Skip — Marketing-Driven)

- **Description**: Web push notifications for re-engagement — nearby site alerts, new content notifications, and heritage challenge campaigns.
- **Linked Business Requirements**: Marketing Strategy
- **Priority**: Nice to Have (Phase 2)
- **Technical Approach**: Firebase Cloud Messaging (FCM) — free, unlimited. Service worker handles push events. iOS Safari requires PWA installed to home screen for push support.
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/10-push-notifications.md) — 6 options evaluated
- **Acceptance Criteria**:
  - [ ] Push notification permission requested after meaningful engagement (not first visit)
  - [ ] Notifications delivered on Android Chrome and iOS Safari (home screen PWA)
  - [ ] Onboarding prompts "Add to Home Screen" for iOS push support
  - [ ] Notification types: nearby sites, new content, heritage challenges

### Feature 11: Admin CMS & Visitor Analytics (Skip — Post-Hackathon B2B)

- **Description**: Content management system for Heritage Commission to manage site content, and analytics dashboard showing visitor engagement metrics. Both are post-hackathon B2B features.
- **Linked Business Requirements**: BR-10, BR-11
- **Priority**: Nice to Have (Phase 3)
- **Technical Approach**: **CMS**: Payload CMS 3.0 (Next.js-native, free, supports Arabic RTL). **Analytics**: Custom Next.js dashboard querying Umami Cloud API for QR scans, chatbot usage, popular sites, and engagement time.
- **Options Analysis Reference**: [See full analysis](TECHNICAL_OPTIONS/11-admin-cms-analytics.md) — 8 options evaluated
- **Acceptance Criteria**:
  - [ ] CMS allows non-technical users to add/edit heritage site content in Arabic and English
  - [ ] Analytics dashboard shows: QR scans per site, chatbot conversations, engagement time, popular sites
  - [ ] Dashboard accessible to Heritage Commission partners with role-based access

---

## 5. Technical Architecture

### 5.1 Tech Stack

> *Technology choices informed by the [Technical Options Analysis](TECHNICAL_OPTIONS/README.md) — 141 options evaluated across 11 capabilities.*

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG for SEO, React ecosystem, Vercel-optimized deployment. Team's chosen stack. |
| **Frontend** | React 18+ | Component-based UI, massive ecosystem, team expertise |
| **Map** | Leaflet + react-leaflet | $0, 42KB gzipped, OpenStreetMap tiles with Arabic labels. Best score (4.18) among 11 options. |
| **QR Generation** | qr-code-styling | Heritage-branded QR codes with logo, custom corners, SVG/PNG output. Score 4.31. |
| **QR Scanning** | qr-scanner (Nimiq) | 2-3x faster detection than alternatives, 57KB, MIT license. Score 4.47. |
| **AI/LLM** | Gemini 2.5 Flash-Lite via Vercel AI SDK | Free tier (15 RPM), low cost at scale ($0.075/1M tokens). 1-line swap to GPT/Claude via Vercel AI SDK. |
| **RAG/Embeddings** | Supabase pgvector + Gemini text-embedding-001 | Reuses existing Supabase instance. $0 additional cost. |
| **i18n** | next-intl | Best Next.js App Router support, TypeScript-safe, RTL handling. Score highest among 6 options. |
| **PWA** | Serwist (next-pwa successor) | Active maintenance, Workbox-based, offline caching. |
| **Certificates** | Canvas API + html-to-image fallback | Browser-native, $0, Arabic calligraphy support. |
| **Offline Storage** | Dexie.js (IndexedDB) | Offline-first stamp persistence, 16KB, promise-based API. |
| **Database** | Supabase (PostgreSQL) | Auth + DB + pgvector in one. Free tier: 50K MAU, 500MB. |
| **Authentication** | NextAuth.js + Supabase | $0, 50K MAU free tier. Heritage passport requires persistent user identity. |
| **Hosting** | Vercel (Hobby) + Cloudflare CDN | $0 (100GB bandwidth). Cloudflare: Jeddah/Riyadh edge nodes. |
| **Monitoring** | Sentry (free) + Langfuse (free) | Error tracking + LLM conversation tracing. |
| **Analytics** | Umami Cloud (free) | Privacy-first (no cookies), 100K events/month free. |
| **Voice STT** (Phase 2) | Deepgram Nova-3 | Best Arabic accuracy, $200 free credit. |
| **Voice TTS** (Phase 2) | Azure Neural TTS | Natural Arabic voices, 0.5M chars/month free. |
| **Push** (Phase 2) | Firebase Cloud Messaging | Free, unlimited, iOS Safari support (home screen PWA). |
| **CMS** (Phase 3) | Payload CMS 3.0 | Next.js-native, free, Arabic RTL support. |

### 5.2 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (PWA - Browser)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Leaflet  │  │ QR       │  │ Chat UI  │  │ Passport │    │
│  │ Map      │  │ Scanner  │  │ (Stream) │  │ + Certs  │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │              │              │              │          │
│  ┌────┴──────────────┴──────────────┴──────────────┴────┐    │
│  │         Next.js App Router + next-intl (RTL)         │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  Serwist Service Worker (offline cache, push, PWA)   │    │
│  ├──────────────────────────────────────────────────────┤    │
│  │  Dexie.js (IndexedDB - offline stamps, preferences)  │    │
│  └──────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS (Vercel Edge)
┌─────────────────────┴───────────────────────────────────────┐
│                    SERVER (Vercel Serverless)                 │
│  ┌──────────────────┐  ┌────────────────────────────────┐   │
│  │ Next.js API      │  │ AI Chatbot Route               │   │
│  │ Routes           │  │ ┌────────────────────────┐     │   │
│  │ - /api/stamps    │  │ │ Vercel AI SDK          │     │   │
│  │ - /api/referral  │  │ │  → pgvector retrieval  │     │   │
│  │ - /api/og-image  │  │ │  → Gemini Flash-Lite   │     │   │
│  └────────┬─────────┘  │ │  → Stream response     │     │   │
│           │             │ └────────────────────────┘     │   │
│           │             │ ┌────────────────────────┐     │   │
│           │             │ │ Guardrails             │     │   │
│           │             │ │  → No prophet voice    │     │   │
│           │             │ │  → Source attribution   │     │   │
│           │             │ │  → Langfuse trace      │     │   │
│           │             │ └────────────────────────┘     │   │
│           │             └────────────────────────────────┘   │
└───────────┼─────────────────────────────────────────────────┘
            │
┌───────────┴─────────────────────────────────────────────────┐
│                    DATA LAYER                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Supabase     │  │ Supabase     │  │ JSON in Git      │   │
│  │ PostgreSQL   │  │ pgvector     │  │ (Heritage data)  │   │
│  │ - Users      │  │ - Embeddings │  │ - Site content   │   │
│  │ - Stamps     │  │ - 30-60 docs │  │ - Translations   │   │
│  │ - Referrals  │  │              │  │ - Metadata       │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Cloudflare   │  │ Umami Cloud  │  │ Sentry + Langfuse│   │
│  │ CDN          │  │ Analytics    │  │ Monitoring       │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Data Model

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| **HeritageSite** | id, slug, name_ar, name_en, type (religious/archaeological/cultural/museum), city (makkah/madinah), lat, lng, images[], hours, accessibility | Has many QRPoints |
| **QRPoint** | id, site_id, section_name_ar, section_name_en, brief_narrative_ar, brief_narrative_en, expanded_narrative_ar, expanded_narrative_en, qr_code_url, order | Belongs to HeritageSite |
| **User** | id, email, name, preferred_language, created_at | Has many Stamps, has one Passport |
| **Stamp** | id, user_id, site_id, qr_point_id, earned_at, time_spent_seconds | Belongs to User, belongs to HeritageSite |
| **Certificate** | id, user_id, sites_visited[], generated_at, image_url, share_count | Belongs to User |
| **ChatSession** | id, user_id, site_id, messages[], created_at, langfuse_trace_id | Belongs to User |
| **Referral** | id, referrer_user_id, referred_user_id, utm_source, created_at, bonus_stamp_awarded | Belongs to User (referrer) |
| **Embedding** | id, qr_point_id, content_chunk, embedding_vector (1536d), metadata | Belongs to QRPoint |

### 5.4 API Design

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/chat` | POST (streaming) | Heritage chatbot — accepts message + site context, returns streamed AI response | Optional (tracks free tier limit if authenticated) |
| `/api/stamps` | GET | Get user's earned stamps | Yes |
| `/api/stamps` | POST | Record a new stamp (site_id, qr_point_id, time_spent) | Yes |
| `/api/certificate` | POST | Generate certificate image (triggers Canvas API on client, saves URL to Supabase) | Yes |
| `/api/referral` | POST | Record referral visit (utm_source, referrer_id) | No |
| `/api/referral/bonus` | POST | Award bonus stamp to referrer when referred user completes first site visit | Yes |
| `/api/og-image/[slug]` | GET | Generate Open Graph preview image for site or certificate (via @vercel/og) | No |
| `/api/nearby` | GET | Get heritage sites near given coordinates (lat, lng, radius_km) | No |

### 5.5 Integrations

> *Vendor and partner selections based on the [Technical Options Analysis](TECHNICAL_OPTIONS/README.md).*

| Integration | Provider | Purpose | Free Tier | Phase |
|------------|----------|---------|-----------|-------|
| LLM API | Google Gemini | AI chatbot responses | 15 RPM, 1M tokens/min | MVP |
| Vector DB | Supabase pgvector | RAG embedding storage/retrieval | 500MB (shared with main DB) | MVP |
| Authentication | Supabase Auth + NextAuth.js | User accounts for passport persistence | 50K MAU | MVP |
| Map Tiles | OpenStreetMap | Interactive map base layer | Unlimited (open data) | MVP |
| CDN | Cloudflare | Heritage image delivery, edge caching | Unlimited bandwidth | MVP |
| Hosting | Vercel | PWA hosting, serverless functions, edge network | 100GB bandwidth | MVP |
| Analytics | Umami Cloud | Privacy-first visitor analytics | 100K events/month | MVP |
| Error Tracking | Sentry | Client/server error monitoring | 5K events/month | MVP |
| LLM Monitoring | Langfuse | Chatbot conversation tracing, hallucination detection | 50K observations/month | MVP |
| STT | Deepgram | Voice input (Arabic/English) | $200 free credit | Phase 2 |
| TTS | Azure Cognitive Services | Voice output (Arabic/English) | 0.5M chars/month | Phase 2 |
| Push | Firebase Cloud Messaging | Web push notifications | Unlimited | Phase 2 |
| CMS | Payload CMS 3.0 | Heritage Commission content management | Self-hosted (free) | Phase 3 |

---

## 6. Non-Functional Requirements

| ID | Category | Requirement | Target |
|----|----------|-------------|--------|
| NFR-1 | Performance | Page load time (LCP) | <2.5s on 4G connection |
| NFR-2 | Performance | Map interaction (pan/zoom) | 60fps on mid-range mobile |
| NFR-3 | Performance | AI chatbot response time | <5s first token (streaming) |
| NFR-4 | Performance | QR code detection speed | <500ms under normal lighting |
| NFR-5 | Security | PDPL compliance | Arabic privacy notice, consent for GPS (sensitive data), data subject rights |
| NFR-6 | Security | Data encryption | HTTPS everywhere, Supabase RLS for row-level security |
| NFR-7 | Security | AI content safety | System prompt guardrails: no prophet impersonation, source attribution, hallucination flagging |
| NFR-8 | Scalability | User capacity | 50K MAU on free tiers; scale path documented to 100K+ |
| NFR-9 | Availability | Uptime | 99.9% (Vercel + Cloudflare SLA) |
| NFR-10 | Accessibility | Language support | Arabic (primary, RTL) + English; Phase 2: 6+ additional languages |
| NFR-11 | Accessibility | Offline capability | Previously visited sites accessible offline via service worker cache |
| NFR-12 | Compliance | Saudi tourism license | Required before commercial launch (5-10 business days via e-services portal) |
| NFR-13 | Compliance | Heritage content accuracy | All narratives reviewed by Islamic history scholars; no unverified claims |
| NFR-14 | Compliance | Photography restrictions | No photography from inside Masjid al-Haram or Masjid an-Nabawi; use licensed archival imagery |

---

## 7. Milestones & Phases

### Phase 1: Hackathon MVP

**Goal**: Win the Hackathon for Historical and Enrichment Sites (3rd Edition) with a functional demo covering all core features.
**Duration**: 4-5 days (hackathon sprint)
**Budget Tier**: Bootstrap ($0 cash)

| Milestone | Features Included | Deliverable |
|-----------|-------------------|-------------|
| M1: Map & Content | Smart Interactive Map (F1), Heritage Site Detail Pages (F6), Bilingual Interface (F7) | Interactive map with 10-12 sites, filterable by type/city, with bilingual content pages |
| M2: QR & PWA | QR Code System (F2), Navigation Integration (F9) | Branded QR codes for all sites/sections, PWA with service worker, "Get Directions" links |
| M3: AI Chatbot | AI Heritage Chatbot (F3) | Text-based heritage Q&A with RAG, guardrails, streaming responses |
| M4: Gamification | Heritage Passport & Certificates (F4) | Stamp collection, certificate generation, social sharing |

### Phase 2: Post-Hackathon Growth

**Goal**: Launch publicly with Heritage Commission partnership, achieve 5,000 MAU, add voice AI.
**Duration**: 3-6 months post-hackathon
**Budget Tier**: Bootstrap → Growth (trigger: MRR > $500 for 2+ months)

| Milestone | Features Included | Deliverable |
|-----------|-------------------|-------------|
| M5: Voice AI | Voice AI Guide (F5) | STT/TTS voice interaction in Arabic/English |
| M6: Viral Growth | Social Sharing & Referral (F8), Push Notifications (F10) | Referral system with deeplinks, FCM push notifications |
| M7: Partnership | Heritage Commission content collaboration | Official content, physical QR code placement at sites |

### Phase 3: B2B & Scale

**Goal**: Generate sustainable B2B revenue, expand to 15,000+ MAU, add admin tools.
**Duration**: Month 6-12
**Budget Tier**: Growth → Scale (trigger: MRR > $3,000 or funding)

| Milestone | Features Included | Deliverable |
|-----------|-------------------|-------------|
| M8: B2B Tools | Admin CMS & Analytics (F11) | Heritage Commission content dashboard + visitor analytics |
| M9: Expansion | Additional languages, additional sites, knowledge graph | Urdu, Indonesian, Turkish support; 20+ heritage sites; AI knowledge graph for cross-site connections |

### Development Critical Path

#### Task Inventory

| ID | Task | Source | Est. Duration | Depends On | Phase |
|----|------|--------|---------------|------------|-------|
| T-1 | Next.js project setup + Serwist PWA + next-intl i18n | TECHNICAL_OPTIONS/06 | 1-2 days | — | MVP |
| T-2 | Supabase setup (auth, DB schema, pgvector) | SUPPORTING_SYSTEMS/01, 03 | 1 day | — | MVP |
| T-3 | Heritage content curation (10-12 sites × 3-5 QR points) | Feature Spec F6 | 3-4 days | — | MVP |
| T-4 | Interactive map (Leaflet + react-leaflet) | TECHNICAL_OPTIONS/01 | 2-3 days | T-1, T-2 | MVP |
| T-5 | Heritage site detail pages (react-markdown, JSON content) | TECHNICAL_OPTIONS/08 | 1-2 days | T-1, T-3 | MVP |
| T-6 | QR code generation (qr-code-styling, batch for all sites) | TECHNICAL_OPTIONS/02 | 1 day | T-3 | MVP |
| T-7 | QR scanning integration (qr-scanner) | TECHNICAL_OPTIONS/02 | 0.5 days | T-1 | MVP |
| T-8 | AI chatbot RAG pipeline (embeddings, retrieval, Gemini) | TECHNICAL_OPTIONS/03 | 3-4 days | T-2, T-3 | MVP |
| T-9 | Chatbot guardrails + Langfuse tracing | TECHNICAL_OPTIONS/03, SUPPORTING_SYSTEMS/04 | 1 day | T-8 | MVP |
| T-10 | Heritage passport (Dexie.js stamps + Supabase sync) | TECHNICAL_OPTIONS/04 | 1.5 days | T-1, T-2 | MVP |
| T-11 | Certificate generation (Canvas API) | TECHNICAL_OPTIONS/04 | 1.5 days | T-10 | MVP |
| T-12 | Social sharing (Web Share API + react-share + OG images) | TECHNICAL_OPTIONS/07 | 0.5 days | T-11 | MVP |
| T-13 | Navigation integration (deep links) | TECHNICAL_OPTIONS/09 | 0.5 days | T-4 | MVP |
| T-14 | Privacy consent banner (PDPL compliance) | SUPPORTING_SYSTEMS/06 | 0.5 days | T-1 | MVP |
| T-15 | Umami analytics + Sentry setup | SUPPORTING_SYSTEMS/04, 05 | 0.5 days | T-1 | MVP |
| T-16 | Voice AI (Deepgram STT + Azure TTS) | TECHNICAL_OPTIONS/05 | 2-3 days | T-8 | Phase 2 |
| T-17 | Push notifications (FCM) | TECHNICAL_OPTIONS/10 | 1 day | T-1 | Phase 2 |
| T-18 | Referral system (UTM tracking + bonus stamps) | TECHNICAL_OPTIONS/07 | 1 day | T-10 | Phase 2 |
| T-19 | Admin CMS (Payload CMS 3.0) | TECHNICAL_OPTIONS/11 | 3-5 days | T-5 | Phase 3 |
| T-20 | Analytics dashboard (custom over Umami API) | TECHNICAL_OPTIONS/11 | 2-3 days | T-15 | Phase 3 |

#### Dependency Graph (MVP — Hackathon)

```
Track A (Content Pipeline — Critical Path):
  T-3 Content Curation (3-4d) → T-5 Site Pages (1-2d) → T-8 AI Chatbot RAG (3-4d) → T-9 Guardrails (1d)
                               → T-6 QR Generation (1d)

Track B (Map & Discovery):
  T-1 Project Setup (1-2d) → T-4 Interactive Map (2-3d) → T-13 Navigation (0.5d)
                            → T-7 QR Scanning (0.5d)

Track C (Gamification):
  T-2 Supabase Setup (1d) → T-10 Heritage Passport (1.5d) → T-11 Certificates (1.5d) → T-12 Sharing (0.5d)

Track D (Infrastructure — Parallel):
  T-1 Project Setup (1-2d) → T-14 Privacy Banner (0.5d)
                            → T-15 Analytics/Monitoring (0.5d)
```

#### Critical Path Summary

| Metric | Estimate |
|--------|----------|
| Total development work (all MVP tasks summed) | 20-27 person-days |
| **Critical path (Track A: Content → Pages → Chatbot → Guardrails)** | **8-11 days** |
| Parallelizable work (Tracks B, C, D) | 8-11 person-days |
| Tasks that can start immediately (no dependencies) | T-1 (Project setup), T-2 (Supabase), T-3 (Content curation) |

*Timeline assumes a 4-person hackathon team working in parallel. With all 4 team members, MVP is achievable in **4-5 intensive days**. Content curation (T-3) is the bottleneck — it must start immediately and should be assigned to the team member with the strongest heritage/history knowledge.*

#### Scheduling Risks

| Risk | Impact on Critical Path | Mitigation |
|------|------------------------|------------|
| Content curation takes longer than estimated | Delays T-5, T-6, T-8 — extends critical path by 1-3 days | Start content work before hackathon begins; prioritize 6 most important sites; use scholarly online sources |
| AI chatbot RAG quality insufficient | T-9 guardrails need more iteration — extends critical path by 1-2 days | Start with simple prompt engineering; add RAG progressively; Vercel AI SDK allows quick LLM swap |
| Arabic RTL layout issues consume extra time | Delays all frontend tasks by 0.5-1 day | Use next-intl RTL patterns from documentation; test Arabic layout early with real content |
| Vercel serverless 10s timeout blocks chatbot | T-8 chatbot doesn't work in demo | Use streaming responses (partial delivery within timeout); fallback: extend to Vercel Pro ($20/mo for 60s timeout) |

---

## 8. Risks & Technical Debt

| ID | Risk/Debt Item | Type | Probability | Impact | Mitigation | Linked BRD Risk |
|----|---------------|------|-------------|--------|------------|-----------------|
| TR-1 | Gemini Arabic quality below GPT-4.1/Claude for heritage content | Technical Risk | Medium | Medium | Vercel AI SDK enables 1-line LLM provider swap; A/B test with 20 heritage queries pre-launch | R-4 |
| TR-2 | iOS PWA camera permissions block in-app QR scanning | Technical Risk | Medium | Low | Primary flow uses native camera app (always works); in-app scanner is secondary | — |
| TR-3 | Canvas API Arabic calligraphy renders poorly on older Android | Technical Risk | Low | Medium | html-to-image fallback library; test on 5+ device types | — |
| TR-4 | Vercel Hobby 10s serverless timeout too short for chatbot | Technical Risk | Medium | High | Streaming responses deliver partial content fast; upgrade to Pro ($20/mo, 60s) if needed | — |
| TR-5 | Heritage Commission denies physical QR placement | Technical Risk | High | High | GPS-triggered digital content as alternative; hackathon demo proves concept | R-1 |
| TR-6 | AI hallucination on religious/historical content | Technical Risk | Medium | High | RAG grounding + guardrails + Langfuse monitoring + scholarly content review | R-4 |
| TR-7 | Voice AI end-to-end latency exceeds conversational threshold (5s) | Technical Risk | Medium | Medium | Web Speech API as zero-cost fallback; voice is Phase 2 stretch goal | — |
| TD-1 | JSON-in-Git content model won't scale beyond 50 sites | Technical Debt | — | Low | Migrate to Payload CMS 3.0 when Heritage Commission partnership requires non-technical content editing | — |
| TD-2 | Supabase pgvector with 30-60 chunks works for MVP but needs re-evaluation at 500+ | Technical Debt | — | Low | Re-evaluate dedicated vector DB (Pinecone/Weaviate) when expanding beyond initial 12 sites | — |
| TD-3 | Single Supabase instance for auth + data + vectors | Technical Debt | — | Low | Acceptable at MVP scale; separate services when hitting free tier limits (50K MAU) | — |

---

## 9. Open Questions

| ID | Question | Owner | Status | Resolution |
|----|----------|-------|--------|------------|
| OQ-1 | Can the hackathon team start content curation before the event? | Yousef (team lead) | Open | Critical for critical path — 3-4 days of content work is the bottleneck |
| OQ-2 | Which 10-12 heritage sites should be prioritized for MVP? | Team + Heritage Commission | Open | Select sites with most visitor traffic, best documentation, and geographic spread across both cities |
| OQ-3 | Vercel Hobby plan TOS — does it allow commercial freemium apps? | Yousef | Open | Verify before commercial launch; fallback: Vercel Pro ($20/mo) or Cloudflare Pages |
| OQ-4 | Who provides Islamic scholarly review of heritage narratives? | Team | Open | Identify a scholar or Heritage Commission contact for content review pre-launch |
| OQ-5 | Will the hackathon provide access to heritage sites for QR testing? | Team → Hackathon organizers | Open | Request site access during hackathon; plan GPS-triggered alternative if denied |
| OQ-6 | Should voice AI (Phase 2) be demoed at the hackathon as a stretch goal? | Team | Open | Only demo if Arabic voice works reliably in testing; broken voice demo undermines credibility |
| OQ-7 | Heritage Commission data-sharing agreement needed for official content? | Team → Heritage Commission | Open | Explore post-hackathon; MVP uses publicly available scholarly sources |

---

## 10. Appendix

### A. Glossary

| Term | Definition |
|------|-----------|
| PWA | Progressive Web App — web application installable on devices, works offline |
| RAG | Retrieval-Augmented Generation — AI technique that retrieves relevant content before generating responses |
| STT/TTS | Speech-to-Text / Text-to-Speech — voice AI input/output |
| LLM | Large Language Model — AI model powering the chatbot (e.g., Gemini, GPT) |
| pgvector | PostgreSQL extension for vector similarity search (used in RAG) |
| PDPL | Saudi Personal Data Protection Law — Saudi Arabia's data privacy regulation |
| RTL | Right-to-Left — text direction for Arabic language interfaces |
| Ilm/Rihla/Itqan | Islamic values (knowledge seeking / scholarly journey / excellence) used in gamification framing |
| MSA | Modern Standard Arabic — formal Arabic used across the Arab world |
| Haversine | Mathematical formula for calculating distances between GPS coordinates on a sphere |

### B. References

- BRD: [BRD.md](BRD.md) (Final)
- Initial BRD: [preparation/INITIAL-BRD.md](preparation/INITIAL-BRD.md)
- Technical Options Analysis: [TECHNICAL_OPTIONS/README.md](TECHNICAL_OPTIONS/README.md) (11 capabilities, 141 options)
- Business Research: [BUSINESS_RESEARCH/README.md](BUSINESS_RESEARCH/README.md) (11 features analyzed)
- Supporting Systems: [SUPPORTING_SYSTEMS/README.md](SUPPORTING_SYSTEMS/README.md) (6 systems analyzed)
- Marketing Strategy: [MARKETING_STRATEGY/README.md](MARKETING_STRATEGY/README.md) (5 phases)
- Domain Research: [DOMAIN_RESEARCH/README.md](DOMAIN_RESEARCH/README.md) (3 topics)
- Budget Context: [BUDGET_CONTEXT.md](BUDGET_CONTEXT.md)
- Idea: [IDEA.md](IDEA.md)

---

*This PRD was generated by Idea Forge, derived from the corresponding BRD and informed by Technical Options Analysis (141 options across 11 capabilities), Business Research (11 features), Supporting Systems Analysis (6 systems), Marketing Strategy (5 phases), and Domain Research (3 topics). All technical decisions should be validated by the engineering team before implementation.*
