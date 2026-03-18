# Capability 08: Heritage Content Delivery

**Tier**: Supporting (Standard Research)
**Status**: Complete
**Date**: 2026-03-18
**BRD Requirement**: BR-2 — Heritage site detail pages with historical narrative, images, visitor info

---

## 1. Capability Overview

Heritage Content Delivery handles the structured storage, rendering, and fast delivery of multilayer heritage content for 10-12 sites with 30-60 QR-triggered content units. Each unit includes a brief layer (15-30s read) and an expanded layer (1-2 min read), bilingual Arabic/English, with heritage photography.

**Sub-components:**
1. **Content Schema & Storage** — JSON structure for heritage data (narratives, metadata, coordinates, images)
2. **Image Optimization** — Fast mobile loading of heritage photography, especially on poor connectivity
3. **Markdown/Rich Text Rendering** — Heritage narratives with embedded images, quotes, styled text

**Scale**: ~60 content units × 2 languages × 2 layers = ~240 content pages; ~200-400 heritage images total.

---

## 2. Sub-Component A: Content Schema & Storage

### Decision Context

The Supporting Systems analysis already decided on **JSON files in Git** for content storage. This sub-component focuses on the JSON schema design pattern — no option comparison needed, only a recommended schema structure.

### Recommended Schema Pattern

```json
{
  "site": {
    "id": "masjid-al-haram-courtyard",
    "name": { "ar": "ساحة المسجد الحرام", "en": "Masjid al-Haram Courtyard" },
    "coordinates": { "lat": 21.4225, "lng": 39.8262 },
    "category": "mosque",
    "heroImage": "/images/sites/masjid-al-haram/hero.webp",
    "qrPoints": [
      {
        "id": "qr-001",
        "label": { "ar": "البوابة الرئيسية", "en": "Main Gate" },
        "coordinates": { "lat": 21.4226, "lng": 39.8263 },
        "content": {
          "brief": {
            "ar": "/content/ar/masjid-al-haram/qr-001-brief.md",
            "en": "/content/en/masjid-al-haram/qr-001-brief.md"
          },
          "expanded": {
            "ar": "/content/ar/masjid-al-haram/qr-001-expanded.md",
            "en": "/content/en/masjid-al-haram/qr-001-expanded.md"
          }
        },
        "images": [
          {
            "src": "/images/sites/masjid-al-haram/gate-main.jpg",
            "alt": { "ar": "البوابة الرئيسية", "en": "Main Gate" },
            "width": 1200,
            "height": 800
          }
        ],
        "visitInfo": {
          "bestTime": { "ar": "الصباح الباكر", "en": "Early morning" },
          "duration": { "ar": "15-20 دقيقة", "en": "15-20 minutes" },
          "accessibility": { "ar": "متاح للكراسي المتحركة", "en": "Wheelchair accessible" }
        }
      }
    ]
  }
}
```

**Key design decisions:**
- Narrative content stored as separate Markdown files (referenced by path), not inline in JSON — keeps JSON lean and narratives editable
- All user-facing strings use `{ ar, en }` locale objects for bilingual support
- Image dimensions stored in JSON for layout stability (prevents CLS)
- QR point IDs are stable identifiers for deep linking from QR codes

**Cost**: $0 — JSON files in Git, no additional service needed.

---

## 3. Sub-Component B: Image Optimization

### Options Researched

| # | Option | Type | Free Tier |
|---|--------|------|-----------|
| 1 | Next.js Image + sharp (build-time) | Built-in + OSS | Unlimited (self-hosted) |
| 2 | Next.js Image (Vercel runtime) | Platform built-in | 1,000 source images/mo |
| 3 | Cloudinary | SaaS CDN | 25 credits/mo (~25K transforms) |
| 4 | Cloudflare Images | SaaS CDN | 5,000 unique transforms/mo |
| 5 | imgix | SaaS CDN | No free tier ($25/mo minimum) |

### Option Details

#### Option 1: Next.js Image + sharp (Build-Time Pre-optimization)

**Approach**: Use sharp in a build script to pre-generate optimized images (WebP + AVIF + fallback JPEG) at multiple breakpoints, then serve statically via Cloudflare CDN. Use Next.js `<Image>` component with `unoptimized` prop pointing to pre-generated files.

