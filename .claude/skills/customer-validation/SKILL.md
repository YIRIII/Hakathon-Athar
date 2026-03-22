# /customer-validation

Generate customer validation artifacts — survey templates, interview scripts, assumption trackers, and validation scorecards — to test whether the problem is real and customers would pay for the solution.

**This skill is optional.** The pipeline works without it. It fits between `/brd-generator` and `/business-research` for teams that want primary research before committing to deeper analysis.

## Trigger Detection

This skill activates in TWO ways:

1. **User runs `/customer-validation`** — Start the full flow (Step 1 below)
2. **User runs `/customer-validation close`** — Close out an in-progress validation by filling gaps with desk research (jump to Step 7 — Gap Closure)

## Instructions

When the user invokes `/customer-validation`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- **`brd-complete`** status (preferred) → Start fresh from Step 2
- **`customer-validation`** status → Resume from where validation left off (read `CUSTOMER_VALIDATION/README.md` to find incomplete sections)
- **Any later status** (`customer-validation-complete`, `business-research`, `business-research-complete`, `supporting-systems-complete`, `marketing-strategy-complete`, `tech-research-complete`, `pricing-research-complete`, `prd-draft`, `prd-complete`) → Re-run (supplementary enrichment). Check if `CUSTOMER_VALIDATION/` folder already exists:
  - **If folder exists with completed work**: Ask the user whether to (a) update specific sections, or (b) redo all work from scratch.
  - **If no folder exists**: Start fresh from Step 2.
  - **Status handling**: Do NOT change the idea's status during research. After completion, assess whether findings warrant a status rollback (see Step 5).

If the user specifies a slug, use that idea directly (verify it has a BRD).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/brd-generator` first.

After selecting the idea, **explain the user's role** before proceeding:

> **How Customer Validation works:**
>
> This step is different from other pipeline skills — **you do most of the work**, and I assist.
>
> Here's what will happen:
> 1. **I generate the tools** — assumption map, survey template, interview script, and a validation scorecard (I also do desk research on competitor user reviews)
> 2. **You run the validation** — deploy the survey, conduct interviews, and gather real feedback from potential customers
> 3. **You bring back the data** — paste survey results, interview notes, or any findings you collected
> 4. **I update the scorecard** — I'll score the evidence and update the validation scorecard
>
> **Don't have time for all of it?** That's fine. You can:
> - Run just the survey (fastest — share on social media, get responses in a few days)
> - Run just 3-5 interviews (deepest — even a few conversations reveal a lot)
> - Or run `/customer-validation close` at any point — I'll fill in whatever's missing using online desk research (app reviews, forums, social media sentiment). It won't be as strong as primary data, but it's better than nothing.
>
> Want to proceed?

Wait for the user to confirm before continuing to Step 2.

### 2. Read Context Documents

Read the following files for the selected idea:

- `ideas/<slug>/preparation/INITIAL-BRD.md` — the primary source (fall back to `ideas/<slug>/BRD.md` for pre-restructuring ideas)
- `ideas/<slug>/IDEA.md` — original idea context
- `ideas/<slug>/RESEARCH.md` — raw research data (if available)

Update the idea's status to `customer-validation` in both `IDEAS_TRACKER.md` and `ideas/<slug>/IDEA.md`.

**Tracker updates when starting:**
- **Pipeline Summary**: Decrement the previous status count (e.g., `BRD Complete`), increment `Customer Validation`
- **Ideas Pipeline table**: Update the idea's **Status** to `customer-validation`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `CUSTOMER_VALIDATION_STARTED`, **Details**: `Customer validation artifacts generation initiated`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

### 3. Create Output Folder & Artifacts

Read the template from `.claude/skills/customer-validation/references/customer-validation-template.md`.

Create `ideas/<slug>/CUSTOMER_VALIDATION/` folder with the following files:

#### 3a. README.md — Validation Dashboard

Create `ideas/<slug>/CUSTOMER_VALIDATION/README.md` with:

- **Idea Summary**: One-paragraph problem/solution recap from BRD
- **Target Customer Segments**: Extracted from BRD — each segment with description, estimated size, and accessibility (how easy to reach for research)
- **Validation Progress Table**:

```markdown
## Validation Progress

