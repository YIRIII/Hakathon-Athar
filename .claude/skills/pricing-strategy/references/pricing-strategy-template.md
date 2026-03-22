# Pricing Strategy Template

This template defines the structure for pricing strategy analysis. Every idea uses the folder format for consistency and resumability.

```
PRICING_STRATEGY/
├── README.md                              # Progress tracker + executive summary + strategy
├── 01-competitive-pricing-landscape.md    # Per-competitor pricing teardowns
├── 02-revenue-model-evaluation.md         # Revenue model fit scoring
├── 03-value-metrics-wtp.md                # Value metrics + WTP analysis
├── 04-tier-package-design.md              # Tier structure + feature mapping
└── 05-unit-economics.md                   # Costs, margins, breakeven, projections
```

---

## README / Executive Summary Structure

```markdown
# Pricing Strategy: <Idea Name>

**Version**: 1.0
**Date**: <YYYY-MM-DD>
**Status**: Draft | Complete
**Author**: Idea Forge (AI-Generated)
**BRD Reference**: [INITIAL-BRD.md](preparation/INITIAL-BRD.md)
**Business Research Reference**: [BUSINESS_RESEARCH/README.md](BUSINESS_RESEARCH/README.md)
**Technical Options Reference**: [TECHNICAL_OPTIONS/README.md](TECHNICAL_OPTIONS/README.md)

---

## Research Progress

| # | Phase | File | Depends On | Status | Updated |
|---|-------|------|-----------|--------|---------|
| 1 | Competitive Pricing Landscape | [01-competitive-pricing-landscape.md](01-competitive-pricing-landscape.md) | — | pending / complete | <date> |
| 2 | Revenue Model Evaluation | [02-revenue-model-evaluation.md](02-revenue-model-evaluation.md) | — | pending / complete | <date> |
| 3 | Value Metrics & WTP Analysis | [03-value-metrics-wtp.md](03-value-metrics-wtp.md) | — | pending / complete | <date> |
| 4 | Tier & Package Design | [04-tier-package-design.md](04-tier-package-design.md) | 1, 2, 3 | pending / complete | <date> |
| 5 | Unit Economics & Projections | [05-unit-economics.md](05-unit-economics.md) | 1, 2, 3, 4 | pending / complete | <date> |

---

## Executive Summary

<2-3 paragraphs: Recommended pricing model, primary revenue tier and price point,
key competitive positioning rationale, unit economics headline (gross margin, LTV:CAC,
breakeven), and Year 1/Year 3 ARR projections (base scenario). Note key risks and
open questions that require pre-launch validation.>

## Recommended Pricing Model

**Model**: <e.g., Freemium with tiered subscription>
**Rationale**: <Why this model — reference Phase 2 scoring, competitive norms from Phase 1, and WTP signals from Phase 3>
**Runner-up**: <Alternative model and conditions under which it would be preferred>

## Tier Overview

| Tier | Price (Monthly) | Price (Annual) | Target User | Key Features | Upgrade Trigger |
|------|----------------|----------------|-------------|--------------|-----------------|
| <Free/Starter> | $0 | $0 | <persona> | <feature list with limits> | <what makes them upgrade> |
| <Pro/Core> | $X | $X ($Y/mo) | <persona> | <feature list> | <what differentiates from Free> |
| <Business/Premium> | $X | $X ($Y/mo) | <persona> | <feature list> | <what differentiates from Pro> |
| <Enterprise> | Custom | Custom | <persona> | <feature list> | <why they need Enterprise> |

**Annual discount**: <X%> — <rationale from industry benchmarks>
**Primary revenue tier**: <which tier and why>

## Competitive Pricing Position

| Position | Description |
|----------|-------------|
| **Strategy** | Premium / Mid-market / Budget / Freemium-first |
| **Price vs. Competitors** | Above / At / Below market average |
| **Justification** | <Why this positioning — reference competitive data from Phase 1> |
| **Perceived Value** | <What justifies the price — feature advantages, UX, support> |

## Key Metrics Summary

| Metric | Conservative | Base | Optimistic | Source/Benchmark |
|--------|-------------|------|-----------|-----------------|
| Monthly churn rate | <X%> | <X%> | <X%> | <source> |
| Free→Paid conversion | <X%> | <X%> | <X%> | <source> |
| ARPU (blended) | $X | $X | $X | Phase 4 tier pricing |
| Gross margin | <X%> | <X%> | <X%> | Phase 5 cost analysis |
| LTV | $X | $X | $X | ARPU × margin × (1/churn) |
| CAC | $X | $X | $X | <source> |
| LTV:CAC | <X:1> | <X:1> | <X:1> | Derived |
| Payback period | <X> months | <X> months | <X> months | CAC / monthly contribution |
| Breakeven users | <N> | <N> | <N> | Fixed costs / contribution margin |
| Year 1 ARR | $X | $X | $X | Phase 5 projections |
| Year 3 ARR | $X | $X | $X | Phase 5 projections |

## Pricing Launch Strategy

### Phase 1: Launch (Months 1-6)
- <Pricing approach for initial launch — e.g., founder pricing, early-bird discounts, invite-only>
- <Rationale — why this approach reduces risk for a new product>

### Phase 2: Growth (Months 7-12)
- <Pricing adjustments based on initial data — e.g., introduce annual plans, adjust limits>
- <What data triggers this phase transition>

### Phase 3: Optimization (Months 13-18)
- <Pricing optimization based on usage data — e.g., enterprise tier launch, usage-based add-ons>
- <What metrics indicate readiness for this phase>

## Pricing Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| <Competitor undercuts pricing> | <H/M/L> | <H/M/L> | <Strategy> |
| <Conversion rate below projections> | <H/M/L> | <H/M/L> | <Strategy> |
| <Cost-to-serve exceeds estimates> | <H/M/L> | <H/M/L> | <Strategy> |
| <Market WTP lower than estimated> | <H/M/L> | <H/M/L> | <Strategy> |
| <Regional pricing complexity> | <H/M/L> | <H/M/L> | <Strategy> |

## Open Questions & Next Steps

| ID | Question | Impact | Recommended Action |
|----|----------|--------|-------------------|
| PRQ-1 | Run Van Westendorp PSM survey with target users pre-launch | Validates price points | Design survey, recruit 50-100 target users |
| PRQ-2 | Negotiate vendor pricing for volume discounts | Affects gross margin | Contact top 3 vendors with projected volumes |
| PRQ-3 | <question> | <impact> | <action> |

---

*This pricing strategy was generated by Idea Forge using competitive pricing research and
industry benchmarks. Price points and projections should be validated through customer
interviews and A/B testing before final implementation.*
```

