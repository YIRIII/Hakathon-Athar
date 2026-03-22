---
name: merge-to-main
description: Safely merge a contributor's branch into main without conflicts, or sync shared infrastructure (skills, CLAUDE.md) from main into your branch. Use this skill whenever the user says "merge to main", "sync to main", "merge my branch", "merge hamza", "merge yousef", "bring ideas to main", "sync skills", "pull latest skills", or attempts any git merge between contributor branches. CRITICAL — this skill MUST be used instead of raw git merge, which would carry deletion history and destroy other contributors' work. Also triggers as a safety catch when the user tries to run `git merge hamza` or `git merge yousef` directly.
---

# /merge-to-main

Two modes:
- **`/merge-to-main`** — Push your ideas from a contributor branch TO main
- **`/merge-to-main sync`** — Pull shared infrastructure (skills, CLAUDE.md) FROM main into your current branch

## Why This Exists

Each contributor works on their own branch (`hamza`, `yousef`). To give each contributor a clean workspace, their branch only contains their own ideas — the other contributor's idea folders are deleted from that branch. This means:

- `git merge yousef` into main would **delete all of Hamza's ideas** from main
- `git merge hamza` into main would **delete all of Yousef's ideas** from main

This skill prevents that by selectively copying only new/changed content instead of merging git history.

## Safety Rule

**NEVER run `git merge <contributor-branch>` on main.** If you catch yourself about to do this, or if the user asks you to, STOP and use this skill's procedure instead. Explain why a raw merge is dangerous.

## Trigger Detection

This skill activates when:
1. User runs `/merge-to-main` or `/merge-to-main sync`
2. User says "merge my branch to main", "sync to main", "merge hamza/yousef branch", "sync skills", "pull latest"
3. User attempts `git merge hamza` or `git merge yousef` — INTERCEPT and redirect to this skill

## Mode Detection

- If the user says **"sync"**, **"pull latest"**, **"sync skills"**, or runs **`/merge-to-main sync`** → use **Sync Mode** (Section B)
- Otherwise → use **Push Mode** (Section A)

---

## Section A: Push Mode (contributor branch → main)

Pushes new/changed ideas from a contributor branch to main.

### Step 1: Identify Source Branch

If not obvious from context, ask:

> Which branch do you want to merge into main?
> - `hamza` — Merge Hamza's new/updated ideas
> - `yousef` — Merge Yousef's new/updated ideas

### Step 2: Pre-Flight Checks

```bash
# Ensure we're on main and it's clean
git checkout main
git status --short  # Must be clean — abort if uncommitted changes

# Fetch latest from both branches
git fetch origin
```

If main has uncommitted changes, ask the user to commit or stash first.

### Step 3: Identify New Idea Folders

Compare `ideas/` directories between the source branch and main to find new ideas (folders that exist on the source branch but not on main).

```bash
# List idea folders on source branch
git ls-tree --name-only <source-branch> ideas/

# List idea folders on main
git ls-tree --name-only main ideas/

# The difference = new ideas to bring over
```

### Step 4: Identify Modified Files in Existing Ideas

