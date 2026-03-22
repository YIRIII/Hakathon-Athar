# Grading Rubrics

Each stage is graded on 5 dimensions (1-5 scale). The dimensions are tailored per stage
but share a common framework.

## Score Scale

| Score | Meaning |
|---|---|
| 5 | Excellent — exceeds expectations, production-ready |
| 4 | Good — meets expectations, minor issues only |
| 3 | Adequate — functional but notable gaps |
| 2 | Poor — significant issues that affect downstream stages |
| 1 | Failed — missing critical content or fundamentally flawed |

## Stage 1: BRD Generator

Evaluates: `RESEARCH.md` and `preparation/INITIAL-BRD.md`

### Research Depth (RESEARCH.md)
- **5**: 15+ unique sources, covers market size, competitors, audience, technical feasibility, regulations. Multiple data points per topic.
- **4**: 10-15 sources, covers most topics with real data. Minor gaps in one area.
- **3**: 5-10 sources, some topics have thin coverage or rely on a single source.
- **2**: Under 5 sources, or multiple topics have no real data (just general statements).
- **1**: Minimal or no research. Fabricated statistics or placeholder data.

### Citation Quality (RESEARCH.md)
- **5**: Every statistic has: exact source quote, year, geographic scope, URL, access date. Key claims have 2+ independent sources. Derived figures show calculations.
- **4**: Most statistics properly cited. Occasional missing year or geographic scope.
- **3**: Citations present but inconsistent. Some stats lack source attribution.
- **2**: Many unsourced claims. URLs don't match cited data.
- **1**: No citations or fabricated sources.

### Structure Completeness (INITIAL-BRD.md)
- **5**: All BRD template sections present and filled with substantive content. Executive summary, problem statement, market analysis, requirements, success criteria all present.
- **4**: All major sections present. One or two minor sections thin.
- **3**: Missing 1-2 sections or several sections have only surface-level content.
- **2**: Missing critical sections (e.g., no requirements or no market analysis).
- **1**: Fundamentally incomplete — more of an outline than a BRD.

### Actionability
- **5**: Requirements are specific, measurable, and prioritized. Success criteria are quantifiable. Stakeholders and timelines are clear.
- **4**: Most requirements are specific. Success criteria exist but some lack metrics.
- **3**: Requirements are somewhat vague. Success criteria are qualitative rather than quantitative.
- **2**: Requirements read like a wish list. No clear priorities or metrics.
- **1**: Too abstract to act on.

### Domain Accuracy
- **5**: Industry terminology is correct. Market claims match research. Competitive landscape is accurate and current. No factual errors.
- **4**: Mostly accurate. Minor terminology issues or slightly outdated competitor info.
- **3**: Some inaccuracies in market claims or competitive analysis. Mixing up similar products.
- **2**: Significant factual errors that would mislead decision-making.
- **1**: Fundamentally wrong about the domain or market.

---

## Stage 2: Business Research

Evaluates: `BUSINESS_RESEARCH/README.md` and per-feature files

### Research Depth (per-feature files)
- **5**: Each feature has 3+ real competitors analyzed with specific capabilities, pricing, market share. Includes direct quotes or data from sources.
- **4**: Most features have 2-3 competitors with real data. One or two features thinner.
- **3**: Features have competitors listed but analysis is shallow — names and general descriptions only.
- **2**: Few competitors per feature, mostly surface-level or generic analysis.
- **1**: Fabricated competitor data or no real research.

### Citation Quality
- **5**: Every competitor claim sourced. Pricing data from actual pricing pages. Market share from published reports. Access dates present.
- **4**: Most claims sourced. Occasional estimate without clear attribution.
- **3**: Mix of sourced and unsourced claims. Some "industry estimates" without backing.
- **2**: Majority of claims unsourced.
- **1**: No citations.

### Structure Completeness (README.md)
- **5**: Impact matrix present with all features scored. Tier classification (must-have/should-have/nice-to-have) clear. Strategy recommendations present. Progress tracker complete.
- **4**: All sections present, minor gaps in scoring or tier justification.
- **3**: Missing impact matrix or tier classification. Strategy is generic.
- **2**: README is mostly a list of features without analysis structure.
- **1**: README is a stub or missing.