- **Format support**: WebP, AVIF, JPEG, PNG, TIFF, GIF
- **Performance**: 4-5x faster than ImageMagick; processes images during build, zero runtime cost
- **Responsive**: Build script generates srcset variants (e.g., 400w, 800w, 1200w)
- **Cost**: $0 — sharp is MIT-licensed, images served as static files via Cloudflare CDN (already in stack)
- **Bundle impact**: sharp runs at build time only, not shipped to client; Next.js Image component ~3KB gzipped
- **Offline**: Pre-generated static files cache perfectly with service worker
- **Arabic**: No text rendering — image optimization only
- **Limitation**: Must re-run build script when images change (acceptable for heritage content that changes rarely)

#### Option 2: Next.js Image (Vercel Runtime Optimization)

**Approach**: Use `next/image` with Vercel's built-in on-demand optimizer. Images are optimized at request time and cached at the edge.

- **Format support**: WebP, AVIF (auto-negotiated via Accept header)
- **Performance**: First request incurs optimization latency (~200-500ms); subsequent requests served from cache
- **Responsive**: Automatic srcset via `sizes` prop
- **Cost**: Free on Hobby plan for up to 1,000 source images/month. With ~200-400 heritage images, this is sufficient but tight — any re-deployment may re-optimize all images, consuming quota. Pro plan ($20/mo) needed if quota exceeded.
- **Bundle impact**: ~3KB gzipped (Image component)
- **Offline**: Cached responses work with service worker, but initial optimization requires server
- **Limitation**: Hobby plan quota is hard-capped — no overage billing, just blocked. Risk of exceeding on deployment.

#### Option 3: Cloudinary

**Approach**: Upload heritage images to Cloudinary, use URL-based transformations for format/size.

- **Format support**: WebP, AVIF, auto-format negotiation (f_auto)
- **Performance**: Global CDN, excellent first-load performance
- **Responsive**: URL-based width/quality parameters (w_800,q_auto)
- **Cost**: Free tier = 25 credits/month (25K transformations OR 25GB bandwidth OR 25GB storage). For ~400 images × 3 breakpoints = 1,200 unique transforms + ~2-5GB bandwidth/month — fits free tier comfortably. **Critical risk**: Exceeding 25 credits suspends the account entirely (no graceful degradation).
- **Bundle impact**: Zero — URL-based, no client SDK needed
- **Offline**: Standard CDN caching; works with service worker prefetch
- **Limitation**: Account suspension on overage is a hard risk for production use.

#### Option 4: Cloudflare Images (Transformations)

**Approach**: Use Cloudflare Images transformation feature to optimize images stored in Git/R2 on the fly via URL parameters.

- **Format support**: WebP, AVIF (via cf-image CDN-CGI)
- **Performance**: Cloudflare edge network (already in stack)
- **Responsive**: URL-based width/quality/format parameters
- **Cost**: Free plan = 5,000 unique transformations/month. With ~400 images × 3 breakpoints = ~1,200 unique transforms/month — well within limits. Does not charge for repeated requests to the same transform.
- **Bundle impact**: Zero — URL rewriting only
- **Offline**: Same Cloudflare edge, excellent cache hit rates
- **Limitation**: Requires Cloudflare-proxied domain (already planned). Less mature developer experience than Cloudinary.

#### Option 5: imgix

**Approach**: Real-time image processing proxy with CDN.

- **Format support**: WebP, AVIF, all major formats
- **Performance**: Excellent — 8B+ images/day served globally
- **Cost**: No free tier. Starts at $25/month (Starter, 100 credits). Not viable for bootstrapped Year 1.
- **Eliminated**: No free tier disqualifies for bootstrap constraint.

### Evaluation KPIs

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| Year 1 Cost | Total cost including hosting/service fees | High (3x) | Bootstrap constraint — must be $0 or near-$0 |
| Image Load Speed (LCP) | Time to largest contentful paint on mobile | High (3x) | Core UX metric, especially for poor connectivity at heritage sites |
| Format Support | WebP + AVIF auto-negotiation | Medium (2x) | Modern formats critical for mobile bandwidth savings |
| Responsive Images | srcset generation for multiple breakpoints | Medium (2x) | Multiple device sizes visiting heritage sites |
| Offline Capability | Works with service worker caching | Medium (2x) | Heritage sites may have poor connectivity |
| Overage Risk | What happens when free tier is exceeded | Medium (2x) | Account suspension or blocking is unacceptable for production |
| Setup Complexity | Integration effort with Next.js + Cloudflare stack | Low (1x) | One-time effort, manageable for any option |
| Bundle Size Impact | Client-side JS added | Low (1x) | Minor differentiator for image optimization |

