# Social Sharing & Referral System

**Linked BRD Requirements**: BR-social-sharing, BR-referral-system, BR-viral-growth
**BRD Reference**: [BRD.md](../BRD.md)
**Priority**: Supporting (Marketing-Driven)

---

## 1. Context & BRD Alignment

The Athar heritage discovery platform relies on organic viral growth as a primary acquisition channel. The Marketing Strategy identified **certificate sharing** (heritage site visit certificates) as the PRIMARY viral loop, with Saudi users spending 3+ hours daily on social media. Key platforms for the Saudi market are Instagram Stories, WhatsApp, Twitter/X, and Snapchat.

This capability covers three sub-components:
1. **Web Share API & Social Sharing** — Native sharing from the PWA to social platforms
2. **Deep Linking** — Invite links that open the PWA with referral attribution
3. **Open Graph / Social Media Previews** — Rich link previews when sharing Athar URLs

The system must work within a PWA context (Next.js on Vercel) with Supabase as the backend, on a bootstrapped budget prioritizing free/low-cost solutions.

## 2. Capability-Specific KPIs

| KPI | Description | Target | Weight |
|-----|-------------|--------|--------|
| Platform Coverage | Support for Instagram, WhatsApp, Twitter/X, Snapchat | All 4 platforms | High |
| PWA/Browser Compatibility | Web Share API support across mobile browsers | >90% Saudi mobile users | High |
| Deep Link Attribution | Track referral source through invite links | 100% attribution | High |
| OG Tag Management | Dynamic Open Graph images/metadata per page | Per-page dynamic OG | Medium |
| Year 1 Cost | Total cost for bootstrap tier | $0 (free tier) | High |
| Implementation Complexity | Developer effort to integrate | <2 weeks | Medium |
| React/Next.js Integration | Native compatibility with stack | Seamless | Medium |

## 3. Market Landscape

Social sharing from PWAs is a well-solved space. The **Web Share API** has reached 94.2% global browser support (per caniuse.com, March 2026), making it the dominant approach for mobile sharing. For desktop fallbacks, libraries like `react-share` provide platform-specific share intent URLs.

Deep linking for PWAs is simpler than native apps — since PWAs are web-based, standard URLs with UTM parameters provide full attribution without requiring SDKs like Branch.io. Firebase Dynamic Links has been **deprecated** (Google, 2024) and is shutting down, removing it as a viable option.

Open Graph image generation is natively supported in Next.js via `@vercel/og` (included in App Router — no extra install needed), making dynamic social previews effectively free on Vercel.

### All Viable Options Identified

**Sub-component 1: Social Sharing**
1. Web Share API (native browser) + fallback buttons
2. react-share library (intent URL-based)
3. next-share library (Next.js-specific wrapper)
4. Custom share intent URLs (manual implementation)
5. AddThis / ShareThis (third-party widgets)
6. Native platform SDKs (Instagram, WhatsApp business API)

**Sub-component 2: Deep Linking**
1. Custom UTM parameters + Supabase referral tracking
2. Branch.io (commercial deep linking platform)
3. Firebase Dynamic Links (deprecated — shutting down)
4. Adjust (commercial mobile attribution)
5. AppsFlyer (commercial mobile attribution)

**Sub-component 3: Open Graph Previews**
1. Next.js built-in Metadata API + `@vercel/og`
2. next-seo library
3. react-helmet (client-side only — not suitable for OG)
4. Manual `<meta>` tag management
5. Cloudinary OG image generation

## 4. Full Options Rating

### Sub-component 1: Social Sharing

| Option | Platform Coverage | PWA Compat. | Cost | Complexity | Next.js Fit | Overall |
|--------|------------------|-------------|------|------------|-------------|---------|
| Web Share API + fallback | 5 (all via OS share sheet) | 5 (94.2% global) | 5 ($0) | 4 (minimal code) | 5 (native) | **4.8** |
| react-share | 4 (23+ platforms, no Snapchat native) | 4 (works everywhere) | 5 ($0, OSS) | 5 (drop-in) | 4 (React native) | **4.4** |
| next-share | 4 (similar to react-share) | 4 | 5 ($0, OSS) | 5 | 5 (Next.js optimized) | **4.5** |
| Custom intent URLs | 4 (manual per-platform) | 5 | 5 ($0) | 2 (manual maintenance) | 4 | **3.8** |
| AddThis/ShareThis | 3 (limited customization) | 3 (heavy JS) | 3 (free tier limited) | 5 (plug-and-play) | 2 (external scripts) | **3.0** |
| Native platform SDKs | 2 (per-platform effort) | 2 (limited in PWA) | 4 | 1 (huge effort) | 2 | **2.0** |

