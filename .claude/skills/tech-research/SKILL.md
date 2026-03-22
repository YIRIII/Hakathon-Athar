# /tech-research

Conduct exhaustive technical options research for each capability identified in an idea's BRD, informed by business analysis findings.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Structure research into per-capability tasks. After completing each capability file, assess whether sufficient context remains for the next capability. If not, save progress and draft a continuation prompt.

**Sub-agent context fix**: Sub-agents write full research directly to capability files (`TECHNICAL_OPTIONS/NN-capability.md`). They return ONLY structured summaries (~500 tokens each) to the main agent. The main agent never holds all research data in context at once — this prevents burst context growth that causes data loss during auto-compaction.

When the user invokes `/tech-research`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`marketing-strategy-complete`** status (preferred) → Start fresh from Step 2
- **`supporting-systems-complete`** status (skipping marketing strategy) → Start fresh from Step 2
- **`business-research-complete`** status (backward compatibility — skipping supporting systems and marketing strategy) → Start fresh from Step 2
- **`brd-complete`** status (backward compatibility — skipping business research, supporting systems, and marketing strategy) → Start fresh from Step 2
- **`tech-research`** status → Resume interrupted research from Step 3 (skip Step 2)
- **Any later status** (`tech-research-complete`, `prd-draft`, `prd-complete`) → Re-run (supplementary enrichment). Check if `TECHNICAL_OPTIONS/` folder already exists:
  - **If folder exists with completed research**: Ask the user whether to (a) skip already-researched capabilities and only research new/changed ones, or (b) redo all research from scratch. For option (a), read the existing README.md and treat capabilities already marked `complete` as done — only research capabilities with status `pending` or that don't have a file yet.
  - **If no folder exists**: Start fresh from Step 2.
  - **Status handling**: Do NOT change the idea's status during research. After completion, the skill will assess whether findings are significant enough to warrant a status rollback (see Step 4).

