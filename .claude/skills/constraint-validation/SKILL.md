# /constraint-validation

Validate that the combination of all selected technical options, supporting systems, and cost decisions together satisfy all hard BRD requirements — catching violations that per-option analysis misses. Produces a constraint register with pass/fail verdicts and a remediation roadmap for any violations.

**This skill is mandatory** for ideas that have completed technical research. Individual options may look viable in isolation, but combined effects (cumulative latency, total cost, tech stack conflicts, aggregate dev effort) can breach hard requirements. This skill is the final feasibility gate before PRD generation.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. This skill is optimized to keep the main agent's context low by delegating all heavy validation work to sub-agents. The main agent orchestrates; sub-agents do the heavy reading and validation.

**Architecture overview** (3 phases, 5 sub-agents total):
- **Phase 1**: Main agent reads BRD business requirements + IDEA.md → extracts hard constraints → creates folder + README scaffold
- **Phase 2**: 4 parallel validation sub-agents (one per category) each read relevant upstream files, validate combined selections against constraints, and write per-category files (~500 token summaries returned)
- **Phase 3**: 1 consolidation sub-agent reads all 4 category files → writes Constraint Register, Feasibility Matrix, Remediation Roadmap, and Verdict to README
- **Main agent**: Orchestrates phases, updates tracker, presents summary. Never reads full category files or upstream capability files directly.

When the user invokes `/constraint-validation`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`pricing-research-complete`** status (preferred — all cost data available) → Start fresh from Step 2
- **`risk-assessment-complete`** status (also preferred — includes risk data) → Start fresh from Step 2
- **`tech-research-complete`** status (minimum — required for combined option validation) → Start fresh from Step 2
- **`constraint-validation`** status → Resume from where validation left off (read `CONSTRAINT_VALIDATION/README.md` to find incomplete categories)
- **Any later status** (`constraint-validation-complete`, `prd-draft`, `prd-complete`) → Re-run (supplementary enrichment). Check if `CONSTRAINT_VALIDATION/` folder already exists:
  - **If folder exists with completed work**: Ask the user whether to (a) update specific categories, or (b) redo all analysis from scratch.
  - **If no folder exists**: Start fresh from Step 2.
  - **Status handling**: Do NOT change the idea's status during validation. After completion, assess whether findings warrant a status rollback (see Step 5).

If the user specifies a slug, use that idea directly (verify it has completed technical research — `TECHNICAL_OPTIONS/` folder must exist).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/tech-research` first.

### 2. Extract Hard Constraints from BRD

The main agent reads:

- `ideas/<slug>/IDEA.md` — status, metadata, constraints, team size, timeline
- `ideas/<slug>/preparation/INITIAL-BRD.md` (or `ideas/<slug>/BRD.md`) — read Section 7 (Business Requirements) focusing on **Must Have** requirements with quantitative thresholds. Also read the executive summary and any performance/timeline sections.

**Extract a structured constraint list**. For each Must Have requirement that has a quantitative or qualitative threshold:

```
Constraint ID: C-{NN}
Source: BR-{ID}
Description: {what must be true}
Threshold: {the quantitative limit — e.g., "< 200ms response time", "≥ 80% accuracy", "< $500/mo at launch"}
Type: Performance / Cost / Compliance / Timeline / Resource
Scope: Single-capability / Cross-capability / System-wide
```

Also extract **implicit constraints** that aren't stated as BRD requirements but are fundamental:
- **Budget constraint**: From `BUDGET_CONTEXT.md` (if exists) — the budget envelope and cost sanity thresholds
- **Timeline constraint**: From BRD timeline — total available development time
- **Team constraint**: From IDEA.md — available team members and skill sets
- **Regulatory constraints**: From BRD compliance requirements — standards that ALL options must satisfy (PCI-DSS, PDPL, HIPAA, etc.)

**Check which upstream documents exist** (file existence only — do NOT read their contents yet):

- `ideas/<slug>/TECHNICAL_OPTIONS/README.md` (required)
- `ideas/<slug>/SUPPORTING_SYSTEMS/README.md`
- `ideas/<slug>/MARKETING_STRATEGY/README.md`
- `ideas/<slug>/PRICING_STRATEGY/README.md`
- `ideas/<slug>/BUDGET_CONTEXT.md`
- `ideas/<slug>/RISK_ASSESSMENT/README.md`
- `ideas/<slug>/BUSINESS_RESEARCH/README.md`
- `ideas/<slug>/DOMAIN_RESEARCH/README.md`

Record which documents exist — this determines which documents to pass to each validation sub-agent.

Update the idea's status to `constraint-validation` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Tracker updates when starting:**
- **Pipeline Summary**: Decrement the previous status count, increment `Constraint Validation`
- **Ideas Pipeline table**: Update the idea's **Status** to `constraint-validation`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `CONSTRAINT_VALIDATION_STARTED`, **Details**: `Combined feasibility validation initiated; {N} hard constraints extracted from BRD`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

### 3. Create Output Folder & README Scaffold

Read the template from `.claude/skills/constraint-validation/references/constraint-validation-template.md`.

Create `ideas/<slug>/CONSTRAINT_VALIDATION/` folder.

Create `ideas/<slug>/CONSTRAINT_VALIDATION/README.md` with a **minimal scaffold** — just the header, extracted constraints table, assessment scope table, and the validation progress table (all 4 pending). Phase 3 consolidation sub-agent will write the remaining sections.

```markdown
# Constraint Validation — {Idea Name}

