# /business-research

Conduct per-feature competitive analysis, impact severity assessment, and feature prioritization for an idea with a completed BRD.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Structure research into per-feature tasks. Sub-agents write full research to per-feature files in `BUSINESS_RESEARCH/` and return only structured summaries (~500 tokens each) to the main agent. The main agent never holds all research data in context at once.

When the user invokes `/business-research`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`brd-complete`** status → Start fresh from Phase 1
- **`customer-validation-complete`** status → Start fresh from Phase 1 (will also read customer validation findings)
- **`domain-research-complete`** status → Start fresh from Phase 1 (will also read domain research findings)
- **`business-research`** status → Resume from where research left off (read `BUSINESS_RESEARCH/README.md` to find incomplete features)
- **Any later status** (`business-research-complete`, `tech-research`, `tech-research-complete`, `prd-draft`, `prd-complete`) → Re-run (supplementary enrichment). Check if `BUSINESS_RESEARCH/` folder already exists:
  - **If folder exists with completed research**: Ask the user whether to (a) skip already-researched features and only research new/changed ones, or (b) redo all research from scratch. For option (a), read the existing README.md and mark features with existing complete files as `complete` in the new progress table — only research features that don't have a file yet or that the user explicitly wants re-done.
  - **If no folder exists**: Start fresh from Phase 1.
  - **Status handling**: Do NOT change the idea's status during research. After completion, the skill will assess whether findings are significant enough to warrant a status rollback (see Step 4).

If the user specifies a slug, use that idea directly (verify it has a BRD).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/brd-generator` first.

### 2. Read Context Documents

Read the following files for the selected idea:

- `ideas/<slug>/preparation/INITIAL-BRD.md` — the primary source (fall back to `ideas/<slug>/BRD.md` for pre-restructuring ideas)
- `ideas/<slug>/IDEA.md` — original idea context
- `ideas/<slug>/RESEARCH.md` — raw research data (if available)
- `ideas/<slug>/CUSTOMER_VALIDATION/README.md` — customer validation findings (if available — provides assumption evidence, competitor user research, and preliminary validation scores)
- `ideas/<slug>/DOMAIN_RESEARCH/README.md` — domain methodology research findings (if available — provides recommended approaches, taxonomy of alternatives, and evidence-based methodology decisions that affect which features matter most)

Update the idea's status to `business-research` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Domain research integration** (if available): The DOMAIN_RESEARCH/README.md provides critical inputs:
- Recommended domain approaches → inform which features are essential (e.g., if momentum strategies are recommended, real-time scanners become Hero-tier)
- Taxonomy of alternatives → competitive analysis should account for approaches used by competitors
- Evidence-based methodology decisions → affect impact severity assessment (a feature critical for the recommended approach scores higher)
- Approach trade-offs → inform feature prioritization (features that support multiple viable approaches are more robust)

**Tracker updates when starting:**
- **Pipeline Summary**: Decrement `BRD Complete` (or `Customer Validation Complete` or `Domain Research Complete`), increment `Business Research`
- **Ideas Pipeline table**: Update the idea's **Status** to `business-research`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `BUSINESS_RESEARCH_STARTED`, **Details**: `Per-feature competitive analysis and impact assessment initiated`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

### 3. Create Output Folder

Read the template from `.claude/skills/business-research/references/business-analysis-template.md`.

**Always create a `ideas/<slug>/BUSINESS_RESEARCH/` folder** with per-feature files.

#### Research Progress Tracking (Resumability)

- **Fresh start** (status was `brd-complete`): Create `ideas/<slug>/BUSINESS_RESEARCH/README.md` with the header metadata and a **Research Progress** table listing every identified feature/BR with status `pending`:

```markdown
## Research Progress

