# /new-idea

Capture a new project idea — either interactively or by processing a pasted HTML form response.

## Trigger Detection

This skill activates in TWO ways:

1. **User runs `/new-idea`** — Start the interactive flow (Section A)
2. **User pastes text starting with `IDEA FORGE — NEW IDEA INTAKE FORM RESPONSE`** — Process the form response (Section B)

---

## Section A: Interactive Flow

When the user invokes `/new-idea` without pasting a form response:

### 1. Offer the HTML Form

Tell the user:

> You can capture your idea in two ways:
>
> **Option 1 — HTML Form (recommended)**
> Open the intake form at `.claude/skills/new-idea/references/idea-intake-form.html` in your browser, fill it out, and paste the generated output here.
>
> **Option 2 — Quick capture**
> I'll ask you the key questions right here.
>
> Which do you prefer?

If the user chooses Option 2, ask for:
- **Idea name**: A short, descriptive name for the project idea
- **One-liner**: A single sentence summarizing what the idea is
- **Problem statement**: What problem does this idea solve? Who has this problem?
- **Target audience**: Who are the primary users or customers?
- **Initial thoughts**: Any early notes on approach, technology, inspiration, or differentiation

Then proceed to **Section C: Process and Create**.

---

## Section B: Form Response Processing

When the user pastes a form response, parse all sections from the structured text:

- Idea Name (required)
- One-Liner (required)
- Category (optional)
- Current Stage (optional)
- Problem Statement (required)
- Target Audience (required)
- Existing Solutions (optional)
- Initial Thoughts (optional)
- Monetization Idea (optional)
- Tags (optional)
- Known Constraints (optional)
- References & Inspiration (optional)
- Open Questions (optional)

### Completeness Evaluation

After parsing, evaluate the submission's completeness for generating a strong BRD later. Check:

1. **Problem clarity**: Is the problem specific and well-defined, or vague?
2. **Audience specificity**: Are target users described concretely (demographics, behaviors, needs)?
3. **Differentiation**: Is it clear why this is better than existing solutions?
4. **Feasibility signals**: Are there enough technical hints to assess buildability?
5. **Market context**: Any indication of market size, willingness to pay, or urgency?

**Scoring:**
- If 4-5 areas are well-covered → proceed directly to **Section C**
- If 2-3 areas are weak → trigger **Section D: Follow-Up Questionnaire**
- If 0-1 areas are covered → trigger **Section D** with deeper questions AND **Section E: Quick Research**

---

## Section C: Process and Create

### 1. Generate the Slug

Create a URL-friendly slug from the idea name:
- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Keep it concise (3-5 words max)

Confirm the slug with the user before proceeding.

### 2. Create Idea Folder and IDEA.md

Create the file `ideas/<slug>/IDEA.md` with the following structure:

```markdown
# <Idea Name>

| Field | Value |
|-------|-------|
| **ID** | `<IF-X-XXX>` |
| **Slug** | `<slug>` |
| **Status** | `new` |
| **Created** | <YYYY-MM-DD> |
| **Category** | <category or "—"> |
| **Stage** | <stage or "Just an idea"> |
| **Tags** | <tags or "—"> |
| **BRD** | — |
| **PRD** | — |

## One-Liner

<one-liner>

## Problem Statement

<problem statement>

## Target Audience

<target audience>

## Existing Solutions

<existing solutions or "To be researched during BRD phase.">

## Initial Thoughts

<initial thoughts or "—">

## Monetization Idea

<monetization or "To be determined during BRD phase.">

## Known Constraints

<constraints or "None identified yet.">

## References & Inspiration

<references or "—">

## Open Questions

<open questions or "—">

## Next Steps

- [ ] Conduct market research (`/brd-generator`)
- [ ] Generate BRD
- [ ] Generate PRD (`/prd-generator`)
```

### 3. Update IDEAS_TRACKER.md

Read the current `IDEAS_TRACKER.md` file.

#### Generate ID

Detect the current contributor by checking the git branch name:

```bash
git branch --show-current
```