### Actionability
- **5**: Feature prioritization is clear and justified. Build-vs-buy recommendations are specific. Directly usable for tech research planning.
- **4**: Good prioritization. Some build-vs-buy recommendations vague.
- **3**: Prioritization exists but justification is weak. Hard to act on directly.
- **2**: No clear prioritization. Features listed without actionable guidance.
- **1**: Not actionable.

### Domain Accuracy
- **5**: Competitors are real and correctly described. Feature comparisons are accurate. Market positioning is realistic.
- **4**: Mostly accurate. Minor errors in competitor capabilities.
- **3**: Some competitors mischaracterized or outdated information used.
- **2**: Significant errors in competitive analysis.
- **1**: Fabricated competitors or fundamentally wrong analysis.

---

## Stage 2b: Supporting Systems

Evaluates: `SUPPORTING_SYSTEMS/README.md` and per-system files

### Research Depth (per-system files)
- **5**: Each system has 3+ real options analyzed (commercial SaaS, open-source, build). Includes actual vendor pricing at multiple scale points (100/10K/100K users), setup time estimates, and feature fit scores with reasoning. Bootstrap/MVP options identified.
- **4**: Most systems have 3 options with real pricing. Minor gaps in scale-point cost curves or one system has only 2 options.
- **3**: Systems have options listed but pricing is thin — single scale point or "contact sales" without estimates. Missing Bootstrap/MVP options for some systems.
- **2**: Few options per system. Pricing is generic or fabricated. No scale-point analysis.
- **1**: Minimal research. Options are names-only without capabilities or pricing.

### Citation Quality
- **5**: Every vendor price sourced with URL and access date. Open-source project links included. Cost estimates at scale points show calculation methodology. "Contact sales" noted explicitly with industry estimates attributed.
- **4**: Most pricing sourced. Some scale-point estimates lack clear derivation.
- **3**: Mix of sourced and unsourced pricing. Some vendor claims unattributed.
- **2**: Majority of pricing unsourced or from secondary aggregators only.
- **1**: No citations for vendor claims.

### Structure Completeness (README.md)
- **5**: All required sections present: progress tracker, detected systems summary, priority classification (Essential/Growth/Enterprise), cost impact summary with scaling projections, build-vs-buy recommendations, impact on downstream skills, open questions.
- **4**: All major sections present. Minor gaps in scaling projections or downstream impact section.
- **3**: Missing priority classification or cost impact summary. Downstream impact generic.
- **2**: README is a list of systems without synthesis or classification.
- **1**: README is a stub or missing.

### Actionability
- **5**: Clear build-vs-buy recommendation per system with cost justification. Bootstrap/MVP options identified for pre-revenue stage. Decision triggers specified ("re-evaluate when >50K users"). Costs ready for budget integration. Integration requirements noted for tech research.
- **4**: Good recommendations. Some missing decision triggers or Bootstrap options.
- **3**: Recommendations present but vague on timing or cost justification. Hard to integrate into budget planning.
- **2**: No clear recommendations. Systems listed without actionable guidance.
- **1**: Not actionable.

### Domain Accuracy
- **5**: Vendor capabilities correctly described. Pricing matches published rates. Open-source projects are real and actively maintained. Scale-point cost projections are realistic. Compliance considerations (PDPL, ZATCA) correctly identified per system.
- **4**: Mostly accurate. Minor pricing discrepancies or one vendor slightly mischaracterized.
- **3**: Some vendors mischaracterized or deprecated projects recommended. Cost projections unrealistic at some scale points.
- **2**: Significant errors in vendor capabilities or pricing that would lead to wrong build-vs-buy decisions.
- **1**: Fundamentally wrong about available solutions.

---

## Stage 2c: Marketing Strategy

Evaluates: `MARKETING_STRATEGY/README.md` and 5 phase files

### Research Depth (phase files)
- **5**: Competitor marketing spend researched (SimilarWeb, ad library, observable signals). CAC calculated from real channel benchmarks with year and source. 10+ unique sources across phases. Keyword research with actual volumes and difficulty. Specific tactics per channel (not just "use paid search").
- **4**: Most channels have sourced CAC benchmarks. Keyword research present but some volumes estimated. Competitor marketing analysis from 2+ sources per competitor.
- **3**: Some channels have real benchmarks, others rely on generic "industry average" without source. Keyword research shallow or missing volumes.
- **2**: Mostly generic benchmarks. No real competitor marketing data. CAC numbers appear fabricated.
- **1**: No real research. Generic marketing advice without data.

