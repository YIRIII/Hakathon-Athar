# Citation Verification Checklist

Run this checklist before finalizing any BRD, Technical Options file, PRD, or Presentation. Each item must pass. If any item fails, fix it before publishing.

---

## 1. Citation URL Verification (MOST CRITICAL — do this first)

- [ ] **Every cited URL has been ACTUALLY FETCHED** and the claimed number/fact confirmed to appear on that page (not just assumed)
- [ ] For each URL, the **exact quote** containing the claimed data has been recorded
- [ ] No citation bundles multiple claims under one URL when some claims are NOT on that page — split into separate citations
- [ ] Every URL is accessible (not 403, 404, or fully paywalled without noting it)
- [ ] No intermediary/aggregator source is cited as if it were the primary source (unless noted "as cited in")
- [ ] Every Tier 6-7 source (aggregator, comparison site) has a note tracing back to the primary source — or the fact is marked `Confidence: Secondary`
- [ ] No fabricated URLs — every link points to a real, accessible page
- [ ] No fabricated claims — every number can be found on at least one verifiable web page
- [ ] A **Citation Verification Report** has been produced (see SKILL.md Section I for format)
- [ ] Every inline citation URL points to a page containing the **actual claimed number** (not just the organization's other work on the topic)
- [ ] When a number is derived or calculated from a source, the reference entry shows the derivation chain
- [ ] When a reference entry cites multiple sources, the **primary source** (containing the number) is listed first

## 2. Specificity

- [ ] Every statistic includes the **year** the data refers to (not just the publication year)
- [ ] Every statistic includes **geographic scope** (country, region, or "global")
- [ ] Every statistic includes the **source organization** name
- [ ] Population, sample size, or methodology details noted where available
- [ ] No orphan statistics — every number can be traced to a FACT entry in RESEARCH.md

## 3. Derived Figures

- [ ] Every calculated or composite number shows its full calculation in RESEARCH.md
- [ ] Each base input used in calculations has its own FACT entry with a primary source
- [ ] Derived figures are clearly marked as `Confidence: Derived` — never presented as direct quotes
- [ ] Rounding is reasonable and noted (e.g., "~6,400" not "6,400" when derived from 633 × 10)

## 4. Multi-Source Validation

- [ ] **TAM/SAM/SOM** figures have 2+ independent sources (or individual sub-market sources that add up)
- [ ] **Fatality/injury statistics** have 2+ independent sources
- [ ] **Market share claims** have a source (not just assumed from revenue comparison)
- [ ] **Key competitor data** (users, revenue) verified against official company sources (IR pages, SEC filings, press releases)
- [ ] When sources conflict, both values are documented with explanation of the discrepancy
- [ ] Source priority hierarchy followed: government > peer-reviewed > industry > news > aggregator

## 5. Time-Sensitive Data

- [ ] All **vendor pricing** includes a "researched on [YYYY-MM-DD]" stamp
- [ ] All **market size figures** include the reference year (e.g., "$8.9B in 2024")
- [ ] All **growth projections** include the projection period (e.g., "2024–2034 CAGR")
- [ ] All **user count / revenue** figures include the reporting period (e.g., "Q4 2025", "FY 2025")
- [ ] No stale data presented without noting the reference year — a 2019 statistic should not imply it's current

## 6. Technical Options-Specific Checks

- [ ] Every **vendor pricing claim** includes a source URL and "researched on [YYYY-MM-DD]" date
- [ ] Every **benchmark number** (accuracy, latency, throughput) links to the original benchmark source — not a blog summary
- [ ] Every **SDK capability claim** links to official vendor documentation or changelog
- [ ] "Contact Sales" pricing is explicitly noted — not estimated and presented as fact
- [ ] Per-user cost calculations show their math (usage assumptions, pricing tiers, traffic splits)
- [ ] **Vendor acquisition/status changes** are noted (e.g., "acquired by X in YYYY", "deprecated as of YYYY")
- [ ] Claims from **vendor marketing** are distinguished from independent benchmarks/reviews
- [ ] A **Citation Verification Report** has been produced per file (see SKILL.md Section I for format)

## 6b. Pricing Strategy-Specific Checks

- [ ] Every **competitor price** includes a pricing page URL and "researched on [YYYY-MM-DD]" date
- [ ] Every **conversion rate benchmark** cites the original study or report (not a blog summary)
- [ ] Every **churn rate benchmark** cites the original study or report with sample size/methodology noted
- [ ] Every **CAC benchmark** specifies the industry segment, geography, and source year
- [ ] Revenue projections clearly **distinguish sourced assumptions from estimates** — no estimate is presented as a researched fact
- [ ] Each revenue projection assumption is labeled: `(sourced: <reference>)` or `(estimate: <rationale>)`
- [ ] **Unit economics calculations** show full math and trace variable costs to specific TECHNICAL_OPTIONS capability files
- [ ] **LTV calculation** shows: ARPU source, gross margin derivation, churn rate source, and lifetime formula
- [ ] **PPP adjustments** cite the source (World Bank, OECD, IMF) with the reference year
- [ ] **Van Westendorp PSM proxy signals** cite actual competitor pricing or industry research — not fabricated survey data
- [ ] "Contact Sales" enterprise pricing is noted as such — not estimated and presented as fact
- [ ] **Pricing psychology claims** (anchoring effects, charm pricing impact) cite behavioral economics research
- [ ] A **Citation Verification Report** has been produced per phase file (see SKILL.md Section I for format)

## 7. Presentation-Specific Checks

- [ ] Every citation superscript `[N]` links to a URL that **actually contains** the cited number/fact
- [ ] Internal estimates (revenue, pricing, costs, SAM/SOM, growth targets, roadmap, budget) use natural language labels like `(company estimate)` or `(company projection)` — NOT numbered `[N]` citations
- [ ] A **Methodology & Assumptions appendix slide** exists and covers: market sizing derivation, pricing rationale, unit economics breakdown, revenue projection assumptions, budget allocation
- [ ] The appendix slide references external benchmarks where available (e.g., "Conversion benchmarked against Life360 at 2.9%")
- [ ] Product features, roadmap milestones, and pricing tiers have NO citation — they are self-evidently internal
- [ ] References slide shows **source organization name + URL**, not internal document references (not "BRD §2" or "RESEARCH.md")
- [ ] "As cited in" secondary sources are noted on the References slide when the primary source URL is unavailable
- [ ] Citation numbers are consistent — same source reuses the same `[N]` throughout

## 8. Ethical Standards

- [ ] No numbers have been rounded in a misleading direction (e.g., rounding $98M to "$100M+" without noting)
- [ ] No cherry-picked time periods to inflate growth rates
- [ ] Conservative estimates used for projections, not best-case scenarios presented as expected outcomes
- [ ] Limitations and caveats from sources are preserved, not stripped away
- [ ] "Contact Sales" pricing is noted as such, not estimated without clear attribution

---

## Checklist Result

| Section | Pass / Fail | Notes |
|---------|-------------|-------|
| Source Verification | | |
| Specificity | | |
| Derived Figures | | |
| Multi-Source Validation | | |
| Time-Sensitive Data | | |
| Technical Options-Specific | | |
| Pricing Strategy-Specific | | |
| Presentation-Specific | | |
| Ethical Standards | | |


**Overall**: PASS / FAIL

**Reviewer**: [name/agent]
**Date**: [YYYY-MM-DD]
**Document reviewed**: [BRD / TECHNICAL_OPTIONS/NN-capability.md / TECHNICAL_OPTIONS/README.md / PRICING_STRATEGY/NN-phase.md / PRICING_STRATEGY/README.md / PRD / PRESENTATION-xxx.html]
