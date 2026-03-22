# /prd-generator

Generate a Product Requirements Document (PRD) and Final BRD from completed technical research.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Use the adaptive context management strategy described below to handle ideas of varying sizes.

When the user invokes `/prd-generator`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`risk-assessment-complete`** status (preferred — includes risk assessment) → Start fresh from Step 2
- **`constraint-validation-complete`** status (preferred — includes feasibility validation) → Start fresh from Step 2
- **`pricing-research-complete`** status (skipping constraint validation and risk assessment) → Start fresh from Step 2
- **`tech-research-complete`** status (backward compatibility — skipping pricing research) → Start fresh from Step 2

If the user specifies a slug, use that idea directly (verify it has completed technical research).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/pricing-strategy` first (preferred) or `/tech-research` if no technical research exists.

### 2. Read Context & Assess Context Budget

**Step 2a — Read compact overviews first:**

Read these files for the selected idea:
- `ideas/<slug>/preparation/INITIAL-BRD.md` — the primary business source (fall back to `ideas/<slug>/BRD.md` for pre-restructuring ideas)
- `ideas/<slug>/IDEA.md` — original idea context
- `ideas/<slug>/BUSINESS_RESEARCH/README.md` — business research findings (if it exists)
- `ideas/<slug>/SUPPORTING_SYSTEMS/README.md` — supporting systems analysis (if it exists)
- `ideas/<slug>/MARKETING_STRATEGY/README.md` — marketing strategy findings (if it exists)
- `ideas/<slug>/TECHNICAL_OPTIONS/README.md` — executive summary and strategy overview
- `ideas/<slug>/PRICING_STRATEGY/README.md` — pricing strategy findings (if it exists)
- `ideas/<slug>/CONSTRAINT_VALIDATION/README.md` — constraint register, feasibility matrix, and combined-option verdict (if it exists)
- `ideas/<slug>/RISK_ASSESSMENT/README.md` — risk register, mitigation plans, and go/no-go recommendation (if it exists)
- `ideas/<slug>/CUSTOMER_VALIDATION/README.md` — assumption validation findings (if it exists)
- `ideas/<slug>/DOMAIN_RESEARCH/README.md` — domain methodology research findings (if it exists — recommended approaches inform product architecture, feature design, and core algorithm choices)
- `ideas/<slug>/BUDGET_CONTEXT.md` — budget envelope, funding stage, and tier definitions (if it exists)

**Budget context integration**: If `BUDGET_CONTEXT.md` exists:
- Align implementation phases with budget tiers: Phase 1 (MVP) should be achievable within the Bootstrap tier — only free tools, open-source, and founder time
- Use tier transition triggers to define milestone-based phase gates (e.g., Phase 2 begins when Growth tier is affordable)
- Reference budget data in the Final BRD's budget section — update cost estimates to reflect actual research findings from all upstream skills
- In the Development Critical Path, note which tasks require paid tools/services vs. which can be done at bootstrap cost

**Step 2b — Estimate total input size:**

From the README Research Progress table, list all capability files. Estimate total input size:
- Count lines across all capability files listed in the README (rough heuristic: ~15 tokens per markdown line)
- Add estimated output size: PRD ≈ 400-500 lines, Final BRD ≈ 300-400 lines

**Step 2c — Choose processing strategy:**

- **If total < ~4,000 lines** (~60K tokens, ~30% of context): **Direct read** — read ALL capability files directly in the main agent. This is the simplest approach, produces the best quality, and has no information loss. This is the typical path for ideas with 5-10 capabilities.
- **If total > ~4,000 lines**: **Dependency clustering** — use the sub-agent strategy described in Step 2d below.

**Step 2d — Dependency clustering (only if total > ~4,000 lines):**

1. Identify which capabilities are interdependent from the README Strategy Overview and BRD requirements
   - Example: Saudi FPV Drones — 3D Printer, Printing Materials, Product Specs are all interdependent (a printer that can't process the chosen materials is useless)
   - Example: GuardianAI — Drowsiness Detection + Camera Integration are interdependent
2. Group dependent capabilities into clusters that MUST be processed together
3. For each cluster, spawn a sub-agent that:
   a. Reads INITIAL-BRD.md (or relevant BR sections) + ALL capability files in its cluster
   b. Generates the corresponding PRD sections (Feature Specifications, Technical Architecture)
   c. Writes sections directly to `ideas/<slug>/PRD.md`
   d. Returns a concise summary to the main agent
4. **Critical rule**: Interdependent capabilities are NEVER split across different sub-agents
5. Main agent handles overview sections using the README summary + BUSINESS_RESEARCH/README.md + sub-agent summaries
6. Same adaptive pattern for Final BRD generation

### 3. Generate the PRD

Update status to `prd-draft`:
- **Pipeline Summary**: Decrement the previous status (`Pricing Research Complete` or `Tech Research Complete`), increment `PRD Draft`
- **Ideas Pipeline table**: Update **Status** to `prd-draft`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `PRD_STARTED`, **Details**: `Deriving PRD from BRD and Technical Options Analysis`

Read the PRD template from `.claude/skills/prd-generator/references/prd-template.md`.

Generate `ideas/<slug>/PRD.md` by filling in the template. Derive all content from the BRD, **informed by the Technical Options Analysis recommendations** and **Business Analysis findings** (if available):

- **Goals & success metrics** flow from BRD business objectives and success criteria
- **User stories** are derived from BRD business requirements and user personas
- **Feature specifications** map to BRD business requirements (reference BR IDs). For each feature that was evaluated in the Technical Options Analysis, set the **Technical Approach** to the recommended option and add an **Options Analysis Reference** linking to the relevant file in `TECHNICAL_OPTIONS/`. If `BUSINESS_RESEARCH/README.md` exists, use feature tier classifications to inform feature priority and ordering (Hero features first). If `PRICING_STRATEGY/README.md` exists, note which pricing tier each feature belongs to (from the Tier Overview and feature-to-tier mapping) — this connects features to their monetization role.
- **Technical architecture** addresses BRD technical feasibility using the recommended technology choices from the Technical Options Analysis. The **Tech Stack** table rationale column should reference the analysis. The **Integrations** section should note recommended vendor/partner selections from the analysis.
- **Non-functional requirements** incorporate BRD compliance, security, and performance needs
- **Milestones** align with BRD budget and timeline expectations. If business analysis exists, use build allocation recommendations to inform phasing.
- **Development Critical Path** — collect all development time estimates from TECHNICAL_OPTIONS (per-capability files), SUPPORTING_SYSTEMS (per-system files), and core product features. For each task: extract the duration range, identify dependencies (e.g., Admin Dashboard depends on RBAC; Payment integration depends on core booking engine). Map dependencies into parallel tracks and identify the critical path (longest sequential chain). This determines the minimum calendar time to launch.- **Risks** extend BRD risks with technical implementation risks

Ensure traceability: every feature and user story should reference the BRD business requirement it fulfills.

Do NOT use placeholder text. Every section must contain substantive content derived from the BRD and Technical Options Analysis.

### 4. Generate Final BRD

After the PRD is complete, generate the **Final BRD** — an updated version of the Initial BRD that incorporates findings from the Technical Options Analysis, Business Analysis, and PRD work.

**Read these files** (if not already in context):
1. `ideas/<slug>/preparation/INITIAL-BRD.md` — the base document (fall back to `ideas/<slug>/BRD.md` for pre-restructuring ideas)
2. `ideas/<slug>/TECHNICAL_OPTIONS/README.md` — key technical findings and strategy
3. `ideas/<slug>/PRD.md` — feature decisions and architecture
4. `ideas/<slug>/BUSINESS_RESEARCH/README.md` — business research findings (if exists)
5. `ideas/<slug>/SUPPORTING_SYSTEMS/README.md` — supporting systems analysis (if exists)
6. `ideas/<slug>/MARKETING_STRATEGY/README.md` — marketing strategy findings (if exists)
7. `ideas/<slug>/PRICING_STRATEGY/README.md` — pricing strategy findings (if exists)

**If using dependency clustering (Step 2d was triggered)**: Use the same clustering strategy for Final BRD generation. Sub-agents write their sections directly, then main agent handles overview sections.

**Generate `ideas/<slug>/BRD.md`** (Final BRD at the idea root) using the same BRD template (`.claude/skills/brd-generator/references/brd-template.md`), with the following updates from the Initial BRD:

1. **BRD Phase**: Set to `Final` (in the header metadata)
2. **Executive Summary**: Update to reflect technical findings, validated approach, and any pivots discovered during research (e.g., material changes, vendor availability, regulatory discoveries)
3. **Market Analysis**: Keep original research data; add any new competitive insights found during Technical Options research. If business analysis exists, incorporate updated competitive landscape with per-feature findings.
4. **Scope**: Update if the PRD adjusted what's in/out of scope based on technical feasibility
5. **Business Requirements**: Update requirements that changed based on technical research (e.g., if a requirement was found to be infeasible or was refined). If business analysis exists, reflect revised feature priorities based on impact severity scoring.
6. **Revenue Model / Budget**: Revise with actual researched equipment costs, vendor pricing, and infrastructure costs from Technical Options. Incorporate business model validation results from business analysis. If `PRICING_STRATEGY/README.md` exists, **replace the entire Revenue Model section** with data from the pricing strategy: recommended revenue model, tier structure with researched price points, unit economics summary (gross margin, LTV:CAC, breakeven), and Year 1/Year 3 ARR projections (base scenario). This replaces any ungrounded ARPU/conversion assumptions from the Initial BRD with sourced data.
7. **Competitive Advantage**: Update with new moats or differentiators discovered during technical research
8. **Risks & Mitigation**: Add technical risks identified during PRD/Technical Options work
9. **Recommended Next Steps**: Update to reflect the PRD milestones and immediate action items
10. **Add "Technical Options Summary" section** (Section 14, before Recommended Next Steps which is Section 15): A brief summary referencing `TECHNICAL_OPTIONS/README.md` with key decisions per capability and overall build/partner/hybrid strategy

**Additional Final BRD updates when Business Analysis exists:**
- Updated competitive landscape with per-feature findings from BUSINESS_RESEARCH/README.md
- Revised feature priorities based on impact severity scoring
- Stakeholder/evaluator context
- Business model validation results
- Go-to-market assessment findings
- Regulatory deep-dive findings

**Additional Final BRD updates when Supporting Systems Analysis exists:**
- Add "Supporting Systems Summary" section: Priority classification (Essential/Growth/Enterprise), build-vs-buy recommendations, cost impact summary, and reference to `SUPPORTING_SYSTEMS/README.md`
- Update Budget section with supporting systems cost estimates
- Update Scope section to include Essential supporting systems in MVP scope

**Additional Final BRD updates when Marketing Strategy exists:**
- Add "Marketing Strategy Summary" section: GTM model, primary channels, blended CAC, Year 1 marketing budget, and reference to `MARKETING_STRATEGY/README.md`
- Update Revenue Model section with CAC data from marketing strategy (for LTV:CAC calculation)
- Update Success Criteria with marketing KPIs (target CAC, conversion rates, channel performance)
- Update Budget section with Year 1 marketing budget allocation

**Additional Final BRD updates when Pricing Strategy exists:**
- **Section 8 (Revenue Model)**: Replace entirely with pricing strategy data — recommended model, tier structure with researched price points, competitive pricing position, and pricing launch phasing
- **Add "Pricing Strategy Summary" section** (Section 15, after Technical Options Summary): Tier overview table, key unit economics (gross margin, LTV:CAC, breakeven), Year 1/Year 3 ARR projections (base scenario), pricing risks, and reference to `PRICING_STRATEGY/README.md` for full analysis
- **Budget section**: Update cost estimates with unit economics data — variable costs per user from PRICING_STRATEGY cost-to-serve analysis
- **Success Criteria**: Add pricing-related KPIs (target conversion rate, ARPU, churn rate) from pricing strategy benchmarks

The Final BRD should read as a self-contained, investment-ready document — someone reading only the BRD should understand the full business case including technically-informed decisions.

**Update `ideas/<slug>/IDEA.md`:**
- Set BRD field to `[BRD.md](BRD.md)`

### 4b. Mandatory Review (only when dependency clustering was used)

If Step 2d was triggered (sub-agents wrote sections):

1. Read the full `ideas/<slug>/PRD.md` and `ideas/<slug>/BRD.md` end-to-end
2. Review for: consistency across sections, proper cross-references, no contradictions between features, coherent flow (doesn't read like a patchwork)
3. If something looks wrong, read the specific capability file to verify and correct
4. This review is NOT needed when everything was read directly (Step 2c path) since the main agent already has full context

### 5. Update Tracker and Status

After the PRD and Final BRD are both complete:

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `prd-complete`
- Set PRD field to `[PRD.md](PRD.md)`
- Set Technical Options field to `[TECHNICAL_OPTIONS/](TECHNICAL_OPTIONS/README.md)`
- Set Pricing Strategy field to `[PRICING_STRATEGY/](PRICING_STRATEGY/README.md)` (if pricing research was completed)

**Update `IDEAS_TRACKER.md`:**

- **Pipeline Summary**: Decrement `PRD Draft`, increment `PRD Complete`. Increment **Complete (PRD)** count. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Find the idea's row and update:
  - **Status** → `prd-complete`
  - **BRD** → `[View](ideas/<slug>/BRD.md)` (now points to the Final BRD)
  - **PRD** → `[View](ideas/<slug>/PRD.md)`
  - **Updated** → today's date
- **Activity Log**: Add a row at the top — **Event**: `PRD_COMPLETED`, **Details**: `MVP scope: <brief summary>; Tech stack: <key choices>; Options analyzed: <N> capabilities; Final BRD updated`
- If the activity table exceeds 20 data rows, remove the oldest entry

### 6. Present Summary

Summarize for the user:

> **PRD Complete for "<Idea Name>"**
>
> **Feature Summary:**
> - <list of key features/epics>
>
> **Recommended Tech Stack:**
> - <key technology choices>
>
> **Technical Options Analysis:**
> - Capabilities analyzed: <count>
> - Build in-house: <count and list>
> - License/partner: <count and list>
> - Key vendor engagements needed: <list>
>
> **MVP Scope:**
> - <what's included in Phase 1>
> - Estimated effort: <from milestones>
>
> **Files created:**
> - `ideas/<slug>/PRD.md`
> - `ideas/<slug>/BRD.md` (Final — updated with technical findings)
>
> **Idea "<Idea Name>" is now fully documented through the BRD/PRD pipeline.**
> The Final BRD at `ideas/<slug>/BRD.md` reflects all research and technical decisions.
> Run `/presentation-generator` to create a pitch presentation.

## Modifiers

### help
Usage: `/prd-generator help`

**prd-generator** — No description

Available modifiers:
- `help` — Show this help message
