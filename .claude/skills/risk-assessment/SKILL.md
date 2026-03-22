# /risk-assessment

Conduct a structured risk assessment — identify, categorize, score, and plan mitigations for all material risks facing a product idea. Produces a prioritized risk register with actionable mitigation strategies and a risk-adjusted go/no-go recommendation.

**This skill is optional.** The pipeline works without it. It fits between `/pricing-strategy` and `/prd-generator` for ideas that need rigorous risk analysis before committing to implementation.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. This skill is optimized to keep the main agent's context low by delegating all heavy consolidation work to sub-agents. The main agent orchestrates; sub-agents do the heavy reading and writing.

**Architecture overview** (3 phases, 10 sub-agents total):
- **Phase 1**: 8 category sub-agents research risks and write per-category files (~500 token summaries returned)
- **Phase 2**: 1 consolidation sub-agent reads all 8 files → writes Risk Register, Heat Map, Profile Summary to README
- **Phase 3**: 1 assessment sub-agent reads all 8 files + README → writes Mitigation Plans, Go/No-Go, Pipeline Impact to README
- **Main agent**: Orchestrates phases, updates tracker, presents summary. Never reads full category files directly.

When the user invokes `/risk-assessment`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`constraint-validation-complete`** status (preferred — includes feasibility validation) → Start fresh from Step 2
- **`pricing-research-complete`** status (preferred — skipping constraint validation) → Start fresh from Step 2
- **`tech-research-complete`** status (backward compatibility — skipping pricing research) → Start fresh from Step 2
- **`brd-complete`** or any later completed status → Start fresh from Step 2 (risk assessment can run at any pipeline stage with a BRD)
- **`risk-assessment`** status → Resume from where assessment left off (read `RISK_ASSESSMENT/README.md` to find incomplete categories)
- **Any later status** (`risk-assessment-complete`, `prd-draft`, `prd-complete`) → Re-run (supplementary enrichment). Check if `RISK_ASSESSMENT/` folder already exists:
  - **If folder exists with completed work**: Ask the user whether to (a) update specific categories, or (b) redo all analysis from scratch.
  - **If no folder exists**: Start fresh from Step 2.
  - **Status handling**: Do NOT change the idea's status during research. After completion, assess whether findings warrant a status rollback (see Step 5).

If the user specifies a slug, use that idea directly (verify it has a BRD).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/brd-generator` first.

### 2. Read Context Documents (Lightweight)

The main agent reads only the minimum documents needed for orchestration:

- `ideas/<slug>/IDEA.md` — status, metadata, constraints
- `ideas/<slug>/preparation/INITIAL-BRD.md` (or `ideas/<slug>/BRD.md`) — read ONLY the executive summary, feature list, and known constraints sections (first ~100 lines). This gives enough context to orchestrate sub-agents without loading the full BRD into the main agent's context.

**Check which upstream documents exist** (file existence only — do NOT read their contents):

- `ideas/<slug>/RESEARCH.md`
- `ideas/<slug>/BUSINESS_RESEARCH/README.md`
- `ideas/<slug>/SUPPORTING_SYSTEMS/README.md`
- `ideas/<slug>/MARKETING_STRATEGY/README.md`
- `ideas/<slug>/TECHNICAL_OPTIONS/README.md`
- `ideas/<slug>/PRICING_STRATEGY/README.md`
- `ideas/<slug>/CONSTRAINT_VALIDATION/README.md`
- `ideas/<slug>/CUSTOMER_VALIDATION/README.md`
- `ideas/<slug>/DOMAIN_RESEARCH/README.md`
- `ideas/<slug>/BUDGET_CONTEXT.md`

Record which documents exist — this determines which documents to pass to each category sub-agent and the assessment scope in the README.

Update the idea's status to `risk-assessment` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Tracker updates when starting:**
- **Pipeline Summary**: Decrement the previous status count, increment `Risk Assessment`
- **Ideas Pipeline table**: Update the idea's **Status** to `risk-assessment`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `RISK_ASSESSMENT_STARTED`, **Details**: `Structured risk identification and mitigation planning initiated`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

### 3. Create Output Folder & README Scaffold

Read the template from `.claude/skills/risk-assessment/references/risk-assessment-template.md`.

Create `ideas/<slug>/RISK_ASSESSMENT/` folder.

Create `ideas/<slug>/RISK_ASSESSMENT/README.md` with a **minimal scaffold** — just the header, assessment scope table (populated from Step 2 existence check), and the research progress table (all 8 pending). Phases 2 and 3 sub-agents will write the remaining sections.

```markdown
# Risk Assessment — {Idea Name}

