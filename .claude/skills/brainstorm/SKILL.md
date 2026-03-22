# /brainstorm

Generate, score, and rank project ideas for any context — hackathons, startups, side projects, competitions, or open exploration. Produces context-specific KPIs, scores each idea against them, and recommends the strongest candidate for the Idea Forge pipeline.

## Trigger Detection

This skill activates when:

1. **User runs `/brainstorm`** — with an optional context description
2. **User says** "brainstorm ideas for...", "I need ideas for...", "help me come up with ideas for..."

---

## Flow Overview

```
/brainstorm [context] → Define KPIs → Generate Ideas → Quick Research → Score → Rank → Recommend → Pipeline Handoff
```

---

## Phase 1: Understand the Context

### 1.1 Gather Context

If the user provides a context description (e.g., "hackathon about historical sites", "SaaS startup for Saudi market"), use it directly.

If the context is missing or vague, ask:

> **What are we brainstorming for?**
>
> 1. **Competition / Hackathon** — I'll optimize for judging criteria, demo impact, and time constraints
> 2. **Startup / Business** — I'll optimize for market opportunity, revenue potential, and defensibility
> 3. **Side Project / Learning** — I'll optimize for feasibility, fun factor, and skill growth
> 4. **Open Exploration** — I'll generate diverse ideas and let you pick what resonates
>
> Also tell me:
> - **Theme or domain** (if any): e.g., "AI + tourism", "sustainability", "fintech"
> - **Constraints**: time limit, team size, required tech, budget, region
> - **Judging criteria** (if competition): what do judges care about?
> - **Your strengths**: what tech/skills can your team leverage?

### 1.2 Create the Concept

Generate a **concept slug** from the context (e.g., `historical-sites-hackathon-2026`, `saudi-saas-ideas-mar-2026`).

Confirm the slug with the user before proceeding.

Create the folder: `brainstorm/<concept-slug>/`

---

## Phase 2: Define KPIs

Based on the context, generate **5-8 weighted KPIs** that predict success for this specific situation. KPIs are NOT hardcoded — they are dynamically chosen to match the context.

### KPI Design Rules

1. **Each KPI must be specific and scorable** (1-10 scale)
2. **Each KPI gets a weight** (1-5) reflecting its importance for THIS context
3. **Include both "upside" KPIs** (what makes an idea win) and **"risk" KPIs** (what could make it fail, scored inversely)
4. **At least one KPI must be unique to this context** (not generic)
5. **Total weights should sum to a meaningful spread** — avoid giving everything weight 3

### KPI Bank (pick and adapt, or create new ones)

**Competition / Hackathon KPIs:**
| KPI | Description | Typical Weight |
|-----|-------------|---------------|
| Innovation Score | How novel is the idea? Does it combine concepts in a new way? | 4-5 |
| Demo Impact | How impressive is it in a 3-5 minute live demo? | 4-5 |
| Time-to-MVP | Can a working prototype be built in the available time? | 4-5 |
| Theme Alignment | How directly does it address the hackathon theme? | 3-5 |
| Judge Appeal | Does it match what judges typically reward? (tech depth, social impact, business viability) | 3-4 |
| Technical Depth | Does it showcase meaningful engineering, not just a wrapper? | 2-4 |
| Team-Skill Fit | Can THIS team actually build it with their skills? | 3-4 |

**Startup / Business KPIs:**
| KPI | Description | Typical Weight |
|-----|-------------|---------------|
| Market Size | Is the addressable market large enough? | 4-5 |
| Revenue Clarity | Is there an obvious way to make money? | 3-5 |
| Differentiation | What's the moat? Why can't incumbents copy it easily? | 4-5 |
| Problem Severity | Is this a painkiller (must-have) or vitamin (nice-to-have)? | 4-5 |
| Feasibility | Can it be built with available resources and timeline? | 3-4 |
| Scalability | Can it grow without proportional cost increase? | 2-4 |
| Regulatory Risk | Are there legal/compliance barriers? (inverse: higher = less risk) | 2-3 |

**General / Side Project KPIs:**
| KPI | Description | Typical Weight |
|-----|-------------|---------------|
| Fun Factor | Will the team enjoy building this? | 3-4 |
| Learning Value | Does it teach valuable new skills? | 2-4 |
| Completion Likelihood | Can it realistically be finished? | 3-5 |
| Portfolio Value | Does it look impressive to employers/clients? | 2-3 |
| User Impact | Will real people benefit from this? | 3-4 |

### KPI Output

Write the selected KPIs to `brainstorm/<concept-slug>/CONCEPT_DASHBOARD.md` (see template in references). Present them to the user:

> **KPIs for this brainstorm:**
>
> | # | KPI | Weight | Why |
> |---|-----|--------|-----|
> | 1 | Innovation Score | 5 | Hackathon judges reward novelty above all |
> | ... | ... | ... | ... |
>
> Want to adjust any KPIs or weights before I generate ideas?