**Idea**: {slug}
**Date**: {YYYY-MM-DD}
**Status**: In Progress
**Verdict**: Pending

## Extracted Constraints

| ID | Source | Description | Threshold | Type | Scope |
|----|--------|-------------|-----------|------|-------|
| C-01 | BR-{X} | {description} | {threshold} | {type} | {scope} |
| C-02 | Budget | {description} | {threshold} | Cost | System-wide |
| ... | | | | | |

## Assessment Scope

| Document | Available | Key Input |
|----------|-----------|-----------|
| Technical Options | Yes | {N} capability recommendations |
| Supporting Systems | Yes/No | {N} system recommendations |
| Pricing Strategy | Yes/No | Unit economics, cost-to-serve |
| Marketing Strategy | Yes/No | Marketing costs, CAC |
| Budget Context | Yes/No | Budget envelope, sanity thresholds |
| Risk Assessment | Yes/No | Identified risks |

## Validation Progress

| # | Category | File | Constraints Checked | Violations | Status | Updated |
|---|----------|------|--------------------|------------|--------|---------|
| 1 | Cumulative Performance | [01-cumulative-performance.md](01-cumulative-performance.md) | — | — | pending | — |
| 2 | Cost Feasibility | [02-cost-feasibility.md](02-cost-feasibility.md) | — | — | pending | — |
| 3 | Technical Compatibility | [03-technical-compatibility.md](03-technical-compatibility.md) | — | — | pending | — |
| 4 | Capacity & Timeline | [04-capacity-timeline.md](04-capacity-timeline.md) | — | — | pending | — |
```

Do NOT write any sections below Validation Progress yet — Phase 3 consolidation sub-agent handles that.

### Phase 2 — Category Validation (4 Parallel Sub-Agents)

Launch all 4 sub-agents in parallel. Each sub-agent:
- Receives the **extracted constraints list** from Step 2 (passed in the sub-agent prompt)
- **Reads the relevant upstream documents directly** (the sub-agent reads the files, not the main agent)
- Validates combined selections against the constraints in its category
- **Writes the complete validation analysis directly to `ideas/<slug>/CONSTRAINT_VALIDATION/NN-category.md`** using the per-category template structure
- Returns ONLY a structured summary to the main agent

**Research & Citation Methodology**: Follow `.claude/skills/research-citations/SKILL.md` for all research. Cite sources inline when referencing benchmarks, performance expectations, or industry standards.

---

#### Category 1: Cumulative Performance (`01-cumulative-performance.md`)

**Sub-agent reads:**
- All individual `ideas/<slug>/TECHNICAL_OPTIONS/NN-*.md` files (for recommended option metrics — latency, accuracy, throughput, resource consumption per capability)
- `ideas/<slug>/SUPPORTING_SYSTEMS/README.md` (if exists — for system-level performance impacts)
- `ideas/<slug>/preparation/INITIAL-BRD.md` (or `BRD.md`) — for performance requirements

**Sub-agent validates:**

1. **Request-path latency chain**: Map out the typical user request flow (e.g., user action → frontend → API → service A → service B → database → response). For each hop, extract the expected latency from the recommended option's analysis. Sum the chain. Compare against BRD response time requirements.

2. **Accuracy/quality chains**: For ML/AI pipelines or multi-step processing, calculate the combined accuracy. If Step A has 85% accuracy and Step B has 90% accuracy, the combined accuracy is 85% × 90% = 76.5%. Compare against BRD accuracy requirements.

3. **Resource consumption stacking**: For mobile/edge apps, sum battery drain, storage, bandwidth, and memory across all recommended options. Compare against device constraints or BRD resource requirements.

4. **Throughput bottlenecks**: Identify the lowest-throughput option in any processing chain — that's the system bottleneck. Compare against BRD throughput requirements.

5. **Concurrent load impact**: Research how each recommended option performs under the BRD's projected concurrent user load. Identify options that degrade significantly under load.

**For each constraint checked**, produce:
- **Constraint ID** (from extracted list)
- **What was measured**: The specific metric and how it was calculated
- **Individual contributions**: Table showing each option's contribution to the cumulative metric
- **Combined actual**: The calculated combined value
- **Threshold**: The BRD requirement
- **Headroom**: How much margin exists (positive = safe, negative = violation)
- **Verdict**: PASS / WARNING (< 20% headroom) / FAIL (exceeds threshold)
- **If FAIL or WARNING**: Identify which option(s) contribute most and suggest alternatives that would bring the combined metric within threshold

**Web research**: When option-specific performance data is insufficient, research:
- Industry benchmarks for similar architectures (e.g., "typical API gateway latency", "Firebase read latency p99")
- Stack-specific performance profiles (e.g., "Node.js + PostgreSQL typical response times")
- Mobile resource consumption benchmarks (e.g., "typical camera-based ML battery drain per hour")

---

#### Category 2: Cost Feasibility (`02-cost-feasibility.md`)

**Sub-agent reads:**
- `ideas/<slug>/TECHNICAL_OPTIONS/README.md` (for per-capability cost summaries and recommended options)
- All individual `ideas/<slug>/TECHNICAL_OPTIONS/NN-*.md` files (for detailed Year 1 TCO per recommended option)
- `ideas/<slug>/SUPPORTING_SYSTEMS/README.md` (if exists — for system costs)
- All individual `ideas/<slug>/SUPPORTING_SYSTEMS/NN-*.md` files (if exist — for detailed costs)
- `ideas/<slug>/PRICING_STRATEGY/05-unit-economics.md` (if exists — for cost-to-serve, margins)
- `ideas/<slug>/MARKETING_STRATEGY/README.md` (if exists — for marketing costs)
- `ideas/<slug>/BUDGET_CONTEXT.md` (if exists — for budget envelope and sanity thresholds)
- `ideas/<slug>/preparation/INITIAL-BRD.md` (or `BRD.md`) — for revenue projections

**Sub-agent validates:**

1. **Total Year 1 cost aggregation**: Sum Year 1 TCO across ALL recommended technical options + ALL recommended supporting systems + marketing budget + operational costs. Show the breakdown:

   ```
   | Domain | Item | Monthly | Year 1 TCO |
   |--------|------|---------|------------|
   | Tech: Capability A | Option X | $Y | $Z |
   | Tech: Capability B | Option W | $Y | $Z |
   | Supporting: System 1 | Option V | $Y | $Z |
   | Marketing | Phase 1-5 | $Y | $Z |
   | TOTAL | | $Y | $Z |
   ```

2. **Budget envelope validation**: Compare total cost against each budget tier (Bootstrap / Growth / Scale) from BUDGET_CONTEXT.md. Flag if:
   - Bootstrap total exceeds Bootstrap envelope → **FAIL** (founder can't afford to start)
   - Growth total exceeds Growth envelope → **WARNING** (may need to defer some options)
   - Scale total exceeds Scale envelope → **WARNING** (review cost structure)

3. **Cost-to-revenue ratio**: Calculate `Total Year 1 cost / Year 1 cumulative revenue`. Apply sanity thresholds from BUDGET_CONTEXT.md:
   - > 30% (bootstrapped) → Flag
   - > 50% (any stage) → Flag
   - > 80% (any stage) → Block

4. **Month 1 cash requirement**: What does the founder need to spend in Month 1 to get started? Sum all setup costs + first month of subscriptions. Compare against Bootstrap tier monthly budget.

5. **Cost scaling trajectory**: At projected Month 12 user count, what's the monthly cost? Does it remain within the budget tier the revenue supports?

6. **Hidden cost detection**: Check for costs that are mentioned in capability files but NOT included in pricing strategy's cost-to-serve (e.g., a supporting system that adds $2/user/month but wasn't factored into unit economics).

**For each constraint checked**, produce the same structure as Category 1 (constraint ID, measured value, threshold, headroom, verdict, remediation if FAIL/WARNING).

---

#### Category 3: Technical Compatibility (`03-technical-compatibility.md`)

**Sub-agent reads:**
- All individual `ideas/<slug>/TECHNICAL_OPTIONS/NN-*.md` files (for recommended technology choices, SDKs, runtime requirements)
- All individual `ideas/<slug>/SUPPORTING_SYSTEMS/NN-*.md` files (if exist — for system technology choices)
- `ideas/<slug>/preparation/INITIAL-BRD.md` (or `BRD.md`) — for compliance requirements

**Sub-agent validates:**

1. **Runtime/language conflicts**: Extract the runtime or language required by each recommended option. Flag conflicts:
   - Backend: Multiple incompatible runtimes (e.g., one option requires Node.js, another requires Python in the same service)
   - Frontend: Framework conflicts (e.g., React + Angular in same codebase)
   - Mobile: Native vs. cross-platform conflicts

   Note: Microservice architectures can use different runtimes per service — only flag conflicts within the same deployment unit.

2. **Database compatibility**: Check that all options that need data storage are compatible with the recommended database(s). Flag if:
   - One option assumes PostgreSQL, another assumes MongoDB, with no clear data layer strategy
   - Schema requirements conflict (e.g., one option needs strict relational, another needs flexible document store)

3. **Authentication/authorization consistency**: All options that need auth must use the same auth system. Flag if different options assume different auth mechanisms (JWT vs. session-based, different OAuth providers).

4. **API protocol consistency**: Check for protocol mismatches between services (REST vs. GraphQL vs. gRPC). Flag if integration between options requires protocol translation layers not accounted for in dev effort.

5. **Compliance requirement spanning**: If the BRD requires PCI-DSS, HIPAA, PDPL, or similar — verify that ALL options in the data path are compliant. A single non-compliant option in the chain breaks compliance for the entire system.

6. **Version/dependency conflicts**: Check for known incompatibilities between specific versions of recommended libraries, SDKs, or platforms (e.g., "SDK A requires React 17, SDK B requires React 18+").

7. **Data flow consistency**: Trace the data flow across capabilities. Verify that output format of Option A matches expected input format of Option B when they're in the same pipeline. Flag serialization/deserialization overhead if format conversion is needed.

8. **Deployment environment conflicts**: Check that all options can run in the same deployment environment (e.g., one option requires GPU instances, another assumes serverless — different infrastructure needs).

**For each conflict found**, produce:
- **Conflict ID**: CV-{NN}
- **Options involved**: Which specific options from which capabilities conflict
- **Nature of conflict**: What exactly is incompatible
- **Severity**: CRITICAL (blocks implementation) / HIGH (requires significant workaround) / MEDIUM (adds complexity) / LOW (minor inconvenience)
- **Resolution options**: Concrete alternatives that would resolve the conflict, with trade-offs
- **Impact if ignored**: What happens if this isn't addressed

---

#### Category 4: Capacity & Timeline (`04-capacity-timeline.md`)

**Sub-agent reads:**
- `ideas/<slug>/TECHNICAL_OPTIONS/README.md` (for development time estimates per capability)
- All individual `ideas/<slug>/TECHNICAL_OPTIONS/NN-*.md` files (for detailed implementation effort of recommended options)
- All individual `ideas/<slug>/SUPPORTING_SYSTEMS/NN-*.md` files (if exist — for setup and maintenance effort)
- `ideas/<slug>/IDEA.md` — for team size, skills, timeline constraints
- `ideas/<slug>/preparation/INITIAL-BRD.md` (or `BRD.md`) — for timeline and milestones

**Sub-agent validates:**

1. **Total development effort aggregation**: Sum development time across ALL recommended options + ALL supporting systems setup. Show breakdown:

   ```
   | Domain | Item | Effort (person-weeks) | Skills Required |
   |--------|------|-----------------------|-----------------|
   | Tech: Capability A | Option X | {N} | {skills} |
   | Supporting: System 1 | Option V | {N} | {skills} |
   | Integration & Testing | (estimated) | {N} | {skills} |
   | TOTAL | | {N} | |
   ```

   **IMPORTANT**: Add an integration overhead estimate. Individual capability estimates typically don't account for the effort of making all options work together. Research industry benchmarks for integration overhead (typically 20-40% of component development time).

2. **Team capacity calculation**: From IDEA.md and BRD:
   - Available developers × available hours/week × timeline weeks = total available person-weeks
   - Compare against total required effort
   - **Capacity ratio** = Available / Required. If < 1.0 → FAIL (can't build everything in time)

3. **Critical path analysis**: Identify dependencies between capabilities (e.g., "payment processing depends on user auth; booking depends on calendar integration"). Map the longest sequential chain. Calculate minimum time to completion regardless of team size.

4. **Skill gap detection**: Cross-reference required skills per option against the team's stated capabilities (from IDEA.md). Flag capabilities where:
   - No team member has the required skill
   - A single person is the only one with a critical skill (bus factor = 1)
   - The skill is rare/specialized (e.g., ML engineering, security, specific cloud platform)

5. **Parallel work limits**: Even with a larger team, some work can't be parallelized (shared database schema, API contracts, deployment pipeline). Estimate realistic parallelization factor.

6. **Maintenance burden projection**: After launch, what's the ongoing maintenance effort? Sum maintenance hours from supporting systems + infrastructure + customer support estimates. Compare against available team capacity post-launch.

**For each constraint checked**, produce the same structure as Category 1 (constraint ID, measured value, threshold, headroom, verdict, remediation if FAIL/WARNING).

---

**Sub-agent return format** (max 500 tokens each):

```
Summary:
- Category: {name}
- Constraints checked: {count}
- Violations: {count} — {C-XX: short description (FAIL), C-YY: short description (WARNING)}
- Passes: {count}
- Critical findings: {1-3 most important findings}
- Remediation actions needed: {count}
- File: CONSTRAINT_VALIDATION/NN-name.md
```

**After all 4 sub-agents complete**, update their rows in the README.md Validation Progress table: set **Status** to `complete`, **Constraints Checked** and **Violations** to the counts, and **Updated** to today's date.

---

### Phase 3 — Consolidation & Verdict (Sub-Agent)

**IMPORTANT**: This phase is handled entirely by a single consolidation sub-agent. The main agent does NOT read the category files.

Launch a **consolidation sub-agent** with the following instructions:

**Sub-agent reads:**
- All 4 category files: `ideas/<slug>/CONSTRAINT_VALIDATION/01-cumulative-performance.md` through `04-capacity-timeline.md`
- The current `ideas/<slug>/CONSTRAINT_VALIDATION/README.md` (to preserve the header, constraints table, scope, and progress table)
- `ideas/<slug>/preparation/INITIAL-BRD.md` (or `BRD.md`) — for business context and requirements
- `ideas/<slug>/BUDGET_CONTEXT.md` (if exists) — for budget tier context

**Sub-agent task:**

#### Part A — Constraint Register

Build the master **Constraint Register** table consolidating all constraints checked across all 4 categories:

```markdown
## Constraint Register