**Idea**: {slug}
**Date**: {YYYY-MM-DD}
**Status**: In Progress
**Recommendation**: Pending

## Assessment Scope

| Document | Available | Key Input |
|----------|-----------|-----------|
| BRD | Yes/No | {brief note} |
| ... | | |

## Research Progress

| # | Risk Category | File | Risks Found | Status | Updated |
|---|--------------|------|-------------|--------|---------|
| 1 | Market & Timing | [01-market-timing.md](01-market-timing.md) | — | pending | — |
| 2 | Customer & Demand | [02-customer-demand.md](02-customer-demand.md) | — | pending | — |
| 3 | Competitive & Strategic | [03-competitive-strategic.md](03-competitive-strategic.md) | — | pending | — |
| 4 | Technical & Feasibility | [04-technical-feasibility.md](04-technical-feasibility.md) | — | pending | — |
| 5 | Financial & Unit Economics | [05-financial-economics.md](05-financial-economics.md) | — | pending | — |
| 6 | Operational & Execution | [06-operational-execution.md](06-operational-execution.md) | — | pending | — |
| 7 | Regulatory & Compliance | [07-regulatory-compliance.md](07-regulatory-compliance.md) | — | pending | — |
| 8 | Reputational & Trust | [08-reputational-trust.md](08-reputational-trust.md) | — | pending | — |
```

Do NOT write any sections below Research Progress yet — Phase 2 and Phase 3 sub-agents handle that.

### Phase 1 — Risk Identification & Analysis (Per-Category Sub-Agents)

Launch sub-agents to research risk categories in parallel (batch 2-3 at a time to manage context). Each sub-agent:

- **Reads the relevant upstream documents directly** (the sub-agent reads the files, not the main agent). Document assignments:
  - Cat 1 (Market): BRD + RESEARCH + BUSINESS_RESEARCH/README
  - Cat 2 (Customer): BRD + CUSTOMER_VALIDATION/README + BUSINESS_RESEARCH/README + MARKETING_STRATEGY/README
  - Cat 3 (Competitive): BRD + BUSINESS_RESEARCH/README + PRICING_STRATEGY/README
  - Cat 4 (Technical): BRD + TECHNICAL_OPTIONS/README + IDEA.md (for tech stack details)
  - Cat 5 (Financial): BRD + PRICING_STRATEGY/README + BUDGET_CONTEXT + MARKETING_STRATEGY/README
  - Cat 6 (Operational): BRD + SUPPORTING_SYSTEMS/README + TECHNICAL_OPTIONS/README
  - Cat 7 (Regulatory): BRD + IDEA.md (for geography/constraints) + BUSINESS_RESEARCH/README
  - Cat 8 (Reputational): BRD + MARKETING_STRATEGY/README + TECHNICAL_OPTIONS/README
- Only pass document paths that exist (from Step 2 check). Sub-agents skip documents that don't exist.
- Conducts web research to validate and expand risk identification:
  - Industry-specific risk benchmarks and failure rates
  - Comparable startup/product failures and their root causes
  - Regulatory landscape changes in the target geography
  - Technology maturity and reliability data
- **Writes the complete risk analysis directly to `ideas/<slug>/RISK_ASSESSMENT/NN-category.md`** using the per-category template structure
- Returns ONLY a structured summary to the main agent

**Research & Citation Methodology**: Follow `.claude/skills/research-citations/SKILL.md` for all research. Cite sources inline — especially for failure rates, regulatory requirements, and industry benchmarks.

**IMPORTANT — Risk ID assignment**: To avoid ID conflicts across parallel sub-agents, assign risk IDs using **category-local numbering**:
- Category 1 risks: R-1-01, R-1-02, R-1-03, ...
- Category 2 risks: R-2-01, R-2-02, R-2-03, ...
- Category N risks: R-N-01, R-N-02, ...

The Phase 2 consolidation sub-agent will renumber these sequentially (R-001, R-002, ...) in the master register. Per-category files keep their local IDs — the README maps local→global.

#### Category 1: Market & Timing Risks (`01-market-timing.md`)

Research and document risks related to:
- **Market readiness**: Is the market ready for this solution? Too early? Too late?
- **TAM/SAM accuracy**: How reliable are the market size estimates? Research alternate estimates
- **Market timing**: Economic conditions, industry cycles, seasonal factors
- **Market shifts**: Emerging trends that could make the solution obsolete
- **Geographic risks**: Market differences across target regions (especially relevant for Saudi/MENA ideas)
- **Adoption barriers**: Cultural, behavioral, or switching cost barriers

**Sources to check**: Industry reports, analyst forecasts, Google Trends data, comparable product launch timing.

#### Category 2: Customer & Demand Risks (`02-customer-demand.md`)

Research and document risks related to:
- **Problem validity**: Is the problem real and painful enough? (Check customer validation if available)
- **Willingness to pay**: Will customers actually pay the projected prices?
- **Customer acquisition**: Can the target customers be reached cost-effectively?
- **Retention**: Will customers stay? Churn risk for subscription models
- **Segment accuracy**: Are the target segments correctly identified?
- **Behavioral change**: Does the solution require users to change behavior significantly?

**Sources to check**: Customer validation data (if available), competitor churn rates, industry CAC benchmarks, behavioral adoption studies.

#### Category 3: Competitive & Strategic Risks (`03-competitive-strategic.md`)

Research and document risks related to:
- **Incumbent response**: Will established players copy or block this solution?
- **New entrants**: Who else might be building this right now?
- **Defensibility**: How strong is the moat? (Network effects, data, brand, switching costs)
- **Platform dependency**: Risk of depending on platforms (app stores, APIs, cloud providers)
- **Partnership risks**: Key partnership dependencies and alternatives
- **Commoditization**: Risk of the solution becoming a commodity feature

**Sources to check**: Business research data (if available), recent funding announcements in the space, patent filings, platform policy changes.

#### Category 4: Technical & Feasibility Risks (`04-technical-feasibility.md`)

Research and document risks related to:
- **Technology maturity**: Are the chosen technologies production-ready?
- **Integration complexity**: Third-party API reliability, breaking changes, deprecation risk
- **Scalability**: Can the architecture handle projected growth?
- **Data risks**: Data quality, availability, privacy, and portability
- **AI/ML risks** (if applicable): Model accuracy, bias, hallucination, API cost volatility
- **Build complexity**: Is the estimated development timeline realistic?
- **Technical debt**: Risk of shortcuts in MVP creating long-term problems

**Sources to check**: Technical options data (if available), API changelog histories, technology maturity models, comparable project post-mortems.

#### Category 5: Financial & Unit Economics Risks (`05-financial-economics.md`)

Research and document risks related to:
- **Revenue projection accuracy**: How realistic is the ramp model? Research comparable SaaS ramp rates
- **Unit economics sensitivity**: What happens to LTV:CAC if one variable shifts 20%?
- **Cash flow**: Runway risk — how long until break-even?
- **Pricing pressure**: Risk of needing to lower prices to compete
- **Cost escalation**: Infrastructure costs, API costs, support costs growing faster than revenue
- **Funding dependency**: Is external funding required? How competitive is the fundraising environment?
- **Currency/FX risks**: For cross-border products

**Sources to check**: Pricing strategy data (if available), budget context, industry benchmark SaaS metrics (Bessemer, OpenView), comparable company unit economics.

#### Category 6: Operational & Execution Risks (`06-operational-execution.md`)

Research and document risks related to:
- **Team capacity**: Skills gaps, hiring challenges in the target market
- **Vendor dependencies**: Key vendor risks (single points of failure)
- **Support burden**: Customer support scaling — can the team handle growth?
- **Quality control**: Risk of shipping buggy or unreliable product
- **Process risks**: Lack of established development/deployment processes
- **Supply chain** (if applicable): Hardware, partnerships, logistics dependencies

**Sources to check**: Supporting systems data (if available), local talent market data, vendor reliability reports.

#### Category 7: Regulatory & Compliance Risks (`07-regulatory-compliance.md`)

Research and document risks related to:
- **Current regulations**: What laws/regulations apply today?
- **Upcoming regulations**: Pending legislation that could impact the product
- **Data protection**: GDPR, PDPL (Saudi), CCPA — applicability and compliance cost
- **Industry-specific**: Healthcare (HIPAA), finance (PCI-DSS), transport, food safety, etc.
- **Licensing requirements**: Business licenses, professional certifications needed
- **Content moderation**: User-generated content liability (if applicable)
- **Cross-border**: Regulations in each target market

**Sources to check**: Government gazette, regulatory body websites, legal analysis blogs, compliance cost benchmarks.

#### Category 8: Reputational & Trust Risks (`08-reputational-trust.md`)

Research and document risks related to:
- **Data breach impact**: What happens if user data is exposed?
- **Service outage impact**: What's the blast radius of downtime?
- **Ethical risks**: Potential for misuse, bias, or unintended harm
- **Brand association**: Risk from partnerships, integrations, or user behavior
- **Public perception**: How would negative press affect adoption?
- **Trust threshold**: Is this a domain where trust is table-stakes (healthcare, finance, safety)?

**Sources to check**: Industry breach impact studies, comparable product incidents, trust survey data.

---

**Sub-agent return format** (max 500 tokens each):

```
Summary:
- Category: {name}
- Risks identified: {count}
- Critical risks: {count and names}
- High risks: {count and names}
- Medium risks: {count}
- Low risks: {count}
- Risk list (for consolidation): {R-N-01: short name (L=X, I=Y, Score=Z, Level), R-N-02: ...}
- Top mitigation actions: {1-3 highest-priority actions}
- File: RISK_ASSESSMENT/NN-name.md
```

**After each batch of categories completes**, update their rows in the README.md Research Progress table: set **Status** to `complete`, **Risks Found** to the count, and **Updated** to today's date.

---

### Phase 2 — Risk Consolidation (Sub-Agent)

**IMPORTANT**: This phase is handled entirely by a single consolidation sub-agent. The main agent does NOT read the category files.

Launch a **consolidation sub-agent** with the following instructions:

**Sub-agent reads:**
- All 8 category files: `ideas/<slug>/RISK_ASSESSMENT/01-market-timing.md` through `08-reputational-trust.md`
- The current `ideas/<slug>/RISK_ASSESSMENT/README.md` (to preserve the header and progress table)

**Sub-agent task:**

1. **Deduplicate risks** that appear across multiple categories (e.g., security vulnerabilities may appear in Technical, Regulatory, and Reputational). Merge duplicates into a single entry using the highest score. Note merged IDs.

2. **Renumber all risks sequentially** from R-001 to R-{N}, sorted by score (highest first). Create a local→global ID mapping.

3. **Build the consolidated Risk Register** table:

```markdown
## Risk Register

