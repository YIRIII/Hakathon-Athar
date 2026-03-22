# Technical Options Analysis Template

This template defines the structure for exhaustive technical options analysis. Every idea uses the folder format for consistency and resumability.

```
TECHNICAL_OPTIONS/
├── README.md                    # Research progress tracker + executive summary & strategy overview
├── 01-capability-name.md        # Per-capability analysis
├── 02-capability-name.md
├── ...
└── NN-capability-name.md
```

---

## README / Executive Summary Structure

```markdown
# Technical Options Analysis: <Idea Name>

**Version**: 1.0
**Date**: <YYYY-MM-DD>
**Status**: Complete
**Author**: Idea Forge (AI-Generated)
**BRD Reference**: [BRD.md](../BRD.md)
**PRD Reference**: [PRD.md](../PRD.md)

---

## Research Progress

| # | Capability | File | Status | Updated |
|---|-----------|------|--------|---------|
| 1 | <Name> | [01-name.md](01-name.md) | pending / complete | <date> |
| 2 | <Name> | [02-name.md](02-name.md) | pending / complete | <date> |

---

## Executive Summary

<2-3 paragraphs: Total capabilities analyzed, total options researched across all
capabilities, the overall strategic recommendation (build-heavy, partner-heavy, or
hybrid), estimated cost/timeline impact of the chosen approach vs alternatives, and
key vendor engagements needed.>

## Strategy Overview

| # | Capability | Recommended Option | Approach | Est. Year 1 Cost (Range) | Linked BRs |
|---|-----------|-------------------|----------|-------------------------|------------|
| 1 | <Name> | <Recommended> | Build / License / Partner / Integrate | $X–$Y | BR-N |
| 2 | <Name> | <Recommended> | Build / License / Partner / Integrate | $X–$Y | BR-N |

## Capability Analyses

| # | Capability | File | Options Researched | Top 5 Shortlisted |
|---|-----------|------|--------------------|-------------------|
| 1 | <Name> | [01-capability-name.md](01-capability-name.md) | <count> | <count> |
| 2 | <Name> | [02-capability-name.md](02-capability-name.md) | <count> | <count> |

## Partnership Strategy Summary

### Recommended Vendor Engagements

| Vendor | Capability | Engagement Type | Priority | Est. Annual Cost | Next Step |
|--------|-----------|-----------------|----------|-----------------|-----------|
| <Name> | <Capability> | License / Partner / Integrate | Must Have / Should Have / Nice to Have | $X/year | <action> |

### Build In-House Summary

| Capability | Rationale for Building | Est. Effort | Key Dependencies |
|-----------|----------------------|-------------|-----------------|
| <Name> | <Why build instead of buy> | <person-months> | <deps> |

### Abstraction Layer Strategy

<How to architect vendor integrations with abstraction layers to enable future
swapping. Specific interface/adapter patterns recommended. This protects against
vendor lock-in and makes it possible to switch from a licensed SDK to a custom
implementation (or vice versa) without rewriting the consuming code.>

## Cost Impact Summary

| Approach | Est. Year 1 Cost (Range) | Time-to-Market | Risk Level | Notes |
|----------|-------------------------|----------------|------------|-------|
| All Build (in-house) | $X–$Y | X months | <level> | <tradeoffs> |
| All Partner/License | $X–$Y | X months | <level> | <tradeoffs> |
| **Recommended Hybrid** | **$X–$Y** | X months | <level> | <tradeoffs> |

## Open Questions & Next Steps

| ID | Question | Impact | Recommended Action |
|----|----------|--------|-------------------|
| TOQ-1 | <question> | <what it affects> | <action> |
```

---

## Per-Capability Analysis Structure

Each capability analysis follows this structure:

```markdown
# <Capability Name>

**Linked BRD Requirements**: BR-X, BR-Y
**BRD Reference**: [BRD.md](../BRD.md) — Section N
**Priority**: Must Have / Should Have / Nice to Have

---

## 1. Context & BRD Alignment

<Why this capability is needed. What the BRD specifically requires (quote relevant
BR requirements). What constraints the BRD places on this capability (performance
targets, cost limits, accuracy thresholds). How this capability fits into the overall
product architecture.>

## 2. Capability-Specific KPIs

Define KPIs that are **specific and measurable** for this capability. Do NOT use
generic criteria — derive KPIs from the BRD requirements and the nature of the
capability.

| KPI | Description | BRD Target | Weight |
|-----|-------------|------------|--------|
| <KPI-1> | <what it measures> | <target from BRD or derived> | <High/Medium/Low> |
| <KPI-2> | <what it measures> | <target from BRD or derived> | <High/Medium/Low> |

Example for drowsiness detection:
- Sensitivity (true positive rate) — BRD target: ≥80%
- Specificity (true negative rate) — BRD target: ≥90%
- Inference speed (FPS on mobile) — derived: ≥15 FPS
- Model size (on-device) — derived: <50MB
- Supported conditions (lighting, sunglasses, angles)
- Battery drain per hour of active use
- Integration complexity (SDK vs raw model)
- Year 1 licensing/development cost

## 3. Market Landscape

<Overview of the market for this capability. How mature is the technology? Who are
the major players? What trends are shaping the space? This sets context before diving
into individual options.>

### All Viable Options Identified

Research and list **every viable option** found. This may be 3 options or 15 — do
not artificially limit. Include:
- Commercial SDKs and platforms
- Open-source libraries and models
- Build-from-scratch approaches
- Hybrid approaches (open-source base + custom training)

## 4. Full Options Rating

Rate **every option** against the defined KPIs. Use real data from research —
not estimates. When data is unavailable, mark as "N/A" or "Contact Sales" and note
the gap.

| Option | <KPI-1> | <KPI-2> | <KPI-3> | ... | Overall Score |
|--------|---------|---------|---------|-----|---------------|
| <Option A> | <value> | <value> | <value> | | <score> |
| <Option B> | <value> | <value> | <value> | | <score> |

Scoring methodology: Rate each KPI on a 1-5 scale (1=poor, 5=excellent) weighted
by KPI importance. Overall score = weighted average.

## 5. Top Recommended Options

Select the top options (up to 5) based on overall score. For each, provide a detailed profile:

### Option 1: <Name> ⭐ Recommended

- **Approach**: Build / License / Partner
- **Provider**: <company or open-source project>
- **Overview**: <what it is, how it works>
- **KPI Performance**:
  - <KPI-1>: <detailed value with source>
  - <KPI-2>: <detailed value with source>
- **Pricing**: <detailed pricing model with source>
- **Pros**:
  - <pro 1>
  - <pro 2>
- **Cons**:
  - <con 1>
  - <con 2>
- **Integration Notes**: <how it integrates, SDK details, API docs, dependencies>
- **BRD Alignment**: <how this option supports/enhances BRD requirements>

### Option 2: <Name>

<Same structure as above>

### Option 3: <Name>

<Same structure as above>

## 6. Non-Recommended Options

All remaining researched options that didn't make the top list. Users can see the
full landscape and understand why each was excluded.

| Option | Type | Reason Not Recommended |
|--------|------|----------------------|
| <Name> | <Commercial/OSS/Custom> | <specific reason: e.g., "Enterprise-only, minimum 10K vehicles", "Discontinued in 2024", "No mobile SDK", "Pricing starts at $50K/year"> |
| <Name> | <Commercial/OSS/Custom> | <specific reason> |

## 7. Recommendation

**Recommended: <Option Name>**

<Detailed rationale for the recommendation:
- How it best satisfies the BRD requirements (reference specific BR IDs)
- Cost justification relative to budget
- Time-to-market advantage
- Risk assessment
- Conditions that would change this recommendation (e.g., "If budget drops below $X,
  switch to Option Y" or "If vendor raises prices above $X/month, fallback to Option Z")
- Migration path if the recommendation needs to change later>

## 8. Mini Case Study (if applicable)

<Real-world example of the recommended option (or a comparable deployment) being
used successfully. Include: who used it, what they achieved, relevant metrics.
If no directly relevant case study exists, note this and explain why the
recommendation still holds based on available evidence.>

---

*Sources and citations should be included inline throughout the document.
All pricing data should include the date it was researched and a note that
it should be validated through direct vendor engagement.*
```

---

## Research Guidelines

When generating the Technical Options Analysis:

1. **Exhaustive search**: For each capability, search for all viable options — commercial SDKs, open-source projects, academic implementations, and build-from-scratch approaches. Do not stop at the first 3-4 options found.

2. **Real data only**: Use actual vendor pricing, published benchmarks, and documented capabilities. Never fabricate numbers. When pricing requires "contact sales," note this explicitly and provide industry estimates with clear attribution.

3. **Cite sources**: Include links to pricing pages, documentation, benchmark papers, and case studies inline throughout.

4. **Date-stamp pricing**: Vendor pricing changes frequently. Note when pricing was researched and recommend revalidation before procurement.

5. **Distinguish vendor claims vs independent validation**: When citing accuracy or performance numbers, clearly state whether they come from the vendor's marketing materials or independent third-party testing.

6. **Consider the startup context**: Evaluate options not just on technical merit but on startup viability — pricing tiers for small teams, minimum commitments, scalability from 0 to 100K users, and contract flexibility.

7. **BRD alignment is paramount**: Every recommendation must be justified against specific BRD requirements. The best technical option isn't always the best business option.