| ID | Constraint | Source | Threshold | Combined Actual | Headroom | Verdict | Category |
|----|-----------|--------|-----------|----------------|----------|---------|----------|
| C-01 | Response time | BR-3 | < 200ms | 340ms | -140ms | FAIL | Performance |
| C-02 | Year 1 budget | Budget | < $6,000 | $4,200 | +$1,800 | PASS | Cost |
| C-03 | PCI compliance | BR-8 | All components | 4/5 compliant | 1 gap | FAIL | Compatibility |
```

Include ALL constraints — those that pass AND those that fail. This gives a complete picture.

#### Part B — Compatibility Issues Register

Build a separate table for technical compatibility issues (from Category 3) that aren't tied to a specific BRD constraint but represent implementation risks:

```markdown
## Compatibility Issues

| ID | Issue | Options Involved | Severity | Resolution | Effort |
|----|-------|-----------------|----------|------------|--------|
| CV-01 | Runtime conflict | Cap-3 (Node.js) + Cap-7 (Python) | HIGH | Separate microservices | +2 weeks |
```

#### Part C — Feasibility Matrix

Create a visual matrix showing how each major selected option affects each hard constraint:

```markdown
## Feasibility Matrix

| Constraint | Option A | Option B | Option C | ... | Combined |
|-----------|----------|----------|----------|-----|----------|
| C-01: Response time | 50ms | 30ms | 120ms | ... | 340ms ❌ |
| C-02: Budget | $100/mo | $50/mo | $200/mo | ... | $350/mo ✅ |
```

This matrix is the core deliverable — it shows exactly where combined effects cause violations that individual options don't.

#### Part D — Remediation Roadmap

For every FAIL and WARNING verdict, provide a remediation plan:

```markdown
## Remediation Roadmap

