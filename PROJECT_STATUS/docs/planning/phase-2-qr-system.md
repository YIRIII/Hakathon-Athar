# Phase 2: QR Code System

**Generated:** 2026-03-18 | **Source:** idea-forge/athar-heritage-platform | **Tier:** B
**Status:** planned

## Research Links
- **Business Research:** BR-3 (QR Code System) — Highest scored feature (4.90) → [03-qr-code-system.md](../../project_documents/BUSINESS_RESEARCH/03-qr-code-system.md)
- **Technical Options:** TC-2 (QR Code Generation & Scanning) → [02-qr-code-system.md](../../project_documents/TECHNICAL_OPTIONS/02-qr-code-system.md)
- **PRD:** F2 (QR Code System — Entry + Internal)

## Recommended Tech Stack
- **QR Generation:** qr-code-styling (branded QR with heritage design, logo embed, 300+ DPI)
- **QR Scanning:** qr-scanner (Nimiq) — lightweight, camera-based
- **Fallback:** Native camera app deep link support via URL scheme

## Estimated Cost
$0 cash (all client-side libraries)

## Budget Context
- **Active tier:** Bootstrap
- **Phase cost vs. budget:** $0
- **Sanity check:** PASS

## Prerequisites
- Phase 0 must be complete (Supabase tables for QR codes)
- Phase 1 should be complete (site detail pages are QR destinations)

## Implementation Steps
- [ ] **2.1:** Install qr-code-styling and build QR generation utility — heritage-branded QR codes with Islamic geometric patterns, Athar logo center, 300+ DPI for print
- [ ] **2.2:** Create dual-layer QR schema in Supabase — entry QR (site overview, one per site) and internal QR (section-specific stories, multiple per site)
- [ ] **2.3:** Build admin QR generation page — generate and download print-ready QR codes for all heritage sites with bilingual labels
- [ ] **2.4:** Install qr-scanner and build in-app QR scanning UI — camera permission handling, scan overlay with heritage styling, <500ms detection target
- [ ] **2.5:** Implement QR routing logic — scan QR → decode URL → route to correct site detail page or specific section/story
- [ ] **2.6:** Add native camera fallback — QR codes encode URLs that open in browser when scanned with native camera app
- [ ] **2.7:** Build QR scan confirmation animation — branded feedback when scan succeeds (heritage-themed transition to content)
- [ ] **2.8:** Error handling — invalid QR codes, expired links, offline scanning with cached content

## Key Decisions (from research)
- qr-code-styling over basic QR libraries — supports branded QR with custom colors, logo embed, Islamic geometric patterns
- Dual-layer QR (entry + internal) over single QR — richer on-site experience, section-specific storytelling
- Client-side scanning over server-side — lower latency, works offline, no API costs
- Error correction level H — maximum redundancy for outdoor/damaged QR codes

## Acceptance Criteria
- QR codes generate with heritage branding at 300+ DPI
- Entry QR links to site overview, internal QR links to specific sections
- In-app scanner detects QR in <500ms under normal lighting (NFR-4)
- Native camera app scanning works as fallback
- Scanned content loads even when offline (if previously cached)
- Error correction level H ensures scanning with up to 30% damage

## Competitive Context
- Zero QR-based digital heritage infrastructure at world's most-visited religious sites despite 15M+ annual pilgrims
- Highest priority feature in business research scoring (4.90/5.0)
- Physical QR installation requires Heritage Commission approval (regulatory note)

## Research Gaps
- No PRICING_STRATEGY: QR scanning assumed free for all users (Hero feature)
- No RISK_ASSESSMENT: Physical QR installation regulatory risk not formally assessed — Heritage Commission approval needed under Law of Antiquities
