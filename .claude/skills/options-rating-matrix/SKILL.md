# Options Rating Matrix

Standardized methodology for evaluating and comparing multiple options (vendors, tools, approaches, packages) to make data-driven recommendations. Referenced by all Idea Forge research skills that compare solutions — supporting-systems, tech-research, pricing-strategy, business-research. Use this methodology whenever comparing 3+ options to select a recommendation.

## When to Use

Any research skill that compares multiple solutions to make a recommendation should follow this methodology. This includes:
- Technical options for capabilities (`/tech-research`)
- Supporting system solutions (`/supporting-systems`)
- Revenue model and pricing comparisons (`/pricing-strategy`)
- Feature competitive landscape (`/business-research`)
- Any other research that involves choosing between alternatives

The methodology applies whenever there are 3+ viable options to compare. For binary choices (e.g., build vs. buy with no third option), a simpler pros/cons analysis may suffice — but if in doubt, use the matrix anyway since it forces structured thinking.

---

## Step 1: Define Evaluation KPIs

Create KPIs that capture every performance dimension that could meaningfully differentiate the options being compared. The number of KPIs is adaptive — use as many as needed to make a well-informed decision. Simple systems might need 5-6 KPIs; complex enterprise systems with compliance, integration, and scaling concerns might need 12+. The goal is completeness, not brevity.

### KPI Definition Table

| KPI | Description | Weight | Rationale |
|-----|-------------|--------|-----------|
| `<KPI Name>` | `<What this measures — be specific>` | High (3x) / Medium (2x) / Low (1x) | `<Why this KPI matters for this specific system/product>` |

### Weight Assignment

Weights reflect how much each KPI matters for the specific decision at hand. They are not generic — a KPI that's High-weight for one system might be Low-weight for another.

- **High (3x)**: KPIs that directly affect core product functionality, revenue, compliance, or are must-have requirements from the BRD. If the option fails here, it's disqualifying.
- **Medium (2x)**: KPIs that affect efficiency, user experience, or operational quality but aren't blockers. Poor scores here mean trade-offs, not deal-breakers.
- **Low (1x)**: Nice-to-have differentiators, future-proofing, or edge case handling. These break ties between otherwise similar options.

### KPI Design Principles

These principles ensure KPIs actually differentiate options rather than producing a matrix where everything scores the same:

- **Be specific to the system being evaluated.** "Saudi payment method support" is a good KPI for a billing system; "payment support" is too vague. "Laravel/PHP integration" is better than "framework compatibility" when the product runs Laravel.
- **Each KPI should differentiate at least 2 options.** If all options score the same on a KPI, it's not useful — remove it or make it more specific.
- **Include at least one cost-related KPI** (Year 1 TCO, cost at scale, or per-unit cost). Cost matters and should be scored, not just mentioned in prose.
- **Normalize costs to Year 1 TCO** when comparing options with different cost structures (subscription vs one-time vs build vs open-source). Year 1 TCO includes: purchase/license cost + (monthly fees × 12) + (setup hours × market hourly rate) + (estimated annual maintenance hours × market hourly rate) + hosting/infrastructure. For the market hourly rate, research the salary of a developer or relevant role in the target market and derive an hourly rate. This ensures a $500 one-time package with 4 hrs/month maintenance isn't scored the same as a $50/month SaaS that requires zero maintenance. Show the TCO breakdown in the score rationale for the cost KPI.
- **Include at least one integration/effort KPI** (setup time, migration effort, compatibility with existing stack). The best tool is worthless if it takes 6 months to integrate.
- **If existing infrastructure is relevant, include a compatibility KPI.** Products that already have a tech stack, user base, or data model should evaluate migration/integration effort explicitly.
- **Consider the product's stage.** A pre-revenue startup cares more about setup speed and free tiers; a scaling product cares more about performance at 100K users and enterprise SLAs.

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

### Scoring Rules

- **Score based on facts from research, not assumptions.** If you couldn't find data for a KPI, note the gap and score conservatively (2-3). Never give a 5 without evidence.
- **ALL options must be scored** — commercial SaaS, open-source, build from scratch, ready-made packages/scripts, and the bootstrap/MVP approach. Don't leave options out of the matrix.
- **Include the existing/current solution as an option if one exists.** Don't auto-score it high out of inertia — evaluate honestly. Migration cost is a separate KPI, not a reason to inflate scores.
- **Score each option independently.** Don't anchor one option's score to another — evaluate each against the KPI definition.

