# /brd-generator

Research an idea and generate a Business Requirements Document (BRD) with real market data.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Structure research areas into task steps. After completing research and saving RESEARCH.md, assess whether sufficient context remains for BRD generation. If not, save progress and draft a continuation prompt.

When the user invokes `/brd-generator`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present ideas that do not yet have a BRD (BRD column shows "—" and status is `new` or `researching`).

- If the user specifies a slug, use that idea directly.
- If multiple ideas are eligible, let the user pick one.
- If no ideas are eligible, inform the user and suggest running `/new-idea` first.

### 2. Conduct Web Research

Update the idea's status to `researching` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Tracker updates when starting research:**
- **Pipeline Summary**: Decrement the idea's old status count (e.g., `New`), increment `Researching`
- **Ideas Pipeline table**: Update the idea's **Status** to `researching`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `BRD_STARTED`, **Details**: `Research phase initiated`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

Use web search to research the following areas thoroughly:

1. **Market size & trends**: TAM/SAM/SOM estimates, growth rates, industry reports
2. **Competitor analysis**: Direct and indirect competitors, their pricing, strengths, weaknesses, market share
3. **Target audience validation**: Demographics, pain points, willingness to pay, existing solutions they use
4. **Technical feasibility**: Available technologies, APIs, infrastructure requirements, build vs. buy considerations
5. **Approach validation**: If the idea owner specified a particular method, technology, or approach (e.g., "3D printing for manufacturing," "blockchain for records," "AI for detection"), research whether this is actually the best approach. Search for:
   - **Alternative approaches**: What other methods exist to achieve the same outcome?
   - **Comparative analysis**: How does the specified approach compare to alternatives on cost, quality, scalability, and market acceptance?
   - **Community sentiment**: What do practitioners, users, and industry experts say about this approach vs. alternatives? Look for Reddit threads, forum discussions, industry blogs, and review sites
   - **Known limitations**: What are the documented downsides of the chosen approach that the owner may not be aware of?
   - If the research reveals that the specified approach has significant disadvantages compared to alternatives, document this prominently in RESEARCH.md under a **"Approach Validation"** section and flag it in the BRD under Technical Feasibility with a clear recommendation. The BRD should never silently adopt a suboptimal approach just because the owner assumed it.
6. **Regulatory considerations**: Relevant regulations, compliance requirements, data privacy laws
7. **Domain research detection**: After completing the research above, assess whether the idea's core value proposition depends on a **domain-specific methodology, algorithm, strategy, or scientific approach** that has multiple known alternatives. Detection signals:
   - The idea involves algorithmic decision-making (trading strategies, routing algorithms, recommendation engines, scoring models)
   - The idea's success depends on a specific methodology (clinical protocols, diagnostic techniques, pedagogical models, manufacturing processes)
   - The BRD mentions a specific approach but alternatives exist (approach validation in step 5 may have already flagged this)
   - The domain has an established taxonomy of methods/approaches with meaningful trade-offs between them

   If domain research is warranted, add a **"Domain Research Recommended"** section (Section 6.5) to the BRD listing:
   - Each topic that needs investigation and why it's critical to success
   - What decision needs to be made (e.g., "which trading strategy family to focus on")
   - Why standard pipeline skills don't cover this (e.g., "/tech-research evaluates APIs and libraries, not trading methodologies")

   Also add a `Domain Research: recommended` field to `ideas/<slug>/IDEA.md` with the topic list.

   If domain research is NOT needed (the idea's methodology is straightforward or there's only one viable approach), skip this — no flag needed. Most standard SaaS, e-commerce, and content ideas won't need domain research.

Gather **specific numbers, sources, and data points** — not generic statements.

**Research & Citation Methodology**: Follow the research and citation standards defined in `.claude/skills/research-citations/SKILL.md`. Every fact gathered must use the structured fact entry format from `.claude/skills/research-citations/references/research-template.md`. Key requirements:
- Preserve **exact quotes** from sources containing the cited number
- Verify every URL actually contains the claimed data
- Specify **year, geographic scope, and source organization** for every statistic
- Use minimum **2 sources** for key claims (TAM, fatality stats, market size)
- Mark derived/calculated figures with their full calculation
- Follow the **Source Priority Hierarchy** (government > peer-reviewed > industry > news > aggregator)
- When using aggregator sites, always note "as cited in" and attempt to find the primary source

### 3. Save Research Notes

Save all raw research findings to `ideas/<slug>/RESEARCH.md` with the following structure:

```markdown
# Research Notes: <Idea Name>

**Date**: <YYYY-MM-DD>
**Slug**: `<slug>`

## Market Size & Trends

<findings with sources>

## Competitor Analysis

<findings with sources>

## Target Audience Validation

<findings with sources>

## Technical Feasibility

<findings with sources>

## Regulatory Considerations

<findings with sources>

## Key Sources

- <list of URLs and references used>
```