| ID | Risk | Category | L | I | Score | Level | Mitigation | Status |
|----|------|----------|---|---|-------|-------|------------|--------|
| R-001 | {description} | {cat} | {L} | {I} | {score} | Critical | {summary action} | Open |
```

4. **Build the Risk Heat Map** — place every risk ID in the correct L×I cell of the 5×5 matrix.

5. **Build the Risk Profile Summary** — counts by level, mitigable count, etc.

6. **Include the scoring methodology reference** (Likelihood scale, Impact scale, Risk Levels table) above the Risk Register.

7. **Write all of the above** (scoring methodology, Risk Register, Heat Map, Profile Summary) as new sections appended to `README.md` — after the Research Progress table, before any future sections.

**Sub-agent returns** (max 500 tokens):

```
Consolidation Summary:
- Total risks (after dedup): {N}
- Critical: {N} — {R-001: name, R-002: name, ...}
- High: {N}
- Medium: {N}
- Low: {N}
- Duplicates merged: {count} (list which)
- ID mapping: R-N-XX → R-00Y (for cross-reference)
- File updated: RISK_ASSESSMENT/README.md
```

---

### Phase 3 — Mitigation Planning & Assessment (Sub-Agent)

**IMPORTANT**: This phase is handled entirely by a single assessment sub-agent. The main agent does NOT read the category files or the full README.

Launch a **mitigation & assessment sub-agent** with the following instructions:

**Sub-agent reads:**
- All 8 category files: `ideas/<slug>/RISK_ASSESSMENT/01-market-timing.md` through `08-reputational-trust.md` (for detailed risk context and per-risk mitigation options)
- `ideas/<slug>/RISK_ASSESSMENT/README.md` (to see the consolidated Risk Register from Phase 2)
- `ideas/<slug>/preparation/INITIAL-BRD.md` (or `BRD.md`) — for business context
- `ideas/<slug>/BUDGET_CONTEXT.md` — for cost tier references (if exists)
- `ideas/<slug>/IDEA.md` — for constraints and current state

**Sub-agent task:**

#### Part A — Mitigation Plans

For each **Critical** and **High** risk in the Risk Register, develop a detailed mitigation plan:

- **Risk ID & Description**: What could happen
- **Root Cause**: Why this risk exists (not just the symptom)
- **Mitigation Strategy**: One of:
  - **Avoid**: Eliminate the risk by changing approach (e.g., don't enter that market)
  - **Reduce**: Lower likelihood or impact (e.g., add redundancy, get insurance)
  - **Transfer**: Shift risk to another party (e.g., insurance, outsourcing, SLA guarantees)
  - **Accept**: Acknowledge and monitor (only for risks where mitigation cost > expected loss)
- **Specific Actions**: Numbered, concrete steps (not vague "monitor the situation")
- **Cost of Mitigation**: Estimated cost/effort to implement (reference BUDGET_CONTEXT.md tiers if available)
- **Residual Risk**: What's the remaining risk level after mitigation? Re-score L × I
- **Trigger / Early Warning**: What signal indicates this risk is materializing?
- **Owner**: Who is responsible (role, not person — e.g., "Technical Lead", "Founder")
- **Timeline**: When must mitigation be in place (pre-launch, Month 1, Quarter 1, etc.)

#### Part B — Go / No-Go Assessment

Based on the risk profile and mitigation plans, provide a clear recommendation:

- **Go**: No critical risks remain after mitigation. High risks have feasible mitigation plans. Overall risk profile is manageable.
- **Conditional Go**: Critical risks exist but have mitigation paths. Recommend proceeding with specific conditions (e.g., "proceed only if regulatory approval is obtained by Q2", "proceed with MVP scope, defer Feature X until risk is resolved").
- **No-Go**: Unmitigable critical risks that would likely result in business failure. Clearly explain why and suggest pivot options.
- **Defer**: Timing-dependent risks suggest waiting (e.g., "market not ready, revisit in 6 months").

**The recommendation must be evidence-based** — reference specific risk IDs and research findings. No hand-waving.

If Conditional-Go, include a conditions table:

```markdown
| # | Condition | Must Be Met By | Risk It Addresses |
|---|-----------|---------------|-------------------|
| 1 | {condition} | {timeline} | R-{ID} |
```

#### Part C — Impact on Pipeline Documents

Identify specific findings that should inform upstream or downstream documents:

- **BRD adjustments**: Risks that suggest changing business requirements
- **PRD considerations**: Risks that should be reflected in technical requirements
- **Pricing impact**: Risks that affect unit economics or pricing strategy
- **Marketing impact**: Risks that affect GTM approach or channel strategy
- **Budget impact**: Mitigation costs that should be factored into budget

#### Sub-agent writes:

Append three new sections to `README.md`:
1. `## Mitigation Plans` — with a subsection per Critical/High risk
2. `## Go / No-Go Assessment` — recommendation, conditions, rationale
3. `## Impact on Pipeline Documents` — table of adjustments

