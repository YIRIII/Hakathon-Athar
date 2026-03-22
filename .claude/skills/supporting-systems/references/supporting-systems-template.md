# Supporting Systems Analysis Templates

This file contains two templates: the README (progress tracker + summary) and the per-system analysis file.

---

## README Template

```markdown
# Supporting Systems Analysis — <Idea Name>

| Field | Value |
|-------|-------|
| **Version** | 1.0 |
| **Date** | <YYYY-MM-DD> |
| **Status** | In Progress / Complete |
| **Author** | Claude (Idea Forge Pipeline) |
| **BRD Reference** | [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) |
| **Business Research** | [BUSINESS_RESEARCH/](../BUSINESS_RESEARCH/README.md) |

---

## Research Progress

| # | System | Priority | File | Status | Updated |
|---|--------|----------|------|--------|---------|
| 1 | <System Name> | — | [01-system-name.md](01-system-name.md) | pending | — |
| 2 | <System Name> | — | [02-system-name.md](02-system-name.md) | pending | — |

---

## Detected Systems Summary

| # | System | Detection Signals | Source Documents | Priority |
|---|--------|-------------------|-----------------|----------|
| 1 | <System Name> | <What triggered detection — e.g., "Multiple user types: admin, provider, customer"> | <BR-IDs, BRD sections, IDEA.md references> | Essential / Growth / Enterprise |

---

## Priority Classification

### Essential (Must-Have for Launch)

| # | System | Recommendation | Year 1 Cost | Rationale |
|---|--------|---------------|-------------|-----------|
| 1 | <System Name> | Build / Buy <vendor> / Open-source <name> | $X | <Why essential — e.g., "Blocks core booking flow without RBAC"> |

### Growth (Needed for Scaling)

| # | System | Recommendation | Year 1 Cost | Rationale |
|---|--------|---------------|-------------|-----------|
| 1 | <System Name> | Build / Buy <vendor> / Open-source <name> | $X | <Why growth — e.g., "Analytics needed once 1K+ users for retention optimization"> |

### Enterprise (Deferred)

| # | System | Recommendation | Year 1 Cost | Rationale |
|---|--------|---------------|-------------|-----------|
| 1 | <System Name> | Build / Buy <vendor> / Open-source <name> | $X | <Why enterprise — e.g., "Multi-tenancy only needed for enterprise tier customers"> |

---

## Cost Impact Summary

### Monthly/Annual by Priority Tier

| Tier | Monthly Cost | Annual Cost | Systems |
|------|-------------|-------------|---------|
| Essential | $X | $X | <list> |
| Growth | $X | $X | <list> |
| Enterprise | $X | $X | <list> |
| **Total** | **$X** | **$X** | |

### Cost Scaling Projection

| Scale | Monthly Cost | Annual Cost | Key Cost Drivers |
|-------|-------------|-------------|-----------------|
| 100 users | $X | $X | <e.g., "Mostly fixed SaaS fees"> |
| 10,000 users | $X | $X | <e.g., "Notification volume drives costs up"> |
| 100,000 users | $X | $X | <e.g., "Need enterprise tiers for most SaaS tools"> |

---

## Build vs Buy Recommendations

### Summary Table

| # | System | Recommendation | Alternative | Switch Trigger |
|---|--------|---------------|-------------|---------------|
| 1 | <System Name> | Buy: <vendor> | Build custom | <When to reconsider — e.g., ">50K users, vendor costs exceed $X/mo"> |

### Build Summary

**Systems recommended to build:** <count>
- <System>: <one-line rationale — e.g., "Core differentiator, needs deep integration with booking flow">

**Total estimated build effort:** <X person-months>

### Buy Summary

**Systems recommended to buy/SaaS:** <count>
- <System> → <Vendor>: <one-line rationale — e.g., "Commodity feature, $X/mo vs 2 months build time">

**Total estimated annual SaaS cost:** $<X>

---

## Impact on Downstream Skills

### For /marketing-strategy
- <What marketing strategy should know — e.g., "Admin dashboard enables self-serve onboarding → affects CAC">
- <Support system costs affect customer support CAC component>

### For /tech-research
- <Systems that need technical capability evaluation — e.g., "RBAC needs auth provider research">
- <Integration requirements with product tech stack>

### For /pricing-strategy
- <Per-user cost impact — e.g., "$X.XX/user/month in supporting system costs affects gross margin">
- <Feature gating implications — e.g., "Analytics dashboard could be a premium tier feature">

---

## Open Questions & Next Steps

- [ ] <Question or decision needed>
- [ ] <Follow-up research needed>
```

---

## Per-System File Template

