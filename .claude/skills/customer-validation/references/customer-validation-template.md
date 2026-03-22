# Customer Validation Template

## README.md Structure

```markdown
# Customer Validation — {Idea Name}

**Idea**: {slug}
**Date**: {YYYY-MM-DD}
**Status**: In Progress / Complete

## Idea Summary

{One-paragraph problem/solution recap from BRD}

## Target Customer Segments

| # | Segment | Description | Est. Size | Accessibility | Primary Channel |
|---|---------|-------------|-----------|---------------|-----------------|
| 1 | {name} | {description} | {size} | High/Medium/Low | {where to find them} |

## Validation Progress

| # | Artifact | File | Status | Updated |
|---|----------|------|--------|---------|
| 1 | Assumption Map | [01-assumption-map.md](01-assumption-map.md) | pending | — |
| 2 | Survey Template | [02-survey-template.md](02-survey-template.md) | pending | — |
| 3 | Interview Script | [03-interview-script.md](03-interview-script.md) | pending | — |
| 4 | Competitor User Research | [04-competitor-user-research.md](04-competitor-user-research.md) | pending | — |
| 5 | Validation Scorecard | [05-validation-scorecard.md](05-validation-scorecard.md) | pending | — |

## Desk Research Summary

### Assumptions with Existing Evidence
{Assumptions that already have data from BRD research}

### Assumptions Requiring Primary Research
{High-risk assumptions with no/weak evidence — MUST be tested}

### Preliminary Scorecard (Desk Research Only)
> **Note**: These scores are based on secondary research only. Update after primary research (surveys + interviews).

| Category | Score | Confidence | Notes |
|----------|-------|------------|-------|
| Problem Validation | /10 | Low/Medium/High | {basis} |
| Solution Validation | /10 | Low/Medium/High | {basis} |
| Willingness to Pay | /10 | Low/Medium/High | {basis} |
| Market Validation | /10 | Low/Medium/High | {basis} |
| **Total** | **/40** | | |

### Recommended Validation Sequence
1. {First action — usually survey for breadth}
2. {Second action — usually interviews for depth}
3. {Update scorecard}

### Estimated Effort
- **Timeline**: {e.g., 2-3 weeks}
- **Cost**: {e.g., ~$50-100 for survey distribution}
- **People needed**: {e.g., 1 person for interviews, survey can be self-serve}
```

---

## 01-assumption-map.md Structure

```markdown
# Assumption Map — {Idea Name}

## Summary

| Category | Total | Test First | Test Soon | Test Later |
|----------|-------|------------|-----------|------------|
| Problem | | | | |
| Customer | | | | |
| Solution | | | | |
| Market | | | | |
| Revenue | | | | |
| Technical | | | | |
| **Total** | | | | |

## Assumptions

### ASM-001: {Testable assumption statement}

- **Category**: Problem / Customer / Solution / Market / Revenue / Technical
- **Risk if Wrong**: Critical / High / Medium / Low
- **Current Evidence**: {What data exists from BRD/RESEARCH.md}
- **Evidence Strength**: Strong / Moderate / Weak / None
- **Validation Method**: {Survey Q#, Interview section, landing page test, etc.}
- **Priority**: Test First / Test Soon / Test Later

{Repeat for each assumption}
```

---

## 02-survey-template.md Structure

```markdown
# Customer Survey — {Idea Name}

## Survey Metadata
- **Target segments**: {list}
- **Target sample size**: {n per segment with rationale}
- **Estimated completion time**: {X minutes}
- **Distribution channels**: {where to post/send}
- **Expected response rate**: {%} → Contact {N} people to get {N} responses

## Screening Questions (2-3)

### Q1: {Question text}
**Type**: Multiple choice / Single select
**Options**:
- A) {option} → Qualifies
- B) {option} → Qualifies
- C) {option} → Disqualifies (screen out)
**Tests**: ASM-{ID}
**Validating answer**: {what confirms the assumption}
**Invalidating answer**: {what challenges the assumption}

## Problem Validation (3-4 questions)

### Q{N}: {Question text}
{Same structure as above}

## Current Behavior (2-3 questions)

### Q{N}: {Question text}
{Same structure}

## Solution Interest (2-3 questions)

### Q{N}: {Question text}
{Same structure}

## Willingness to Pay (2-3 questions)

### Q{N}: {Van Westendorp or direct pricing question}
{Same structure}

## Demographics / Firmographics (2-3 questions)

### Q{N}: {Question text}
{Same structure}

## Analysis Guide
- **Minimum viable responses**: {N} per segment
- **Key cross-tabulations**: {which questions to cross-analyze}
- **Decision thresholds**: {e.g., "If <40% report this problem as 'very painful', revisit problem assumption"}
```

---

## 03-interview-script.md Structure

