# Risk Assessment Template

## README.md Structure

```markdown
# Risk Assessment — {Idea Name}

**Idea**: {slug}
**Date**: {YYYY-MM-DD}
**Status**: In Progress / Complete
**Recommendation**: Pending / Go / Conditional-Go / No-Go / Defer

## Assessment Scope

| Document | Available | Key Input |
|----------|-----------|-----------|
| BRD | Yes/No | {what it contributes to risk analysis} |
| Business Research | Yes/No | |
| Supporting Systems | Yes/No | |
| Marketing Strategy | Yes/No | |
| Technical Options | Yes/No | |
| Pricing Strategy | Yes/No | |
| Customer Validation | Yes/No | |
| Budget Context | Yes/No | |

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

---

## Risk Register

| ID | Risk | Category | L | I | Score | Level | Mitigation | Residual | Status |
|----|------|----------|---|---|-------|-------|------------|----------|--------|
| R-001 | {description} | {cat} | {1-5} | {1-5} | {L×I} | Critical/High/Medium/Low | {summary action} | {post-mitigation score} | Open/Mitigated/Accepted |

### Scoring Reference

**Likelihood**: 1=Rare (<10%), 2=Unlikely (10-30%), 3=Possible (30-60%), 4=Likely (60-80%), 5=Almost Certain (>80%)
**Impact**: 1=Negligible (<5%), 2=Minor (5-10%), 3=Moderate (10-25%), 4=Major (>25%), 5=Catastrophic (business failure)
**Score**: L × I → Critical (20-25), High (12-19), Medium (6-11), Low (1-5)

---

## Risk Heat Map

|  | Negligible (1) | Minor (2) | Moderate (3) | Major (4) | Catastrophic (5) |
|---|---|---|---|---|---|
| **Almost Certain (5)** | | | | | |
| **Likely (4)** | | | | | |
| **Possible (3)** | | | | | |
| **Unlikely (2)** | | | | | |
| **Rare (1)** | | | | | |

---

## Risk Profile Summary

| Metric | Value |
|--------|-------|
| Total risks identified | |
| Critical | |
| High | |
| Medium | |
| Low | |
| Mitigable (Critical+High with feasible plans) | /  |
| Residual critical risks (after mitigation) | |

---

## Mitigation Plans

### R-{ID}: {Risk Name} (Critical/High)

- **Description**: {What could happen}
- **Root Cause**: {Why this risk exists}
- **Strategy**: Avoid / Reduce / Transfer / Accept
- **Actions**:
  1. {Specific, concrete step}
  2. {Step with timeline}
  3. {Step with cost estimate}
- **Cost of Mitigation**: {estimate, reference budget tier if available}
- **Residual Risk**: L={new} × I={new} = {score} ({level})
- **Early Warning Trigger**: {what signal to watch for}
- **Owner**: {role}
- **Timeline**: {when — pre-launch / Month 1 / Quarter 1}

{Repeat for each Critical and High risk}

---

## Go / No-Go Assessment

### Recommendation: {Go / Conditional-Go / No-Go / Defer}

**Rationale**: {2-3 sentences summarizing the evidence-based reasoning}

### Conditions (if Conditional-Go)

| # | Condition | Must Be Met By | Risk It Addresses |
|---|-----------|---------------|-------------------|
| 1 | {condition} | {timeline} | R-{ID} |

### Impact on Pipeline Documents

| Document | Adjustment Needed | Details |
|----------|------------------|---------|
| BRD | Yes/No | {what to change} |
| PRD | Yes/No | {risk sections to include} |
| Pricing Strategy | Yes/No | {unit economics impact} |
| Marketing Strategy | Yes/No | {GTM adjustments} |
| Budget | Yes/No | {mitigation costs to add} |
```

---

## Per-Category File Structure (NN-category.md)

```markdown
# {Category Name} — {Idea Name}

**Category**: {N} of 8
**Date**: {YYYY-MM-DD}
**Risks Identified**: {count}

## Context

{Brief description of what upstream documents informed this analysis}

## Identified Risks

### R-{ID}: {Risk Title}

**Description**: {What could happen — specific and measurable}

**Likelihood**: {1-5} — {Level name}
**Rationale**: {Why this likelihood rating — cite evidence}

**Impact**: {1-5} — {Level name}
**Rationale**: {Why this impact rating — cite evidence}

**Risk Score**: {L × I} — **{Level}**

**Evidence & Research**:
- {Finding from web research with citation}
- {Comparable failure/incident with citation}
- {Industry benchmark or statistic with citation}

**Mitigation Options**:
1. **{Strategy type}**: {Specific action} — Est. cost: {range} | Reduces to: L={new} × I={new}
2. **{Alternative strategy}**: {Action} — Est. cost: {range} | Reduces to: L={new} × I={new}

**Recommended Mitigation**: Option {N} — {brief rationale}

**Early Warning Signals**:
- {Observable signal that this risk is materializing}
- {Metric or event to monitor}

**Dependencies**: {Does this risk affect or depend on other risks?}

---

{Repeat for each risk in this category}

## Category Summary

| ID | Risk | L | I | Score | Level | Recommended Mitigation |
|----|------|---|---|-------|-------|----------------------|
| R-{ID} | {name} | {L} | {I} | {score} | {level} | {action} |

**Key Takeaway**: {1-2 sentences on the overall risk posture for this category}
```

---

## Risk ID Convention

- Risk IDs are sequential across all categories: R-001, R-002, etc.
- Each category file assigns IDs in sequence as risks are identified
- The README consolidates all IDs into the master register
- IDs are never reused — if a risk is removed, its ID is retired

## Research Quality Standards

- **Every likelihood and impact score must have a rationale** — no arbitrary scoring
- **Cite sources** for failure rates, regulatory requirements, industry benchmarks
- **Use comparable failures** — find real examples of similar products/companies that faced this risk
- **Quantify where possible** — "30% of SaaS startups fail due to poor product-market fit (CB Insights, 2023)" is better than "many startups fail"
- **Distinguish facts from estimates** — clearly mark when a probability is estimated vs. sourced