Update the README header: set **Status** to `Complete` and **Recommendation** to the actual recommendation.

**Sub-agent returns** (max 500 tokens):

```
Assessment Summary:
- Recommendation: {Go / Conditional-Go / No-Go / Defer}
- Rationale: {1-2 sentences}
- Critical risks mitigated: {N}/{N}
- Residual critical after mitigation: {N}
- Conditions (if conditional): {list}
- Top 3 actions: {list}
- Pipeline impact: {BRD: yes/no, PRD: yes/no, Pricing: yes/no, Marketing: yes/no, Budget: yes/no}
- File updated: RISK_ASSESSMENT/README.md
```

---

### 4. Update Tracker and Status

After Phase 3 sub-agent returns, the main agent uses ONLY the Phase 1 summaries + Phase 2 summary + Phase 3 summary to update the tracker. **Do not read the full category files or full README.**

#### Normal flow (coming from `pricing-research-complete` or `tech-research-complete`)

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `risk-assessment-complete`
- Add a Risk Assessment field: `[RISK_ASSESSMENT/](RISK_ASSESSMENT/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Risk Assessment Complete`. Update `Last Updated` date at top
- **Ideas Pipeline table**: Update the idea's **Status** to `risk-assessment-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `RISK_ASSESSMENT_COMPLETED`, **Details**: `<N> risks identified (<N> Critical, <N> High, <N> Medium, <N> Low); Recommendation: <Go/Conditional-Go/No-Go/Defer>`
- If the activity table exceeds 20 data rows, remove the oldest entry