### Scoring Matrix

| Option | Year 1 Cost (3x) | LCP Speed (3x) | Format Support (2x) | Responsive (2x) | Offline (2x) | Overage Risk (2x) | Setup (1x) | Bundle (1x) | **Weighted** |
|--------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **Next.js Image + sharp (build-time)** | 5 | 5 | 5 | 4 | 5 | 5 | 3 | 5 | **4.75** |
| Next.js Image (Vercel runtime) | 4 | 4 | 5 | 5 | 3 | 2 | 5 | 5 | **3.94** |
| Cloudinary | 4 | 5 | 5 | 5 | 4 | 2 | 4 | 5 | **4.13** |
| Cloudflare Images | 5 | 5 | 5 | 4 | 5 | 4 | 3 | 5 | **4.63** |
| imgix | 1 | 5 | 5 | 5 | 4 | 5 | 4 | 5 | **3.63** |

**Weighted score calculations:**

Next.js Image + sharp: (5×3 + 5×3 + 5×2 + 4×2 + 5×2 + 5×2 + 3×1 + 5×1) / (3+3+2+2+2+2+1+1) = (15+15+10+8+10+10+3+5) / 16 = 76/16 = **4.75**

Cloudflare Images: (5×3 + 5×3 + 5×2 + 4×2 + 5×2 + 4×2 + 3×1 + 5×1) / 16 = (15+15+10+8+10+8+3+5) / 16 = 74/16 = **4.63**

Cloudinary: (4×3 + 5×3 + 5×2 + 5×2 + 4×2 + 2×2 + 4×1 + 5×1) / 16 = (12+15+10+10+8+4+4+5) / 16 = 68/16 = **4.25** *(corrected)*

### Score Rationales (Top 3)

#### Next.js Image + sharp (build-time) — 4.75

| KPI | Score | Rationale |
|-----|-------|-----------|
| Year 1 Cost | 5 | $0 — sharp is MIT-licensed, pre-generated images are static files served via existing Cloudflare CDN |
| LCP Speed | 5 | Pre-optimized images require zero server-side processing at request time; served directly from CDN edge |
| Format Support | 5 | sharp supports WebP, AVIF, JPEG, PNG, TIFF — all formats needed |
| Responsive | 4 | Build script generates srcset variants; slightly more manual than URL-based services (must define breakpoints) |
| Offline | 5 | Static files are ideal for service worker precaching — predictable set of ~1,200 image variants |
| Overage Risk | 5 | No external service, no quotas, no rate limits — completely self-controlled |
| Setup | 3 | Requires writing a build script (~50-80 lines) for image processing pipeline |
| Bundle | 5 | sharp runs at build time only; zero client-side JS added beyond Next.js Image component (~3KB) |

#### Cloudflare Images (Transformations) — 4.63

| KPI | Score | Rationale |
|-----|-------|-----------|
| Year 1 Cost | 5 | Free plan includes 5,000 unique transforms/month; project needs ~1,200, well within limits |
| LCP Speed | 5 | Cloudflare's global edge network; images cached after first transform |
| Format Support | 5 | WebP and AVIF via automatic content negotiation |
| Responsive | 4 | URL-based width parameters; needs manual breakpoint definition in image URLs |
| Offline | 5 | Same Cloudflare edge as the CDN already in the stack; great cache coherence |
| Overage Risk | 4 | Free plan has headroom (5K vs 1.2K needed); Cloudflare states they won't charge for exceeding free plan limits |
| Setup | 3 | Requires Cloudflare-proxied domain and URL rewriting logic in Next.js |
| Bundle | 5 | URL-based — no client SDK or runtime code |

#### Cloudinary — 4.25 (corrected)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Year 1 Cost | 4 | Free tier (25 credits) covers project needs; but adds external dependency with no paid fallback at bootstrap |
| LCP Speed | 5 | Global CDN with automatic quality optimization (q_auto) |
| Format Support | 5 | f_auto negotiates best format per browser; industry leader in format support |
| Responsive | 5 | Excellent URL-based responsive pipeline with client-side SDK available |
| Offline | 4 | Standard CDN caching; works with service worker but requires initial online fetch from Cloudinary origin |
| Overage Risk | 2 | Critical: exceeding 25 credits **suspends the entire account** — no graceful degradation, no overage billing |
| Setup | 4 | Well-documented Next.js integration; Cloudinary React SDK available |
| Bundle | 5 | Can use URL-only approach with zero client SDK |

