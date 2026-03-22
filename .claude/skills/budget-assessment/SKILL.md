# Budget Assessment

Shared methodology for assessing an idea's financial context, determining budget constraints, defining budget tiers (Bootstrap / Growth / Scale), and running cost sanity checks. Referenced by all Idea Forge research skills that involve cost recommendations — supporting-systems, marketing-strategy, tech-research, pricing-strategy, prd-generator.

## When to Use

Any research skill that recommends spending money should read the Budget Context first. This includes:
- `/supporting-systems` — build-vs-buy decisions, SaaS cost recommendations
- `/marketing-strategy` — channel budgets, CAC estimation, Year 1 marketing spend
- `/tech-research` — vendor licensing costs, infrastructure spending
- `/pricing-strategy` — unit economics, cost-to-serve, breakeven analysis
- `/prd-generator` — Final BRD budget section, development cost estimates

### BUDGET_CONTEXT.md Lifecycle

`BUDGET_CONTEXT.md` is created at different points depending on the pipeline stage:

1. **Created by `/brd-generator`** (preliminary version): After completing Section 8.2 revenue projections, the BRD generator creates `BUDGET_CONTEXT.md` using the preliminary ramp-aware revenue estimates. Marked as `Version: preliminary (from BRD)`.

2. **Read by `/supporting-systems`, `/tech-research`**: These skills read the existing file and use its values. They do NOT create or recompute it. If the file doesn't exist, warn that `/brd-generator` should be run first, then compute as fallback using Steps 1-4 below.

3. **Refined by `/marketing-strategy`**: After Phase 5 (CAC Estimation & Budget), the marketing strategy skill updates `BUDGET_CONTEXT.md` with validated revenue from its revenue bridge analysis. Marked as `Version: validated (from marketing strategy)`. Compares validated Year 1 cumulative against preliminary and notes deviation.

4. **Read by `/pricing-strategy`, `/prd-generator`**: These skills read the validated version. If it hasn't been validated yet (still preliminary), they use the preliminary values with a note.

**How referencing skills use this**: Read `ideas/<slug>/BUDGET_CONTEXT.md`. If it already exists, read it and use the values directly — don't recompute unless the BRD revenue model has changed significantly. If the file doesn't exist (legacy idea or skipped BRD step), compute it by following Steps 1-4 below, then save the output.

---

## Step 1: Gather Financial Inputs

Read the following from the idea's existing documents:

**From IDEA.md:**
- **Stage**: Active product / Concept / Prototype / etc.
- **Known Constraints**: Funding mentions, budget limits, team size
- **Monetization Idea**: Revenue model hints

**From BRD (INITIAL-BRD.md or BRD.md):**
- **Revenue Projections** (Section 8/Revenue Model): Year 1, Year 2, Year 3 revenue estimates
- **Budget Estimates** (Section 13): Development, infrastructure, marketing, operations costs
- **Revenue Model Type**: Commission, subscription, freemium, usage-based, etc.

**From user context** (if available):
- Explicit funding stage or budget constraints mentioned by the user
- Whether the idea has external funding or is bootstrapped

---

## Step 2: Determine Funding Stage

Classify the idea into one of these stages based on available signals:

| Stage | Signals | Typical Total Budget |
|-------|---------|---------------------|
| **Bootstrapped** | No funding mentioned; founder-built; "lean" / "MVP" language; single founder; side project | $0-$50K/year (founder time + minimal cash) |
| **Pre-seed / Angel** | Small investment mentioned; accelerator; friends & family round | $50K-$500K total runway |
| **Seed** | Seed round mentioned; small team (3-8); product-market fit seeking | $500K-$2M total runway |
| **Series A+** | Growth stage; established team; scaling existing product | $2M+ available |

**Default assumption**: If no funding information is available, assume **Bootstrapped**. This is the safe default — it's better to plan lean and scale up than to recommend spending money that doesn't exist.

**Revenue confidence assessment**: Rate the reliability of revenue projections:
- **High**: Product is live with real revenue data / traction metrics available
- **Medium**: Product exists but pre-revenue, or projections based on comparable companies with sourced data
- **Low**: Projections are speculative (pre-product, no traction data, assumptions not validated)

---

## Step 3: Calculate Budget Envelope & Tiers

### Revenue-Based Budget Rule

Total recommended spend across all domains should be proportional to revenue and stage:

