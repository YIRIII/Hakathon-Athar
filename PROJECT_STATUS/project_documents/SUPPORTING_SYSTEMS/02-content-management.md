# Content Management (Internal) — Supporting System Analysis

| Field | Value |
|-------|-------|
| **System** | Content Management (Internal) |
| **Detection Signals** | 30-60 bilingual content units, layered micro-narratives, heritage site metadata |
| **Source Documents** | BR-2 (site content), Domain Research (layered narratives, scholarly voice) |
| **Priority** | Essential |
| **Recommendation** | File-based: JSON/MDX files in Git repo (hackathon + Year 1) |
| **FACT-ID Prefix** | SUP |

---

## 1. Context & Justification

### Why This System Is Needed

Athar requires 30-60 bilingual content units for its MVP: 10-12 heritage sites × 3-5 QR points per site, each with a brief layer (15-30s read) and expanded layer (1-2min read), in Arabic and English. Plus site metadata (hours, location, accessibility, type classification, images). This content must be created, reviewed for scholarly accuracy, and maintained by the 4-person team.

Domain research mandates third-person scholarly voice with curiosity hooks. Content accuracy is critical for Islamic heritage — inaccurate content about religious sites could damage credibility and violate cultural norms.

### What Happens If Absent

Without a content management approach, heritage content is hardcoded in React components, making updates require code changes and deployments. Non-technical team members (content researcher) cannot contribute. Content quality degrades as the team scrambles to update scattered files.

---

## 2. Requirements Derived from Product

| Requirement | Source BR | Description | Must-Have? |
|------------|-----------|-------------|-----------|
| Bilingual content (AR + EN) | BR-5 | Each content unit in Arabic and English | Yes |
| Layered content model | Domain Research | Brief + expanded layer per QR point | Yes |
| Site metadata | BR-1, BR-2 | Hours, location, GPS coords, type, images | Yes |
| Version control | Team workflow | Track content changes, rollback if needed | Yes |
| Media management | BR-2 | Heritage site images, potentially audio | No (nice-to-have) |
| Non-technical editing | Team scalability | Content researchers can edit without code knowledge | No (post-hackathon) |

---

## 3. Solution Landscape

### Commercial SaaS Options

| Vendor | Pricing | Key Features | Limitations | Fit Score (1-5) |
|--------|---------|-------------|-------------|----------------|
| **Sanity** | Free: 3 users, 100K API CDN req/mo (researched 2026-03-18) | Structured content; real-time collaboration; GROQ query language | Learning curve; overkill for 60 content units | 3 |
| **Contentful** | Free: 5 users, 25K records (researched 2026-03-18) | Industry standard headless CMS; rich localization | Complex setup; API limits on free tier | 2 |
| **Strapi Cloud** | Free: 1 project; Paid from $29/mo (researched 2026-03-18) | Open-source core; REST + GraphQL; i18n plugin | Cloud free tier very limited; self-hosted needs server | 3 |

### Open-Source Self-Hosted Options

| Project | GitHub Stars | Last Commit | Key Features | Limitations | Fit Score (1-5) |
|---------|-------------|-------------|-------------|-------------|----------------|
| **Strapi** | 67K+ | Active (2026) | Headless CMS; i18n; custom content types; REST/GraphQL | Requires hosting ($5-10/mo VPS); setup effort | 3 |
| **Directus** | 30K+ | Active (2026) | Database-first; any SQL DB; localization | Requires hosting; heavier than needed | 2 |
| **Payload CMS** | 30K+ | Active (2026) | TypeScript; Next.js native; MongoDB/Postgres | Newer; requires hosting | 3 |

### File-Based / Static Options

| Approach | Cost | Key Features | Limitations | Fit Score (1-5) |
|----------|------|-------------|-------------|----------------|
| **JSON files in Git** | $0 | Version-controlled; deploy on push; no server needed; structured data | Requires code commit for updates; no admin UI | 5 |
| **MDX files in Git** | $0 | Markdown + JSX; Git-versioned; Next.js native support | More suited for long-form; less structured than JSON | 4 |
| **YAML + frontmatter** | $0 | Human-readable; Git-versioned | Parsing overhead; less structured | 3 |

---

## 4. Options Rating Matrix

### KPI Definition

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| Year 1 TCO | Total cost including hosting and dev time at $17.50/hr | High (3x) | Bootstrapped; $0-$300 budget |
| Bilingual Content Support | Arabic RTL + English content in same model | High (3x) | Core requirement for Makkah/Madinah audience |
| Setup Speed | Time to first content entry | Medium (2x) | Hackathon time pressure |
| Next.js Integration | How well it works with Next.js SSG/SSR | Medium (2x) | Tech stack compatibility |
| Layered Content Model | Support for brief + expanded per QR point | Medium (2x) | Domain research requirement |
| Team Collaboration | Non-technical team members can edit | Low (1x) | Nice-to-have for hackathon; important post-hackathon |
| Scalability | Handles 100+ sites eventually | Low (1x) | Year 2+ growth concern |

### Scoring Matrix