### C-01: Response Time — FAIL (340ms vs. < 200ms threshold)

**Root cause**: Capability C adds 120ms due to synchronous external API call
**Top contributors**: Cap-C (120ms, 35%), Cap-A (80ms, 24%), Cap-D (60ms, 18%)

**Remediation options**:
1. **Switch Cap-C to async processing**: Use webhook callback instead of sync call → reduces Cap-C to ~20ms → Combined: ~240ms (still WARNING)
2. **Switch Cap-C to Option Y** (runner-up from tech research): 40ms latency → Combined: ~260ms (WARNING)
3. **Combine options 1+2 + add caching for Cap-A**: Cap-A drops to 30ms → Combined: ~170ms (PASS with 30ms headroom)
4. **Relax BRD threshold**: If 300ms is acceptable, options 1 or 2 alone suffice. Requires business stakeholder approval.

**Recommended**: Option 3 — achieves PASS with reasonable headroom. Estimated additional effort: 1.5 weeks.
```

#### Part E — Overall Verdict

Provide a clear verdict:

- **PASS**: All constraints satisfied. No violations found. Combined selections are feasible as specified.
- **CONDITIONAL PASS**: Some constraints have warnings (< 20% headroom) or FAIL verdicts with clear, low-effort remediations. Proceed to PRD with noted adjustments.
  - Include a conditions table listing what must be adjusted
- **FAIL**: Critical constraint violations that cannot be easily remediated. Must resolve before proceeding to PRD.
  - Include a blocking issues table listing what must change
  - Suggest which upstream skills should be re-run (e.g., "re-run /tech-research for Capability C with latency as a High-weight KPI")

```markdown
## Verdict: {PASS / CONDITIONAL PASS / FAIL}

