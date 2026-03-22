# /marketing-strategy

Generate a research-backed marketing strategy with competitor marketing analysis, customer acquisition channel evaluation, content & SEO strategy, go-to-market approach, and CAC estimation & budget planning.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Structure research into 5 phases. Sub-agents write full research directly to phase files (`MARKETING_STRATEGY/NN-phase.md`). They return ONLY structured summaries (~500 tokens each) to the main agent. The main agent never holds all research data in context at once.

When the user invokes `/marketing-strategy`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`supporting-systems-complete`** status (preferred) → Start fresh from Step 2
- **`business-research-complete`** status (backward compatibility — skipping supporting systems) → Start fresh from Step 2
- **`marketing-strategy`** status → Resume interrupted research from Step 3 (skip Step 2)
- **Any later status** (`marketing-strategy-complete`, `tech-research`, `tech-research-complete`, `pricing-research`, `pricing-research-complete`, `prd-draft`, `prd-complete`) → Re-run (supplementary enrichment). Check if `MARKETING_STRATEGY/` folder already exists:
  - **If folder exists with completed research**: Ask the user whether to (a) skip already-completed phases and only research new/changed ones, or (b) redo all research from scratch. For option (a), read the existing README.md and treat phases already marked `complete` as done — only research phases with status `pending` or that don't have a file yet.
  - **If no folder exists**: Start fresh from Step 2.
  - **Status handling**: Do NOT change the idea's status during research. After completion, the skill will assess whether findings are significant enough to warrant a status rollback (see Step 4).

If the user specifies a slug, use that idea directly (verify it has a BRD and business research).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/supporting-systems` first (preferred) or `/business-research` if no business research exists.

### 2. Read Context Documents & Start Research Phase

Read the following files for the selected idea:

- `ideas/<slug>/preparation/INITIAL-BRD.md` — focus on market analysis, competitive landscape, target users, revenue model. Fall back to `ideas/<slug>/BRD.md` for pre-restructuring ideas.
- `ideas/<slug>/IDEA.md` — original idea context, target market, user personas
- `ideas/<slug>/BUSINESS_RESEARCH/README.md` — feature tiers, competitive landscape, go-to-market assessment
- `ideas/<slug>/SUPPORTING_SYSTEMS/README.md` — supporting systems analysis (if it exists) — admin tools, onboarding systems, support infrastructure that affect marketing
- `ideas/<slug>/DOMAIN_RESEARCH/README.md` — domain methodology research findings (if available — recommended approaches affect product positioning and marketing messaging, e.g., "multi-strategy AI platform" vs. "gap trading specialist")

**Business research integration**: The BUSINESS_RESEARCH/README.md provides critical inputs:
- Feature tier classifications → identify Hero features for marketing messaging
- Competitive landscape per feature → inform competitor marketing research in Phase 1
- Go-to-market assessment → baseline for GTM strategy in Phase 4
- Novelty ratings → identify differentiators for positioning

**Supporting systems integration** (if available): The SUPPORTING_SYSTEMS/README.md provides:
- Onboarding system analysis → affects conversion rates and CAC
- Support system recommendations → affects support cost component of CAC
- Admin dashboard → affects self-serve capabilities (PLG readiness)

**Budget context**: Read `ideas/<slug>/BUDGET_CONTEXT.md` (created by `/brd-generator` during BRD generation). If it doesn't exist, warn that `/brd-generator` should be run first to create it with proper ramp-aware revenue projections. As a fallback for legacy ideas, compute it by following `.claude/skills/budget-assessment/SKILL.md` Steps 1-4 and save the output. Pass the funding stage, budget tiers, and cost sanity thresholds to every sub-agent.

**Status update depends on flow type (determined in Step 1):**

#### If fresh start (idea was `supporting-systems-complete` or `business-research-complete`):

Update the idea's status to `marketing-strategy` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Tracker updates:**
- **Pipeline Summary**: Decrement the previous status count, increment `Marketing Strategy`
- **Ideas Pipeline table**: Update the idea's **Status** to `marketing-strategy`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `MARKETING_STRATEGY_STARTED`, **Details**: `Marketing strategy research initiated`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

#### If re-run (idea was already past the starting statuses):

Do **NOT** change the idea's status. Keep the existing status. Only update `IDEAS_TRACKER.md`:
- **Ideas Pipeline table**: Update **Updated** to today's date only
- **Activity Log**: Add a row at the top — **Event**: `MARKETING_STRATEGY_STARTED`, **Details**: `Marketing strategy research initiated (re-run on <current status>)`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

The status decision happens **after** all research is complete — see Step 4.

### 3. Generate Marketing Strategy Analysis

Read the marketing strategy template from `.claude/skills/marketing-strategy/references/marketing-strategy-template.md`.

**Always create a `ideas/<slug>/MARKETING_STRATEGY/` folder** with per-phase files.

#### Research Progress Tracking (Resumability)

**First action — create or read the tracking table:**

- **Fresh start** (no existing `MARKETING_STRATEGY/` folder): Create `ideas/<slug>/MARKETING_STRATEGY/README.md` with the header metadata and a **Research Progress** table listing all 5 phases with status `pending`:

```markdown
## Research Progress

