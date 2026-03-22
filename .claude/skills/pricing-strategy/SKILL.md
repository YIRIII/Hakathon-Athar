# /pricing-strategy

Generate a research-backed pricing strategy analysis with competitive pricing intelligence, revenue model evaluation, willingness-to-pay analysis, tier/package design, and unit economics projections.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Structure research into 5 phases. Sub-agents write full research directly to phase files (`PRICING_STRATEGY/NN-phase.md`). They return ONLY structured summaries (~500 tokens each) to the main agent. The main agent never holds all research data in context at once.

When the user invokes `/pricing-strategy`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`tech-research-complete`** status (preferred) → Start fresh from Step 2
- **`pricing-research`** status → Resume interrupted research from Step 3 (skip Step 2)
- **Any later status** (`pricing-research-complete`, `prd-draft`, `prd-complete`) → Re-run (supplementary enrichment). Check if `PRICING_STRATEGY/` folder already exists:
  - **If folder exists with completed research**: Ask the user whether to (a) skip already-completed phases and only research new/changed ones, or (b) redo all research from scratch. For option (a), read the existing README.md and treat phases already marked `complete` as done — only research phases with status `pending` or that don't have a file yet.
  - **If no folder exists**: Start fresh from Step 2.
  - **Status handling**: Do NOT change the idea's status during research. After completion, the skill will assess whether findings are significant enough to warrant a status rollback (see Step 4).

If the user specifies a slug, use that idea directly (verify it has completed technical research).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/tech-research` first.

### 2. Read Context Documents & Start Research Phase

Read the following files for the selected idea:

- `ideas/<slug>/preparation/INITIAL-BRD.md` — focus on Section 8 (Revenue Model), Section 4 (Market Analysis), Section 5 (Competitive Landscape), Section 13 (Budget & Cost Estimates). Fall back to `ideas/<slug>/BRD.md` for pre-restructuring ideas.
- `ideas/<slug>/IDEA.md` — original idea context
- `ideas/<slug>/BUSINESS_RESEARCH/README.md` — feature tiers (Hero/Depth/Supporting/Skip), competitive landscape, business model validation findings
- `ideas/<slug>/TECHNICAL_OPTIONS/README.md` — cost estimates per capability, strategy overview, vendor pricing
- `ideas/<slug>/BUDGET_CONTEXT.md` — budget envelope, funding stage, and tier definitions (if it exists)

**Budget context integration**: Read `ideas/<slug>/BUDGET_CONTEXT.md` (created by `/brd-generator`, refined by `/marketing-strategy`). By this pipeline stage, it should be the validated version (from marketing strategy) with revenue bridge data. Use it to:
- Read the funding stage and budget tiers to inform pricing strategy — a bootstrapped idea must model unit economics at bootstrap cost structure (not just scale)
- In Phase 5 (Unit Economics), show breakeven analysis at each budget tier (Bootstrap, Growth, Scale) — different cost structures yield different margins and payback periods
- Use the cost sanity thresholds to validate that total operational costs (from all upstream skills) don't exceed revenue projections

If `BUDGET_CONTEXT.md` doesn't exist, warn that `/brd-generator` should be run first. As a fallback for legacy ideas, follow `.claude/skills/budget-assessment/SKILL.md` to compute it before starting research.

**Domain research integration** (if available): If `ideas/<slug>/DOMAIN_RESEARCH/README.md` exists, read it. Domain methodology choices may affect pricing — e.g., a multi-strategy trading platform justifies higher pricing than a single-strategy tool; a proprietary algorithm creates pricing power; a domain approach with high compute costs affects unit economics.

**Business research integration**: The BUSINESS_RESEARCH/README.md provides critical inputs:
- Feature tier classifications → drive feature-to-tier mapping in Phase 4
- Competitive landscape per feature → inform competitor pricing research in Phase 1
- Business model validation → baseline for revenue model evaluation in Phase 2
- Go-to-market assessment → inform pricing launch strategy

**Technical options integration**: The TECHNICAL_OPTIONS/README.md provides:
- Cost Impact Summary → variable costs for unit economics in Phase 5
- Per-capability Year 1 costs → cost-to-serve calculations
- Vendor pricing details → infrastructure cost modeling

**Status update depends on flow type (determined in Step 1):**

#### If fresh start (idea was `tech-research-complete`):

Update the idea's status to `pricing-research` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Tracker updates:**
- **Pipeline Summary**: Decrement `Tech Research Complete`, increment `Pricing Research`
- **Ideas Pipeline table**: Update the idea's **Status** to `pricing-research`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `PRICING_RESEARCH_STARTED`, **Details**: `Pricing strategy research initiated`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

#### If re-run (idea was already past `tech-research-complete`):

Do **NOT** change the idea's status. Keep the existing status (e.g., `pricing-research-complete`, `prd-complete`). Only update `IDEAS_TRACKER.md`:
- **Ideas Pipeline table**: Update **Updated** to today's date only
- **Activity Log**: Add a row at the top — **Event**: `PRICING_RESEARCH_STARTED`, **Details**: `Pricing strategy research initiated (re-run on <current status>)`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

The status decision happens **after** all research is complete — see Step 4.

### 3. Generate Pricing Strategy Analysis

Read the pricing strategy template from `.claude/skills/pricing-strategy/references/pricing-strategy-template.md`.

**Always create a `ideas/<slug>/PRICING_STRATEGY/` folder** with per-phase files.

#### Research Progress Tracking (Resumability)

**First action — create or read the tracking table:**

- **Fresh start** (no existing `PRICING_STRATEGY/` folder — either normal flow from `tech-research-complete` or re-run with no prior pricing research): Create `ideas/<slug>/PRICING_STRATEGY/README.md` with the header metadata and a **Research Progress** table listing all 5 phases with status `pending`:

```markdown
## Research Progress

