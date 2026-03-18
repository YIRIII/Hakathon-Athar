# Bilingual PWA Framework

**Linked BRD Requirements**: BR-5 (Bilingual interface — Arabic primary, RTL, with English toggle)
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md)
**Priority**: Must Have
**Tier**: Supporting (standard research)

---

## 1. Context & BRD Alignment

BR-5 requires a bilingual interface with Arabic as the primary language (RTL layout) and English as a secondary toggle. Arabic is legally mandatory for Saudi consumer-facing apps, and English is essential for the 63%+ Asian pilgrim demographic. Phase 2 expands to 8+ languages (Urdu, Indonesian, Turkish, Bengali, Malay, French).

This capability has two distinct sub-components:

1. **Internationalization (i18n) Framework** — managing translation strings, locale switching, RTL/LTR layout toggling, and pluralization rules across languages.
2. **PWA Configuration** — service worker registration, web app manifest, offline caching strategies, and install prompt handling.

The platform runs Next.js + React on Vercel, so all options must integrate cleanly with the Next.js App Router (13+/14+/15+) and support SSR/SSG for SEO.

---

## 2. Capability-Specific KPIs

### Sub-Component A: i18n Framework

| KPI | Description | BRD Target | Weight |
|-----|-------------|------------|--------|
| RTL/LTR Quality | Native RTL support, bidirectional text handling, layout mirroring | Full Arabic RTL with seamless toggle | High (3x) |
| App Router Compatibility | Native Next.js App Router + Server Components support | Next.js 14+/15+ App Router | High (3x) |
| Bundle Size | Client-side JavaScript added (gzipped) | Minimal — PWA must load fast on 3G | High (3x) |
| TypeScript Support | Type-safe translation keys, autocompletion | Full TypeScript support | Medium (2x) |
| Language Scalability | Ease of adding languages without refactoring | 8+ languages in Phase 2 | Medium (2x) |
| SSR/SSG Support | Server-side rendering of translated content for SEO | Full SSR/SSG | Medium (2x) |
| Developer Experience | API ergonomics, documentation quality, setup complexity | Clean API, good docs | Low (1x) |
| Maintenance & Community | Active development, release cadence, community size | Actively maintained | Low (1x) |
| Year 1 Cost | Total cost including licensing and dev time | $0 (open-source) | Low (1x) |

### Sub-Component B: PWA Configuration

| KPI | Description | BRD Target | Weight |
|-----|-------------|------------|--------|
| Next.js Integration | Plugin/wrapper quality for Next.js App Router | Seamless Next.js 14+/15+ | High (3x) |
| Offline Caching | Service worker strategies, precaching, runtime caching | Offline heritage content access | High (3x) |
| Maintenance Status | Active development, last release, community adoption | Actively maintained | Medium (2x) |
| Configuration Simplicity | Setup effort, configuration options, customizability | Quick setup for bootstrapped team | Medium (2x) |
| Bundle/Overhead | Service worker size and build impact | Minimal | Low (1x) |
| Year 1 Cost | Total cost | $0 (open-source) | Low (1x) |

---

## 3. Market Landscape

### Sub-Component A: i18n Framework

The Next.js i18n ecosystem has consolidated significantly since the App Router became the default. **next-intl** has emerged as the dominant App Router-native solution, growing ~4x in downloads over the past 12 months. The older **next-i18next** (Pages Router era) is declining as it has no native App Router support. **react-intl** (FormatJS) and **LinguiJS** remain viable cross-framework options but require more manual wiring for Next.js App Router integration.

#### All Viable Options Identified