**Rationale**: {2-3 sentences summarizing the evidence}

### {Conditions / Blocking Issues} (if not PASS)

| # | Issue | Constraint | Required Action | Affects |
|---|-------|-----------|----------------|---------|
| 1 | {issue} | C-{XX} | {what to do} | {which skill/document to update} |
```

#### Part F — Impact on Downstream Documents

```markdown
## Impact on Pipeline Documents

| Document | Adjustment Needed | Details |
|----------|------------------|---------|
| Tech Options | Yes/No | {which capabilities need option changes} |
| Supporting Systems | Yes/No | {which systems need re-evaluation} |
| Pricing Strategy | Yes/No | {cost changes that affect unit economics} |
| PRD | Yes/No | {constraints to incorporate, architecture adjustments} |
| BRD | Yes/No | {threshold adjustments if warranted} |
```

**Sub-agent writes all of the above** (Constraint Register, Compatibility Issues, Feasibility Matrix, Remediation Roadmap, Verdict, Impact) as new sections appended to `README.md` — after the Validation Progress table.

Update the README header: set **Status** to `Complete` and **Verdict** to the actual verdict.

**Sub-agent returns** (max 500 tokens):

```
Consolidation Summary:
- Verdict: {PASS / CONDITIONAL PASS / FAIL}
- Rationale: {1-2 sentences}
- Constraints checked: {total}
- PASS: {N}
- WARNING: {N}
- FAIL: {N}
- Compatibility issues: {N} (Critical: {N}, High: {N}, Medium: {N})
- Top blocking issues: {list if FAIL}
- Conditions: {list if CONDITIONAL PASS}
- Remediation actions: {N total}
- Pipeline impact: {Tech: yes/no, Supporting: yes/no, Pricing: yes/no, PRD: yes/no, BRD: yes/no}
- File updated: CONSTRAINT_VALIDATION/README.md
```

---

### 4. Update IDEA.md Constraint Validation Reference

After Phase 3, update `ideas/<slug>/IDEA.md`:
- Add a Constraint Validation field: `[CONSTRAINT_VALIDATION/](CONSTRAINT_VALIDATION/README.md)`

---

### 5. Update Tracker and Status

After Phase 3 sub-agent returns, the main agent uses ONLY the Phase 2 summaries + Phase 3 summary to update the tracker. **Do not read the full category files or full README.**

#### Normal flow (coming from `pricing-research-complete`, `risk-assessment-complete`, or `tech-research-complete`)

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `constraint-validation-complete`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Constraint Validation Complete`. Update `Last Updated` date at top
- **Ideas Pipeline table**: Update the idea's **Status** to `constraint-validation-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `CONSTRAINT_VALIDATION_COMPLETED`, **Details**: `{N} constraints checked; {N} PASS, {N} WARNING, {N} FAIL; {N} compatibility issues; Verdict: {PASS/CONDITIONAL PASS/FAIL}`
- If the activity table exceeds 20 data rows, remove the oldest entry