#### Re-run on completed idea (idea was already past `risk-assessment-complete`)

After completing the assessment, check for **significant impact indicators** (using the Phase 3 summary):

- A new Critical risk was identified that wasn't considered in existing PRD/BRD
- A previously accepted risk has materialized or escalated
- Regulatory landscape changed significantly
- Competitive threat level changed (new well-funded competitor entered)
- Unit economics assumptions were challenged by financial risk analysis

**If significant impact is found:**
- Set status to `risk-assessment-complete` (triggers re-evaluation from `/prd-generator`)
- **Activity Log**: Event `RISK_ASSESSMENT_COMPLETED`, Details include `(re-run — significant findings); Status rolled back — <brief reason>`

**If no significant impact:**
- Do NOT change the status (keep existing status)
- **Activity Log**: Event `RISK_ASSESSMENT_COMPLETED`, Details include `(supplementary — confirms existing risk profile)`

### 5. Present Summary

Using ONLY the sub-agent summaries (Phase 1 + Phase 2 + Phase 3), summarize for the user:

> **Risk Assessment Complete for "<Idea Name>"**
>
> **Risk Profile:**
> - Total risks identified: <N>
> - Critical: <N> — <list names>
> - High: <N> — <list names>
> - Medium: <N>
> - Low: <N>
>
> **Risk Categories:**
> - Market & Timing: <N> risks (<N> Critical, <N> High)
> - Customer & Demand: <N> risks
> - Competitive & Strategic: <N> risks
> - Technical & Feasibility: <N> risks
> - Financial & Unit Economics: <N> risks
> - Operational & Execution: <N> risks
> - Regulatory & Compliance: <N> risks
> - Reputational & Trust: <N> risks
>
> **Mitigation Coverage:**
> - Critical risks with mitigation plans: <N>/<N>
> - Residual critical risks after mitigation: <N>
>
> **Recommendation: <Go / Conditional-Go / No-Go / Defer>**
> <1-2 sentence rationale>
>
> **Top Actions:**
> 1. <highest-priority mitigation action>
> 2. <second priority>
> 3. <third priority>
>
> **Impact on Pipeline:**
> - <any adjustments recommended for BRD/PRD/pricing/marketing>
>
> **Files created:**
> - `ideas/<slug>/RISK_ASSESSMENT/` (8 category files + README)

If recommendation is Go or Conditional-Go:
> Run `/prd-generator` to generate the PRD and Final BRD. Risk findings will be incorporated into the PRD's risk sections.

If recommendation is No-Go:
> Consider revising the BRD (run `/brd-generator` with adjusted scope) or archiving this idea.

If recommendation is Defer:
> Consider setting this idea to `on-hold` and revisiting when the timing conditions are met.

### Compatibility Note

This skill is **optional** in the pipeline. The `/prd-generator` accepts ideas without risk assessment. The pipeline flow is:

**With risk assessment**: ... → `/pricing-strategy` → `/constraint-validation` → `/risk-assessment` → `/prd-generator`
**Without risk assessment**: ... → `/pricing-strategy` → `/constraint-validation` → `/prd-generator`

When risk assessment exists, `/prd-generator` should read `RISK_ASSESSMENT/README.md` to incorporate risk findings into the PRD's risk registry and mitigation sections, but does not require it.

## Modifiers

### help
Usage: `/risk-assessment help`

**risk-assessment** — No description

Available modifiers:
- `help` — Show this help message
