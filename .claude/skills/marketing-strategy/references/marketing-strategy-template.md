# Marketing Strategy Analysis Templates

This file contains the README template and 5 per-phase file templates.

---

## README Template

```markdown
# Marketing Strategy Analysis — <Idea Name>

| Field | Value |
|-------|-------|
| **Version** | 1.0 |
| **Date** | <YYYY-MM-DD> |
| **Status** | In Progress / Complete |
| **Author** | Claude (Idea Forge Pipeline) |
| **BRD Reference** | [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) |
| **Business Research** | [BUSINESS_RESEARCH/](../BUSINESS_RESEARCH/README.md) |
| **Supporting Systems** | [SUPPORTING_SYSTEMS/](../SUPPORTING_SYSTEMS/README.md) *(if available)* |
| **Budget Context** | [BUDGET_CONTEXT.md](../BUDGET_CONTEXT.md) |

---

## Budget Context

| Field | Value |
|-------|-------|
| **Funding Stage** | <Bootstrapped / Pre-seed / Seed / Series A+> |
| **Projected Year 1 Revenue** | $<X> |
| **Revenue Confidence** | <High / Medium / Low> |
| **Marketing Budget Envelope** | Bootstrap: $<X>-$<X>/yr \| Growth: $<X>-$<X>/yr \| Scale: $<X>-$<X>/yr |

---

## Research Progress

| # | Phase | File | Depends On | Status | Updated |
|---|-------|------|-----------|--------|---------|
| 1 | Competitor Marketing Analysis | [01-competitor-marketing-analysis.md](01-competitor-marketing-analysis.md) | — | pending | — |
| 2 | Customer Acquisition Channels | [02-customer-acquisition-channels.md](02-customer-acquisition-channels.md) | — | pending | — |
| 3 | Content & SEO Strategy | [03-content-seo-strategy.md](03-content-seo-strategy.md) | — | pending | — |
| 4 | Go-to-Market Strategy | [04-go-to-market-strategy.md](04-go-to-market-strategy.md) | 1, 2 | pending | — |
| 5 | CAC Estimation & Budget Planning | [05-cac-estimation-budget.md](05-cac-estimation-budget.md) | 1, 2, 3, 4 | pending | — |

---

## Executive Summary

<2-3 paragraphs summarizing the marketing strategy: GTM approach, primary channels, headline CAC, Year 1 marketing budget, and key strategic insights. Written after all phases are complete.>

---

## Recommended Go-to-Market Strategy

**GTM Model:** <PLG / Sales-Led / Community-Led / Hybrid>

**Rationale:** <Why this model fits — reference ACV, buyer type, product characteristics, and competitive landscape. Be specific to this product.>

**Growth Loop:** <Viral / Content / UGC / Paid / Sales / Partner> — <One sentence explaining how the loop works for this specific product.>

---

## Channel Mix

| Channel | Type | Est. CAC | Priority | Bootstrap | Growth | Scale | Stage |
|---------|------|----------|----------|-----------|--------|-------|-------|
| <channel> | Paid / Organic / Direct / Referral / Partnership | $X | High / Medium / Low | <$0 alternative> | $X/mo | $X/mo | Pre-PMF / Early / Growth / Scale |

---

## CAC Estimates

| Metric | Value | Source |
|--------|-------|--------|
| **Blended CAC** | $X | Weighted average of channel CACs |
| **Best channel CAC** | $X (<channel>) | <source> |
| **Industry benchmark CAC** | $X | <study/report name, year> |
| **CAC payback period** | X months | CAC / (Monthly ARPU × Gross Margin) |

### Per-Channel CAC Breakdown

| Channel | Monthly Spend | Expected Conversions | Channel CAC | Notes |
|---------|-------------|---------------------|-------------|-------|
| <channel> | $X | X | $X | <benchmark source> |

---

## Marketing Budget

### Budget Tiers

| Tier | Monthly | Annual | Channels Active | Trigger |
|------|---------|--------|----------------|---------|
| **Bootstrap** | $0-$<X> (<X> hrs/wk founder time + low-cost where needed) | $0-$<X>/yr | <channels> | Start here (pre-revenue) |
| **Growth** | $<X>/mo | $<X>/yr | <channels> | MRR > $<X> for 2+ consecutive months |
| **Scale** | $<X>/mo | $<X>/yr | <channels> | MRR > $<X> for 2+ months, or funding secured |

### Bootstrap Tier Detail

| Activity | Hours/Week | Expected Results | Timeline |
|----------|-----------|-----------------|----------|
| <activity> | <X> hrs | <expected outcome> | <weeks to see results> |
| **Total** | **<X> hrs/wk** | | |

### Scale Tier — Year 1 by Quarter

| Quarter | Budget | Primary Channels | Focus |
|---------|--------|-----------------|-------|
| Q1 | $X | <channels> | Launch & awareness |
| Q2 | $X | <channels> | Optimization |
| Q3 | $X | <channels> | Scale winners |
| Q4 | $X | <channels> | Expand & iterate |
| **Year 1 Total** | **$X** | | |

### Cost Sanity Check

| Check | Value | Threshold | Status |
|-------|-------|-----------|--------|
| Scale Year 1 / Projected Year 1 Revenue | <X%> | <30% (bootstrapped) / <50% | OK / Flag / Block |
| Marketing envelope from BUDGET_CONTEXT.md | $<X>-$<X>/yr | — | Within / Exceeds |

### By Channel (Scale Tier)

| Channel | Annual Budget | % of Total | Expected ROI |
|---------|-------------|-----------|-------------|
| <channel> | $X | X% | <X:1 or qualitative> |

---

## Marketing-Driven Product Features

Features that should be prioritized for marketing impact — these feed into `/tech-research` as additional capabilities to evaluate:

| Feature | Marketing Impact | Implementation Effort | Priority |
|---------|-----------------|---------------------|----------|
| <feature> | <How it drives acquisition/retention — e.g., "Referral system drives viral loop"> | Low / Medium / High | High / Medium / Low |

---

## Impact on Downstream Skills

### For /tech-research
- **Marketing tool integrations**: <Tools that need technical evaluation — e.g., analytics SDK, email service, push notification provider>
- **Marketing-driven features**: <Features to add to tech research scope — e.g., referral system, social sharing, embeddable widgets>
- **Infrastructure needs**: <Marketing infrastructure — e.g., event tracking, A/B testing framework>

### For /pricing-strategy
- **CAC data**: Blended CAC of $<X> — use for LTV:CAC calculation in Phase 5 (Unit Economics)
- **Channel costs**: Per-channel CAC breakdown available in `05-cac-estimation-budget.md`
- **Conversion assumptions**: <Expected conversion rates by channel — sourced benchmarks>
- **Marketing budget impact**: $<X>/year marketing spend affects breakeven calculation

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| <risk> | High / Medium / Low | High / Medium / Low | <specific mitigation strategy> |

---

## Open Questions & Next Steps

- [ ] <Question or decision needed>
- [ ] <Follow-up research needed>
```