| # | Phase | File | Depends On | Status | Updated |
|---|-------|------|-----------|--------|---------|
| 1 | Competitor Marketing Analysis | [01-competitor-marketing-analysis.md](01-competitor-marketing-analysis.md) | — | pending | — |
| 2 | Customer Acquisition Channels | [02-customer-acquisition-channels.md](02-customer-acquisition-channels.md) | — | pending | — |
| 3 | Content & SEO Strategy | [03-content-seo-strategy.md](03-content-seo-strategy.md) | — | pending | — |
| 4 | Go-to-Market Strategy | [04-go-to-market-strategy.md](04-go-to-market-strategy.md) | 1, 2 | pending | — |
| 5 | CAC Estimation & Budget Planning | [05-cac-estimation-budget.md](05-cac-estimation-budget.md) | 1, 2, 3, 4 | pending | — |
```

- **Resuming** (status was `marketing-strategy`): Read `ideas/<slug>/MARKETING_STRATEGY/README.md`. Find the **Research Progress** table. Identify phases with status `pending` — these are the ones that need to be researched. **Skip phases already marked `complete`.** Respect dependencies — Phase 4 requires 1-2, Phase 5 requires 1-4.

#### Phase Execution Order

Phases 1, 2, and 3 have **no dependencies** — launch their sub-agents in parallel.
Phase 4 depends on Phases 1 and 2 — wait for both to complete.
Phase 5 depends on Phases 1-4 — wait for Phase 4 to complete.

#### Research Guidelines (apply to all phases)

- **Zero generic advice rule**: Every recommendation must reference the actual product name, ICP (ideal customer profile), and market-specific data. No generic "use content marketing" — must be specific to this product, this market, these users.
- Use **real data only** — never fabricate competitor marketing spend, CAC benchmarks, or channel performance metrics
- **Cite sources** inline (industry reports, competitor case studies, benchmark studies)
- **Date-stamp all data** — note when competitor data or benchmarks were researched
- **Distinguish sources from estimates** — clearly label which numbers come from research vs. assumptions
- **Bootstrap-first sequencing**: Every recommendation must start with what a bootstrapped founder can do at minimal cost (sweat equity + low-cost alternatives where $0 isn't viable), then layer on paid options as revenue grows. Don't present Scale-tier recommendations without showing the Bootstrap path first.
- **Three-tier requirement**: All spend recommendations (channels, tools, content, campaigns) must be framed across Bootstrap / Growth / Scale tiers from `BUDGET_CONTEXT.md`. Show what changes at each tier transition.
- **Cost sanity check**: After calculating total recommended spend per phase, compare against the Budget Envelope from `BUDGET_CONTEXT.md`. Follow the cost sanity check procedure in `.claude/skills/budget-assessment/SKILL.md` Step 5. Flag any recommendation that exceeds envelope thresholds.

**Research & Citation Methodology**: Follow `.claude/skills/research-citations/SKILL.md` for all research. Use FACT-ID prefix `MKG` for marketing-specific research facts. Additional requirements:
- All competitor marketing data must include source URL + access date
- CAC benchmarks must cite the original study/report (not blog summaries)
- Channel performance data must cite the study methodology and sample size where available

**Citation URL Verification (Mandatory)**: After completing each phase file, run the Citation URL Verification Protocol (`.claude/skills/research-citations/SKILL.md` Section I) against all URLs in that file. Also run the Pre-Publication Verification Checklist (`.claude/skills/research-citations/references/citation-checklist.md`). Fix all CRITICAL and HIGH issues before moving to the next phase.

#### Phase 1 — Competitor Marketing Analysis

Launch a sub-agent that:
- Receives the BRD competitive landscape, BUSINESS_RESEARCH competitive findings, and idea context
- Uses web search to research **how competitors market their products**:
  - Marketing channels used (paid ads, content, social, email, partnerships, events)
  - Ad spend estimates (from SimilarWeb, SEMrush-style data, or industry reports)
  - Brand positioning and messaging strategy
  - Content cadence and types (blog frequency, video, podcasts, webinars)
  - Social media presence and engagement metrics
  - SEO performance indicators (domain authority signals, keyword rankings)
  - Notable marketing campaigns or viral moments
  - Referral/affiliate programs
- For each major competitor, creates a marketing profile
- Identifies gaps in competitor marketing that this product can exploit
- **Writes the complete analysis directly to `ideas/<slug>/MARKETING_STRATEGY/01-competitor-marketing-analysis.md`**
- Returns ONLY a structured summary:

```
Summary (max 500 tokens):
- Phase: Competitor Marketing Analysis
- Competitors analyzed: <count>
- Dominant channels: <top 3 channels across competitors>
- Marketing gap identified: <key opportunity>
- Avg. estimated ad spend: <range>
- Key insight: <one line>
- File: MARKETING_STRATEGY/01-competitor-marketing-analysis.md
```

#### Phase 2 — Customer Acquisition Channels

Launch a sub-agent that:
- Receives the BRD target users, BUSINESS_RESEARCH go-to-market assessment, and idea context
- Evaluates **every viable acquisition channel** for this specific product and market:
  - Paid channels: Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, Twitter/X Ads
  - Organic channels: SEO, content marketing, social media organic
  - Direct channels: Email marketing, SMS marketing, push notifications
  - Community channels: Forums, Discord/Slack communities, Reddit, developer communities
  - Referral channels: Referral programs, affiliate marketing, word-of-mouth
  - Partnership channels: Strategic partnerships, co-marketing, integrations marketplace
  - Offline channels: Events, conferences, trade shows (if applicable)
- For each channel, scores using a weighted matrix following the Options Rating Matrix methodology at `.claude/skills/options-rating-matrix/SKILL.md`. Use these baseline KPIs (add more if they would differentiate channels for this specific product and market):
  - **Fit for ICP**: How well does this channel reach the ideal customer? (High weight — this matters most)
  - **Estimated CAC**: What's the typical CAC for this channel in this market? (High weight — lower is better)
  - **Time-to-results**: How quickly does this channel deliver results? (weight depends on stage — High for pre-PMF, Medium for growth)
  - **Reach**: How many target users can this channel access? (Medium weight)
  - **Scalability**: Can this channel scale with the business? (Low weight for early-stage, Medium for growth-stage)
  - Assign High(3x)/Medium(2x)/Low(1x) weights based on the product's current stage. Calculate weighted scores. Use **composite recommendation** — the output is a ranked channel mix with budget allocation, not a single winner.
- **Partnerships as a channel**: Evaluate partnership readiness. Guideline: Do NOT recommend partnerships pre-PMF (product-market fit). Partnerships work best when you have proven value to offer. Include a readiness check: current stage, value proposition clarity, potential partners, and recommended timing.
- **Channel sequencing guideline**: Recommend channels by stage:
  - **Pre-PMF**: Founder sales, direct outreach, communities, early adopter programs
  - **Early traction**: Content marketing, outbound sales, targeted paid ads
  - **Growth**: SEO, scaled paid acquisition, partnerships, affiliate programs
  - **Scale**: All channels, brand marketing, programmatic ads, international expansion
- **Bootstrap alternative per channel**: For every channel evaluated, include a "Bootstrap alternative" row showing the lowest-cost viable version — sweat equity ($0) where reasonable, or a low-cost alternative where $0 isn't viable (e.g., Google Ads → manual SEO + Google Business Profile; Meta Ads → organic Instagram/TikTok posting; email marketing tool → manual WhatsApp outreach; paid analytics → free Google Analytics). The bootstrap version must be actionable, not just "do it for free."
- **Writes the complete evaluation directly to `ideas/<slug>/MARKETING_STRATEGY/02-customer-acquisition-channels.md`**
- Returns ONLY a structured summary:

```
Summary (max 500 tokens):
- Phase: Customer Acquisition Channels
- Channels evaluated: <count>
- Top 3 channels: <names with scores>
- Lowest CAC channel: <name> at est. $<X>
- Recommended stage-1 channels: <list>
- Bootstrap channels: <list> (sweat equity or low-cost alternatives where $0 isn't viable)
- Partnership readiness: Ready / Not yet (pre-PMF)
- File: MARKETING_STRATEGY/02-customer-acquisition-channels.md
```

#### Phase 3 — Content & SEO Strategy

Launch a sub-agent that:
- Receives the BRD requirements, competitive landscape, and target market context
- Researches **keyword opportunities**:
  - High-intent keywords for the product category
  - Long-tail keywords with lower competition
  - Question-based keywords (what users are searching for)
  - Competitor keyword gaps (keywords competitors rank for that this product should target)
- Conducts **content gap analysis**:
  - What content exists in this market/niche?
  - What content is missing that target users need?
  - Content formats that perform well in this space
- Analyzes **SEO competitive landscape**:
  - Domain authority of top competitors
  - Backlink profiles (general assessment)
  - Content velocity of competitors
- Proposes **content calendar framework**:
  - Content pillars tied to product features (especially Hero features from business research)
  - Content types by funnel stage (awareness → consideration → decision)
  - Publishing cadence recommendation
  - Distribution strategy per content piece
- **Writes the complete analysis directly to `ideas/<slug>/MARKETING_STRATEGY/03-content-seo-strategy.md`**
- Returns ONLY a structured summary:

```
Summary (max 500 tokens):
- Phase: Content & SEO Strategy
- Keywords identified: <count>
- Top keyword opportunity: <keyword> (volume: <X>, difficulty: <Y>)
- Content gaps found: <count>
- Recommended publishing cadence: <X pieces/week>
- Primary content pillars: <list>
- File: MARKETING_STRATEGY/03-content-seo-strategy.md
```

#### Phase 4 — Go-to-Market Strategy (depends on Phases 1-2)

**Wait for Phases 1 and 2 to complete.** Read the summaries from both phases.

Launch a sub-agent that:
- Receives Phase 1-2 summaries, BUSINESS_RESEARCH go-to-market assessment, and BRD requirements
- **Also reads** the completed Phase 1 and 2 files for detailed data

**PLG vs Sales-Led Decision Tree**: Apply this framework to determine the primary GTM motion:
- **ACV < $5K** with self-serve potential → **Product-Led Growth (PLG)**: Free tier/trial drives adoption, product is the primary acquisition channel
- **ACV $5K-$50K** with technical buyers → **Community-Led / Developer-Led**: Open-source, developer relations, technical content
- **ACV $5K-$50K** with non-technical buyers → **Sales-Assisted**: Inside sales team, demo-driven, SDR outreach
- **ACV > $50K** → **Enterprise Sales-Led**: Field sales, solution engineering, relationship-driven
- **Hybrid**: Many products combine PLG for SMB + Sales for Enterprise

**Growth loop identification**: Identify and name the applicable growth loop type(s) for this product:
- **Viral loop**: Users invite other users as part of product usage (e.g., collaboration tools)
- **Content loop**: Product generates content that attracts new users via SEO (e.g., review platforms)
- **UGC loop**: User-generated content creates network effects (e.g., marketplaces)
- **Paid loop**: Revenue funds ads that drive more revenue (e.g., e-commerce)
- **Sales loop**: Revenue funds sales team that drives more revenue (e.g., enterprise SaaS)
- **Partner loop**: Partners drive users who attract more partners (e.g., app marketplaces)

The sub-agent then:
- Evaluates the GTM model using the decision tree above with product-specific rationale
- Defines **positioning & messaging**:
  - Value proposition (specific to ICP, not generic)
  - Key differentiators vs. top competitors (from Phase 1)
  - Messaging framework by persona
- Designs **launch strategy**:
  - Pre-launch activities (waitlist, beta program, content seeding)
  - Launch day tactics
  - Post-launch 90-day plan
- Plans **early adopter acquisition**:
  - First 100 users strategy (specific tactics, not generic advice)
  - Community building approach
  - Feedback loops
- Designs **bootstrap launch variant**: A version of the launch plan achievable with $0 marketing budget — founder time only. Must include: specific daily/weekly founder activities, time commitment in hours/week, expected results timeline, and milestone triggers for when to start spending money (tied to tier transitions from `BUDGET_CONTEXT.md`).
- **Writes the complete analysis directly to `ideas/<slug>/MARKETING_STRATEGY/04-go-to-market-strategy.md`**
- Returns ONLY a structured summary:

```
Summary (max 500 tokens):
- Phase: Go-to-Market Strategy
- GTM model: PLG / Sales-Led / Community-Led / Hybrid
- Growth loop: <type>
- Primary positioning: <one line>
- Launch strategy: <approach>
- First 100 users: <primary tactic>
- Key insight: <one line>
- File: MARKETING_STRATEGY/04-go-to-market-strategy.md
```

#### Phase 5 — CAC Estimation & Budget Planning (depends on Phases 1-4)

**Wait for Phase 4 to complete.** Read the summaries from all four phases.

Launch a sub-agent that:
- Receives Phase 1-4 summaries, BRD budget estimates, and SUPPORTING_SYSTEMS/README.md (if exists) for support cost data
- **Also reads** the completed Phase 1-4 files for detailed data

- **CAC calculation methodology**:
  - Research industry CAC benchmarks for the specific segment (SaaS, marketplace, etc.)
  - Break down CAC by channel (from Phase 2 channel evaluation)
  - Include all components: ad spend, content creation, sales team cost, tooling, onboarding cost
  - If `SUPPORTING_SYSTEMS/README.md` exists, incorporate support system costs that contribute to CAC
  - Calculate **blended CAC** (weighted average across channels)
  - **Fully-loaded CAC (mandatory)**: For every tier (especially Bootstrap), calculate a "fully-loaded CAC" that imputes founder time at market rate. Research the salary of a marketing/sales coordinator in the target market (e.g., Saudi Arabia), derive an hourly rate, and apply it to founder hours spent on acquisition. Formula: `Fully-loaded CAC = (Cash spend + Founder hours × Market hourly rate) / Customers acquired`. Always show both "Cash CAC" and "Fully-loaded CAC" — **lead with fully-loaded CAC** in summaries, READMEs, and any metric that feeds into LTV:CAC ratios. Cash-only CAC appears as a secondary metric labeled "Cash-only CAC (excludes founder time)." This prevents misleading ratios when founder effort is the primary acquisition channel.

- **Per-channel budget allocation**:
  - For each recommended channel (from Phase 2), estimate:
    - Monthly spend
    - Expected leads/signups
    - Expected conversions
    - Channel-specific CAC
  - Prioritize channels by CAC efficiency and scalability

- **CAC payback period**:
  - CAC / (Monthly ARPU × Gross Margin) = months to payback
  - Use BRD revenue model estimates for ARPU (will be refined by `/pricing-strategy` later)
  - Compare to industry benchmarks

- **Marketing budget by tier** (replaces single-budget approach):
  - **Bootstrap tier**: Minimal cash spend — primarily founder time + low-cost alternatives where $0 isn't viable. Break down founder time investment by channel (hours/week). Show expected results at bootstrap level. This is Month 1 reality for bootstrapped ideas.
  - **Growth tier**: $2K-$5K/month total marketing spend (funded by early revenue). Show channel allocation at this budget level. Include tier transition trigger from `BUDGET_CONTEXT.md`.
  - **Scale tier**: Full recommended spend. Quarter-by-quarter budget with channel breakdown. Only viable when revenue or funding supports it.
  - For each tier, show: channels active, monthly spend, expected leads, expected conversions, projected CAC
  - **Cost sanity check**: Compare Scale-tier Year 1 total against marketing budget envelope from `BUDGET_CONTEXT.md`. Show the ratio: `Scale Year 1 spend / Projected Year 1 revenue × 100 = X%`. Apply thresholds from budget assessment methodology.

- **Marketing-to-revenue projections**:
  - Conservative, Base, Optimistic scenarios
  - Each scenario: spend → leads → conversions → revenue
  - Every assumption must be sourced or clearly marked as an estimate

- **Marketing-driven product features**:
  - Features that should be prioritized for marketing impact:
    - Referral systems, viral sharing, social proof, reviews
    - Embeddable widgets, integrations that drive distribution
    - Free tools / calculators that drive SEO traffic
  - These feed into `/tech-research` as additional capabilities to evaluate

- **Writes the complete analysis directly to `ideas/<slug>/MARKETING_STRATEGY/05-cac-estimation-budget.md`**
- Returns ONLY a structured summary:

```
Summary (max 500 tokens):
- Phase: CAC Estimation & Budget Planning
- Blended CAC: $<X>
- Lowest CAC channel: <name> at $<X>
- Year 1 marketing budget: $<X>
- CAC payback: <N> months
- Marketing-driven features: <count> recommended
- Key assumption: <most sensitive variable>
- File: MARKETING_STRATEGY/05-cac-estimation-budget.md
```

**After each phase is complete**, update its row in the README.md Research Progress table: set **Status** to `complete` and **Updated** to today's date.

#### After all phases are complete:

**Refine BUDGET_CONTEXT.md with validated revenue**: After Phase 5 produces the revenue bridge (marketing spend → leads → conversions → revenue), update `ideas/<slug>/BUDGET_CONTEXT.md`:
1. Read the existing file (preliminary version from BRD generator)
2. Update `Version` to `validated (from marketing strategy)`
3. Update `Projected Year 1 Revenue` with the validated Year 1 cumulative revenue from the marketing strategy's base scenario revenue bridge
4. Recalculate the Budget Envelope using the validated revenue (same methodology, new input)
5. Add a `Validation Notes` section showing: preliminary vs. validated revenue, deviation percentage, and what changed
6. If deviation > 30%, flag that downstream skills (tech-research, pricing-strategy) will use significantly different budget envelopes than what supporting-systems used

Fill in the remaining README.md sections using the phase summaries and key data points: Executive Summary, Recommended Go-to-Market Strategy, Channel Mix, CAC Estimates, Marketing Budget, Marketing-Driven Product Features, Impact on Downstream Skills, Risks & Mitigations, Open Questions & Next Steps.

### 4. Update Tracker and Status

After all phases are complete and the README is finalized:

#### Normal flow (idea was `supporting-systems-complete`, `business-research-complete`, or `marketing-strategy`)

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `marketing-strategy-complete`
- Add a Marketing Strategy field: `[MARKETING_STRATEGY/](MARKETING_STRATEGY/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Marketing Strategy Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update **Status** to `marketing-strategy-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `MARKETING_STRATEGY_COMPLETED`, **Details**: `GTM: <model>; Primary channels: <top 3>; Blended CAC: $<X>; Year 1 budget: $<X>; <N> marketing-driven features recommended`
- If the activity table exceeds 20 data rows, remove the oldest entry

#### Re-run on completed idea (idea was already past `marketing-strategy-complete`)

After completing the research, assess whether the findings materially change the idea's marketing strategy compared to what's already in existing downstream documents. Check for **significant impact indicators**:

- GTM strategy changed (e.g., was PLG, now sales-led is clearly better)
- CAC estimate changed by >30% (affects unit economics and pricing)
- New high-value acquisition channel discovered that wasn't previously considered
- Marketing-driven feature recommendations changed (affects tech research priorities)
- Competitor marketing landscape shifted significantly (new entrant, pricing war, etc.)

**If significant impact is found** — the findings would change downstream research or pricing:

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `marketing-strategy-complete` (triggers re-evaluation from `/tech-research` onward)
- Set Marketing Strategy field: `[MARKETING_STRATEGY/](MARKETING_STRATEGY/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Marketing Strategy Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update **Status** to `marketing-strategy-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `MARKETING_STRATEGY_COMPLETED`, **Details**: `<N> phases completed (re-run — significant findings); GTM: <model>; Status rolled back — <brief reason>`
- If the activity table exceeds 20 data rows, remove the oldest entry

**If no significant impact** — the findings confirm or only slightly adjust existing strategy:

**Update `ideas/<slug>/IDEA.md`:**
- Do NOT change the status (keep existing status like `prd-complete`)
- Ensure Marketing Strategy field exists: `[MARKETING_STRATEGY/](MARKETING_STRATEGY/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: No changes (status didn't change)
- **Ideas Pipeline table**: Update **Updated** to today's date only (do not change Status)
- **Activity Log**: Add a row at the top — **Event**: `MARKETING_STRATEGY_COMPLETED`, **Details**: `<N> phases completed (supplementary — confirms existing strategy); GTM: <model>`
- If the activity table exceeds 20 data rows, remove the oldest entry

### 5. Present Summary

Summarize for the user:

> **Marketing Strategy Complete for "<Idea Name>"**
>
> **Recommended GTM Model:** <PLG / Sales-Led / Community-Led / Hybrid>
> **Growth Loop:** <type>
>
> **Channel Mix:**
> | Channel | Type | Est. CAC | Priority | % of Budget |
> |---------|------|----------|----------|-------------|
> | <channel> | Paid / Organic / Direct | $X | High / Medium / Low | X% |
>
> **CAC Estimates:**
> - Blended CAC: $<X>
> - Best channel: <name> at $<X>
> - CAC payback: <N> months
>
> **Marketing Budget by Tier:**
> | Tier | Monthly | Annual | Channels | Trigger |
> |------|---------|--------|----------|---------|
> | Bootstrap | $0 (X hrs/wk) | $0 | <channels> | Start here |
> | Growth | $X/mo | $X/yr | <channels> | MRR > $X for 2+ months |
> | Scale | $X/mo | $X/yr | <channels> | MRR > $X or funding |
>
> **Cost Sanity:** Scale Year 1 = $X (X% of projected Year 1 revenue)
>
> **Marketing-Driven Product Features:**
> - <list features that should be prioritized for marketing impact>
>
> **Key Findings:**
> - <top 2-3 marketing insights>
>
> **Files created:**
> - `ideas/<slug>/MARKETING_STRATEGY/` (5 phase files + README)
>
> Run `/tech-research` to conduct technical options research (includes marketing-driven features).

If the idea was re-run with **significant impact**:
> **Significant marketing changes detected** — status rolled back to `marketing-strategy-complete`.
> The following downstream documents should be updated:
> - <list specific documents and what changed>
> Run `/tech-research` to update technical research with new marketing requirements.

If the idea was re-run with **no significant impact**:
> **Findings confirm existing marketing strategy** — status unchanged (`<current status>`).
> The `MARKETING_STRATEGY/` folder is now updated with the latest research. No downstream regeneration needed.

## Modifiers

### help
Usage: `/marketing-strategy help`

**marketing-strategy** — No description

Available modifiers:
- `help` — Show this help message