```markdown
# <System Name> — Supporting System Analysis

| Field | Value |
|-------|-------|
| **System** | <System Name> |
| **Detection Signals** | <What triggered detection> |
| **Source Documents** | <BR-IDs, BRD sections that reference this system> |
| **Priority** | Essential / Growth / Enterprise |
| **Recommendation** | Build / Buy: <vendor> / Open-source: <name> |
| **FACT-ID Prefix** | SUP |

---

## 1. Context & Justification

### Why This System Is Needed

<2-3 paragraphs explaining why this supporting system is needed based on the product's BRD and business research. Reference specific BRs and features.>

### What Happens If Absent

<Concrete consequences of not having this system — e.g., "Without RBAC, all users see all data. Salon owners see competitor bookings. This violates PDPL and destroys trust.">

---

## 2. Requirements Derived from Product

| Requirement | Source BR | Description | Must-Have? |
|------------|-----------|-------------|-----------|
| <Req name> | BR-X | <What the product needs from this system> | Yes / No |

---

## 3. Solution Landscape

### Commercial SaaS Options

| Vendor | Pricing | Key Features | Limitations | Fit Score (1-5) |
|--------|---------|-------------|-------------|----------------|
| <Vendor 1> | $X/mo (researched YYYY-MM-DD) | <features> | <limitations> | X |

### Open-Source Options

| Project | GitHub Stars | Last Commit | Key Features | Limitations | Fit Score (1-5) |
|---------|-------------|-------------|-------------|-------------|----------------|
| <Project 1> | <N>K | YYYY-MM-DD | <features> | <limitations> | X |

### Build from Scratch

| Aspect | Estimate | Basis |
|--------|----------|-------|
| Development effort | <X weeks/months> | <Based on similar projects / developer surveys> |
| Ongoing maintenance | <X hrs/month> | <estimate basis> |
| Key complexity | <What makes this hard to build> | |

---

## 4. Options Rating Matrix

> Follow the shared methodology at `.claude/skills/options-rating-matrix/SKILL.md`.
> Include: KPI Definition Table, All Options Scored matrix, Weighted Scores, and Score Rationales for top 3 options.

---

## 5. Build vs Buy Analysis (including Bootstrap)

| Criterion | Build | Buy: <vendor> | Open-source: <name> | Bootstrap/MVP |
|-----------|-------|--------------|---------------------|---------------|
| Setup time | <X weeks> | <X days> | <X weeks> | <X days> |
| Monthly cost (100 users) | $X | $X | $X | $X |
| Monthly cost (10K users) | $X | $X | $X | $X |
| Monthly cost (100K users) | $X | $X | $X | N/A (upgrade needed) |
| Customization | Full | Limited / Moderate | Full | Minimal |
| Integration effort | Native | API/SDK | Self-hosted | Minimal |
| Vendor lock-in | None | High / Medium / Low | None | None |
| Data ownership | Full | Shared / Full (via export) | Full | Full |
| Compliance fit | <notes> | <notes> | <notes> | <notes> |
| Maintenance burden | High / Medium / Low | None (managed) | Medium | Low |

*Bootstrap/MVP column: The absolute minimum viable approach for a pre-revenue or early-revenue startup. May use free tiers, manual processes, or basic open-source tools. Include upgrade trigger (when to move to the recommended option).*

**Recommendation**: <Build / Buy: vendor / Open-source: name>

**Rationale**: <2-3 sentences explaining the recommendation. Reference specific product requirements and cost tradeoffs.>

**Switch trigger**: <When to reconsider — e.g., "If user count exceeds 50K, re-evaluate build vs vendor cost crossover point">

**Bootstrap upgrade trigger**: <When the MVP approach stops working — e.g., ">1K users", ">100 daily transactions">

---

## 6. Cost Analysis

### Cost at Three Scale Points

| Scale | Recommended | Bootstrap/MVP | Notes |
|-------|------------|---------------|-------|
| 100 users | $X/mo | $X/mo | <Launch phase> |
| 10,000 users | $X/mo | $X/mo or N/A | <Growth phase> |
| 100,000 users | $X/mo | N/A | <Scale phase> |

### Year 1 Total Cost (Recommended Option)

| Cost Component | Amount (Range) | Notes |
|----------------|---------------|-------|
| Setup/migration | $X–$Y | <one-time> |
| Monthly subscription/hosting | $X × 12 = $X | <recurring vendor fees> |
| Integration development | $X–$Y | <one-time> |
| **Year 1 Total** | **$X–$Y** | |

### Year 1 Total Cost (Bootstrap/MVP Option)

| Cost Component | Amount (Range) | Notes |
|----------------|---------------|-------|
| Setup | $X–$Y | <one-time, minimal> |
| Monthly cost | $X × 12 = $X | <free tier / minimal plan> |
| **Bootstrap Year 1 Total** | **$X–$Y** | |

*Use ranges (not point estimates) for all development effort costs. The range should reflect realistic best-case to reasonable-worst-case.*

### Cost Sanity Check

- **Product Year 1 projected revenue**: $X (from BRD)
- **This system as % of revenue**: X% — <acceptable / high / needs review>
- **What similar startups pay**: <brief market comparison>
- **Would a bootstrapped founder pay this?**: Yes / No — <reasoning>

---

## 7. Impact Assessment

| Dimension | Impact | Details |
|-----------|--------|---------|
| **Revenue** | High / Medium / Low / None | <How this system affects revenue — direct billing, indirect through retention> |
| **Conversion** | High / Medium / Low / None | <How this system affects user conversion — onboarding, trust, UX> |
| **Operations** | High / Medium / Low / None | <How this system affects operations — support load, admin efficiency> |
| **Compliance** | High / Medium / Low / None | <Regulatory requirements this system addresses — PDPL, PCI-DSS, etc.> |

---

## 8. Priority Tier Classification

**Priority**: Essential / Growth / Enterprise

**Rationale**: <Why this priority — reference impact assessment, product requirements, and launch timeline.>

**Phase recommendation**: <When to implement — e.g., "Phase 0 (before launch)", "Phase 2 (after core features)", "Phase N (enterprise tier)">

---

## 9. Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | <Source name> | <URL> | YYYY-MM-DD | <What data was used from this source> |
```