For idea folders that exist on BOTH branches (i.e., the contributor's own ideas that are already on main), check if they've been updated:

```bash
# Compare files in contributor's existing idea folders
git diff main..<source-branch> -- ideas/<contributor-idea-slug>/
```

Only consider changes to ideas that belong to the source contributor (matching their ID prefix, e.g., `IF-H-` for Hamza, `IF-Y-` for Yousef). Never touch the other contributor's ideas.

### Step 5: Copy Content to Main

For each new or modified idea, use `git checkout` to bring individual files/folders from the source branch:

```bash
# For new idea folders — copy entire folder
git checkout <source-branch> -- ideas/<new-idea-slug>/

# For modified files in existing ideas — copy changed files
git checkout <source-branch> -- ideas/<existing-idea-slug>/<changed-file>
```

Also check for new/changed files in these directories that belong to the contributor:
- `brainstorm/` (if the contributor created brainstorm sessions)
- `evaluations/` (if applicable)

### Step 6: Check for Shared File Changes

Check if the source branch modified any shared files:

```bash
git diff main..<source-branch> -- CLAUDE.md
git diff main..<source-branch> -- .claude/skills/
```

If shared files were modified:
- Show the diff to the user
- Ask: "The source branch also modified these shared files. Do you want to bring these changes to main? (y/n for each)"
- Only apply changes the user approves

**Never** bring `IDEAS_TRACKER.md` from the source branch — it will be rebuilt in the next step.

### Step 7: Update IDEAS_TRACKER.md on Main

Read the source branch's `IDEAS_TRACKER.md` and extract only the rows belonging to the source contributor (matching their ID prefix). Then update main's tracker:

1. **Ideas Pipeline table**: Add new rows for new ideas. Update existing rows for modified ideas (only rows matching the contributor's ID prefix).
2. **Pipeline Summary**: Recount all statuses from the updated table.
3. **Recent Activity**: Add entries for each merged idea at the top:
   - Event: `MERGED_FROM_BRANCH`
   - Details: `Merged from <branch> branch; Status: <current-status>`
4. **Total counts**: Update Total Ideas, Active, Complete counts.
5. **Last Updated**: Set to today's date.

### Step 8: Verify Integrity

After all changes are staged:

1. Count idea rows in the Pipeline table
2. Sum all status counts in Pipeline Summary
3. Verify they match
4. Verify no ideas from the OTHER contributor were deleted or modified

```bash
# Check that the other contributor's ideas still exist
ls ideas/  # Should contain both contributors' idea folders
```

### Step 9: Commit

```bash
git add ideas/<new-or-changed-slugs>/ IDEAS_TRACKER.md
git commit -m "merge: bring <contributor>'s ideas from <branch> branch

New ideas: <list new idea names>
Updated ideas: <list updated idea names>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Step 10: Push (with confirmation)

Ask the user:

> Merge complete locally. Push to GitHub? (y/n)

If yes:
```bash
git push origin main
```

---

## Section B: Sync Mode (main → your branch)

Pulls the latest shared infrastructure (skills, CLAUDE.md) from main into your current contributor branch. Your ideas are untouched.

**Best practice:** Run `/merge-to-main sync` at the start of each session to pick up any changes your collaborator merged to main.

### Step 1: Detect Current Branch

```bash
git branch --show-current
```

Must be on a contributor branch (`hamza` or `yousef`), not `main`. If on `main`, tell the user: "You're on main — sync pulls FROM main, so you need to be on your own branch first."

### Step 2: Pre-Flight Checks

```bash
git status --short  # Must be clean
git fetch origin     # Get latest from remote
```

If there are uncommitted changes, ask the user to commit or stash first.

### Step 3: Check for Differences

Compare shared infrastructure between main and the current branch:

```bash
# Check skills
git diff <current-branch>..origin/main -- .claude/skills/

# Check CLAUDE.md
git diff <current-branch>..origin/main -- CLAUDE.md
```

### Step 4: Report Changes

If no differences found:

> Already up to date — no shared infrastructure changes on main.

If differences found, summarize them clearly:

> **Updates available from main:**
>
> **Skills modified:** brd-generator, tech-research
> **Skills added:** new-skill-name
> **CLAUDE.md:** Modified (new guidelines added)
>
> Sync these updates to your branch? (y/n)

### Step 5: Apply Updates

If the user confirms:

```bash
git checkout origin/main -- .claude/skills/
git checkout origin/main -- CLAUDE.md
```

### Step 6: Commit and Push

```bash
git add .claude/skills/ CLAUDE.md
git commit -m "sync: pull latest skills and CLAUDE.md from main

<list what changed>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push origin <current-branch>
```

---

## Edge Cases

### No new or changed ideas (Push Mode)
If there's nothing to merge, tell the user: "The source branch has no new or changed ideas compared to main. Nothing to merge."

### Contributor modified CLAUDE.md
Show the diff and let the user decide. CLAUDE.md changes might include new guidelines that both contributors should follow.

### Merge conflicts in IDEAS_TRACKER.md
This shouldn't happen because we never merge the file — we rebuild it. But if the tracker on main was manually edited and has structural issues, fix them first.

### New skill files on contributor branch
If a contributor created or modified skills (`.claude/skills/`), show the changes and ask the user whether to bring them to main. Skills are shared infrastructure and both contributors should agree on changes.

### Brainstorm content
If the contributor has brainstorm sessions, bring the entire `brainstorm/<concept-slug>/` folder over. Brainstorm content is contributor-specific and won't conflict.

### Sync finds no changes
Just say "Already up to date" — don't make it complicated.

## Modifiers

### help
Usage: `/merge-to-main help`

**merge-to-main** — Safely merge a contributor's branch into main without conflicts, or sync shared infrastructure (skills, CLAUDE.md) fr...

Available modifiers:
- `help` — Show this help message