### Scoring Matrix Format

Present the matrix with weights shown in column headers so the weighting is transparent:

| Option | `<KPI 1>` (3x) | `<KPI 2>` (3x) | `<KPI 3>` (2x) | `<KPI 4>` (2x) | `<KPI 5>` (1x) | **Weighted Score** |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| `<Option A>` | X | X | X | X | X | **X.XX** |
| `<Option B>` | X | X | X | X | X | **X.XX** |

---

## Step 3: Calculate Weighted Scores

**Formula**: `Weighted Score = Σ(score × weight) / Σ(weights)`

This normalizes scores to the 1-5 scale regardless of how many KPIs there are, making scores comparable across different analyses.

**Worked example** with weights High(3x), High(3x), Medium(2x), Low(1x):
- Scores: 5, 4, 3, 2
- Weighted: (5×3 + 4×3 + 3×2 + 2×1) / (3+3+2+1) = (15+12+6+2) / 9 = **3.89**

Show the calculation for at least the top-scoring option so the result is verifiable.

---

## Step 4: Recommendation

### Single-winner (default)

Most comparisons result in a single recommended option:

- The **highest-scoring option** should be the recommendation unless there's a strong reason to override.
- **If overriding the top scorer**, you MUST explain why with specific reasoning (e.g., "Option A scored highest but requires Python/Django while this product runs Laravel — the integration KPI underweights the full migration cost"). Overrides should be rare — if you find yourself overriding frequently, your KPIs or weights probably need adjustment.
- **If the top 2 options are within 0.2 points**, call it a tie and let the cost profile, risk profile, or strategic fit decide. Explain why you chose one over the other.
- **Always note the runner-up option** as the alternative, with a one-line explanation of when you'd switch (e.g., "Switch to Option B if user count exceeds 50K and Option A's per-user pricing becomes prohibitive").

### Composite recommendation (when a mix outperforms any single option)

Sometimes the best solution is a combination of multiple options rather than a single winner. This happens when:

- **Options cover different sub-tasks** and each excels at its part (e.g., two specialized printers for different materials outperform one general-purpose printer due to eliminated switching overhead and material waste)
- **A channel/tool portfolio** is the decision unit, not a single choice (e.g., marketing channels — you allocate budget across several, not pick one)
- **Stage-dependent choices** where Option A is best now but Option B is best at scale, and the migration path is planned
- **Complementary strengths** where Option A handles 80% of cases well and Option B handles the remaining 20% edge cases that A scores poorly on

When recommending a composite:
- **Score each option individually** using the same matrix — don't skip the scoring
- **Explain why the combination beats any single option** with specific reasoning (e.g., "Printer A scores 4.2 and Printer B scores 3.8, but together they eliminate material-switching downtime that costs 40% of production capacity — effective combined output exceeds either alone")
- **Define each option's role** in the composite (what it handles, when it's used)
- **Note the total cost** of the composite vs. the single-winner alternative

---

## Step 5: Score Rationales (for top 3 options)

For each of the top 3 scoring options, provide a brief rationale table explaining why each score was assigned:

| KPI | Score | Rationale |
|-----|-------|-----------|
| `<KPI 1>` | X | `<Why this score — reference specific features, pricing data, or limitations from research>` |

This ensures the scoring is transparent and auditable. A reviewer should be able to read the rationale and agree or disagree with each score without re-doing the research.

---

## Integration with Research Skills

Each research skill references this methodology at the point where options are compared:

- **`/tech-research`**: Section "Options Rating Matrix" in each per-capability file
- **`/supporting-systems`**: Section "Options Rating Matrix" in each per-system file
- **`/pricing-strategy`**: Revenue model evaluation scoring in Phase 2
- **`/business-research`**: Feature scoring uses a similar weighted matrix (context-specific factors from Phase 3)

The methodology is the same across all skills. Only the KPIs change based on what's being evaluated.

## Modifiers

### help
Usage: `/options-rating-matrix help`

**options-rating-matrix** — No description

Available modifiers:
- `help` — Show this help message
