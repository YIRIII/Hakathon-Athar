# Bilingual Interface

**Linked BRD Requirement**: BR-5
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 4 (Business Requirements)
**Priority (BRD)**: Must Have

---

## 1. Feature Context

Per the BRD: *"BR-5: Bilingual interface — Arabic (primary, RTL) with English toggle. Arabic mandatory for Saudi consumer apps; English needed for 63%+ Asian pilgrims."*

This feature provides a fully bilingual Arabic-first (RTL) and English interface for the Athar heritage discovery PWA. Arabic is non-negotiable for Saudi consumer-facing applications and government-aligned projects. English is essential given that 63%+ of pilgrims are non-Arab (primarily South Asian, Southeast Asian). The BRD's long-term vision includes 8+ languages (Urdu, Indonesian, Turkish, Bengali, Malay, French) to match the 14-16 languages that official Hajj/Umrah guides are published in.

The domain research recommends a **term-preserving cross-lingual RAG** approach — Islamic heritage terminology (e.g., Hijrah, Isra' wal-Mi'raj, Maqam Ibrahim) must not be corrupted or mistranslated across languages. This is a hybrid translate-transcreate approach where sacred/technical terms are preserved in transliterated Arabic while surrounding context is translated.

---

## 2. Competitive Landscape

### Direct Competitors

| Competitor | Product | What They Do | Target Audience | Pricing | Strengths | Weaknesses |
|-----------|---------|-------------|-----------------|---------|-----------|------------|
| **Nusuk (نسك)** | Official MoHU Hajj/Umrah platform | Pilgrimage permits, booking, visa, navigation. Official government platform by Ministry of Hajj & Umrah. | All pilgrims globally | Free | Supports 34+ languages (Arabic, English, Urdu, Turkish, Malay, French, Bengali, Persian, Amharic, Azerbaijani, Burmese, Filipino, Japanese, Korean, Chinese, Spanish, Russian, etc.). Government-backed. AI personal assistant with real-time voice translation. | Focused on logistics (permits, booking), not heritage content. No heritage storytelling or site interpretation. Language coverage is broad but shallow — UI labels and transactional text, not rich cultural narratives. |
| **Visit Saudi (روح السعودية)** | Saudi Tourism Authority official app | Tourist discovery, events, attractions, hotel/flight booking across all Saudi Arabia. | International tourists | Free | 8 languages (Arabic, English, French, Spanish, Japanese, Russian, German, Chinese). Polished UI with Arabic RTL support. SARA AI multilingual assistant. | General tourism platform — not heritage-focused. No Makkah/Madinah heritage content (these cities are underrepresented vs. AlUla, Diriyah, Jeddah). No deep cultural narratives or Islamic terminology handling. |
| **Pilgrim App** | Hajj & Umrah companion | Step-by-step ritual guides, duas, Haram crowd levels, AI assistant (PilgrimAI). | Hajj/Umrah pilgrims | Free (premium features) | Strong ritual guidance content. AI-based Q&A. Available in 8 languages (Arabic, Urdu, English, French, Malay, Indonesian, Turkish, Bengali) — matching official Hajj guide languages. | Ritual-focused, not heritage-focused. No heritage site discovery or historical narrative content. Language support covers ritual vocabulary, not cultural/historical terminology. |
| **Discover Makkah** | Makkah Royal Commission smart platform | Landmarks, events, trip planner, interactive map for Makkah visitors. | Makkah visitors | Free | Arabic + English. Interactive map. Heritage landmarks included. Government-backed (Royal Commission for Makkah City). | Only Makkah (no Madinah). Limited language options (Arabic/English only). Content is informational, not narrative/storytelling. No AI-powered interpretation. No Islamic terminology preservation approach. |
| **HalalTrip** | Muslim lifestyle travel app | Halal restaurants, mosques, prayer times, Qibla, Islamic heritage tour packages. | Muslim travelers globally | Free | 5 languages (English, Turkish, Arabic, Bahasa Indonesia, Malay). Strong community. Heritage tour packages. | Aggregator model — links to third-party tours. No proprietary heritage content. No site-level cultural narratives. Arabic is secondary language, English-first design. |
| **The Haramayn Guide** | Heritage guidebook/service | Over 120 Prophetic landmarks with QR codes. Guided ziyarah tours. Published as book series with digital companion. | English-speaking pilgrims | Paid (books + tours) | Deep heritage content — 120+ landmarks. QR code navigation. First English-language guide to historic Companion homes. | English-only. Physical book + tour model, not a digital platform. No Arabic content. No AI or interactive features. No scalable multilingual approach. |