If the user specifies a slug, use that idea directly (verify it has a BRD).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/marketing-strategy` first (preferred), or `/supporting-systems` → `/marketing-strategy` if those haven't been run, or `/business-research` if no business research exists, or `/brd-generator` if no BRD exists.

### 2. Read Context Documents & Start Research Phase

Read the following files for the selected idea:

- `ideas/<slug>/preparation/INITIAL-BRD.md` — the primary source for all product requirements (if not found, fall back to `ideas/<slug>/BRD.md` for pre-restructuring ideas)
- `ideas/<slug>/IDEA.md` — original idea context
- `ideas/<slug>/BUSINESS_RESEARCH/README.md` — business research findings (if it exists)
- `ideas/<slug>/SUPPORTING_SYSTEMS/README.md` — supporting systems analysis (if it exists)
- `ideas/<slug>/MARKETING_STRATEGY/README.md` — marketing strategy findings (if it exists)
- `ideas/<slug>/BUDGET_CONTEXT.md` — budget envelope, funding stage, and tier definitions (if it exists)
- `ideas/<slug>/DOMAIN_RESEARCH/README.md` — domain methodology research findings (if available — recommended domain approaches directly determine what technical capabilities need to be built; e.g., if domain research recommends momentum strategies over mean-reversion, the technical capabilities shift from statistical computation engines to real-time scanning and signal detection)

**Domain research integration** (if available): The DOMAIN_RESEARCH/README.md provides critical inputs:
- Recommended domain approaches → determine which technical capabilities are needed (domain methodology drives what to build)
- Key parameters and their ranges → inform technical requirements (e.g., parameter sensitivity analysis requires specific computation infrastructure)
- Implementation complexity notes → inform build-vs-buy decisions per approach
- "Impact on Downstream Pipeline" section → lists specific technical capabilities the domain approach requires

When domain research exists, use it to refine the capability list. Capabilities should implement the recommended domain approaches, not just the generic features listed in the BRD.

**Budget context integration**: Read `ideas/<slug>/BUDGET_CONTEXT.md` (created by `/brd-generator` during BRD generation, optionally refined by `/marketing-strategy`). Use it to:
- Read the funding stage and budget envelope to inform build-vs-buy decisions — a bootstrapped idea should weight cost more heavily than a funded one
- Use the Infrastructure budget envelope to sanity-check total recommended technology spend
- When scoring the "Cost" KPI in the options rating matrix, weight it Higher for bootstrapped/pre-seed ideas and Medium for funded ideas
- Include a "Bootstrap option" for every capability — the minimum viable approach achievable with free tiers or open-source only

If `BUDGET_CONTEXT.md` doesn't exist, warn that `/brd-generator` should be run first. As a fallback for legacy ideas, follow `.claude/skills/budget-assessment/SKILL.md` to compute it before starting research. Pass the budget context to every sub-agent.

**Supporting systems integration**: If `SUPPORTING_SYSTEMS/README.md` exists:
- Read the Priority Classification to identify Essential/Growth/Enterprise systems
- Note systems with "Build" recommendations — these may need their own capability entries in tech research
- Extract integration requirements that affect product capabilities (e.g., RBAC integration with booking, notification infrastructure shared with product features)
- Use cost estimates to inform build-vs-buy decisions for related product capabilities

**Marketing strategy integration**: If `MARKETING_STRATEGY/README.md` exists:
- Read Marketing-Driven Product Features section — these are additional capabilities to research (e.g., referral system, social sharing, analytics SDK)
- Note marketing tool integrations that need technical evaluation (e.g., email service provider, push notification service, analytics platform)
- Use CAC data to inform cost-benefit analysis of marketing-related capabilities

**Business research integration**: If `BUSINESS_RESEARCH/README.md` exists:
- Read the Prioritized Feature Ranking to understand strategic value of each feature
- Note competitive findings from the Per-Feature Competitive Landscape sections
- Use tier classifications to guide research depth:
  - **Hero** features: Exhaustive research — find every viable option, deep-dive analysis
  - **Depth** features: Thorough research — standard comprehensive analysis
  - **Supporting** features: Standard research — focused analysis on top options
  - **Skip** features: Lightweight research — brief survey of available options only
- Reference competitive findings in each capability's Context section

Update the idea's status to `tech-research` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Tracker updates when starting research phase:**
- **Pipeline Summary**: Decrement the previous status (`Marketing Strategy Complete`, `Supporting Systems Complete`, `Business Research Complete`, or `BRD Complete`), increment `Tech Research`
- **Ideas Pipeline table**: Update the idea's **Status** to `tech-research`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `TECH_RESEARCH_STARTED`, **Details**: `Technical options research initiated`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

### 3. Generate Technical Options Analysis

Read the technical options template from `.claude/skills/tech-research/references/technical-options-template.md`.

**Identify capabilities**: Scan the BRD for all major capabilities that require a technology decision. Look for:

- BRD Build vs. Partner Strategy section (if present)
- Business requirements (BR-*) that involve technology choices
- Technical feasibility notes and dependency lists
- Recommended next steps mentioning vendor evaluation or technology selection
- Scope section (in-scope features that require implementation decisions)

**Always create a `ideas/<slug>/TECHNICAL_OPTIONS/` folder** with per-capability files.

#### Research Progress Tracking (Resumability)

**First action — create or read the tracking table:**

- **Fresh start** (status was `business-research-complete` or `brd-complete`): Create `ideas/<slug>/TECHNICAL_OPTIONS/README.md` with the header metadata and a **Research Progress** table listing every identified capability with status `pending`:

```markdown
## Research Progress

