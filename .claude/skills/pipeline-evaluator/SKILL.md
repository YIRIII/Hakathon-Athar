---
name: pipeline-evaluator
description: >
  Evaluate the idea-forge pipeline end-to-end or per-stage. Use when: (1) user invokes
  `/pipeline-evaluator`, (2) user wants to test pipeline quality, consistency, or edge cases,
  (3) user says "evaluate the pipeline", "benchmark skills", "test the workflow", or
  "run pipeline evaluation". Supports three modes: full pipeline evaluation with diverse ideas,
  consistency testing with repeated runs, and isolated stage testing against fixture data.
---

# Pipeline Evaluator

Evaluate the idea-forge pipeline quality through structured test runs. Operates as a thin
orchestrator — all heavy work happens in sub-agents with fresh context windows.

## Architecture

```
Pipeline Evaluator (this agent — orchestrator)
  |
  +-> Sub-agent: Run skill stage        (Level 1 — fresh context)
  |     +-> Sub-agent: research tasks   (Level 2 — skill's own pattern)
  |     Returns: ~200 token summary + timing
  |
  +-> Sub-agent: Grade stage output     (Level 1 — fresh context)
  |     Reads output files from disk, scores against rubric
  |     Returns: scorecard JSON
  |
  (orchestrator only holds summaries + scorecards, never full documents)
```

**Critical rule**: The orchestrator NEVER reads full output files (BRD, PRD, research docs).
All file reading and grading happens inside sub-agents. The orchestrator only collects
summaries and scorecards.

## Evaluation Modes

Ask the user which mode to run, or infer from context.

### Mode 1: Diverse Ideas (Edge Case Discovery)

Tests the pipeline with **different starting ideas** to find where skills break or underperform.

1. Present 4 diverse test ideas to the user for approval (or let them provide their own):
   - A **SaaS product** (e.g., AI-powered invoice reconciliation for SMBs)
   - A **hardware/IoT product** (e.g., smart irrigation system for urban farms)
   - A **local/niche service** (e.g., mobile car detailing marketplace for a specific city)
   - A **B2G or nonprofit** (e.g., government permit digitization platform)

