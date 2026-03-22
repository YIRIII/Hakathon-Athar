# Business Analysis Template

This template defines the structure for per-feature business research. Every idea uses the folder format for consistency and resumability.

```
BUSINESS_RESEARCH/
├── README.md                    # Research progress tracker + scoring + strategy
├── 01-feature-name.md           # Per-feature competitive analysis
├── 02-feature-name.md
├── ...
└── NN-feature-name.md
```

---

## README / Executive Summary Structure

```markdown
# Business Research: <Idea Name>

**Version**: 1.0
**Date**: <YYYY-MM-DD>
**Status**: Draft | Complete
**Author**: Idea Forge (AI-Generated)
**BRD Reference**: [INITIAL-BRD.md](preparation/INITIAL-BRD.md)
**Evaluation Context**: <Hackathon / Investor Pitch / Government RFP / Customer Acquisition / Other>

---

## Research Progress

| # | Feature | BR ID | File | Status | Updated |
|---|---------|-------|------|--------|---------|
| 1 | <Name> | BR-1 | [01-name.md](01-name.md) | pending / complete | <date> |
| 2 | <Name> | BR-2 | [02-name.md](02-name.md) | pending / complete | <date> |

---

## Competitive Landscape Summary

| BR ID | Feature | Competitors | Novelty Rating | Key Gap |
|-------|---------|-------------|----------------|---------|
| BR-1 | <Name> | <count> | novel / incremental / saturated | <1-line gap> |
| BR-2 | <Name> | <count> | novel / incremental / saturated | <1-line gap> |

---

## Impact Severity Matrix

| BR ID | Feature | Severity | Rationale |
|-------|---------|----------|-----------|
| BR-1 | <Name> | Life-threatening / Safety risk / Major inconvenience / Minor inconvenience | <Why> |
| BR-2 | <Name> | | |

**Severity Scale:**
- **Life-threatening**: Absence directly risks lives
- **Safety risk**: Absence creates significant safety hazard
- **Major inconvenience**: Absence causes significant user friction or exclusion
- **Minor inconvenience**: Absence is noticeable but users can work around it

---

## Stakeholder Criteria & Scoring Framework

### Evaluation Context

<Description of who will evaluate this idea and in what context. Research-backed
understanding of what they look for.>

### Scoring Factors

| Factor | Weight | Rationale |
|--------|--------|-----------|
| <Factor 1> | <N%> | <Research-backed justification> |
| <Factor 2> | <N%> | |
| <Factor 3> | <N%> | |
| <Factor 4> | <N%> | |
| <Factor 5> | <N%> | |
| <Factor 6> | <N%> | |
| **Total** | **100%** | |

---

## Feature Scoring Matrix

### Scores (1-5 scale per factor)

| BR ID | Feature | <Factor 1> | <Factor 2> | <Factor 3> | <Factor 4> | <Factor 5> | <Factor 6> | Weighted Score | Rank |
|-------|---------|------------|------------|------------|------------|------------|------------|----------------|------|
| BR-1 | <Name> | <score> | <score> | <score> | <score> | <score> | <score> | <weighted> | <rank> |

### Score Rationales

#### BR-1: <Feature Name>

| Factor | Score | Rationale |
|--------|-------|-----------|
| <Factor 1> | <1-5> | <Brief justification> |
| <Factor 2> | <1-5> | <Brief justification> |

#### BR-2: <Feature Name>

<Same structure as above>

---

## Prioritized Feature Ranking

| Rank | BR ID | Feature | Weighted Score | Tier | Novelty | Impact Severity |
|------|-------|---------|----------------|------|---------|-----------------|
| 1 | BR-X | <Name> | <score> | Hero | <rating> | <severity> |
| 2 | BR-X | <Name> | <score> | Hero | <rating> | <severity> |
| 3 | BR-X | <Name> | <score> | Depth | <rating> | <severity> |
| N | BR-X | <Name> | <score> | Skip | <rating> | <severity> |

**Tier Definitions:**
- **Hero** (top 1-2): Headline features — maximum tech research depth and demo/pitch prominence
- **Depth** (next 2-3): Strong supporting features — thorough tech research
- **Supporting** (next 2-3): Nice-to-have — standard tech research
- **Skip** (remaining): Low priority — lightweight tech research only

---

## Business Model Validation

<Does the competitive landscape support the BRD's revenue model?>

- **Pricing viability**: Do competitors charge similar amounts?
- **Revenue model fit**: Is the proposed model common in this space?
- **Unit economics**: Do competitive findings affect cost/revenue assumptions?
- **Recommended adjustments**: Any changes needed?

---

## Go-to-Market Assessment

- **Market entry point**: Where to start given competitive density
- **Differentiation strategy**: How to position against existing players
- **Channel strategy**: How competitors acquire users
- **Timeline considerations**: Market windows, regulatory timelines

---

## Regulatory Deep-Dive

- **New regulatory findings**: Regulations competitors must comply with
- **Compliance gaps**: Requirements not addressed in the initial BRD
- **Regulatory advantages**: Regulations that create barriers for competitors

---

## Strategic Recommendations

### Feature Prioritization for Tech Research

| Tier | Features | Research Depth | Rationale |
|------|----------|----------------|-----------|
| Hero | <BR-IDs> | Maximum | <Why top priority> |
| Depth | <BR-IDs> | Thorough | <Why these matter> |
| Supporting | <BR-IDs> | Standard | <Why included but lower> |
| Skip | <BR-IDs> | Lightweight | <Why deprioritized> |

### Recommended Pitch/Demo Order

| Order | Feature | One-Liner Pitch | Why This Order |
|-------|---------|----------------|----------------|
| 1 | <Name> | <Compelling one-liner> | <Opens strong> |
| 2 | <Name> | <Compelling one-liner> | <Builds on...> |

### Build Allocation (if time-constrained)

| Priority | Feature | Estimated Effort | Notes |
|----------|---------|-----------------|-------|
| P0 | <Name> | <effort> | Must build for viability |
| P1 | <Name> | <effort> | Important for differentiation |

### Key Strategic Insights

1. <Insight 1>
2. <Insight 2>
3. <Insight 3>

---

*This business research was generated by Idea Forge using competitive research data.
Feature prioritization should be validated with stakeholders before proceeding.*
```

