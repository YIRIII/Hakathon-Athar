---
name: help-project-skills
description: Show what skills are available for the current project — project-specific and relevant global skills with descriptions and modifiers. Use when the user asks "what skills do I have", "what commands can I use", "project skills", "available skills", "show me my skills", "skill help", or invokes /help-project-skills. Do NOT trigger on generic "help" alone, /help (built-in), or /skills-registry.
argument-hint: "[skill-name] for detailed help, or empty for overview"
---

# Help: Project Skills

Show the user what skills are available for their current project — a quick, scannable cheat sheet.

## How It Works

### Step 1: Identify the Current Project

Use the current working directory to find the project section in the skills registry.

### Step 2: Read Sources

1. **Skills Registry:** Read `~/.claude/skills-registry.md`
   - Find the project section matching the current working directory path
   - Also read the Global Skills section for relevant slash commands
2. **Project Instructions:** Read `CLAUDE.md` (or `claude-instructions.md`) from the project root
   - Look for any skill/command references mentioned there

### Step 3: Filter Global Skills

Not all global skills are relevant to every project. Include a global skill if:
- It's a **slash command skill** (not auto-applied — those load automatically)
- It's likely useful for this project type (e.g., `/backtest-optimize` for a trading project, `/pipeline` for any project)
- **Always include:** `/pipeline`, `/skill-forge`, `/skills-registry`, `/simplify`
- **Include if relevant:** project-specific globals mentioned in CLAUDE.md or registry project section

### Step 4: Present the Summary

Format the output as a clean, scannable list:

```
Skills for [Project Name]
=========================

PROJECT SKILLS
  /skill-name      — Description (modifiers: mod1, mod2)
  /skill-name      — Description

GLOBAL SKILLS (relevant to this project)
  /skill-name      — Description (modifiers: mod1, mod2)
  /skill-name      — Description

Tip: Run /help-project-skills <skill-name> for detailed help on any skill.
```

Rules:
- Keep descriptions to ONE line each
- Show modifiers inline in parentheses if the skill has them
- Sort alphabetically within each group
- Don't show auto-applied skills (they load automatically, user doesn't invoke them)

## Arguments

Parse `$ARGUMENTS`:

- **If empty:** Show the overview (all project + relevant global skills)
- **If a skill name** (e.g. "backtest-optimize", "pipeline", "vps-logs"):
  1. Find the skill's SKILL.md file in `~/.claude/skills/<name>/SKILL.md` (global) or `.claude/skills/<name>/SKILL.md` (project)
  2. Look for a `## Modifiers` section (or `## Arguments` section)
  3. Display the skill's detailed help: description, all modifiers with explanations, usage examples
  4. If the skill has no SKILL.md or no modifiers section, show what's available from the registry

## Modifiers

### help
Usage: `/help-project-skills help`

**help-project-skills** — Show what skills are available for the current project with descriptions and modifiers.

Available modifiers:
- `help` — Show this help message
- `<skill-name>` — Show detailed help for a specific skill (reads its SKILL.md)