---

## Phase 1 Template — Competitor Marketing Analysis

```markdown
# Phase 1: Competitor Marketing Analysis — <Idea Name>

| Field | Value |
|-------|-------|
| **Phase** | 1 of 5 |
| **Status** | Complete |
| **Date** | <YYYY-MM-DD> |
| **FACT-ID Prefix** | MKG |

---

## Competitor Marketing Profiles

### <Competitor 1 Name>

| Dimension | Finding | Source |
|-----------|---------|--------|
| **Website** | <URL> | Direct |
| **Primary marketing channels** | <channels used> | <source — e.g., SimilarWeb data, observed ads, social profiles> |
| **Estimated monthly ad spend** | $<X> | <source — e.g., industry estimate, ad library data> |
| **Content strategy** | <blog frequency, content types, key topics> | <source> |
| **Social media presence** | <platforms, follower counts, engagement> | <source — direct observation, date> |
| **Brand positioning** | <how they position themselves — tagline, messaging> | <source — website, marketing materials> |
| **Referral/affiliate program** | Yes / No — <details> | <source> |
| **Notable campaigns** | <any viral moments, notable campaigns> | <source> |

*(Repeat for each major competitor)*

---

## Cross-Competitor Analysis

### Channel Distribution

| Channel | Competitor 1 | Competitor 2 | Competitor 3 | Market Average |
|---------|-------------|-------------|-------------|---------------|
| Paid Search | Active / Inactive | ... | ... | X% of competitors |
| Social Media | Active / Inactive | ... | ... | X% of competitors |
| Content Marketing | Active / Inactive | ... | ... | X% of competitors |
| Email Marketing | Active / Inactive | ... | ... | X% of competitors |
| Partnerships | Active / Inactive | ... | ... | X% of competitors |

### Positioning Map

<How competitors position themselves relative to each other. Identify gaps in positioning that this product can own.>

---

## Marketing Gaps & Opportunities

| Gap | Opportunity | Supporting Evidence |
|-----|-------------|-------------------|
| <What competitors aren't doing well> | <How this product can exploit the gap> | <Specific data points> |

---

## Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | <Source name> | <URL> | YYYY-MM-DD | <What data was used> |
```

