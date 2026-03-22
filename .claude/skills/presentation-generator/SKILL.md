# /presentation-generator

Generate a professional, interactive, bilingual HTML pitch presentation from an idea's BRD and/or PRD.

## Instructions

**Context Management**: Follow the context management protocol at `~/.claude/skills/context-management/SKILL.md`. Structure the presentation into part-writing tasks (Parts 1–4). After writing each part file, assess whether sufficient context remains for the next part. If not, save progress and draft a continuation prompt.

When the user invokes `/presentation-generator`, follow these steps:

### 1. Select an Idea

Read `IDEAS_TRACKER.md` and present eligible ideas:

- Status must be `brd-complete` or later (`brd-complete`, `business-research`, `business-research-complete`, `tech-research`, `tech-research-complete`, `prd-draft`, `prd-complete`)
- BRD column must show a link (not "—")

If the user specifies a slug, use that idea directly (verify it has a BRD).
If multiple ideas are eligible, let the user pick one.
If no ideas are eligible, inform the user and suggest running `/brd-generator` first.

### 2. Select Audience and Language

Ask the user to choose the target audience:

> **Who is the audience for this presentation?**
>
> 1. **Investor Pitch** — VCs, angel investors, funding committees
> 2. **Partner Proposal** — potential technology or business partners
> 3. **Customer Demo** — prospective customers or end users
> 4. **Government / Regulatory** — government officials, grant committees, regulators
> 5. **General Overview** — internal team, board, general stakeholders

Then ask about language preference:

> **Language preference?**
>
> 1. **Bilingual Arabic/English (default)** — Arabic primary, English secondary, with toggle
> 2. **Arabic only**
> 3. **English only**
> 4. **Other** — specify

Record both choices. The audience type determines the filename: `PRESENTATION-<audience>.html` (e.g., `PRESENTATION-investor.html`, `PRESENTATION-partner.html`, `PRESENTATION-customer.html`, `PRESENTATION-government.html`, `PRESENTATION-general.html`).

### 3. Read Source Documents

Read all available documents for the selected idea:

| Document | Required? | Purpose |
|----------|-----------|---------|
| `ideas/<slug>/BRD.md` | **Required** | Primary content source — Final BRD with market data, business requirements, revenue model, competitive analysis. If not found, fall back to `ideas/<slug>/preparation/INITIAL-BRD.md` with a warning that this is the Initial BRD (pre-technical-research). |
| `ideas/<slug>/IDEA.md` | **Required** | Context — project name, one-liner, category, audience |
| `ideas/<slug>/PRD.md` | Optional | Technical details — features, architecture, milestones (include tech slides only if this exists) |
| `ideas/<slug>/TECHNICAL_OPTIONS/README.md` | Optional | Technology strategy — recommended options, costs, vendor recommendations |
| `ideas/<slug>/TECHNICAL_OPTIONS/*.md` | Optional | Per-capability details — for runner-up options analysis |
| `ideas/<slug>/BUSINESS_RESEARCH/README.md` | Optional | Business research — impact severity, feature scoring, prioritization, strategy |
| `ideas/<slug>/BUSINESS_RESEARCH/*.md` | Optional | Per-feature competitive analysis details |
| `ideas/<slug>/RESEARCH.md` | Optional | Original research — for citation sources and data attribution |

**Determine content depth**: The available documents determine which slides can be included:
- **BRD only**: Business-focused slides (market, revenue, competitive, budget). Skip technical architecture, features detail, and milestones.
- **BRD + PRD**: Full slide set including technical architecture, features, and milestones.
- **BRD + PRD + TECHNICAL_OPTIONS**: Full slide set with recommended technology choices and runner-up alternatives.
- **With BUSINESS_RESEARCH**: If business research exists, use its feature prioritization to inform feature ordering in slides (Hero features first), impact severity data for the Problem slide, and per-feature competitive data for the Competitive Landscape slide.

### 4. Generate the Presentation