### Sub-component 2: Deep Linking

| Option | Attribution | PWA Compat. | Cost | Complexity | Next.js Fit | Overall |
|--------|------------|-------------|------|------------|-------------|---------|
| Custom UTM + Supabase | 5 (full control) | 5 (native URLs) | 5 ($0) | 3 (build tracking) | 5 | **4.6** |
| Branch.io | 5 (industry-leading) | 4 | 2 (paid after trial) | 4 (SDK) | 3 | **3.4** |
| Firebase Dynamic Links | N/A | N/A | N/A | N/A | N/A | **N/A (deprecated)** |
| Adjust | 5 | 3 (native-app focused) | 1 (enterprise pricing) | 3 | 2 | **2.4** |
| AppsFlyer | 5 | 3 (native-app focused) | 1 (enterprise pricing) | 3 | 2 | **2.4** |

### Sub-component 3: Open Graph Previews

| Option | Dynamic OG | Arabic Support | Cost | Complexity | Next.js Fit | Overall |
|--------|-----------|---------------|------|------------|-------------|---------|
| Next.js Metadata API + @vercel/og | 5 (per-page dynamic) | 5 (custom fonts) | 5 ($0, built-in) | 5 (native) | 5 | **5.0** |
| next-seo | 4 (metadata only, no images) | 4 | 5 ($0, OSS) | 4 | 5 | **4.2** |
| Manual meta tags | 3 (error-prone) | 4 | 5 ($0) | 2 | 3 | **3.2** |
| Cloudinary OG | 5 | 4 | 3 (usage-based) | 3 (external API) | 3 | **3.4** |
| react-helmet | 1 (client-side only) | 3 | 5 ($0) | 3 | 1 (not SSR) | **2.2** |

## 5. Top Recommended Options

### Option 1: Web Share API + react-share Fallback + Custom UTM/Supabase + Next.js Metadata API ⭐ Recommended (Integrated Approach)

- **Approach**: Build (custom integration of free/native technologies)
- **Provider**: Browser-native + react-share (OSS, 2.8K GitHub stars) + Supabase + Next.js built-in
- **Overview**: A layered approach combining the best free option for each sub-component:
  - **Sharing**: Web Share API as primary (94.2% browser support per caniuse.com), with react-share buttons as desktop/Firefox fallback
  - **Deep Linking**: Custom UTM parameters parsed by Next.js middleware, with referral codes stored in Supabase
  - **OG Previews**: Next.js `generateMetadata()` for dynamic per-page metadata + `@vercel/og` (`ImageResponse`) for dynamic OG images with Arabic text and heritage site visuals

- **KPI Performance**:
  - **Platform Coverage**: All 4 target platforms. Web Share API opens the OS native share sheet on mobile, which includes WhatsApp, Instagram, Twitter/X, Snapchat, and every other installed app. react-share provides direct WhatsApp, Twitter, and Telegram buttons as fallback (23+ platforms supported).
    - *Source: caniuse.com "web-share" — 94.2% global support, March 2026*
  - **PWA Compatibility**: Web Share API supported on Chrome Android (v145+), Safari iOS (v12.2+), Samsung Internet (v8.2+). Desktop Firefox is the only gap — react-share covers this.
    - *Source: caniuse.com, MDN Web Docs*
  - **Deep Link Attribution**: UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) parsed server-side in Next.js middleware. Referral codes stored in Supabase with full attribution chain. GA4 auto-recognizes UTM parameters.
    - *Source: Google Analytics 4 documentation*
  - **OG Tag Management**: Next.js `generateMetadata()` supports static and dynamic metadata per route segment. `@vercel/og` generates dynamic images using JSX/CSS with custom font support (critical for Arabic text). Built into Next.js App Router — no extra package needed.
    - *Source: Next.js v16 docs, Vercel OG docs*
  - **Year 1 Cost**: $0. All components are free — Web Share API is browser-native, react-share is MIT-licensed OSS, UTM tracking is free with GA4, Supabase free tier covers referral tracking, `@vercel/og` is included with Vercel hosting.