---

## Phase 2 Template — Customer Acquisition Channels

```markdown
# Phase 2: Customer Acquisition Channels — <Idea Name>

| Field | Value |
|-------|-------|
| **Phase** | 2 of 5 |
| **Status** | Complete |
| **Date** | <YYYY-MM-DD> |
| **FACT-ID Prefix** | MKG |

---

## Channel Evaluation Matrix

| Channel | Reach (1-5) | Est. CAC (1-5) | Scalability (1-5) | Time-to-Results (1-5) | ICP Fit (1-5) | **Total** | Priority |
|---------|-------------|----------------|-------------------|----------------------|---------------|-----------|----------|
| <channel> | X | X | X | X | X | X.X | High / Medium / Low |

*CAC scoring: 5 = lowest CAC (best), 1 = highest CAC (worst)*

---

## Per-Channel Deep Dive

### <Channel Name>

**Overview**: <How this channel works for this specific product and market>

**Estimated CAC**: $<X> — based on <benchmark source, year>

**Pros**:
- <specific to this product>

**Cons**:
- <specific to this product>

**Recommended approach**: <Specific tactics, not generic advice. Reference the actual product name and ICP.>

*(Repeat for each evaluated channel)*

---

## Partnerships as a Channel

### Partnership Readiness Check

| Factor | Assessment | Notes |
|--------|-----------|-------|
| **Current stage** | Pre-PMF / Early / Growth | <where the product is> |
| **Value proposition clarity** | Clear / Developing / Unclear | <can you articulate partner value?> |
| **Potential partners** | <list 3-5 specific companies/types> | <why they'd partner> |
| **Recommended timing** | Now / After PMF / After <milestone> | <rationale> |

**Partnership types to explore:**
- <Type 1>: <specific partners, rationale>
- <Type 2>: <specific partners, rationale>

---

## Channel Sequencing by Stage

| Stage | Recommended Channels | Rationale |
|-------|---------------------|-----------|
| **Pre-PMF** | Founder sales, direct outreach, communities | Validate messaging, learn ICP, get direct feedback |
| **Early traction** | Content marketing, outbound, targeted paid | Build awareness in validated segments |
| **Growth** | SEO, scaled paid, partnerships, affiliates | Proven channels, optimize CAC |
| **Scale** | All channels, brand marketing, international | Maximum reach, brand moat |

---

## Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | <Source name> | <URL> | YYYY-MM-DD | <What data was used> |
```

---

## Phase 3 Template — Content & SEO Strategy

```markdown
# Phase 3: Content & SEO Strategy — <Idea Name>

| Field | Value |
|-------|-------|
| **Phase** | 3 of 5 |
| **Status** | Complete |
| **Date** | <YYYY-MM-DD> |
| **FACT-ID Prefix** | MKG |

---

## Keyword Opportunities

### High-Intent Keywords

| Keyword | Est. Monthly Volume | Difficulty | Current Top Results | Opportunity |
|---------|-------------------|-----------|--------------------|--------------------|
| <keyword> | <volume> | High / Medium / Low | <who ranks> | <gap or angle> |

### Long-Tail Keywords

| Keyword | Est. Monthly Volume | Difficulty | Content Type |
|---------|-------------------|-----------|-------------|
| <keyword> | <volume> | Low / Medium | <blog / landing page / tool> |

---

## Content Gap Analysis

| Topic/Question | Search Volume Signal | Existing Content Quality | Opportunity |
|---------------|---------------------|------------------------|-------------|
| <What users are searching for> | High / Medium / Low | Poor / Moderate / Good | <What content to create> |

---

## SEO Competitive Landscape

| Competitor | Domain Signals | Content Volume | Content Cadence | Key Strengths |
|-----------|---------------|---------------|-----------------|---------------|
| <name> | Strong / Moderate / Weak | <est. pages> | <posts/month> | <what they do well> |

---

## Content Calendar Framework

### Content Pillars

| Pillar | Tied to Feature | Funnel Stage | Content Types | Frequency |
|--------|----------------|-------------|---------------|-----------|
| <pillar topic> | <Hero/Depth feature from business research> | Awareness / Consideration / Decision | Blog, Video, Guide | X/month |

### Distribution Strategy

| Content Type | Primary Distribution | Secondary Distribution | Expected Reach |
|-------------|---------------------|----------------------|---------------|
| <type> | <where to publish> | <where to share> | <estimated reach> |

---

## Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | <Source name> | <URL> | YYYY-MM-DD | <What data was used> |
```