| # | Artifact | File | Status | Updated |
|---|----------|------|--------|---------|
| 1 | Assumption Map | [01-assumption-map.md](01-assumption-map.md) | pending | — |
| 2 | Survey Template | [02-survey-template.md](02-survey-template.md) | pending | — |
| 3 | Interview Script | [03-interview-script.md](03-interview-script.md) | pending | — |
| 4 | Competitor User Research | [04-competitor-user-research.md](04-competitor-user-research.md) | pending | — |
| 5 | Validation Scorecard | [05-validation-scorecard.md](05-validation-scorecard.md) | pending | — |
```

#### 3b. Artifact 1 — Assumption Map (`01-assumption-map.md`)

Extract every assumption from the BRD and categorize them:

**For each assumption, document:**
- **ID**: ASM-001, ASM-002, etc.
- **Assumption**: What is being assumed (clear, testable statement)
- **Category**: Problem (the problem exists), Customer (customers behave this way), Solution (our solution works), Market (the market is this size), Revenue (customers will pay this much), Technical (this can be built)
- **Risk if Wrong**: What happens to the business if this assumption is false (Critical / High / Medium / Low)
- **Current Evidence**: What evidence exists today (from BRD research, if any)
- **Evidence Strength**: Strong (multiple independent sources), Moderate (some data), Weak (anecdotal/assumed), None (pure hypothesis)
- **Validation Method**: How to test this — survey question, interview probe, landing page test, prototype test, market data, etc.
- **Priority**: Test First / Test Soon / Test Later (based on risk × evidence weakness)

**Prioritization logic:**
- **Test First**: Critical/High risk + Weak/None evidence — these are the dangerous unknowns
- **Test Soon**: Critical risk + Moderate evidence, OR Medium risk + None evidence
- **Test Later**: Low risk, OR already has Strong evidence

#### 3c. Artifact 2 — Survey Template (`02-survey-template.md`)

Generate a ready-to-use customer survey (deployable on Google Forms, Typeform, or SurveyMonkey) that tests the highest-priority assumptions:

**Survey design principles:**
- **Max 15 questions** — respect respondent time
- **Screening questions first** — filter for target segment (2-3 questions)
- **Problem validation** — confirm the problem exists and is painful (3-4 questions)
- **Current behavior** — how they solve the problem today (2-3 questions)
- **Solution interest** — reaction to the proposed solution without overselling (2-3 questions)
- **Willingness to pay** — Van Westendorp or direct pricing questions (2-3 questions)
- **Demographics/firmographics** — for segmentation analysis (2-3 questions)

**For each question, provide:**
- Question text (in both Arabic and English if idea targets Arabic-speaking market)
- Question type (multiple choice, Likert scale, open-ended, ranking)
- Answer options (if applicable)
- Which assumption(s) it tests (ASM-ID reference)
- What a "validating" vs "invalidating" answer looks like

**Include:**
- Suggested sample size per segment (with statistical rationale — typically n≥30 for directional, n≥100 for statistical significance)
- Distribution channels (where to find these respondents — social media groups, LinkedIn, industry forums, etc.)
- Expected response rate and how many to contact to hit target sample size

#### 3d. Artifact 3 — Interview Script (`03-interview-script.md`)

Generate a semi-structured interview guide for 1-on-1 customer discovery interviews:

**Script structure:**
1. **Warm-up** (2 min): Introduction, context setting, permission to record
2. **Current Behavior** (5 min): "Tell me about the last time you [problem context]..." — open-ended, no leading questions
3. **Problem Exploration** (8 min): Deep dive into pain points, frequency, severity. Use "5 Whys" technique to get to root causes
4. **Current Solutions** (5 min): What they use today, what they like/dislike, what they've tried and abandoned
5. **Solution Reaction** (5 min): Present the concept at a high level (not a pitch — a description). Capture genuine reaction. Probe on specific features from BRD
6. **Willingness to Pay** (3 min): "If this existed today, would you use it? Would you pay for it? What would be reasonable?"
7. **Wrap-up** (2 min): Anything else, referrals to other potential interviewees

**For each section, provide:**
- Primary questions (the must-asks)
- Follow-up probes (if they give a surface-level answer)
- Red flags to watch for (social desirability bias, hypothetical answers)
- Which assumptions each question tests (ASM-ID reference)

**Include:**
- Recommended number of interviews (typically 8-12 per segment for saturation)
- Recruitment approach per segment
- Note-taking template (structured fields to fill during/after interview)
- Analysis framework (how to synthesize findings across interviews)

#### 3e. Artifact 4 — Competitor User Research (`04-competitor-user-research.md`)

**Research & Citation Methodology**: Follow `.claude/skills/research-citations/SKILL.md` for all research. Cite sources inline.

Conduct desk research on what real users say about existing competitors/alternatives:

1. **App Store / Play Store Reviews**: Search for competitor apps, extract common complaints and praise. Cite specific reviews with star rating and date
2. **Reddit / Forum Posts**: Search for discussions about the problem space. What are people complaining about? What do they wish existed?
3. **Social Media Sentiment**: Search Twitter/X, LinkedIn for mentions of competitors or the problem
4. **Review Sites**: G2, Capterra, Trustpilot — aggregate sentiment for competing solutions
5. **News & Blog Posts**: User experience articles, comparison reviews

**For each source, document:**
- Platform and search query used
- Number of results found
- Top complaints / pain points (with direct quotes where possible)
- Top praised features
- Unmet needs / feature requests
- Relevance to our idea's value proposition

**Synthesize into:**
- **Voice of Customer Summary**: The 3-5 most common pain points across all sources
- **Opportunity Gaps**: Where existing solutions fall short (validates or challenges BRD assumptions)
- **Feature Demand Signals**: Features users are explicitly asking for that align with our BRD

#### 3f. Artifact 5 — Validation Scorecard (`05-validation-scorecard.md`)

Create a pre-filled scorecard that the user will complete after running the surveys/interviews:

**Scorecard sections:**

1. **Problem Validation Score** (0-10):
   - Does the target audience confirm the problem exists? (0-3)
   - Is the problem frequent enough to warrant a solution? (0-2)
   - Is the problem painful enough that they'd switch from current solutions? (0-3)
   - Are they actively looking for better alternatives? (0-2)

2. **Solution Validation Score** (0-10):
   - Does the proposed solution address the confirmed pain points? (0-3)
   - Did respondents react positively to the concept? (0-3)
   - Would they use it given their current workflow? (0-2)
   - Are there must-have features we're missing? (0-2)

3. **Willingness to Pay Score** (0-10):
   - Did respondents confirm they'd pay for this? (0-3)
   - Does the stated WTP support the BRD's pricing assumptions? (0-3)
   - Is there a clear segment willing to pay a premium? (0-2)
   - Are there segments that expect this to be free? (0-2)

4. **Market Validation Score** (0-10):
   - Does the reachable market match BRD's SAM estimate? (0-3)
   - Is the target segment accessible for customer acquisition? (0-3)
   - Are there unexpected adjacent segments? (0-2)
   - Does timing feel right (market readiness)? (0-2)

**Scoring guide:**

| Total Score (0-40) | Verdict | Action |
|---------------------|---------|--------|
| 30-40 | **Strong Validation** | Proceed with confidence. Evidence strongly supports the idea |
| 20-29 | **Moderate Validation** | Proceed with adjustments. Revisit weak areas before heavy investment |
| 10-19 | **Weak Validation** | Pivot or significantly redesign. Core assumptions may be wrong |
| 0-9 | **Failed Validation** | Stop or completely rethink. The market signal isn't there |

**Pre-fill with desk research findings:**
Based on the competitor user research (Artifact 4), pre-populate what can be answered from secondary research alone, with a note that primary research (surveys + interviews) should update these scores.

**After each artifact is complete**, update its row in the README.md Validation Progress table: set **Status** to `complete` and **Updated** to today's date.

### 4. Desk Research Summary

After generating all artifacts, write a **Desk Research Summary** section in `README.md` that synthesizes what's already known:

- **Assumptions with existing evidence** (from BRD research + competitor user research)
- **Assumptions that MUST be tested** (no evidence, high risk)
- **Preliminary scorecard** (pre-filled from desk research only — clearly marked as "pre-validation")
- **Recommended validation sequence**: Which to run first (usually surveys for breadth, then interviews for depth)
- **Estimated effort**: Time and cost to run the recommended validation (e.g., "2 weeks, ~$50 for survey distribution")

### 5. Update Tracker and Status

After all artifacts are complete:

#### Normal flow (idea was `brd-complete` or `customer-validation`)

**Update `ideas/<slug>/IDEA.md`:**
- Set status to `customer-validation-complete`
- Add a Customer Validation field: `[CUSTOMER_VALIDATION/](CUSTOMER_VALIDATION/README.md)`

**Update `IDEAS_TRACKER.md`:**
- **Pipeline Summary**: Decrement the previous status count, increment `Customer Validation Complete`. Update `Last Updated` date at top
- **Ideas Pipeline table**: Update the idea's **Status** to `customer-validation-complete`, set **Updated** to today's date
- **Activity Log**: Add a row at the top — **Event**: `CUSTOMER_VALIDATION_COMPLETED`, **Details**: `<N> assumptions mapped (<N> Test First priority); Survey (<N> questions), interview script, competitor user research, and scorecard generated`
- If the activity table exceeds 20 data rows, remove the oldest entry

#### Re-run on completed idea (idea was already past `customer-validation-complete`)

After completing the work, assess whether the findings materially change the idea's direction. Check for **significant impact indicators**:

- Competitor user research reveals a major unmet need not captured in the BRD
- Evidence strength for a critical assumption changed from Strong to Weak (or vice versa)
- A new customer segment emerged that wasn't in the BRD
- WTP signals from desk research significantly contradict BRD pricing assumptions

**If significant impact is found:**
- Set status to `customer-validation-complete` (triggers re-evaluation from `/business-research` onward)
- **Activity Log**: Event `CUSTOMER_VALIDATION_COMPLETED`, Details include `(re-run — significant findings); Status rolled back — <brief reason>`

**If no significant impact:**
- Do NOT change the status (keep existing status)
- **Activity Log**: Event `CUSTOMER_VALIDATION_COMPLETED`, Details include `(supplementary — confirms existing direction)`

### 6. Present Summary

Summarize for the user:

> **Customer Validation Artifacts Generated for "<Idea Name>"**
>
> **Assumption Map:**
> - Total assumptions: <count>
> - Test First (critical, low evidence): <count>
> - Test Soon: <count>
> - Test Later: <count>
>
> **Categories:**
> - Problem assumptions: <count>
> - Customer assumptions: <count>
> - Solution assumptions: <count>
> - Market assumptions: <count>
> - Revenue assumptions: <count>
> - Technical assumptions: <count>
>
> **Artifacts Generated:**
> - Survey template: <N> questions targeting <N> assumptions
> - Interview script: 7 sections, ~30 min per interview
> - Competitor user research: <N> platforms analyzed
> - Validation scorecard: Pre-filled with desk research (score: <N>/40)
>
> **Key Findings from Desk Research:**
> - <top 2-3 insights from competitor user research>
>
> **Recommended Next Steps:**
> 1. Deploy survey to <segment> via <channel> (target n=<N>)
> 2. Conduct <N> interviews per segment
> 3. Come back and paste your results — I'll update the validation scorecard
> 4. Or run `/customer-validation close` if you want me to fill gaps with desk research
> 5. Then run `/business-research` to proceed with feature-level competitive analysis
>
> **Files created:**
> - `ideas/<slug>/CUSTOMER_VALIDATION/` (5 artifacts + README)

---

### 7. Gap Closure (`/customer-validation close`)

When the user runs `/customer-validation close`, this triggers the gap-closure flow. The user may have:
- Completed some validation (e.g., ran the survey but not interviews)
- Brought partial data (e.g., 5 interview notes instead of 12)
- Done nothing yet but wants to close out and move on

**Step 7a: Assess what exists**

Read `CUSTOMER_VALIDATION/README.md` and all artifact files. Identify:
- Which artifacts were generated (should be all 5 from Step 3)
- Whether the user has provided any primary research data (check if scorecard has been updated from "pre-validation" status, or if the user pastes data in the conversation)

Ask the user:
> Before I close this out, do you have any validation data to share? You can paste:
> - Survey results (raw numbers, summary, or screenshots)
> - Interview notes (even rough bullet points)
> - Any conversations or feedback you received informally
>
> Or just say **"no data"** and I'll fill everything in with desk research.

**Step 7b: Incorporate user data (if any)**

If the user provides data:
1. Parse whatever format they provide (raw numbers, notes, screenshots, informal bullet points)
2. Map their findings to specific assumptions (ASM-IDs) in the assumption map
3. Update the evidence strength for those assumptions: upgrade from Weak/None to Moderate (if partial data) or Strong (if multiple data points)
4. Update the validation scorecard with real scores for questions that have primary data

**Step 7c: Fill gaps with desk research**

For every assumption that still has Weak or None evidence after incorporating user data:

1. **Conduct targeted web research** for each gap:
   - **Problem assumptions**: Search for user complaints, forum discussions, support tickets, social media posts about the problem. Look for evidence that people actually experience this pain
   - **Customer assumptions**: Search for demographic/behavioral data about the target segment. Industry reports on user behavior patterns
   - **Solution assumptions**: Search for user reactions to similar solutions. Product Hunt comments, beta tester feedback on comparable products
   - **Revenue/WTP assumptions**: Search for competitor pricing pages, pricing comparison articles, willingness-to-pay studies in the vertical, app store purchase data
   - **Market assumptions**: Search for updated market size data, growth reports, analyst forecasts
   - **Technical assumptions**: Already covered by BRD research — note as "deferred to /tech-research"

2. **Update artifacts**:
   - `01-assumption-map.md`: Update evidence strength and current evidence fields for each researched assumption. Mark the source as "desk research (gap closure)" vs "primary research (user-provided)"
   - `04-competitor-user-research.md`: Expand with any new sources found during gap closure
   - `05-validation-scorecard.md`: Update scores with desk research evidence. Change status to "Post-Validation (desk research + partial primary)" or "Post-Validation (desk research only)" depending on whether user provided any data

3. **Clearly label evidence quality** throughout all updated files:
   - 🟢 **Primary** — from user's surveys/interviews (strongest)
   - 🟡 **Secondary** — from desk research during gap closure (moderate)
   - 🔴 **Assumed** — no evidence found, assumption stands as-is (weakest)

**Step 7d: Update scorecard and present closing summary**

Update the validation scorecard with final scores. Add a **Confidence Assessment** section:

```markdown
## Confidence Assessment