| # | Option | Type | Weekly npm Downloads | GitHub Stars | Last Updated |
|---|--------|------|---------------------|--------------|-------------|
| 1 | **next-intl** | OSS (Next.js-native) | ~1,000,000 | ~3,800 | Mar 2026 (v4.8.3) |
| 2 | **react-i18next** (+ i18next) | OSS (framework-agnostic) | ~4,500,000 (react-i18next) | ~9,000+ (i18next) | Active |
| 3 | **react-intl** (FormatJS) | OSS (React-focused) | ~1,100,000 | ~14,000 | Active |
| 4 | **LinguiJS** (@lingui/react) | OSS (macro-based) | ~370,000–430,000 | ~5,600 | Active (RSC support v4.10+) |
| 5 | **next-i18next** | OSS (Pages Router) | ~494,000 | ~5,500 | Declining — no App Router |
| 6 | **Custom solution** (Next.js built-in) | Custom | N/A | N/A | N/A |

### Sub-Component B: PWA Configuration

The Next.js PWA space has a clear succession path: the original **next-pwa** (shadowwalker, unmaintained) was forked into **@ducanh2912/next-pwa**, which is now itself being superseded by **Serwist** (a Workbox fork). Serwist is recommended by Next.js official documentation. Direct **Workbox** usage remains an option for maximum control.

#### All Viable Options Identified

| # | Option | Type | Weekly npm Downloads | GitHub Stars | Last Updated |
|---|--------|------|---------------------|--------------|-------------|
| 1 | **Serwist** (@serwist/next) | OSS (Workbox fork) | ~26,000+ (@serwist/next) | ~1,400 | Mar 2026 (v9.5.7) |
| 2 | **@ducanh2912/next-pwa** | OSS (next-pwa fork) | ~38,000 | ~1,000 | Last release ~1 year ago |
| 3 | **Workbox** (direct) | OSS (Google) | ~1,000,000+ | ~12,000+ | Active |
| 4 | **Custom service worker** | Custom | N/A | N/A | N/A |
| 5 | **next-pwa** (shadowwalker) | OSS (original) | Declining | ~3,600 | Unmaintained since 2022 |

---

## 4. Full Options Rating

### Sub-Component A: i18n Framework