---

## Per-Feature Competitive Analysis Structure

Each per-feature file follows this structure:

```markdown
# <Feature Name>

**Linked BRD Requirement**: BR-X
**BRD Reference**: [INITIAL-BRD.md](../preparation/INITIAL-BRD.md) — Section N
**Priority (BRD)**: Must Have / Should Have / Nice to Have

---

## 1. Feature Context

<What this feature does according to the BRD. Quote the specific BR requirement.
Why it matters to the overall product.>

## 2. Competitive Landscape

### Direct Competitors

| Competitor | Product | What They Do | Target Audience | Pricing | Strengths | Weaknesses |
|-----------|---------|-------------|-----------------|---------|-----------|------------|
| <Name> | <Product> | <Description> | <Audience> | <Pricing> | <Strengths> | <Weaknesses> |

### Adjacent / Partial Solutions

| Solution | How It Partially Addresses This Need | Gap Remaining |
|----------|--------------------------------------|--------------|
| <Name> | <Description> | <What's missing> |

### Open-Source / Academic Approaches

| Project / Paper | Description | Maturity | Limitations |
|----------------|-------------|----------|-------------|
| <Name> | <What it does> | <Production-ready / Research / Prototype> | <Limitations> |

## 3. Gap Analysis

<What specific gap remains that this idea would fill? Why don't existing solutions
fully address the BRD requirement? Consider: geographic gaps, audience gaps,
capability gaps, pricing gaps, integration gaps.>

## 4. Novelty Assessment

**Rating**: `novel` / `incremental` / `saturated`

**Rationale**: <Why this rating — based on the competitive data above. How many
competitors exist, how strong they are, and how different this idea's approach is.>

## 5. Key Sources

<Bibliography of sources used in this analysis, with URLs and access dates.>
```

---

## Research Guidelines

When generating per-feature competitive analysis:

1. **Search exhaustively**: For each feature, search for all competitors — commercial products, open-source projects, academic research, and adjacent solutions. Do not stop at the first 3-4 found.

2. **Real data only**: Use actual competitor pricing, feature lists, and market positioning. Never fabricate company names or product details.

3. **Cite sources**: Include links to competitor websites, product pages, and review sites inline throughout.

4. **Date-stamp research**: Note when competitive data was gathered, as markets change frequently.

5. **Consider geographic context**: Some features may have strong competitors globally but gaps in the target market (e.g., Saudi Arabia, MENA region).

6. **BRD alignment**: Focus the gap analysis on whether competitors meet the specific BRD requirement, not just whether they exist in the general space.