2. For each idea, run the full pipeline sequentially (see [Running the Pipeline](#running-the-pipeline))
3. After all runs, produce the [Evaluation Report](#evaluation-report)

### Mode 2: Consistency Test (Same Prompt)

Tests whether the pipeline produces **consistent quality** given identical input.

1. Pick one idea (user provides or use a default — a mid-complexity SaaS product works well)
2. Run the full pipeline **3 times** with the exact same IDEA.md content
3. Grade each run independently
4. Compare scores across runs — flag stages with high variance
5. Produce the [Evaluation Report](#evaluation-report) with a consistency analysis section

### Mode 3: Stage Isolation (Targeted)

Tests a **single skill** in isolation using fixture data from a completed idea.

1. User specifies which skill to test and which completed idea to use as fixtures
2. Copy the completed idea's upstream outputs to a test directory as fixed inputs
3. Run only the target skill **3 times** against those fixtures
4. Grade outputs and compare
5. Produce a focused [Stage Report](#stage-report)

This mode is the cheapest and best suited for iterating on a specific skill with `/skill-creator`.

## Running the Pipeline

For each test idea in Mode 1 or Mode 2, run these stages sequentially. Each stage is a
sub-agent with a fresh context window.

### Setup

Create a workspace for this evaluation run:

```
idea-forge/evaluations/
  eval-YYYY-MM-DD-HHMM/
    config.json              # Evaluation config (mode, ideas, settings)
    ideas/
      <slug>/                # Mirror of ideas/<slug>/ structure
        IDEA.md
        RESEARCH.md
        preparation/
          INITIAL-BRD.md
        BUSINESS_RESEARCH/
        SUPPORTING_SYSTEMS/
        MARKETING_STRATEGY/
        TECHNICAL_OPTIONS/
        PRICING_STRATEGY/
        RISK_ASSESSMENT/
        PRD.md
        BRD.md
    scorecards/
      <slug>/
        01-brd-generator.json
        02-business-research.json
        03-supporting-systems.json
        04-marketing-strategy.json
        05-tech-research.json
        06-pricing-strategy.json
        07-risk-assessment.json
        08-prd-generator.json
    report.md                # Final evaluation report
```

For Mode 2 (consistency), add a run number: `ideas/<slug>-run-1/`, `ideas/<slug>-run-2/`, etc.

### Stage Execution Pattern

For each stage, spawn a sub-agent with this pattern:

```
You are running an idea-forge pipeline stage for evaluation purposes.

**Skill to run**: /[skill-name]
**Idea slug**: [slug]
**Working directory**: E:\Cursor projects\idea-forge\idea-forge
**Output directory**: evaluations/[eval-id]/ideas/[slug]/

IMPORTANT INSTRUCTIONS:
- Read the skill at .claude/skills/[skill-name]/SKILL.md
- Follow the skill's instructions exactly as if a user invoked it
- But write ALL outputs to the evaluation output directory instead of ideas/[slug]/
- The idea's upstream files are already in the output directory (copied from previous stage)
- Do NOT modify IDEAS_TRACKER.md or any files outside the output directory
- Do NOT ask the user any questions — make reasonable default choices
- When the skill asks to pick an idea interactively, use the one specified above

When done, return a summary in this exact format:
STAGE_SUMMARY:
- stage: [skill-name]
- slug: [slug]
- files_created: [list of files written]
- duration_estimate: [rough time taken]
- issues: [any errors, warnings, or problems encountered]
- notes: [brief description of what was produced]
```

### Stage Sequence

**Stage 0: Create IDEA.md** (orchestrator does this directly — it's small)
- Write the test idea's IDEA.md to the output directory
- For Mode 2, copy the same IDEA.md to each run directory

**Stage 1: /brd-generator**
- Input: IDEA.md
- Output: RESEARCH.md, preparation/INITIAL-BRD.md
- Sub-agent runs the full research + BRD generation

**Stage 2: /business-research**
- Input: IDEA.md, preparation/INITIAL-BRD.md, RESEARCH.md
- Output: BUSINESS_RESEARCH/ (README.md + per-feature files)
- Sub-agent spawns its own sub-agents for per-feature research

**Stage 3: /supporting-systems**
- Input: IDEA.md, preparation/INITIAL-BRD.md, BUSINESS_RESEARCH/README.md, BUDGET_CONTEXT.md
- Output: SUPPORTING_SYSTEMS/ (README.md + per-system files)
- Sub-agent detects supporting systems and researches build-vs-buy options

**Stage 4: /marketing-strategy**
- Input: IDEA.md, preparation/INITIAL-BRD.md, BUSINESS_RESEARCH/README.md, SUPPORTING_SYSTEMS/README.md, BUDGET_CONTEXT.md
- Output: MARKETING_STRATEGY/ (README.md + 5 phase files)
- Sub-agent spawns its own sub-agents for parallel phases. Updates BUDGET_CONTEXT.md with validated revenue bridge.

**Stage 5: /tech-research**
- Input: preparation/INITIAL-BRD.md, BUSINESS_RESEARCH/README.md, SUPPORTING_SYSTEMS/README.md, MARKETING_STRATEGY/README.md
- Output: TECHNICAL_OPTIONS/ (README.md + per-capability files)
- Sub-agent spawns its own sub-agents for per-capability research

**Stage 6: /pricing-strategy**
- Input: preparation/INITIAL-BRD.md, BUSINESS_RESEARCH/README.md, TECHNICAL_OPTIONS/README.md, MARKETING_STRATEGY/README.md, SUPPORTING_SYSTEMS/README.md
- Output: PRICING_STRATEGY/ (README.md + 5 phase files)
- Sub-agent spawns its own sub-agents for parallel phases

**Stage 7: /risk-assessment** (optional — include when idea has completed this stage)
- Input: All upstream files (INITIAL-BRD.md, BUSINESS_RESEARCH/README.md, SUPPORTING_SYSTEMS/README.md, MARKETING_STRATEGY/README.md, TECHNICAL_OPTIONS/README.md, PRICING_STRATEGY/README.md)
- Output: RISK_ASSESSMENT/ (README.md + 8 per-category files)
- Sub-agent spawns its own sub-agents for per-category risk analysis

**Stage 8: /prd-generator**
- Input: All upstream files (IDEA.md, INITIAL-BRD.md, BUSINESS_RESEARCH/README.md, SUPPORTING_SYSTEMS/README.md, MARKETING_STRATEGY/README.md, TECHNICAL_OPTIONS/README.md, PRICING_STRATEGY/README.md, RISK_ASSESSMENT/README.md)
- Output: PRD.md, BRD.md (final)

### Grading Each Stage

After each stage completes, spawn a **grading sub-agent** with:

```
You are grading an idea-forge pipeline stage output for quality evaluation.

**Stage**: [skill-name]
**Idea slug**: [slug]
**Output directory**: evaluations/[eval-id]/ideas/[slug]/

Read the output files for this stage and grade them against the rubric below.
Return your assessment as JSON in the exact format specified.

IMPORTANT: Read the actual files from disk. Be thorough but concise in evidence.
```

Include the rubric from [references/grading-rubrics.md](references/grading-rubrics.md).

The grader returns a scorecard JSON:

```json
{
  "stage": "brd-generator",
  "slug": "smart-irrigation",
  "scores": {
    "research_depth": { "score": 4, "max": 5, "evidence": "..." },
    "citation_quality": { "score": 3, "max": 5, "evidence": "..." },
    "structure_completeness": { "score": 5, "max": 5, "evidence": "..." },
    "actionability": { "score": 4, "max": 5, "evidence": "..." },
    "domain_accuracy": { "score": 3, "max": 5, "evidence": "..." }
  },
  "total_score": 19,
  "max_score": 25,
  "percentage": 76,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "critical_issues": ["..."]
}
```

Save each scorecard to `scorecards/<slug>/NN-stage-name.json`.

## Evaluation Report

After all stages and grading are complete, the orchestrator produces `report.md`:

### Report Structure

```markdown
# Pipeline Evaluation Report
Date: [date]
Mode: [1/2/3] — [description]
Ideas tested: [list]

## Executive Summary
[2-3 sentences: overall pipeline health, biggest issues, strongest stages]

## Score Matrix
| Stage | Idea 1 | Idea 2 | Idea 3 | Idea 4 | Avg |
|---|---|---|---|---|---|
| BRD Generator | 76% | 82% | ... | ... | ...% |
| Business Research | ... | ... | ... | ... | ...% |
| Supporting Systems | ... | ... | ... | ... | ...% |
| Marketing Strategy | ... | ... | ... | ... | ...% |
| Tech Research | ... | ... | ... | ... | ...% |
| Pricing Strategy | ... | ... | ... | ... | ...% |
| Risk Assessment | ... | ... | ... | ... | ...% |
| PRD Generator | ... | ... | ... | ... | ...% |
| **Pipeline Total** | **X%** | **X%** | **X%** | **X%** | **X%** |

## Per-Stage Analysis

### Stage 1: BRD Generator
- Average score: X%
- Variance across ideas: [low/medium/high]
- Common strengths: [...]
- Common weaknesses: [...]
- Recommendations: [...]

[repeat for each stage]

## Weakest Links (Priority Order)
1. [Stage] — [issue] — Impact: [how it affects downstream]
2. ...

## Edge Cases Discovered
- [Idea type]: [what broke or degraded]
- ...

## Recommendations
1. [Most impactful improvement]
2. ...

## Raw Scorecards
[Link to scorecard JSON files]
```

### For Mode 2 (Consistency)

Add a section:

```markdown
## Consistency Analysis
| Stage | Run 1 | Run 2 | Run 3 | Std Dev | Verdict |
|---|---|---|---|---|---|
| BRD Generator | 76% | 80% | 74% | 3.1 | Consistent |
| ... | | | | | |

### High Variance Stages
[Stages with std dev > 10% need investigation]
```

## Stage Report

For Mode 3 (stage isolation), produce a focused report:

```markdown
# Stage Evaluation: [skill-name]
Date: [date]
Fixture idea: [slug]
Runs: [count]

## Scores
| Run | Research | Citations | Structure | Actionability | Domain | Total |
|---|---|---|---|---|---|---|
| 1 | 4/5 | 3/5 | ... | ... | ... | X% |
| 2 | ... | | | | | |
| 3 | ... | | | | | |

## Consistency: [std dev]
## Key Findings: [...]
## Recommendations: [...]
```

## Usage Examples

**Full evaluation with diverse ideas:**
```
/pipeline-evaluator
> Mode 1 — test with 4 different idea types
```

**Consistency check:**
```
/pipeline-evaluator
> Mode 2 — run the same SaaS idea 3 times
```

**Test a specific skill after improving it:**
```
/pipeline-evaluator
> Mode 3 — test /tech-research using the "smart-irrigation" idea as fixtures
```

**Quick evaluation with custom ideas:**
```
/pipeline-evaluator
> Mode 1 but use these ideas: [idea 1], [idea 2]
```

## Modifiers

### help
Usage: `/pipeline-evaluator help`

**pipeline-evaluator** — >

Available modifiers:
- `help` — Show this help message