Wait for user confirmation before proceeding.

---

## Phase 3: Generate Ideas

### 3.1 Brainstorming Techniques

Use a mix of structured techniques to ensure diversity:

1. **Direct ideation** — straightforward solutions to the stated problem/theme
2. **Analogy transfer** — what works in another domain that could apply here?
3. **Constraint flip** — what if we reversed a key constraint?
4. **Intersection** — combine two unrelated concepts from the domain
5. **User journey** — follow a specific user through their day — where are the pain points?
6. **Emerging tech leverage** — what new technology makes something newly possible?

### 3.2 Idea Generation

Generate **5-8 distinct ideas** (or more if the user requests). Each idea gets a brief (1-2 paragraph) description covering:

- **Name**: Catchy, memorable project name
- **One-liner**: Single sentence pitch
- **How it works**: Core mechanism / user flow (2-3 sentences)
- **Why it wins**: The key insight that makes this idea strong for this context
- **Key risk**: The biggest thing that could go wrong

### 3.3 Quick Research Validation

For each generated idea, perform **quick web research** to validate:

- Does something similar already exist? (If yes, how is this different?)
- Is the core technical approach feasible?
- Are there obvious market/regulatory blockers?

**Research rigor**: Follow the `/research-citations` methodology. Every factual claim in the idea briefs must be sourced. If you find that an idea is invalidated by research (e.g., a near-identical product already dominates), note it — the scoring will reflect this.

Write each idea to its own file: `brainstorm/<concept-slug>/<idea-slug>/IDEA_BRIEF.md` (see template in references).

---

## Phase 4: Score and Rank

### 4.1 Scoring

Score each idea against every KPI on a **1-10 scale** with a brief justification (1 sentence per score).

**Scoring calibration:**
- **9-10**: Exceptional — top 10% of ideas you'd see in this context
- **7-8**: Strong — clearly above average
- **5-6**: Average — solid but not standout
- **3-4**: Below average — notable weaknesses
- **1-2**: Poor — fundamental problems

### 4.2 Weighted Score Calculation

For each idea:
```
Weighted Score = SUM(KPI_score × KPI_weight) / SUM(KPI_weights) × 10
```

This normalizes to a 0-100 scale for easy comparison.

### 4.3 Ranking

Rank ideas by weighted score. Also note:
- **Highest ceiling**: Which idea has the most upside if everything goes right?
- **Safest bet**: Which idea is most likely to produce a solid result regardless?
- **Dark horse**: Which idea could surprise everyone if executed well?

### 4.4 Update Dashboards

Update `brainstorm/<concept-slug>/CONCEPT_DASHBOARD.md`:
- **Scoring Matrix**: Add new ideas as rows to the SINGLE scoring matrix table. Do NOT create separate tables per round. Include a `Round` column (1, 2, 3, ... or `ext` for externally submitted ideas) to track which brainstorm round generated each idea. Re-rank all ideas together by weighted score.
- **Ideas Index**: Add new ideas as rows to the SINGLE Ideas Index table. Every idea MUST appear here with a linked name pointing to its `IDEA_BRIEF.md`. Include the `Round` column here too.
- **Idea names MUST always be markdown links** to their `IDEA_BRIEF.md` file in both the Scoring Matrix and the Ideas Index — e.g., `[Idea Name](idea-slug/IDEA_BRIEF.md)`. Never use plain text for idea names in tables.
- **Rankings**: Update the Top Pick / Safest Bet / Dark Horse based on the combined pool of ALL ideas across all rounds.

Update each new `IDEA_BRIEF.md` with that idea's individual scores. Update the `Rank` field to reflect position in the combined ranking (e.g., "#3 of 15" not "#1 of 5").

---

## Phase 5: Recommend and Improve

### 5.1 Recommendation

Present the top 3 ideas with:
- Their weighted scores
- Key strengths and risks
- What would need to be true for each to succeed

### 5.2 Score Improvement Plan

For the **#1 ranked idea**, generate a concrete improvement plan:

> **How to maximize [Idea Name]'s score:**
>
> | KPI | Current | Target | How to Improve |
> |-----|---------|--------|---------------|
> | Demo Impact | 6 | 9 | Add real-time visualization, prepare a compelling narrative |
> | ... | ... | ... | ... |

### 5.3 Pipeline Handoff

Ask the user:

> **Ready to develop an idea further?**
>
> Pick an idea to push into the Idea Forge pipeline:
> → `/new-idea` to capture it formally
> → Then: `/brd-generator` → `/business-research` → `/tech-research` → `/pricing-strategy` → `/prd-generator`
>
> Which idea should we develop? (Or would you like to brainstorm more?)

If the user picks an idea, offer to run `/new-idea` with the idea brief pre-filled.