---

## Phase 1: Competitive Pricing Landscape Structure

```markdown
# Competitive Pricing Landscape

**Idea**: <Idea Name>
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 5 (Competitive Landscape)
**Business Research Reference**: [BUSINESS_RESEARCH/README.md](../BUSINESS_RESEARCH/README.md)
**Research Date**: <YYYY-MM-DD>

---

## 1. Competitor Pricing Matrix

| Competitor | Product | Pricing Model | Free Tier | Starter/Basic | Pro/Growth | Enterprise | Value Metric | Source |
|-----------|---------|---------------|-----------|---------------|------------|-----------|--------------|--------|
| <Name> | <Product> | <Subscription/Freemium/Usage> | <limits> | $X/mo | $X/mo | Contact Sales | <per user/per doc/etc.> | <URL> |

## 2. Pricing Model Distribution

| Model | Count | % of Market | Examples |
|-------|-------|-------------|---------|
| Freemium | <N> | <X%> | <Names> |
| Subscription (flat) | <N> | <X%> | <Names> |
| Usage-based | <N> | <X%> | <Names> |
| Tiered subscription | <N> | <X%> | <Names> |
| One-time | <N> | <X%> | <Names> |
| Hybrid | <N> | <X%> | <Names> |

## 3. Price Point Analysis

### Price Clustering
<Where do most competitors' price points cluster? Identify bands.>

| Segment | Price Range (Monthly) | Competitors | Positioning |
|---------|----------------------|-------------|-------------|
| Budget | $X–$X | <Names> | <What they trade off> |
| Mid-market | $X–$X | <Names> | <Standard offering> |
| Premium | $X–$X | <Names> | <What justifies premium> |

### Value Metric Analysis
| Value Metric | Prevalence | Pros | Cons |
|-------------|------------|------|------|
| Per user/seat | <N competitors> | <pros> | <cons> |
| Per document/transaction | <N competitors> | <pros> | <cons> |
| Per feature tier | <N competitors> | <pros> | <cons> |

## 4. Free Tier Analysis

| Competitor | Free Tier Limits | Conversion Trigger | Est. Conversion Rate |
|-----------|-----------------|-------------------|---------------------|
| <Name> | <specific limits> | <what pushes to paid> | <X%> (source: <ref>) |

## 5. Regional Pricing Variations

<Any MENA/Saudi-specific pricing differences? PPP adjustments by competitors?
Regional payment method preferences (Mada, STC Pay, etc.)?>

## 6. Pricing Trends

<Recent pricing changes in the market. Direction of pricing (up/down).
New entrants disrupting pricing. Consolidation effects.>

## 7. Key Insights

1. <Insight about competitive pricing pattern>
2. <Insight about market gap or opportunity>
3. <Insight about pricing risk or constraint>

## 8. Sources

<Bibliography with URLs and access dates for all competitor pricing data.>
```