### Citation Quality
- **5**: Every CAC benchmark has source name, year, and URL. Keyword volumes attributed to tool (e.g., Ahrefs, SEMrush, Google Keyword Planner). Competitor marketing claims sourced (SimilarWeb, social media profiles, ad libraries). Revenue-to-marketing ratios from named studies.
- **4**: Most benchmarks sourced. Some keyword data or competitor signals unattributed.
- **3**: Mix of sourced and unsourced claims. CAC calculations use some "industry knowledge" without backing.
- **2**: Few citations. CAC estimates opaque.
- **1**: No citations.

### Structure Completeness (README.md + phases)
- **5**: All 5 phases complete. README has budget context, executive summary, GTM strategy, channel mix, CAC estimates, marketing budget by tier (Bootstrap/Growth/Scale), marketing-driven product features, impact on downstream skills, risks. Phase files follow template.
- **4**: All phases present. Minor gaps in one phase or README missing downstream impact section.
- **3**: Missing a phase or README summary is thin. Budget tiers incomplete.
- **2**: Multiple phases incomplete or missing.
- **1**: Fundamentally incomplete.

### Actionability
- **5**: GTM model decision justified for this specific product (PLG/Sales-Led/Hybrid with reasoning tied to ACV, buyer type, complexity). Channel sequencing by stage (founder sales → content → paid). Bootstrap tier shows founder time allocation + low-cost alternatives. Specific tactics per channel. First-100-users plan. Marketing features flagged for tech research scope.
- **4**: Good GTM and channel recommendations. Some tactics generic. Bootstrap tier present but light on founder time allocation.
- **3**: GTM recommendation exists but reasoning is generic. Channel list without specific tactics. Missing Bootstrap tier.
- **2**: Generic marketing suggestions. Not implementable without significant additional research.
- **1**: Not actionable.

### Domain Accuracy
- **5**: GTM model fits the product type and market (e.g., PLG for low-ACV self-serve, sales-led for enterprise). CAC estimates realistic for the industry and geography. Channel recommendations match ICP behavior. Competitor marketing descriptions accurate.
- **4**: Mostly appropriate. Minor mismatches in CAC estimates or channel priorities.
- **3**: GTM model somewhat forced. CAC estimates unrealistic for the market. Some channel recommendations don't match ICP.
- **2**: Wrong GTM model for the product. Wildly unrealistic CAC or budget projections.
- **1**: Fundamentally misunderstands the marketing domain for this product type.

---

## Stage 3: Tech Research

Evaluates: `TECHNICAL_OPTIONS/README.md` and per-capability files

### Research Depth (per-capability files)
- **5**: Each capability has 4+ real technology options analyzed. Includes actual SDK names, pricing tiers, benchmark data, case studies. Vendor-specific details (rate limits, SLAs, regions).
- **4**: 3-4 options per capability with real pricing and features. Minor gaps in benchmarks.
- **3**: 2-3 options with some real data but missing pricing details or benchmarks.
- **2**: Options listed but analysis is superficial — no real pricing or performance data.
- **1**: Fabricated vendor data or single option per capability.

### Citation Quality
- **5**: Pricing from official pricing pages (with URLs). Performance data from published benchmarks. "Contact sales" noted explicitly when applicable with industry estimates attributed.
- **4**: Most pricing sourced. Some benchmark data from secondary sources.
- **3**: Mix of real and estimated pricing. Some unattributed performance claims.
- **2**: Mostly estimates without attribution.
- **1**: No sources for technical claims.

### Structure Completeness (README.md)
- **5**: Executive summary with recommended stack. Cost projections per capability. Comparison matrices. Risk assessment. All capabilities tracked with status.
- **4**: All major sections present. Minor gaps in cost projections or risk assessment.
- **3**: Missing comparison matrices or cost projections. Summary is generic.
- **2**: README is a list of capabilities without synthesis.
- **1**: README is a stub.

### Actionability
- **5**: Clear recommended option per capability with justification. Migration paths noted. Cost breakdown ready for budgeting. Implementation sequence suggested.
- **4**: Good recommendations. Some missing cost breakdowns.
- **3**: Recommendations present but hard to act on without further research.
- **2**: No clear recommendations. Just a list of options.
- **1**: Not actionable.

### Domain Accuracy
- **5**: Technology names, versions, and capabilities are current and correct. Pricing matches published rates. No confused or deprecated technologies.
- **4**: Mostly current. Minor version or pricing discrepancies.
- **3**: Some outdated information or confused product names.
- **2**: Significant technical inaccuracies that would lead to wrong choices.
- **1**: Fundamentally wrong about technology options.