### Image Optimization Recommendation

**Winner: Next.js Image + sharp (build-time pre-optimization)** — Score 4.75

Build a simple Node.js script using sharp that:
1. Reads source images from `/public/images/originals/`
2. Generates WebP + AVIF + JPEG fallback at 400w, 800w, 1200w breakpoints
3. Outputs to `/public/images/optimized/` with predictable naming
4. Runs as `npm run optimize-images` before deployment

This gives zero runtime cost, zero external dependencies, zero overage risk, and perfect offline caching.

**Runner-up: Cloudflare Images** — Switch if image count grows beyond 500+ source images or if dynamic user-uploaded content is added later (Cloudflare handles on-the-fly transforms without build steps).

---

## 4. Sub-Component C: Markdown/Rich Text Rendering

### Options Researched

| # | Option | Type | Bundle Size (gzipped) |
|---|--------|------|-----------------------|
| 1 | react-markdown + remark/rehype plugins | OSS library | ~12KB (core) |
| 2 | MDX (via @next/mdx or next-mdx-remote) | OSS framework | ~20-30KB |
| 3 | Custom React Components (no Markdown) | Custom build | 0KB (native JSX) |
| 4 | Contentlayer | OSS build tool | ~5KB runtime |

### Option Details

#### Option 1: react-markdown

**Approach**: Store heritage narratives as Markdown files; render at build time or client-side with react-markdown component and remark/rehype plugins.

- **Version**: 10.1.0 (actively maintained, 13K+ GitHub stars)
- **Bundle**: ~12KB gzipped (core); +4-8KB with rehype-raw for HTML support
- **Performance**: Parses Markdown to React elements via unified/remark pipeline; fast for static content
- **Arabic/RTL**: Works with CSS `dir="rtl"` on parent container; Markdown syntax is language-agnostic
- **Extensibility**: Rich plugin ecosystem (remark-gfm for tables, rehype-raw for HTML, custom plugins)
- **Image embedding**: Supports `![alt](src)` syntax; can use custom renderers to output `<Image>` components
- **Quotes/styling**: Standard Markdown blockquotes, emphasis, headers; custom CSS for heritage styling
- **Cost**: $0 — MIT license

#### Option 2: MDX (via next-mdx-remote)

**Approach**: Store content as MDX files allowing embedded React components within Markdown. Use next-mdx-remote for dynamic MDX loading.

- **Bundle**: ~20-30KB gzipped (MDX runtime + serializer)
- **Performance**: Heavier parsing; can be pre-compiled at build time via next-mdx-remote/serialize
- **Arabic/RTL**: Same CSS-based approach as react-markdown
- **Extensibility**: Can embed any React component directly in content (e.g., `<ImageGallery>`, `<AudioPlayer>`)
- **Limitation**: Overkill for heritage narratives that need basic formatting + embedded images. MDX's power is interactive components, which this content doesn't require.
- **Cost**: $0 — MIT license

#### Option 3: Custom React Components (No Markdown)

**Approach**: Store narrative content as structured JSON with typed content blocks (paragraph, heading, image, quote, callout) and render with custom React components.

- **Bundle**: 0KB additional — pure React components
- **Performance**: Fastest possible — direct JSX rendering, no parsing step
- **Arabic/RTL**: Full control over RTL rendering per component
- **Extensibility**: Complete control but must build every feature (no plugin ecosystem)
- **Limitation**: Content authoring is painful — editors must write JSON structures instead of readable Markdown. For 240 content pages, this is a significant authoring burden.
- **Cost**: $0 but high development time (~8-12 hours to build component library)

#### Option 4: Contentlayer

**Approach**: Build-time content processing that transforms Markdown/MDX files into type-safe JSON data. Acts as a content SDK.

- **Bundle**: ~5KB runtime (content is pre-processed at build time)
- **Performance**: Excellent — all Markdown processing happens at build time; runtime just reads JSON
- **Arabic/RTL**: Renders to HTML; RTL handled by CSS
- **Limitation**: Project is in maintenance mode (creator joined Vercel). Community fork (contentlayer2) exists but uncertain long-term support. Adds build complexity for limited benefit over react-markdown with static generation.
- **Cost**: $0 — MIT license