Map branch to contributor code using the Contributors table in CLAUDE.md:
- `hamza` branch → `H`
- `yousef` branch → `Y`
- `main` branch → Ask the user: "You're on main. Which contributor are you? (H = Hamza, Y = Yousef)"

Count existing idea rows **for that contributor** (rows where ID starts with `IF-<code>-`). Assign the next sequential ID in `IF-<code>-XXX` format (zero-padded to 3 digits). Example: if Hamza has 6 ideas, his next is `IF-H-007`. If Yousef has 0 ideas, his first is `IF-Y-001`.

#### Update Pipeline Summary

- Increment the `New` status count by 1
- Increment **Total Ideas** and **Active** counts by 1
- Update the `Last Updated` date at the top of the file

#### Update Ideas Pipeline Table

If the only row is the placeholder ("No ideas yet"), replace it. Otherwise, append a new row.

Add a row with:
- **ID**: `IF-XXX` (assigned above)
- **Idea**: `[<Idea Name>](ideas/<slug>/IDEA.md)`
- **Category**: `<category>` (from form/interactive capture, or `—` if not provided)
- **Status**: `new`
- **Viability**: `—`
- **Follow-Ups**: `—`
- **Created**: Today's date (YYYY-MM-DD)
- **Updated**: Today's date (YYYY-MM-DD)
- **BRD**: —
- **PRD**: —

#### Add Activity Log Entry

Add a new row at the **top** of the Recent Activity table (below the header). If replacing the placeholder row ("No activity yet"), replace it instead.

- **Date**: Today's date (YYYY-MM-DD)
- **ID**: `IF-XXX`
- **Idea**: `<Idea Name>`
- **Event**: `CREATED`
- **Details**: `Category: <category>; Stage: <stage>`

If the activity table has more than 20 data rows, remove the oldest entry (last data row).

### 4. Confirm and Suggest Next Steps

After creating everything, confirm to the user:

> **Idea captured!**
>
> - Folder: `ideas/<slug>/`
> - Status: `new`
> - Tracker updated
>
> **Next step**: Run `/brd-generator` to research this idea and generate a Business Requirements Document.

---

## Section D: Follow-Up Questionnaire

When the intake form response has gaps, generate an HTML follow-up questionnaire to gather the missing information. This keeps the experience consistent with the intake form.

### How to Generate the Follow-Up

1. Identify which areas need more detail (from the completeness evaluation)
2. Create the `ideas/<slug>/preparation/` folder if it doesn't exist
3. Generate a **self-contained HTML file** saved to `ideas/<slug>/preparation/follow-up-<N>.html` (where N starts at 1 and increments)
3. The HTML file must:
   - **Language**: Arabic by default (`<html lang="ar" dir="rtl">`) with a language toggle (عربي / EN) at the top. All labels, titles, subtitles, hints, placeholders, research notes, and button text must be bilingual using `data-ar`/`data-en` attributes with a `setLang()` function that switches `textContent` and `placeholder` values — same pattern as the existing `follow-up-1.html` for `saudi-fpv-drones`
   - Match the intake form's dark theme and styling (reference existing follow-up files in `ideas/saudi-fpv-drones/` for pattern)
   - Show what was already captured (read-only summary at the top)
   - Present targeted questions ONLY for the gaps identified
   - **Form field rule**: Every question that uses a dropdown (`<select>`) or radio/checkbox choices MUST have a short textarea directly below it labeled "Additional comments / ملاحظات إضافية" so the user can provide details not covered by the preset options. Questions that already use a textarea as their primary input do NOT need an extra textarea.
   - **Output buttons**: Instead of a "Generate Output" button that reveals a paste-back section, show TWO action buttons at the bottom of the form:
     1. **Copy to Clipboard** (نسخ إلى الحافظة) — validates required fields, generates the structured output text from ALL form answers, copies it to the clipboard, and shows a brief "Copied! / تم النسخ!" confirmation on the button
     2. **Download as .txt** (تحميل كملف نصي) — same validation and text generation, but triggers a browser file download named `follow-up-<N>-response.txt`
     There is no "output section" that appears below — the text is either copied or downloaded directly.
   - The generated output text must be prefixed with `IDEA FORGE — FOLLOW-UP RESPONSE (<slug>)` so the agent can detect and route it
   - **Critical — capture ALL answers**: The output generator must iterate over EVERY form field (textareas, selects, and "additional comments" fields under dropdowns) and include ALL non-empty values in the output text. No field may be silently skipped. Each field should map to a labeled line in the output (e.g., `### Field Label\nuser's answer`). Verify by confirming the output includes one entry per form field that has user input.

