# Options Rating Matrix — Shared Methodology

This document defines the standard methodology for evaluating and comparing options across all Idea Forge research skills (supporting-systems, tech-research, pricing-strategy, etc.). All skills that compare multiple solutions MUST follow this methodology.

---

## When to Use

Use this methodology whenever you are comparing 3+ options (vendors, tools, approaches, packages) to make a recommendation. This includes:
- Technical options for capabilities (tech-research)
- Supporting system solutions (supporting-systems)
- Pricing model comparisons (pricing-strategy)
- Any other research that involves choosing between alternatives

---

## Step 1: Define System-Specific KPIs

Create KPIs that capture every performance dimension that could meaningfully differentiate the options being compared. Do not artificially limit the number — use as many KPIs as needed to make a well-informed decision. Typically this is 5-12, but complex systems may need more.

**KPI Definition Table:**

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| <KPI Name> | <What this measures — be specific> | High (3x) / Medium (2x) / Low (1x) | <Why this KPI matters for this specific system/product> |

**Weight assignment rules:**
- **High (3x)**: KPIs that directly affect core product functionality, revenue, compliance, or are must-have requirements from the BRD
- **Medium (2x)**: KPIs that affect efficiency, user experience, or operational quality but aren't blockers
- **Low (1x)**: KPIs that are nice-to-have differentiators, future-proofing, or affect edge cases

**KPI design principles:**
- KPIs must be specific to the system being evaluated, not generic (e.g., "Saudi payment method support" not just "payment support")
- Each KPI should differentiate at least 2 options — if all options score the same on a KPI, it's not useful
- Include at least one cost-related KPI (Year 1 cost, cost at scale, or TCO)
- Include at least one integration/effort KPI (how hard is it to implement with the existing stack?)
- If the product has existing infrastructure relevant to this system, include a "migration effort" or "compatibility with existing stack" KPI

---

## Step 2: Score All Options

Rate every researched option against every KPI on a 1-5 scale:

| Score | Meaning |
|-------|---------|
| 1 | Poor — doesn't meet the requirement, or significant drawback |
| 2 | Below average — partially meets requirement with notable limitations |
| 3 | Adequate — meets the basic requirement but nothing special |
| 4 | Good — meets requirement well with some advantages |
| 5 | Excellent — exceeds requirement, best-in-class for this KPI |

**Scoring rules:**
- Score based on **facts from research**, not assumptions. If you couldn't find data for a KPI, note it and score conservatively (2-3).
- ALL options must be scored — commercial SaaS, open-source, build from scratch, ready-made packages, and the bootstrap/MVP approach
- Include the existing/current solution as an option if one exists (don't auto-score it high — evaluate honestly)

**Scoring Matrix Format:**

| Option | <KPI 1> (3x) | <KPI 2> (3x) | <KPI 3> (2x) | <KPI 4> (2x) | <KPI 5> (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| <Option A> | X | X | X | X | X | **X.XX** |
| <Option B> | X | X | X | X | X | **X.XX** |

---

## Step 3: Calculate Weighted Scores

**Formula**: `Weighted Score = Σ(score × weight) / Σ(weights)`

Example with weights High(3x), High(3x), Medium(2x), Low(1x):
- Scores: 5, 4, 3, 2
- Weighted: (5×3 + 4×3 + 3×2 + 2×1) / (3+3+2+1) = (15+12+6+2) / 9 = 3.89

---

## Step 4: Recommendation

- The **highest-scoring option** should be the recommendation unless there's a strong reason to override
- If overriding the top scorer, you MUST explain why (e.g., "Option A scored highest but requires a technology stack the product doesn't use")
- If the top 2 options are within 0.2 points, call it a tie and let the cost or risk profile decide
- Always note the **runner-up option** as the alternative

---

## Step 5: Score Rationales (for top 3 options)

For each of the top 3 scoring options, provide a brief rationale table:

| KPI | Score | Rationale |
|-----|-------|-----------|
| <KPI 1> | X | <Why this score — reference specific features, pricing, or limitations> |

This ensures the scoring is transparent and auditable.
