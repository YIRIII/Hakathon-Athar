# /supporting-systems

Detect and research supporting systems (admin dashboards, RBAC, billing administration, notifications, etc.) needed by a product idea, with build-vs-buy analysis, cost estimation, and priority classification.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Structure research into per-system tasks. Sub-agents write full research directly to per-system files (`SUPPORTING_SYSTEMS/NN-system-name.md`). They return ONLY structured summaries (~500 tokens each) to the main agent. The main agent never holds all research data in context at once — this prevents burst context growth that causes data loss during auto-compaction.

When the user invokes `/supporting-systems`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`business-research-complete`** status (preferred) → Start fresh from Step 2
- **`brd-complete`** status (backward compatibility — skipping business research) → Start fresh from Step 2
- **`supporting-systems`** status → Resume interrupted research from Step 3 (skip Step 2)
- **Any later status** (`supporting-systems-complete`, `marketing-strategy`, `marketing-strategy-complete`, `tech-research`, `tech-research-complete`, `pricing-research`, `pricing-research-complete`, `prd-draft`, `prd-complete`) → Re-run (supplementary enrichment). Check if `SUPPORTING_SYSTEMS/` folder already exists:
  - **If folder exists with completed research**: Ask the user whether to (a) skip already-researched systems and only research new/changed ones, or (b) redo all research from scratch. For option (a), read the existing README.md and treat systems already marked `complete` as done — only research systems with status `pending` or that don't have a file yet.
  - **If no folder exists**: Start fresh from Step 2.
  - **Status handling**: Do NOT change the idea's status during research. After completion, the skill will assess whether findings are significant enough to warrant a status rollback (see Step 4).

If the user specifies a slug, use that idea directly (verify it has a BRD).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/business-research` first (preferred) or `/brd-generator` if no BRD exists.

### 2. Read Context Documents, Detect Systems & Start Research Phase

Read the following files for the selected idea:

- `ideas/<slug>/preparation/INITIAL-BRD.md` — the primary source for all product requirements (if not found, fall back to `ideas/<slug>/BRD.md` for pre-restructuring ideas)
- `ideas/<slug>/IDEA.md` — original idea context
- `ideas/<slug>/BUSINESS_RESEARCH/README.md` — business research findings (if it exists)
- `ideas/<slug>/RESEARCH.md` — raw research data (if available)
- `ideas/<slug>/DOMAIN_RESEARCH/README.md` — domain methodology research findings (if available — recommended approaches may drive infrastructure requirements, e.g., high-frequency trading strategies need streaming data infrastructure)

**Budget context**: Read `ideas/<slug>/BUDGET_CONTEXT.md` (created by `/brd-generator` during BRD generation). If it doesn't exist, warn that `/brd-generator` should be run first to create it with proper ramp-aware revenue projections. As a fallback for legacy ideas, compute it by following `.claude/skills/budget-assessment/SKILL.md` Steps 1-4 and save the output. Pass the funding stage, budget tiers, and cost sanity thresholds to every sub-agent.

#### System Detection

Scan the BRD, IDEA, and business research documents for signals that imply supporting systems. Use this detection table:

| Signal in Research | Supporting System | Detection Examples |
|-------------------|-------------------|-------------------|
| Multiple user types / roles mentioned | User Management & RBAC | "admin", "provider", "customer", "salon owner", different permission levels |
| Admin features, dashboard, or management portal | Admin Dashboard | "management portal", "admin panel", "back-office" |
| Payments, subscriptions, or commission | Billing Administration | Refund handling, invoice management, payment disputes, subscription management |
| Multi-tenant / enterprise tier / "organizations" | Multi-Tenancy & Org Management | "organizations", "teams", "workspaces", tenant isolation |
| Consumer-facing app with multiple users | Feedback & Support System | User-facing product, customer support needs, help desk |
| Email, SMS, or push notifications mentioned | Notification Management | Alerts, reminders, email templates, push notifications |
| Sensitive data, compliance, or medical/financial data | Audit Logging | HIPAA, PCI-DSS, GDPR/PDPL, financial records, medical records |
| API or integrations mentioned | API Management | Third-party integrations, rate limiting, API keys, webhooks |
| User-generated content or profiles | Content Moderation | Reviews, comments, user uploads, profile content |
| E-commerce, orders, or inventory | Order Management & CS Tools | Order tracking, inventory management, customer service workflows |
| Analytics, metrics, or KPIs mentioned | Analytics Dashboard | Business metrics, usage analytics, reporting, KPI tracking |
| Onboarding, setup, or getting started flows | Onboarding System | User onboarding, setup wizards, getting started guides |
| Settings, preferences, or configuration | Settings & Configuration | User preferences, system settings, feature flags |

**Present detected systems to the user for confirmation before researching:**

```
Supporting Systems Detected for "<Idea Name>"
================================================
Based on your BRD and business research, these supporting systems are needed:

Detected Systems:
  1. User Management & RBAC — multiple user types (admin, provider, customer)
  2. Admin Dashboard — management portal referenced in BR-3
  3. Billing Administration — subscription payments + commission model
  ...

(a) Confirm and research all detected systems
(b) Add/remove systems from the list, then research
(c) Cancel — skip supporting systems research
```

Wait for user confirmation. If the user adds or removes systems, adjust the list accordingly.

Update the idea's status to `supporting-systems` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Tracker updates when starting research phase:**
- **Pipeline Summary**: Decrement the previous status (`Business Research Complete` or `BRD Complete`), increment `Supporting Systems`
- **Ideas Pipeline table**: Update the idea's **Status** to `supporting-systems`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `SUPPORTING_SYSTEMS_STARTED`, **Details**: `Supporting systems detection and research initiated; <N> systems detected`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

### 3. Generate Supporting Systems Analysis

Read the supporting systems template from `.claude/skills/supporting-systems/references/supporting-systems-template.md`.

**Always create a `ideas/<slug>/SUPPORTING_SYSTEMS/` folder** with per-system files.

#### Research Progress Tracking (Resumability)

**First action — create or read the tracking table:**

- **Fresh start** (status was `business-research-complete` or `brd-complete`): Create `ideas/<slug>/SUPPORTING_SYSTEMS/README.md` with the header metadata and a **Research Progress** table listing every confirmed system with status `pending`:

```markdown
## Research Progress