---

## Phase 4 Template — Go-to-Market Strategy

```markdown
# Phase 4: Go-to-Market Strategy — <Idea Name>

| Field | Value |
|-------|-------|
| **Phase** | 4 of 5 |
| **Status** | Complete |
| **Date** | <YYYY-MM-DD> |
| **FACT-ID Prefix** | MKG |

---

## PLG vs Sales-Led Decision

### Decision Tree Analysis

| Factor | Value | Implication |
|--------|-------|------------|
| **Expected ACV** | $<X>/year | <PLG territory / Sales territory> |
| **Buyer persona** | Technical / Non-technical | <Self-serve capable / Needs guidance> |
| **Product complexity** | Low / Medium / High | <Can users onboard alone?> |
| **Self-serve potential** | High / Medium / Low | <Can users get value without human help?> |
| **Competitive GTM** | <What competitors use> | <Market expectation> |

**Recommended GTM Model:** <PLG / Sales-Led / Community-Led / Hybrid>

**Rationale:** <Specific reasoning tied to this product's characteristics, not generic advice.>

### Growth Loop

**Primary loop:** <Viral / Content / UGC / Paid / Sales / Partner>

**How it works for <Product Name>:** <Specific description of how the loop operates — e.g., "Users create booking pages → share with clients → clients discover the platform → sign up as providers">

---

## Positioning & Messaging

### Value Proposition

**For** <target user> **who** <problem/need>, **<Product Name>** is a <category> **that** <key benefit>. **Unlike** <competitors>, **we** <key differentiator>.

### Messaging by Persona

| Persona | Primary Pain Point | Key Message | Proof Point |
|---------|-------------------|-------------|------------|
| <persona> | <specific pain> | <specific message> | <data/feature that proves it> |

---

## Launch Strategy

### Pre-Launch (T-30 to T-0)

| Activity | Timeline | Goal | Metric |
|----------|----------|------|--------|
| <activity> | T-<N> days | <goal> | <how to measure> |

### Launch Day

| Activity | Channel | Expected Impact |
|----------|---------|----------------|
| <activity> | <channel> | <expected result> |

### Post-Launch 90-Day Plan

| Week | Focus | Key Activities | Success Metric |
|------|-------|---------------|---------------|
| 1-2 | <focus> | <activities> | <metric> |
| 3-4 | <focus> | <activities> | <metric> |
| 5-8 | <focus> | <activities> | <metric> |
| 9-12 | <focus> | <activities> | <metric> |

---

## Early Adopter Acquisition — First 100 Users

| Tactic | Expected Users | Timeline | Cost |
|--------|---------------|----------|------|
| <specific tactic> | <N> | <weeks> | $<X> |

**Total estimated cost for first 100 users:** $<X>
**Effective CAC for first 100:** $<X>

---

## Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | <Source name> | <URL> | YYYY-MM-DD | <What data was used> |
```

---

## Phase 5 Template — CAC Estimation & Budget Planning