- **Pricing**: $0/year
  - Web Share API: Free (browser-native)
  - react-share: Free (MIT license, npm package)
  - UTM tracking: Free (GA4 built-in)
  - Supabase referral table: Free tier (500MB database, 50K MAU auth)
  - @vercel/og: Free (included in Vercel hobby/pro plan, runs as serverless function)

- **Pros**:
  - Zero cost — entirely free stack
  - Native OS share sheet on mobile gives access to ALL installed apps (including Snapchat, which has no web share intent URL)
  - No external SDK dependencies — no third-party scripts to load
  - Full control over referral tracking logic in Supabase
  - Dynamic Arabic OG images for heritage certificate sharing (key viral loop)
  - react-share is tree-shakeable — only import buttons for platforms you need
  - Next.js Metadata API handles OG tag merging across route segments automatically

- **Cons**:
  - Web Share API requires HTTPS (standard for production PWAs) and user gesture (button click)
  - Desktop Firefox does not support Web Share API — needs fallback buttons
  - Custom referral tracking requires building the Supabase schema and middleware (1-2 days)
  - No built-in referral reward system — must build gamification logic separately
  - `@vercel/og` supports only flexbox layout (no CSS grid) and limited font formats (ttf, otf, woff)

- **Integration Notes**:
  ```typescript
  // Web Share API usage in React component
  const handleShare = async (siteData) => {
    if (navigator.share) {
      await navigator.share({
        title: siteData.name,
        text: `Discover ${siteData.name} on Athar!`,
        url: `https://athar.app/site/${siteData.slug}?ref=${userCode}`
      });
    } else {
      // Fallback to react-share buttons
      setShowFallbackButtons(true);
    }
  };
  ```

  Next.js dynamic metadata:
  ```typescript
  // app/site/[slug]/page.tsx
  export async function generateMetadata({ params }): Promise<Metadata> {
    const site = await getSite(params.slug);
    return {
      openGraph: {
        title: site.name,
        description: site.description,
        images: [`/api/og?site=${params.slug}`], // Dynamic OG image
      },
      twitter: { card: 'summary_large_image' }
    };
  }
  ```

- **BRD Alignment**: Directly supports viral growth requirements. Certificate sharing (the primary viral loop from Marketing Strategy) benefits from: (1) native share sheet for frictionless sharing, (2) beautiful Arabic OG preview images generated dynamically, (3) full UTM attribution to measure viral coefficient.

### Option 2: react-share Only (No Web Share API)

- **Approach**: Build (OSS library)
- **Provider**: react-share (npm, MIT license, 2.8K GitHub stars)
- **Overview**: Use react-share buttons exclusively for all sharing, skipping Web Share API entirely. Provides platform-specific share buttons using intent URLs (e.g., `https://wa.me/?text=...` for WhatsApp, `https://twitter.com/intent/tweet?text=...` for Twitter/X).

- **KPI Performance**:
  - Platform Coverage: 23+ platforms including WhatsApp, Twitter/X, Telegram, Facebook, LinkedIn. **No Snapchat support** (Snapchat has no web share intent URL).
  - PWA Compatibility: Works on all browsers (uses standard URLs, no API dependency)
  - Cost: $0 (MIT license)

- **Pricing**: $0/year

- **Pros**:
  - Consistent UI across all devices (custom-styled buttons)
  - No browser compatibility concerns
  - Tree-shakeable — minimal bundle impact
  - 23+ platforms supported out of the box

- **Cons**:
  - **Cannot share to Snapchat** (no web intent URL — Snapchat is massive in Saudi Arabia)
  - Cannot share to any app not explicitly coded — misses the long tail of messaging apps
  - More friction than native share sheet (user must choose from visible buttons vs OS picker)
  - Intent URLs open in new tabs/windows rather than native app share flows on some platforms