---

## Phase 6: Update Main Tracker

### 6.1 Update BRAINSTORM_TRACKER.md

Read (or create) `brainstorm/BRAINSTORM_TRACKER.md`. Add/update this concept's entry with:
- Concept name, slug, date, context summary
- Number of ideas generated
- Top idea name and score
- Status: `scored` / `pipeline` (if an idea was sent to `/new-idea`)

### 6.2 Activity Log

Add an activity entry to the tracker for this brainstorm session.

---

## Dashboard File Specifications

### BRAINSTORM_TRACKER.md (Main Dashboard)

Located at `brainstorm/BRAINSTORM_TRACKER.md`. This is the single-glance overview of ALL brainstorm sessions.

See `references/brainstorm-template.md` for the full template.

Sections:
1. **Summary** — total concepts, total ideas generated, ideas sent to pipeline
2. **Concepts Table** — one row per brainstorm concept, with link to its dashboard
3. **Recent Activity** — last 20 events (same cap as IDEAS_TRACKER.md)

### CONCEPT_DASHBOARD.md (Per-Concept)

Located at `brainstorm/<concept-slug>/CONCEPT_DASHBOARD.md`.

See `references/brainstorm-template.md` for the full template.

Sections:
1. **Context** — what was the brainstorm about, constraints, goals
2. **KPIs** — the scoring criteria with weights and rationale
3. **Scoring Matrix** — all ideas × all KPIs with scores and weighted totals
4. **Rankings** — ordered list with tags (Top Pick, Safest Bet, Dark Horse)
5. **Recommendation** — top idea analysis and improvement plan
6. **Ideas Index** — links to each idea's IDEA_BRIEF.md
7. **Pipeline Status** — which ideas (if any) were sent to `/new-idea`

### IDEA_BRIEF.md (Per-Idea)

Located at `brainstorm/<concept-slug>/<idea-slug>/IDEA_BRIEF.md`.

See `references/brainstorm-template.md` for the full template.

Sections:
1. **Idea header** — name, one-liner, concept context
2. **Description** — how it works, why it wins, key risk
3. **Research Notes** — quick validation findings with sources
4. **Scores** — this idea's KPI scores with justifications
5. **Improvement Plan** — (only for top-ranked idea)

---

## Resumability

If a brainstorm session is interrupted:

1. The concept folder and any completed files persist
2. On re-invocation with the same concept slug, the skill reads existing files and resumes from where it left off
3. The `CONCEPT_DASHBOARD.md` tracks which phases are complete

**Context management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. If context runs low during idea generation or scoring, save progress to the dashboard and draft a continuation prompt.

---

## Refinement Mode

If the user invokes `/brainstorm` on an existing concept (same slug or user specifies):

- **"Add more ideas"** — generate additional ideas, score them, re-rank
- **"Rescore"** — re-evaluate with updated KPIs or weights
- **"Deep dive on [idea]"** — expand research on a specific idea before pipeline handoff
- **"Compare [idea A] vs [idea B]"** — detailed head-to-head analysis

### Multi-Round Consistency Rules

When adding ideas in subsequent rounds (refinement, continuation sessions, or user-submitted external ideas):

1. **Single Scoring Matrix**: There is ONE scoring matrix table in the dashboard. New ideas are appended as rows — never create a separate table per round.
2. **Round column**: Every row has a `Round` column value (1, 2, 3, ... or `ext` for external/user-submitted ideas).
3. **Linked idea names**: Idea names in the Scoring Matrix AND Ideas Index MUST always be markdown links to their `IDEA_BRIEF.md` — e.g., `[Idea Name](idea-slug/IDEA_BRIEF.md)`. No plain-text idea names.
4. **Ideas Index stays in sync**: Every idea that appears in the Scoring Matrix MUST also appear in the Ideas Index, and vice versa. When adding new ideas, add them to BOTH tables.
5. **Combined ranking**: Re-rank ALL ideas (from all rounds) together by weighted score. Update rank numbers, Top Pick / Safest Bet / Dark Horse tags, and the Recommendation section to reflect the full combined pool.
6. **Header fields**: Update the header's "Ideas Generated" count and "Top Idea" to reflect the combined totals.

---

## Integration with Idea Forge Pipeline

When an idea is selected for the pipeline:

1. The skill offers to run `/new-idea` with pre-filled data from the IDEA_BRIEF.md
2. The IDEA_BRIEF.md research notes get carried forward into the idea's RESEARCH.md
3. The concept dashboard is updated with a "Sent to Pipeline" status and link to the idea in IDEAS_TRACKER.md
4. The brainstorm tracker is updated accordingly

This ensures no research is lost in the handoff.

## Modifiers

### help
Usage: `/brainstorm help`

**brainstorm** — No description

Available modifiers:
- `help` — Show this help message