```markdown
# Phase 5: CAC Estimation & Budget Planning — <Idea Name>

| Field | Value |
|-------|-------|
| **Phase** | 5 of 5 |
| **Status** | Complete |
| **Date** | <YYYY-MM-DD> |
| **FACT-ID Prefix** | MKG |

---

## CAC Calculation Methodology

### Industry Benchmarks

| Metric | Value | Source | Year | Geography |
|--------|-------|--------|------|-----------|
| Average CAC (<segment>) | $<X> | <study/report> | <year> | <region> |
| Median CAC (<segment>) | $<X> | <study/report> | <year> | <region> |
| Best-in-class CAC | $<X> | <company/study> | <year> | <region> |

### CAC Components

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| Paid advertising | $<X> | <channel breakdown> |
| Content creation | $<X> | <writers, designers, tools> |
| Sales team (if applicable) | $<X> | <headcount, loaded cost> |
| Marketing tools | $<X> | <CRM, analytics, email, etc.> |
| Onboarding cost | $<X> | <self-serve or human-assisted> |
| **Total monthly marketing spend** | **$<X>** | |

---

## Per-Channel Budget & CAC

| Channel | Monthly Budget | Expected Leads | Expected Conversions | Channel CAC | Source for Conversion Rate |
|---------|---------------|---------------|---------------------|-------------|--------------------------|
| <channel> | $<X> | <N> | <N> | $<X> | <benchmark study, year> |

**Blended CAC:** $<X> (weighted average based on channel mix)

---

## CAC Payback Analysis

| Scenario | ARPU | Gross Margin | Monthly Contribution | CAC | Payback (months) |
|----------|------|-------------|---------------------|-----|-----------------|
| Conservative | $<X>/mo | <X%> | $<X> | $<X> | <N> |
| Base | $<X>/mo | <X%> | $<X> | $<X> | <N> |
| Optimistic | $<X>/mo | <X%> | $<X> | $<X> | <N> |

*ARPU estimates from BRD revenue model — will be refined by /pricing-strategy*

---

## Year 1 Marketing Budget by Tier

### Bootstrap Tier (Minimal Cash)

| Channel | Hours/Week | Monthly Cost | Expected Leads | Expected Conversions |
|---------|-----------|-------------|---------------|---------------------|
| <channel — bootstrap version> | <X> | $0 | <N> | <N> |
| **Total** | **<X> hrs/wk** | **$0** | **<N>** | **<N>** |

### Growth Tier ($<X>-$<X>/mo)

| Channel | Monthly Spend | Expected Leads | Expected Conversions | Channel CAC |
|---------|-------------|---------------|---------------------|-------------|
| <channel> | $<X> | <N> | <N> | $<X> |
| **Total** | **$<X>/mo** | **<N>** | **<N>** | **$<X> blended** |

### Scale Tier (Full Budget)

| Quarter | Total Budget | Paid | Content | Sales | Tools | Events |
|---------|-------------|------|---------|-------|-------|--------|
| Q1 | $<X> | $<X> | $<X> | $<X> | $<X> | $<X> |
| Q2 | $<X> | $<X> | $<X> | $<X> | $<X> | $<X> |
| Q3 | $<X> | $<X> | $<X> | $<X> | $<X> | $<X> |
| Q4 | $<X> | $<X> | $<X> | $<X> | $<X> | $<X> |
| **Year 1** | **$<X>** | **$<X>** | **$<X>** | **$<X>** | **$<X>** | **$<X>** |

### Cost Sanity Check

| Check | Value | Threshold | Status |
|-------|-------|-----------|--------|
| Scale Year 1 spend / Projected Year 1 Revenue | <X%> | <30% bootstrapped / <50% any stage | OK / Flag / Block |
| Scale Year 1 spend vs. Marketing Envelope | $<X> vs. $<X>-$<X> | Within envelope | OK / Exceeds |
| Monthly burn vs. monthly revenue (Month 1) | $<X> vs. $<X> | Revenue > spend | Requires bootstrap tier |

### By Channel (Scale Tier)

| Channel | Annual Budget | % of Total | Expected Conversions | Expected Revenue | ROI |
|---------|-------------|-----------|---------------------|-----------------|-----|
| <channel> | $<X> | <X%> | <N> | $<X> | <X:1> |

---

## Marketing-to-Revenue Projections

### Three Scenarios

| Metric | Conservative | Base | Optimistic | Source/Assumption |
|--------|-------------|------|-----------|-------------------|
| Monthly marketing spend | $<X> | $<X> | $<X> | Budget allocation |
| Monthly leads | <N> | <N> | <N> | <conversion rate source> |
| Lead-to-customer rate | <X%> | <X%> | <X%> | <benchmark source> |
| Monthly new customers | <N> | <N> | <N> | Derived |
| ARPU | $<X> | $<X> | $<X> | BRD estimate |
| Monthly revenue from marketing | $<X> | $<X> | $<X> | Derived |
| Year 1 total revenue | $<X> | $<X> | $<X> | Derived |
| Marketing ROI | <X:1> | <X:1> | <X:1> | Revenue / Spend |

---

## Marketing-Driven Product Features

| Feature | Marketing Impact | How It Drives Growth | Implementation Effort | Priority |
|---------|-----------------|--------------------|--------------------|----------|
| Referral system | Direct acquisition | <specific loop for this product> | Medium | High |
| Social sharing | Awareness | <specific mechanism> | Low | Medium |
| <feature> | <impact type> | <specific to product> | <effort> | <priority> |

---

## Sources

| # | Source | URL | Accessed | Notes |
|---|--------|-----|----------|-------|
| 1 | <Source name> | <URL> | YYYY-MM-DD | <What data was used> |
```