| # | Phase | File | Depends On | Status | Updated |
|---|-------|------|-----------|--------|---------|
| 1 | Competitive Pricing Landscape | [01-competitive-pricing-landscape.md](01-competitive-pricing-landscape.md) | — | pending | — |
| 2 | Revenue Model Evaluation | [02-revenue-model-evaluation.md](02-revenue-model-evaluation.md) | — | pending | — |
| 3 | Value Metrics & WTP Analysis | [03-value-metrics-wtp.md](03-value-metrics-wtp.md) | — | pending | — |
| 4 | Tier & Package Design | [04-tier-package-design.md](04-tier-package-design.md) | 1, 2, 3 | pending | — |
| 5 | Unit Economics & Projections | [05-unit-economics.md](05-unit-economics.md) | 1, 2, 3, 4 | pending | — |
```

- **Resuming** (status was `pricing-research`): Read `ideas/<slug>/PRICING_STRATEGY/README.md`. Find the **Research Progress** table. Identify phases with status `pending` — these are the ones that need to be researched. **Skip phases already marked `complete`.** Respect dependencies — Phase 4 requires 1-3, Phase 5 requires 1-4.

#### Phase Execution Order

Phases 1, 2, and 3 have **no dependencies** — launch their sub-agents in parallel.
Phase 4 depends on Phases 1, 2, and 3 — wait for all three to complete.
Phase 5 depends on Phases 1-4 — wait for Phase 4 to complete.

#### Phase 1 — Competitive Pricing Landscape

Launch a sub-agent that:
- Receives the BRD competitive landscape, BUSINESS_RESEARCH competitive findings, and idea context
- Uses web search to research **every competitor's pricing**:
  - Pricing page URLs (capture exact prices, tiers, and feature gates)
  - Pricing model type (subscription, freemium, usage-based, one-time, hybrid)
  - Free tier limits and conversion triggers
  - Enterprise pricing signals (if "Contact Sales," note and estimate from industry data)
  - Regional pricing differences (especially MENA/Saudi market if applicable)
  - Historical pricing changes (if discoverable — price increases/decreases signal market maturity)
- Analyzes pricing patterns across the competitive set:
  - Price clustering (where do most competitors land?)
  - Price outliers and their positioning rationale
  - Common value metric choices (per user, per document, per API call, etc.)
  - Free tier prevalence and typical limitations
- **Writes the complete analysis directly to `ideas/<slug>/PRICING_STRATEGY/01-competitive-pricing-landscape.md`**
- Returns ONLY a structured summary to the main agent:

```
Summary (max 500 tokens):
- Phase: Competitive Pricing Landscape
- Competitors analyzed: <count>
- Dominant model: <subscription/freemium/usage-based/etc.>
- Price range: <low>–<high> per <metric>
- Free tier prevalence: <X of Y competitors>
- Key insight: <one line>
- File: PRICING_STRATEGY/01-competitive-pricing-landscape.md
```

#### Phase 2 — Revenue Model Evaluation

Launch a sub-agent that:
- Receives the BRD revenue model (Section 8), BUSINESS_RESEARCH business model validation, and idea context
- Evaluates **every viable revenue model** against the idea's characteristics. Standard models to evaluate (include others if relevant):
  - Subscription (flat monthly/annual)
  - Freemium (free tier + paid upgrades)
  - Usage-based (pay per use/API call/document)
  - Tiered subscription (Good-Better-Best)
  - Marketplace/transaction fee
  - One-time license
  - Hybrid models
- For each model, score using the Options Rating Matrix methodology (`.claude/skills/options-rating-matrix/SKILL.md`). Define revenue-model-specific KPIs — at minimum these 7, but add more if they would differentiate the models:
  1. **Revenue predictability**: How stable and forecastable is revenue?
  2. **Customer acquisition fit**: Does the model reduce friction for new users?
  3. **Value alignment**: Does revenue scale with the value delivered?
  4. **Market convention**: Do competitors and adjacent markets use this model?
  5. **Expansion revenue potential**: Can existing customers generate more revenue over time?
  6. **Implementation complexity**: How hard is the billing/metering infrastructure?
  7. **Cash flow profile**: Front-loaded vs. spread out? Impact on runway?
- Assign High/Medium/Low weights to each KPI, calculate weighted scores, and recommend the highest-scoring model. Include score rationales for top 3 models.
- Research real-world benchmarks for each viable model (conversion rates, churn rates, expansion rates from public companies or industry reports)
- **Writes the complete evaluation directly to `ideas/<slug>/PRICING_STRATEGY/02-revenue-model-evaluation.md`**
- Returns ONLY a structured summary:

```
Summary (max 500 tokens):
- Phase: Revenue Model Evaluation
- Models evaluated: <count>
- Recommended model: <name>
- Runner-up: <name>
- Key differentiator: <why recommended > runner-up>
- Benchmark conversion rate: <X%> (source: <company/report>)
- File: PRICING_STRATEGY/02-revenue-model-evaluation.md
```

#### Phase 3 — Value Metrics & Willingness-to-Pay Analysis

Launch a sub-agent that:
- Receives the BRD requirements, competitive pricing data context, and BUSINESS_RESEARCH feature tiers
- **Value metric identification**: Determine what unit of value customers pay for. Evaluate candidate metrics:
  - Per user/seat
  - Per transaction/document/action
  - Per feature module
  - Per usage tier (storage, API calls, etc.)
  - Score each on: trackability, value alignment, predictability, competitive norm
- **Van Westendorp PSM framework**: Define the 4 product-specific PSM questions:
  1. At what price would this be **too expensive** (wouldn't consider)?
  2. At what price would this be **expensive but still worth considering**?
  3. At what price would this be a **bargain** (great buy)?
  4. At what price would it be **too cheap** (quality concerns)?
  - Since we cannot run a real survey, use **proxy WTP signals**:
    - Competitor pricing as revealed preference (customers pay $X for similar tools)
    - Industry conversion rate benchmarks (what price points achieve target conversion)
    - Price sensitivity research for the target market segment
    - Purchasing power parity adjustments for target geography (especially MENA/Saudi)
  - Construct estimated PSM price boundaries from these proxies
- **Regional adjustments**: Research PPP multipliers, local pricing norms, and market-specific considerations
- **Writes the complete analysis directly to `ideas/<slug>/PRICING_STRATEGY/03-value-metrics-wtp.md`**
- Returns ONLY a structured summary:

```
Summary (max 500 tokens):
- Phase: Value Metrics & WTP Analysis
- Recommended value metric: <metric>
- PSM range estimate: <too cheap>–<too expensive> per <metric>
- Optimal price point: <price> per <metric>
- PPP adjustment: <multiplier> for <region>
- Key WTP signal: <source and finding>
- File: PRICING_STRATEGY/03-value-metrics-wtp.md
```

#### Phase 4 — Tier & Package Design (depends on Phases 1-3)

**Wait for Phases 1, 2, and 3 to complete.** Read the summaries from all three phases.

Launch a sub-agent that:
- Receives Phase 1-3 summaries, BUSINESS_RESEARCH feature tier rankings, and BRD requirements
- **Also reads** the completed Phase 1, 2, and 3 files for detailed data
- Designs a **Good-Better-Best tier structure** using the feature-to-tier mapping:
  - **Free/Starter tier**: Core value demonstration — enough to validate the product, not enough to replace paying. Features from BUSINESS_RESEARCH "Supporting" tier + limited access to "Depth" features
  - **Core/Pro tier** (primary revenue driver): Hero features as upgrade drivers + full Depth features. This is the tier most users should land on
  - **Premium/Business tier**: All features + advanced capabilities from "Supporting" tier + priority support + higher limits
  - **Enterprise tier** (if applicable): Custom pricing, SLA, dedicated support, on-premise option. Features from "Skip" tier that only make sense at scale
- For each tier:
  - Feature list with specific limits/gates
  - Recommended price point (derived from Phase 3 WTP analysis)
  - Target customer persona
  - Upgrade triggers (what makes users move up)
- **Pricing psychology research**: Anchoring, decoy effect, charm pricing, annual discount norms. Apply to tier pricing.
- **Writes the complete analysis directly to `ideas/<slug>/PRICING_STRATEGY/04-tier-package-design.md`**
- Returns ONLY a structured summary:

```
Summary (max 500 tokens):
- Phase: Tier & Package Design
- Tiers designed: <count>
- Tier names: <Free, Pro, Business, Enterprise>
- Primary revenue tier: <name> at <price>/<period>
- Key upgrade trigger: <what moves Free→Pro>
- Annual discount: <X%>
- File: PRICING_STRATEGY/04-tier-package-design.md
```

#### Phase 5 — Unit Economics & Projections (depends on Phases 1-4)

**Wait for Phase 4 to complete.** Read the summaries from all four phases.

Launch a sub-agent that:
- Receives Phase 1-4 summaries, TECHNICAL_OPTIONS/README.md cost data, and BRD budget estimates
- **Also reads** the completed Phase 4 file and TECHNICAL_OPTIONS/README.md Cost Impact Summary
- **Cost-to-serve analysis**:
  - Map TECHNICAL_OPTIONS per-capability costs to per-user variable costs
  - Infrastructure costs (hosting, APIs, third-party services) from vendor pricing in capability files
  - Support costs (estimated per-user based on tier)
  - Payment processing fees (Stripe/payment gateway standard rates)
- **Gross margin calculation** per tier:
  - Revenue per user (from Phase 4 pricing)
  - Variable cost per user (from cost-to-serve)
  - Gross margin = (Revenue - Variable Cost) / Revenue
- **Breakeven analysis**:
  - Fixed costs (team, office, tools) from BRD budget estimates
  - Contribution margin per paid user
  - Breakeven user count = Fixed Costs / Contribution Margin
- **Key SaaS metrics**:
  - LTV calculation: ARPU × Gross Margin × (1/Churn Rate) — use industry churn benchmarks
  - CAC estimation: If `ideas/<slug>/MARKETING_STRATEGY/05-cac-estimation-budget.md` exists, read it for researched CAC estimates (blended CAC, per-channel CAC, CAC payback). Use these instead of generic industry benchmarks. If no marketing strategy exists, research industry CAC for the segment (web search for benchmarks).
  - **Fully-loaded CAC required**: Always use the **fully-loaded CAC** (which includes imputed founder time at market rate) from marketing strategy, not cash-only CAC. If marketing strategy only provides cash CAC, impute founder time: research the salary of a marketing/sales coordinator in the target market, derive an hourly rate, multiply by founder hours/week × 4 weeks, and divide by monthly customers acquired. Show both "Cash CAC" and "Fully-loaded CAC" but **use fully-loaded CAC for all LTV:CAC calculations**. Cash-only LTV:CAC may appear as a secondary metric with mandatory label: "Cash-only (excludes founder time — not comparable to industry benchmarks)."
  - LTV:CAC ratio (target ≥ 3:1) — **must use fully-loaded CAC**
  - Payback period: CAC / (Monthly ARPU × Gross Margin) — **must use fully-loaded CAC**
- **3-year revenue projections** — three scenarios:
  - **Conservative**: Lower conversion, higher churn, slower growth — all assumptions sourced
  - **Base**: Industry-average metrics — all assumptions sourced
  - **Optimistic**: Best-in-class metrics from top competitors — all assumptions sourced
  - Each scenario shows: Year 1/2/3 users, paid users, MRR, ARR, gross margin, net revenue
  - **Every assumption must be sourced or clearly marked as an estimate**
- **Writes the complete analysis directly to `ideas/<slug>/PRICING_STRATEGY/05-unit-economics.md`**
- Returns ONLY a structured summary:

```
Summary (max 500 tokens):
- Phase: Unit Economics & Projections
- Gross margin (primary tier): <X%>
- Breakeven: <N> paid users
- LTV:CAC ratio: <X:1>
- Year 1 ARR (base): <$X>
- Year 3 ARR (base): <$X>
- Key assumption: <most sensitive variable>
- File: PRICING_STRATEGY/05-unit-economics.md
```

**After each phase is complete**, update its row in the README.md Research Progress table: set **Status** to `complete` and **Updated** to today's date.

#### After all phases are complete:

Fill in the remaining README.md sections using the phase summaries and key data points: Executive Summary, Recommended Pricing Model, Tier Overview, Competitive Pricing Position, Key Metrics Summary, Pricing Launch Strategy, Pricing Risks & Mitigations, Open Questions & Next Steps.

**Research guidelines**:
- Use **real data only** — never fabricate competitor prices, conversion rates, or benchmarks
- **Cite sources** inline (competitor pricing pages, industry reports, benchmark studies)
- **Date-stamp all pricing** — note when competitor pricing was researched
- **Distinguish sources from estimates** — clearly label which numbers come from research vs. assumptions
- Every revenue projection assumption must be traceable to either a sourced benchmark or an explicitly labeled estimate

**Research & Citation Methodology**: Follow `.claude/skills/research-citations/SKILL.md` for all research. Use FACT-ID prefix `PRC` for pricing-specific research facts (competitor prices, conversion rates, benchmarks, WTP signals). Additional requirements:
- All competitor pricing must include URL + "researched on [YYYY-MM-DD]" stamp
- Conversion rate and churn rate benchmarks must cite the original study/report
- Revenue projections must distinguish sourced assumptions from estimates
- PPP adjustments must cite the source (World Bank, OECD, etc.)

**Citation URL Verification (Mandatory)**: After completing each phase file, run the Citation URL Verification Protocol (`.claude/skills/research-citations/SKILL.md` Section I) against all URLs in that file. Also run the Pre-Publication Verification Checklist (`.claude/skills/research-citations/references/citation-checklist.md`) including the Pricing Strategy-Specific section (Section 6b). Fix all CRITICAL and HIGH issues before moving to the next phase.

### 4. Update Tracker and Status

After all phases are complete and the README is finalized:

#### Normal flow (idea was `tech-research-complete` or `pricing-research`)

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `pricing-research-complete`
- Add a Pricing Strategy field: `[PRICING_STRATEGY/](PRICING_STRATEGY/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Pricing Research Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update **Status** to `pricing-research-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `PRICING_RESEARCH_COMPLETED`, **Details**: `Recommended model: <model>; <N> tiers designed; Gross margin: <X%>; LTV:CAC: <X:1>; Year 1 ARR (base): <$X>`
- If the activity table exceeds 20 data rows, remove the oldest entry

#### Re-run on completed idea (idea was already past `pricing-research-complete`)

After completing the research, assess whether the findings materially change the idea's pricing strategy compared to what's already in existing downstream documents (PRD, Final BRD). Check for **significant impact indicators**:

- The recommended revenue model changed (e.g., was subscription, now freemium is clearly better)
- Tier structure fundamentally different (e.g., 3 tiers → 4 tiers, or different feature-to-tier mapping)
- Price points changed by >25% (e.g., $29/mo → $19/mo based on new competitive data)
- Unit economics show the previous pricing was unsustainable (negative gross margin, LTV:CAC < 1)
- A competitor launched a disruptive pricing change that invalidates prior assumptions
- New market data shows the target segment has significantly different WTP than assumed

**If significant impact is found** — the findings would change what's in the PRD or Final BRD:

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `pricing-research-complete` (triggers pipeline re-run from `/prd-generator` onward)
- Set Pricing Strategy field: `[PRICING_STRATEGY/](PRICING_STRATEGY/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count (e.g., `PRD Complete`), increment `Pricing Research Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update **Status** to `pricing-research-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `PRICING_RESEARCH_COMPLETED`, **Details**: `<N> phases completed (re-run — significant findings); Recommended model: <model>; Status rolled back — <brief reason>`
- If the activity table exceeds 20 data rows, remove the oldest entry

**If no significant impact** — the findings confirm or only slightly adjust existing pricing:

**Update `ideas/<slug>/IDEA.md`:**
- Do NOT change the status (keep existing status like `prd-complete`)
- Ensure Pricing Strategy field exists: `[PRICING_STRATEGY/](PRICING_STRATEGY/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: No changes (status didn't change)
- **Ideas Pipeline table**: Update **Updated** to today's date only (do not change Status)
- **Activity Log**: Add a row at the top — **Event**: `PRICING_RESEARCH_COMPLETED`, **Details**: `<N> phases completed (supplementary — confirms existing pricing); Recommended model: <model>`
- If the activity table exceeds 20 data rows, remove the oldest entry

### 5. Present Summary

Summarize for the user:

> **Pricing Strategy Complete for "<Idea Name>"**
>
> **Recommended Revenue Model:** <model name>
>
> **Tier Structure:**
> | Tier | Price | Target User | Key Features |
> |------|-------|-------------|--------------|
> | <Free> | $0 | <persona> | <features> |
> | <Pro> | $X/mo | <persona> | <features> |
> | <Business> | $X/mo | <persona> | <features> |
> | <Enterprise> | Custom | <persona> | <features> |
>
> **Unit Economics (Base Scenario):**
> - Gross margin: <X%>
> - Breakeven: <N> paid users
> - LTV:CAC ratio: <X:1>
> - Year 1 ARR: <$X> → Year 3 ARR: <$X>
>
> **Key Findings:**
> - <top 2-3 pricing insights>
>
> **Files created:**
> - `ideas/<slug>/PRICING_STRATEGY/` (5 phase files + README)
>
> Run `/prd-generator` to generate the PRD and Final BRD with integrated pricing data.

If the idea was re-run with **significant impact**:
> **Significant pricing changes detected** — status rolled back to `pricing-research-complete`.
> The following downstream documents should be updated:
> - <list specific documents and what changed — e.g., "PRD revenue model section outdated", "Final BRD Section 8 pricing assumptions changed">
> Run `/prd-generator` to regenerate the PRD and Final BRD with updated pricing findings.

If the idea was re-run with **no significant impact**:
> **Findings confirm existing pricing strategy** — status unchanged (`<current status>`).
> The `PRICING_STRATEGY/` folder is now updated with the latest research. No downstream regeneration needed.

## Modifiers

### help
Usage: `/pricing-strategy help`

**pricing-strategy** — No description

Available modifiers:
- `help` — Show this help message