| Stage | Marketing | Infrastructure & Supporting Systems | Development | Legal & Compliance |
|-------|-----------|--------------------------------------|-------------|-------------------|
| **Bootstrapped** | 10-15% of projected Year 1 revenue | Bottom-up, capped at 10% of revenue | Founder time (not cash-costed) | 2-5% of revenue |
| **Pre-seed** | 15-25% of projected Year 1 revenue | Bottom-up, capped at 15% of revenue | 40-50% of total budget | 3-5% of revenue |
| **Seed** | 20-35% of projected Year 1 revenue | Bottom-up, capped at 20% of revenue | 35-45% of total budget | 3-5% of revenue |
| **Series A+** | 30-50% of projected Year 1 revenue | As needed (no cap) | 30-40% of total budget | As needed |

**Important**: For bootstrapped ideas, marketing and infrastructure percentages apply to *actual realized revenue*, not projections. A $1.6M Year 1 projection doesn't mean $160K is available for marketing in Month 1 — it means marketing spend should scale *with* revenue as it materializes.

### Three Budget Tiers

Every research skill must frame recommendations across three tiers:

| Tier | Definition | Who This Is For |
|------|-----------|----------------|
| **Bootstrap** | Minimal cash spend. Primarily founder time + free tools/tiers. Low-cost alternatives where $0 isn't viable. | Pre-revenue founders, side projects, validation phase |
| **Growth** | Moderate cash spend funded by early revenue. Typically $2K-$5K/month total across all domains. | Post-first-revenue, early traction, proving unit economics |
| **Scale** | Full recommended spend assuming revenue or funding supports it. | Funded startups, or bootstrapped companies with proven revenue |

**Tier transition triggers** — the idea moves from one tier to the next based on milestones:
- **Bootstrap → Growth**: When monthly revenue consistently covers Growth-tier spend (revenue > 3x monthly spend for 2+ months)
- **Growth → Scale**: When monthly revenue consistently covers Scale-tier spend, OR after securing external funding

### Domain-Specific Bootstrap Guidance

Each domain interprets "bootstrap" differently:

| Domain | Bootstrap Means | Examples |
|--------|----------------|---------|
| **Marketing** | Primarily sweat equity + low-cost tools where $0 isn't viable | Founder visits salons, posts on TikTok, writes blog posts, sends WhatsApp messages; low-cost ads if organic reach is insufficient |
| **Supporting Systems** | Free tiers, open-source self-hosted, manual processes, existing tools | Spatie packages (free), Filament (free), manual moderation queue, WhatsApp for support |
| **Tech / Infrastructure** | Open-source, self-hosted, free tiers, minimal cloud spend | Free Firebase tier, Hostinger VPS, open-source libraries, no paid APIs |
| **Pricing / Unit Economics** | Model at bootstrap cost structure, not scale cost structure | Calculate margins assuming founder does support, uses free tools, minimal infra |

---

## Step 4: Output — BUDGET_CONTEXT.md

Write the following to `ideas/<slug>/BUDGET_CONTEXT.md`:

