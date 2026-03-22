# Brainstorm Templates

Templates for the three dashboard/tracking files used by the `/brainstorm` skill.

---

## 1. BRAINSTORM_TRACKER.md (Main Dashboard)

```markdown
# Brainstorm Tracker

Last Updated: <YYYY-MM-DD>

---

## Summary

| Metric | Count |
|--------|-------|
| Total Concepts | 0 |
| Total Ideas Generated | 0 |
| Ideas Sent to Pipeline | 0 |

---

## Concepts

| # | Concept | Context | Ideas | Top Idea | Top Score | Status | Created | Dashboard |
|---|---------|---------|-------|----------|-----------|--------|---------|-----------|
| 1 | <concept-name> | <brief context> | N | <top idea name> | XX.X/100 | scored | YYYY-MM-DD | [View](concept-slug/CONCEPT_DASHBOARD.md) |

**Status values:** `in-progress` | `scored` | `pipeline` (idea sent to /new-idea) | `closed`

---

## Recent Activity

> Last 20 activities, most recent first.

| Date | Concept | Event | Details |
|------|---------|-------|---------|
| YYYY-MM-DD | <concept-name> | BRAINSTORM_COMPLETED | N ideas scored; Top: <idea> (XX.X/100) |

**Event Types:**
- `BRAINSTORM_STARTED` — New concept created, KPIs defined
- `BRAINSTORM_COMPLETED` — All ideas scored and ranked
- `IDEAS_ADDED` — Additional ideas added to existing concept
- `RESCORED` — KPIs or weights updated, ideas re-ranked
- `PIPELINE_HANDOFF` — Idea sent to /new-idea (link to IF-XXX)
- `CONCEPT_CLOSED` — Brainstorm session closed
```

---

## 2. CONCEPT_DASHBOARD.md (Per-Concept)

```markdown
# <Concept Name>

| Field | Value |
|-------|-------|
| **Slug** | `<concept-slug>` |
| **Created** | YYYY-MM-DD |
| **Status** | in-progress / scored / pipeline / closed |
| **Ideas Generated** | N |
| **Top Idea** | <name> (XX.X/100) |
| **Pipeline Idea** | — / [IF-XXX](../../ideas/<slug>/IDEA.md) |

---

## Context

**Goal**: <what the user is trying to achieve>
**Type**: Competition / Startup / Side Project / Open Exploration
**Domain**: <theme, industry, technology area>
**Constraints**: <time limit, team size, budget, tech requirements, region>
**Judging Criteria** (if competition): <what judges reward>
**Team Strengths**: <skills and tech the team can leverage>

---

## KPIs

| # | KPI | Weight (1-5) | Description | Rationale |
|---|-----|-------------|-------------|-----------|
| K1 | <KPI Name> | X | <what it measures, 1-10 scale> | <why this matters for this context> |
| K2 | ... | ... | ... | ... |

**Total Weight Points**: XX

---

## Scoring Matrix

> All ideas from all rounds in ONE table. Idea names MUST be markdown links.

| Rank | Idea | Round | K1 (×W) | K2 (×W) | K3 (×W) | ... | Weighted Score | Tags |
|------|------|-------|---------|---------|---------|-----|---------------|------|
| 1 | [<Idea Name>](<idea-slug>/IDEA_BRIEF.md) | 1 | 8 (×5=40) | 7 (×4=28) | ... | ... | **XX.X/100** | Top Pick |
| 2 | [<Idea Name>](<idea-slug>/IDEA_BRIEF.md) | 2 | ... | ... | ... | ... | **XX.X/100** | Safest Bet |
| 3 | [<Idea Name>](<idea-slug>/IDEA_BRIEF.md) | 1 | ... | ... | ... | ... | **XX.X/100** | Dark Horse |
| ... | ... | ... | ... | ... | ... | ... | ... | — |

**Round values:** 1, 2, 3, ... for generated rounds; `ext` for externally submitted ideas

**Score Legend:**
- 9-10: Exceptional | 7-8: Strong | 5-6: Average | 3-4: Below Average | 1-2: Poor

---

## Rankings

### Top Pick: <Idea Name> — XX.X/100
<1-2 sentence summary of why this is #1>

### Safest Bet: <Idea Name> — XX.X/100
<1-2 sentence summary of why this is the safe choice>

### Dark Horse: <Idea Name> — XX.X/100
<1-2 sentence summary of why this could surprise>

---

## Recommendation

### Why <Top Idea>?

<2-3 paragraphs explaining the recommendation — what makes it strong, what risks to watch, what the team should focus on>

### Score Improvement Plan

| KPI | Current | Target | How to Improve |
|-----|---------|--------|---------------|
| <KPI> | X | Y | <concrete action> |
| ... | ... | ... | ... |

**Projected score after improvements**: XX.X/100

---

## Ideas Index

> Every idea in the Scoring Matrix MUST also appear here (and vice versa). Idea names MUST be markdown links to their IDEA_BRIEF.md.

| # | Idea | Round | Score | Status | Brief |
|---|------|-------|-------|--------|-------|
| 1 | [<Idea Name>](<idea-slug>/IDEA_BRIEF.md) | 1 | XX.X/100 | scored / pipeline | <one-liner> |
| ... | ... | ... | ... | ... | ... |

---

## Pipeline Status

| Idea | Sent to Pipeline | Idea Forge ID | Pipeline Status |
|------|-----------------|---------------|-----------------|
| — | — | — | — |
```

---

## 3. IDEA_BRIEF.md (Per-Idea)

```markdown
# <Idea Name>

| Field | Value |
|-------|-------|
| **Concept** | [<Concept Name>](../CONCEPT_DASHBOARD.md) |
| **Slug** | `<idea-slug>` |
| **Created** | YYYY-MM-DD |
| **Weighted Score** | XX.X/100 |
| **Rank** | #N of M |
| **Tags** | Top Pick / Safest Bet / Dark Horse / — |
| **Pipeline** | — / [IF-XXX](../../../ideas/<slug>/IDEA.md) |

## One-Liner

<single sentence pitch>

## How It Works

<2-3 sentences describing the core mechanism, user flow, or product concept>

## Why It Wins

<1-2 sentences on the key insight — what makes this idea strong for this specific context>

## Key Risk

<1-2 sentences on the biggest threat to success>

---

## Research Validation

<Quick research findings that support or challenge the idea. Every factual claim must be sourced per /research-citations methodology.>

### Existing Solutions
- <Competitor/similar project 1> — <what they do, source URL>
- <Competitor/similar project 2> — <what they do, source URL>

### Feasibility Check
<Is the core tech approach viable? Any known blockers?>

### Market Signal
<Any data on demand, willingness to pay, or market size? Source required.>

---

## KPI Scores

| KPI | Weight | Score (1-10) | Weighted | Justification |
|-----|--------|-------------|----------|---------------|
| <KPI 1> | X | Y | X×Y | <1 sentence why this score> |
| <KPI 2> | X | Y | X×Y | ... |
| ... | ... | ... | ... | ... |
| **Total** | **ΣW** | — | **Σ(W×S)** | |
| **Weighted Score** | | | **XX.X/100** | |

---

## Improvement Plan

> Only included for top-ranked idea or on user request.

| KPI | Current | Target | Action |
|-----|---------|--------|--------|
| <KPI> | X | Y | <what to do> |
| ... | ... | ... | ... |

**Projected improved score**: XX.X/100
```