---

## Phase 2: Revenue Model Evaluation Structure

```markdown
# Revenue Model Evaluation

**Idea**: <Idea Name>
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 8 (Revenue Model)
**Business Research Reference**: [BUSINESS_RESEARCH/README.md](../BUSINESS_RESEARCH/README.md) — Business Model Validation
**Research Date**: <YYYY-MM-DD>

---

## 1. Current BRD Revenue Model

<Summary of what Section 8 proposes. Note any ungrounded assumptions.>

## 2. Revenue Models Evaluated

### Model Scoring Matrix

| Model | Predictability (1-5) | Acquisition Fit (1-5) | Value Alignment (1-5) | Market Convention (1-5) | Expansion Potential (1-5) | Implementation Complexity (1-5) | Cash Flow (1-5) | Weighted Score |
|-------|---------------------|----------------------|----------------------|------------------------|--------------------------|-------------------------------|-----------------|----------------|
| Subscription (flat) | <score> | <score> | <score> | <score> | <score> | <score> | <score> | <weighted> |
| Freemium | <score> | <score> | <score> | <score> | <score> | <score> | <score> | <weighted> |
| Usage-based | <score> | <score> | <score> | <score> | <score> | <score> | <score> | <weighted> |
| Tiered subscription | <score> | <score> | <score> | <score> | <score> | <score> | <score> | <weighted> |
| Marketplace/tx fee | <score> | <score> | <score> | <score> | <score> | <score> | <score> | <weighted> |
| One-time license | <score> | <score> | <score> | <score> | <score> | <score> | <score> | <weighted> |
| Hybrid | <score> | <score> | <score> | <score> | <score> | <score> | <score> | <weighted> |

**Scoring criteria weights**: Predictability (20%), Acquisition Fit (15%), Value Alignment (20%), Market Convention (15%), Expansion Potential (15%), Implementation Complexity (5%), Cash Flow (10%)

### Score Rationales

#### <Model 1 Name>
| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Predictability | <1-5> | <justification with market evidence> |
| Acquisition Fit | <1-5> | <justification> |
| ... | | |

#### <Model 2 Name>
<Same structure>

## 3. Industry Benchmarks

| Metric | SaaS Average | Top Quartile | Relevant Comparable | Source |
|--------|-------------|-------------|-------------------|--------|
| Free→Paid conversion | <X%> | <X%> | <Company: X%> | <source> |
| Monthly churn | <X%> | <X%> | <Company: X%> | <source> |
| Net revenue retention | <X%> | <X%> | <Company: X%> | <source> |
| Expansion revenue % | <X%> | <X%> | <Company: X%> | <source> |
| Annual plan adoption | <X%> | <X%> | <Company: X%> | <source> |

## 4. Recommendation

**Recommended**: <Model name>

<Detailed rationale:
- Why it scored highest
- How it aligns with the product's value delivery
- What the competitive landscape tells us
- Conditions that would change this recommendation>

**Runner-up**: <Model name>
<When this would be preferred instead>

## 5. Sources

<Bibliography>
```