### Adjacent / Partial Solutions

| Solution | How It Partially Addresses This Need | Gap Remaining |
|----------|--------------------------------------|--------------|
| **SARA AI (Saudi Tourism Authority)** | Multilingual AI tourism assistant speaking Arabic, English, and "dozens of languages." Integrates Saudi cultural heritage in itineraries. | Not a standalone app — embedded in Visit Saudi ecosystem. General tourism, not heritage-specific. No deep Islamic terminology handling. No Makkah/Madinah heritage focus. |
| **Google Translate / Lens** | Real-time translation of signage, text. Supports 100+ languages including Arabic RTL. | Generic translation — corrupts Islamic terminology (e.g., translating "المسجد النبوي" literally instead of preserving "Al-Masjid an-Nabawi"). No heritage context. No cultural narrative. |
| **Ziyara GPS** | GPS-based guide to Makkah & Madinah holy sites with navigation. | Limited language support. Navigation-focused, not content-rich. No bilingual heritage narratives. |
| **Makkah Visitors App** | Official Makkah visitor services. | Transactional focus. Limited heritage content. Basic bilingual (Arabic/English). |
| **Official Hajj/Umrah Guides (Ministry)** | Published in 14-16 languages. Comprehensive ritual and site information. | Static PDF/print format. Not interactive. Not a digital platform. Updated infrequently. No AI or personalization. |

### Open-Source / Academic Approaches

| Project / Paper | Description | Maturity | Limitations |
|----------------|-------------|----------|-------------|
| **Multilingual-NLP-for-Islamic-Theology** (GitHub: mobassir94) | Cross-lingual language models for Quran and Hadith search engines. Accepts queries in Arabic, Hindi, Bengali, English. | Research / Prototype | Search-focused, not content delivery. No tourism/heritage application. No RTL UI. |
| **"From RAG to Agentic RAG for Faithful Islamic Question Answering"** (arXiv:2601.07528, 2026) | Curates 25,000 Arabic instruction-response pairs for theological topics. Explores faithful QA for Islamic content. | Research | Academic — no production deployment. No multilingual heritage content delivery. No tourism context. |
| **"The Cross-Lingual Cost: Retrieval Biases in RAG over Arabic-English Corpora"** (arXiv:2507.07543, 2025) | Studies retrieval performance drops when query and document languages differ in Arabic-English RAG systems. Identifies critical bottlenecks. | Research | Documents the problem of cross-lingual retrieval degradation but does not solve it for heritage content. Highlights challenge Athar must address. |
| **"Optimizing RAG Pipelines for Arabic"** (arXiv:2506.06339, 2025) | Systematic analysis of RAG components for Arabic — chunking, embeddings, rerankers. Finds sentence-aware chunking + BGE-M3/Multilingual-E5-large optimal. | Research | General Arabic RAG optimization, not heritage-specific. No Islamic terminology preservation strategy. |
| **i18next Arabic RTL** | Popular i18n framework with RTL detection (i18n.dir() returns "rtl" for Arabic). Wide adoption in web/PWA apps. | Production-ready | Framework, not content. Handles UI direction but not cultural/terminological adaptation. |

---

## 3. Gap Analysis

A significant gap exists at the intersection of **bilingual heritage content delivery** and **Islamic terminology preservation** for Makkah and Madinah:

1. **No Arabic-first heritage storytelling platform for both holy cities.** Nusuk handles 34+ languages but only for logistics (permits, booking). Visit Saudi covers tourism broadly but underrepresents Makkah/Madinah heritage. Discover Makkah covers one city. The Haramayn Guide has deep heritage content but is English-only and print-based. No single platform delivers rich bilingual (Arabic+English) heritage narratives for both Makkah and Madinah.

2. **Islamic terminology corruption in existing multilingual tools.** Generic translation services (Google Translate, standard i18n) corrupt sacred terminology. "المقام" becomes "the place" instead of "Maqam Ibrahim." "الهجرة" becomes "migration" instead of "Hijrah." No existing pilgrim-facing app implements term-preserving translation where Islamic nomenclature is maintained in transliterated Arabic across all languages.

3. **No cross-lingual RAG for heritage Q&A.** Academic research documents the cross-lingual retrieval degradation problem (arXiv:2507.07543) but no production system solves it for heritage content. Athar's domain research recommends a term-preserving cross-lingual RAG approach — this is novel in the pilgrim/heritage space.