#### Re-run on completed idea (idea was already past `constraint-validation-complete`)

After completing the validation, check for **significant impact indicators** (using the Phase 3 summary):

- A new FAIL verdict on a constraint that was previously PASS
- Total cost changed by > 20% from previous validation
- New critical compatibility issue discovered
- Capacity ratio dropped below 1.0 (infeasible timeline)
- A constraint that was WARNING escalated to FAIL

**If significant impact is found:**
- Set status to `constraint-validation-complete` (triggers re-evaluation from `/prd-generator`)
- **Activity Log**: Event `CONSTRAINT_VALIDATION_COMPLETED`, Details include `(re-run — significant findings); Status rolled back — <brief reason>`

**If no significant impact:**
- Do NOT change the status (keep existing status)
- **Activity Log**: Event `CONSTRAINT_VALIDATION_COMPLETED`, Details include `(supplementary — confirms existing feasibility profile)`

### 6. Present Summary

Using ONLY the sub-agent summaries (Phase 2 + Phase 3), summarize for the user:

> **Constraint Validation Complete for "{Idea Name}"**
>
> **Constraints Checked: {N}**
> - PASS: {N}
> - WARNING: {N} — {list constraint names}
> - FAIL: {N} — {list constraint names}
>
> **Compatibility Issues: {N}**
> - Critical: {N} — {list}
> - High: {N} — {list}
>
> **Category Breakdown:**
> - Cumulative Performance: {N} checked, {N} violations
> - Cost Feasibility: {N} checked, {N} violations
> - Technical Compatibility: {N} issues found
> - Capacity & Timeline: {N} checked, {N} violations
>
> **Verdict: {PASS / CONDITIONAL PASS / FAIL}**
> {1-2 sentence rationale}
>
> **{Top Actions / Conditions / Blocking Issues}:**
> 1. {highest-priority item}
> 2. {second priority}
> 3. {third priority}
>
> **Pipeline Impact:**
> - {any adjustments recommended for upstream/downstream documents}
>
> **Files created:**
> - `ideas/<slug>/CONSTRAINT_VALIDATION/` (4 category files + README)