### 4. Generate the BRD

Read the BRD template from `.claude/skills/brd-generator/references/brd-template.md`.

Read the idea's `IDEA.md` for context.

Create the `ideas/<slug>/preparation/` folder if it doesn't exist.

Generate `ideas/<slug>/preparation/INITIAL-BRD.md` by filling in the template with:
- Real data from the research phase
- Specific numbers for market size, revenue projections, and budget estimates
- Actual competitor names and details
- Concrete business requirements derived from the research
- Realistic risk assessments based on findings

Do NOT use placeholder text like "[TBD]" or "[Insert here]". Every section must contain substantive content.

#### Funding Stage Assessment (before revenue projections)

Before building revenue projections, assess the idea's **funding stage** — this determines what Month 12 targets are realistic. Read IDEA.md for signals:

| Stage | Signals | Operational Capacity (Year 1) |
|-------|---------|------------------------------|
| **Bootstrapped** | No funding mentioned; founder-built; "lean"/"MVP" language; single founder; side project | Solo founder capacity: limited sales hours, organic-only marketing, free tools |
| **Pre-seed / Angel** | Small investment; accelerator; friends & family | Small team (2-3): part-time sales, small ad budget ($1-3K/mo), basic tools |
| **Seed** | Seed round mentioned; small team (3-8); product-market fit seeking | Dedicated team: sales reps, $5-15K/mo marketing, professional tools |
| **Series A+** | Growth stage; established team; scaling | Full team: sales team, $20K+/mo marketing, enterprise tools |

**Default**: If no funding information is available, assume **Bootstrapped**. Better to plan lean and scale up than to recommend spending money that doesn't exist.

**Stage-calibrated Month 12 targets** — what's achievable given the resources:

| Business Type | Bootstrapped (solo) | Pre-seed (2-3 people) | Seed (3-8 people) |
|--------------|--------------------|-----------------------|-------------------|
| **Marketplace** (suppliers) | 100-250 suppliers | 300-600 suppliers | 500-1,500 suppliers |
| **Marketplace** (customers) | 5K-15K customers | 15K-40K customers | 30K-100K customers |
| **B2B SaaS** | 20-80 accounts | 50-200 accounts | 100-500 accounts |
| **B2C SaaS** | 2K-10K users | 10K-30K users | 20K-100K users |
| **E-commerce** | 1K-5K customers | 5K-20K customers | 10K-50K customers |

These are directional ranges based on operational capacity — what a team of that size can realistically acquire, onboard, and support. They are NOT market ceilings. An idea with strong product-market fit can exceed these, but the base case should assume normal execution.

**Example**: A bootstrapped solo founder building a salon booking marketplace can realistically visit 6-8 salons/day personally, spending 25-30 hours/week on sales. At a 30-40% conversion rate, that's ~40-60 new salons/month — yielding 150-250 active providers by Month 12. Not 500 (which requires a 2-person paid sales team).

#### Revenue Projection Methodology (Section 8.2)

Revenue projections must use **bottom-up unit economics with ramp modeling** — not steady-state assumptions from day one. A newly launched business does not have Month 12 capacity on Month 1.

**How to build projections:**

1. **Set Month 12 targets calibrated to funding stage**: Use the stage assessment above to set realistic end-of-year targets. The targets should be achievable with the resources the idea actually has — not what it would need to raise to execute.