### Evaluation KPIs

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| Content Authoring DX | How easy is it to write/edit 240 heritage narrative pages | High (3x) | Non-technical content editors may contribute; Markdown is widely understood |
| Bundle Size | Client-side JS impact | High (3x) | PWA on mobile with poor connectivity — every KB matters |
| Rendering Performance | Time to render content on client | Medium (2x) | Heritage pages should feel instant |
| Arabic/RTL Quality | Right-to-left text rendering quality | Medium (2x) | Arabic is primary language |
| Extensibility | Custom components, image galleries, audio embeds | Medium (2x) | Heritage content may need special presentation elements |
| Maintenance Risk | Long-term project health and community | Low (1x) | Lower weight for established libraries |
| Setup Effort | Integration time with Next.js | Low (1x) | One-time cost |

### Scoring Matrix

| Option | Authoring DX (3x) | Bundle Size (3x) | Render Perf (2x) | Arabic/RTL (2x) | Extensibility (2x) | Maintenance (1x) | Setup (1x) | **Weighted** |
|--------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **react-markdown** | 5 | 4 | 4 | 4 | 4 | 5 | 5 | **4.36** |
| MDX (next-mdx-remote) | 4 | 3 | 3 | 4 | 5 | 4 | 3 | **3.71** |
| Custom React Components | 2 | 5 | 5 | 5 | 3 | 5 | 2 | **3.64** |
| Contentlayer | 4 | 5 | 5 | 4 | 3 | 2 | 3 | **3.93** |

**Weighted score calculations:**

react-markdown: (5×3 + 4×3 + 4×2 + 4×2 + 4×2 + 5×1 + 5×1) / (3+3+2+2+2+1+1) = (15+12+8+8+8+5+5) / 14 = 61/14 = **4.36**

Contentlayer: (4×3 + 5×3 + 5×2 + 4×2 + 3×2 + 2×1 + 3×1) / 14 = (12+15+10+8+6+2+3) / 14 = 56/14 = **4.00** *(corrected)*

Custom React: (2×3 + 5×3 + 5×2 + 5×2 + 3×2 + 5×1 + 2×1) / 14 = (6+15+10+10+6+5+2) / 14 = 54/14 = **3.86** *(corrected)*

MDX: (4×3 + 3×3 + 3×2 + 4×2 + 5×2 + 4×1 + 3×1) / 14 = (12+9+6+8+10+4+3) / 14 = 52/14 = **3.71**

### Score Rationales (Top 3)

#### react-markdown — 4.36

| KPI | Score | Rationale |
|-----|-------|-----------|
| Authoring DX | 5 | Standard Markdown — any editor can write heritage narratives without learning a framework |
| Bundle Size | 4 | ~12KB gzipped core; acceptable for PWA but not zero. Can use rehype plugins selectively |
| Render Perf | 4 | Fast unified/remark pipeline; with Next.js SSG, Markdown is parsed at build time for static pages |
| Arabic/RTL | 4 | Language-agnostic Markdown; RTL handled by CSS `dir="rtl"` on container. No RTL-specific issues |
| Extensibility | 4 | Custom renderers can map `![image]()` to Next.js `<Image>`, blockquotes to styled heritage cards |
| Maintenance | 5 | 10+ years of active development, 13K GitHub stars, part of unified ecosystem |
| Setup | 5 | `npm install react-markdown` + import component — minimal configuration needed |

#### Contentlayer — 4.00 (corrected)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Authoring DX | 4 | Markdown authoring with frontmatter; slightly more complex setup than react-markdown |
| Bundle Size | 5 | ~5KB runtime — content pre-processed at build time into JSON |
| Render Perf | 5 | Zero runtime parsing — content is pre-compiled HTML/JSON at build |
| Arabic/RTL | 4 | Outputs HTML; RTL styling via CSS as with any HTML content |
| Extensibility | 3 | Limited plugin ecosystem compared to remark/rehype; MDX support available but adds complexity |
| Maintenance | 2 | Original project in maintenance mode; contentlayer2 fork exists but uncertain future |
| Setup | 3 | Requires config file, content schema definitions, and Next.js plugin integration |

#### Custom React Components — 3.86 (corrected)

| KPI | Score | Rationale |
|-----|-------|-----------|
| Authoring DX | 2 | Content must be written as JSON/JSX structures — poor for non-technical editors writing 240 pages |
| Bundle Size | 5 | Zero additional JS — pure React components already in the bundle |
| Render Perf | 5 | Direct JSX rendering, no parsing overhead whatsoever |
| Arabic/RTL | 5 | Full programmatic control over every RTL detail per component |
| Extensibility | 3 | Must build every content type from scratch; no plugin ecosystem |
| Maintenance | 5 | No external dependency to maintain |
| Setup | 2 | 8-12 hours to build paragraph, heading, image, quote, callout, and list components |