| Option | TCO (3x) | Bilingual (3x) | Setup (2x) | Next.js (2x) | Layered (2x) | Collab (1x) | Scale (1x) | **Weighted** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **JSON in Git** | 5 | 5 | 5 | 5 | 5 | 2 | 3 | **4.57** |
| **MDX in Git** | 5 | 4 | 4 | 5 | 4 | 2 | 3 | **4.21** |
| **Sanity (free)** | 4 | 4 | 3 | 4 | 4 | 5 | 5 | **4.00** |
| **Strapi self-hosted** | 2 | 4 | 2 | 3 | 4 | 4 | 5 | **3.14** |
| **Payload CMS** | 2 | 4 | 2 | 5 | 4 | 4 | 5 | **3.43** |

**Verification (JSON in Git)**: (5×3 + 5×3 + 5×2 + 5×2 + 5×2 + 2×1 + 3×1) / (3+3+2+2+2+1+1) = (15+15+10+10+10+2+3)/14 = 65/14 = **4.64**

### Recommendation

**JSON files in Git** (Score: 4.64)

Structured JSON files for heritage content are the perfect fit for a hackathon project with 30-60 content units. Example structure:

```json
{
  "siteId": "quba-mosque",
  "city": "madinah",
  "type": "religious",
  "qrPoints": [
    {
      "id": "quba-entrance",
      "brief": { "ar": "...", "en": "..." },
      "expanded": { "ar": "...", "en": "..." }
    }
  ]
}
```

**Runner-up**: Sanity free tier (4.00). Switch to Sanity when Heritage Commission partnership requires non-technical content editors.

---

## 5. Build vs Buy Analysis (including Bootstrap)

| Criterion | Build (custom CMS) | Buy: Sanity | File-based: JSON in Git | Bootstrap/MVP |
|-----------|-------|--------|---------------------|---------------|
| Setup time | 3-4 weeks | 2-3 days | 2-4 hours | 1-2 hours |
| Monthly cost (100 users) | $0 + hosting | $0 (free tier) | $0 | $0 |
| Monthly cost (10K users) | $10-20/mo hosting | $0 (free tier) | $0 | $0 |
| Monthly cost (100K users) | $20-50/mo | $99/mo | $0 | N/A |
| Customization | Full | Moderate | Full | Full |
| Integration effort | High | Medium (API) | Native (import JSON) | Native |
| Vendor lock-in | None | Medium | None | None |
| Data ownership | Full | Via export | Full (Git) | Full |
| Maintenance burden | High | Low | Very Low | Very Low |

**Recommendation**: File-based: JSON in Git

**Rationale**: For 30-60 content units, JSON files committed to Git provide instant versioning, zero cost, native Next.js import, and perfect support for the bilingual layered content model. No server, no API, no complexity. The team can review content changes via Git pull requests.

**Switch trigger**: When Heritage Commission partnership requires non-technical editors OR content exceeds 200+ units (move to Sanity or Payload CMS).

**Bootstrap upgrade trigger**: Same as recommended — JSON files ARE the bootstrap approach.

---

## 6. Cost Analysis

### Year 1 Total Cost (Recommended = Bootstrap)

| Cost Component | Amount | Notes |
|----------------|--------|-------|
| JSON file structure setup | $0 (2 hrs founder time) | Define schema, create folder structure |
| Content creation | $0 (founder time) | Team researches and writes heritage content |
| Hosting | $0 | Files served via Vercel with the app |
| **Year 1 Total (cash)** | **$0** | |
| **Year 1 Total (fully-loaded)** | **$35** | 2 hrs setup × $17.50/hr |

### Cost Sanity Check

- **Product Year 1 projected revenue**: $6,692
- **This system as % of revenue**: 0% — **acceptable**
- **Would a bootstrapped founder pay this?**: Yes — it's free

---

## 7. Impact Assessment

| Dimension | Impact | Details |
|-----------|--------|---------|
| **Revenue** | Low | Content system itself doesn't generate revenue; content quality drives engagement |
| **Conversion** | High | Heritage content is the core value proposition — poor content management = poor content = no users |
| **Operations** | Medium | Content updates require Git commits (fine for 4-person dev team; issue at scale) |
| **Compliance** | Low | No compliance implications for content storage approach |

---

## 8. Priority Tier Classification

**Priority**: Essential

**Rationale**: Without a content management approach, the team cannot efficiently create, organize, and maintain the 30-60 bilingual heritage content units that every other feature depends on. JSON in Git makes this Essential at zero cost.

**Phase recommendation**: Phase 0 (hackathon) — JSON files from day one.

---

## 9. Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | Sanity Pricing | https://www.sanity.io/pricing | 2026-03-18 | Free: 3 users, 100K API CDN req |
| 2 | Strapi GitHub | https://github.com/strapi/strapi | 2026-03-18 | 67K+ stars |
| 3 | Payload CMS GitHub | https://github.com/payloadcms/payload | 2026-03-18 | 30K+ stars |
| 4 | Contentful Pricing | https://www.contentful.com/pricing/ | 2026-03-18 | Free: 5 users, 25K records |