---

## Stage 4: Pricing Strategy

Evaluates: `PRICING_STRATEGY/README.md` and 5 phase files

### Research Depth (phase files)
- **5**: Competitor pricing from actual pricing pages. Conversion/churn benchmarks from published studies. WTP signals from real survey data or market reports. 10+ sources across phases.
- **4**: Most pricing sourced from real pages. Some benchmarks from reputable secondary sources.
- **3**: Mix of real and estimated data. WTP analysis relies on assumptions.
- **2**: Mostly assumptions and estimates. Few real competitor prices.
- **1**: Fabricated pricing data.

### Citation Quality
- **5**: Every pricing claim has URL to pricing page. Benchmark sources named with publication year. Revenue projections clearly distinguish sourced vs estimated assumptions.
- **4**: Most claims sourced. Revenue assumptions mostly attributed.
- **3**: Some sourced, some not. Hard to tell which projections are grounded.
- **2**: Few citations. Revenue projections are opaque.
- **1**: No citations.

### Structure Completeness (README.md + phases)
- **5**: All 5 phases complete. README has executive summary, tier overview, unit economics summary. Phase files follow template structure.
- **4**: All phases present. Minor gaps in one phase or README summary.
- **3**: Missing a phase or README summary is thin.
- **2**: Multiple phases incomplete or missing.
- **1**: Fundamentally incomplete.

### Actionability
- **5**: Tier structure is specific (names, prices, feature allocation). Unit economics show CAC, LTV, payback period with sourced assumptions. Ready to implement.
- **4**: Good tier design. Some unit economics assumptions need validation.
- **3**: Tier structure exists but pricing rationale is weak. Unit economics are rough.
- **2**: Generic pricing suggestions. Not implementable.
- **1**: Not actionable.

### Domain Accuracy
- **5**: Pricing model fits the product type (SaaS = subscription, marketplace = commission, etc.). Competitor prices are real and current. Revenue projections are realistic for the market.
- **4**: Mostly appropriate. Minor mismatches in model assumptions.
- **3**: Pricing model somewhat forced. Some unrealistic projections.
- **2**: Wrong pricing model for the product type or wildly unrealistic projections.
- **1**: Fundamentally misunderstands the pricing domain.

---

## Stage 4b: Risk Assessment

Evaluates: `RISK_ASSESSMENT/README.md` and 8 per-category files

### Research Depth (per-category files)
- **5**: Each risk has likelihood/impact scores with cited evidence (comparable failures, industry benchmarks, published statistics). 3+ real comparable failures across categories. Quantified benchmarks (e.g., "30% of SaaS startups fail on unit economics — CB Insights, 2023"). Mitigation options include cost estimates with ranges.
- **4**: Most risks have evidence-backed scores. Some risks rely on general reasoning rather than specific comparables. Mitigation costs present but some are rough estimates.
- **3**: Risks identified but scoring rationale is thin — scores asserted without specific evidence. Few comparable failures cited. Mitigation costs vague.
- **2**: Generic risk list. Scores appear arbitrary. No comparable failures or benchmarks.
- **1**: Minimal risk identification. No evidence for scoring. Fabricated or placeholder content.

### Citation Quality
- **5**: Comparable failures sourced with company name, year, and what happened. Industry benchmarks from named studies with publication year. Regulatory risks cite specific laws/regulations. Early warning thresholds reference industry norms with source.
- **4**: Most comparable failures sourced. Some benchmarks from secondary sources or lacking publication year.
- **3**: Mix of sourced and unsourced claims. Some "industry data" without specific attribution.
- **2**: Few citations. Risk evidence mostly unsourced assertions.
- **1**: No citations.

### Structure Completeness (README.md)
- **5**: All required sections: risk register (master table with ID, risk, category, likelihood, impact, score, level, mitigation, residual, status), scoring reference, risk heat map (5x5), risk profile summary (counts by level), mitigation plans for all Critical/High risks, go/no-go assessment with conditions and impact on downstream documents. All 8 categories covered.
- **4**: All major sections present. Minor gaps in heat map or one category slightly thin.
- **3**: Missing heat map or go/no-go assessment. Risk register present but mitigation plans incomplete.
- **2**: README is mostly a risk list without scoring structure or go/no-go recommendation.
- **1**: README is a stub or missing.