---

## Phase 3: Value Metrics & WTP Analysis Structure

```markdown
# Value Metrics & Willingness-to-Pay Analysis

**Idea**: <Idea Name>
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Sections 4, 5, 8
**Business Research Reference**: [BUSINESS_RESEARCH/README.md](../BUSINESS_RESEARCH/README.md)
**Research Date**: <YYYY-MM-DD>

---

## 1. Value Metric Evaluation

### Candidate Value Metrics

| Metric | Trackability (1-5) | Value Alignment (1-5) | Predictability (1-5) | Competitive Norm (1-5) | Weighted Score | Rank |
|--------|-------------------|----------------------|---------------------|----------------------|----------------|------|
| Per user/seat | <score> | <score> | <score> | <score> | <weighted> | <rank> |
| Per document/action | <score> | <score> | <score> | <score> | <weighted> | <rank> |
| Per feature module | <score> | <score> | <score> | <score> | <weighted> | <rank> |
| Per usage tier | <score> | <score> | <score> | <score> | <weighted> | <rank> |

### Score Rationales

| Metric | Criterion | Score | Rationale |
|--------|-----------|-------|-----------|
| <Metric> | Trackability | <1-5> | <Can the customer easily understand and predict their bill?> |
| <Metric> | Value Alignment | <1-5> | <Does cost scale with the value received?> |
| <Metric> | Predictability | <1-5> | <Can you forecast revenue from this metric?> |
| <Metric> | Competitive Norm | <1-5> | <Do competitors use this metric?> |

**Recommended value metric**: <metric> — <rationale>

## 2. Van Westendorp PSM Framework

### Product-Specific PSM Questions

1. **Too Expensive**: "At what monthly price for <product with key features> would you say 'this is too expensive, I would never consider it'?"
2. **Expensive but Acceptable**: "At what monthly price would you say 'this is expensive, but I might still consider it given the value'?"
3. **Bargain**: "At what monthly price would you say 'this is a great deal, I'd buy it without hesitation'?"
4. **Too Cheap**: "At what monthly price would you say 'this is so cheap, I'd question the quality'?"

### Proxy WTP Signals

Since we cannot run a live PSM survey, we derive WTP boundaries from market signals:

| Signal | Source | Data Point | Implied Price Boundary |
|--------|--------|-----------|----------------------|
| Competitor median price | Phase 1 analysis | $X/mo for <features> | Expensive-but-acceptable ≈ $X |
| Competitor low-end price | Phase 1 analysis | $X/mo for <features> | Bargain ≈ $X |
| Competitor high-end price | Phase 1 analysis | $X/mo for <features> | Too-expensive ≈ $X |
| Free tier prevalence | Phase 1 analysis | <X%> of competitors | Too-cheap ≈ $X (below this, quality concerns) |
| Conversion rate at price point | <source> | <X%> conversion at $X | Sweet spot indicator |
| Industry WTP research | <source> | <finding> | <boundary> |

### Estimated PSM Price Boundaries

| Boundary | Estimated Price | Confidence | Key Evidence |
|----------|----------------|------------|-------------|
| Too Cheap | < $X/mo | <H/M/L> | <evidence> |
| Bargain | $X/mo | <H/M/L> | <evidence> |
| Optimal Price Point | $X/mo | <H/M/L> | Intersection of bargain and expensive curves |
| Expensive but Acceptable | $X/mo | <H/M/L> | <evidence> |
| Too Expensive | > $X/mo | <H/M/L> | <evidence> |

**Acceptable Price Range**: $X–$X/mo per <value metric>

## 3. Purchasing Power Parity Adjustments

| Region | PPP Multiplier | Adjusted Optimal Price | Source |
|--------|---------------|----------------------|--------|
| Global (baseline) | 1.0x | $X/mo | — |
| Saudi Arabia | <X>x | $X/mo | <World Bank/OECD> |
| MENA average | <X>x | $X/mo | <source> |
| <Other target region> | <X>x | $X/mo | <source> |

**Regional pricing recommendation**: <Single global price / Regional pricing / PPP-adjusted>

## 4. Price Sensitivity Factors

| Factor | Direction | Magnitude | Evidence |
|--------|-----------|-----------|---------|
| <e.g., AI hype premium> | ↑ price tolerance | <H/M/L> | <source> |
| <e.g., many free alternatives> | ↓ price tolerance | <H/M/L> | <source> |
| <e.g., B2B vs B2C> | <direction> | <H/M/L> | <source> |

## 5. Recommended Price Points

| Tier | Recommended Price | PSM Justification | Competitive Justification |
|------|------------------|-------------------|--------------------------|
| <Free> | $0 | Below too-cheap — value demonstration only | <X%> of competitors have free tiers |
| <Pro> | $X/mo | At optimal price point | <positioning vs. competitors> |
| <Business> | $X/mo | Within acceptable range | <positioning vs. competitors> |
| <Enterprise> | Custom | Above expensive-but-acceptable for standard | Enterprise buyers expect custom pricing |

## 6. Open Questions for Pre-Launch Validation

- [ ] Run actual Van Westendorp PSM survey with 50-100 target users
- [ ] A/B test 2-3 price points in the acceptable range
- [ ] Validate regional pricing assumptions with local users
- [ ] <Additional validation needs>

## 7. Sources

<Bibliography>
```