Read the presentation template from `.claude/skills/presentation-generator/references/presentation-template.md`.
Read the audience profile from `.claude/skills/presentation-generator/references/audience-profiles.md`.

Generate `ideas/<slug>/PRESENTATION-<audience>.html` — a fully self-contained HTML file.

#### 4a. Select Slides Based on Audience and Data Availability

Use this matrix to determine which slides to include. **Required** = always include. **Optional** = include if data is available and relevant. **Skip** = do not include for this audience.

| Slide Type | Investor | Partner | Customer | Government | General |
|------------|----------|---------|----------|------------|---------|
| Title | Required | Required | Required | Required | Required |
| Problem / Opportunity | Required | Required | Required | Required | Required |
| Market Analysis (TAM/SAM/SOM) | Required | Optional | Skip | Required | Required |
| Solution Overview | Required | Required | Required | Required | Required |
| How It Works (flow diagram) | Optional | Required | Required | Optional | Required |
| Key Features | Optional | Required | Required | Optional | Required |
| Technical Architecture | Skip | Required | Skip | Skip | Optional |
| Competitive Landscape (2x2) | Required | Optional | Skip | Optional | Required |
| Business Model / Pricing | Required | Optional | Required | Optional | Required |
| Revenue Projections | Required | Skip | Skip | Optional | Required |
| Traction / Milestones | Required | Required | Optional | Required | Required |
| Go-to-Market Strategy | Required | Optional | Skip | Optional | Optional |
| Social Impact / Compliance | Skip | Skip | Skip | Required | Optional |
| Partnership Opportunity | Skip | Required | Skip | Skip | Skip |
| Risk Mitigation | Optional | Optional | Skip | Required | Optional |
| Budget / Investment Ask | Required | Optional | Skip | Required | Optional |
| Call to Action | Required | Required | Required | Required | Required |
| References & Sources | Required | Required | Required | Required | Required |

**Conditional rules**:
- **Technical Architecture**: Only include if PRD exists. If TECHNICAL_OPTIONS exist, include runner-up options where alternatives scored within ~10% of the recommended option's weighted KPI score (name, approach type, and 1-2 line reason it's a viable fallback).
- **Key Features**: Only include if PRD exists.
- **Revenue Projections**: Only include if BRD Section 8.2 has projection data.
- **Traction / Milestones**: Only include if PRD milestones exist OR if BRD has next steps/timeline data.
- **Social Impact**: Primarily for Government audience — pull from BRD problem statement and regulatory sections.

#### 4b. Extract Content from Documents — ZERO FABRICATION RULE

**CRITICAL**: Every fact, number, statistic, competitor name, market figure, pricing point, and claim in the presentation MUST come directly from the source documents (BRD, PRD, RESEARCH). This is not a suggestion — it is an absolute requirement. Fabrication or inaccurate paraphrasing in a presentation shown to investors, partners, or government officials could cause serious reputational and legal issues.

For each slide, extract data from the specific source:

| Data Type | Source |
|-----------|--------|
| Market size (TAM/SAM/SOM), CAGR | BRD Section 4.1 (Market Size table) |
| Competitor names and positioning | BRD Section 4.3 (Competitive Landscape) |
| Competitive advantages | BRD Section 4.4 |
| Revenue projections (users, ARPU, revenue) | BRD Section 8.2 (Revenue Projections table) |
| Business objectives | BRD Section 3 |
| Success criteria | BRD Section 9 |
| Risk data | BRD Section 10 |
| Budget ranges | BRD Section 13 |
| User personas | BRD Section 5.2 |
| Feature details | PRD Section 4 (Feature Specifications) |
| Tech stack | PRD Section 5.1 |
| Architecture | PRD Section 5.2 |
| Milestones/phases | PRD Section 7 |
| Technology recommendations | TECHNICAL_OPTIONS/README.md (Strategy Overview) |
| Runner-up alternatives | TECHNICAL_OPTIONS/NN-*.md (Section 5, Top Recommended Options) |
| Impact severity data | BUSINESS_RESEARCH/README.md (Impact Severity Matrix) |
| Per-feature competitive data | BUSINESS_RESEARCH/*.md (per-feature files) |
| Feature prioritization & tier | BUSINESS_RESEARCH/README.md (Prioritized Feature Ranking) |
| One-liner pitches per feature | BUSINESS_RESEARCH/README.md (Recommended Pitch/Demo Order) |
| Original research sources | RESEARCH.md (for citation attribution) |

**Citation integrity**: Follow `.claude/skills/research-citations/SKILL.md` for all citation standards. Run the Citation Verification Checklist from `.claude/skills/research-citations/references/citation-checklist.md` before finalizing. Critical rules for presentations:
- Every citation superscript URL MUST point to a page that **actually contains** the cited number
- If the exact number only appears on a secondary source, link to that secondary source and note "as cited in" on the References slide
- Never link to a page that doesn't contain the claimed statistic
- Trace every number back to its FACT entry in RESEARCH.md to find the verified source URL

**Citation rules — External Source URLs Required**:
- Assign a sequential citation number to every fact sourced from a document
- **Trace every citation to its original external source URL**. Read `RESEARCH.md` and `TECHNICAL_OPTIONS/*.md` to find the actual URLs (e.g., https://www.nhtsa.gov/..., https://market.us/report/..., etc.). The BRD/PRD reference data *from* these sources, so always go to the original.
- **Citations with external URLs**: Place an inline superscript that opens the source URL in a new tab: `<a href="https://original-source-url" target="_blank" rel="noopener" class="cite" title="Source Name">[N]</a>`. The viewer clicks the `[N]` and goes directly to the original source — they never leave the slide.
- **Internal estimates** (revenue projections, pricing plans, costs, SAM/SOM, growth targets, roadmap, budget): Do NOT use numbered `[N]` citations — investors expect every `[N]` to be a clickable external source link. Instead, use the **Internal Estimates Presentation Pattern** from `.claude/skills/research-citations/SKILL.md` Section F:
  - **Product features, roadmap, pricing tiers**: No citation or label needed (self-evidently internal)
  - **Financial projections, cost models, revenue targets**: Add `(company projection)` or `(company estimate)` inline, styled subtly: `<span style="font-size: 0.85rem; opacity: 0.7;">(company estimate)</span>`
  - **Derived market figures (SAM, SOM)**: Add `(company estimate)` inline — derivation shown in the Methodology & Assumptions appendix
  - **MANDATORY**: Include a **Methodology & Assumptions appendix slide** that shows how each internal figure was derived (market sizing methodology, pricing rationale with competitive benchmarks, unit economics breakdown, revenue projection assumptions, budget allocation). This is what investors drill into to validate your numbers.
- **References & Sources slide**: Still include this slide at the end, but format it as a proper bibliography with:
  - Citation number
  - Source name/organization (NOT "BRD §2" — the viewer doesn't know what our BRD is)
  - Brief description of the data point
  - Clickable hyperlink to the original source URL (or "Internal analysis" for projections)
  - Example: `[1] NHTSA — 328,000 drowsy driving crashes/year, $109B economic cost. <a href="https://www.nhtsa.gov/risky-driving/drowsy-driving">nhtsa.gov</a>`
- When the same source is used multiple times, reuse the same citation number
- **If no URL can be found** for an external fact: flag it in the generation summary as needing research verification. Do not fabricate URLs.

#### 4c. Generate SVG Visualizations

For slides that include data, generate inline SVG charts following the patterns in the presentation template:

| Chart Type | Use For | Data Source |
|-----------|---------|-------------|
| Concentric circles (TAM/SAM/SOM) | Market Analysis slide | BRD Section 4.1 |
| Horizontal bar chart | Revenue Projections slide | BRD Section 8.2 |
| 2x2 positioning matrix | Competitive Landscape slide | BRD Section 4.3 + 4.4 |
| Timeline | Traction/Milestones slide | PRD Section 7 |
| Donut chart | Budget breakdown slide | BRD Section 13 |
| Architecture diagram | Technical Architecture slide | PRD Section 5 |
| Feature cards grid | Key Features slide | PRD Section 4 |

**SVG rules**:
- All text in SVG charts must be bilingual (Arabic primary, English secondary) when in dual mode
- Use CSS variables for colors (`var(--accent)`, `var(--chart-1)`, etc.)
- Include animation triggers (`class="chart-bar-fill" data-width="[%]"`)
- Animated counter elements use `class="counter-animate" data-target="[number]" data-prefix="$" data-suffix="B"`
- All values in charts must have inline citations

#### 4d. Apply Audience Tone and Emphasis

Read the selected audience profile from `audience-profiles.md` and apply:

1. **Opening hook**: Frame the Problem/Opportunity slide per the profile's hook strategy
2. **Tone**: Adapt all text to the profile's tone (e.g., data-driven for investors, empathetic for customers, formal for government)
3. **Language patterns**: Use the profile's recommended vocabulary in both Arabic and English
4. **Emphasis**: Highlight the profile's priority data points (e.g., ROI for investors, compliance for government)
5. **Call to action**: Use the profile's CTA framing
6. **Speaker notes**: Follow the profile's notes tone (e.g., VC counter-arguments for investor deck)

**Bilingual content rules**:
- Arabic is the primary language (RTL layout)
- English provides parallel content (not word-for-word translation — culturally adapted)
- **ALL text must be bilingual** — not just slide titles/headers. This includes: body paragraphs, feature lists in cards, badge labels, stat card labels and details, risk descriptions and mitigations, budget line items, GTM descriptions, and any other visible text. Every `<p>`, `<li>`, `<span>`, and label must have both `.ar` and `.en` versions wrapped in the `bilingual-split` pattern
- SVG chart labels: include bilingual text where space permits. For compact SVGs (timelines, flow diagrams), use English labels inside the SVG and add a bilingual legend or description below the SVG
- Technical terms with no standard Arabic equivalent: keep in English with optional Arabic transliteration
- For Government audience: use formal Modern Standard Arabic (فصحى)
- For Customer audience: professional but slightly conversational Arabic
- Numbers appear in Western numerals (1,2,3) as primary

**Navigation and UI controls rules**:
- Navigation arrows (`←` `→` buttons) must always stay in LTR orientation — add `dir="ltr"` and `style="direction: ltr;"` to the `<nav class="controls">` element so arrows never flip in RTL mode
- The slide counter (`1 / 14`) should remain LTR
- Top controls (language toggle, theme toggle) should remain in their fixed position regardless of language direction

#### 4e. Handle Image Placeholders

Evaluate each slide for whether a real photograph or illustration would significantly improve it. Common cases:

- **Title slide**: Product logo or hero image
- **Problem slide**: Real-world photo illustrating the problem (e.g., drowsy driver, unsafe conditions)
- **Solution slide**: Product mockup or screenshot
- **How It Works**: App UI screenshots or mockup

When a real image would add significant value:
1. Insert a styled placeholder using the template's image placeholder HTML pattern
2. Set `data-image-placeholder` to a unique ID (e.g., `img-title-hero`, `img-problem-1`)
3. Write a detailed description in `data-image-description` that the user can use to find or create the image
4. Keep the presentation fully functional without the images — placeholders should not break the layout

After generation, list all image placeholders in the summary (Step 6).

#### 4f. Assemble the HTML File — Split-and-Assemble Method

**Why split?** Self-contained HTML presentations with inline CSS, SVG charts, bilingual content, and a full JS engine consistently exceed 70–100KB. This surpasses the output token limit for a single write operation. **Always use the split method** — do not attempt to write the entire file in one operation regardless of estimated size.

**File requirements** (apply across all parts):

- Be completely self-contained — **no external CDN, no external fonts, no external JavaScript**
- Use the Idea Forge CSS design system (variables, dark theme, typography from template)
- Include all CSS inline in a `<style>` block
- Include all JavaScript inline in a `<script>` block
- Use the **light theme by default** (professional for officials/partners). Dark theme available via toggle.
- Support keyboard navigation (Arrow keys, Space, Escape)
- Include the language toggle (Dual / Arabic / English)
- Include the theme toggle (Light/Dark, 'T' key or button)
- Include a progress bar and slide counter
- Include speaker notes for every slide (toggleable with 'S' key)
- Include print mode (toggleable with 'P' key)
- Include fullscreen support ('F' key)
- Include keyboard shortcuts help ('?' key)
- Support touch swipe navigation for mobile
- Citation superscripts open source URLs in a new browser tab (not navigate to References slide). Internal citations (no URL) are non-clickable markers.
- Be responsive (works on 1024px+ screens, gracefully degrades on mobile)

**Enhanced navigation controls** (include in the `<nav class="controls">` area):
- **Previous/Next arrows** (`←` `→`) — always LTR direction
- **First/Last page buttons** (`⏮` `⏭` or `|◀` `▶|`) — jump to slide 1 or last slide
- **Page number input** between the arrows — shows current page as an editable number field (e.g., `3 / 14`). The user can click on the number, type a new page number (1–N), and press Enter to jump directly to that slide. The ` / N` part is non-editable and shows total slides.
- All navigation controls must stay in LTR direction regardless of language mode
- JavaScript must handle: input validation (clamp to 1–totalSlides), Enter key to navigate, blur to cancel, update on slide change

**Split into 4 parts** — write each as a temporary file in the idea's folder, then concatenate:

| Part | File | Contents |
|------|------|----------|
| 1 | `_part1.html` | `<!DOCTYPE html>` through end of `</style>` — full HTML head, meta tags, and the complete CSS design system (light/dark themes, all component styles, responsive breakpoints, print mode, speaker notes, chart animations) |
| 2 | `_part2.html` | First half of slides (typically slides 1–7) — Title through ~Business Model. Includes all SVG charts for these slides (TAM/SAM/SOM, competitive 2x2, flow diagrams) and image placeholders |
| 3 | `_part3.html` | Second half of slides (typically slides 8–14+) — Revenue through References. Includes remaining SVG charts (bar charts, timeline, donut), navigation controls, and keyboard shortcuts overlay |
| 4 | `_part4.html` | Complete `<script>` block with the JavaScript engine (slide navigation, progress bar, counter animations, chart animations, theme/language toggles, speaker notes, print mode, fullscreen, keyboard shortcuts, touch swipe, citation click handling) + closing `</body></html>` |

**Assembly steps:**

1. Write each part file sequentially using the Write tool: `ideas/<slug>/_part1.html` through `_part4.html`
2. Concatenate into the final file:
   ```bash
   cat ideas/<slug>/_part1.html ideas/<slug>/_part2.html ideas/<slug>/_part3.html ideas/<slug>/_part4.html > ideas/<slug>/PRESENTATION-<audience>.html
   ```
3. Clean up temporary files:
   ```bash
   rm ideas/<slug>/_part1.html ideas/<slug>/_part2.html ideas/<slug>/_part3.html ideas/<slug>/_part4.html
   ```
4. Verify the assembled file exists and has a reasonable size (expect 70–120KB for a full presentation)

**Important**: Ensure clean boundaries between parts — Part 1 must end with valid HTML/CSS closure (`</style>`), Parts 2–3 contain only HTML body content, and Part 4 opens with `<script>` and closes with `</body></html>`. No dangling tags across part boundaries.

### 5. Update Tracker and Metadata

After the presentation file is created:

**Update `ideas/<slug>/IDEA.md`:**
- Add or update a `Presentation` field in the metadata table: `[PRESENTATION-<audience>.html](PRESENTATION-<audience>.html)`
- If multiple presentations exist, list them comma-separated

**Update `IDEAS_TRACKER.md`:**

- **Ideas Pipeline table**: Find the idea's row and update:
  - **Deck** → `[<Audience>](ideas/<slug>/PRESENTATION-<audience>.html)` (comma-separated if multiple presentations exist, e.g., `[Investor](ideas/<slug>/PRESENTATION-investor.html), [Customer](ideas/<slug>/PRESENTATION-customer.html)`)
  - **Updated** → today's date
- **Activity Log**: Add a row at the top — **Event**: `PRESENTATION_COMPLETED`, **Details**: `Audience: <type>; <N> slides; <M> visualizations; Language: <bilingual/ar/en>; Image placeholders: <count or "none">`
- Update the `Last Updated` date at the top of the file
- If the activity table exceeds 20 data rows, remove the oldest entry

**NOTE**: The presentation generator does NOT change the idea's pipeline status. The status remains whatever it was before (`brd-complete`, `prd-complete`, etc.). Presentations are a supplementary output, not a pipeline stage.

### 6. Present Summary

Summarize for the user:

> **Presentation Complete for "<Idea Name>"**
>
> **Details:**
> - Audience: <audience type>
> - Language: <bilingual/Arabic/English>
> - Slides: <count>
> - SVG Visualizations: <count> (<list types>)
> - Source documents used: <list of files read>
> - Citations: <count> inline references
>
> **File created:**
> - `ideas/<slug>/PRESENTATION-<audience>.html`
>
> **To view**: Open the file in any browser (light theme by default).
> - Arrow keys or Space to navigate
> - Press 'S' for speaker notes
> - Press 'P' for print-friendly mode
> - Press 'F' for fullscreen
> - Press 'T' to toggle light/dark theme
> - Press '?' for keyboard shortcuts help
> - Use the language toggle (top-right) to switch between Dual / Arabic / English
>
> **Image Placeholders** (if any):
> - `<id>`: <description of needed image>
> - `<id>`: <description of needed image>
> - To add images: provide me with the image files and I'll embed them as base64 into the presentation.
>
> **To generate for a different audience**: Run `/presentation-generator` again and select a different audience type. Each audience gets its own file.

---

## Runner-Up Technology Options

When Technical Options data exists and the Technical Architecture slide is included:

1. Read `TECHNICAL_OPTIONS/README.md` to get the Strategy Overview (recommended options per capability)
2. For each capability, read the corresponding `NN-capability.md` file's Section 5 (Top Recommended Options)
3. Identify runner-up options that scored within ~10% of the recommended option's weighted overall score
4. Include these as "Also Considered" items on the Technical Architecture slide:
   - Option name
   - Approach type (Build/License/Partner/Integrate)
   - One-line reason it's a viable fallback (e.g., "Lower cost but requires more custom development")
5. Keep this section compact — maximum 3-4 runner-ups total across all capabilities. Prioritize the ones closest to the recommended option's score.

---

## Edge Cases

- **BRD-only idea (no PRD)**: Generate a business-focused presentation. Skip Technical Architecture, Key Features detail, and Milestones slides. Note in speaker notes that a more detailed technical presentation will be possible after PRD generation.
- **Re-running for same audience**: The file `PRESENTATION-<audience>.html` is overwritten. The activity log captures each generation event, preserving history.
- **Very large BRD/PRD**: Focus on the most impactful data points. Prioritize the top 3-5 competitors, the top 5 features, and the first 3 milestones. Keep slides scannable — no walls of text.
- **Missing market data**: If the BRD has gaps (e.g., no TAM/SAM/SOM), skip the Market Analysis chart but note in speaker notes that this data should be researched before presenting.
- **Non-standard audience**: If the user picks "Other" in Step 2, ask them to describe the audience, then adapt the General Overview profile with their specific emphasis areas.

## Modifiers

### help
Usage: `/presentation-generator help`

**presentation-generator** — No description

Available modifiers:
- `help` — Show this help message