```markdown
# Interview Script — {Idea Name}

## Interview Metadata
- **Target**: {N} interviews per segment ({segments list})
- **Duration**: ~30 minutes
- **Recording**: Ask permission; take notes regardless
- **Recruitment**: {how to find and recruit interviewees per segment}

## Section 1: Warm-up (2 min)

**Say**: "Thank you for your time. I'm researching [topic area] and would love to hear about your experience. There are no right or wrong answers — I'm just trying to understand how people currently deal with [problem space]. Is it okay if I take notes / record?"

## Section 2: Current Behavior (5 min)

**Primary**: "Tell me about the last time you [problem context]..."
**Follow-up probes**:
- "How often does that happen?"
- "Walk me through what you did step by step."
- "What was the most frustrating part?"
**Tests**: ASM-{IDs}
**Red flags**: {e.g., "If they can't recall a recent instance, the problem may not be frequent enough"}

{Repeat for sections 3-7}

## Post-Interview Note Template

| Field | Notes |
|-------|-------|
| Interviewee | {anonymous ID, segment} |
| Date | |
| Key pain points | |
| Current solutions used | |
| Reaction to concept | Positive / Neutral / Negative |
| Would pay? | Yes / Maybe / No |
| Stated price range | |
| Surprising insights | |
| Assumptions validated | ASM-{IDs} |
| Assumptions challenged | ASM-{IDs} |

## Synthesis Framework
After completing all interviews:
1. Tally pain points across all interviews
2. Group by theme
3. Count how many interviewees confirmed each assumption
4. Flag assumptions where <50% of interviewees confirmed
5. Identify patterns not captured in the assumption map
```

---

## 04-competitor-user-research.md Structure

```markdown
# Competitor User Research — {Idea Name}

## Research Scope
- **Competitors analyzed**: {list}
- **Platforms searched**: App Store, Play Store, Reddit, Twitter/X, G2, Capterra, {others}
- **Date range**: {when research was conducted}

## Platform: {App Store / Play Store}

### {Competitor Name}
- **Rating**: {X.X/5} ({N} reviews)
- **Search query**: "{query used}"

**Top Complaints** (sorted by frequency):
1. "{Direct quote}" — {star rating}, {date} | Relates to: ASM-{ID}
2. ...

**Top Praise**:
1. "{Direct quote}" — {star rating}, {date}
2. ...

**Unmet Needs / Feature Requests**:
1. "{Direct quote or paraphrase}" — Relates to: {BRD feature}
2. ...

{Repeat for each platform}

## Voice of Customer Summary

### Top Pain Points (across all sources)
| # | Pain Point | Sources | Frequency | Relates to BRD |
|---|-----------|---------|-----------|---------------|
| 1 | {pain point} | {platforms} | {count} | {BR-ID or feature} |

### Opportunity Gaps
{Where existing solutions fall short — validates or challenges BRD}

### Feature Demand Signals
{Features users explicitly ask for that align with BRD}
```

---

## 05-validation-scorecard.md Structure

```markdown
# Validation Scorecard — {Idea Name}

> **Status**: Pre-Validation (desk research only) / Post-Validation (primary research complete)
> **Last Updated**: {YYYY-MM-DD}

## 1. Problem Validation (0-10)

| Criterion | Max | Score | Evidence |
|-----------|-----|-------|----------|
| Target audience confirms the problem exists | 3 | | {source} |
| Problem is frequent enough to warrant a solution | 2 | | {source} |
| Problem is painful enough to switch from current solutions | 3 | | {source} |
| Actively looking for better alternatives | 2 | | {source} |
| **Subtotal** | **10** | | |

## 2. Solution Validation (0-10)

| Criterion | Max | Score | Evidence |
|-----------|-----|-------|----------|
| Proposed solution addresses confirmed pain points | 3 | | |
| Respondents reacted positively to the concept | 3 | | |
| Would use it given their current workflow | 2 | | |
| No critical must-have features missing | 2 | | |
| **Subtotal** | **10** | | |

## 3. Willingness to Pay (0-10)

| Criterion | Max | Score | Evidence |
|-----------|-----|-------|----------|
| Respondents confirm they'd pay for this | 3 | | |
| Stated WTP supports BRD pricing assumptions | 3 | | |
| Clear premium segment exists | 2 | | |
| No large segment expects this free | 2 | | |
| **Subtotal** | **10** | | |

## 4. Market Validation (0-10)

| Criterion | Max | Score | Evidence |
|-----------|-----|-------|----------|
| Reachable market matches BRD SAM estimate | 3 | | |
| Target segment accessible for acquisition | 3 | | |
| Unexpected adjacent segments identified | 2 | | |
| Market timing feels right | 2 | | |
| **Subtotal** | **10** | | |

## Total Score

| Category | Score |
|----------|-------|
| Problem Validation | /10 |
| Solution Validation | /10 |
| Willingness to Pay | /10 |
| Market Validation | /10 |
| **Total** | **/40** |

## Verdict

| Score Range | Verdict | Action |
|-------------|---------|--------|
| 30-40 | **Strong Validation** | Proceed with confidence |
| 20-29 | **Moderate Validation** | Proceed with adjustments |
| 10-19 | **Weak Validation** | Pivot or significantly redesign |
| 0-9 | **Failed Validation** | Stop or completely rethink |

**Current Verdict**: {verdict}

## Assumptions Status Update

| ASM-ID | Assumption | Pre-Validation | Post-Validation | Action Needed |
|--------|-----------|----------------|-----------------|---------------|
| ASM-001 | {statement} | Weak | {updated} | {none / revise BRD / pivot} |

## Recommendations
{What should change based on validation findings}
```