---

## Phase 4: Tier & Package Design Structure

```markdown
# Tier & Package Design

**Idea**: <Idea Name>
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md)
**Business Research Reference**: [BUSINESS_RESEARCH/README.md](../BUSINESS_RESEARCH/README.md) — Feature Tiers
**Phase 1 Reference**: [01-competitive-pricing-landscape.md](01-competitive-pricing-landscape.md)
**Phase 2 Reference**: [02-revenue-model-evaluation.md](02-revenue-model-evaluation.md)
**Phase 3 Reference**: [03-value-metrics-wtp.md](03-value-metrics-wtp.md)
**Research Date**: <YYYY-MM-DD>

---

## 1. Feature-to-Tier Mapping

### Source: BUSINESS_RESEARCH Feature Tiers

| BR ID | Feature | Business Tier | Pricing Tier | Rationale |
|-------|---------|---------------|-------------|-----------|
| BR-X | <Name> | Hero | Core/Pro (upgrade driver) | <Why this drives upgrades> |
| BR-X | <Name> | Hero | Core/Pro (upgrade driver) | <Why this drives upgrades> |
| BR-X | <Name> | Depth | Core/Pro + Premium split | <Which aspects are Pro vs Premium> |
| BR-X | <Name> | Depth | Core/Pro | <Full access at Pro> |
| BR-X | <Name> | Supporting | Free (limited) + Premium (full) | <What limits apply at Free> |
| BR-X | <Name> | Supporting | Premium | <Why gated to Premium> |
| BR-X | <Name> | Skip | Enterprise only / Excluded | <Why excluded from standard tiers> |

**Mapping principles**:
- Hero features → Core/Pro tier (these are the upgrade drivers from Free)
- Depth features → Split between Core/Pro (basic) and Premium (advanced)
- Supporting features → Free (with limits) or Premium (full access)
- Skip features → Enterprise-only or deferred entirely

## 2. Tier Definitions

### Tier 1: <Free/Starter>

| Attribute | Detail |
|-----------|--------|
| **Price** | $0/mo |
| **Target user** | <persona description> |
| **Purpose** | Value demonstration — enough to validate, not enough to replace paying |
| **Limits** | <specific limits: N documents, N users, N API calls, etc.> |

**Features included:**
| Feature | Access Level | Limit |
|---------|-------------|-------|
| <Feature 1> | Limited | <specific limit> |
| <Feature 2> | Full | — |

**Upgrade trigger**: <What specific limit or need pushes users to Pro>

### Tier 2: <Pro/Core> — Primary Revenue Tier

| Attribute | Detail |
|-----------|--------|
| **Price** | $X/mo ($Y/mo annual) |
| **Target user** | <persona description> |
| **Purpose** | Full product access for individual users / small teams |
| **Value proposition** | <what they get for their money> |

**Features included:**
| Feature | Access Level | Limit |
|---------|-------------|-------|
| <Feature 1> | Full | <higher limit or unlimited> |
| <Feature 2> | Full | — |
| <Feature 3> | Full | — |

**Upgrade trigger**: <What pushes users to Business/Premium>

### Tier 3: <Business/Premium>

| Attribute | Detail |
|-----------|--------|
| **Price** | $X/mo ($Y/mo annual) |
| **Target user** | <persona description> |
| **Purpose** | Advanced features for growing teams |
| **Value proposition** | <what they get beyond Pro> |

**Features included:**
<Same table structure — all Pro features plus additional>

**Upgrade trigger**: <What pushes to Enterprise>

### Tier 4: <Enterprise> (if applicable)

| Attribute | Detail |
|-----------|--------|
| **Price** | Custom (starting from ~$X/mo) |
| **Target user** | <persona description> |
| **Purpose** | Custom deployments, SLA, compliance |
| **Sales motion** | Contact sales / demo request |

**Features included:**
<All Premium features plus enterprise additions>

## 3. Pricing Psychology Applied

| Technique | Application | Expected Effect |
|-----------|-------------|-----------------|
| **Anchoring** | <How the tier order/pricing creates anchoring> | <Expected behavior> |
| **Decoy effect** | <If a tier serves as a decoy, explain> | <Pushes users toward target tier> |
| **Charm pricing** | <$X9 vs round numbers — which and why> | <Perceived value> |
| **Annual discount** | <X%> discount for annual commitment | Improves retention, cash flow |
| **Loss aversion** | <Trial/downgrade messaging strategy> | Reduces churn during trials |

## 4. Competitive Tier Comparison

| Feature | Our Free | Our Pro | Competitor A Free | Competitor A Pro | Competitor B |
|---------|----------|---------|-------------------|------------------|--------------|
| <Feature 1> | <access> | <access> | <access> | <access> | <access> |
| <Feature 2> | <access> | <access> | <access> | <access> | <access> |
| **Price** | $0 | $X | $0 | $X | $X |

## 5. Migration & Grandfathering Strategy

- **Beta → Launch**: <How early users transition — grandfathered pricing? Time-limited discount?>
- **Plan changes**: <Upgrade immediate, downgrade at period end>
- **Price increases**: <30/60/90-day notice, existing users grandfathered for N months>

## 6. Sources

<Bibliography for pricing psychology research and competitive tier comparisons>
```

