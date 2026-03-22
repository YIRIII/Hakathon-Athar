---
name: domain-research
description: Conduct deep, structured research on domain-specific methodologies, algorithms, strategies, or scientific approaches that determine an idea's core success — factors outside standard pipeline coverage (tech, business, marketing, supporting systems). Use this skill when the BRD flags domain research topics, when the user wants to research trading strategies, algorithms, clinical protocols, routing methods, pedagogical models, manufacturing processes, or any core methodology choice. Also triggers when the user says "research strategies", "compare approaches", "methodology research", "what algorithms exist for", "domain research", or when the core value proposition depends on choosing the right domain-specific method. This is an OPTIONAL skill — the pipeline works without it, but skipping it risks building the wrong thing.
---

# /domain-research

Conduct deep, structured research on domain-specific methodologies, algorithms, strategies, or approaches that determine an idea's core success — factors outside standard pipeline coverage.

## Why This Skill Exists

Standard pipeline skills cover business viability (`/business-research`), technical implementation (`/tech-research`), go-to-market (`/marketing-strategy`), and infrastructure (`/supporting-systems`). But some ideas live or die based on a **domain-specific methodology choice** that none of these skills evaluate. A trading bot's success depends on which strategies it runs — not which UI framework it uses. A medical app's success depends on which diagnostic protocol it follows — not which cloud provider hosts it.

Without this skill, the pipeline researches everything *around* the core methodology while taking the owner's assumed approach on faith. Domain research fills that gap by investigating whether the chosen approach is actually optimal and what alternatives exist.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Structure research into per-topic tasks. Sub-agents write full research directly to topic files (`DOMAIN_RESEARCH/NN-topic-name.md`). They return ONLY structured summaries (~500 tokens each) to the main agent. The main agent never holds all research data in context at once.

When the user invokes `/domain-research`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`brd-complete`** status → Start fresh from Step 2
- **`customer-validation-complete`** status → Start fresh from Step 2 (will also read customer validation findings)
- **`domain-research`** status → Resume from where research left off (read `DOMAIN_RESEARCH/README.md` to find incomplete topics)
- **Any later status** (`domain-research-complete`, `business-research`, `business-research-complete`, `supporting-systems-complete`, `marketing-strategy-complete`, `tech-research-complete`, `pricing-research-complete`, `constraint-validation-complete`, `risk-assessment-complete`, `prd-draft`, `prd-complete`) → Re-run (supplementary enrichment). Check if `DOMAIN_RESEARCH/` folder already exists:
  - **If folder exists with completed research**: Ask the user whether to (a) skip already-researched topics and only research new/changed ones, or (b) redo all research from scratch. For option (a), read the existing README.md and treat topics already marked `complete` as done — only research topics with status `pending` or that don't have a file yet.
  - **If no folder exists**: Start fresh from Step 2.
  - **Status handling**: Do NOT change the idea's status during research. After completion, the skill will assess whether findings are significant enough to warrant a status rollback (see Step 5).

If the user specifies a slug, use that idea directly (verify it has a BRD).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/brd-generator` first.

### 2. Read Context Documents & Identify Research Topics

Read the following files for the selected idea:

- `ideas/<slug>/preparation/INITIAL-BRD.md` — the primary source (fall back to `ideas/<slug>/BRD.md` for pre-restructuring ideas)
- `ideas/<slug>/IDEA.md` — original idea context, including any domain research flags from `/brd-generator`
- `ideas/<slug>/RESEARCH.md` — raw research data (if available)
- `ideas/<slug>/CUSTOMER_VALIDATION/README.md` — customer validation findings (if available)

#### Topic Identification

Domain research topics come from three sources:

1. **BRD flags**: `/brd-generator` may have flagged domain research topics in a "Domain Research Recommended" section (Section 6.5 of the BRD). Read these first.
2. **User input**: The user may specify topics directly (e.g., "research trading strategies for Trade-Bot").
3. **Agent detection**: If neither source provides topics, analyze the BRD and IDEA.md to identify domain-specific methodology choices that:
   - The idea's success critically depends on
   - Have multiple known alternatives or approaches
   - Fall outside what `/tech-research` (implementation tools) or `/business-research` (competitive features) would cover
   - Require specialized domain knowledge to evaluate

**Detection signals** — domain research is likely needed when the idea involves:
- Algorithmic decision-making (trading strategies, routing algorithms, recommendation engines, scoring models)
- Scientific/clinical methodology (diagnostic protocols, measurement techniques, analytical methods)
- Manufacturing or production processes (fabrication methods, material selection, quality control approaches)
- Pedagogical or training models (learning methodologies, assessment approaches, curriculum design)
- Creative or content generation approaches (AI model architectures, generation pipelines, quality evaluation methods)

**Present detected topics to the user for confirmation:**

```
Domain Research Topics for "<Idea Name>"
==========================================
Based on your BRD [and flags], these domain-specific areas need research:

Topics:
  1. <Topic A> — <why this matters for success>
  2. <Topic B> — <why this matters for success>
  ...

(a) Confirm and research all topics
(b) Add/remove/modify topics, then research
(c) Cancel — skip domain research
```

Wait for user confirmation. If the user adds or removes topics, adjust the list.

Update the idea's status to `domain-research` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Tracker updates when starting:**
- **Pipeline Summary**: Decrement the previous status (`BRD Complete` or `Customer Validation Complete`), increment `Domain Research`
- **Ideas Pipeline table**: Update the idea's **Status** to `domain-research`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `DOMAIN_RESEARCH_STARTED`, **Details**: `Domain methodology research initiated; <N> topics identified`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

### 3. Generate Domain Research Analysis

Read the domain research template from `.claude/skills/domain-research/references/domain-research-template.md`.

**Always create a `ideas/<slug>/DOMAIN_RESEARCH/` folder** with per-topic files.

#### Research Progress Tracking (Resumability)

- **Fresh start** (status was `brd-complete` or `customer-validation-complete`): Create `ideas/<slug>/DOMAIN_RESEARCH/README.md` with the header metadata and a **Research Progress** table listing every confirmed topic with status `pending`:

```markdown
## Research Progress

| # | Topic | File | Status | Updated |
|---|-------|------|--------|---------|
| 1 | <Name> | [01-name.md](01-name.md) | pending | — |
| 2 | <Name> | [02-name.md](02-name.md) | pending | — |
```

- **Resuming** (status was `domain-research`): Read `ideas/<slug>/DOMAIN_RESEARCH/README.md`. Find the **Research Progress** table. Identify topics with status `pending` — these need research. **Skip topics already marked `complete`.**

#### For each topic that needs research:

1. **Launch sub-agents** (topics are independent — launch in parallel where possible). Each sub-agent:
   - Receives the topic name, relevant BRD context, and idea context
   - Conducts exhaustive web research to build a **complete taxonomy** of approaches within this domain topic:
     - **Academic research**: Published papers, meta-analyses, systematic reviews on approach effectiveness
     - **Practitioner evidence**: Blog posts, forum discussions (Reddit, specialized forums), conference talks, practitioner guides, books
     - **Industry benchmarks**: Performance comparisons, backtests, case studies, competition results
     - **Known variations**: Sub-types, hybrid approaches, regional or market-specific variations
   - For each identified approach/variation, documents:
     - How it works (mechanism — not just a name)
     - Evidence for effectiveness (with conditions and constraints)
     - Key parameters and their typical ranges
     - Known limitations and failure modes
     - Context/regime sensitivity (when it works vs. when it doesn't)
   - **Scores all approaches using the Options Rating Matrix** (`.claude/skills/options-rating-matrix/SKILL.md`): Define domain-appropriate KPIs, score 1-5 per KPI, calculate weighted scores, recommend highest scorers with rationale. KPIs must be specific to the domain — not generic criteria. Examples:
     - Trading strategies: risk-adjusted return, max drawdown, win rate, market regime robustness, parameter sensitivity, implementation complexity
     - Clinical protocols: sensitivity, specificity, false positive rate, patient compliance, cost per diagnosis
     - Routing algorithms: optimality gap, computation time, scalability, constraint handling, real-time adaptability
     - Manufacturing: unit cost, quality consistency, scalability, lead time, capital requirements
   - Identifies the **top recommended approaches** for further testing/implementation
   - **Writes the complete analysis directly to `ideas/<slug>/DOMAIN_RESEARCH/NN-topic-name.md`** using the per-topic template structure
   - Returns ONLY a structured summary to the main agent:

```
Summary (max 500 tokens):
- Topic: <name>
- Approaches found: <count>
- Top recommended: <name> (score: X.XX)
- Runner-up: <name> (score: X.XX)
- Key finding: <one line>
- Risk/caveat: <one line>
- File: DOMAIN_RESEARCH/NN-name.md
```

2. **After each topic is complete**, update its row in the README.md Research Progress table: set **Status** to `complete` and **Updated** to today's date.

**Research guidelines**:
- Use **real data only** — never fabricate performance metrics, backtest results, or benchmark numbers
- **Cite sources** inline (papers, vendor docs, practitioner blogs, forum discussions)
- **Distinguish evidence quality**: Peer-reviewed study > large-scale backtest > practitioner experience > theoretical argument
- **Note temporal validity**: Approaches that worked in 2010 may not work in 2025 — note when evidence was gathered and whether conditions have changed
- **Challenge assumed approaches**: If the idea owner specified a particular methodology, research whether it's actually optimal. Include alternatives with evidence — the goal is informed decision-making, not compliance with potentially uninformed assumptions

**Research & Citation Methodology**: Follow `.claude/skills/research-citations/SKILL.md` for all research. Use FACT-ID prefix `DOM` for domain research-specific facts. Additional requirements:
- Academic papers must include DOI or URL, authors, year, and journal/conference
- Backtest/benchmark results must note: data period, market conditions, transaction cost assumptions, survivorship bias handling
- Practitioner claims must note source credibility (years of experience, verified track record, potential conflicts of interest)

**Citation URL Verification (Mandatory)**: After completing each topic file, run the Citation URL Verification Protocol (`.claude/skills/research-citations/SKILL.md` Section I) against all URLs in that file. Also run the Pre-Publication Verification Checklist (`.claude/skills/research-citations/references/citation-checklist.md`). Fix all CRITICAL and HIGH issues before moving to the next topic.

#### After all topics are complete:

Fill in the remaining README.md sections:
- **Domain Taxonomy**: Classification of all identified approaches across topics, organized by family/type/paradigm
- **Cross-Topic Strategy** (if applicable): How findings across topics interact — e.g., for a trading bot, how strategy selection affects risk management approach, which affects position sizing methodology. Identify decision dependencies.
- **Executive Summary**: Key findings, recommended approaches, evidence-based rationale
- **Recommended Focus Areas**: Prioritized list of approaches to implement/test first, with evidence-based rationale and expected validation effort
- **Impact on Downstream Pipeline**: How domain findings should inform business research (feature priorities), tech research (implementation requirements), marketing (positioning), and other downstream skills
- **Open Questions & Next Steps**: What remains uncertain, what additional testing/validation is needed

### 4. Cross-Topic Comparison (if multiple topics)

If the research covered 3+ topics, create a **cross-topic options rating matrix** in the README using `.claude/skills/options-rating-matrix/SKILL.md` methodology. This compares the recommended approach from each topic at a strategic level — helping the user understand which domain decisions have the most impact on the idea's success.

### 5. Update Tracker and Status

After all topics are researched and the README is finalized:

#### Normal flow (idea was `brd-complete`, `customer-validation-complete`, or `domain-research`)

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `domain-research-complete`
- Add a Domain Research field: `[DOMAIN_RESEARCH/](DOMAIN_RESEARCH/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Domain Research Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update the idea's **Status** to `domain-research-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `DOMAIN_RESEARCH_COMPLETED`, **Details**: `<N> topics researched; <N> total approaches analyzed; Top approach: <name>; Recommended focus: <list>`
- If the activity table exceeds 20 data rows, remove the oldest entry

#### Re-run on completed idea (idea was already past `domain-research-complete`)

After completing the research, assess whether the findings materially change the idea's direction compared to what's in existing downstream documents. Check for **significant impact indicators**:

- The recommended approach/methodology changed fundamentally (e.g., was "GSP Ultra gap trading" → now "multi-strategy with momentum focus" is clearly superior)
- A previously assumed approach was found to have critical limitations not accounted for in the BRD/PRD
- New evidence invalidates a core assumption (e.g., "strategy X doesn't work in the target market conditions")
- The feature set should change based on domain findings (different approaches require different features, scanning logic, data feeds, etc.)
- Cost or complexity implications differ significantly from what downstream skills assumed

**If significant impact is found** — the findings would change what features to build, how to build them, or the product's core value proposition:

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `domain-research-complete` (triggers pipeline re-run from `/business-research` onward)
- Set Domain Research field: `[DOMAIN_RESEARCH/](DOMAIN_RESEARCH/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count (e.g., `PRD Complete`), increment `Domain Research Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update **Status** to `domain-research-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `DOMAIN_RESEARCH_COMPLETED`, **Details**: `<N> topics researched (re-run — significant findings); Status rolled back — <brief reason>`
- If the activity table exceeds 20 data rows, remove the oldest entry

**If no significant impact** — the findings confirm existing approach choices:

**Update `ideas/<slug>/IDEA.md`:**
- Do NOT change the status (keep existing status like `prd-complete`)
- Ensure Domain Research field exists: `[DOMAIN_RESEARCH/](DOMAIN_RESEARCH/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: No changes (status didn't change)
- **Ideas Pipeline table**: Update **Updated** to today's date only (do not change Status)
- **Activity Log**: Add a row at the top — **Event**: `DOMAIN_RESEARCH_COMPLETED`, **Details**: `<N> topics researched (supplementary — confirms existing approach); Top approach: <name>`
- If the activity table exceeds 20 data rows, remove the oldest entry

### 6. Present Summary

Summarize for the user:

> **Domain Research Complete for "<Idea Name>"**
>
> **Topics Researched:** <count>
>
> **Findings per Topic:**
> | Topic | Approaches Found | Recommended | Score | Key Insight |
> |-------|-----------------|-------------|-------|-------------|
> | <topic> | <N> | <name> | <X.XX> | <one line> |
>
> **Recommended Focus Areas:**
> - <prioritized list of approaches to implement/test>
>
> **Key Strategic Findings:**
> - <top 2-3 insights that affect the product direction>
>
> **Impact on Downstream Pipeline:**
> - <how findings affect business research, tech research, etc.>
>
> **Files created:**
> - `ideas/<slug>/DOMAIN_RESEARCH/` (<N> topic files + README)
>
> Run `/business-research` to conduct feature competitive analysis informed by domain findings.

If the idea was re-run with **significant impact**:
> **Significant domain findings** — status rolled back to `domain-research-complete`.
> The following downstream documents should be updated:
> - <list specific documents and what changed>
> Recommended re-run sequence: `/business-research` → `/supporting-systems` → `/marketing-strategy` → `/tech-research` → `/pricing-strategy` → `/constraint-validation` → `/prd-generator`

If the idea was re-run with **no significant impact**:
> **Findings confirm existing approach** — status unchanged (`<current status>`).
> The `DOMAIN_RESEARCH/` folder is now available as documented evidence for the chosen approach. No downstream regeneration needed.

## Modifiers

### help
Usage: `/domain-research help`

**domain-research** — Conduct deep, structured research on domain-specific methodologies, algorithms, strategies, or scientific approaches ...

Available modifiers:
- `help` — Show this help message