| Option | RTL/LTR (3x) | App Router (3x) | Bundle Size (3x) | TypeScript (2x) | Scalability (2x) | SSR/SSG (2x) | DX (1x) | Maintenance (1x) | Cost (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **next-intl** | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | **5.00** |
| **react-i18next** | 4 | 3 | 3 | 4 | 5 | 4 | 3 | 5 | 5 | **3.83** |
| **LinguiJS** | 4 | 4 | 5 | 4 | 4 | 4 | 4 | 4 | 5 | **4.22** |
| **react-intl** | 4 | 3 | 2 | 4 | 5 | 3 | 3 | 4 | 5 | **3.44** |
| **next-i18next** | 4 | 1 | 3 | 4 | 5 | 4 | 4 | 2 | 5 | **3.06** |
| **Custom** | 3 | 5 | 5 | 3 | 2 | 3 | 1 | 1 | 5 | **3.22** |

**Calculation for next-intl**: (5×3 + 5×3 + 5×3 + 5×2 + 5×2 + 5×2 + 5×1 + 5×1 + 5×1) / (3+3+3+2+2+2+1+1+1) = 90/18 = **5.00**

**Calculation for LinguiJS**: (4×3 + 4×3 + 5×3 + 4×2 + 4×2 + 4×2 + 4×1 + 4×1 + 5×1) / 18 = (12+12+15+8+8+8+4+4+5)/18 = 76/18 = **4.22**

### Sub-Component B: PWA Configuration

| Option | Next.js Integration (3x) | Offline Caching (3x) | Maintenance (2x) | Config Simplicity (2x) | Bundle (1x) | Cost (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Serwist** | 5 | 5 | 5 | 4 | 4 | 5 | **4.75** |
| **@ducanh2912/next-pwa** | 4 | 4 | 2 | 5 | 4 | 5 | **3.83** |
| **Workbox (direct)** | 3 | 5 | 4 | 2 | 4 | 5 | **3.67** |
| **Custom SW** | 2 | 3 | 1 | 1 | 5 | 5 | **2.50** |
| **next-pwa (original)** | 2 | 3 | 1 | 4 | 4 | 5 | **2.75** |

**Calculation for Serwist**: (5×3 + 5×3 + 5×2 + 4×2 + 4×1 + 5×1) / (3+3+2+2+1+1) = (15+15+10+8+4+5)/12 = 57/12 = **4.75**

---

## 5. Top Recommended Options

### i18n: Option 1 — next-intl ⭐ Recommended

- **Approach**: Integrate (open-source library)
- **Provider**: Florian Lewe (amannn) — open-source, MIT license
- **Overview**: Next.js-native i18n library built specifically for the App Router era. Provides Server Component support via `getTranslations()`, locale-aware routing with middleware, JSON-based message dictionaries, and ICU MessageFormat for pluralization. Arabic plural forms (zero, one, two, few, many, other) are fully supported.
- **Version**: 4.8.3 (March 2026)
- **npm**: ~1,000,000 weekly downloads ([npm](https://www.npmjs.com/package/next-intl))
- **GitHub**: ~3,800 stars ([GitHub](https://github.com/amannn/next-intl))
- **KPI Performance**:
  - RTL/LTR: Native support; dir attribute and layout direction handled per-locale; Arabic plural categories supported
  - App Router: Built for App Router from the ground up; `useTranslations()` client hook + `getTranslations()` server function
  - Bundle Size: ~2 KB client-side (translations render on server with zero client JS via Server Components) — [source: Medium comparison article](https://medium.com/better-dev-nextjs-react/the-best-i18n-libraries-for-next-js-app-router-in-2025-21cb5ab2219a)
  - TypeScript: Full type safety for translation keys with autocompletion
  - Scalability: JSON namespaces per locale scale to any number of languages
  - SSR/SSG: Native — translations resolved at server render time
- **Pricing**: Free, MIT license
- **Pros**:
  - Purpose-built for Next.js App Router — zero friction
  - Minimal client bundle (~2 KB) thanks to Server Component architecture
  - 4x growth in adoption over 12 months — clear community momentum
  - Built-in locale-aware routing with middleware
  - Arabic plural forms and RTL fully supported
  - Excellent documentation with App Router examples
- **Cons**:
  - Next.js-specific — not portable to non-Next.js projects (acceptable for Athar)
  - Middleware-based routing can increase middleware bundle size if not configured carefully ([GitHub issue #814](https://github.com/amannn/next-intl/issues/814))
- **Integration Notes**: Install `next-intl`, configure `next.config.ts` with the plugin, create `messages/ar.json` and `messages/en.json`, add middleware for locale detection, wrap layout with `NextIntlClientProvider`. RTL toggling handled via `dir` attribute on `<html>` based on active locale.
- **BRD Alignment**: Directly satisfies BR-5 (bilingual Arabic/English with toggle). JSON namespace structure supports Phase 2 expansion to 8+ languages with zero refactoring.

### i18n: Option 2 — LinguiJS

- **Approach**: Integrate (open-source library)
- **Provider**: Lingui team — open-source, MIT license
- **Overview**: Macro-based i18n framework that compiles messages at build time into optimized JS functions. Supports React Server Components since v4.10. Uses ICU MessageFormat with automatic extraction.
- **Version**: 5.x (2025–2026)
- **npm**: ~370,000–430,000 weekly downloads ([npm](https://www.npmjs.com/package/@lingui/react))
- **GitHub**: ~5,600 stars ([GitHub](https://github.com/lingui/js-lingui))
- **KPI Performance**:
  - RTL/LTR: Full ICU support including Arabic plurals; RTL layout management is manual (developer responsibility)
  - App Router: RSC support added in v4.10; requires additional configuration vs. next-intl
  - Bundle Size: ~2.5 KB (@lingui/react gzipped) + 7.9 KB (@lingui/core) = ~10.4 KB total — [source: Lingui docs](https://lingui.dev/misc/react-intl)
  - TypeScript: Good type safety with typed message catalogs
  - Scalability: Compiled message catalogs scale well; extraction tooling handles large projects
- **Pricing**: Free, MIT license
- **Pros**:
  - Compile-time message optimization reduces runtime overhead
  - Automatic message extraction from source code
  - Framework-agnostic core — portable if stack changes
  - Growing community (5.6K stars)
- **Cons**:
  - Requires build toolchain (Babel/SWC macro) configuration — more setup than next-intl
  - App Router support is newer and less battle-tested than next-intl's native integration
  - Smaller Next.js-specific community and fewer tutorials
- **BRD Alignment**: Satisfies BR-5 but requires more integration effort than next-intl for the Next.js App Router stack.

### PWA: Option 1 — Serwist ⭐ Recommended

- **Approach**: Integrate (open-source library)
- **Provider**: Serwist team — open-source, fork of Workbox
- **Overview**: A modern service worker toolkit that evolved from @ducanh2912/next-pwa and Workbox. Provides `@serwist/next` plugin for seamless Next.js integration with precaching, runtime caching, offline fallback, and install prompt support.
- **Version**: 9.5.7 (March 2026)
- **npm**: ~26,000+ weekly downloads for @serwist/next ([npm](https://www.npmjs.com/package/serwist))
- **GitHub**: ~1,400 stars ([GitHub](https://github.com/serwist/serwist))
- **KPI Performance**:
  - Next.js Integration: Official `@serwist/next` wrapper; recommended in Next.js docs — [source: Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps)
  - Offline Caching: Full Workbox strategies (CacheFirst, NetworkFirst, StaleWhileRevalidate); precaching with revision control; IndexedDB for structured data
  - Maintenance: Actively maintained — last release 2 days ago as of March 2026
  - Config: `withSerwistInit()` wrapper in next.config.ts + custom sw.ts file
- **Pricing**: Free, MIT license
- **Pros**:
  - Actively maintained successor to next-pwa — clear migration path
  - Recommended by Next.js official documentation
  - Full Workbox caching strategy suite
  - Turbopack support via @serwist/turbopack
  - Offline fallback pages built-in
- **Cons**:
  - Requires Webpack for standard builds (Turbopack support via separate package)
  - More configuration than the simpler @ducanh2912/next-pwa defaults
  - Smaller community than Workbox directly (1.4K stars vs 12K+)
- **Integration Notes**: Install `@serwist/next`, `serwist`. Configure `next.config.ts` with `withSerwistInit({ swSrc: "app/sw.ts", swDest: "public/sw.js" })`. Create `sw.ts` with precache manifest and runtime caching rules. Add `manifest.json` to public/ with app name, icons, theme color, and `display: "standalone"`.
- **BRD Alignment**: Enables the zero-friction PWA access model (scan QR → instant use) required by the BRD. Offline caching ensures heritage content is available in areas with poor connectivity (common around heritage sites).

### PWA: Option 2 — @ducanh2912/next-pwa

- **Approach**: Integrate (open-source library)
- **Provider**: DuCanhGH — open-source fork of original next-pwa
- **Overview**: A maintained fork of next-pwa with Workbox 7 support and Next.js 14 compatibility. Simpler configuration than Serwist but development has slowed.
- **npm**: ~38,000 weekly downloads
- **Pricing**: Free, MIT license
- **Pros**:
  - Simpler zero-config defaults — `withPWA()` wrapper handles most cases
  - Higher current download count than Serwist
- **Cons**:
  - Last release ~1 year ago — maintenance concerns
  - Official recommendation is to migrate to Serwist
  - Single maintainer
- **BRD Alignment**: Functional but the maintenance trajectory is a risk for a project launching in 2026.

---

## 6. Non-Recommended Options

### i18n

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| react-i18next | OSS | Framework-agnostic, requires significant manual wiring for Next.js App Router Server Components; no built-in locale routing; scored 3.83 vs next-intl's 5.00 |
| react-intl (FormatJS) | OSS | Larger bundle (~32 KB gzipped); no native Next.js App Router support; requires wrapper components for Server Components; scored 3.44 |
| next-i18next | OSS | **No App Router support** — built for Pages Router only; maintainers recommend react-i18next for App Router; scored 3.06. Disqualifying for a new Next.js project. |
| Custom solution | Custom | High development effort, no pluralization/ICU support, no locale routing, unmaintainable at 8+ languages; scored 3.22 |

### PWA

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| Workbox (direct) | OSS | Powerful but requires extensive manual configuration for Next.js; no Next.js-specific plugin; higher setup effort for a bootstrapped team; scored 3.67 |
| Custom service worker | Custom | Maximum control but significant development effort for caching strategies, update flows, and offline handling; scored 2.50 |
| next-pwa (shadowwalker) | OSS | Unmaintained since 2022; incompatible with Next.js 14+; security risk; scored 2.75 |

---

## 7. Recommendation

### Recommended Composite: next-intl + Serwist

**Combined weighted scores**: next-intl 5.00 (i18n) + Serwist 4.75 (PWA) — the clear winners in both sub-components.

**Rationale**:

- **BR-5 compliance**: next-intl provides native Arabic RTL support with ICU plural forms (zero/one/two/few/many/other) essential for grammatically correct Arabic, plus seamless English toggle via locale-aware routing. Serwist enables the instant PWA access model (QR scan → use) required by the BRD.
- **Stack alignment**: Both are purpose-built for Next.js App Router on Vercel. Zero friction with the existing technology choices.
- **Bundle efficiency**: next-intl adds ~2 KB to client bundle (translations resolve on server). Serwist's service worker operates independently of the main bundle. Combined overhead is negligible — critical for 3G performance in heritage site areas.
- **Phase 2 readiness**: next-intl's JSON namespace structure scales to 8+ languages by simply adding locale files. No refactoring needed.
- **Cost**: $0 — both are MIT-licensed open-source projects.
- **Maintenance confidence**: next-intl has ~1M weekly downloads with 4x growth; Serwist released v9.5.7 days ago and is recommended in official Next.js documentation.

**Year 1 Estimated Cost**: **$0** (both open-source, MIT license). Developer integration effort estimated at 2–3 days for i18n setup + 1–2 days for PWA configuration = ~4–5 days total.

**Conditions that would change this recommendation**:
- If the project migrates away from Next.js → switch i18n to LinguiJS (framework-agnostic)
- If Serwist development stalls → fallback to direct Workbox (same underlying technology)
- If next-intl middleware causes Vercel middleware size issues → use the non-middleware routing approach documented in next-intl v4+

**Runner-up**: LinguiJS (i18n) + @ducanh2912/next-pwa (PWA) — viable if compile-time optimization is desired for i18n and simpler PWA config is preferred, but both have weaker Next.js App Router integration and maintenance trajectories.

---

## 8. Score Rationales

### next-intl (i18n — Score: 5.00)

| KPI | Score | Rationale |
|-----|-------|-----------|
| RTL/LTR Quality | 5 | Native RTL support via locale-aware `dir` attribute; full Arabic plural categories; designed for bidirectional apps |
| App Router Compatibility | 5 | Built from the ground up for App Router; `getTranslations()` for Server Components, `useTranslations()` for Client Components; locale-aware middleware routing |
| Bundle Size | 5 | ~2 KB client-side; translations resolve on server via Server Components — best-in-class for the Next.js ecosystem |
| TypeScript Support | 5 | Full type safety for translation keys with autocompletion; strict mode available |
| Language Scalability | 5 | JSON namespaces per locale; add languages by creating new JSON files; namespace splitting for code-splitting |
| SSR/SSG Support | 5 | Native — translations resolved at server render time; full SSG support with `generateStaticParams` |
| Developer Experience | 5 | Clean hook-based API; excellent documentation; active Discord community; many tutorials |
| Maintenance & Community | 5 | ~1M weekly downloads; 4x growth in 12 months; regular releases; single dedicated maintainer with strong track record |
| Year 1 Cost | 5 | Free, MIT license |

### Serwist (PWA — Score: 4.75)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Next.js Integration | 5 | Official `@serwist/next` wrapper; recommended in Next.js docs; Turbopack support via @serwist/turbopack |
| Offline Caching | 5 | Full Workbox strategy suite (CacheFirst, NetworkFirst, StaleWhileRevalidate); precaching with revision control; offline fallback pages |
| Maintenance Status | 5 | v9.5.7 released days ago (March 2026); active development; clear roadmap |
| Config Simplicity | 4 | Requires custom sw.ts file and withSerwistInit config — more setup than @ducanh2912/next-pwa's zero-config but well-documented |
| Bundle/Overhead | 4 | Service worker is separate from main bundle; precache manifest adds build step but no runtime overhead |
| Year 1 Cost | 5 | Free, MIT license |

### LinguiJS (i18n — Score: 4.22)

| KPI | Score | Rationale |
|-----|-------|-----------|
| RTL/LTR Quality | 4 | Full ICU MessageFormat including Arabic plurals; RTL layout management is developer responsibility (no built-in dir switching) |
| App Router Compatibility | 4 | RSC support since v4.10; works but requires more manual configuration than next-intl |
| Bundle Size | 5 | ~2.5 KB (@lingui/react) gzipped; compiled messages reduce runtime parsing overhead |
| TypeScript Support | 4 | Typed message catalogs via codegen; good but less seamless than next-intl's native TS |
| Language Scalability | 4 | Compiled catalogs scale well; extraction tooling handles large projects; slightly more build complexity per language |
| SSR/SSG Support | 4 | Works with SSR/SSG but requires more setup than next-intl for Next.js specifically |
| Developer Experience | 4 | Macro-based API is clean; auto-extraction is powerful; fewer Next.js-specific tutorials |
| Maintenance & Community | 4 | 5.6K stars; active development; smaller Next.js-specific community than next-intl |
| Year 1 Cost | 5 | Free, MIT license |

---

## 9. Implementation Architecture

### i18n Setup (next-intl)

```
messages/
├── ar.json          # Arabic translations (primary)
├── en.json          # English translations
├── ur.json          # Phase 2: Urdu
├── id.json          # Phase 2: Indonesian
└── ...
```

- **Middleware**: `middleware.ts` with `createMiddleware()` for locale detection (Accept-Language header, cookie preference, URL prefix)
- **Layout**: `app/[locale]/layout.tsx` wraps content with `NextIntlClientProvider`
- **Server Components**: `getTranslations()` — zero client JS for translated static content
- **Client Components**: `useTranslations()` hook for interactive elements
- **RTL Toggle**: `<html lang={locale} dir={locale === 'ar' || locale === 'ur' ? 'rtl' : 'ltr'}>`

### PWA Setup (Serwist)

- **Manifest**: `public/manifest.json` with `name`, `short_name` (in Arabic), icons, `display: standalone`, `dir: rtl`, `lang: ar`
- **Service Worker**: `app/sw.ts` with precache manifest for static heritage content + runtime caching for API responses
- **Offline Strategy**: CacheFirst for heritage images/audio; NetworkFirst for dynamic content; StaleWhileRevalidate for API calls
- **Install Prompt**: Deferred `beforeinstallprompt` event for custom Arabic/English install banner

---

*Research conducted: March 2026. All npm download counts, GitHub stars, and version numbers reflect data available at time of research. Pricing and maintenance status should be revalidated before implementation.*

*Sources: [next-intl GitHub](https://github.com/amannn/next-intl), [next-intl npm](https://www.npmjs.com/package/next-intl), [Serwist GitHub](https://github.com/serwist/serwist), [Serwist docs](https://serwist.pages.dev/docs/next/getting-started), [Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps), [LinguiJS GitHub](https://github.com/lingui/js-lingui), [i18n comparison (Medium)](https://medium.com/better-dev-nextjs-react/the-best-i18n-libraries-for-next-js-app-router-in-2025-21cb5ab2219a), [Lingui vs react-intl](https://lingui.dev/misc/react-intl), [i18next vs next-intl](https://i18nexus.com/posts/i18next-vs-next-intl)*
