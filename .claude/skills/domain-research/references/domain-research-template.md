# Domain Research Template

## README.md Structure

```markdown
# Domain Research — {Idea Name}

**Idea**: {slug}
**Date**: {YYYY-MM-DD}
**Status**: In Progress / Complete
**Author**: Claude (Idea Forge Pipeline)
**Source**: Based on [INITIAL-BRD](../preparation/INITIAL-BRD.md) domain methodology requirements

---

## Research Progress

| # | Topic | File | Status | Updated |
|---|-------|------|--------|---------|
| 1 | {Topic Name} | [01-topic-name.md](01-topic-name.md) | pending / complete | — / YYYY-MM-DD |

---

## Domain Taxonomy

{Classification tree or table showing how all identified approaches relate to each other across all topics. Group by family, type, or paradigm. Show which topic file covers each branch.}

Example for trading strategies:
| Family | Sub-Type | Approach | Topic File | Recommended |
|--------|----------|----------|------------|-------------|
| Momentum | Gap Trading | GSP Ultra | [01-gap-trading.md] | Runner-up |
| Momentum | Breakout | Opening Range Breakout | [02-momentum.md] | ✅ Top |
| Mean Reversion | Statistical | Bollinger Band Reversion | [03-mean-reversion.md] | — |

---

## Cross-Topic Strategy

{How findings across topics interact. Which decisions are dependent.}

Example: "Choosing a momentum-based strategy (Topic 1) constrains risk management (Topic 3) to trailing stops rather than fixed targets, and requires real-time data feeds (impacts tech research). Conversely, a mean-reversion strategy allows fixed targets but requires higher-frequency data and more sophisticated entry timing."

---

## Executive Summary

{Key findings across all topics. What the research reveals about the optimal approach for this idea. Evidence-based recommendation. 3-5 paragraphs.}

---

## Recommended Focus Areas

{Prioritized list of approaches to implement or test first, with rationale.}

For each recommended approach:
- **Approach**: {name}
- **From topic**: {topic file reference}
- **Why prioritized**: {evidence summary — scores, research findings, practitioner consensus}
- **Expected effort to validate**: {what testing/implementation looks like — backtesting periods, sample sizes, POC scope}
- **Success criteria**: {how to know if this approach works for this idea}

---

## Cross-Topic Comparison Matrix

{Only if 3+ topics. Options Rating Matrix comparing the recommended approach from each topic at a strategic level. Follow `.claude/skills/options-rating-matrix/SKILL.md` methodology.}

---

## Impact on Downstream Pipeline

| Downstream Skill | Impact | Details |
|-----------------|--------|---------|
| Business Research | {High/Medium/Low/None} | {How domain findings affect feature prioritization — e.g., "momentum strategies require real-time scanners, making scanner features Hero-tier"} |
| Supporting Systems | {High/Medium/Low/None} | {Infrastructure needs driven by domain approach — e.g., "high-frequency data requires dedicated streaming infrastructure"} |
| Marketing Strategy | {High/Medium/Low/None} | {How domain approach affects positioning — e.g., "multi-strategy approach enables 'adaptive AI' messaging vs. single-strategy 'gap trading specialist'"} |
| Tech Research | {High/Medium/Low/None} | {What technical capabilities the chosen approach requires — e.g., "mean-reversion needs statistical computation engine, not just rule-based scanner"} |
| Pricing Strategy | {High/Medium/Low/None} | {Cost structure implications — e.g., "multi-strategy requires more compute, increasing per-user cost"} |
| Constraint Validation | {High/Medium/Low/None} | {New constraints from domain requirements — e.g., "latency requirements tighten from 500ms to 50ms for scalping strategies"} |

---

## Open Questions & Next Steps

{What remains uncertain. What additional testing, validation, or expert consultation is needed. Specific action items with owners.}
```

---

## Per-Topic File Structure (`NN-topic-name.md`)