- **Integration Notes**: Drop-in React components. `<WhatsappShareButton url={shareUrl}><WhatsappIcon /></WhatsappShareButton>`

- **BRD Alignment**: Adequate for basic sharing but **misses Snapchat**, which is critical for the Saudi youth demographic. The marketing strategy specifically identified Snapchat as a key platform.

### Option 3: Branch.io (Commercial Deep Linking)

- **Approach**: License (commercial platform)
- **Provider**: Branch.io
- **Overview**: Industry-leading deep linking and attribution platform. Creates smart links that work across web and native apps, with deferred deep linking (installs app then routes to content).

- **KPI Performance**:
  - Deep Link Attribution: Industry-leading, cross-platform attribution
  - Platform Coverage: Comprehensive — works with all platforms
  - Cost: Free trial on Basics plan (limited to 3 ad partners, 3 webhooks). Paid plans require sales contact — typically $500-2,000+/month for startups.
    - *Source: Branch.io pricing page, March 2026*

- **Pricing**: Free trial → $500-2,000+/month (estimated, contact sales required)

- **Pros**:
  - Most sophisticated attribution in the market
  - Deferred deep linking (useful if Athar ever becomes a native app)
  - Analytics dashboard included

- **Cons**:
  - **Overkill for a PWA** — Branch.io's core value is native app deep linking, which a PWA doesn't need
  - Expensive for a bootstrapped project once past the free trial
  - Adds external SDK dependency and additional JavaScript payload
  - Free tier severely limited (3 ad partners, 3 webhooks)
  - Vendor lock-in on attribution data

- **BRD Alignment**: Exceeds requirements but at unnecessary cost. A PWA can use standard URLs with UTM parameters for the same attribution capability at $0.

## 6. Non-Recommended Options

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| AddThis / ShareThis | Commercial widget | Heavy JavaScript payload (~100KB+), limited customization, privacy concerns (user tracking), poor PWA integration, ads on free tier |
| Native Platform SDKs | Commercial APIs | Require individual integration per platform, most require native app context (not PWA-compatible), enormous implementation effort |
| Firebase Dynamic Links | Google (deprecated) | **Deprecated and shutting down** — cannot be used in new projects. Google has not announced a direct replacement. Source: Firebase documentation, 2024 |
| Adjust | Commercial attribution | Enterprise-focused, minimum commitments typically $1,000+/month, designed for native mobile apps not PWAs |
| AppsFlyer | Commercial attribution | Enterprise-focused, similar pricing to Adjust, native-app-centric SDK, overkill for PWA referral tracking |
| next-share | OSS (Next.js wrapper) | Less maintained than react-share, smaller community, adds unnecessary abstraction layer over react-share |
| react-helmet | OSS (meta tags) | Client-side only rendering — social media crawlers (Facebook, Twitter) cannot read client-rendered OG tags. Incompatible with SSR/SSG metadata requirements |
| Cloudinary OG images | Commercial (usage-based) | Adds cost ($0.01-0.02 per transformation), external dependency, slower than edge-rendered @vercel/og, unnecessary when Next.js built-in solution exists |
| Manual meta tags | Custom build | Error-prone, no automatic route merging, duplicates functionality already built into Next.js Metadata API |

## 7. Recommendation

**Recommended: Integrated Free Stack (Web Share API + react-share + Custom UTM/Supabase + Next.js Metadata API)**

This recommendation delivers full social sharing, referral tracking, and rich link preview capability at **$0 Year 1 cost** — ideal for the bootstrapped budget.

**Rationale:**

1. **Web Share API solves the Snapchat problem.** Snapchat has no web share intent URL, but the OS-level share sheet triggered by Web Share API includes Snapchat if installed. Given Snapchat's dominance in Saudi Arabia (especially among youth), this is critical. Browser support is 94.2% globally and near-universal on Saudi mobile devices (Chrome Android + Safari iOS cover 95%+ of the Saudi mobile market).