| # | Feature | BR ID | File | Status | Updated |
|---|---------|-------|------|--------|---------|
| 1 | <Name> | BR-1 | [01-name.md](01-name.md) | pending | — |
| 2 | <Name> | BR-2 | [02-name.md](02-name.md) | pending | — |
```

- **Resuming** (status was `business-research`): Read `ideas/<slug>/BUSINESS_RESEARCH/README.md`. Find the **Research Progress** table. Identify features with status `pending` — these need research. **Skip features already marked `complete`.**

### Phase 1 — Per-Feature Competitive Analysis

For EACH feature/business requirement (BR-*) in the BRD:

**Sub-agent pattern**: Launch sub-agents to research features in parallel. Each sub-agent:
- Receives the specific BR description and context from the BRD
- Conducts web research on competitors for that specific feature:
  - How many competitors address this specific need?
  - What do they do? How well do they solve it?
  - What gap remains that this idea would fill?
  - Is the approach novel, incremental, or entering a saturated space?
- **Writes the complete competitive analysis directly to `ideas/<slug>/BUSINESS_RESEARCH/NN-feature-name.md`** using the per-feature template structure
- Rates the feature: `novel` (no direct competitor) / `incremental` (improves on existing) / `saturated` (many strong competitors)
- Returns ONLY a structured summary to the main agent:

```
Summary (max 500 tokens):
- Feature: <BR-ID: name>
- Competitors found: <count>
- Key competitors: <top 3 names>
- Gap analysis: <1-2 sentences>
- Novelty rating: novel / incremental / saturated
- File: BUSINESS_RESEARCH/NN-name.md
```

**After each feature is complete**, update its row in the README.md Research Progress table: set **Status** to `complete` and **Updated** to today's date.

**Research & Citation Methodology**: Follow `.claude/skills/research-citations/SKILL.md` for all research. Cite sources inline for competitor data.

### Phase 2 — Impact Severity Assessment

For EACH feature/BR, assess: **what happens if this feature doesn't exist?**

| Severity | Definition | Examples |
|----------|-----------|---------|
| Life-threatening | Absence directly risks lives | Emergency dispatch, crash detection |
| Safety risk | Absence creates significant safety hazard | Drowsiness alerts, fall detection |
| Major inconvenience | Absence causes significant user friction or exclusion | Navigation for disabled, language barriers |
| Minor inconvenience | Absence is noticeable but users can work around it | UI preferences, analytics dashboard |

Document the severity rating and rationale for each feature in the Impact Severity Matrix section of `BUSINESS_RESEARCH/README.md`.

### Phase 3 — Stakeholder Criteria Research

Research what the target evaluator (identified from IDEA.md context — judges, investors, customers, government) looks for when assessing projects like this.

1. **Identify the evaluation context**: hackathon, investor pitch, government RFP, customer acquisition, etc.
2. **Research evaluation criteria** specific to that context using web search:
   - For hackathons: read past winning criteria, judging rubrics, track requirements
   - For investors: research what VCs in this space value (industry reports, blog posts)
   - For government: read RFP requirements, compliance frameworks, evaluation matrices
   - For customers: research purchase decision factors, user reviews, switching costs
3. **Define context-specific scoring factors with weights** — these are NOT hardcoded. Derive them from research.

Example scoring frameworks (illustrative — actual factors come from research):

**Hackathon context:**
| Factor | Weight | Rationale |
|--------|--------|-----------|
| Impact Severity | 25% | Judges prioritize real-world impact |
| Demo Wow Factor | 20% | Live demo is a key judging moment |
| Innovation | 20% | Novelty matters for hackathon awards |
| Track Alignment | 15% | Must fit the hackathon track requirements |
| Build Feasibility | 10% | Can it be built in the timeframe? |
| National Alignment | 10% | Aligns with national priorities (Vision 2030, etc.) |

**Investor context:**
| Factor | Weight | Rationale |
|--------|--------|-----------|
| Market Size Impact | 25% | VCs invest in large markets |
| Revenue Potential | 20% | Path to monetization |
| Defensibility | 20% | Moat against competitors |
| Time-to-Revenue | 15% | How quickly can it generate revenue? |
| Technical Risk | 10% | Can it be built reliably? |
| Team Fit | 10% | Does the team have the right skills? |

**Government RFP context:**
| Factor | Weight | Rationale |
|--------|--------|-----------|
| Compliance Alignment | 25% | Must meet regulatory requirements |
| Citizen Impact | 20% | Benefit to the public |
| Cost Efficiency | 20% | Government budget constraints |
| Implementation Feasibility | 15% | Can it be deployed in the target environment? |
| Scalability | 10% | Must work at government scale |
| Security | 10% | Government security standards |

Document the chosen framework with research-backed rationale in the Stakeholder Criteria & Scoring Framework section of `BUSINESS_RESEARCH/README.md`.

### Phase 4 — Feature Scoring Matrix

Score each feature/BR against ALL scoring factors defined in Phase 3, following the Options Rating Matrix methodology at `.claude/skills/options-rating-matrix/SKILL.md`:

1. **Score each feature** on each factor using a 1-5 scale
2. **Write a rationale** for every individual score (not just the total — each cell gets a brief justification)
3. **Assign High/Medium/Low weights** to each factor based on the evaluation context (derived from Phase 3 research)
4. **Calculate weighted scores**: `Σ(score × weight) / Σ(weights)` for overall score
5. **Rank features** by overall weighted score

Document in the Feature Scoring Matrix section of `BUSINESS_RESEARCH/README.md`.

### Phase 5 — Strategy Document

Based on the scoring results, produce strategic recommendations:

1. **Tier classification** — assign each feature to a tier:
   - **Hero** (top 1-2): The headline features that define the product. Get maximum tech research depth and demo/pitch prominence
   - **Depth** (next 2-3): Strong supporting features. Get thorough tech research
   - **Supporting** (next 2-3): Nice-to-have features. Get standard tech research
   - **Skip** (remaining): Features that scored low. Deprioritize or defer — do lightweight tech research only

2. **Strategic recommendations**:
   - Which features to prioritize for `/tech-research` (Hero and Depth tiers get most attention)
   - Which features to deprioritize or defer
   - Recommended pitch/demo order (if presentation context)
   - One-liner pitches per feature (for use in presentations)
   - Build allocation (if time-constrained — e.g., hackathon)

3. **Business model validation**: Does the competitive landscape support the BRD's revenue model? Any adjustments needed?

4. **Go-to-market assessment**: Based on competitive findings, what's the realistic entry strategy?

5. **Regulatory deep-dive**: Any regulatory issues surfaced by the competitive analysis that weren't in the initial BRD?

Document all recommendations in the Strategic Recommendations section of `BUSINESS_RESEARCH/README.md`.

### 4. Update Tracker and Status

After all phases are complete:

#### Normal flow (idea was `brd-complete` or `business-research`)

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `business-research-complete`
- Add a Business Research field: `[BUSINESS_RESEARCH/](BUSINESS_RESEARCH/README.md)`

**Update `IDEAS_TRACKER.md`:**

- **Pipeline Summary**: Decrement the previous status count, increment `Business Research Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update the idea's **Status** to `business-research-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `BUSINESS_RESEARCH_COMPLETED`, **Details**: `<N> features analyzed; Tier breakdown: <N> Hero, <N> Depth, <N> Supporting, <N> Skip; Top features: <list Hero tier>`
- If the activity table exceeds 20 data rows, remove the oldest entry