### Follow-Up Question Bank

Pick relevant questions based on what's missing:

**If problem is vague:**
- How frequently do your target users experience this problem? (Daily / Weekly / Monthly / Occasionally)
- What is the cost of this problem to users? (Time lost, money spent, frustration, missed opportunities)
- What triggers someone to look for a solution? Describe the "hair on fire" moment.

**If audience is unclear:**
- What is the age range, profession, or role of your ideal user?
- Where do these users currently spend their time online? (Forums, social media, tools)
- How many potential users do you estimate exist? (Rough order of magnitude is fine)
- Are your users the same as your customers (the people paying)?

**If differentiation is weak:**
- You mentioned existing solutions — what specifically frustrates users about them?
- What is the ONE thing your idea does that nobody else does?
- Why would someone switch from their current solution to yours?

**If feasibility is unclear:**
- Do you have a technical background, or will you need to hire/partner?
- Are there specific APIs, data sources, or platforms you plan to build on?
- What is the most technically risky part of this idea?

**If market context is missing:**
- Have you seen any data on how big this market is? (Even a rough guess helps)
- How much would your target user be willing to pay? What's your basis for that?
- Is this market growing, stable, or declining? What signals do you see?

### Update Tracker for Follow-Up

After generating a follow-up HTML file, update `IDEAS_TRACKER.md`:

- **Ideas Pipeline table**: Set the idea's **Follow-Ups** column to `1/1` (first follow-up: 1 pending, 1 total). If follow-ups already exist, increment totals — e.g., `1/1` → `1/2` means a second form was generated with one still pending.
- **Updated** column: Set to today's date
- **Activity Log**: Add a row at the top:
  - **Event**: `FOLLOW_UP_GENERATED`
  - **Details**: `Created preparation/follow-up-<N>.html for <gap areas>`

If the activity table exceeds 20 data rows, remove the oldest entry.

### Present to User

Tell the user:

> I've captured the basics, but I need a bit more detail to produce a strong BRD. I've generated a short follow-up form:
>
> **Open**: `ideas/<slug>/preparation/follow-up-<N>.html`
>
> Fill it out and paste the output here. Alternatively, you can just answer the questions in chat.

### Processing Follow-Up Responses

When the user pastes text starting with `IDEA FORGE — FOLLOW-UP RESPONSE (<slug>)`:

1. Parse the follow-up answers
2. Merge them with the existing data in `ideas/<slug>/IDEA.md`
3. Re-evaluate completeness
4. **Update tracker**: In `IDEAS_TRACKER.md`:
   - Decrement the pending count in **Follow-Ups** (e.g., `1/2` → `0/2` if all done, or `1/3` if generating another)
   - Update **Updated** column to today's date
   - Add activity log entry: **Event** = `FOLLOW_UP_COMPLETED`, **Details** = `Completed follow-up-<N>.html; <next action>`
4. If still insufficient → generate another follow-up questionnaire (increment N)
5. If sufficient → finalize IDEA.md and confirm (Section C, step 4)

This loop continues until the idea is well-documented enough to produce a quality BRD.

---

## Section E: Quick Research

When the submission is very thin (0-1 areas covered), perform quick web research to supplement the intake BEFORE asking follow-up questions. This helps you ask smarter, more targeted questions.

1. Search the web for the idea's domain/concept
2. Identify 2-3 key competitors
3. Get a rough sense of market size
4. Note any obvious regulatory concerns

Incorporate what you find into the follow-up questionnaire — e.g., "I found that [Competitor X] and [Competitor Y] are in this space. How is your idea different?"

This makes the follow-up questions specific and grounded, not generic.

## Modifiers

### help
Usage: `/new-idea help`

**new-idea** — No description

Available modifiers:
- `help` — Show this help message