```markdown
# {Topic Name} — Domain Research

**Idea**: {slug}
**Topic**: {N} of {total}
**Date**: {YYYY-MM-DD}
**Author**: Claude Sub-Agent (Idea Forge Pipeline)

---

## Overview

{What this domain topic covers and why it's critical to the idea's success. What decision needs to be made. 2-3 paragraphs.}

---

## Taxonomy of Approaches

{Complete classification of known approaches within this topic.}

| # | Approach | Family/Type | Origin | Active Use | Complexity |
|---|----------|-------------|--------|-----------|------------|
| 1 | {Name} | {category} | {academic / practitioner / hybrid} | {Yes / Declining / Emerging} | {Low / Medium / High} |

---

## Detailed Approach Profiles

### {Approach 1 Name}

**How it works**: {Mechanism — explain the logic, not just the name. What signals does it use? What rules does it follow? What assumptions does it make?}

**Evidence base**:
- {Academic evidence with citations — paper name, authors, year, key finding}
- {Practitioner evidence with citations — source, context, finding}
- {Backtest/benchmark results with citations — data period, conditions, results}

**Key parameters**:
| Parameter | Typical Range | Sensitivity | Notes |
|-----------|--------------|-------------|-------|
| {param} | {range} | {High / Medium / Low — how much does varying this affect outcomes?} | {practical guidance on tuning} |

**Context/regime sensitivity**:
- **Works well when**: {conditions, market states, data characteristics}
- **Fails when**: {conditions, market states, edge cases}
- **Adaptability**: {Can it be modified for different conditions? How?}

**Known limitations**:
- {Limitation 1 with evidence}
- {Limitation 2 with evidence}

**Implementation complexity**: {What's needed — data feeds, computation, expertise, infrastructure. Estimated effort to implement.}

---

{Repeat for each significant approach. Minor variations can be grouped.}

---

## Options Rating Matrix

Follow the methodology at `.claude/skills/options-rating-matrix/SKILL.md`.

### KPI Definitions

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| {KPI 1} | {what it measures, how to score it} | High (3×) / Medium (2×) / Low (1×) | {why this weight for this idea} |

KPIs must be domain-specific and differentiate the approaches. Each KPI should produce different scores for at least 2 approaches. Generic KPIs like "quality" or "effectiveness" are too vague — use measurable proxies.

### Scoring Matrix

| Approach | {KPI 1} | {KPI 2} | {KPI 3} | ... | Weighted Score |
|----------|---------|---------|---------|-----|----------------|
| {Name} | {score} | {score} | {score} | ... | {X.XX} |

Include score rationales for the top 3 approaches (brief — 1 sentence per KPI explaining why that score).

### Recommendation

**Top recommended**: {Name} — Score: {X.XX}
**Rationale**: {Why this scores highest, tied to specific KPIs and evidence. 2-3 sentences.}

**Runner-up**: {Name} — Score: {X.XX}
**When to prefer the runner-up**: {Conditions under which the runner-up is better — e.g., different market conditions, different risk tolerance, simpler implementation}

**Not recommended (with reasons)**:
- {Approach X}: {Why it scored low — specific evidence. 1 sentence.}

---

## Recommended Focus for Testing

{Which approaches to test/validate first and why. What validation looks like:}

1. **{Approach A}** (top recommended)
   - **Validation method**: {e.g., backtest on 2 years of historical data, clinical pilot with N patients, A/B test with N users}
   - **Key metrics to track**: {what determines success}
   - **Expected timeline**: {how long validation takes}
   - **Go/no-go criteria**: {what results mean proceed vs. pivot}

2. **{Approach B}** (runner-up — test in parallel if resources allow)
   - {same structure}

---

## Sources

{All sources cited in this file, organized by type.}

### Academic
- {Author(s) (Year). "Title." Journal/Conference. DOI/URL. Accessed YYYY-MM-DD.}

### Industry / Practitioner
- {Source/Author. "Title." Publication/Blog. URL. Accessed YYYY-MM-DD.}

### Community / Forum
- {Platform. "Thread title." URL. Accessed YYYY-MM-DD.}

### Data / Benchmarks
- {Source. "Dataset/benchmark name." URL. Accessed YYYY-MM-DD. Period covered: YYYY-YYYY.}
```