4. **Language breadth vs. content depth trade-off.** Nusuk supports 34+ languages with shallow transactional text. Pilgrim App supports 8 languages with ritual content. No platform combines **deep heritage narratives** with **broad language support** — the gap Athar targets with its 8+ language roadmap.

5. **RTL-first heritage PWA is unprecedented.** Existing platforms either treat Arabic as a secondary language (HalalTrip, Haramayn Guide) or support Arabic but without heritage depth (Nusuk, Visit Saudi). An Arabic-primary RTL PWA specifically designed for heritage storytelling in Makkah and Madinah does not exist.

---

## 4. Novelty Assessment

**Rating**: `novel`

**Rationale**: While bilingual Arabic/English interfaces are common across Saudi apps (Nusuk, Visit Saudi, Discover Makkah all support both languages), the specific combination that Athar proposes is genuinely novel:

- **No existing platform** delivers bilingual heritage storytelling content for both Makkah and Madinah with deep cultural narratives (not just UI labels or transactional text).
- **Term-preserving cross-lingual RAG** for Islamic terminology is an approach documented in academic research but not deployed in any production heritage/tourism platform.
- **The hybrid translate-transcreate model** (preserving sacred terms while translating context) addresses a real corruption problem that every existing multilingual pilgrim tool ignores.
- Competitors achieve language breadth (Nusuk: 34+ languages) OR heritage depth (Haramayn Guide: 120+ landmarks) but never both together with terminology integrity.

The bilingual UI itself is incremental (standard i18n/RTL), but the **content-level bilingual heritage delivery with Islamic term preservation** is novel. The novelty is in the content layer, not the interface layer.

---

## 5. Key Sources

1. Nusuk App — App Store listing and language support: https://apps.apple.com/us/app/nusuk-%D9%86%D8%B3%D9%83/id6469515422 (accessed 2026-03-18)
2. Nusuk App — Saudipedia overview: https://saudipedia.com/en/article/391/government-and-politics/digital-government/nusuk-app (accessed 2026-03-18)
3. Visit Saudi App — Google Play: https://play.google.com/store/apps/details?id=sa.gov.apps.sauditourism&hl=en_US (accessed 2026-03-18)
4. Visit Saudi — SPA news, 8 languages: https://www.spa.gov.sa/en/N2086588 (accessed 2026-03-18)
5. SARA AI — Saudi Tourism Authority case study: https://www.digitalhumans.com/case-studies/saudi-tourism-authority (accessed 2026-03-18)
6. SARA AI — Official STA announcement: https://www.sta.gov.sa/en/news/saudi-tourism-authority-launches-beta-version-of-sara-ai (accessed 2026-03-18)
7. Pilgrim App — Official site: https://pilgrimapp.com/ (accessed 2026-03-18)
8. HalalTrip — Islamic travel app features: https://www.halaltrip.com/islamic-travel-app/ (accessed 2026-03-18)
9. Discover Makkah — Official platform: https://www.discovermakkah.sa/en/ (accessed 2026-03-18)
10. The Haramayn Guide — Official site: https://theharamaynguide.com/ (accessed 2026-03-18)
11. Saudi Hajj 2025 AI in 35 languages — Araweelo News: https://www.araweelonews.com/news-in-english/saudi-arabia-harnesses-ai-to-transform-pilgrim-experience-in-35-languages-hajj-2025/ (accessed 2026-03-18)
12. Saudi Hajj tech and multilingual engagement — Travel And Tour World: https://www.travelandtourworld.com/news/article/saudi-arabia-sets-new-standard-for-hajj-with-cutting-edge-technology-and-multilingual-engagement/ (accessed 2026-03-18)
13. Multilingual NLP for Islamic Theology — GitHub: https://github.com/mobassir94/Multilingual-NLP-for-Islamic-Theology (accessed 2026-03-18)
14. "From RAG to Agentic RAG for Faithful Islamic Question Answering" — arXiv:2601.07528 (2026)
15. "The Cross-Lingual Cost: Retrieval Biases in RAG over Arabic-English Corpora" — arXiv:2507.07543 (2025)
16. "Optimizing RAG Pipelines for Arabic" — arXiv:2506.06339 (2025)
17. Ziyara GPS — Official site: http://www.ziyaragps.com/ (accessed 2026-03-18)
18. Hajj essential apps overview — Hajj Companions: https://hajjcompanions.com/blogs/hajj-mobile-apps-you-need-to-download-translation-prayer-times-navigation/ (accessed 2026-03-18)

---

*This competitive analysis was generated by Idea Forge using web research data gathered on 2026-03-18.
All competitor details reflect publicly available information at the time of research.*