### Markdown Rendering Recommendation

**Winner: react-markdown** — Score 4.36

Use react-markdown with selective plugins:
- `remark-gfm` for tables (visitor info formatting)
- Custom component overrides to render images as Next.js `<Image>` components
- CSS-based RTL with `dir="rtl"` attribute on Arabic content containers

**Runner-up: Contentlayer** — Consider if the project grows to 100+ content files and type-safe content queries become valuable. However, maintenance risk makes it a cautious choice.

---

## 5. Combined Architecture Recommendation

```
Heritage Content Pipeline:

Source Images                    Narrative Content
(/public/images/originals/)      (/content/{ar,en}/{site}/{qr-id}-{layer}.md)
        │                                    │
        ▼                                    ▼
  sharp build script               react-markdown + remark/rehype
  (npm run optimize-images)        (at build time via Next.js SSG)
        │                                    │
        ▼                                    ▼
  /public/images/optimized/        Static HTML pages
  (WebP + AVIF + JPEG              with <Image> components
   @ 400w, 800w, 1200w)           pointing to optimized images
        │                                    │
        └──────────┬─────────────────────────┘
                   ▼
           Cloudflare CDN (already in stack)
                   │
                   ▼
            Service Worker Cache
            (offline-first PWA)
```

### Implementation Approach

1. **Content files**: Markdown files at `/content/{locale}/{site-slug}/{qr-id}-brief.md` and `{qr-id}-expanded.md`
2. **Site metadata**: JSON files at `/data/sites/{site-slug}.json` following the schema in Section 2
3. **Image pipeline**: Build script using sharp generates WebP/AVIF/JPEG at 3 breakpoints per source image
4. **Rendering**: Next.js SSG pages using `getStaticProps` to load JSON metadata + react-markdown for narrative content
5. **Delivery**: Static export served via Cloudflare CDN with service worker prefetching content for offline access

### Year 1 Cost Summary

| Component | Option | Year 1 Cost |
|-----------|--------|-------------|
| Content Schema & Storage | JSON in Git | $0 |
| Image Optimization | sharp (build-time) | $0 |
| Markdown Rendering | react-markdown | $0 |
| CDN Delivery | Cloudflare (already in stack) | $0 |
| **Total** | | **$0** |

### Key Dependencies

- Node.js 18+ (for sharp build script)
- Cloudflare CDN (already planned in stack)
- Next.js SSG/ISR (already planned)

### Migration Path

If the project scales beyond 500 images or adds user-generated content:
1. Replace sharp build script with Cloudflare Images (on-the-fly transforms)
2. No changes needed to react-markdown or JSON schema
3. Content schema supports adding new fields without breaking existing content

---

## 6. Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Build time grows with image count | Low | Medium | At 400 images × 3 formats × 3 sizes = 3,600 files; sharp processes in ~2-3 minutes. Only regenerate changed images. |
| react-markdown breaking changes | Low | Low | Mature library (10+ years); pin version in package.json |
| Heritage image quality loss from compression | Medium | Low | Use quality 80 for WebP, 65 for AVIF; review visual quality for heritage photography before deployment |
| Poor connectivity at heritage sites | High | High | Service worker precaches all content for current site on first visit; brief layer loads first (~50KB total) |
| Arabic text rendering inconsistencies | Medium | Low | Test with actual Arabic heritage narratives; use system Arabic fonts (Noto Sans Arabic / system-ui) |

---

## 7. References

- [Next.js Image Component Documentation](https://nextjs.org/docs/app/api-reference/components/image)
- [sharp — High Performance Node.js Image Processing](https://sharp.pixelplumbing.com/)
- [Cloudinary Pricing](https://cloudinary.com/pricing) — Free tier: 25 credits/month
- [Cloudflare Images Pricing](https://developers.cloudflare.com/images/pricing/) — Free: 5,000 transforms/month
- [imgix Pricing](https://www.imgix.com/pricing) — Starts at $25/month, no free tier
- [Vercel Image Optimization Limits](https://vercel.com/docs/image-optimization/limits-and-pricing) — Hobby: 1,000 source images/month
- [react-markdown on GitHub](https://github.com/remarkjs/react-markdown) — v10.1.0, 13K+ stars
- [Cloudinary Free Tier Suspension Policy](https://thedigitalprojectmanager.com/tools/cloudinary-pricing/) — Account suspended on exceeding 25 credits