| # | System | Priority | File | Status | Updated |
|---|--------|----------|------|--------|---------|
| 1 | <Name> | — | [01-name.md](01-name.md) | pending | — |
| 2 | <Name> | — | [02-name.md](02-name.md) | pending | — |
```

- **Resuming** (status was `supporting-systems`): Read `ideas/<slug>/SUPPORTING_SYSTEMS/README.md`. Find the **Research Progress** table. Identify systems with status `pending` — these are the ones that need to be researched. **Skip systems already marked `complete`.**

#### For each system that needs research:

1. **Launch sub-agents in parallel** (all systems are independent — no inter-dependencies). Each sub-agent:
   - Receives the system name, detection signals, source document context (relevant BRs, features), and idea context
   - Uses web search to research **alternative solutions** for this supporting system:
     - **Commercial SaaS options**: Find actual products, pricing pages, feature sets, limitations
     - **Open-source options**: GitHub stars, maintenance status, community size, deployment complexity
     - **Build from scratch**: Estimated effort, complexity, maintenance burden
   - Conducts **build vs buy analysis** across these criteria:
     - Setup time & complexity
     - Monthly/annual cost at 3 scale points (100 users, 10K users, 100K users)
     - Customization flexibility
     - Integration effort with the product's tech stack
     - Vendor lock-in risk
     - Data ownership & compliance
     - Maintenance burden
   - Assesses **impact** if this system is absent or poorly implemented:
     - Revenue impact (direct or indirect)
     - Conversion impact
     - Operational impact
     - Compliance risk
   - Classifies into a **priority tier**:
     - **Essential**: Must have for MVP/launch — absence blocks core functionality or compliance
     - **Growth**: Needed for scaling — absence limits growth but doesn't block launch
     - **Enterprise**: Needed for enterprise customers — can be deferred to later phases
   - **Writes the complete analysis directly to `ideas/<slug>/SUPPORTING_SYSTEMS/NN-system-name.md`**
   - Returns ONLY a structured summary to the main agent:

```
Summary (max 500 tokens):
- System: <name>
- Priority: Essential / Growth / Enterprise
- Recommendation: Build / Buy <vendor> / Open-source <name>
- Est. Year 1 Cost: <amount>
- Key risk: <one line>
- Impact if absent: <one line>
- File: SUPPORTING_SYSTEMS/NN-name.md
```

2. **After each system is complete**, update its row in the README.md Research Progress table: set **Status** to `complete`, **Priority** to the determined tier, and **Updated** to today's date.

**Research guidelines**:
- Use **real data only** — never fabricate pricing, features, or benchmarks
- **Cite sources** inline (vendor pages, documentation, GitHub repos)
- **Date-stamp pricing** — note when pricing was researched
- When vendor pricing says "Contact Sales," note this explicitly and provide industry estimates with clear attribution

**Value-driven evaluation** (CRITICAL — follow these principles):
- **Don't default to cheapest or most expensive** — ask "Does this cost improve the business, increase revenue, or reduce risk enough to justify it?" If a $50/mo SaaS saves 40 hours of dev time and does the job well, recommend it. If a $500/mo enterprise tool does the same thing as a $20/mo SMB tool, recommend the $20 one.
- **Existing infrastructure is a factor, not an automatic winner** — if the product already uses a tool/service, account for migration cost when comparing alternatives. But if the current solution is genuinely bad (security issues, missing critical features, poor scalability), research it honestly, explain why it's bad, and recommend switching. Don't avoid recommending change just because something is already in use.
- **Search for local/SMB-tier solutions alongside enterprise vendors** — especially in markets like Saudi Arabia, always search for affordable local alternatives (e.g., Qoyod, Daftra, Wafeq for accounting/invoicing vs. ClearTax/Chargebee). Many enterprise vendors charge 5-10x what local SMB tools cost for the same functionality.
- **Cost sanity check (mandatory)** — after calculating Year 1 cost, run the cost sanity check from `.claude/skills/budget-assessment/SKILL.md` Step 5. Compare the total supporting systems spend against the Infrastructure & Supporting Systems envelope from `BUDGET_CONTEXT.md`. Show the ratio: `total supporting systems cost / Projected Year 1 revenue × 100 = X%`. Apply thresholds: flag if >15% of Year 1 revenue (bootstrapped) or >20% (funded). Also compare against: (a) what similar startups in the same market actually pay for this type of system; (b) whether a bootstrapped founder would consider this cost reasonable. If costs seem high, search for cheaper alternatives before finalizing.
- **Bootstrapping tier** — for every system, include a "Bootstrap/MVP" cost column showing the absolute minimum viable approach for a pre-revenue or early-revenue startup. This might mean using free tiers, open-source self-hosted, or manual processes. The main recommendation can still be a paid solution if justified, but the bootstrap option must exist as a fallback.
- **Impute founder time at market rate** — when a "build" or "self-hosted" option requires founder development or maintenance time, impute that time at the market hourly rate for a developer in the target market (research the actual salary and derive hourly rate). A "free" open-source tool that takes 20 hours to set up and 4 hours/month to maintain has a real Year 1 TCO of `(20 + 4×12) × hourly rate`. Show both "Cash cost" and "Fully-loaded cost (incl. founder time)" in cost comparisons. Use fully-loaded cost in the options rating matrix cost KPI. This prevents build options from always appearing cheapest by hiding labor costs.
- **Ready-made scripts/packages** — actively search for ready-made solutions (CodeCanyon scripts, GitHub starter kits, Laravel packages, etc.) that can be set up with minimal customization. Many supporting systems have near-complete open-source or low-cost implementations that just need API keys and configuration. Don't assume "build from scratch" when a $50-500 package exists.

**Options Rating Matrix (mandatory)** — each per-system file must include a structured options rating. Follow the shared methodology at `.claude/skills/options-rating-matrix/SKILL.md` exactly. This defines how to create KPIs, score options, calculate weighted scores, and present the comparison matrix. The recommendation must be data-driven based on the matrix scores.

**Research & Citation Methodology**: Follow `.claude/skills/research-citations/SKILL.md` for all research conducted during supporting systems analysis. Use FACT-ID prefix `SUP` for supporting systems-specific research facts. Additional requirements:
- All vendor pricing must include a "researched on [YYYY-MM-DD]" stamp
- Open-source options must include GitHub URL, last commit date, and star count
- Build estimates must cite basis (similar projects, developer surveys, industry benchmarks)

**Citation URL Verification (Mandatory)**: After completing each supporting system file, run the Citation URL Verification Protocol (`.claude/skills/research-citations/SKILL.md` Section I) against all URLs in that file. Verify every vendor pricing page, GitHub repo, and documentation link. Also run the Pre-Publication Verification Checklist (`.claude/skills/research-citations/references/citation-checklist.md`). Fix all CRITICAL and HIGH issues before moving to the next system file.

#### After all systems are complete:

Fill in the remaining README.md sections:
- **Detected Systems Summary** (all systems with detection signals and source documents)
- **Priority Classification** (3 sub-tables: Essential, Growth, Enterprise)
- **Cost Impact Summary** (monthly/annual by tier + cost scaling projection at 100/10K/100K users)
- **Build vs Buy Recommendations** (summary table + Build Summary + Buy Summary)
- **Impact on Downstream Skills** (what `/marketing-strategy`, `/tech-research`, and `/pricing-strategy` should know)
- **Open Questions & Next Steps**

### 4. Update Tracker and Status

After all systems are researched and the README is finalized:

#### Normal flow (idea was `business-research-complete`, `brd-complete`, or `supporting-systems`)

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `supporting-systems-complete`
- Add a Supporting Systems field: `[SUPPORTING_SYSTEMS/](SUPPORTING_SYSTEMS/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Supporting Systems Complete`
- **Ideas Pipeline table**: Update **Status** to `supporting-systems-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `SUPPORTING_SYSTEMS_COMPLETED`, **Details**: `<N> systems analyzed; Priority: <N> Essential, <N> Growth, <N> Enterprise; Build: <N>, Buy: <N>; Est. Year 1 cost impact: <$X>`
- If the activity table exceeds 20 data rows, remove the oldest entry

#### Re-run on completed idea (idea was already past `supporting-systems-complete`)

After completing the research, assess whether the findings materially change the idea's supporting systems strategy compared to what's already in existing downstream documents. Check for **significant impact indicators**:

- New Essential system discovered that wasn't previously identified
- Cost impact changed by >30% (total supporting systems cost)
- Build/buy recommendation flipped for an Essential system
- A system affects the revenue model (e.g., billing admin complexity changes pricing feasibility)
- Compliance-critical system discovered (regulatory requirement for audit logging, data residency, etc.)

**If significant impact is found** — the findings would change downstream research or implementation:

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `supporting-systems-complete` (triggers re-evaluation from `/marketing-strategy` onward)
- Set Supporting Systems field: `[SUPPORTING_SYSTEMS/](SUPPORTING_SYSTEMS/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Supporting Systems Complete`. Update `Last Updated` date at top.
- **Ideas Pipeline table**: Update **Status** to `supporting-systems-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `SUPPORTING_SYSTEMS_COMPLETED`, **Details**: `<N> systems analyzed (re-run — significant findings); Status rolled back — <brief reason>`
- If the activity table exceeds 20 data rows, remove the oldest entry

**If no significant impact** — the findings confirm or only slightly adjust existing systems:

**Update `ideas/<slug>/IDEA.md`:**
- Do NOT change the status (keep existing status like `prd-complete`)
- Ensure Supporting Systems field exists: `[SUPPORTING_SYSTEMS/](SUPPORTING_SYSTEMS/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: No changes (status didn't change)
- **Ideas Pipeline table**: Update **Updated** to today's date only (do not change Status)
- **Activity Log**: Add a row at the top — **Event**: `SUPPORTING_SYSTEMS_COMPLETED`, **Details**: `<N> systems analyzed (supplementary — confirms existing analysis)`
- If the activity table exceeds 20 data rows, remove the oldest entry

### 5. Present Summary

Summarize for the user:

> **Supporting Systems Complete for "<Idea Name>"**
>
> **Systems Analyzed:** <count>
>
> **Priority Classification:**
> - Essential: <count and list>
> - Growth: <count and list>
> - Enterprise: <count and list>
>
> **Build vs Buy:**
> - Build in-house: <count and list>
> - Buy/SaaS: <count and list>
> - Open-source: <count and list>
>
> **Estimated Year 1 Cost Impact:** <total from all systems>
>
> **Cost Scaling:**
> | Scale | Monthly Cost | Annual Cost |
> |-------|-------------|-------------|
> | 100 users | $X | $X |
> | 10K users | $X | $X |
> | 100K users | $X | $X |
>
> **Downstream Impact:**
> - Marketing strategy: <what marketing needs to know — e.g., admin tools affect onboarding, support costs affect CAC>
> - Tech research: <systems that need technical evaluation — e.g., RBAC implementation, notification infrastructure>
> - Pricing strategy: <cost impact on unit economics — e.g., $X/user/month in supporting system costs>
>
> **Files created:**
> - `ideas/<slug>/SUPPORTING_SYSTEMS/` (<N> system files + README)
>
> Run `/marketing-strategy` to generate the marketing strategy and CAC estimation.

If the idea was re-run with **significant impact**:
> **Significant changes detected** — status rolled back to `supporting-systems-complete`.
> The following downstream documents should be updated:
> - <list specific documents and what changed>
> Run `/marketing-strategy` to update marketing strategy with new supporting systems data.

If the idea was re-run with **no significant impact**:
> **Findings confirm existing supporting systems analysis** — status unchanged (`<current status>`).
> The `SUPPORTING_SYSTEMS/` folder is now updated with the latest research. No downstream regeneration needed.

## Modifiers

### help
Usage: `/supporting-systems help`

**supporting-systems** — No description

Available modifiers:
- `help` — Show this help message