| Evidence Type | Assumptions Covered | % of Total |
|--------------|-------------------|------------|
| 🟢 Primary (user data) | <N> | <X%> |
| 🟡 Secondary (desk research) | <N> | <X%> |
| 🔴 Assumed (no evidence) | <N> | <X%> |

**Overall Confidence**: Low / Medium / High
- High: >60% primary + secondary coverage, no critical assumptions at 🔴
- Medium: 40-60% coverage, or critical assumptions only at 🟡
- Low: <40% coverage, or critical assumptions at 🔴
```

Then proceed to Step 5 (Update Tracker) and Step 6 (Present Summary), but modify the summary to include:

> **Validation Method**: Desk research gap closure <+ partial primary data if applicable>
> **Evidence Confidence**: <Low/Medium/High> — <X>% primary, <X>% secondary, <X>% assumed
>
> **Note**: This validation is based primarily on desk research. While useful for identifying signals, it is less reliable than primary customer data. High-risk assumptions marked 🔴 should be monitored during early development.

### Compatibility Note

This skill is **optional** in the pipeline. Downstream skills (`/business-research`, `/supporting-systems`, `/marketing-strategy`, `/tech-research`, `/pricing-strategy`, `/prd-generator`) accept ideas without customer validation. The pipeline flow is:

**With validation**: `/brd-generator` → `/customer-validation` → `/business-research` → ...
**Without validation**: `/brd-generator` → `/business-research` → ... (unchanged)

When customer validation exists, `/business-research` should read `CUSTOMER_VALIDATION/README.md` for additional context but does not require it.

## Modifiers

### help
Usage: `/customer-validation help`

**customer-validation** — No description

Available modifiers:
- `help` — Show this help message
