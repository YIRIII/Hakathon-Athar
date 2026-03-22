# /research-citations

Research any topic with scientific rigor, producing structured fact registries with verified sources, exact quotes, and full traceability.

## When This Skill Is Used

### As a Standalone Slash Command

The user invokes `/research-citations` directly — or asks to research a specific topic for an idea/project. Examples:

- `/research-citations`
- "Research drowsiness detection technical options for GuardianAI"
- "Could you research voice biomarker solutions for IF-H-001"
- "I need verified market data on the PERS industry"

When invoked standalone, follow the **Standalone Research Flow** below.

### As a Methodology Referenced by Other Skills

The following skills reference this methodology during their research phases:

- `/brd-generator` — market research and competitor analysis
- `/business-research` — per-feature competitive analysis and impact assessment
- `/tech-research` — technical options research and vendor evaluation (including all Technical Options capability files)
- `/presentation-generator` — citation verification before generating slides

When referenced by another skill, that skill MUST also run the **Citation URL Verification Protocol** (Section I) before finalizing any output document. This applies to **every document type**: BRD, Technical Options files, PRD, and Presentations.

When referenced by another skill, that skill controls the overall flow. This skill provides the **research protocol, fact documentation standard, and citation formats** that the calling skill must follow.

---

**Context Management (standalone invocations)**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Structure research into per-topic tasks. After completing each research topic and documenting findings, assess whether sufficient context remains for citation verification. If not, save progress and draft a continuation prompt.

## Standalone Research Flow

### 1. Identify the Research Scope

If the user specifies a topic and idea, use those directly. Otherwise, ask:

> **What would you like me to research?**
>
> 1. A specific topic for an existing idea (e.g., "drowsiness detection options for GuardianAI")
> 2. Market research for an existing idea (broad — market size, competitors, trends)
> 3. A standalone research question (not tied to an idea)

For options 1 and 2, read `IDEAS_TRACKER.md` to identify the idea, then read its existing documents (`IDEA.md`, `RESEARCH.md`, `BRD.md`) for context.

### 2. Conduct Research Using the SIFT Protocol

Follow **Section A: Research Protocol** below. Use web search extensively — minimum 5-10 search queries per research topic, varying phrasing and source types.

### 3. Document Findings

- **If researching for an existing idea**: Update or create `ideas/<slug>/RESEARCH.md` using the template from `references/research-template.md`. If a RESEARCH.md already exists, append new fact entries (do not overwrite existing verified facts).
- **If standalone research**: Present findings directly to the user in the structured fact entry format, and offer to save to a file.

### 4. Citation URL Verification (Mandatory)

After documenting all facts, **you MUST visit every cited URL** and confirm the claimed data actually appears on that page. This is not optional — it is the most critical step.

Follow the **Citation URL Verification Protocol** (Section I) below. For each fact:

1. **Fetch/visit the cited URL** (use WebFetch, Playwright, or any available tool)
2. **Search the page** for the exact number, quote, or claim
3. **If FOUND**: Record the exact quote and its location on the page (heading, paragraph, table)
4. **If NOT FOUND**: Search the web to find the actual page where the number appears, then update the citation URL

After verifying all citations, produce a **Citation Verification Report** (see Section I for format).

### 5. Verify and Summarize

Run the **Pre-Publication Verification Checklist** (Section G) against all new fact entries. Present a summary:

> **Research Complete: [Topic]**
>
> **Facts documented**: N entries (N primary, N derived, N unverified)
> **Sources used**: N unique sources
> **Citations verified**: N/N URLs confirmed (N corrected, N flagged)
> **Key findings**: [bullet list]
> **Verification gaps**: [any facts that couldn't be fully verified]
>
> **File updated**: `ideas/<slug>/RESEARCH.md` (or "Presented inline")

---

## A. Research Protocol — SIFT Method

Every research task follows SIFT — adapted from Mike Caulfield's information literacy framework:

### 1. Search

- Use **multiple search queries** per claim — try different phrasings, source types, and date ranges
- Search for the specific number/statistic, not just the topic
- Try both the claim itself AND known authoritative sources for that domain
- Example: For "drowsy driving fatalities," search: `"drowsy driving fatalities" site:nhtsa.gov`, `AAA foundation drowsy driving study`, `"drowsy driving" fatalities per year united states`, `NHTSA drowsy driving statistics 2023`

### 2. Investigate the Source

- Check source authority using the **Source Priority Hierarchy** (Section B)
- Look for: author credentials, organization reputation, methodology disclosure, peer review, potential bias
- Distinguish between: original research, press releases summarizing research, news articles citing research, aggregator sites compiling statistics from multiple sources

### 3. Find the Original Source

- **Never cite an intermediary when you can find the primary source**
- If TheZebra says "according to AAA, 328,000 crashes..." → find the actual AAA Foundation report
- If a news article says "a study found..." → find the actual study (look for DOI, journal name, author names)
- If the primary source is paywalled or unavailable, cite the secondary source with "as cited in" notation
- Trace the citation chain: aggregator → news article → press release → original report/study

### 4. Triangulate

- **Key claims** (TAM, fatality statistics, market size, user counts): require minimum **2 independent sources**
- **Supporting facts** (feature descriptions, pricing, technical specs): 1 authoritative source is acceptable
- **Derived/calculated figures**: show the calculation explicitly; the base inputs each need their own source
- When sources conflict, document both and explain the discrepancy (different year, methodology, scope, definition)

---

## B. Source Priority Hierarchy

When multiple sources are available for the same claim, prefer higher-tier sources:

| Tier | Source Type | Examples | Trust Level |
|------|-----------|----------|-------------|
| 1 | Government agencies | NHTSA, CDC, WHO, BLS, FDA, FCC, Census Bureau | Highest — official data, transparent methodology |
| 2 | Peer-reviewed journals | Papers with DOI, indexed in PubMed/IEEE/ACM | High — peer-reviewed, reproducible |
| 3 | Industry research firms | Gartner, Precedence Research, Grand View Research, MarketsandMarkets | High — paid research, professional methodology |
| 4 | Wire services & press releases | Reuters, AP, GlobeNewsWire, PR Newswire, BusinessWire | Medium-High — direct from companies, but unverified claims |
| 5 | Reputable news/tech outlets | Bloomberg, TechCrunch, AppleInsider, Wired, WSJ | Medium — journalistic standards, but may simplify |
| 6 | Company official pages | Apple IR, Life360 investor relations, vendor pricing pages | Medium — authoritative for that company, but self-serving |
| 7 | Aggregator/comparison sites | TheZebra, Market.us compilations, Statista (without original source link) | Low — useful for discovery, but MUST trace to primary source |

**Rule**: When using Tier 6-7 sources, you MUST note "as cited in [aggregator]" and attempt to find the Tier 1-3 primary source. If the primary source cannot be found, the fact's confidence level drops to "Secondary."

---

## C. Fact Documentation Standard

Every research fact gets a structured entry. Read the full template at `references/research-template.md`.

### Required Fields for Every Fact

| Field | Description | Required |
|-------|------------|----------|
| **Fact ID** | `FACT-[CATEGORY]-[NNN]` (e.g., `FACT-DRW-001` for drowsy driving) | Yes |
| **Claim** | The assertion as it would appear in a BRD/PRD | Yes |
| **Value** | The specific number or statistic | Yes |
| **Year** | Year the data refers to (NOT the publication year, unless they're the same) | Yes |
| **Scope** | Geographic region, population, methodology context | Yes |
| **Confidence** | `Primary` / `Secondary` / `Derived` / `Estimated` / `Unverified` | Yes |
| **Primary Source** | Organization, document title, published year, **direct quote**, URL, access date | Yes |
| **Corroborating Source(s)** | At least 1 for key claims (TAM, fatalities, market size) | For key claims |
| **Derivation** | Step-by-step calculation if Confidence = Derived | If derived |
| **Discrepancies** | Notes if sources conflict | If applicable |

### Confidence Levels

| Level | Definition |
|-------|-----------|
| **Primary** | The exact number appears in a Tier 1-3 source with direct quote verified |
| **Secondary** | The number comes from a Tier 4-7 source, or is cited "as reported by" without finding the original |
| **Derived** | Calculated from one or more primary/secondary facts — calculation shown |
| **Estimated** | Based on reasonable inference but not directly stated in any source (e.g., "1-2% of SAM") |
| **Unverified** | Claimed in documents but could not be traced to any verifiable source — flag for follow-up |

---

## D. Handling Derived/Calculated Figures

When a BRD/PRD needs a number that isn't directly stated in any source:

1. **Show the exact source quote** for the base input(s)
2. **Show the calculation step by step**
3. **Mark as `Confidence: Derived`**
4. **Document each input's own FACT-ID**

Example:
> - Source says: "633 drowsy driving fatalities reported to FARS in 2021" [FACT-DRW-003]
> - AAA Foundation estimates actual drowsy driving fatalities are "approximately 10 times higher than reported" [FACT-DRW-004]
> - Calculation: 633 x 10 = 6,330, rounded to ~6,400
> - Result: "~6,400 drowsy driving fatalities per year (U.S., derived from NHTSA FARS 2021 + AAA Foundation underreporting multiplier)"

**Never present a derived figure as if it came directly from a source.**

---

## E. Handling Conflicting Sources

When two or more sources give different numbers for the same claim:

1. **Document both** with exact quotes and full source metadata
2. **Note the discrepancy** and likely reason:
   - Different reference year (e.g., 2019 data vs. 2023 data)
   - Different methodology (e.g., police reports vs. hospital records vs. survey data)
   - Different scope (e.g., U.S.-only vs. global, fatal crashes vs. all crashes)
   - Different definition (e.g., "drowsy driving" vs. "fatigue-related" vs. "fell asleep at wheel")
3. **In BRD/PRD**: Present as a range "X–Y" with both sources cited, OR use the more authoritative source with a footnote about the alternative figure
4. **Never average** conflicting figures without explaining the methodology and rationale

---

## F. Citation Formats

### In RESEARCH.md

Each fact uses the structured block format from `references/research-template.md`. The Key Sources section at the end provides a bibliography with full metadata.

### In BRD / Technical Options / PRD

- Inline reference: `[FACT-ID]` linking to the corresponding entry in RESEARCH.md
- Each cited number includes: **value, year, scope** in parentheses after the number
- Example: "328,000 drowsy driving crashes annually in the U.S. (AAA Foundation, 2014 data published 2018, U.S. only) [FACT-DRW-001]"
- For derived figures: "~6,400 fatalities/year (derived: NHTSA FARS 2021 × AAA underreporting factor) [FACT-DRW-005]"
- **Technical Options files**: Every vendor price, benchmark number, accuracy claim, and SDK capability must include a source URL. When the URL is a vendor pricing page or benchmark site, include the access date (e.g., "Feb 2026") since these change frequently.

### In Presentations

- **External citations**: `<a href="URL" target="_blank" rel="noopener" class="cite" title="Source Name">[N]</a>` — opens the original source page
- **The URL MUST point to a page that contains the exact quoted text/number**
- If the number appears only on a secondary source, link to the secondary source and note "as cited in" on the References slide
- **References slide**: Proper bibliography format — citation number, organization name, data point description, clickable URL. NOT internal document references like "BRD §2"

#### Internal Estimates Presentation Pattern

Internal estimates (revenue, pricing, costs, SAM/SOM, growth targets, roadmap, budget) must NOT use numbered `[N]` citations — investors expect every `[N]` to be a clickable external source link, and non-clickable ones look broken. Instead, use this two-part pattern:

**Part A — Inline natural language labels** (replaces the old `[N]` markers for internal data):
- **Product features, roadmap, pricing tiers**: No citation or label needed — these are self-evidently the company's own work
- **Financial projections, cost models, revenue targets**: Add `(company projection)` or `(company estimate)` inline, styled subtly (e.g., `<span style="font-size: 0.85rem; opacity: 0.7;">(company estimate)</span>`)
- **Derived market figures (SAM, SOM)**: Add `(company estimate)` inline — the derivation is shown in the appendix

**Part B — Methodology & Assumptions appendix slide** (MANDATORY for every presentation that contains internal estimates):
- This slide is the "proof of work" — it shows **how** each internal figure was derived
- Must cover: market sizing methodology (TAM/SAM/SOM calculation), pricing model rationale with competitive benchmarks, unit economics breakdown (cost components), revenue projection assumptions with conversion rate benchmarks, budget allocation overview
- This is what investors drill into when they want to validate your numbers. Without it, `(company estimate)` labels just raise questions with no answers.
- The appendix slide should reference external benchmarks where possible (e.g., "Conversion benchmarked against Life360 at 2.9%")

**Both parts are mandatory.** The inline label tells the reader "this is our number, not a third-party source." The appendix slide shows the reader "here's how we got that number." One without the other is incomplete — labels without an appendix raise unanswered questions; an appendix without labels leaves readers confused about which numbers are external research vs. internal estimates.

**Note**: The old `cite-internal` CSS class remains in the presentation template for backwards compatibility, but new presentations should not use it.

---

## G. Pre-Publication Verification Checklist

Before finalizing any BRD, Technical Options file, PRD, or Presentation, run the full checklist at `references/citation-checklist.md`. Key checks:

1. Every cited URL has been visited — confirmed the claimed data appears on that page
2. Every statistic has **year + geographic scope**
3. Every derived number shows its calculation in RESEARCH.md
4. Every secondary source is noted with "as cited in"
5. Every vendor price has a "researched on [date]" stamp
6. Key claims (TAM, fatalities, market share) have **2+ independent sources**
7. No fabricated numbers, URLs, or source attributions

---

## I. Citation URL Verification Protocol

**This phase is mandatory.** Every URL cited in RESEARCH.md, BRD, Technical Options files, PRD, or Presentation must be visited and confirmed before the document is considered complete. Skipping this step has historically led to URLs that don't contain the claimed data, fabricated claims, and misattributed sources.

### When to Run

- **After initial research** (Step 4 of the Standalone Research Flow)
- **Before generating a BRD** (called by `/brd-generator`)
- **After completing each Technical Options capability file** (called by `/prd-generator` during the technical research phase) — verify all URLs in the capability file before moving to the next one
- **Before finalizing the Technical Options README** (called by `/prd-generator`) — verify any data points referenced in the executive summary
- **Before generating a PRD** (called by `/prd-generator`)
- **Before generating a Presentation** (called by `/presentation-generator`)
- **On demand** when the user asks to verify citations in existing documents

### Verification Procedure

For **each cited URL** in the document:

1. **Fetch the page** using WebFetch, Playwright, or any available tool. If the page returns a 403/404, note it as inaccessible and search for an alternative URL or archived version.

2. **Search for the exact number or claim** on the fetched page content:
   - Search for the specific number (e.g., "328,000", "$109 billion", "17.6%")
   - Search for key phrases from the attributed quote
   - Check both the main content and any tables, charts, or sidebars

3. **Record the result** as one of:
   - **VERIFIED**: The exact number/claim appears on the page. Record the exact quote.
   - **PARTIALLY VERIFIED**: A related but different number appears (e.g., page says "100,000+" but document says "125,000"). Note the discrepancy.
   - **NOT FOUND**: The number does not appear on the cited page at all.
   - **INACCESSIBLE**: The URL returns an error (403, 404, paywall). Note and try alternative access.

4. **For NOT FOUND citations**, search the web for the actual source:
   - Search for the exact number + topic (e.g., `"328,000" drowsy driving crashes`)
   - Search authoritative domains (e.g., `site:nhtsa.gov`, `site:aaafoundation.org`)
   - Try the citation chain: aggregator → news → press release → original study
   - If found elsewhere, update the citation URL to the correct page
   - If not found anywhere, mark the fact as `Confidence: Unverified` and flag for removal

5. **For PARTIALLY VERIFIED citations**, determine whether:
   - The document's number should be corrected to match the source (preferred)
   - The source supports a range that encompasses the document's number
   - A different source contains the exact number

### Common Issues to Watch For

- **Bundled citations**: One URL cited for multiple claims, but only some appear on that page. **Split into separate citations.**
- **Secondary source attribution**: News article cited instead of the original study. **Trace to the primary source.**
- **Stale URLs**: Pages that have been updated/restructured since research was done. **Search for archived versions or updated URLs.**
- **Fabricated claims**: Numbers or features that cannot be found on any source. **Flag immediately for removal — these are the most dangerous errors in investor-facing documents.**
- **Wording drift**: Source says "positive opinion" but document says "recommend". **Correct the wording to match the source.**

### Derived Attribution & Source Chain Transparency

When verification reveals that a cited number does NOT appear on the linked page, but the number is legitimately derived from or attributed to that organization's work:

1. **The inline citation URL MUST point to the page that contains the actual number** (or the closest available page). If the exact number appears in a PDF report, link to the PDF. If it's on a different page of the same organization, link to that page instead.

2. **The reference entry MUST explain the derivation chain** when the relationship between sources is not obvious. Format: cite the primary source (where the number lives) first, then note the supporting/methodological source. Example:
   ```
   AAA Foundation — 328,000 drowsy driving crashes/yr (2014 prevalence report [PDF]);
   methodology validated by 2018 naturalistic driving study showing 8.8–9.5% prevalence [link]
   ```

3. **If the exact number does NOT appear verbatim on ANY accessible page** (e.g., it was calculated by applying a methodology from one study to data from another), then:
   - The claim text MUST include a derivation indicator: use "~" prefix, or "(derived)" suffix, or "(estimated)" suffix
   - The reference entry MUST show the calculation: "Derived: [base data] × [factor] = [result]"
   - The inline citation should link to the most relevant source AND the reference entry should link to all sources used in the derivation

4. **In presentations specifically**: when the URL an investor would click does NOT contain the headline number, add a brief parenthetical to the reference entry explaining why. The investor should never click a link and feel misled. Transparency is always better than a clean-looking but misleading citation.

### Citation Verification Report Format

After verifying all citations, produce a report in this format:

```markdown
## Citation Verification Report

**Document**: [RESEARCH.md / BRD.md / TECHNICAL_OPTIONS/NN-capability.md / TECHNICAL_OPTIONS/README.md / PRD.md / PRESENTATION-xxx.html]
**Verified by**: Claude (AI-assisted)
**Date**: [YYYY-MM-DD]
**Total citations**: N external, N internal

### Results Summary

| # | Citation | URL | Claim | Status | Issue | Fix Applied |
|---|---------|-----|-------|--------|-------|-------------|
| 1 | [1] | trafficsafety.ny.gov/... | $109B annually | VERIFIED | — | — |
| 2 | [1] | trafficsafety.ny.gov/... | 328K crashes/yr | NOT FOUND | Number from AAA Foundation, not NY GTSC | URL changed to aaafoundation.org/... |
| ... | ... | ... | ... | ... | ... | ... |

### Critical Issues (if any)
- [List any fabricated claims, fundamentally wrong numbers, or claims that could not be sourced anywhere]

### Corrections Applied
- [List every change made: URL updates, number corrections, citation splits, claim removals]
```

### Severity Classification

When reporting issues, classify by severity:

| Severity | Definition | Action Required |
|----------|-----------|-----------------|
| **CRITICAL** | Fabricated claim (no source exists), fundamentally wrong number, or grossly misleading attribution | Immediate removal or correction. Block publication until fixed. |
| **HIGH** | Number not on cited page but exists elsewhere, or significant wording drift | Update citation URL. Correct wording. |
| **MEDIUM** | Multi-source composite attributed to single URL, or minor number discrepancy | Add multi-source attribution. Note the discrepancy. |
| **LOW** | Minor wording difference ("43%" vs "over 43%"), or outdated but directionally correct data | Note in report. Optional correction. |

---

## H. Category Prefixes for Fact IDs

Use these standard category prefixes, or create new ones as needed:

| Prefix | Category |
|--------|---------|
| `MKT` | Market size, growth rates, CAGR |
| `CMP` | Competitor data (users, revenue, pricing, market share) |
| `DRW` | Drowsy driving / fatigue statistics |
| `SAF` | Personal safety statistics |
| `OUT` | Outdoor / hiking / SAR statistics |
| `MED` | Medical alert / PERS statistics |
| `TEC` | Technical feasibility data (accuracy, benchmarks) |
| `REG` | Regulatory data |
| `FIN` | Financial data (pricing, costs, revenue) |
| `USR` | User behavior / willingness to pay |
| `VEN` | Vendor-specific data (SDK capabilities, pricing) |
| `INS` | Insurance / UBI data |
| `VOI` | Voice biomarker data |
| `FLT` | Fleet management / telematics data |

## Modifiers

### help
Usage: `/research-citations help`

**research-citations** — No description

Available modifiers:
- `help` — Show this help message