---

## Phase 5: Unit Economics & Projections Structure

```markdown
# Unit Economics & Revenue Projections

**Idea**: <Idea Name>
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section 13 (Budget)
**Technical Options Reference**: [TECHNICAL_OPTIONS/README.md](../TECHNICAL_OPTIONS/README.md) — Cost Impact Summary
**Phase 4 Reference**: [04-tier-package-design.md](04-tier-package-design.md)
**Research Date**: <YYYY-MM-DD>

---

## 1. Cost-to-Serve Analysis

### Variable Costs per User (Monthly)

| Cost Category | Source | Free Tier | Pro Tier | Business Tier | Enterprise Tier | Notes |
|--------------|--------|-----------|----------|---------------|-----------------|-------|
| Infrastructure (hosting) | TECHNICAL_OPTIONS | $X | $X | $X | $X | <basis: per-user allocation> |
| API/third-party services | TECHNICAL_OPTIONS/<capability>.md | $X | $X | $X | $X | <specific services> |
| AI/ML inference costs | TECHNICAL_OPTIONS/<capability>.md | $X | $X | $X | $X | <per-request costs> |
| Storage | TECHNICAL_OPTIONS | $X | $X | $X | $X | <per-user allocation> |
| Support (allocated) | Industry benchmark | $X | $X | $X | $X | <source for support cost ratio> |
| Payment processing | Stripe standard | — | $X (2.9%+30c) | $X | $X | Per transaction |
| **Total variable/user** | | **$X** | **$X** | **$X** | **$X** | |

### Fixed Costs (Monthly)

| Cost Category | Amount | Source | Notes |
|--------------|--------|--------|-------|
| Team (salaries) | $X–$X | BRD Section 13 | <use ranges for development effort costs> |
| Office/tools | $X–$X | BRD estimate | <breakdown> |
| Marketing/acquisition | $X–$X | <budget allocation> | <% of revenue target> |
| Infrastructure (base) | $X–$X | TECHNICAL_OPTIONS | <minimum infra regardless of users> |
| **Total fixed** | **$X–$X** | | |

## 2. Gross Margin Analysis

| Tier | Revenue/User | Variable Cost/User | Gross Profit/User | Gross Margin |
|------|-------------|-------------------|-------------------|-------------|
| Free | $0 | $X | -$X | N/A (cost center) |
| Pro | $X | $X | $X | <X%> |
| Business | $X | $X | $X | <X%> |
| Enterprise | ~$X | $X | $X | <X%> |
| **Blended (target mix)** | **$X** | **$X** | **$X** | **<X%>** |

**Target tier mix**: <X%> Free, <X%> Pro, <X%> Business, <X%> Enterprise
**Blended gross margin**: <X%> (SaaS benchmark: 70-80%)

## 3. Breakeven Analysis

| Metric | Value | Calculation |
|--------|-------|------------|
| Monthly fixed costs | $X–$X | From Section 1 |
| Avg. contribution margin per paid user | $X | Blended gross profit/user |
| Breakeven paid users | <N>–<N> | Fixed costs / contribution margin |
| At target conversion rate (<X%>) | <N>–<N> total users | Breakeven paid / conversion rate |
| Estimated months to breakeven | <N>–<N> months | Based on base growth scenario |

## 4. Key SaaS Metrics

### LTV Calculation

| Input | Conservative | Base | Optimistic | Source |
|-------|-------------|------|-----------|--------|
| Monthly ARPU (blended paid) | $X | $X | $X | Phase 4 pricing × tier mix |
| Gross margin | <X%> | <X%> | <X%> | Section 2 |
| Monthly churn rate | <X%> | <X%> | <X%> | <industry benchmark source> |
| Avg. customer lifetime | <N> months | <N> months | <N> months | 1 / churn rate |
| **LTV** | **$X** | **$X** | **$X** | ARPU × margin × lifetime |

### CAC Estimation

| Channel | Est. CAC | Benchmark Source | Mix % |
|---------|---------|-----------------|-------|
| Organic/SEO | $X | <source> | <X%> |
| Content marketing | $X | <source> | <X%> |
| Paid acquisition | $X | <source> | <X%> |
| Referral | $X | <source> | <X%> |
| **Blended CAC** | **$X** | | |

### LTV:CAC Analysis

| Scenario | LTV | CAC | LTV:CAC | Payback (months) | Verdict |
|----------|-----|-----|---------|-------------------|---------|
| Conservative | $X | $X | <X:1> | <N> | <Healthy/Marginal/Unsustainable> |
| Base | $X | $X | <X:1> | <N> | <Healthy/Marginal/Unsustainable> |
| Optimistic | $X | $X | <X:1> | <N> | <Healthy/Marginal/Unsustainable> |

**Target**: LTV:CAC ≥ 3:1, Payback ≤ 18 months

## 5. Three-Year Revenue Projections

### Assumptions

| Assumption | Conservative | Base | Optimistic | Source |
|-----------|-------------|------|-----------|--------|
| Monthly user growth rate | <X%> | <X%> | <X%> | <source or estimate> |
| Free→Paid conversion | <X%> | <X%> | <X%> | <industry benchmark> |
| Monthly churn (paid) | <X%> | <X%> | <X%> | <industry benchmark> |
| Tier mix (Free:Pro:Biz:Ent) | <ratio> | <ratio> | <ratio> | <assumption basis> |
| ARPU growth (annual) | <X%> | <X%> | <X%> | <price increase + expansion> |

### Conservative Scenario

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Total users (end of year) | <N> | <N> | <N> |
| Paid users (end of year) | <N> | <N> | <N> |
| MRR (end of year) | $X | $X | $X |
| **ARR (end of year)** | **$X** | **$X** | **$X** |
| Total revenue (year) | $X | $X | $X |
| Gross profit (year) | $X | $X | $X |
| Net margin (after fixed) | <X%> | <X%> | <X%> |

### Base Scenario

<Same table structure>

### Optimistic Scenario

<Same table structure>

## 6. Sensitivity Analysis

| Variable Changed | Base ARR (Y1) | Impact on Y1 ARR | Most Sensitive? |
|-----------------|---------------|-------------------|-----------------|
| Conversion +1% | $X | +$X (+<X%>) | |
| Conversion -1% | $X | -$X (-<X%>) | |
| Churn +0.5% | $X | -$X (-<X%>) | |
| Price +$5/mo | $X | +$X (+<X%>) | |
| Price -$5/mo | $X | -$X (-<X%>) | |
| Growth rate +2% | $X | +$X (+<X%>) | |

**Most sensitive variable**: <which one and implications>

## 7. Investment Readiness Metrics

| Metric | Current Projection (Base Y1) | Benchmark for Seed | Benchmark for Series A | Gap |
|--------|-----------------------------|--------------------|----------------------|-----|
| ARR | $X | $0-500K | $1-2M | <gap> |
| MoM growth | <X%> | 15-20% | 10-15% | <gap> |
| Gross margin | <X%> | >60% | >70% | <gap> |
| LTV:CAC | <X:1> | >2:1 | >3:1 | <gap> |
| Net retention | <X%> | >100% | >110% | <gap> |

## 8. Sources

<Bibliography — all benchmark sources, industry reports, competitor data used for projections>
```