```markdown
# Budget Context — <Idea Name>

| Field | Value |
|-------|-------|
| **Version** | preliminary (from BRD) / validated (from marketing strategy) |
| **Date** | <YYYY-MM-DD> |
| **Source** | BRD § Revenue Model + IDEA.md |
| **Computed By** | /brd-generator (preliminary) or /marketing-strategy (validated) |

---

## Financial Inputs

| Metric | Value | Source | Confidence |
|--------|-------|--------|------------|
| **Projected Year 1 Revenue** | $<X> | BRD § Revenue Projections | High / Medium / Low |
| **Projected Year 2 Revenue** | $<X> | BRD § Revenue Projections | High / Medium / Low |
| **Revenue Model** | <type> | BRD § Revenue Model | — |
| **BRD Budget Estimate (Year 1)** | $<X>-$<X> | BRD § Budget | — |

---

## Stage Assessment

| Factor | Value | Signal |
|--------|-------|--------|
| **Funding Stage** | Bootstrapped / Pre-seed / Seed / Series A+ | <what signals led to this classification> |
| **Revenue Confidence** | High / Medium / Low | <rationale> |
| **Team Size** | <N> | <from IDEA.md or BRD> |
| **Product State** | Live / Prototype / Concept | <from IDEA.md> |

---

## Budget Envelope

| Domain | Bootstrapped Range | Growth Range | Scale Range |
|--------|-------------------|-------------|-------------|
| **Marketing** | $<X>-$<X>/year | $<X>-$<X>/year | $<X>-$<X>/year |
| **Supporting Systems** | $<X>-$<X>/year | $<X>-$<X>/year | $<X>-$<X>/year |
| **Infrastructure** | $<X>-$<X>/year | $<X>-$<X>/year | $<X>-$<X>/year |
| **Development** | Founder time | $<X>-$<X>/year | $<X>-$<X>/year |
| **Legal & Compliance** | $<X>-$<X>/year | $<X>-$<X>/year | $<X>-$<X>/year |
| **Total** | **$<X>-$<X>/year** | **$<X>-$<X>/year** | **$<X>-$<X>/year** |

---

## Tier Transition Triggers

| Transition | Trigger | Estimated Timeline |
|------------|---------|-------------------|
| **Bootstrap → Growth** | MRR > $<X> for 2+ consecutive months | <estimate from BRD projections> |
| **Growth → Scale** | MRR > $<X> for 2+ months, OR funding secured | <estimate from BRD projections> |

---

## Cost Sanity Thresholds

| Check | Threshold | Action |
|-------|-----------|--------|
| Any single domain > 30% of Year 1 revenue (bootstrapped) | Flag | Requires external funding or leaner alternative |
| Total spend > 50% of Year 1 revenue (bootstrapped) | Flag | Aggressive — only viable with funding |
| Total spend > 80% of Year 1 revenue (any stage) | Block | Unsustainable — must reduce costs or increase revenue projections |
| Monthly burn > monthly revenue for 6+ months | Flag | Runway risk — show path to profitability |
```

---

## Step 5: Cost Sanity Check (used by referencing skills)

After any research skill calculates a total recommended spend for its domain, it MUST run this check:

1. **Read the Budget Envelope** from `BUDGET_CONTEXT.md` for the relevant domain
2. **Compare recommended spend** against the envelope:
   - If within range → OK, proceed
   - If 1-1.5x the range → Note as "at the high end" and explain why it's justified
   - If >1.5x the range → Flag as "exceeds budget envelope" and provide a leaner alternative that fits within range
3. **Compare against Year 1 revenue**:
   - Calculate: `recommended spend / projected Year 1 revenue × 100 = X%`
   - Show this ratio explicitly in the output
   - Apply thresholds from Cost Sanity Thresholds table
4. **Bootstrap reality check** (for bootstrapped ideas only):
   - Revenue projections are end-state, not Month 1 reality
   - Show what the founder can actually afford in Month 1 vs. Month 12
   - Recommendations must start at Bootstrap tier and scale with revenue

---

## Integration with Research Skills

`BUDGET_CONTEXT.md` flows through the pipeline as follows:

| Skill | Action |
|-------|--------|
| `/brd-generator` | **Creates** preliminary version after Section 8.2 revenue projections |
| `/supporting-systems` | **Reads** existing file (preliminary is sufficient — tool cost decisions aren't dramatically affected by ±20% revenue variance) |
| `/marketing-strategy` | **Reads** then **refines** to validated version after Phase 5 revenue bridge |
| `/tech-research` | **Reads** existing file (validated version preferred, preliminary as fallback) |
| `/pricing-strategy` | **Reads** existing file (validated version preferred, preliminary as fallback) |
| `/prd-generator` | **Reads** existing file for Final BRD budget section |

Each research skill references the budget context at the appropriate point. If the file doesn't exist (legacy idea or skipped BRD step), the skill warns that `/brd-generator` should be run first, then computes it as a fallback using Steps 1-4 above.

The skill then applies its domain-specific logic:
- **Marketing**: Frame channel budgets at all 3 tiers; show bootstrap (sweat equity) version of every paid channel
- **Supporting systems**: Include bootstrap/MVP option for every system; run cost sanity against infrastructure envelope
- **Tech research**: Consider budget tier when weighting the "cost" KPI in options matrices; flag expensive options that exceed the envelope
- **Pricing strategy**: Model unit economics at bootstrap cost structure (not just scale); show breakeven at each tier
- **PRD generator**: Align implementation phases with budget tiers; Phase 1 = Bootstrap-achievable features

## Modifiers

### help
Usage: `/budget-assessment help`

**budget-assessment** — No description

Available modifiers:
- `help` — Show this help message