### Actionability
- **5**: Go/no-go recommendation is evidence-based and specific to this idea. Conditional-Go conditions are measurable and time-bound. Mitigation actions are specific with cost, owner, and timeline. Early warning signals are observable metrics (e.g., "churn >5% in Month 1"). Impact on BRD/PRD/pricing/marketing specified.
- **4**: Good go/no-go with conditions. Some mitigation actions or early warning signals vague. Downstream impact partially specified.
- **3**: Go/no-go present but reasoning generic. Mitigations are high-level ("hire experienced team"). Early warnings missing or unmeasurable.
- **2**: No clear go/no-go or conditions are unmeasurable. Mitigations not actionable.
- **1**: Not actionable.

### Domain Accuracy
- **5**: Risks are specific to this product, market, and geography — not generic startup risks. Regulatory risks correctly identify applicable laws (PDPL, ZATCA, SAMA, SCFHS). Comparable failures are relevant (same industry/model). Financial risk thresholds are realistic (churn rates, CAC, unit economics benchmarks match the domain).
- **4**: Mostly product-specific. Minor generic risks that don't add value. Regulatory landscape mostly correct.
- **3**: Mix of product-specific and generic risks. Some regulatory items wrong or missing.
- **2**: Mostly generic startup risks. Regulatory landscape significantly incomplete.
- **1**: Fundamentally wrong about the risk landscape for this product type.

---

## Stage 5: PRD Generator

Evaluates: `PRD.md` and `BRD.md` (final)

### Research Integration (PRD.md)
- **5**: PRD references specific findings from business research, tech research, and pricing. Technology choices trace to tech options analysis. Feature priorities match business research tiers.
- **4**: Most research integrated. Occasional generic statement where specific data was available.
- **3**: Some research referenced but many sections written independently of upstream findings.
- **2**: Minimal integration — PRD reads like it was written without the research.
- **1**: No visible integration of upstream research.

### Citation Quality (BRD.md final)
- **5**: Final BRD incorporates technical findings and pricing data with proper attribution. Updated from initial BRD with new information from all research stages.
- **4**: Most updates incorporated. Some new findings missing from final BRD.
- **3**: Final BRD partially updated. Some sections still reflect initial BRD without enrichment.
- **2**: Final BRD barely different from initial BRD.
- **1**: Final BRD is just a copy of initial BRD.

### Structure Completeness (PRD.md)
- **5**: All PRD template sections filled. Technical architecture, feature specs, milestones, dependencies, success metrics all present and substantive.
- **4**: All sections present. Minor gaps in milestones or dependencies.
- **3**: Missing 1-2 sections. Technical architecture is vague.
- **2**: Missing critical sections. More outline than spec.
- **1**: Fundamentally incomplete.

### Actionability
- **5**: A dev team could start building from this PRD. Features are specified with acceptance criteria. Architecture decisions are made (not deferred). Timeline is realistic.
- **4**: Mostly buildable. Some features need further specification.
- **3**: Gives direction but significant specification work remains.
- **2**: Too vague for implementation planning.
- **1**: Not actionable.

### Domain Accuracy
- **5**: Technical architecture matches recommended stack from tech research. Feature scope matches business research priorities. Pricing integration is consistent.
- **4**: Mostly consistent with upstream research. Minor mismatches.
- **3**: Some inconsistencies between PRD and upstream research findings.
- **2**: Significant contradictions with research findings.
- **1**: PRD contradicts its own upstream research.

---

## Grader Output Format

Return grading results as JSON:

```json
{
  "stage": "stage-name",
  "slug": "idea-slug",
  "scores": {
    "dimension_name": {
      "score": 4,
      "max": 5,
      "evidence": "Brief justification with specific examples from the output"
    }
  },
  "total_score": 19,
  "max_score": 25,
  "percentage": 76,
  "strengths": [
    "Specific strength with example"
  ],
  "weaknesses": [
    "Specific weakness with example"
  ],
  "critical_issues": [
    "Issues that would cause problems in downstream stages"
  ]
}
```

**Grading rules:**
- Read ALL output files for the stage, not just README.md
- Cite specific examples from the files as evidence
- Critical issues are things that would propagate errors downstream (e.g., fabricated statistics that later stages will treat as fact)
- Be calibrated: a "3" is functional but flawed, not catastrophic. Reserve "1" for genuine failures.