#### Re-run on completed idea (idea was already past `business-research-complete`)

After completing the research, assess whether the findings materially change the idea's strategy compared to what's already in the existing downstream documents (TECHNICAL_OPTIONS, PRD, BRD). Check for **significant impact indicators**:

- A feature previously treated as Hero/Depth is now saturated (strong competitor discovered)
- A feature previously treated as Skip/Supporting is now clearly Hero (no competitors, high impact)
- The tier ranking has fundamentally changed (different top 2 features than what the PRD prioritizes)
- A new competitor or regulatory finding invalidates a core assumption in the BRD/PRD
- The business model validation reveals the revenue model needs rethinking

**If significant impact is found** — the findings would change what's in the PRD or tech research priorities:

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `business-research-complete` (triggers pipeline re-run from `/tech-research` onward)
- Add a Business Research field: `[BUSINESS_RESEARCH/](BUSINESS_RESEARCH/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count (e.g., `PRD Complete`), increment `Business Research Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update **Status** to `business-research-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `BUSINESS_RESEARCH_COMPLETED`, **Details**: `<N> features analyzed (re-run — significant findings); Tier breakdown: <N> Hero, <N> Depth, <N> Supporting, <N> Skip; Status rolled back — <brief reason>`
- If the activity table exceeds 20 data rows, remove the oldest entry

**If no significant impact** — the findings confirm or only slightly adjust existing priorities:

**Update `ideas/<slug>/IDEA.md`:**
- Do NOT change the status (keep existing status like `prd-complete`)
- Add a Business Research field: `[BUSINESS_RESEARCH/](BUSINESS_RESEARCH/README.md)` (if not already present)

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: No changes (status didn't change)
- **Ideas Pipeline table**: Update **Updated** to today's date only (do not change Status)
- **Activity Log**: Add a row at the top — **Event**: `BUSINESS_RESEARCH_COMPLETED`, **Details**: `<N> features analyzed (supplementary — confirms existing priorities); Tier breakdown: <N> Hero, <N> Depth, <N> Supporting, <N> Skip`
- If the activity table exceeds 20 data rows, remove the oldest entry

### 5. Present Summary

Summarize for the user:

> **Business Research Complete for "<Idea Name>"**
>
> **Feature Analysis:**
> - Features analyzed: <count>
> - Novel features: <count and list>
> - Incremental features: <count and list>
> - Saturated features: <count and list>
>
> **Impact Assessment:**
> - Life-threatening: <count>
> - Safety risk: <count>
> - Major inconvenience: <count>
> - Minor inconvenience: <count>
>
> **Scoring Framework:** <context type> (<N> factors)
>
> **Feature Prioritization:**
> - Hero: <list>
> - Depth: <list>
> - Supporting: <list>
> - Skip: <list>
>
> **Key Strategic Findings:**
> - <top 2-3 insights>
>
> **Files created:**
> - `ideas/<slug>/BUSINESS_RESEARCH/` (<N> per-feature files + README)

If the idea was at a normal pipeline stage:
> Run `/tech-research` to conduct technical options research (Hero and Depth features get priority), then `/prd-generator` to generate the PRD and Final BRD.

If the idea was re-run with **significant impact**:
> **Significant changes detected** — status rolled back to `business-research-complete`.
> The following downstream documents should be updated:
> - <list specific documents and what changed — e.g., "PRD feature ordering no longer matches priorities", "Tech research for BR-4 was lightweight but it's now Hero tier">
> Run `/tech-research` to update technical research (skip already-researched capabilities, add depth to newly promoted features), then `/prd-generator` to regenerate the PRD and Final BRD.

If the idea was re-run with **no significant impact**:
> **Findings confirm existing priorities** — status unchanged (`<current status>`).
> The `BUSINESS_RESEARCH/` folder is now available as a properly cited source for presentations and future reference. No downstream regeneration needed.

## Modifiers

### help
Usage: `/business-research help`

**business-research** — No description

Available modifiers:
- `help` — Show this help message
