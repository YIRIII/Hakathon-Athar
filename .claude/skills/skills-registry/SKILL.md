---
name: skills-registry
description: >
  Manage the central skills registry — discover unregistered skills, update entries, and maintain
  the catalog across all projects and environments. Use when: (1) user invokes `/skills-registry`,
  (2) user asks to list, manage, or update installed skills, (3) after installing or creating a new skill,
  (4) user asks "what skills do I have" or "sync my skills registry".
---

# /skills-registry

Discover unregistered skills and keep the skills registry up to date.

## CRITICAL: The Registry Already Exists

The registry file **already exists** and contains curated data (descriptions, Env tags, Source info, project sections). **Never create a new file from scratch.** Always read, diff, and patch the existing file.

**Path**: `~/.claude/skills-registry.md`

(On Windows this resolves to `C:\Users\<username>\.claude\skills-registry.md`. On WSL it's `/home/<username>/.claude/skills-registry.md`.)

## Workflow

### 1. Read the Existing Registry

Read the registry file at `~/.claude/skills-registry.md`.

**If the Read tool fails** (e.g., symlink issue, permission error), fall back to Bash:
```bash
cat ~/.claude/skills-registry.md
```

Display the current contents to the user.

### 2. Scan for Installed Skills

**IMPORTANT**: Most global skills are **symlinks** to `~/.agents/skills/`. The Glob and Read tools CANNOT follow these symlinks. You MUST use Bash to scan:

```bash
# List all global skills (follows symlinks)
for d in ~/.claude/skills/*/; do
  name=$(basename "$d")
  [ -f "$d/SKILL.md" ] && echo "$name"
done
# Also check standalone .md files
ls ~/.claude/skills/*.md 2>/dev/null
```

**Project skills**: Use Glob for the current project (these are real directories, not symlinks):
```
.claude/skills/*/SKILL.md
```

To read a symlinked skill's SKILL.md, use Bash:
```bash
head -10 ~/.claude/skills/<name>/SKILL.md
```

### 3. Compare Against Existing Registry

Compare the skills found on disk against what's already registered. Produce a report:

```
Skills Registry Sync Report
============================
Already registered: [list]
NEW — not in registry: [list]
In registry but not found on disk: [list] (may exist in other env — do NOT remove)
```

**If everything is in sync**: Tell the user "Registry is up to date" and stop.

### 4. Update the Existing File (Only If Needed)

**Use the Edit tool** to patch the existing file — do NOT rewrite it with the Write tool.

For each unregistered skill:
- Add a new row to the appropriate existing table (Slash Command Skills or Auto-Applied Skills for global, or the project's table)
- Preserve all existing rows, Env tags, Source values, and descriptions — do not overwrite curated data

For skills in the registry but not on disk:
- Do NOT remove them — they may exist in the other environment or be built-in
- Note them in the report for the user to review

Update the `Last updated` date in the header.

### 5. Check for Skill Updates

After syncing the registry, check if any installed skills have upstream updates available:

```bash
npx skills check 2>&1
```

If updates are found:
- List each skill that has an update available
- For each updatable skill, show a **before/after diff** of the changes:
  1. Copy the current SKILL.md to a temp location: `cp '<skill-path>/SKILL.md' /tmp/<name>-old-SKILL.md`
  2. Run the update for that single skill: `npx skills add <source> -g -y`
  3. Diff the old vs new: `diff /tmp/<name>-old-SKILL.md '<skill-path>/SKILL.md'` (or use a side-by-side summary)
  4. Present a human-readable summary of what changed (new sections, removed sections, key differences)
  5. Restore the old version: `cp /tmp/<name>-old-SKILL.md '<skill-path>/SKILL.md'`

After showing all diffs, ask the user:
- "Would you like to update all N skills, or specific ones?"
- If the user says **yes / update all**: `npx skills update`
- If the user names **specific skills**: run `npx skills add <source> -g -y` for each one
- If the user says **no**: skip updates

**If no updates are available**: Tell the user "All skills are up to date."

### 6. Confirm

Show a summary of changes made (rows added, date updated, skills updated). If no changes were needed, say so.

## Registry File Structure

The file follows this structure — never reorganize it:

```
# Skills Registry                     ← Header + meta
## How to Use This Registry           ← Instructions (stays at top)
## Global Skills                      ← Global section
### Slash Command Skills              ← User-invocable with /name
### Auto-Applied Skills               ← Loaded as context automatically
## Project: Name (path) — Env         ← Project sections (appended at bottom)
```

New project sections are always appended at the bottom of the file.

### Table Columns

**Slash Command Skills**: Skill | Invoke | Env | Source | Description
**Auto-Applied Skills**: Skill | Env | Source | Description
**Project Skills**: Skill | Invoke | Description

**Env values**: `Win`, `WSL`, `Win+WSL`, `built-in`

## Modifiers

### help
Usage: `/skills-registry help`

**skills-registry** — Discover unregistered skills, sync the central registry, and check for upstream skill updates.

Available modifiers:
- `help` — Show this help message