---

## Research Guidelines

When generating pricing strategy analysis:

1. **Exhaustive competitor pricing search**: For each competitor, find actual pricing pages — not summary articles. Capture exact prices, tier names, feature gates, and value metrics. When pricing pages are gated or say "Contact Sales," note this explicitly.

2. **Real benchmarks only**: Conversion rates, churn rates, CAC, and other metrics must come from published research, industry reports, or public company data. Never fabricate benchmark numbers.

3. **Cite every number**: Every price point, conversion rate, churn rate, and benchmark must have an inline citation with source URL and date.

4. **Date-stamp all pricing**: Competitor prices change frequently. Note the research date on every price point and recommend revalidation before implementation.

5. **Distinguish sources from assumptions**: Revenue projection inputs must be clearly labeled as either (a) sourced from research, or (b) estimated with stated rationale. Never present an estimate as a researched fact.

6. **Show your math**: Every derived number (LTV, breakeven, projections) must show the full calculation chain so readers can trace inputs and adjust assumptions.

7. **Conservative by default**: When ranges exist, use the conservative end for projections. Present optimistic scenarios separately, never as the baseline.

8. **Regional context matters**: Consider MENA/Saudi market pricing norms, payment methods (Mada, STC Pay, Apple Pay), and purchasing power parity. Not all global benchmarks apply.
