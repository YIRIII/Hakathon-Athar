# Research Notes — [Idea Name]

**Last Updated**: [YYYY-MM-DD]
**Researcher**: Claude (AI-assisted)
**Idea Slug**: `[slug]`
**Idea ID**: [IF-XXX]

---

## Research Methodology

- **Search period**: [start date] to [end date]
- **Primary search tools**: Web search, academic databases, vendor documentation
- **Verification method**: SIFT (Search, Investigate source, Find original, Triangulate)
- **Source priority**: Government > Peer-reviewed > Industry research > Wire services > News > Company pages > Aggregators

---

## Fact Registry

<!--
  Each fact gets a structured entry below.

  FACT ID format: FACT-[CATEGORY]-[NNN]
  Categories: MKT (market), CMP (competitor), DRW (drowsy driving), SAF (safety),
  OUT (outdoor), MED (medical), TEC (technical), REG (regulatory), FIN (financial),
  USR (user behavior), VEN (vendor), INS (insurance), VOI (voice biomarker), FLT (fleet)

  Confidence levels:
  - Primary: Exact number found in Tier 1-3 source with direct quote
  - Secondary: From Tier 4-7 source, or "as cited in" without finding original
  - Derived: Calculated from other facts — must show calculation
  - Estimated: Reasonable inference, not directly stated in any source
  - Unverified: Claimed but cannot be traced to a verifiable source
-->

### FACT-[CAT]-[NNN]: [Brief description of the claim]

| Field | Value |
|-------|-------|
| **Claim** | [The assertion as it would appear in a BRD/PRD] |
| **Value** | [The specific number or statistic] |
| **Year** | [Year the data refers to — NOT publication year unless same] |
| **Scope** | [Geographic region, population, methodology context] |
| **Confidence** | Primary / Secondary / Derived / Estimated / Unverified |

**Primary Source:**
- **Organization**: [e.g., NHTSA, AAA Foundation, Precedence Research]
- **Document**: [Report title, page title, or specific section]
- **Published**: [Year published or "Last updated YYYY"]
- **Direct Quote**: "[Copy the exact sentence(s) from the source containing this number. Use quotation marks. If the quote is long, include only the relevant portion with [...] for omissions.]"
- **URL**: [Full URL — must be the page containing the above quote]
- **Accessed**: [YYYY-MM-DD]

**Corroborating Source(s):**
- [Source 2 organization] ([year]): "[exact quote]" — [URL] (accessed [YYYY-MM-DD])
- [Source 3 organization] ([year]): "[exact quote]" — [URL] (accessed [YYYY-MM-DD])

**Derivation** *(include only if Confidence = Derived)*:
- Input 1: "[exact quote from source]" [FACT-ID of input]
- Input 2: "[exact quote from source]" [FACT-ID of input]
- Calculation: [show math step by step]
- Result: [derived value with appropriate rounding]

**Discrepancies** *(include only if sources conflict)*:
- [Source A] reports [value A] ([year], [scope]) because [reason for difference]
- [Source B] reports [value B] ([year], [scope]) because [reason for difference]
- **Resolution**: [Which value is used in BRD/PRD and why, or presented as range]

---

<!-- Repeat the above block for each fact. Group facts by category with section headers: -->

<!-- ## Market Size & Growth Facts -->
<!-- ## Competitor Data -->
<!-- ## Safety & Problem Statistics -->
<!-- ## Technical Feasibility Data -->
<!-- ## Regulatory Data -->
<!-- ## User Behavior & Willingness to Pay -->

---

## Key Sources Bibliography

| # | Organization | Document/Page | Year | URL | Accessed | Tier | Facts Referenced |
|---|-------------|--------------|------|-----|----------|------|-----------------|
| 1 | [org] | [title] | [year] | [url] | [YYYY-MM-DD] | [1-7] | FACT-XXX-001, FACT-XXX-002 |
| 2 | [org] | [title] | [year] | [url] | [YYYY-MM-DD] | [1-7] | FACT-XXX-003 |

---

## Verification Summary

| Category | Total Facts | Primary | Secondary | Derived | Estimated | Unverified |
|----------|------------|---------|-----------|---------|-----------|------------|
| Market | | | | | | |
| Competitor | | | | | | |
| Safety | | | | | | |
| Technical | | | | | | |
| **Total** | | | | | | |

**Verification gaps** *(facts that need follow-up)*:
- [ ] [FACT-ID]: [description of what's missing or unverified]