| # | Capability | File | Status | Tier | Updated |
|---|-----------|------|--------|------|---------|
| 1 | <Name> | [01-name.md](01-name.md) | pending | Hero / Depth / Supporting / Skip | — |
| 2 | <Name> | [02-name.md](02-name.md) | pending | Hero / Depth / Supporting / Skip | — |
```

If `BUSINESS_RESEARCH/README.md` exists, populate the Tier column from the Prioritized Feature Ranking. Otherwise, leave all as `—`.

- **Resuming** (status was `tech-research`): Read `ideas/<slug>/TECHNICAL_OPTIONS/README.md`. Find the **Research Progress** table. Identify capabilities with status `pending` — these are the ones that need to be researched. **Skip capabilities already marked `complete`.**

#### For each capability that needs research:

1. **Define capability-specific KPIs** derived from BRD requirements, following the Options Rating Matrix methodology at `.claude/skills/options-rating-matrix/SKILL.md`. KPIs must be specific and measurable — not generic criteria. For example, for a detection capability: sensitivity, specificity, FPS, model size, supported conditions, battery drain. For an API service: latency, cost per call, uptime SLA, rate limits, geographic coverage. Use adaptive KPI count (as many as needed to differentiate options) with High/Medium/Low weighting.

2. **Research with sub-agents**: Launch a sub-agent for each capability. The sub-agent:
   - Receives the BRD requirement context and business analysis competitive findings (if available)
   - **Challenge the assumed approach**: If the BRD or IDEA.md specifies a particular method/technology for this capability (e.g., "use 3D printing," "use blockchain," "build with React Native"), the sub-agent must NOT just research options within that approach. It must also:
     - Research **alternative approaches** to achieve the same outcome (e.g., if "3D printing" is specified for manufacturing, also research injection molding, CNC machining, cast production)
     - Search for **community sentiment and practitioner feedback** comparing the approaches (Reddit, forums, industry blogs, review sites)
     - Evaluate whether the assumed approach is genuinely the best fit given the product's quality requirements, cost targets, scale needs, and market expectations
     - If alternatives are clearly superior, include an **"Approach Challenge"** callout box at the top of the capability file explaining what was found and recommending the better approach, with evidence
     - Even if the owner's approach is viable, note any significant trade-offs that competitors or practitioners have flagged (e.g., "3D-printed drones have lower structural integrity than injection-molded ones; customer reviews on Reddit consistently prefer cast products")
   - Uses web search to find **every viable option** in the market (do not stop at 3-4 options)
   - Searches for: official pricing pages, SDK documentation, developer resources, independent benchmarks, community reviews (GitHub issues, Stack Overflow, blog posts), recent news
   - **Scores all options using the Options Rating Matrix** (`.claude/skills/options-rating-matrix/SKILL.md`): define KPIs, score 1-5 per KPI, calculate weighted scores, recommend highest scorer with rationale. Include score rationales for top 3 options.
   - Selects top recommended options (up to 5) with detailed profiles
   - Documents non-recommended options with specific exclusion reasons
   - Makes a recommendation with rationale tied to specific BRD requirements
   - Includes a mini case study if available
   - **Writes the complete analysis directly to `ideas/<slug>/TECHNICAL_OPTIONS/NN-capability.md`**
   - Returns ONLY a structured summary to the main agent:

```
Summary (max 500 tokens):
- Capability: <name>
- Options found: <count>
- Recommendation: <name> (<approach>)
- Est. Year 1 Cost: <amount>
- Key risk: <one line>
- File: TECHNICAL_OPTIONS/NN-name.md
```

3. **After each capability is complete**, update its row in the README.md Research Progress table: set **Status** to `complete` and **Updated** to today's date.

**Research guidelines**:
- Use **real data only** — never fabricate pricing, accuracy numbers, or benchmarks
- **Cite sources** inline (vendor pages, documentation, papers)
- **Date-stamp pricing** — note when pricing was researched
- **Distinguish vendor claims vs independent validation**
- **Consider startup context** — evaluate pricing tiers for small teams, minimum commitments, scalability
- **Impute founder time at market rate** — when a "build" option requires founder development or maintenance time, impute that time at the market hourly rate for a developer in the target market (research the actual salary and derive hourly rate). A "build from scratch in 40 hours" option has a real cost of `40 × hourly rate`, not $0. Show both "Cash cost" and "Fully-loaded cost (incl. founder time)" in cost comparisons. Use fully-loaded cost in the options rating matrix cost KPI. This prevents build options from always appearing cheapest by hiding labor costs.

**Research & Citation Methodology**: Follow `.claude/skills/research-citations/SKILL.md` for all research conducted during technical options analysis. Additional requirements for technical research:
- All vendor pricing must include a "researched on [YYYY-MM-DD]" stamp
- Distinguish vendor marketing claims vs. independent benchmarks — note which is which
- Trace benchmark numbers to their original test/paper, not blog summaries
- When vendor pricing says "Contact Sales," note this explicitly and provide industry estimates with clear attribution
- Use the structured fact entry format for key technical claims (accuracy numbers, latency, pricing)

**Citation URL Verification (Mandatory)**: After completing each Technical Options capability file, run the Citation URL Verification Protocol (`.claude/skills/research-citations/SKILL.md` Section I) against all URLs in that file. Verify every vendor pricing page, benchmark source, and SDK documentation link. Also run the Pre-Publication Verification Checklist (`.claude/skills/research-citations/references/citation-checklist.md`) including the Technical Options-Specific section. Fix all CRITICAL and HIGH issues before moving to the next capability file.

If the BRD has no significant technology decisions (e.g., a simple content site), create a brief `TECHNICAL_OPTIONS/README.md` explaining why no detailed analysis was needed, with an empty Research Progress table.

#### After all capabilities are complete:

Fill in the remaining README.md sections (Executive Summary, Strategy Overview, Capability Analyses table, Partnership Strategy Summary, Cost Impact Summary, Open Questions & Next Steps).

### 4. Update Tracker and Status

After all capabilities are researched and the README is finalized:

#### Normal flow (idea was `business-research-complete`, `brd-complete`, or `tech-research`)

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `tech-research-complete`
- Set Technical Options field to `[TECHNICAL_OPTIONS/](TECHNICAL_OPTIONS/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Tech Research Complete`
- **Ideas Pipeline table**: Update **Status** to `tech-research-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `TECH_RESEARCH_COMPLETED`, **Details**: `<N> capabilities analyzed; Strategy: <build/partner/hybrid>`
- If the activity table exceeds 20 data rows, remove the oldest entry

#### Re-run on completed idea (idea was already past `tech-research-complete`)

After completing the research, assess whether the findings materially change the idea's technical strategy compared to what's already in the existing downstream documents (PRD, BRD). Check for **significant impact indicators**:

- A recommended vendor/technology changed (e.g., previously recommended Option A, now Option B is clearly better)
- The build vs. partner strategy flipped for a capability (e.g., was "build in-house," now "license" is clearly superior)
- Cost estimates changed dramatically (e.g., Year 1 cost doubled or halved)
- A new capability was discovered that wasn't in previous research (e.g., a new API/SDK that enables a feature differently)
- A previously recommended option is now deprecated, discontinued, or has critical issues
- A capability previously treated as low-risk now has significant technical risk

**If significant impact is found** — the findings would change what's in the PRD or technical architecture:

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `tech-research-complete` (triggers pipeline re-run from `/prd-generator` onward)
- Set Technical Options field to `[TECHNICAL_OPTIONS/](TECHNICAL_OPTIONS/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count (e.g., `PRD Complete`), increment `Tech Research Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update **Status** to `tech-research-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `TECH_RESEARCH_COMPLETED`, **Details**: `<N> capabilities analyzed (re-run — significant findings); Strategy: <build/partner/hybrid>; Status rolled back — <brief reason>`
- If the activity table exceeds 20 data rows, remove the oldest entry

**If no significant impact** — the findings confirm or only slightly adjust existing technical choices:

**Update `ideas/<slug>/IDEA.md`:**
- Do NOT change the status (keep existing status like `prd-complete`)
- Ensure Technical Options field exists: `[TECHNICAL_OPTIONS/](TECHNICAL_OPTIONS/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: No changes (status didn't change)
- **Ideas Pipeline table**: Update **Updated** to today's date only (do not change Status)
- **Activity Log**: Add a row at the top — **Event**: `TECH_RESEARCH_COMPLETED`, **Details**: `<N> capabilities analyzed (supplementary — confirms existing choices); Strategy: <build/partner/hybrid>`
- If the activity table exceeds 20 data rows, remove the oldest entry

### 5. Present Summary

Summarize for the user:

> **Tech Research Complete for "<Idea Name>"**
>
> **Technical Options Analysis:**
> - Capabilities analyzed: <count>
> - Total options researched: <count across all capabilities>
> - Build in-house: <count and list>
> - License/partner: <count and list>
> - Key vendor engagements needed: <list>
>
> **Strategy**: <build-heavy / partner-heavy / hybrid>
>
> **Estimated Year 1 Cost**: <total from all capabilities>
>
> **Files created:**
> - `ideas/<slug>/TECHNICAL_OPTIONS/` (<N> capability files + README)
>
> Run `/prd-generator` to generate the PRD and Final BRD.

If the idea was re-run with **significant impact**:
> **Significant changes detected** — status rolled back to `tech-research-complete`.
> The following downstream documents should be updated:
> - <list specific documents and what changed — e.g., "PRD tech stack no longer matches recommendations", "BRD cost estimates outdated">
> Run `/prd-generator` to regenerate the PRD and Final BRD with updated technical findings.

If the idea was re-run with **no significant impact**:
> **Findings confirm existing technical choices** — status unchanged (`<current status>`).
> The `TECHNICAL_OPTIONS/` folder is now updated with the latest research. No downstream regeneration needed.

## Modifiers

### help
Usage: `/tech-research help`

**tech-research** — No description

Available modifiers:
- `help` — Show this help message