If verdict is PASS:
> Run `/prd-generator` to generate the PRD and Final BRD (or `/risk-assessment` first if risk analysis is desired).

If verdict is CONDITIONAL PASS:
> Address the conditions listed above, then run `/prd-generator`. Alternatively, re-run the affected upstream skills with adjusted parameters.

If verdict is FAIL:
> Resolve the blocking issues before proceeding. The remediation roadmap in `CONSTRAINT_VALIDATION/README.md` provides specific alternatives for each violation. Consider re-running `/tech-research` for affected capabilities.

### Compatibility Note

This skill fits between `/pricing-strategy` (or `/risk-assessment`) and `/prd-generator`. The pipeline flow becomes:

**Full pipeline**: ... → `/pricing-strategy` → `/constraint-validation` → [`/risk-assessment`] → `/prd-generator`
**Minimum**: ... → `/tech-research` → `/constraint-validation` → `/prd-generator`

The `/prd-generator` accepts `constraint-validation-complete`, `risk-assessment-complete`, `pricing-research-complete`, or `tech-research-complete` status. When constraint validation exists, `/prd-generator` should read `CONSTRAINT_VALIDATION/README.md` to incorporate the feasibility findings and any architecture adjustments into the PRD.

## Modifiers

### help
Usage: `/constraint-validation help`

**constraint-validation** — No description

Available modifiers:
- `help` — Show this help message