2. **UTM + Supabase matches Branch.io for PWA use cases.** Branch.io's advantage is native app deferred deep linking — irrelevant for a PWA. For web-based referral tracking, UTM parameters parsed by Next.js middleware and stored in Supabase provide identical attribution at zero cost. GA4 recognizes UTM parameters automatically for analytics.

3. **Next.js Metadata API + @vercel/og is the gold standard for this stack.** Dynamic `generateMetadata()` per route gives per-heritage-site OG tags. `@vercel/og` (ImageResponse) generates beautiful preview images with Arabic text, heritage imagery, and certificate designs — directly supporting the primary viral loop. It runs on Vercel's edge network with CDN caching, included at no extra cost.

4. **react-share provides the desktop fallback.** The only significant Web Share API gap is desktop Firefox. react-share buttons for WhatsApp Web, Twitter/X, and Telegram cover this case with minimal bundle size (tree-shakeable).

**Conditions that would change this recommendation:**
- If Athar transitions to a **native mobile app** (not PWA), Branch.io becomes relevant for deferred deep linking
- If referral tracking requires **cross-device attribution** (user clicks on desktop, converts on mobile), a commercial attribution platform would be needed
- If sharing volume exceeds Vercel's serverless function limits for OG image generation (unlikely at bootstrap scale — Vercel hobby plan includes 100K function invocations/month)

**Migration path:** The custom UTM/Supabase approach uses standard web URLs. If a commercial platform is ever needed, the URL structure remains the same — only the server-side attribution logic changes. The react-share buttons can be swapped for any other sharing library without affecting the rest of the system.

## 8. Implementation Architecture

### Sharing Flow
```
User taps "Share" button
  → Check navigator.share availability
    → YES: Call Web Share API (OS native share sheet)
      → User selects WhatsApp/Instagram/Snapchat/Twitter/etc.
      → Shared URL includes ?ref=USER_CODE&utm_source=share&utm_medium=social
    → NO (desktop Firefox): Show react-share buttons
      → WhatsApp, Twitter/X, Telegram, Copy Link buttons
      → Same UTM parameters appended
```

### Referral Attribution Flow
```
Recipient clicks shared link
  → Next.js middleware reads UTM params + ref code
  → Stores referral in Supabase: { referrer_code, referred_user, source, medium, timestamp }
  → Sets cookie for attribution persistence
  → GA4 auto-captures UTM parameters for analytics
  → If user signs up → credit referrer in Supabase
```

### OG Image Generation Flow
```
Social platform crawler requests /site/al-masjid-al-haram
  → Next.js generateMetadata() returns OG tags
  → og:image points to /api/og?site=al-masjid-al-haram
  → @vercel/og renders JSX template with:
    - Heritage site photo
    - Arabic site name in custom font
    - Athar branding
    - Visit certificate design (for certificate shares)
  → Cached on Vercel CDN (subsequent requests served instantly)
```

### Supabase Schema (Referral Tracking)
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_code TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  converted_at TIMESTAMPTZ -- NULL until signup
);

CREATE INDEX idx_referrals_referrer ON referrals(referrer_code);
CREATE INDEX idx_referrals_source ON referrals(utm_source);
```

### Estimated Implementation Effort
| Component | Effort | Notes |
|-----------|--------|-------|
| Web Share API + react-share fallback | 2-3 days | Share button component, feature detection, fallback logic |
| UTM parsing middleware | 1 day | Next.js middleware to extract and store UTM params |
| Supabase referral schema + API | 1-2 days | Table, RLS policies, referral credit logic |
| Dynamic OG metadata | 1-2 days | generateMetadata per route, Arabic font loading |
| @vercel/og image templates | 2-3 days | Heritage site template, certificate template, Arabic layout |
| Testing across platforms | 1-2 days | WhatsApp, Instagram, Twitter, Snapchat preview testing |
| **Total** | **8-13 days** | Well within 2-week target |

---

*Research conducted: March 2026. Browser support data from caniuse.com. Pricing and feature data should be revalidated before implementation. Firebase Dynamic Links deprecation confirmed via Firebase documentation. react-share data from GitHub repository (2.8K stars, last updated January 2025). Web Share API requires HTTPS and user gesture — standard for production PWAs.*