2. **Define Month 1 starting point**: What can the product realistically achieve in its first month?
   - **Bootstrapped**: 5-10% of Month 12 target (limited by founder's personal capacity)
   - **Pre-seed**: 8-15% of Month 12 target (small team multiplier)
   - **Seed**: 10-20% of Month 12 target (dedicated team from day one)
   - Consider product readiness: concept (lower start) vs. live product (higher start)

3. **Choose a ramp shape**:
   - **S-curve** (default for marketplace/consumer): Slow start (Months 1-3), acceleration (Months 4-8), approach steady-state (Months 9-12). Use when product depends on network effects, word-of-mouth, or marketplace liquidity.
   - **Linear** (B2B with sales team): Steady month-over-month growth driven by sales headcount. Use when growth is directly proportional to sales capacity.
   - **Staircase** (enterprise/seasonal): Revenue jumps in steps (e.g., landing large contracts, seasonal peaks). Use for products with lumpy revenue patterns.

4. **Build month-by-month**: Fill in the Year 1 monthly table showing new users, churned users, active users, and revenue for each month. Growth should be gradual and match what the team can operationally handle.

5. **Calculate Year 1 Cumulative**: Sum all 12 months. This is the actual expected cash flow — always lower than Month 12 MRR × 12.

6. **Show both metrics clearly**:
   - **Year 1 Cumulative Revenue**: Sum of all months (what you actually collect)
   - **Month 12 Annualized Run Rate**: Month 12 MRR × 12 (where you're headed)
   - For a typical ramp, cumulative is 40-60% of the annualized run rate.

7. **Three scenarios**: Conservative (reduce acquisition 25-50%, increase churn 25-50%), Base (stage-appropriate operational plan), Optimistic (increase acquisition 25-50%, reduce churn, or assume next-stage resources become available mid-year). Scenarios must differ in *input assumptions*, not arbitrary multipliers on output.

**Common pitfall to avoid**: Do NOT calculate Year 1 revenue as `Month 12 users × Month 12 ARPU × 12`. This overstates revenue by 40-100% because it ignores the ramp. Always sum the monthly build.

#### Create Preliminary BUDGET_CONTEXT.md

After completing Section 8.2, create `ideas/<slug>/BUDGET_CONTEXT.md` following the template and methodology in `.claude/skills/budget-assessment/SKILL.md` Steps 1-4. Use the revenue projections you just built (Year 1 cumulative from the base scenario) and the funding stage assessment from above.

Mark the file as **Version: preliminary (from BRD)**. This file will be refined later by `/marketing-strategy` when it produces a validated revenue bridge from actual channel capacity analysis.

All downstream skills (`/supporting-systems`, `/marketing-strategy`, `/tech-research`, `/pricing-strategy`) will read this file for budget context. The preliminary version is sufficient for early pipeline stages — supporting systems cost decisions ($50/mo vs $200/mo tools) are not dramatically affected by ±20% revenue variance. The marketing strategy will later update it with validated numbers that tech research and pricing strategy will use.

**Before finalizing the BRD**, run the Citation Verification Checklist from `.claude/skills/research-citations/references/citation-checklist.md`. Ensure every statistic has year + scope, every URL is verified, and key claims have 2+ sources.

Update the idea's status to `brd-draft` during generation.

### 5. Update Tracker and Status

After the BRD is complete:

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `brd-complete`
- Set BRD field to `[INITIAL-BRD.md](preparation/INITIAL-BRD.md)`

**Update `IDEAS_TRACKER.md`:**

- **Pipeline Summary**: Decrement `Researching` (or `BRD Draft`), increment `BRD Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Find the idea's row and update:
  - **Status** → `brd-complete`
  - **Viability** → `High`, `Medium`, or `Low` (from your viability assessment in step 6)
  - **BRD** → `[View](ideas/<slug>/preparation/INITIAL-BRD.md)`
  - **Updated** → today's date
- **Activity Log**: Add a row at the top — **Event**: `BRD_COMPLETED`, **Details**: `Viability: <High/Medium/Low>; Market size: <TAM summary>`
- If the activity table exceeds 20 data rows, remove the oldest entry

### 6. Present Key Findings

Summarize for the user:

> **BRD Complete for "<Idea Name>"**
>
> **Key Findings:**
> - Market size: <TAM/SAM/SOM summary>
> - Top competitors: <list>
> - Target audience: <summary>
> - Estimated budget range: <range>
> - Year 1 Cumulative Revenue (base): $<X> | Month 12 Run Rate: $<X>/yr
>
> **Viability Assessment**: <High/Medium/Low> — <brief rationale>
>
> **Files created:**
> - `ideas/<slug>/RESEARCH.md`
> - `ideas/<slug>/preparation/INITIAL-BRD.md`
>
> **Next steps:**
> - *(optional)* Run `/customer-validation` to generate survey templates, interview scripts, and a validation scorecard — this helps test whether the problem is real and customers would pay, but requires **you** to run the actual surveys/interviews. You can skip this if you want to move faster.
> - *(optional, if flagged)* Run `/domain-research` to investigate domain-specific methodologies, algorithms, or strategies that the idea's success depends on. This is recommended when the BRD flagged domain research topics (Section 6.5). Skip if the idea's methodology is straightforward.
> - Run `/business-research` to conduct per-feature competitive analysis and impact assessment, then continue through the pipeline: `/supporting-systems` → `/marketing-strategy` → `/tech-research` → `/pricing-strategy` → *(optional)* `/risk-assessment` → `/prd-generator`.

---

### Retroactive Revenue Recalculation

When `/brd-generator` is invoked on an idea that **already has a BRD** (status is past `brd-complete`), the skill enters **recalculation mode** instead of regenerating the entire BRD. This fixes revenue projections in existing BRDs that used steady-state assumptions instead of ramp-aware modeling.

#### When This Triggers

The skill detects recalculation mode when:
- The idea's status is `brd-complete` or any status beyond it in the pipeline
- An `INITIAL-BRD.md` (or `BRD.md`) already exists
- The user confirms they want to recalculate (not regenerate from scratch)

When detected, ask the user:
> This idea already has a BRD (status: `<current status>`). Options:
> 1. **Recalculate revenue projections** — Update Section 8.2 with ramp-aware methodology and check impact on downstream skills
> 2. **Regenerate entire BRD** — Full re-research and re-generation (resets to `researching`)
>
> Which would you like?

#### Recalculation Steps

**Step R1: Read existing projections**

Read the current `INITIAL-BRD.md` Section 8.2. Extract:
- Year 1/2/3 revenue figures currently used
- The assumptions behind them (users, ARPU, conversion rate)
- Whether the projections use steady-state or ramp modeling

**Step R2: Build ramp-aware projections**

Using the same underlying assumptions (users, ARPU, conversion) from the existing BRD, rebuild the projections with proper ramp modeling:

1. Keep the Month 12 end-state targets as-is (these came from market research)
2. Apply an appropriate ramp curve (S-curve for marketplace, linear for B2B)
3. Build the month-by-month Year 1 table
4. Calculate the Year 1 Cumulative Revenue (sum of months)
5. Calculate Month 12 Annualized Run Rate
6. Build three scenarios (conservative/base/optimistic)

**Step R3: Compare old vs. new**

Calculate the deviation:
```
deviation = (old Year 1 revenue - new Year 1 cumulative) / old Year 1 revenue × 100
```

Present a comparison table:

| Metric | Old Projection | New (Ramp-Aware) | Deviation |
|--------|---------------|-----------------|-----------|
| Year 1 Revenue | $<old> (steady-state) | $<new> (cumulative) | -<X%> |
| Month 12 Run Rate | (not shown) | $<new>/yr | — |
| Year 2 Revenue | $<old> | $<new> | -<X%> |

**Step R4: Impact analysis on downstream skills**

Check which downstream files exist and what values they used. For each affected file, show what would change:

| File | Uses Year 1 Revenue? | Current Value Used | Corrected Value | Impact |
|------|----------------------|-------------------|----------------|--------|
| `BUDGET_CONTEXT.md` | Yes — budget envelope | $<old> | $<new> | Envelope shrinks <X%>; tier triggers change |
| `MARKETING_STRATEGY/README.md` | Yes — cost sanity check | <X%> of revenue | <new X%> | Ratio increases; may trigger flag |
| `MARKETING_STRATEGY/05-*.md` | Yes — marketing-to-revenue | <X%> | <new X%> | May exceed 30% threshold |
| `PRICING_STRATEGY/README.md` | Yes — unit economics | $<old> | $<new> | Breakeven timeline extends |
| `SUPPORTING_SYSTEMS/README.md` | Yes — cost ratios | <X%> of revenue | <new X%> | May trigger cost flag |

**Step R5: Decide on action**

Based on the deviation:

| Deviation | Action |
|-----------|--------|
| **< 15%** | **Minor** — Update Section 8.2 in INITIAL-BRD.md. Note the correction. No downstream re-runs needed. |
| **15-30%** | **Moderate** — Update Section 8.2. Update BUDGET_CONTEXT.md. Flag affected downstream files with a note but don't require re-runs. |
| **> 30%** | **Significant** — Update Section 8.2. Recommend rolling back status to `brd-complete` and re-running downstream skills in order. Present a re-run plan. |

For significant deviations (>30%), present the re-run plan:

> **Revenue projection deviation: <X%>**
>
> The old BRD used steady-state Year 1 revenue of $<old>. Ramp-aware calculation shows Year 1 cumulative of $<new> (-<X%>).
>
> **Recommended re-run sequence:**
> 1. Update INITIAL-BRD.md Section 8.2 ✅ (done)
> 2. Recompute BUDGET_CONTEXT.md (budget envelopes change)
> 3. Re-run `/business-research` — if feature prioritization used revenue-based weighting
> 4. Re-run `/supporting-systems` — if build-vs-buy decisions used cost-to-revenue ratios
> 5. Re-run `/marketing-strategy` — cost sanity checks, budget tiers change
> 6. Re-run `/tech-research` — if cost KPI weighting used budget envelope
> 7. Re-run `/pricing-strategy` — unit economics, breakeven analysis change
>
> **Roll back status to `brd-complete`?** This ensures downstream skills re-run in the correct order.

The user decides whether to proceed with the rollback or handle corrections manually.

**Step R6: Apply changes**

If the user approves:
1. Update Section 8.2 in `INITIAL-BRD.md` with the new ramp-aware projections
2. If deviation > 15%, recompute `BUDGET_CONTEXT.md`
3. If deviation > 30% and user approves rollback:
   - Update idea status to `brd-complete` in both `IDEA.md` and `IDEAS_TRACKER.md`
   - Add activity log entry: `BRD_RECALCULATED` with deviation percentage
   - Note which downstream files need re-running

## Modifiers

### help
Usage: `/brd-generator help`

**brd-generator** — No description

Available modifiers:
- `help` — Show this help message
